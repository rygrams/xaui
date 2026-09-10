import { createRecipe, radiusAxis } from '../../system/recipe'
import { alpha } from '../../utils/colors'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type {
  SlideButtonSize,
  SlideButtonSlot,
  SlideButtonVariant,
} from './slide-button.type'

const SLOTS = ['root', 'fill', 'label', 'thumb', 'glyph'] as const

/**
 * The ten flat variants, the same set the `Button` takes. `color` lands where the tokens
 * do — the pill for the filled ones, the label for `ghost`, the label and border for
 * `tertiary` — and it never reaches the thumb: the disc stays the surface colour so the
 * chevron on it is readable whatever the pill is doing.
 */
const VARIANT_TOKENS: Record<SlideButtonVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
  success: { bg: 'success', fg: 'successForeground' },
  'success-soft': { bg: 'successSoft', fg: 'success' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  'warning-soft': { bg: 'warningSoft', fg: 'warning' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
  'danger-soft': { bg: 'dangerSoft', fg: 'danger' },
}

/**
 * How much of the label's own colour the swept trail is made of.
 *
 * Neutral and fixed rather than a slice of the variant: the trail shows how far the thumb
 * has come, not a state, and a wash of the accent behind a moving disc competes with the
 * disc for the eye. The `Slider` keeps its `FILL_ALPHA` local for the same reason — the
 * theme's soft family is sized for a chip, not for a bar.
 */
const FILL_ALPHA = 0.08

type SizeStep = {
  /** The control-height key. The thumb's diameter is that height less twice the inset. */
  height: SlideButtonSize
  /** How far the thumb sits in from the pill's edge, in points. The air around the disc. */
  inset: number
  /**
   * The mark's box, in points — the side of the built-in chevron, and the size an `Icon`
   * in the thumb inherits. Off the spacing grid: it is a drawn mark, not a gap.
   */
  glyph: number
  /** The label's type key. */
  label: SlideButtonSize
}

/**
 * The three sizes, measured rather than scaled off one number: a slide button is a target
 * before it is type, so the height leads and the rest follows it.
 */
const SIZES: Record<SlideButtonSize, SizeStep> = {
  sm: { height: 'sm', inset: 3, glyph: 14, label: 'sm' },
  md: { height: 'md', inset: 4, glyph: 16, label: 'md' },
  lg: { height: 'lg', inset: 4, glyph: 20, label: 'lg' },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<SlideButtonSlot> => {
    const height = theme.controlHeights[step.height]
    const diameter = height - step.inset * 2

    return {
      root: { height },
      // Centred across the whole pill, not laid out beside the thumb — the disc slides
      // over it, so there is no gap to keep. Symmetric `start`/`end` insets (R13, never
      // `left`/`right`) just keep a long label off the pill's rounded ends.
      label: {
        start: theme.spacing(4),
        end: theme.spacing(4),
        fontSize: theme.fontSizes[step.label],
        lineHeight: theme.lineHeights[step.label],
      },
      thumb: {
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        start: step.inset,
      },
      glyph: { width: step.glyph, height: step.glyph },
    }
  }
}

export const slideButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // A fixed-height bar holding three absolutely-positioned children — the fill, the
    // label and the thumb — so none of them pushes the others around as the thumb moves.
    root: {
      width: '100%',
      justifyContent: 'center',
      borderCurve: 'continuous',
      borderRadius: theme.radius.full,
      borderWidth: 0,
    },
    fill: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      borderRadius: theme.radius.full,
      backgroundColor: alpha(theme.colors.foreground, FILL_ALPHA),
    },
    label: {
      position: 'absolute',
      textAlign: 'center',
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    /**
     * The disc: the surface colour, lifted off the pill by a shadow — the same treatment
     * the `Slider`'s knob takes, and for the same reason, so the chevron on it never has
     * to fight the pill for contrast.
     */
    thumb: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      ...theme.shadows.surface,
    },
    /**
     * The built-in chevron, drawn from two borders a quarter turn round — a control whose
     * whole affordance is "drag me this way" cannot be written without one, and a peer
     * dependency for a single arrow is the bargain the `CloseButton`'s cross also refuses.
     * The lit edges are `top` and `end`, so under RTL it flips to point the other way on
     * its own — the direction the thumb travels either way. `children` replace it.
     */
    glyph: {
      borderColor: theme.colors.foreground,
      borderTopWidth: 2,
      borderEndWidth: 2,
      transform: [{ rotate: '45deg' }],
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** After `size`, so a caller's `radius` wins over the pill's `full`. */
    radius: radiusAxis('root', 'fill'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})

export { SIZES as slideButtonSizes }
