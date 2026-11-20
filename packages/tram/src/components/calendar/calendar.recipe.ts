import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { CalendarSlot } from './calendar.type'

const SLOTS = [
  'root',
  'header',
  'title',
  'nav',
  'weekdays',
  'weekday',
  'grid',
  'day',
  'dayToday',
  'daySelected',
  'dayLabel',
  'dayLabelMuted',
  'dayLabelDisabled',
  'dayLabelSelected',
  'picker',
  'pick',
  'pickSelected',
  'pickLabel',
  'pickLabelSelected',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** The line round today's square: the `Button`'s, thinner than a field's. */
export const TODAY_LINE = 2

/** A month or a year in a picker: a thumb's height, the label at the start. */
const PICK_HEIGHT = 56

/** The gap between two weeks and between two picks, in points. */
const ROW_GAP = 2

/** How far one row of picks is from the next: what the year picker scrolls by. */
export const PICK_ROW = PICK_HEIGHT + ROW_GAP

type SizeStep = {
  /** A day's height, in points. Its width is a seventh of the grid. */
  cell: number
  /** The number in it, in a role of the Tram scale. */
  digit: TramTypeRole
  /** The chevron's size. */
  glyph: number
}

export const CALENDAR_SIZES: Record<TramSize, SizeStep> = {
  sm: { cell: 36, digit: 'caption', glyph: 18 },
  md: { cell: 42, digit: 'body', glyph: 20 },
  lg: { cell: 48, digit: 'subtitle', glyph: 22 },
}

function sizeAxis(size: TramSize) {
  const step = CALENDAR_SIZES[size]

  return (theme: XAUITheme): SlotStyles<CalendarSlot> => ({
    day: { height: step.cell },
    dayLabel: roleType(step.digit, theme),
  })
}

/**
 * The month as Windows draws it: a light title at the start, two bare chevrons at the
 * end, seven two-letter headings in the page's ink, and six weeks of squares that touch
 * across and stand two points apart down.
 *
 * The chosen day is the accent's flat square, its number in `onAccent`. Today is a square
 * lined in the page's ink, so it never competes with the chosen one. A day of the months
 * either side is grey and still choosable; one out of bounds is the faint grey and inert.
 * No corner, no disc, no dot.
 */
export const calendarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const faint = faintFill(theme.colors.foreground, theme.colors.background)

    return {
      root: { gap: theme.spacing(1.5) },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: TRAM_TOUCH_TARGET,
      },
      title: {
        ...roleType('title', theme),
        color: theme.colors.foreground,
        flexShrink: 1,
      },
      nav: {
        width: TRAM_TOUCH_TARGET,
        height: TRAM_TOUCH_TARGET,
        alignItems: 'center',
        justifyContent: 'center',
      },
      weekdays: { flexDirection: 'row' },
      weekday: {
        ...roleType('caption', theme),
        flex: 1,
        textAlign: 'center',
        lineHeight: 28,
        color: theme.colors.foreground,
      },
      grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: ROW_GAP },
      day: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dayToday: {
        borderWidth: TODAY_LINE,
        borderColor: theme.colors.foreground,
      },
      daySelected: { backgroundColor: theme.colors.accent },
      dayLabel: {
        color: theme.colors.foreground,
        fontVariant: ['tabular-nums'],
        includeFontPadding: false,
      },
      dayLabelMuted: { color: theme.colors.muted },
      dayLabelDisabled: { color: faint ?? theme.colors.muted },
      dayLabelSelected: { color: theme.colors.accentForeground },
      picker: { flexDirection: 'row', flexWrap: 'wrap', rowGap: ROW_GAP },
      pick: {
        width: '33.3333%',
        height: PICK_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(2.5),
      },
      pickSelected: { backgroundColor: theme.colors.accent },
      pickLabel: { ...roleType('body', theme), color: theme.colors.foreground },
      pickLabelSelected: { color: theme.colors.accentForeground },
    }
  },

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** The chosen day loses the accent, and every number goes grey. */
    disabled: theme => ({
      daySelected: { backgroundColor: theme.colors.muted },
      dayLabel: { color: theme.colors.muted },
      title: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
