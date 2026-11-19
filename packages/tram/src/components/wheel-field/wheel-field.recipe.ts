import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { DISC_LINE, DISC_SIZE } from '../../system/disc-size'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { WheelFieldSlot } from './wheel-field.type'

const SLOTS = [
  'trigger',
  'value',
  'placeholder',
  'indicator',
  'page',
  'title',
  'body',
  'bar',
  'barItem',
  'barButton',
  'barLabel',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * The bar's circles: the `Fab`'s, outlined — the Metro App Bar's own button. One size
 * whatever the field's: the bar is the page's, not the field's.
 */
export const BAR_BUTTON = DISC_SIZE.md

/** Spacing steps: the page's margin, and what the bar leaves around its circles. */
const PAGE_MARGIN = 6
const BAR_PAD = 2

type SizeStep = {
  /** The glyph at the end of the field, in points. */
  glyph: number
  /** Spacing steps between the value and the glyph. */
  gap: number
}

/**
 * Only what the field adds to the `TextField`'s box — whose line, height and type the
 * root reads off that recipe, so a date, a time and a text in one form are one control.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { glyph: 16, gap: 2 },
  md: { glyph: 20, gap: 2.5 },
  lg: { glyph: 24, gap: 3 },
}

function sizeAxis(size: TramSize) {
  const step = SIZES[size]

  return (theme: XAUITheme): SlotStyles<WheelFieldSlot> => ({
    trigger: { gap: theme.spacing(step.gap) },
    indicator: { fontSize: step.glyph },
  })
}

/** The page's margin, in points: under its title and over its bar, past the safe area. */
export function pageMargin(theme: XAUITheme): number {
  return theme.spacing(PAGE_MARGIN)
}

/** What the bar adds under its circles' labels, past the safe area. */
export function barPad(theme: XAUITheme): number {
  return theme.spacing(BAR_PAD)
}

export const wheelFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    value: { flex: 1 },
    placeholder: { color: theme.colors.fieldPlaceholder },
    // Not a node's own style — the root flattens it into the glyph's size and colour.
    indicator: { color: theme.colors.fieldForeground },
    // The whole screen, on the ground. Its back is hidden: it swivels in edge-on.
    page: {
      flex: 1,
      backgroundColor: theme.colors.background,
      gap: pageMargin(theme),
      backfaceVisibility: 'hidden',
    },
    // The Metro picker's "choose date": a caption over the wheels, in the page's ink.
    title: {
      ...roleType('caption', theme),
      color: theme.colors.foreground,
      paddingHorizontal: pageMargin(theme),
    },
    // The wheels, from the start, under the title.
    body: {
      flex: 1,
      alignItems: 'flex-start',
      paddingHorizontal: pageMargin(theme),
    },
    // The App Bar: a band of the discreet surface, edge to edge, its circles in the middle.
    bar: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: theme.spacing(PAGE_MARGIN),
      paddingTop: theme.spacing(BAR_PAD),
      backgroundColor: theme.colors.surface,
    },
    barItem: { alignItems: 'center', gap: theme.spacing(1) },
    // One of the two shapes past the 2-point corner Tram allows: the App Bar's circle.
    barButton: {
      width: BAR_BUTTON.diameter,
      height: BAR_BUTTON.diameter,
      borderRadius: BAR_BUTTON.diameter / 2,
      borderWidth: DISC_LINE,
      borderColor: theme.colors.surfaceForeground,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barLabel: {
      ...roleType('caption', theme),
      color: theme.colors.surfaceForeground,
      textAlign: 'center',
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** Grey, and no accent left. Not dimmed: the grey is the state. */
    disabled: theme => ({
      value: { color: theme.colors.muted },
      placeholder: { color: theme.colors.muted },
      indicator: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
