// Renders the finals: button-16x9.mp4 (voice + music + interface sounds) and
// button-nosound.mp4 (music only, for the docs), then levels the loudness and measures it.
//
//   node scripts/render.mjs [--frames 0-299]   # a range renders a test into out/ only
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const composerDir = join(here, '..')
const videoDir = join(composerDir, '..')
const finalDir = join(videoDir, 'final')
const outDir = join(composerDir, 'out')
const qaDir = join(videoDir, 'qa')

/** Integrated loudness target; the brief accepts -14 to -16 LUFS, true peak ≤ -1 dBTP. */
const TARGET_LUFS = -15
const MAX_TRUE_PEAK = -1.5

const args = process.argv.slice(2)
const frames = args.includes('--frames') ? args[args.indexOf('--frames') + 1] : null

const run = (cmd, argv, options = {}) =>
  execFileSync(cmd, argv, { cwd: composerDir, encoding: 'utf8', maxBuffer: 1 << 28, ...options })

function render(composition, file) {
  console.log(`[render] ${composition} → ${file}`)
  run(
    'npx',
    [
      'remotion', 'render', 'src/index.ts', composition, file,
      '--codec=h264', '--crf=18', '--audio-codec=aac', '--audio-bitrate=192k',
      '--pixel-format=yuv420p', '--log=error',
      ...(frames ? [`--frames=${frames}`] : []),
    ],
    { stdio: 'inherit' }
  )
}

function loudness(file) {
  const result = execFileSync(
    'bash',
    ['-c', `ffmpeg -hide_banner -i "${file}" -af loudnorm=print_format=json -f null - 2>&1`],
    { encoding: 'utf8', maxBuffer: 1 << 26 }
  )
  const json = JSON.parse(result.slice(result.lastIndexOf('{'), result.lastIndexOf('}') + 1))
  return { integrated: Number(json.input_i), truePeak: Number(json.input_tp), lra: Number(json.input_lra) }
}

/** A pure gain towards the target, held back by the true-peak ceiling. No compression. */
function level(file) {
  const before = loudness(file)
  const gain = Math.min(TARGET_LUFS - before.integrated, MAX_TRUE_PEAK - before.truePeak)
  const tmp = file.replace(/\.mp4$/, '.level.mp4')
  run('ffmpeg', [
    '-y', '-v', 'error', '-i', file, '-c:v', 'copy', '-af', `volume=${gain.toFixed(2)}dB`,
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', tmp,
  ])
  renameSync(tmp, file)
  const after = loudness(file)
  console.log(
    `[loudness] ${before.integrated.toFixed(1)} → ${after.integrated.toFixed(1)} LUFS, ` +
      `true peak ${after.truePeak.toFixed(1)} dBTP (gain ${gain >= 0 ? '+' : ''}${gain.toFixed(1)} dB)`
  )
  return after
}

/** Title, pitch, chapters on the real scene positions, and the music credit if any. */
function writeDescription() {
  const data = JSON.parse(readFileSync(join(composerDir, 'src/data.json'), 'utf8'))
  const stamp = frame => {
    const total = Math.round(frame / data.fps)
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
  }
  const chapters = data.scenes
    .filter(s => s.layout !== 'outro')
    .map(s => `${stamp(s.from + s.transitionIn)} ${s.layout === 'intro' ? 'Intro' : s.caption.parts.map(p => p.text).join('')}`)
  const credits = readFileSync(join(videoDir, '..', 'music', 'CREDITS.md'), 'utf8')
    .split('\n')
    .filter(line => /^\|/.test(line) && !/^\|\s*(File|-)/.test(line) && !/to fill in/.test(line))
  const text = [
    'Button · XAUI component of the week',
    '',
    'One composable control for every action in a React Native app: seven variants, four',
    'sizes, icons in JSX order, a built-in loading state, any brand tint, and dark mode',
    'with no extra code.',
    '',
    'Docs: https://ui.xtartapp.com',
    '',
    'Chapters',
    ...chapters,
    ...(credits.length ? ['', 'Music', ...credits] : []),
    '',
  ].join('\n')
  writeFileSync(join(finalDir, 'button-description.txt'), text)
}

run('node', ['scripts/prepare.mjs'], { stdio: 'inherit' })

if (frames) {
  mkdirSync(outDir, { recursive: true })
  render('Button16x9', join(outDir, 'test.mp4'))
  process.exit(0)
}

mkdirSync(finalDir, { recursive: true })
mkdirSync(qaDir, { recursive: true })

const main = join(finalDir, 'button-16x9.mp4')
render('Button16x9', main)
const measured = level(main)

const nosound = join(finalDir, 'button-nosound.mp4')
render('Button16x9NoSound', nosound)
// With no music there is nothing to hear, but players and embeds expect an audio track.
const streams = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'csv=p=0', nosound])
if (!streams.includes('audio')) {
  const tmp = nosound.replace(/\.mp4$/, '.silent.mp4')
  run('ffmpeg', [
    '-y', '-v', 'error', '-i', nosound, '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', tmp,
  ])
  renameSync(tmp, nosound)
} else {
  level(nosound)
}

run('ffmpeg', [
  '-y', '-v', 'error', '-i', main, '-vf', 'fps=1/3,scale=480:-1,tile=6x5',
  '-frames:v', '1', join(qaDir, 'sheet.png'),
])

writeFileSync(join(qaDir, 'loudness.json'), `${JSON.stringify(measured, null, 2)}\n`)
writeDescription()
const ok = measured.integrated <= -14 && measured.integrated >= -16 && measured.truePeak <= -1
console.log(ok ? '[loudness] within -14…-16 LUFS, ≤ -1 dBTP' : '[loudness] OUT OF RANGE')
for (const stale of ['test.mp4'].map(f => join(outDir, f))) if (existsSync(stale)) rmSync(stale)
if (!ok) process.exit(1)
