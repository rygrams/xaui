import { describe, expect, it } from 'vitest'
import { accentPaintFor } from '../../../components/button/button.paint'
import { accentInk, accentSoftInk } from '../../../theme/accent-ink'
import { tramAccents } from '../../../theme/tram-tokens'

const WHITE = '#FFFFFF'
const { yellow } = tramAccents

describe('accentPaintFor', () => {
  it('fills a contained box with the true colour', () => {
    expect(accentPaintFor(yellow, 'contained', WHITE)).toEqual({ tint: yellow })
  })

  it('keeps the true colour under a flat box and inks its label', () => {
    expect(accentPaintFor(yellow, 'flat', WHITE)).toEqual({
      tint: yellow,
      label: accentSoftInk(yellow, WHITE),
    })
  })

  it.each(['outline', 'text'] as const)('draws %s in the ink', variant => {
    expect(accentPaintFor(yellow, variant, WHITE)).toEqual({
      tint: accentInk(yellow, WHITE),
    })
  })

  it('leaves an accent that reads on the ground as it is', () => {
    expect(accentPaintFor(yellow, 'outline', '#000000')).toEqual({ tint: yellow })
  })
})
