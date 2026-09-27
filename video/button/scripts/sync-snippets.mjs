// Copies each `#region snippet:<id>` of the demo screens into the storyboard scene whose
// `codeRef` is <id>, then checks the storyboard against the brief. The snippets are never
// typed by hand: what the code card shows is what the phone runs.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const videoDir = join(here, '..')
const demoDir = join(here, '../../../apps/demo/demo/button')
const storyboardPath = join(videoDir, 'storyboard.json')

/** A code card holds about 60 monospace characters at 30–34 px in 1080p. */
const MAX_LINE = 60

function extractRegions() {
  const regions = new Map()
  for (const file of readdirSync(demoDir).filter(f => f.endsWith('.tsx'))) {
    let current = null
    for (const line of readFileSync(join(demoDir, file), 'utf8').split('\n')) {
      const open = line.match(/#region snippet:([\w-]+)/)
      if (open) {
        current = { id: open[1], lines: [] }
        continue
      }
      if (current && line.includes('#endregion')) {
        const blocks = regions.get(current.id) ?? []
        blocks.push(current.lines)
        regions.set(current.id, blocks)
        current = null
        continue
      }
      if (current) current.lines.push(line)
    }
  }
  return regions
}

function dedent(lines) {
  const indents = lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length)
  const min = Math.min(...indents)
  return lines.map(l => l.slice(min))
}

/** `<Button\n  a\n  b\n>` becomes `<Button a b>` when stripping `testID` left it short. */
function collapseTags(lines) {
  const out = []
  for (let i = 0; i < lines.length; i++) {
    const open = lines[i].match(/^(\s*)<([\w.]+)$/)
    if (!open) {
      out.push(lines[i])
      continue
    }
    const attrs = []
    let j = i + 1
    while (j < lines.length && !/^\s*\/?>$/.test(lines[j])) {
      attrs.push(lines[j].trim())
      j++
    }
    const close = (lines[j] ?? '>').trim()
    const joined = `${open[1]}<${open[2]} ${attrs.join(' ')}${close === '/>' ? ' />' : '>'}`
    if (joined.length <= MAX_LINE) {
      out.push(joined)
    } else {
      out.push(...lines.slice(i, j + 1))
    }
    i = j
  }
  return out
}

/** A `testID` is for Maestro, not for the viewer: drop it, inline or on its own line. */
function stripTestIds(lines) {
  return lines
    .filter(l => !/^\s*testID=\S+$/.test(l))
    .map(l => l.replace(/\s+testID=("[^"]*"|\{[^}]*\})/g, ''))
}

function toSnippet(blocks) {
  return blocks
    .map(block => collapseTags(dedent(stripTestIds(block))).join('\n'))
    .join('\n\n')
}

const regions = extractRegions()
const storyboard = JSON.parse(readFileSync(storyboardPath, 'utf8'))
const problems = []

for (const scene of storyboard) {
  const words = scene.caption.replace(/\*/g, '').split(/\s+/).filter(Boolean)
  if (scene.layout !== 'outro' && (words.length < 2 || words.length > 6))
    problems.push(`${scene.id}: caption has ${words.length} words`)
  if (scene.durationSec < 3 || scene.durationSec > 8)
    problems.push(`${scene.id}: durationSec ${scene.durationSec} is outside 3–8`)

  if (scene.layout !== 'codeSplit') continue
  const blocks = regions.get(scene.codeRef)
  if (!blocks) {
    problems.push(`${scene.id}: no #region snippet:${scene.codeRef} in ${demoDir}`)
    continue
  }
  scene.code = toSnippet(blocks)
  const lines = scene.code.split('\n')
  lines.forEach((line, n) => {
    if (line.length > MAX_LINE)
      problems.push(`${scene.id}: line ${n + 1} is ${line.length} chars`)
  })
  for (const n of scene.highlightLines ?? [])
    if (!lines[n - 1]?.trim()) problems.push(`${scene.id}: highlight ${n} is empty`)
}

const total = storyboard.reduce((sum, s) => sum + s.durationSec, 0)
if (storyboard.length < 10 || storyboard.length > 16)
  problems.push(`${storyboard.length} scenes, expected 10–16`)
if (total < 60 || total > 110) problems.push(`total ${total}s, expected 60–110`)

writeFileSync(storyboardPath, `${JSON.stringify(storyboard, null, 2)}\n`)

for (const s of storyboard)
  console.log(
    `${s.id.padEnd(20)} ${s.layout.padEnd(10)} ${String(s.durationSec).padStart(2)}s  ${s.caption}`
  )
console.log(`total ${total.toFixed(1)}s, ${storyboard.length} scenes`)

if (problems.length) {
  console.error(`\n${problems.join('\n')}`)
  process.exit(1)
}
