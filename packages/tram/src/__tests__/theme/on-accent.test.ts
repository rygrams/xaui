import { describe, expect, it } from 'vitest'
import { onAccent, relativeLuminance } from '../../theme/on-accent'
import { tramAccents } from '../../theme/tram-tokens'
import type { TramAccentName } from '../../theme/tram-tokens'

describe('relativeLuminance', () => {
  it('spans black to white', () => {
    expect(relativeLuminance('#000000')).toBe(0)
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1)
  })

  it('reads the short form as the long one', () => {
    expect(relativeLuminance('#fa0')).toBe(relativeLuminance('#ffaa00'))
  })

  it('names the value it could not read', () => {
    expect(() => relativeLuminance('cyan')).toThrow('received "cyan"')
  })
})

describe('onAccent', () => {
  it('puts black on the three light accents and white on the others', () => {
    const black = (Object.keys(tramAccents) as TramAccentName[]).filter(
      name => onAccent(tramAccents[name]) === '#000000'
    )

    expect(black.sort()).toEqual(['amber', 'lime', 'yellow'])
  })
})
