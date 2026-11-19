import { describe, expect, it } from 'vitest'
import {
  accentInk,
  accentSoftInk,
  distinctInk,
  INK_APART,
  inkDistance,
} from '../../theme/accent-ink'
import { relativeLuminance } from '../../theme/on-accent'
import { tramAccents, tramSubtle } from '../../theme/tram-tokens'
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

  it('moves toward the end that can reach the bar on a mid-tone ground', () => {
    const ink = accentInk(tramAccents.yellow, '#999999')

    expect(contrast(ink, '#999999')).toBeGreaterThanOrEqual(4.5)
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

describe('distinctInk', () => {
  const MODES = [
    // The list's detail: Metro's subtle grey, read on each ground.
    { ground: '#000000', title: '#FFFFFF', muted: '#999999' },
    { ground: '#FFFFFF', title: '#000000', muted: '#767676' },
  ]

  it.each(MODES)(
    'keeps all twenty accents apart from the title and the grey on $ground',
    ({ ground, title, muted }) => {
      for (const name of NAMES) {
        const ink = distinctInk(accentInk(tramAccents[name], ground), ground, [
          title,
          muted,
        ])

        expect(inkDistance(ink, muted)).toBeGreaterThanOrEqual(INK_APART)
        expect(inkDistance(ink, title)).toBeGreaterThanOrEqual(INK_APART)
        expect(contrast(ink, ground)).toBeGreaterThanOrEqual(4.5)
      }
    }
  )

  it('moves the grey accents on white, darker, and leaves the others alone', () => {
    const apart = ['#000000', '#767676']
    const steel = accentInk(tramAccents.steel, '#FFFFFF')
    const cobalt = accentInk(tramAccents.cobalt, '#FFFFFF')

    expect(distinctInk(steel, '#FFFFFF', apart)).toBe('#4E5C69')
    expect(distinctInk(cobalt, '#FFFFFF', apart)).toBe(cobalt)
  })

  it('reads the subtle grey at 4.5:1 on white, and as it is on black', () => {
    expect(accentInk(tramSubtle, '#FFFFFF')).toBe('#767676')
    expect(accentInk(tramSubtle, '#000000')).toBe('#999999')
  })

  it('leaves a colour it cannot measure as it is', () => {
    expect(distinctInk('rgb(10, 20, 30)', '#FFFFFF', ['#666666'])).toBe(
      'rgb(10, 20, 30)'
    )
  })
})

describe('inkDistance', () => {
  it('is 0 for one colour and 1 from black to white', () => {
    expect(inkDistance('#336699', '#336699')).toBe(0)
    expect(inkDistance('#000000', '#FFFFFF')).toBeCloseTo(1, 3)
  })
})
