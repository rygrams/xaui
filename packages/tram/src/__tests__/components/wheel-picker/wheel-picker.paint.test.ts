import { describe, expect, it } from 'vitest'
import { wheelTintFor } from '../../../components/wheel-picker/wheel-picker.paint'
import { accentInk } from '../../../theme/accent-ink'
import { tramAccents } from '../../../theme/tram-tokens'

const WHITE = '#FFFFFF'
const RAW = '#123456'
const { yellow } = tramAccents

describe('wheelTintFor', () => {
  it.each(['contained', 'light'] as const)(
    'leaves a %s wheel in the theme accent when it is given no colour',
    variant => {
      expect(wheelTintFor({}, variant, WHITE)).toBeUndefined()
    }
  )

  it('fills a contained square with the true colour', () => {
    expect(wheelTintFor({ accent: 'yellow' }, 'contained', WHITE)).toBe(yellow)
  })

  it('sets a light wheel in the ink, which is not the true colour on white', () => {
    const ink = wheelTintFor({ accent: 'yellow' }, 'light', WHITE)

    expect(ink).toBe(accentInk(yellow, WHITE))
    expect(ink).not.toBe(yellow)
  })

  it.each(['contained', 'light'] as const)(
    'lets a raw color win over the accent, uncorrected, under %s',
    variant => {
      expect(wheelTintFor({ accent: 'yellow', color: RAW }, variant, WHITE)).toBe(
        RAW
      )
    }
  )
})
