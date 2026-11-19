/** A piece of a label, and whether it is what was searched for. */
export type MatchRun = { text: string; isHit: boolean }

/**
 * One character folded the way `matchesQuery` folds a label: accents dropped, case
 * dropped. Character by character, so a position in the folded label is the same
 * position in the label — `ç` stays one character where `ß` would not, and a character
 * that folds to nothing keeps its place as itself.
 */
function foldChar(char: string): string {
  const folded = char.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

  return Array.from(folded).length === 1 ? folded : char
}

/** Where `needle` first starts in `chars`, compared character by character; -1 if nowhere. */
function indexOfRun(chars: string[], needle: string[]): number {
  for (let start = 0; start + needle.length <= chars.length; start++) {
    if (needle.every((char, offset) => chars[start + offset] === char)) return start
  }

  return -1
}

/**
 * A label cut where the query was found in it, so a list can write the found letters
 * in the accent: `matchRuns('Genève', 'nev')` is `Ge` · `nèv` · `e`. The search is
 * `matchesQuery`'s — trimmed, folded, anywhere in the label — and the first match is the
 * one marked, since that is the one the eye lands on. No match, or an empty query, is
 * the label whole.
 */
export function matchRuns(label: string, query: string): MatchRun[] {
  const chars = Array.from(label)
  const needle = Array.from(query.trim()).map(foldChar)
  const start = needle.length === 0 ? -1 : indexOfRun(chars.map(foldChar), needle)

  if (start < 0) return [{ text: label, isHit: false }]

  const end = start + needle.length
  const runs: MatchRun[] = [
    { text: chars.slice(0, start).join(''), isHit: false },
    { text: chars.slice(start, end).join(''), isHit: true },
    { text: chars.slice(end).join(''), isHit: false },
  ]

  return runs.filter(run => run.text !== '')
}
