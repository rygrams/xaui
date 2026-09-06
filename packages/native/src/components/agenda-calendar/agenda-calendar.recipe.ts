import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { AgendaCalendarSize, AgendaCalendarSlot } from './agenda-calendar.type'

const SLOTS = [
  'root',
  'header',
  'nav',
  'navButton',
  'today',
  'todayDisabled',
  'todayLabel',
  'week',
] as const

/**
 * **The cells are not here.** The chosen day, its number, the mark under it and the weekday
 * headings all resolve through `calendarRecipe`, because they *are* the calendar's: a strip
 * and a month showing two different discs for the same chosen day is what a shared table
 * exists to prevent, and the two sit one above the other the moment a caller expands one
 * into the other.
 *
 * What is here is the part a month grid has never had: the card it sits on, the row of
 * controls above it, and the pill that says "Today".
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  // One entry, and it is still a table: `resolveTint` only maps roles a variant declared,
  // and without one the `color` a caller writes would never reach the pill.
  default: { bg: 'default', fg: 'foreground' },
}

type SizeStep = {
  /** The nav buttons' box, which is the cell's so the header lines up with the strip. */
  button: number
  today: FontSizeKey
}

const SIZES: Record<AgendaCalendarSize, SizeStep> = {
  sm: { button: 32, today: 'xs' },
  md: { button: 36, today: 'sm' },
  lg: { button: 40, today: 'md' },
}

function sizeAxis(step: SizeStep) {
  const { button, today } = step

  return (theme: XAUITheme): SlotStyles<AgendaCalendarSlot> => ({
    navButton: { width: button, height: button, borderRadius: button / 2 },
    today: {
      height: button,
      paddingHorizontal: theme.spacing(3),
      borderRadius: button / 2,
    },
    todayLabel: {
      fontSize: theme.fontSizes[today],
      lineHeight: theme.lineHeights[today],
    },
    // The header is at least a button tall whether or not it holds one, so a card with a
    // bare title does not sit shorter than the one beside it.
    header: { minHeight: button },
    root: { gap: theme.spacing(2) },
  })
}

export const agendaCalendarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius['2xl'],
      padding: theme.spacing(3),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    /** The cluster on the trailing end: back, today, forward. */
    nav: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
    navButton: { alignItems: 'center', justifyContent: 'center' },
    // A bordered pill rather than a filled one: it sits between two bare chevrons, and a
    // filled button there would read as the primary action of the whole card.
    today: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: theme.borderWidth.default,
      borderColor: theme.colors.border,
    },
    todayLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.accent,
    },
    week: { flexDirection: 'row' },
    // The pill goes dead once this week is the one on screen, and that is a **per-button**
    // state rather than the recipe's `disabled` — which dims the whole card. Without a look
    // of its own it would read as pressable and do nothing, which is the state the button
    // exists to avoid on the chevrons beside it.
    todayDisabled: { opacity: theme.opacity.disabled },
  }),

  variantTokens: VARIANT_TOKENS,

  /** The tint reaches the pill's word, which is the only thing here a variant colours. */
  paint: (_theme, colors) => ({ todayLabel: { color: colors.fg } }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** The card's own corner, not the chosen day's — that one is the calendar's. */
    radius: radiusAxis('root'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})
