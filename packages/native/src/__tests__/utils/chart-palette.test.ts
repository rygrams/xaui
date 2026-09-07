import { describe, expect, it } from 'vitest'
import { chartPalette } from '../../utils/chart-palette'
import { hexToRgb, rgbToOklab } from '../../utils/colors'

const ACCENT = '#2f6feb'

function lightness(hex: string): number {
  return rgbToOklab(hexToRgb(hex))[0]
}

/** The angle in the a–b plane: what "the same colour" means once lightness has moved. */
function hueOf(hex: string): number {
  const [, a, b] = rgbToOklab(hexToRgb(hex))
  return Math.atan2(b, a)
}

function chromaOf(hex: string): number {
  const [, a, b] = rgbToOklab(hexToRgb(hex))
  return Math.hypot(a, b)
}

describe('chartPalette', () => {
  it('gives one colour per series', () => {
    expect(chartPalette(ACCENT, 3)).toHaveLength(3)
    expect(chartPalette(ACCENT, 6)).toHaveLength(6)
  })

  it('hands back the seed itself for a single series', () => {
    expect(chartPalette(ACCENT, 1)).toEqual([ACCENT])
  })

  it('is empty for nothing to draw', () => {
    expect(chartPalette(ACCENT, 0)).toEqual([])
    expect(chartPalette(ACCENT, -2)).toEqual([])
  })

  it('walks from dark to light', () => {
    const ramp = chartPalette(ACCENT, 4).map(lightness)

    for (let index = 1; index < ramp.length; index += 1) {
      expect(ramp[index]).toBeGreaterThan(ramp[index - 1])
    }
  })

  it('spaces the series evenly in perceptual lightness', () => {
    const ramp = chartPalette(ACCENT, 5).map(lightness)
    const gaps = ramp.slice(1).map((value, index) => value - ramp[index])

    // A hundredth of the scale, not a thousandth: the ramp is computed in floating point
    // and read back through eight bits per channel, so two gaps that were asked for
    // identically come back a couple of thousandths apart. That is the colour space's
    // resolution rather than a wobble in the walk.
    for (const gap of gaps) expect(Math.abs(gap - gaps[0])).toBeLessThan(0.01)
  })

  it('stays inside the scale, so no series is black or white', () => {
    for (const seed of ['#000000', '#ffffff', ACCENT]) {
      for (const hex of chartPalette(seed, 6)) {
        expect(lightness(hex)).toBeGreaterThanOrEqual(0.33)
        expect(lightness(hex)).toBeLessThanOrEqual(0.85)
      }
    }
  })

  it('keeps every series on the seed’s hue', () => {
    const seedHue = hueOf(ACCENT)

    for (const hex of chartPalette(ACCENT, 4)) {
      expect(Math.abs(hueOf(hex) - seedHue)).toBeLessThan(0.1)
    }
  })

  it('lets chroma fall at the light end rather than leaving the gamut', () => {
    // Not a compromise: no sRGB colour holds a deep blue's chroma at 84% lightness, so the
    // conversion clips it. What matters is that it clips towards the seed's hue rather than
    // towards grey, which the test above is what pins down.
    const ramp = chartPalette(ACCENT, 4)
    const chroma = ramp.map(chromaOf)

    expect(chroma[chroma.length - 1]).toBeLessThan(chroma[0])
  })

  it('hands back the seed rather than a row of black when it cannot be parsed', () => {
    // A caller's `color` is a raw value (R7) and can be anything RN accepts — `rgba(…)`,
    // a named colour. Failing to walk it must not paint the chart black.
    expect(chartPalette('rebeccapurple', 3)).toEqual([
      'rebeccapurple',
      'rebeccapurple',
      'rebeccapurple',
    ])
  })
})
