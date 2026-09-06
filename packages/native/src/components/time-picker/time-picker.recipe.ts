import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TimePickerSize, TimePickerSlot } from './time-picker.type'

const SLOTS = [
  'dial',
  'face',
  'mark',
  'markSelected',
  'markLabel',
  'markLabelSelected',
  'hand',
  'hub',
  'display',
  'unit',
  'unitSelected',
  'colon',
  'periods',
  'period',
  'periodSelected',
] as const

/**
 * **The dial only. The field is a `Select`'s trigger and is not declared here.**
 *
 * The `DatePicker`'s argument, and its consequence: declaring the four field levels a second
 * time would be two tables to keep in step, and the drift would show as a select and a time
 * field side by side in a form half a shade apart. `variant` therefore travels to
 * `selectRecipe` and never reaches this table.
 *
 * `bgSelected` and `fgSelected` are the chosen mark, the hand and the hub — the three things
 * a raw `color` has to reach, and roles are what survive a re-tint.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  default: {
    bg: 'surfaceSecondary',
    fg: 'foreground',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
}

type SizeStep = {
  /** The dial's side, and so the face's diameter. */
  box: number
  /** How far out the hour and minute marks sit, as a fraction of the radius. */
  ring: number
  /** A mark's own diameter — the touch target as much as the circle. */
  mark: number
  /** The inner ring, where 13–00 live on a twenty-four hour face. */
  innerRing: number
  /** The two big numbers above the dial. */
  display: FontSizeKey
  markLabel: FontSizeKey
}

const SIZES: Record<TimePickerSize, SizeStep> = {
  sm: {
    box: 232,
    ring: 0.82,
    mark: 34,
    innerRing: 0.54,
    display: '2xl',
    markLabel: 'sm',
  },
  md: {
    box: 268,
    ring: 0.82,
    mark: 38,
    innerRing: 0.55,
    display: '3xl',
    markLabel: 'md',
  },
  lg: {
    box: 304,
    ring: 0.82,
    mark: 42,
    innerRing: 0.56,
    display: '4xl',
    markLabel: 'lg',
  },
}

/** The dial's measurements, read as values — it is drawn from arithmetic, not from a style. */
export function timePickerDial(size: TimePickerSize): {
  box: number
  ring: number
  mark: number
  innerRing: number
} {
  const { box, ring, mark, innerRing } = SIZES[size]

  return { box, ring, mark, innerRing }
}

/** How thick the hand is, and how far the hub reaches. Pure geometry, in points. */
const HAND_WIDTH = 2
const HUB_SIZE = 8

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<TimePickerSlot> => ({
    dial: { width: step.box, height: step.box },
    face: { width: step.box, height: step.box, borderRadius: step.box / 2 },
    mark: { width: step.mark, height: step.mark, borderRadius: step.mark / 2 },
    markSelected: {
      width: step.mark,
      height: step.mark,
      borderRadius: step.mark / 2,
    },
    markLabel: {
      fontSize: theme.fontSizes[step.markLabel],
      lineHeight: theme.lineHeights[step.markLabel],
    },
    markLabelSelected: {
      fontSize: theme.fontSizes[step.markLabel],
      lineHeight: theme.lineHeights[step.markLabel],
    },
    unit: {
      fontSize: theme.fontSizes[step.display],
      lineHeight: theme.lineHeights[step.display],
    },
    unitSelected: {
      fontSize: theme.fontSizes[step.display],
      lineHeight: theme.lineHeights[step.display],
    },
    colon: {
      fontSize: theme.fontSizes[step.display],
      lineHeight: theme.lineHeights[step.display],
    },
  })
}

export const timePickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    dial: { alignItems: 'center', justifyContent: 'center' },
    face: { position: 'relative' },
    // Every mark is placed by `clockPoint`, so it is out of flow and centred on its own
    // point — a fixed box pulled back by half of it, which is the only placement that works
    // at every angle without measuring the text.
    mark: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
    markSelected: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    markLabel: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.foreground,
    },
    markLabelSelected: { fontFamily: theme.fontFamilies.body },
    /**
     * The hand grows **from the hub outwards**, which is why its origin is the bottom of the
     * bar rather than its middle: a rotation about the centre of a bar half the radius long
     * would swing its far end round the face and its near end round the other way.
     */
    hand: {
      position: 'absolute',
      width: HAND_WIDTH,
      borderRadius: HAND_WIDTH,
      transformOrigin: 'bottom',
    },
    hub: {
      position: 'absolute',
      width: HUB_SIZE,
      height: HUB_SIZE,
      borderRadius: HUB_SIZE / 2,
    },
    display: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
    unit: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    unitSelected: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
    },
    colon: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    periods: {
      flexDirection: 'column',
      borderRadius: theme.radius.field,
      borderCurve: 'continuous',
      overflow: 'hidden',
      borderWidth: theme.borderWidth.field,
      borderColor: theme.colors.border,
    },
    period: {
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1.5),
      alignItems: 'center',
    },
    periodSelected: {
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1.5),
      alignItems: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    face: { backgroundColor: colors.bg },
    markSelected: { backgroundColor: colors.bgSelected },
    markLabelSelected: { color: colors.fgSelected },
    hand: { backgroundColor: colors.bgSelected },
    hub: { backgroundColor: colors.bgSelected },
    unitSelected: { color: colors.bgSelected },
    periodSelected: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },
  },

  states: {
    disabled: theme => ({ dial: { opacity: theme.opacity.disabled } }),
  },

  // `default` and not just the size: `paint` runs off the *selected* variant, and a table
  // with one entry still has to be selected for its tokens to be read. Without it the face
  // has no fill, the hand no colour and the chosen mark no ring — which is exactly how this
  // was found.
  defaultVariants: { variant: 'default', size: 'md' },
})
