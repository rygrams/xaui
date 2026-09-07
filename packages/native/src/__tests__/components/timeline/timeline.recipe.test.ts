import { describe, expect, it } from 'vitest'
import {
  timelineInset,
  timelineRail,
} from '../../../components/timeline/timeline.recipe'
import type { TimelineSize } from '../../../components/timeline/timeline.type'
import { createTheme, defaultTheme } from '../../../theme/create-theme'

const theme = defaultTheme.light
const SIZES: TimelineSize[] = ['sm', 'md', 'lg']

/** Where the middle of a thing lands, given the space reserved above it. */
function centre(inset: number, height: number) {
  return inset + height / 2
}

describe('timelineInset', () => {
  it('reserves whatever is left of the line once the thing is centred on it', () => {
    expect(timelineInset(12, 12)).toBe(6)
    expect(centre(timelineInset(12, 12), 12)).toBe(12)
  })

  it('clamps at zero rather than hanging the thing over the top of the entry', () => {
    // A 28pt ring is taller than a 24pt title line: centring it exactly would take a
    // negative inset, and a first row bleeding above its own list is the worse defect.
    expect(timelineInset(12, 28)).toBe(0)
  })
})

describe('timelineRail', () => {
  // The regression this exists for: the insets used to be written by hand, and the dot sat
  // a point below the title's line at `md` and three points below it at `lg`.
  it.each(SIZES)('puts the dot on the title line — %s', size => {
    const rail = timelineRail(theme, size)

    expect(centre(rail.inset, rail.marker)).toBe(rail.line)
  })

  it.each(SIZES)('puts the time on the same line as the dot — %s', size => {
    const rail = timelineRail(theme, size)
    const leading = size === 'lg' ? theme.lineHeights.sm : theme.lineHeights.xs

    expect(centre(rail.leadInset, leading)).toBe(rail.line)
  })

  it('follows the theme rather than a table of constants', () => {
    const tall = createTheme({ lineHeights: { md: 40 } }).light
    const rail = timelineRail(tall, 'md')

    expect(rail.line).toBe(20)
    expect(centre(rail.inset, rail.marker)).toBe(20)
  })
})
