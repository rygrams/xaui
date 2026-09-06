import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { CalendarSize, CalendarSlot, CalendarVariant } from './calendar.type'

const SLOTS = [
  'root',
  'header',
  'title',
  'nav',
  'weekdays',
  'weekday',
  'grid',
  'day',
  'daySelected',
  'dayLabel',
  'dayLabelSelected',
  'dayLabelMuted',
  'dot',
  'dotSelected',
] as const

/**
 * `bgSelected` and `fgSelected`, not `bg` and `fg` — the `Checkbox`'s pair, for the
 * `Checkbox`'s reason. Forty-two cells share one resolution, and exactly one of them is
 * chosen: selection cannot be a variant axis without resolving the recipe per cell, and it
 * has to be a **role** or a raw `color` would stop reaching the chosen day the moment it
 * became the chosen one (the tint pass re-runs `paint`, never the axes).
 *
 * A day at rest is the same on all four variants, because a calendar is a grid of numbers
 * and the variant is about the one that is answered.
 */
const VARIANT_TOKENS: Record<CalendarVariant, VariantTokens> = {
  primary: { bgSelected: 'accent', fgSelected: 'accentForeground' },
  secondary: { bgSelected: 'accentSoft', fgSelected: 'accentSoftForeground' },
  tertiary: { bgSelected: 'default', fgSelected: 'defaultForeground' },
  ghost: { bgSelected: 'foreground', fgSelected: 'background' },
}

type SizeStep = {
  /** The cell's box, in points. A day is square, so this is both of its sides. */
  cell: number
  label: FontSizeKey
  title: FontSizeKey
  weekday: FontSizeKey
}

/**
 * Exported for the `DatePicker`, which needs one number out of it. Its panel is sized to
 * its content rather than to the field that opens it, and a grid of seven percentage
 * columns inside a box with no width of its own measures zero — so the picker gives the
 * calendar an explicit `7 × cell` and the columns divide that.
 *
 * The cell is 36 to 44 points, which is the whole of the ladder: a calendar is seven
 * columns wide whatever the size, so `size` cannot drive width without deciding the
 * calendar's own — and the grid spans its parent instead.
 *
 * Off the spacing grid, like the `Slider`'s rail: how big a square has to be before a
 * finger can hit one of seven in a row has nothing to do with the gaps between things.
 */
export const SIZES: Record<CalendarSize, SizeStep> = {
  sm: { cell: 36, label: 'sm', title: 'md', weekday: 'xs' },
  md: { cell: 40, label: 'md', title: 'lg', weekday: 'sm' },
  lg: { cell: 44, label: 'lg', title: 'xl', weekday: 'md' },
}

/** The mark under a day that has something on it. A fraction of the cell, not a table. */
const DOT_RATIO = 5 / 40

function sizeAxis(step: SizeStep) {
  const { cell, label, title, weekday } = step

  return (theme: XAUITheme): SlotStyles<CalendarSlot> => {
    const dot = Math.round(cell * DOT_RATIO)

    return {
      // A day is a circle by default, and `radius` overrides it — the one shape decision
      // this component makes, and the same one the `Radio` makes.
      day: { width: cell, height: cell, borderRadius: cell / 2 },
      daySelected: { borderRadius: cell / 2 },
      dayLabel: { fontSize: theme.fontSizes[label] },
      title: {
        fontSize: theme.fontSizes[title],
        lineHeight: theme.lineHeights[title],
      },
      weekday: {
        height: theme.spacing(6),
        lineHeight: theme.spacing(6),
        fontSize: theme.fontSizes[weekday],
      },
      nav: { width: cell, height: cell, borderRadius: cell / 2 },
      dot: { width: dot, height: dot, borderRadius: dot / 2 },
    }
  }
}

export const calendarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { width: '100%', gap: theme.spacing(2) },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.foreground,
    },
    nav: { alignItems: 'center', justifyContent: 'center' },
    // Seven columns, and the cells inside them are centred rather than stretched: a cell
    // is a circle, and a circle stretched to a seventh of a phone is an ellipse.
    weekdays: { flexDirection: 'row' },
    weekday: {
      flex: 1,
      fontFamily: theme.fontFamilies.body,
      textAlign: 'center',
      color: theme.colors.muted,
    },
    grid: { flexDirection: 'row', flexWrap: 'wrap' },
    day: {
      // A seventh of the row, and the box inside it centred. `width` on the cell is what
      // makes the circle a circle; this is what makes seven of them fill the line.
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    // Under the number rather than over it, and laid out by the day so the number does not
    // move when it appears: absolute, near the bottom of the cell.
    dot: { position: 'absolute', bottom: 3 },
    dayLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.foreground,
      textAlign: 'center',
    },
    // A day outside the month, or outside the bounds. It is a slot rather than an axis
    // because forty-two cells share one resolution and only some of them are muted.
    dayLabelMuted: { color: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    daySelected: { backgroundColor: colors.bgSelected },
    dayLabelSelected: { color: colors.fgSelected },
    // The mark on an unchosen day is the muted ink; on the chosen one it has to read
    // against the disc, which is what `fgSelected` is for.
    dot: { backgroundColor: theme.colors.muted },
    dotSelected: { backgroundColor: colors.fgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** Both the disc and the cell it sits in, or a squared-off day holds a round disc. */
    radius: radiusAxis('day', 'daySelected'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
