// Films every scene of storyboard.json on the iOS Simulator: build, install, then for each
// scene open its deep link, read the targets' bounds, record while Maestro plays the flow,
// trim to the action and log where and when each tap landed.
//
//   node scripts/capture.mjs [--scene <id>] [--skip-build]
import { execFileSync, spawn } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { APP_ID, deepLink, filmedScenes } from './gen-flows.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const videoDir = join(here, '..')
const repoDir = join(videoDir, '../..')
const iosDir = join(repoDir, 'apps/demo/ios')
const rawDir = join(videoDir, 'raw')
const shotsDir = join(videoDir, 'shots')
const tmpDir = join(videoDir, '.tmp')
const buildDir = join(iosDir, 'build/video')
const appPath = join(buildDir, 'Build/Products/Release-iphonesimulator/demo.app')

const MARGIN_SEC = 0.5
const DEVICES = ['iPhone 15 Pro', 'iPhone 17 Pro', 'iPhone 16 Pro']

const args = process.argv.slice(2)
const only = args.includes('--scene') ? args[args.indexOf('--scene') + 1] : null
const skipBuild = args.includes('--skip-build')

const env = {
  ...process.env,
  LANG: 'en_US.UTF-8',
  LC_ALL: 'en_US.UTF-8',
  JAVA_HOME: process.env.JAVA_HOME ?? '/opt/homebrew/opt/openjdk@17',
  PATH: `${join(homedir(), '.maestro/bin')}:/opt/homebrew/opt/openjdk@17/bin:${process.env.PATH}`,
  MAESTRO_CLI_NO_ANALYTICS: '1',
  MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED: 'true',
}

const run = (cmd, argv, options = {}) =>
  execFileSync(cmd, argv, { env, encoding: 'utf8', maxBuffer: 1 << 28, ...options })
const log = message => console.log(`[capture] ${message}`)
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

function pickDevice() {
  if (process.env.SIM_UDID) return process.env.SIM_UDID
  const { devices } = JSON.parse(
    run('xcrun', ['simctl', 'list', 'devices', 'available', '-j'])
  )
  const all = Object.values(devices).flat()
  for (const name of DEVICES) {
    const found = all.find(d => d.name === name)
    if (found) return found.udid
  }
  throw new Error(`No simulator named ${DEVICES.join(' / ')}. Set SIM_UDID.`)
}

function prepareDevice(udid) {
  try {
    run('xcrun', ['simctl', 'boot', udid], { stdio: 'ignore' })
  } catch {
    // Already booted.
  }
  run('xcrun', ['simctl', 'bootstatus', udid, '-b'])
  run('xcrun', [
    'simctl',
    'status_bar',
    udid,
    'override',
    '--time',
    '9:41',
    '--batteryState',
    'charged',
    '--batteryLevel',
    '100',
    '--wifiBars',
    '3',
    '--cellularBars',
    '4',
  ])
}

function build(udid) {
  if (!existsSync(iosDir)) {
    log('no ios/ folder: expo prebuild')
    run('npx', ['expo', 'prebuild', '-p', 'ios'], {
      cwd: join(repoDir, 'apps/demo'),
      stdio: 'inherit',
    })
  }
  log(
    'xcodebuild Release (the bundle is embedded: no Metro, no dev banner, no LogBox)'
  )
  run(
    'xcodebuild',
    [
      '-workspace',
      'demo.xcworkspace',
      '-scheme',
      'demo',
      '-configuration',
      'Release',
      '-sdk',
      'iphonesimulator',
      '-destination',
      `id=${udid}`,
      '-derivedDataPath',
      buildDir,
      // Some pods still declare iOS 9–12, which current SDKs refuse to build, and
      // expo-router needs 16+. A simulator build only ever runs on a recent runtime.
      'IPHONEOS_DEPLOYMENT_TARGET=17.0',
    ],
    { cwd: iosDir, stdio: ['ignore', 'ignore', 'inherit'] }
  )
  run('xcrun', ['simctl', 'install', udid, appPath])
}

function maestro(udid, argv) {
  return run('maestro', ['--device', udid, ...argv], { cwd: videoDir })
}

/** Every element carrying a testID, with its frame in points. */
function readBounds(udid) {
  const tree = JSON.parse(maestro(udid, ['hierarchy']))
  const bounds = {}
  const walk = node => {
    const a = node.attributes ?? {}
    const id = a['resource-id'] || a.identifier
    const m = (a.bounds ?? '').match(
      /\[(-?[\d.]+),(-?[\d.]+)\]\[(-?[\d.]+),(-?[\d.]+)\]/
    )
    if (id && m) {
      const [x1, y1, x2, y2] = m.slice(1).map(Number)
      bounds[id] ??= { x: x1, y: y1, width: x2 - x1, height: y2 - y1 }
    }
    for (const child of node.children ?? []) walk(child)
  }
  walk(tree)
  return bounds
}

function startRecording(udid, file) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'xcrun',
      ['simctl', 'io', udid, 'recordVideo', '--codec=h264', '--force', file],
      { env }
    )
    const onData = chunk => {
      if (String(chunk).includes('Recording started'))
        resolve({ child, startedAt: Date.now() })
    }
    child.stderr.on('data', onData)
    child.stdout.on('data', onData)
    child.on('exit', code => reject(new Error(`recordVideo exited early (${code})`)))
  })
}

function stopRecording(child) {
  return new Promise(resolve => {
    child.removeAllListeners('exit')
    child.on('exit', resolve)
    child.kill('SIGINT')
  })
}

/** The flow's own steps from Maestro's debug output, with their wall-clock window. */
const SETUP_COMMANDS = [
  'defineVariablesCommand',
  'applyConfigurationCommand',
  'runFlowCommand',
]

function readCommands(debugDir) {
  const files = []
  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) walk(path)
      else if (entry.name === 'commands.json') files.push(path)
    }
  }
  walk(debugDir)
  if (!files.length) throw new Error(`no commands.json in ${debugDir}`)
  return JSON.parse(readFileSync(files[0], 'utf8'))
    .filter(entry => entry.metadata?.timestamp && entry.metadata.depth === 0)
    .map(entry => {
      const name = Object.keys(entry.command).find(k => entry.command[k]) ?? '?'
      return {
        name,
        command: entry.command[name],
        start: entry.metadata.timestamp,
        end: entry.metadata.timestamp + (entry.metadata.duration ?? 0),
      }
    })
    .filter(c => !SETUP_COMMANDS.includes(c.name))
    .sort((a, b) => a.start - b.start)
}

/** When the simulator wrote a frame, in seconds from the start of the recording. */
function frameTimes(file) {
  return run('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v',
    '-show_entries',
    'frame=pts_time',
    '-of',
    'csv=p=0',
    file,
  ])
    .split('\n')
    .map(Number)
    .filter(t => Number.isFinite(t) && t > 0)
}

function probeDuration(file) {
  return Number(
    run('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'csv=p=0',
      file,
    ])
  )
}

async function film(udid, scene, screen) {
  const full = join(tmpDir, `${scene.id}.full.mp4`)
  const clip = join(rawDir, `${scene.id}.mp4`)
  const debugDir = join(tmpDir, scene.id)
  rmSync(debugDir, { recursive: true, force: true })

  run('xcrun', ['simctl', 'ui', udid, 'appearance', scene.appearance ?? 'light'])
  maestro(udid, [
    'test',
    '-e',
    `LINK=${deepLink(scene.screenState)}`,
    'flows/_open.yaml',
  ])
  const bounds = readBounds(udid)

  const { child, startedAt } = await startRecording(udid, full)
  await wait(MARGIN_SEC * 1000)
  maestro(udid, [
    'test',
    '-e',
    'SKIP_OPEN=1',
    '--debug-output',
    debugDir,
    `flows/${scene.id}.yaml`,
  ])
  await wait(MARGIN_SEC * 1000)
  await stopRecording(child)
  const stoppedAt = Date.now()

  const commands = readCommands(debugDir)
  const first = commands[0].start
  const last = commands.at(-1).end
  const from = Math.max(0, (first - startedAt) / 1000 - MARGIN_SEC)
  const to = Math.min(
    (stoppedAt - startedAt) / 1000,
    (last - startedAt) / 1000 + MARGIN_SEC
  )

  // The simulator only writes a frame when the screen changes, so a still ending is
  // missing from the file: hold the last frame up to the wall-clock length of the take,
  // then resample to a constant 60 fps, which editors do not drift on.
  const hold =
    Math.max(0, (stoppedAt - startedAt) / 1000 - probeDuration(full)) + 0.1
  run('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-i',
    full,
    '-vf',
    [
      `tpad=stop_mode=clone:stop_duration=${hold.toFixed(3)}`,
      'fps=60',
      `trim=start=${from.toFixed(3)}:end=${to.toFixed(3)}`,
      'setpts=PTS-STARTPTS',
    ].join(','),
    '-c:v',
    'libx264',
    '-crf',
    '14',
    '-preset',
    'slow',
    '-pix_fmt',
    'yuv420p',
    '-an',
    clip,
  ])

  // A frame is written only when the screen changes, so the first one inside a tap's
  // command window is the press landing: Maestro spends the start finding the element.
  const frames = frameTimes(full)
  const pressedAt = c => {
    const start = (c.start - startedAt) / 1000
    const end = (c.end - startedAt) / 1000
    return frames.find(t => t > start && t <= end) ?? start + 0.35
  }

  const taps = commands
    .filter(c => c.name === 'tapOnElement')
    .map(c => {
      const target = c.command.selector?.idRegex ?? c.command.selector?.id
      const b = bounds[target]
      if (!b) throw new Error(`${scene.id}: no bounds for testID "${target}"`)
      const x = b.x + b.width / 2
      const y = b.y + b.height / 2
      return {
        target,
        tSec: Number((pressedAt(c) - from).toFixed(3)),
        x,
        y,
        rx: Number((x / screen.width).toFixed(4)),
        ry: Number((y / screen.height).toFixed(4)),
        bounds: b,
      }
    })

  const duration = probeDuration(clip)
  if (!(duration > 0)) throw new Error(`${scene.id}: empty clip`)
  run('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-ss',
    (duration / 2).toFixed(3),
    '-i',
    clip,
    '-frames:v',
    '1',
    join(shotsDir, `${scene.id}.png`),
  ])
  writeFileSync(
    join(rawDir, `${scene.id}.taps.json`),
    `${JSON.stringify({ scene: scene.id, durationSec: duration, screen, taps }, null, 2)}\n`
  )
  log(`${scene.id}: ${duration.toFixed(2)} s, ${taps.length} tap(s)`)
  return { id: scene.id, duration, taps: taps.length }
}

async function main() {
  for (const dir of [rawDir, shotsDir, tmpDir]) mkdirSync(dir, { recursive: true })
  const udid = pickDevice()
  log(`device ${udid}`)
  prepareDevice(udid)
  if (!skipBuild) build(udid)

  const scenes = filmedScenes().filter(s => !only || s.id === only)
  if (!scenes.length) throw new Error(`no filmed scene "${only}"`)

  // The screen's size in points, read once from the first scene's root.
  maestro(udid, ['test', '-e', `LINK=${deepLink('basic')}`, 'flows/_open.yaml'])
  const root = readBounds(udid)['scene-ready']
  const screen = { width: root.x * 2 + root.width, height: root.y * 2 + root.height }

  const results = []
  for (const scene of scenes) results.push(await film(udid, scene, screen))

  run('xcrun', ['simctl', 'ui', udid, 'appearance', 'light'])
  rmSync(tmpDir, { recursive: true, force: true })
  console.table(results)
  log(`app ${APP_ID}, ${results.length} clip(s) in video/button/raw`)
}

main().catch(error => {
  console.error(error.message)
  process.exit(1)
})
