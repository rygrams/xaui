import { describe, expect, it } from 'vitest'
import { groundPaint } from '../../system/ground-paint'
import { accentInk } from '../../theme/accent-ink'
import { tramAccents } from '../../theme/tram-tokens'

const RAW = '#7c3aed'
const WHITE = '#FFFFFF'

describe('groundPaint', () => {
  it("is nothing when no paint is named: the theme's own colours", () => {
    expect(groundPaint({ isLine: false, page: WHITE })).toBeUndefined()
  })

  it('fills with the true colour of a named accent', () => {
    expect(groundPaint({ accent: 'yellow', isLine: false, page: WHITE })).toBe(
      tramAccents.yellow
    )
  })

  it("draws a named accent as the mode's ink where it is a line on the page", () => {
    expect(groundPaint({ accent: 'yellow', isLine: true, page: WHITE })).toBe(
      accentInk(tramAccents.yellow, WHITE)
    )
  })

  it('never corrects a raw colour, line or fill, and lets it win over an accent', () => {
    expect(
      groundPaint({ accent: 'lime', color: RAW, isLine: true, page: WHITE })
    ).toBe(RAW)
    expect(groundPaint({ color: RAW, isLine: false, page: WHITE })).toBe(RAW)
  })
})
