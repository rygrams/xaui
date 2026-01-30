export const getTextValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return undefined
}
