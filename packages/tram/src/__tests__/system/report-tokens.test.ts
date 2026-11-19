import { describe, expect, it } from 'vitest'
import {
  REPORT_TOKENS,
  isLineReport,
  markDrawing,
  namedSoftInk,
  softMarkOf,
} from '../../system/report-tokens'
import { accentSoftInk } from '../../theme/accent-ink'
import { tramAccents } from '../../theme/tram-tokens'
import type { ReportVariant } from '../../system/report-tokens'

describe('isLineReport', () => {
  it('is true for the two names with no fill', () => {
    expect(isLineReport('tertiary')).toBe(true)
    expect(isLineReport('ghost')).toBe(true)
  })

  it('is false wherever a fill is drawn', () => {
    const filled = (Object.keys(REPORT_TOKENS) as ReportVariant[]).filter(
      variant => variant !== 'tertiary' && variant !== 'ghost'
    )

    for (const variant of filled) {
      expect(REPORT_TOKENS[variant].bg).toBeDefined()
      expect(isLineReport(variant)).toBe(false)
    }
  })
})

describe('softMarkOf', () => {
  it('names the full colour each soft slice is cut from', () => {
    expect(softMarkOf('secondary')).toBe('accent')
    expect(softMarkOf('success-soft')).toBe('success')
    expect(softMarkOf('warning-soft')).toBe('warning')
    expect(softMarkOf('danger-soft')).toBe('danger')
  })

  it('leaves the mark to the ink on every other name', () => {
    for (const variant of ['primary', 'default', 'tertiary', 'ghost', 'danger']) {
      expect(softMarkOf(variant)).toBeUndefined()
    }
  })
})

describe('markDrawing', () => {
  it('draws a line on the four full colours', () => {
    for (const variant of ['primary', 'success', 'warning', 'danger']) {
      expect(markDrawing(variant, false)).toBe('line')
      expect(markDrawing(variant, true)).toBe('line')
    }
  })

  it('fills the square on the surface and on every soft slice', () => {
    for (const variant of ['default', 'secondary', 'success-soft', 'danger-soft']) {
      expect(markDrawing(variant, false)).toBe('fill')
    }
  })

  it('draws a line on a default alert a tint has filled', () => {
    expect(markDrawing('default', true)).toBe('line')
    expect(markDrawing('warning-soft', true)).toBe('fill')
  })
})

describe('namedSoftInk', () => {
  it('reads a named accent on its soft slice as the Avatar does', () => {
    expect(namedSoftInk('secondary', 'lime', undefined, '#FFFFFF')).toBe(
      accentSoftInk(tramAccents.lime, '#FFFFFF')
    )
  })

  it('never corrects a raw colour, and leaves full fills alone', () => {
    expect(namedSoftInk('secondary', 'lime', '#7c3aed', '#FFFFFF')).toBeUndefined()
    expect(namedSoftInk('primary', 'lime', undefined, '#FFFFFF')).toBeUndefined()
    expect(
      namedSoftInk('secondary', undefined, undefined, '#FFFFFF')
    ).toBeUndefined()
  })
})
