/** JSON with keys sorted, so two equal objects always produce the same string. */
function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object')
    return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, entry]) => typeof entry !== 'function')
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, entry]) => `${JSON.stringify(key)}:${canonical(entry)}`)
  return `{${entries.join(',')}}`
}

/** FNV-1a over a canonical representation, used for theme and style-cache keys. */
export function stableHash(value: unknown): string {
  const input = canonical(value)
  let hash = 0x811c9dc5
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash.toString(36)
}
