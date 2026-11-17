import { describe, expect, it } from 'vitest'
import { accentInk, accentSoftInk } from '../../theme/accent-ink'
import { relativeLuminance } from '../../theme/on-accent'
import { tramAccents } from '../../theme/tram-tokens'
import type { TramAccentName } from '../../theme/tram-tokens'

const NAMES = Object.keys(tramAccents) as TramAccentName[]

function contrast(first: string, second: string): number {
  const [low, high] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => a - b
  )

  return (high + 0.05) / (low + 0.05)
}

describe('accentInk', () => {
  it.each(['#FFFFFF', '#000000'])('reads at 4.5:1 on %s, all twenty', ground => {
    for (const name of NAMES) {
      expect(
        contrast(accentInk(tramAccents[name], ground), ground)
      ).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('darkens the light accents on white', () => {
    expect(accentInk(tramAccents.yellow, '#FFFFFF')).toBe('#867600')
    expect(accentInk(tramAccents.lime, '#FFFFFF')).toBe('#6B7F00')
    expect(accentInk(tramAccents.amber, '#FFFFFF')).toBe('#9E6C07')
    expect(accentInk(tramAccents.cyan, '#FFFFFF')).toBe('#157EB0')
  })

  it('lightens the dark accents on black', () => {
    expect(accentInk(tramAccents.crimson, '#000000')).toBe('#BF4F69')
  })

  it('leaves an accent that already reads untouched', () => {
    expect(accentInk(tramAccents.yellow, '#000000')).toBe(tramAccents.yellow)
    expect(accentInk(tramAccents.cobalt, '#FFFFFF')).toBe(tramAccents.cobalt)
  })

  it('names the value it could not read', () => {
    expect(() => accentInk('yellow', '#FFFFFF')).toThrow('received "yellow"')
  })
})

describe('accentSoftInk', () => {
  it('reads on the soft slice, which is darker than the white under it', () => {
    const slice = '#FBF7D9'
    const ink = accentSoftInk(tramAccents.yellow, '#FFFFFF')

    expect(contrast(ink, slice)).toBeGreaterThanOrEqual(4.5)
    expect(relativeLuminance(ink)).toBeLessThan(
      relativeLuminance(accentInk(tramAccents.yellow, '#FFFFFF'))
    )
  })
})
