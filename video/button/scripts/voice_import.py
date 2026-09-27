"""Imports the voice-over recorded by hand from voice/A-LIRE.md.

    video/.venv/bin/python scripts/voice_import.py

Cleans each file of voice/input/ (copies only), transcribes it with mlx-whisper, cuts one
segment per scene aligned on voice/script.json, then writes the word timings, the scene
timings in storyboard.json, the subtitles and a preview track. The recording is never
re-synthesised, sped up or re-pitched: when a scene is too short, the scene grows.

A file `<sceneId>.*` dropped next to the single take replaces that scene only, and an
input whose content has not changed is not processed again.
"""

from __future__ import annotations

import difflib
import hashlib
import json
import re
import subprocess
import sys
import wave
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np

VIDEO_DIR = Path(__file__).resolve().parent.parent
VOICE_DIR = VIDEO_DIR / 'voice'
INPUT_DIR = VOICE_DIR / 'input'
CLEAN_DIR = VOICE_DIR / 'clean'
SEGMENTS_DIR = VOICE_DIR / 'segments'
STATE_FILE = CLEAN_DIR / 'state.json'
SHORT_DIR = VIDEO_DIR / 'short' / 'voice'

MODEL = 'mlx-community/whisper-medium-mlx'
LANGUAGE = 'en'
RATE = 48_000
AUDIO_EXT = {'.wav', '.m4a', '.mp3', '.aif', '.aiff', '.flac'}

HOP = 0.01  # energy frame hop, seconds
SILENCE_DB = -40.0  # after loudnorm to -16 LUFS, anything under this is a pause
MIN_SILENCE = 0.08
EDGE_MARGIN = 0.08
FADE = 0.01
VOICE_OFFSET = 0.3
TAIL = 0.4
STRETCH_WARNING = 1.5
SHORT_MAX_SEC = 28.0
SRT_LINE = 42
SAME_TEXT = 0.85  # below this similarity, the recording says something else

problems: list[str] = []


def warn(message: str) -> None:
    problems.append(message)
    print(f'  ! {message}')


# ── audio helpers ────────────────────────────────────────────────────────────────────


def run(argv: list[str]) -> str:
    result = subprocess.run(argv, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"{argv[0]} failed:\n{result.stderr[-2000:]}")
    return result.stdout + result.stderr


def probe(path: Path) -> dict:
    out = run([
        'ffprobe', '-v', 'error', '-show_entries',
        'format=format_name,duration:stream=codec_name,sample_rate,channels',
        '-of', 'json', str(path),
    ])
    data = json.loads(out[out.index('{'):])
    stream = data['streams'][0]
    return {
        'format': f"{data['format']['format_name']}/{stream['codec_name']}",
        'durationSec': round(float(data['format']['duration']), 2),
        'sampleRate': int(stream['sample_rate']),
        'channels': int(stream['channels']),
    }


def read_audio(path: Path) -> np.ndarray:
    raw = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', str(path), '-ac', '1', '-ar', str(RATE),
         '-f', 'f32le', '-'],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def write_wav(path: Path, samples: np.ndarray) -> None:
    pcm = np.clip(samples, -1, 1)
    with wave.open(str(path), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(RATE)
        out.writeframes((pcm * 32767).astype('<i2').tobytes())


def frame_db(samples: np.ndarray) -> np.ndarray:
    hop = int(HOP * RATE)
    size = hop * 2
    count = max(1, (len(samples) - size) // hop + 1)
    frames = np.lib.stride_tricks.sliding_window_view(samples, size)[::hop][:count]
    rms = np.sqrt(np.mean(frames.astype(np.float64) ** 2, axis=1))
    return 20 * np.log10(np.maximum(rms, 1e-9))


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:16]


def stamp(sec: float) -> str:
    return f'{int(sec // 60)}:{sec % 60:05.2f}'


# ── step 2: cleaning ─────────────────────────────────────────────────────────────────


def sibilance_ratio(samples: np.ndarray, db: np.ndarray) -> float:
    """Share of the spoken energy above 5 kHz; speech sits around 0.02–0.05."""
    hop = int(HOP * RATE)
    size = 1024
    speech = np.flatnonzero(db > SILENCE_DB + 10)
    if not len(speech):
        return 0.0
    freqs = np.fft.rfftfreq(size, 1 / RATE)
    high = freqs >= 5000
    total = hi = 0.0
    for frame in speech[:: max(1, len(speech) // 400)]:
        chunk = samples[frame * hop: frame * hop + size]
        if len(chunk) < size:
            continue
        power = np.abs(np.fft.rfft(chunk * np.hanning(size))) ** 2
        total += power.sum()
        hi += power[high].sum()
    return hi / total if total else 0.0


def listen(name: str, samples: np.ndarray) -> None:
    """The automatic critical listen: clipping, hiss, reverb — with timestamps."""
    clipped = np.flatnonzero(np.abs(samples) >= 0.999)
    if len(clipped):
        runs = np.split(clipped, np.flatnonzero(np.diff(clipped) > 1) + 1)
        times = [stamp(r[0] / RATE) for r in runs if len(r) >= 2][:8]
        if times:
            warn(f'{name}: clipping at {", ".join(times)}')

    db = frame_db(samples)
    quiet = db < SILENCE_DB
    floor = np.percentile(db[quiet], 50) if quiet.any() else -120
    if floor > -55:
        loud = np.flatnonzero(quiet & (db > -55))
        times = sorted({stamp(round(f * HOP)) for f in loud[:: max(1, len(loud) // 6)]})
        warn(f'{name}: audible hiss in the pauses ({floor:.0f} dBFS) around {", ".join(times)}')

    # Reverb: how long a phrase ending takes to fall 30 dB into the following pause.
    tails = []
    ends = np.flatnonzero((db[:-1] >= SILENCE_DB + 15) & (db[1:] < SILENCE_DB + 15))
    for end in ends:
        level = db[max(0, end - 10): end + 1].max()
        after = np.flatnonzero(db[end:end + 100] < level - 30)
        if len(after):
            tails.append((after[0] * HOP, end * HOP))
    long_tails = [t for t in tails if t[0] > 0.25]
    if tails and len(long_tails) > len(tails) / 3:
        times = ', '.join(stamp(t[1]) for t in long_tails[:6])
        warn(f'{name}: marked reverb (tails over 250 ms) at {times}')


def clean(source: Path) -> Path:
    target = CLEAN_DIR / f'{source.stem}.wav'
    original = read_audio(source)
    listen(source.name, original)

    chain = ['highpass=f=80', 'afftdn=nf=-25']
    ratio = sibilance_ratio(original, frame_db(original))
    if ratio > 0.08:
        chain.append('deesser=i=0.3')
        print(f'  sibilant "s" ({ratio:.0%} above 5 kHz): light de-esser applied')

    # Two-pass loudnorm: measure, then apply linearly, so nothing gets squashed.
    base = ','.join(chain)
    report = run(['ffmpeg', '-hide_banner', '-i', str(source), '-af',
                  f'{base},loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json',
                  '-f', 'null', '-'])
    measured = json.loads(report[report.rindex('{'):report.rindex('}') + 1])
    loudnorm = (
        'loudnorm=I=-16:TP=-1.5:LRA=7:linear=true'
        f":measured_I={measured['input_i']}:measured_TP={measured['input_tp']}"
        f":measured_LRA={measured['input_lra']}:measured_thresh={measured['input_thresh']}"
        f":offset={measured['target_offset']}"
    )
    run(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-af',
         f'{base},{loudnorm},aresample={RATE}', '-ac', '1', '-ar', str(RATE),
         '-c:a', 'pcm_s16le', str(target)])
    return target


# ── step 3: transcription and alignment ──────────────────────────────────────────────


def transcribe(path: Path) -> list[dict]:
    import mlx_whisper

    result = mlx_whisper.transcribe(
        str(path), path_or_hf_repo=MODEL, language=LANGUAGE, word_timestamps=True,
        condition_on_previous_text=False,
    )
    return [
        {'w': w['word'].strip(), 'start': round(w['start'], 3), 'end': round(w['end'], 3)}
        for segment in result['segments'] for w in segment.get('words', [])
        if w['word'].strip()
    ]


def norm(text: str) -> str:
    """Spelling-proof form: `okay-lab`, `OKLab`, `U-I dot x.com` and `ui.x.com` agree."""
    t = text.lower()
    t = re.sub(r'\bokay\b', 'ok', t)
    t = re.sub(r'\bdot\b', ' ', t)
    return re.sub(r'[^a-z0-9]', '', t)


def similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, norm(a), norm(b), autojunk=False).ratio()


@dataclass
class Match:
    first: int  # word index
    last: int  # inclusive
    score: float


@dataclass
class Segment:
    scene_id: str
    planned: str
    spoken: str
    pause_after: float
    words: list[dict] = field(default_factory=list)


def candidates(words: list[dict], target: str) -> list[Match]:
    """Every window of the transcript that reads like `target`, best first."""
    goal = norm(target)
    keys = [norm(w['w']) for w in words]
    found = []
    for first in range(len(keys)):
        text = ''
        best = None
        for last in range(first, len(keys)):
            text += keys[last]
            if len(text) > 1.6 * len(goal):
                break
            if len(text) < 0.5 * len(goal):
                continue
            score = difflib.SequenceMatcher(None, text, goal, autojunk=False).ratio()
            if best is None or score > best.score:
                best = Match(first, last, score)
        if best and best.score >= 0.5:
            found.append(best)
    kept: list[Match] = []
    for m in sorted(found, key=lambda m: -m.score):
        if all(m.last < k.first or m.first > k.last for k in kept):
            kept.append(m)
    return sorted(kept, key=lambda m: m.first)


def align(words: list[dict], segments: list[Segment]) -> list[Match | None]:
    """One window per segment, in order. Among equal takes the LAST one wins."""
    n = max(1, len(words))
    options = [candidates(words, s.spoken) for s in segments]
    # state: last used word index -> (score, choices)
    states: dict[int, tuple[float, list[Match | None]]] = {-1: (0.0, [])}
    for opts in options:
        nxt: dict[int, tuple[float, list[Match | None]]] = {}
        for end, (score, path) in states.items():
            keep = (score, path + [None])
            if end not in nxt or nxt[end][0] < keep[0]:
                nxt[end] = keep
            for m in opts:
                if m.first <= end:
                    continue
                # A later take of the same line gets a small edge over an earlier one.
                total = score + m.score + 0.03 * m.first / n
                if m.last not in nxt or nxt[m.last][0] < total:
                    nxt[m.last] = (total, path + [m])
        states = nxt
    return max(states.values(), key=lambda s: s[0])[1]


def pause_middle(quiet: np.ndarray, frames: range) -> float | None:
    """Middle of the first pause at least MIN_SILENCE long met walking `frames`, in s."""
    need = int(MIN_SILENCE / HOP)
    run: list[int] = []
    for i in frames:
        if 0 <= i < len(quiet) and quiet[i]:
            run.append(i)
            continue
        if len(run) >= need:
            break
        run = []
    edge = bool(run) and run[-1] in (0, len(quiet) - 1)
    if len(run) >= need or edge:
        return (run[0] + run[-1]) / 2 * HOP
    return None


def pause_before(db: np.ndarray, at: float, floor: float) -> float:
    """The cut point before a segment: the nearest pause going back from `at`."""
    found = pause_middle(db < SILENCE_DB, range(int(at / HOP), int(floor / HOP), -1))
    return floor if found is None else found


def pause_after(db: np.ndarray, at: float, ceiling: float) -> float:
    """The cut point after a segment: the nearest pause going on from `at`."""
    found = pause_middle(db < SILENCE_DB, range(int(at / HOP), int(ceiling / HOP)))
    return ceiling if found is None else found


def cut(samples: np.ndarray, db: np.ndarray, bounds: tuple[float, float]) -> np.ndarray:
    """Trim the pauses inside `bounds`, keep 80 ms of air, fade 10 ms at each edge."""
    start, end = bounds
    first, last = int(start / HOP), int(end / HOP)
    loud = np.flatnonzero(db[first:last] >= SILENCE_DB) + first
    if not len(loud):
        return np.zeros(0, dtype=np.float32)
    a = max(start, loud[0] * HOP - EDGE_MARGIN)
    b = min(end, (loud[-1] + 2) * HOP + EDGE_MARGIN)
    piece = samples[int(a * RATE): int(b * RATE)].copy()
    fade = min(int(FADE * RATE), len(piece) // 2)
    if fade:
        ramp = np.linspace(0, 1, fade, dtype=np.float32)
        piece[:fade] *= ramp
        piece[-fade:] *= ramp[::-1]
    return piece


@dataclass
class Take:
    """A cleaned recording and its word-level transcript."""
    audio: Path
    words: list[dict]


def extract(take: Take, segments: list[Segment], label: str) -> dict[str, np.ndarray]:
    words = take.words
    samples = read_audio(take.audio)
    db = frame_db(samples)
    duration = len(samples) / RATE
    matches = align(words, segments)
    pieces: dict[str, np.ndarray] = {}
    kept = [(s, m) for s, m in zip(segments, matches) if m]
    for index, (segment, m) in enumerate(kept):
        head = words[m.first]['start']
        tail = words[m.last]['end']
        before = words[kept[index - 1][1].last]['end'] if index else 0.0
        after = words[kept[index + 1][1].first]['start'] if index + 1 < len(kept) else duration
        bounds = (pause_before(db, head, before), pause_after(db, tail, after))
        pieces[segment.scene_id] = cut(samples, db, bounds)
        dropped = [w['w'] for w in words[:m.first] if before < w['start'] < head - 0.05]
        if dropped and index and len(norm(' '.join(dropped))) > 3:
            print(f'  {segment.scene_id}: earlier take dropped ({" ".join(dropped)[:60]})')
    for segment, m in zip(segments, matches):
        if m is None:
            warn(f'{label} {segment.scene_id}: not found in the recording — no voice there')
    return pieces


# ── inputs, state and orchestration ──────────────────────────────────────────────────


def inventory(scene_ids: set[str]) -> tuple[Path | None, dict[str, Path], Path | None]:
    files = sorted(
        p for p in INPUT_DIR.iterdir() if p.is_file() and p.suffix.lower() in AUDIO_EXT
    )
    single = next((p for p in files if p.stem == 'voiceover'), None)
    per_scene = {p.stem: p for p in files if p.stem in scene_ids}
    short = next((p for p in files if p.stem == 'short'), None)
    unknown = [p for p in files if p not in (single, short) and p.stem not in scene_ids]
    if not single and len(unknown) == 1:
        single = unknown.pop()
        print(f'  "{single.name}" is not named voiceover.*: read as the single take')
    for p in unknown:
        warn(f'{p.name}: matches no scene and is not voiceover.* or short.* — ignored')
    print('\nInventory')
    for p in [f for f in files if f not in unknown]:
        info = probe(p)
        role = 'single take' if p == single else 'short' if p == short else 'scene'
        print(f"  {p.name}  [{role}]  {info['format']}, {info['durationSec']} s, "
              f"{info['sampleRate']} Hz, {info['channels']} ch")
    return single, per_scene, short


def load_state() -> dict:
    return json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {}


def processed(source: Path, state: dict) -> tuple[Path, list[dict]]:
    """Clean + transcribe `source`, or reuse both when the file has not changed."""
    key = source.name
    digest = sha(source)
    cached = state.get(key)
    clean_path = CLEAN_DIR / f'{source.stem}.wav'
    words_path = CLEAN_DIR / f'{source.stem}.words.json'
    if cached == digest and clean_path.exists() and words_path.exists():
        print(f'  {source.name}: unchanged, reusing its cleaned copy and transcript')
        return clean_path, json.loads(words_path.read_text())
    print(f'  {source.name}: cleaning')
    clean_path = clean(source)
    print(f'  {source.name}: transcribing ({MODEL})')
    words = transcribe(clean_path)
    words_path.write_text(json.dumps(words, indent=1))
    state[key] = digest
    return clean_path, words


def segment_words(path: Path, cache: dict) -> list[dict]:
    digest = sha(path)
    if cache.get(path.name, {}).get('sha') == digest:
        return cache[path.name]['words']
    words = transcribe(path)
    cache[path.name] = {'sha': digest, 'words': words}
    return words


@dataclass
class Job:
    """One script to cut: the long video's, or the short's."""
    script: Path
    out_dir: Path
    label: str


def import_voice(job: Job, sources: list[tuple[Path, list[str]]], state: dict) -> list[dict]:
    """Cuts every segment of `job.script` out of `sources` into `job.out_dir`."""
    script_path, out_dir, label = job.script, job.out_dir, job.label
    script = json.loads(script_path.read_text())
    out_dir.mkdir(parents=True, exist_ok=True)
    # Segments are re-cut on every pass (it is cheap; the transcripts are cached), so a
    # scene that is no longer in any recording cannot keep a stale file.
    for old in out_dir.glob('*.wav'):
        old.unlink()
    cache_path = CLEAN_DIR / f'{label}.segment-words.json'
    cache = json.loads(cache_path.read_text()) if cache_path.exists() else {}

    for source, scene_ids in sources:
        audio, words = processed(source, state)
        wanted = [
            Segment(s['sceneId'], s.get('plannedText', s['text']), s.get('spoken', s['text']),
                    s['pauseAfterMs'] / 1000)
            for s in script if s['sceneId'] in scene_ids
        ]
        for scene_id, piece in extract(Take(audio, words), wanted, label).items():
            write_wav(out_dir / f'{scene_id}.wav', piece)

    report = []
    for s in script:
        path = out_dir / f"{s['sceneId']}.wav"
        if not path.exists():
            report.append({'sceneId': s['sceneId'], 'missing': True})
            continue
        words = segment_words(path, cache)
        heard = ' '.join(w['w'] for w in words).strip()
        planned = s.get('plannedText', s['text'])
        score = max(similarity(heard, planned), similarity(heard, s.get('spoken', planned)))
        changed = score < SAME_TEXT
        if changed:
            s.setdefault('plannedText', planned)
            s['text'] = heard
            warn(f"{label} {s['sceneId']}: said differently — script updated to “{heard}”")
        elif 'plannedText' in s and similarity(s['text'], s['plannedText']) < 1:
            # A re-recording went back to the planned words.
            s['text'] = s.pop('plannedText')
        report.append({
            'sceneId': s['sceneId'], 'file': path, 'words': words, 'heard': heard,
            'durationSec': round(probe(path)['durationSec'], 2), 'changed': changed,
        })

    cache_path.write_text(json.dumps(cache, indent=1))
    script_path.write_text(json.dumps(script, indent=2, ensure_ascii=False) + '\n')
    (out_dir.parent / 'words.json').write_text(json.dumps(
        [{'sceneId': r['sceneId'], 'words': r['words']} for r in report if 'words' in r],
        indent=2,
    ) + '\n')
    return report


# ── step 4 and 5: storyboard, subtitles, preview ─────────────────────────────────────


def srt_time(sec: float) -> str:
    ms = int(round(sec * 1000))
    return f'{ms // 3_600_000:02}:{ms // 60_000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}'


def wrap(text: str) -> list[list[str]]:
    """Cues of at most two lines of at most 42 characters."""
    lines, line = [], ''
    for word in text.split():
        if line and len(line) + 1 + len(word) > SRT_LINE:
            lines.append(line)
            line = word
        else:
            line = f'{line} {word}'.strip()
    if line:
        lines.append(line)
    return [lines[i:i + 2] for i in range(0, len(lines), 2)]


def timeline(report: list[dict]) -> None:
    storyboard_path = VIDEO_DIR / 'storyboard.json'
    storyboard = json.loads(storyboard_path.read_text())
    script = {s['sceneId']: s for s in json.loads((VOICE_DIR / 'script.json').read_text())}
    voice = {r['sceneId']: r for r in report if 'file' in r}
    clips = {}
    for scene in storyboard:
        taps = VIDEO_DIR / 'raw' / f"{scene['id']}.taps.json"
        if taps.exists():
            clips[scene['id']] = json.loads(taps.read_text())['durationSec']

    cues, mix, rows = [], [], []
    clock = 0.0
    for scene in storyboard:
        planned = scene.setdefault('plannedDurationSec', scene['durationSec'])
        r = voice.get(scene['id'])
        if r:
            pause = script[scene['id']]['pauseAfterMs'] / 1000
            needed = VOICE_OFFSET + r['durationSec'] + pause + TAIL
            scene['durationSec'] = round(max(planned, needed), 2)
            scene['voice'] = {
                'file': f"voice/segments/{scene['id']}.wav",
                'durationSec': r['durationSec'],
                'offsetSec': VOICE_OFFSET,
            }
            start = clock + VOICE_OFFSET
            mix.append((r['file'], start))
            text = script[scene['id']]['text']
            chunks = wrap(text)
            total_chars = sum(len(' '.join(c)) for c in chunks)
            t = start
            for chunk in chunks:
                share = r['durationSec'] * len(' '.join(chunk)) / total_chars
                cues.append((t, t + share, chunk))
                t += share
        else:
            scene['durationSec'] = planned
            scene.pop('voice', None)
        grown = scene['durationSec'] - planned
        if grown > STRETCH_WARNING:
            warn(f"{scene['id']}: scene grows by {grown:.1f} s — re-record its clip with longer "
                 f"Maestro holds, or freeze the last frame in the edit")
        clip = clips.get(scene['id'])
        if clip is not None and clip < scene['durationSec']:
            print(f"  {scene['id']}: clip {clip:.2f} s < scene {scene['durationSec']:.2f} s, "
                  f"the edit holds its last frame for {scene['durationSec'] - clip:.2f} s")
        rows.append((scene, r, planned))
        clock += scene['durationSec']

    storyboard_path.write_text(json.dumps(storyboard, indent=2, ensure_ascii=False) + '\n')

    srt = []
    for i, (a, b, lines) in enumerate(cues, 1):
        srt.append(f"{i}\n{srt_time(a)} --> {srt_time(b)}\n" + '\n'.join(lines) + '\n')
    (VOICE_DIR / 'voiceover.srt').write_text('\n'.join(srt))

    preview = VOICE_DIR / 'preview.wav'
    if mix:
        inputs, filters = [], []
        for i, (path, start) in enumerate(mix):
            inputs += ['-i', str(path)]
            delay = int(start * 1000)
            filters.append(f'[{i}]adelay={delay}|{delay}[a{i}]')
        labels = ''.join(f'[a{i}]' for i in range(len(mix)))
        filters.append(f'{labels}amix=inputs={len(mix)}:normalize=0,apad=whole_dur={clock}')
        run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(filters),
             '-ar', str(RATE), '-ac', '1', '-t', f'{clock:.3f}', str(preview)])

    print(f'\n{"scene":<20} {"voice":>6} {"scene":>6} {"margin":>7}  gap  text')
    for scene, r, planned in rows:
        if not r:
            print(f"{scene['id']:<20} {'—':>6} {scene['durationSec']:>6.2f} {'—':>7}   —   (no voice)")
            continue
        margin = scene['durationSec'] - VOICE_OFFSET - r['durationSec']
        flag = 'yes' if r['changed'] else 'no'
        print(f"{scene['id']:<20} {r['durationSec']:>6.2f} {scene['durationSec']:>6.2f} "
              f"{margin:>7.2f}  {flag:<3}  {script[scene['id']]['text']}")
    print(f'\nvideo {clock:.1f} s (planned '
          f'{sum(s["plannedDurationSec"] for s in storyboard):.0f} s), '
          f'voice {sum(r["durationSec"] for r in report if "file" in r):.1f} s')


# ── main ─────────────────────────────────────────────────────────────────────────────


def main() -> int:
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)
    script = json.loads((VOICE_DIR / 'script.json').read_text())
    scene_ids = [s['sceneId'] for s in script]
    single, per_scene, short = inventory(set(scene_ids))
    if not single and not per_scene and not short:
        print('\nNothing to import. Drop voice/input/voiceover.(wav|m4a|mp3), or one '
              '<sceneId>.(wav|m4a|mp3) per scene, or short.(wav|m4a|mp3).')
        return 1

    state = load_state()
    sources = []
    if single:
        sources.append((single, [i for i in scene_ids if i not in per_scene]))
    sources += [(path, [scene_id]) for scene_id, path in per_scene.items()]

    report = []
    if sources:
        print('\nLong video')
        job = Job(VOICE_DIR / 'script.json', SEGMENTS_DIR, 'voice')
        report = import_voice(job, sources, state)
        timeline(report)

    short_script = VOICE_DIR / 'script-short.json'
    if short and short_script.exists():
        print('\nShort')
        ids = [s['sceneId'] for s in json.loads(short_script.read_text())]
        job = Job(short_script, SHORT_DIR / 'segments', 'short')
        short_report = import_voice(job, [(short, ids)], state)
        total = sum(r['durationSec'] for r in short_report if 'file' in r)
        print(f'  short voice {total:.1f} s')
        if total > SHORT_MAX_SEC:
            longest = sorted((r for r in short_report if 'file' in r),
                             key=lambda r: -r['durationSec'])[:2]
            warn(f'short: {total:.1f} s > {SHORT_MAX_SEC:.0f} s — cut '
                 + ' or '.join(r['sceneId'] for r in longest) + ' (never above 1.1×)')

    STATE_FILE.write_text(json.dumps(state, indent=1))
    if problems:
        print('\nTo look at')
        for p in problems:
            print(f'  - {p}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
