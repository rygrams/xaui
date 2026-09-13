import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type {
  AgendaCalendarSize,
  AgendaCalendarSlot,
  AgendaCalendarVariant,
} from './agenda-calendar.type'

const SLOTS = [
  'root',
  'header',
  'nav',
  'navButton',
  'today',
  'todayDisabled',
  'todayLabel',
  'week',
  'picker',
  'pickerItem',
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
const VARIANT_TOKENS: Record<AgendaCalendarVariant, VariantTokens> = {
  // The four the `Calendar` declares, answered on the pill rather than on a disc. The
  // variant is a level of emphasis, and the two controls it reaches are the chosen day and
  // this button — a strip whose chosen day is a soft wash under a pill that kept a hard
  // accent border is two variants on one card.
  //
  // The emphasis runs the other way round from a `Button`'s, and on purpose: `primary`
  // outlines rather than fills. The pill sits between two bare chevrons, so the filled
  // accent that makes a `Button` primary would read here as the primary action of the whole
  // card — the accent goes on the word instead, which is where the strip's own accent is.
  primary: { border: 'border', fg: 'accent' },
  secondary: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  tertiary: { bg: 'default', fg: 'defaultForeground' },
  // No fill and no border: the word alone, as `ghost` means everywhere else.
  ghost: { fg: 'foreground' },
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
    // A pill the height of the strip's own cell and a nav button, so the row of months
    // sits where the row of days did without the header shifting.
    pickerItem: {
      height: button,
      paddingHorizontal: theme.spacing(3),
      borderRadius: button / 2,
    },
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
    // The box only. Whether it is outlined, washed or bare is the variant's, below.
    today: { alignItems: 'center', justifyContent: 'center' },
    todayLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    week: { flexDirection: 'row' },
    // A row that scrolls sideways where the week was. `flexGrow: 0` so the `ScrollView`
    // does not eat the height the card gives it; the gap between pills is the
    // `contentContainerStyle`'s, which a `ScrollView` refuses on its own style.
    picker: { flexGrow: 0 },
    pickerItem: { alignItems: 'center', justifyContent: 'center' },
    // The pill goes dead once this week is the one on screen, and that is a **per-button**
    // state rather than the recipe's `disabled` — which dims the whole card. Without a look
    // of its own it would read as pressable and do nothing, which is the state the button
    // exists to avoid on the chevrons beside it.
    todayDisabled: { opacity: theme.opacity.disabled },
  }),

  variantTokens: VARIANT_TOKENS,

  // The `Button`'s own paint, one slot down: the border's *width* follows the presence of
  // the border role rather than a per-variant flag, because which variant outlines is
  // already stated in the table above. `undefined` where a variant names no `bg` is the
  // transparent the outlined and the bare pill both want.
  paint: (theme, colors) => ({
    today: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    todayLabel: { color: colors.fg },
  }),

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

  // The `Calendar`'s default, because the two resolve from the same `variant` prop and a
  // card whose strip defaulted to one and whose pill to another is not one component.
  // Naming it is also what makes `paint` and `tint` run at all — without a variant both are
  // handed no colours, and the pill loses its word to RN's black.
  defaultVariants: { variant: 'primary', size: 'md' },
})
