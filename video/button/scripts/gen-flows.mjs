// Writes one Maestro flow per filmed scene from storyboard.json, plus the hook shot.
// The storyboard stays the single source of truth for targets and timing; the flows are
// its executable form and are regenerated, never edited.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const videoDir = join(here, '..')
const flowsDir = join(videoDir, 'flows')

export const APP_ID = 'com.anonymous.demo'
export const deepLink = screenState => `demo://demo/button?scene=${screenState}`

/** The close-up for the short: not a scene of the long video, so it lives here. */
export const HOOK = {
  id: 'hook',
  durationSec: 5,
  screenState: 'hook',
  interactions: [{ type: 'tap', target: 'hook-button', atSec: 1.2 }],
}

/** Human rhythm: never two actions closer than 600 ms, never a wait under it. */
const MIN_GAP = 0.6

/**
 * Measured on the simulator: a `tapOn` by id lands ~0.5 s after it is issued (finding the
 * element), and with `waitForAnimationToEnd` the next command starts ~0.8 s after that.
 * Those 1.3 s are already a human gap, so a hold is only added on top when the storyboard
 * asks for more.
 */
const TAP_LOOKUP = 0.5
const TAP_SETTLE = 0.8
/** The clip starts this long before the flow's first command (see capture.mjs). */
const LEAD_IN = 0.5

export function filmedScenes() {
  const storyboard = JSON.parse(
    readFileSync(join(videoDir, 'storyboard.json'), 'utf8')
  )
  return [...storyboard.filter(s => s.screenState), HOOK]
}

// `extendedWaitUntil` on an id that never appears, marked optional, is Maestro's way of
// holding still for an exact time: it waits out the timeout and moves on.
const pause = sec => [
  '- extendedWaitUntil:',
  '    visible:',
  '      id: "__hold__"',
  `    timeout: ${Math.round(Math.max(MIN_GAP, sec) * 1000)}`,
  '    optional: true',
]

function flowFor(scene) {
  const taps = scene.interactions.filter(i => i.type === 'tap')
  const lines = [
    `appId: ${APP_ID}`,
    `name: ${scene.id}`,
    '---',
    '# Standalone, the flow opens its screen. make.sh opens it before recording and',
    '# passes SKIP_OPEN=1, so the clip starts on a settled screen. (A flow-level `env`',
    '# default would win over `-e`, hence the typeof test.)',
    '- runFlow:',
    '    when:',
    "      true: ${typeof SKIP_OPEN === 'undefined'}",
    '    file: _open.yaml',
    '    env:',
    `      LINK: ${deepLink(scene.screenState)}`,
  ]

  let clock = LEAD_IN
  taps.forEach((tap, index) => {
    const gap = tap.atSec - clock - TAP_LOOKUP
    // The first command always holds: it is where the clip starts, on a still screen.
    if (index === 0 || gap >= MIN_GAP) lines.push(...pause(gap))
    lines.push('- tapOn:', `    id: ${tap.target}`, '- waitForAnimationToEnd')
    clock = Math.max(tap.atSec, clock + TAP_LOOKUP) + TAP_SETTLE
  })
  lines.push(...pause(scene.durationSec - clock + LEAD_IN))

  return `${lines.join('\n')}\n`
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const scene of filmedScenes()) {
    writeFileSync(join(flowsDir, `${scene.id}.yaml`), flowFor(scene))
    console.log(`flows/${scene.id}.yaml`)
  }
}
