// Turns storyboard.json + raw/ + voice/ into src/data.json, the only thing the Remotion
// composition reads, and copies the media into public/. Every timing decision of the edit
// is taken here, once, so the components only draw:
//
// - where each scene starts, and whether it enters with a crossfade (layout change) or a cut
// - how each clip is trimmed, slowed (never under 0.85×) or frozen to fill its scene
// - when the ripple lands: on the word "tap" / "add" of the voice when there is one
// - when the push-in starts: on the scene's first emphasised word, when nothing is tapped
// - when the code line lights up: when the voice names the prop
//
// It also writes final/button.srt on the real scene positions.
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { codeToTokens } from 'shiki'

const here = dirname(fileURLToPath(import.meta.url))
const composerDir = join(here, '..')
const videoDir = join(composerDir, '..')
const promptsDir = join(videoDir, '..')
const publicDir = join(composerDir, 'public')
const finalDir = join(videoDir, 'final')

const FPS = 30
const CROSSFADE = 8
const PUSH_FRAMES = 26
const CAPTION_LEAD = 5
const LINE_STAGGER = 4
const LINE_FIRST = 8
const MIN_RATE = 0.85
const TAIL_SEC = 0.4
const SRT_LINE = 42
// The voice words that name the press the viewer sees. Base forms only: "pressed
// shades" describes a colour, it does not press anything.
const ACTION_WORDS = /^(tap|press|open|add)$/

const readJson = path => JSON.parse(readFileSync(path, 'utf8'))
const sec = frames => frames / FPS
const frames = seconds => Math.round(seconds * FPS)
const norm = word => word.toLowerCase().replace(/[^a-z0-9]/g, '')
const notes = []

const storyboard = readJson(join(videoDir, 'storyboard.json'))
const script = new Map(readJson(join(videoDir, 'voice/script.json')).map(s => [s.sceneId, s]))
const wordsPath = join(videoDir, 'voice/words.json')
const words = new Map(
  existsSync(wordsPath) ? readJson(wordsPath).map(w => [w.sceneId, w.words]) : []
)

for (const dir of ['clips', 'voice', 'sfx', 'music']) mkdirSync(join(publicDir, dir), { recursive: true })
mkdirSync(finalDir, { recursive: true })

// ── camera ───────────────────────────────────────────────────────────────────────────

function firstPush(camera) {
  for (let i = 0; i < camera.length - 1; i++)
    if (camera[i].scale <= 1.001 && camera[i + 1].scale > 1.001) return i
  return -1
}

function pushEndFrame(camera) {
  const i = firstPush(camera)
  return i < 0 ? 0 : camera[i + 1].frame
}

// ── scenes ───────────────────────────────────────────────────────────────────────────

const scenes = []
let clock = 0

for (const [index, board] of storyboard.entries()) {
  const previous = storyboard[index - 1]
  const plan = script.get(board.id)
  const voiceWords = words.get(board.id) ?? []
  const hasVoice = Boolean(board.voice && existsSync(join(videoDir, board.voice.file)))
  let durationSec = board.durationSec
  let offsetSec = board.voice?.offsetSec ?? 0.3
  let camera = board.camera.map(k => ({ ...k }))
  let callouts = board.callouts.map(c => ({ ...c }))
  const pushEnd = sec(pushEndFrame(camera))

  // Clip: which part plays, and how the scene's taps line up with the voice.
  let clip = null
  let taps = []
  const tapsPath = join(videoDir, 'raw', `${board.id}.taps.json`)
  if (board.screenState && existsSync(tapsPath)) {
    const recorded = readJson(tapsPath)
    const clipSec = recorded.durationSec
    let trimSec = 0
    let rate = 1
    let synced = false

    if (recorded.taps.length) {
      const firstTap = recorded.taps[0].tSec
      const action = hasVoice ? voiceWords.find(w => ACTION_WORDS.test(norm(w.w))) : null
      if (action) {
        // The ripple lands on the word: move the clip, and the voice if the push-in
        // would still be running when the word is said.
        let tapAt = Math.max(offsetSec + action.start, pushEnd + 0.15)
        trimSec = firstTap - tapAt
        if (trimSec < 0) {
          tapAt = firstTap
          trimSec = 0
        }
        const newOffset = tapAt - action.start
        if (Math.abs(newOffset - offsetSec) > 0.01)
          notes.push(`${board.id}: voice moved to +${newOffset.toFixed(2)} s so "${action.w.trim()}" lands on the tap`)
        offsetSec = newOffset
        synced = true
      } else {
        // No word to follow: cut the dead start, keep a lead for the cursor to arrive.
        const wanted = Math.max(pushEnd + 0.3, 0.9)
        trimSec = Math.max(0, firstTap - wanted)
      }
    }

    if (hasVoice) {
      const pause = (plan?.pauseAfterMs ?? 800) / 1000
      const needed = offsetSec + board.voice.durationSec + pause + TAIL_SEC
      if (needed > durationSec + 0.01) {
        notes.push(`${board.id}: scene grows ${durationSec.toFixed(2)} → ${needed.toFixed(2)} s to keep the voice whole`)
        durationSec = needed
      }
    }

    const playable = clipSec - trimSec
    if (playable < durationSec && recorded.taps.length && !synced) {
      rate = Math.max(MIN_RATE, playable / durationSec)
      if (rate < 0.999) notes.push(`${board.id}: clip slowed to ${rate.toFixed(2)}×`)
    }
    const playFrames = Math.min(frames(durationSec), Math.floor(frames(playable / rate)))
    if (playFrames < frames(durationSec))
      notes.push(`${board.id}: last frame held ${sec(frames(durationSec) - playFrames).toFixed(2)} s`)

    copyFileSync(join(videoDir, 'raw', `${board.id}.mp4`), join(publicDir, 'clips', `${board.id}.mp4`))
    clip = {
      src: `clips/${board.id}.mp4`,
      trimBeforeFrames: frames(trimSec),
      playbackRate: Number(rate.toFixed(3)),
      playFrames,
    }
    taps = recorded.taps.map(t => ({
      target: t.target,
      frame: frames((t.tSec - trimSec) / rate),
      rx: t.rx,
      ry: t.ry,
    }))
  } else if (hasVoice) {
    const pause = (plan?.pauseAfterMs ?? 800) / 1000
    durationSec = Math.max(durationSec, offsetSec + board.voice.durationSec + pause + TAIL_SEC)
  }

  const durationInFrames = frames(durationSec)
  const voiceStart = frames(offsetSec)

  // Push-in on the emphasised word, when no tap dictates the timing.
  const push = firstPush(camera)
  if (push >= 0 && !taps.length && hasVoice && plan?.emphasis?.length) {
    const key = plan.emphasis.map(norm)
    const word = voiceWords.find(w => key.includes(norm(w.w)))
    if (word) {
      const at = voiceStart + frames(word.start)
      const delta = at - camera[push].frame
      const floor = push > 0 ? camera[push - 1].frame + 1 : 0
      const lastFrame = camera.at(-1).frame + delta
      if (camera[push].frame + delta >= floor && lastFrame + FPS <= durationInFrames) {
        camera = camera.map((k, i) => (i >= push ? { ...k, frame: k.frame + delta } : k))
        callouts = callouts.map(c => ({ ...c, fromFrame: c.fromFrame + delta, toFrame: c.toFrame + delta }))
        if (delta) notes.push(`${board.id}: push-in starts on "${word.w.trim()}" (${delta > 0 ? '+' : ''}${delta} frames)`)
      }
    }
  }

  // Never pull out while the finger is still at work: the result needs to be seen.
  if (taps.length) {
    const lastTap = Math.max(...taps.map(t => t.frame))
    const out = camera.findIndex((k, i) => i > 0 && k.scale <= 1.001 && camera[i - 1].scale > 1.001)
    if (out > 0 && camera[out - 1].frame < lastTap + 24) {
      const delta = Math.min(lastTap + 24 - camera[out - 1].frame, durationInFrames - CROSSFADE - camera[out].frame)
      if (delta > 0) {
        camera = camera.map((k, i) => (i >= out - 1 && i > 0 && k.frame >= camera[out - 1].frame ? { ...k, frame: k.frame + delta } : k))
        notes.push(`${board.id}: pull-out moved ${delta} frames after the last tap`)
      }
    }
  }

  // Pull out before a change of layout, if the scene ends zoomed in.
  const next = storyboard[index + 1]
  const last = camera.at(-1)
  if (last && last.scale > 1.001 && next && next.layout !== board.layout) {
    const hold = durationInFrames - CROSSFADE - PUSH_FRAMES
    if (hold > last.frame + 6) {
      camera.push({ ...last, frame: hold })
      camera.push({ frame: durationInFrames - CROSSFADE, scale: 1, x: 0.5, y: 0.5 })
    }
  }
  // A callout lives only while its point is in the frame.
  callouts = callouts.map(c => ({ ...c, toFrame: Math.min(c.toFrame, durationInFrames - CROSSFADE - PUSH_FRAMES) }))

  // Voice.
  let voice = null
  if (hasVoice) {
    copyFileSync(join(videoDir, board.voice.file), join(publicDir, 'voice', `${board.id}.wav`))
    voice = {
      src: `voice/${board.id}.wav`,
      startFrame: voiceStart,
      durationInFrames: frames(board.voice.durationSec),
      words: voiceWords.map(w => ({ w: w.w, start: voiceStart + frames(w.start), end: voiceStart + frames(w.end) })),
    }
  }

  // Code, coloured once here with shiki's github-light.
  let code = null
  if (board.layout === 'codeSplit' && board.code) {
    const { tokens } = await codeToTokens(board.code, { lang: 'tsx', theme: 'github-light' })
    // github-light paints component names and constants #005CC5, a blue next to the
    // accent. One accent only: those take github-light's own tag green instead.
    const lines = tokens.map(line =>
      line.map(t => ({ content: t.content, color: t.color?.toUpperCase() === '#005CC5' ? '#22863A' : t.color }))
    )
    const lastLineIn = LINE_FIRST + (lines.length - 1) * LINE_STAGGER + 10
    const highlight = board.highlightLines ?? []
    const propWords = new Set(
      highlight.flatMap(n => (board.code.split('\n')[n - 1] ?? '').match(/[A-Za-z][A-Za-z0-9]+/g) ?? []).map(norm)
    )
    propWords.delete('button')
    let highlightFrame = null
    if (voice) {
      const heard = voice.words
      const said = heard.find((w, i) => {
        const one = norm(w.w)
        const two = one + norm(heard[i + 1]?.w ?? '')
        return [...propWords].some(p => p.length > 2 && (one === p || two === p || (one.length > 3 && one.startsWith(p)) || (p.length > 3 && p.startsWith(one) && one.length > 3)))
      })
      const emphasis = (plan?.emphasis ?? []).map(norm)
      const fallback = heard.find(w => emphasis.includes(norm(w.w)))
      highlightFrame = (said ?? fallback)?.start ?? voice.startFrame + Math.round(voice.durationInFrames * 0.4)
      if (!said) notes.push(`${board.id}: the voice does not name the highlighted prop — highlight on "${fallback?.w.trim() ?? '40% of the voice'}"`)
    }
    code = {
      label: board.codeLabel ?? '',
      lines,
      highlightLines: highlight,
      firstLineFrame: LINE_FIRST,
      lineStagger: LINE_STAGGER,
      highlightFrame: Math.max(highlightFrame ?? lastLineIn, lastLineIn),
    }
  }

  const caption = board.caption
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map(part => ({ text: part.replace(/\*/g, ''), accent: part.startsWith('*') }))

  const transitionIn = index > 0 && previous.layout !== board.layout ? CROSSFADE : 0
  const from = clock - transitionIn
  clock = from + durationInFrames

  scenes.push({
    id: board.id,
    layout: board.layout,
    from,
    durationInFrames,
    transitionIn,
    caption: {
      parts: caption,
      onScreen: board.captionOnScreen !== false,
      enterFrame: Math.max(0, (voice ? voice.startFrame : 11) - CAPTION_LEAD),
    },
    voice,
    clip,
    camera,
    taps,
    cursor: Boolean(board.cursor && taps.length),
    callouts,
    code,
    appearance: board.appearance ?? 'light',
  })
}

// ── sound effects, music ─────────────────────────────────────────────────────────────

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args])
}

// A soft tick: a short 1.6 kHz sine with a fast exponential decay.
ffmpeg(['-f', 'lavfi', '-i', 'sine=frequency=1600:sample_rate=48000:duration=0.06',
  '-af', "volume='exp(-t*70)':eval=frame,afade=t=in:d=0.002", '-ac', '1', join(publicDir, 'sfx/tick.wav')])
// A very light whoosh: pink noise swept through a band-pass, in and out in 0.35 s.
ffmpeg(['-f', 'lavfi', '-i', 'anoisesrc=color=pink:sample_rate=48000:duration=0.35:amplitude=0.6',
  '-af', "bandpass=f=900:w=1.4,afade=t=in:d=0.16:curve=qsin,afade=t=out:st=0.16:d=0.19:curve=qsin",
  '-ac', '1', join(publicDir, 'sfx/whoosh.wav')])

// The track: MUSIC_PATH when given (make.sh passes the one this video uses), otherwise
// the first file of video/music/. None: the bed stays empty and the edit says so.
let music = null
const musicDir = join(promptsDir, 'music')
const fromDir = existsSync(musicDir)
  ? readdirSync(musicDir).filter(f => /\.(mp3|wav|m4a|aac|flac|ogg)$/i.test(f)).sort()[0]
  : undefined
const track = process.env.MUSIC_PATH || (fromDir ? join(musicDir, fromDir) : undefined)
if (track && existsSync(track)) {
  // Level the track to the voice's -16 LUFS so the -28 / -20 dB offsets mean what they say.
  ffmpeg(['-i', track, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2',
    join(publicDir, 'music', 'music.wav')])
  music = { src: 'music/music.wav', name: basename(track) }
} else {
  notes.push(`no music${track ? ` (${track} not found)` : ''}: set MUSIC_PATH or drop a track in video/music/`)
}

copyFileSync(join(promptsDir, 'assets/xaui-logo.svg'), join(publicDir, 'logo.svg'))

const durationInFrames = clock
const transitions = scenes.filter(s => s.transitionIn).map(s => s.from)
writeFileSync(join(composerDir, 'src/data.json'), `${JSON.stringify({ fps: FPS, durationInFrames, scenes, music, transitions }, null, 1)}\n`)

// ── subtitles on the real positions ──────────────────────────────────────────────────

function srtTime(totalSec) {
  const ms = Math.round(totalSec * 1000)
  const pad = (n, w = 2) => String(n).padStart(w, '0')
  return `${pad(Math.floor(ms / 3_600_000))}:${pad(Math.floor(ms / 60_000) % 60)}:${pad(Math.floor(ms / 1000) % 60)},${pad(ms % 1000, 3)}`
}

function cues(text) {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if (line && line.length + 1 + word.length > SRT_LINE) {
      lines.push(line)
      line = word
    } else line = `${line} ${word}`.trim()
  }
  if (line) lines.push(line)
  const out = []
  for (let i = 0; i < lines.length; i += 2) out.push(lines.slice(i, i + 2))
  return out
}

const srt = []
for (const scene of scenes) {
  if (!scene.voice) continue
  const text = script.get(scene.id)?.text ?? ''
  const chunks = cues(text)
  const chars = chunks.reduce((n, c) => n + c.join(' ').length, 0)
  let t = sec(scene.from + scene.voice.startFrame)
  const total = sec(scene.voice.durationInFrames)
  for (const chunk of chunks) {
    const length = (total * chunk.join(' ').length) / chars
    srt.push(`${srt.length + 1}\n${srtTime(t)} --> ${srtTime(t + length)}\n${chunk.join('\n')}\n`)
    t += length
  }
}
writeFileSync(join(finalDir, 'button.srt'), srt.join('\n'))

console.log(`composition ${durationInFrames} frames = ${sec(durationInFrames).toFixed(2)} s, ${scenes.length} scenes, ${transitions.length} crossfades`)
for (const s of scenes)
  console.log(`  ${s.id.padEnd(20)} ${sec(s.from).toFixed(2).padStart(6)} s  ${sec(s.durationInFrames).toFixed(2).padStart(5)} s  ${s.transitionIn ? 'fade' : 'cut '}  ${s.clip ? `clip ×${s.clip.playbackRate} trim ${sec(s.clip.trimBeforeFrames).toFixed(2)}` : ''}`)
for (const n of notes) console.log(`  · ${n}`)
