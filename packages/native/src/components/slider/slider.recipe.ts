import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { SliderSize, SliderSlot } from './slider.type'

const SLOTS = ['root', 'output', 'track', 'fill', 'thumb', 'knob'] as const

/**
 * One variant, and it is not a gap. A slider reports a quantity, not an intent — a
 * `danger` volume control would be colouring a number. What a caller wants to change is
 * the tint, and `color` is that.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  default: { bg: 'default', bgSelected: 'accent', fgSelected: 'accentForeground' },
}

type SizeStep = {
  /** The track's thickness, in spacing steps. */
  track: number
  /** The thumb's width. Wider than the track is tall — HeroUI's capsule, not a circle. */
  thumb: number
  output: FontSizeKey
}

const SIZES: Record<SliderSize, SizeStep> = {
  sm: { track: 4, thumb: 6, output: 'xs' },
  md: { track: 5, thumb: 7, output: 'sm' },
  lg: { track: 6, thumb: 8, output: 'md' },
}

/** The inset between the thumb's capsule and the knob inside it, in points. */
const KNOB_INSET = 2

function sizeAxis(step: SizeStep) {
  const { track, thumb, output } = step

  return (theme: XAUITheme): SlotStyles<SliderSlot> => ({
    track: { height: theme.spacing(track) },
    thumb: { width: theme.spacing(thumb), height: theme.spacing(track) },
    output: {
      fontSize: theme.fontSizes[output],
      lineHeight: theme.lineHeights[output],
    },
  })
}

export const sliderRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column', gap: theme.spacing(2), width: '100%' },
    output: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    track: {
      width: '100%',
      justifyContent: 'center',
      borderRadius: theme.radius.xl,
      borderCurve: 'continuous',
      // The fill and the thumb are absolute inside it, and both round to its corner.
      overflow: 'visible',
    },
    // Stretched across the track's thickness; only its length is computed.
    fill: { position: 'absolute', top: 0, bottom: 0, borderRadius: theme.radius.xl },
    thumb: {
      position: 'absolute',
      padding: KNOB_INSET,
      borderRadius: theme.radius.xl,
      borderCurve: 'continuous',
    },
    // The pale core inside the thumb's capsule. HeroUI's shape, and it is what makes the
    // thumb read as a control rather than as a bead on a string.
    knob: {
      flex: 1,
      borderRadius: theme.radius.xl,
      ...theme.shadows.field,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors): SlotStyles<SliderSlot> => ({
    track: { backgroundColor: colors.bg },
    fill: { backgroundColor: colors.bgSelected },
    thumb: { backgroundColor: colors.bgSelected },
    knob: { backgroundColor: colors.fgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },
    radius: radiusAxis('track', 'fill', 'thumb', 'knob'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})
