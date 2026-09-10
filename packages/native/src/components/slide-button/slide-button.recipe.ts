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
 * `tertiary` — and it never reaches the thumb: the handle stays the surface colour so the
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
 * How much of the pill's own foreground the swept trail is made of.
 *
 * It comes off the **variant's `fg` role**, not a fixed neutral: on a filled pill the
 * foreground is the colour that already reads against the fill, so the trail is visible on
 * `primary` and on `secondary` alike without a second token being named — and a raw
 * `color` follows it through the tint pass. The alpha is a wash: the trail shows how far
 * the handle has come, it is not the value.
 */
const FILL_ALPHA = 0.2

/**
 * How much wider than tall the handle is. A slide-to-confirm handle is pushed sideways, so
 * it reads as a thing you shove rather than a knob you turn — a stadium, not a disc.
 */
const THUMB_RATIO = 1.5

type SizeStep = {
  /** The control-height key. The handle's height is that less twice the inset. */
  height: SlideButtonSize
  /** How far the handle sits in from the pill's edge, in points. The air around it. */
  inset: number
  /**
   * The mark's box, in points — the side of the built-in chevron, and the size an `Icon`
   * in the handle inherits. Off the spacing grid: it is a drawn mark, not a gap.
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
    const handleHeight = height - step.inset * 2

    return {
      root: { height },
      // Centred across the whole pill, not laid out beside the handle — the handle slides
      // over it, so there is no gap to keep. Symmetric `start`/`end` insets (R13, never
      // `left`/`right`) just keep a long label off the pill's rounded ends.
      label: {
        start: theme.spacing(4),
        end: theme.spacing(4),
        fontSize: theme.fontSizes[step.label],
        lineHeight: theme.lineHeights[step.label],
      },
      // A horizontal stadium: wider than tall, its corners a half-height so the ends stay
      // round at any width. `start` is its resting inset; the pan translates it from there.
      thumb: {
        width: Math.round(handleHeight * THUMB_RATIO),
        height: handleHeight,
        borderRadius: handleHeight / 2,
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
    // Zero width at rest — its width is the handle's offset, so nothing shows over the
    // pill's leading corner until the drag has actually started. The colour is the
    // variant's, set in `paint`.
    fill: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      borderRadius: theme.radius.full,
    },
    label: {
      position: 'absolute',
      textAlign: 'center',
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    /**
     * The handle: the surface colour, lifted off the pill by a shadow — the same treatment
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
     * its own — the direction the handle travels either way. `children` replace it.
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
    // A wash of the same foreground the label uses, so the trail reads against every
    // pill without a token of its own — and a raw `color` moves it with the label.
    fill: { backgroundColor: colors.fg ? alpha(colors.fg, FILL_ALPHA) : undefined },
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
