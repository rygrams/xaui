import { describe, expect, it } from 'vitest'
import { lineInk } from '../../system/line-ink'
import { tramAccents } from '../../theme/tram-tokens'

describe('lineInk', () => {
  it('is undefined when the control names no colour of its own', () => {
    expect(lineInk({}, '#FFFFFF')).toBeUndefined()
  })

  it('keeps an accent that already reads on the ground', () => {
    expect(lineInk({ accent: 'lime' }, '#000000')).toBe(tramAccents.lime)
  })

  it('darkens a light accent on a white ground', () => {
    expect(lineInk({ accent: 'lime' }, '#FFFFFF')).toBe('#6B7F00')
    expect(lineInk({ accent: 'yellow' }, '#FFFFFF')).toBe('#867600')
  })

  it('leaves a raw colour alone, and lets it win over the accent', () => {
    expect(lineInk({ color: '#FFFF00' }, '#FFFFFF')).toBe('#FFFF00')
    expect(lineInk({ accent: 'lime', color: '#FFFF00' }, '#FFFFFF')).toBe('#FFFF00')
  })
})
