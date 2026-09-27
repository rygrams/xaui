// Fills `targetSec` in voice/script.json and voice/script-short.json, checks them against
// the brief, and writes voice/A-LIRE.md — the sheet read at the microphone or pasted into
// a TTS tool. The JSON is the source; the sheet is never edited by hand.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const videoDir = join(here, '..')
const voiceDir = join(videoDir, 'voice')
const COMPONENT = 'button'

/** English read at 160 words a minute. */
const WORDS_PER_SEC = 160 / 60
/** The caption enters 4–6 frames before the voice: keep that much of the scene free. */
const CAPTION_LEAD_SEC = 0.2
const SPOKEN_RATIO = [0.7, 0.85]
const SEGMENT_WORDS = [6, 18]
const SHORT_WORDS = [45, 65]
const SHORT_SENTENCES = [5, 6]
const BANNED = /\b(revolutionary|powerful|simply|seamless|game.?changer)\b/i

const readJson = file => JSON.parse(readFileSync(file, 'utf8'))
const spokenOf = segment => segment.spoken ?? segment.text
const wordsOf = text => text.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w))
const sentencesOf = text => text.split(/[.?!](?:\s|$)/).filter(s => s.trim())
const secondsOf = segment => wordsOf(spokenOf(segment)).length / WORDS_PER_SEC
const round1 = n => Math.round(n * 10) / 10
const fr = n => n.toFixed(1).replace('.', ',')

function trigrams(text) {
  const words = wordsOf(text.toLowerCase().replace(/[*.,:;!?]/g, ''))
  return new Set(words.slice(2).map((w, i) => `${words[i]} ${words[i + 1]} ${w}`))
}

const problems = []

function fillAndCheck(segments, label) {
  for (const segment of segments) {
    segment.targetSec = round1(secondsOf(segment))
    if (BANNED.test(segment.text))
      problems.push(`${label} ${segment.sceneId}: banned word`)
    for (const word of segment.emphasis)
      if (!new RegExp(`\\b${word}\\b`, 'i').test(spokenOf(segment)))
        problems.push(
          `${label} ${segment.sceneId}: emphasis "${word}" not in the text`
        )
  }
}

// The long video.
const storyboard = readJson(join(videoDir, 'storyboard.json'))
const script = readJson(join(voiceDir, 'script.json'))
fillAndCheck(script, 'script')

const scenes = new Map(storyboard.map(s => [s.id, s]))
for (const segment of script) {
  const scene = scenes.get(segment.sceneId)
  if (!scene) {
    problems.push(`script ${segment.sceneId}: no such scene`)
    continue
  }
  const words = wordsOf(spokenOf(segment)).length
  const bookend = scene.layout === 'intro' || scene.layout === 'outro'
  if (bookend && sentencesOf(spokenOf(segment)).length > 1)
    problems.push(`${segment.sceneId}: intro and outro take one sentence at most`)
  if (!bookend && (words < SEGMENT_WORDS[0] || words > SEGMENT_WORDS[1]))
    problems.push(`${segment.sceneId}: ${words} words, expected 6–18`)
  if (segment.targetSec > scene.durationSec - CAPTION_LEAD_SEC)
    problems.push(
      `${segment.sceneId}: ${segment.targetSec}s does not fit a ${scene.durationSec}s scene`
    )
  const caption = trigrams(scene.caption)
  for (const gram of trigrams(segment.text))
    if (caption.has(gram)) problems.push(`${segment.sceneId}: repeats the caption`)
}

const videoSec = storyboard.reduce((sum, s) => sum + s.durationSec, 0)
const spokenSec = script.reduce((sum, s) => sum + s.targetSec, 0)
const ratio = spokenSec / videoSec
if (ratio < SPOKEN_RATIO[0] || ratio > SPOKEN_RATIO[1])
  problems.push(
    `spoken ${round1(spokenSec)}s is ${Math.round(ratio * 100)}% of ${videoSec}s`
  )

// The short.
const short = readJson(join(voiceDir, 'script-short.json'))
fillAndCheck(short, 'short')
const shortText = short.map(spokenOf).join(' ')
const shortWords = wordsOf(shortText).length
const shortSentences = sentencesOf(shortText).length
if (shortWords < SHORT_WORDS[0] || shortWords > SHORT_WORDS[1])
  problems.push(`short: ${shortWords} words, expected 45–65`)
if (shortSentences < SHORT_SENTENCES[0] || shortSentences > SHORT_SENTENCES[1])
  problems.push(`short: ${shortSentences} sentences, expected 5–6`)

writeFileSync(join(voiceDir, 'script.json'), `${JSON.stringify(script, null, 2)}\n`)
writeFileSync(
  join(voiceDir, 'script-short.json'),
  `${JSON.stringify(short, null, 2)}\n`
)

// The sheet.
function bold(segment) {
  let text = spokenOf(segment)
  for (const word of segment.emphasis)
    text = text.replace(new RegExp(`\\b(${word})\\b`, 'i'), '**$1**')
  return text
}

/** `s03-solution` reads « Scène 03 · solution », `short-1-hook` « Phrase 1 · hook ». */
function titleOf(sceneId) {
  const scene = sceneId.match(/^s(\d+)-(.+)$/)
  if (scene) return `Scène ${scene[1]} · ${scene[2]}`
  const line = sceneId.match(/^short-(\d+)-(.+)$/)
  if (line) return `Phrase ${line[1]} · ${line[2]}`
  throw new Error(`unexpected sceneId "${sceneId}"`)
}

function blocks(segments, durationOf) {
  return segments
    .map(segment => {
      const scene = durationOf(segment)
      const head = `### ${titleOf(segment.sceneId)} · ≈ ${fr(segment.targetSec)} s${
        scene ? ` (scène : ${scene} s)` : ''
      }`
      const tone = segment.tone ? `\n\n_Ton : ${segment.tone}._` : ''
      return `${head}\n\n${bold(segment)}${tone}`
    })
    .join('\n\n')
}

const oneTake = segments => segments.map(spokenOf).join('\n[pause]\n')
const elevenLabs = segments =>
  segments
    .map((segment, i) =>
      i < segments.length - 1
        ? `${spokenOf(segment)} <break time="${(segment.pauseAfterMs || 800) / 1000}s" />`
        : spokenOf(segment)
    )
    .join('\n')

const c = COMPONENT
const sheet = `# Voix off · Button

Vidéo longue : ${videoSec} s, voix ≈ ${fr(spokenSec)} s (${Math.round(ratio * 100)} %).
Short : ${shortWords} mots, ≈ ${fr(short.reduce((s, x) => s + x.targetSec, 0))} s.
Anglais, débit visé 160 mots/min.

## 1. Consignes d'enregistrement

- Format : WAV ou M4A, 48 kHz si possible, pièce calme, micro à 15–20 cm.
- 1 s de silence au début et à la fin, environ 0,8 s entre chaque segment.
- Phrase ratée : marquer une pause, puis la relire en entier. Le montage garde la
  dernière prise.
- Ton : complice, léger, rapide. On sourit, on ne vend rien.
- Prononciation à confirmer avant d'enregistrer : « xtart-app » dans l'URL, écrit ici
  comme il se lit. Adapter le champ \`spoken\` du JSON si la marque se dit autrement,
  puis relancer \`node scripts/voice-sheet.mjs\`.

## 2. Version par scène

${blocks(script, segment => scenes.get(segment.sceneId)?.durationSec)}

## 3. Version en une seule prise

\`\`\`text
${oneTake(script)}
\`\`\`

## 4. Version ElevenLabs

\`\`\`text
${elevenLabs(script)}
\`\`\`

## 5. Version short

### Par phrase

${blocks(short, () => null)}

### En une seule prise

\`\`\`text
${oneTake(short)}
\`\`\`

### ElevenLabs

\`\`\`text
${elevenLabs(short)}
\`\`\`

## 6. Où déposer les fichiers

- Une seule prise pour toute la vidéo : \`video/${c}/voice/input/voiceover.(wav|m4a|mp3)\`
- OU un fichier par scène : \`video/${c}/voice/input/<sceneId>.(wav|m4a|mp3)\`
- Short : \`video/${c}/voice/input/short.(wav|m4a|mp3)\`
- Puis lancer \`03b-import-voix-manuelle.md\`
`

writeFileSync(join(voiceDir, 'A-LIRE.md'), sheet)

for (const s of script) {
  const scene = scenes.get(s.sceneId)
  console.log(
    `${s.sceneId.padEnd(20)} ${String(s.targetSec).padStart(4)}s / ${scene?.durationSec}s  ${s.text}`
  )
}
console.log(
  `voice ${round1(spokenSec)}s of ${videoSec}s (${Math.round(ratio * 100)}%), short ${shortWords} words / ${shortSentences} sentences`
)

if (problems.length) {
  console.error(`\n${problems.join('\n')}`)
  process.exit(1)
}
