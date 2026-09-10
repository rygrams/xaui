import { createRecipe, radiusAxis } from '../../system/recipe'
import { alpha } from '../../utils/colors'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type {
  SlideButtonSize,
  SlideButtonSlot,
  SlideButtonVariant,
} from './slide-button.type'

const SLOTS = [
  'root',
  'fillClip',
  'fill',
  'label',
  'labelSwept',
  'thumb',
  'glyph',
] as const

/**
 * The ten flat variants, the same set the `Button` takes. `color` lands where the tokens
 * do — the pill for the filled ones, the label for `ghost`, the label and border for
 * `tertiary` — and it never reaches the thumb: the handle stays the surface colour so the
 * chevron on it is readable whatever the pill is doing.
 *
 * **The four intents rest soft and earn their colour.** A `Button` is its intent the moment
 * it is on screen, because a tap is the whole interaction. A slide is not: the pill sits
 * under the thumb saying *not yet*, and going full `accent` before the finger has moved
 * spends the emphasis on the resting state — the one that has not happened. So `primary`,
 * `success`, `warning` and `danger` open on their soft slice and name the vivid one as
 * `bgSelected`, the role the engine already has for "the box once it is on".
 * The trail lays it down as the handle sweeps, so the colour arrives with the commitment
 * rather than before it, and `resolveTint` maps the role like any other — a raw `color`
 * follows into the trail instead of stopping at the pill.
 *
 * `fgSelected` comes with it, and is not optional: the trail ends up under the label, so a
 * label painted for the soft pill is a label read against the vivid one — 1.3:1 on every
 * one of the four. The swept copy of the label takes this instead.
 *
 * The four `-soft` variants and the three neutrals keep what they had: a variant already
 * named `-soft` has no vivid slice to earn, and a neutral pill has none to name.
 */
const VARIANT_TOKENS: Record<SlideButtonVariant, VariantTokens> = {
  primary: {
    bg: 'accentSoft',
    fg: 'accentSoftForeground',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  secondary: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
  success: {
    bg: 'successSoft',
    fg: 'successSoftForeground',
    bgSelected: 'success',
    fgSelected: 'successForeground',
  },
  'success-soft': { bg: 'successSoft', fg: 'success' },
  warning: {
    bg: 'warningSoft',
    fg: 'warningSoftForeground',
    bgSelected: 'warning',
    fgSelected: 'warningForeground',
  },
  'warning-soft': { bg: 'warningSoft', fg: 'warning' },
  danger: {
    bg: 'dangerSoft',
    fg: 'dangerSoftForeground',
    bgSelected: 'danger',
    fgSelected: 'dangerForeground',
  },
  'danger-soft': { bg: 'dangerSoft', fg: 'danger' },
}

/**
 * How much of the pill's own foreground the swept trail is made of, for the variants that
 * name no `bgSelected`.
 *
 * It comes off the **variant's `fg` role**, not a fixed neutral: on a filled pill the
 * foreground is the colour that already reads against the fill, so the trail is visible on
 * `warning` and on `secondary` alike without a second token being named — and a raw
 * `color` follows it through the tint pass. The alpha is a wash: on these variants the
 * trail shows how far the handle has come, it is not the value.
 */
const FILL_ALPHA = 0.2

/**
 * How much wider than tall the handle is. A slide-to-confirm handle is pushed sideways, so
 * it reads as a thing you shove rather than a knob you turn — a stadium, not a disc.
 */
const THUMB_RATIO = 1.5

/**
 * Every key `shadows.surface` writes, zeroed — the disabled handle puts its lift down.
 *
 * All five and not just the opacity, because the states merge is a shallow spread: a
 * partial reset leaves the offset and the blur behind for whatever sets an opacity next.
 *
 * `scales.ts` holds the same five values privately, for dark mode's `surface`. They are
 * left apart deliberately: that one is a *token* — dark mode decides a raised surface needs
 * no shadow, and a theme may say otherwise — while this is a removal that has to hold
 * whatever the theme said. Sharing them would tie a theme's choice to a state's.
 */
const NO_SHADOW = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
} as const

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
      // The same type at the same inset. No `end`: this copy is laid out inside a clip
      // whose width is the trail's, and an `end` would measure against *that*, re-centring
      // the text in a box that keeps narrowing. The slot gives it a width off the measured
      // pill instead, so both copies sit on exactly the same glyphs.
      labelSwept: {
        start: theme.spacing(4),
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
    // A fixed-height bar holding absolutely-positioned children — the fill, the label and
    // its clipped copy, the thumb — so none of them pushes the others around as it moves.
    //
    // **It does not clip.** The trail needs clipping and gets it from `fillClip`, one layer
    // in; putting `overflow: 'hidden'` up here instead costs the handle its shadow. That
    // shadow is offset a point down over a three-point blur, and the handle sits four
    // points off the floor — so the lower half reaches the pill's edge exactly, and the
    // clip cut it flat there and curved it away at the leading cap while leaving the top
    // untouched. A shadow soft above and sheared below does not read as a clipped shadow;
    // it reads as a handle sunk into a groove, which is what it looked like.
    root: {
      width: '100%',
      justifyContent: 'center',
      borderCurve: 'continuous',
      borderRadius: theme.radius.full,
      borderWidth: 0,
    },
    /**
     * The window the trail is read through, and the whole reason it has one.
     *
     * The pill is `radius.full`, which on a 48-tall bar resolves to a 24-point cap. The
     * trail's own `full` is clamped to half of whichever side is shorter — half its
     * *width* for the first 48 points of the drag — so it draws a squarer corner inside a
     * rounder one and bulges past the leading edge. No radius fixes that, because the
     * clamp applies whatever is asked for: the trail has to be cut to the pill's shape.
     *
     * Cutting it here rather than on the root is what keeps the cut off the handle.
     */
    fillClip: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      overflow: 'hidden',
      borderCurve: 'continuous',
      borderRadius: theme.radius.full,
    },
    // Zero width at rest — the width is the swept fraction of the pill, set by the slot,
    // so there is nothing to draw until the drag has actually started. The radius is the
    // pill's, so the trail matches the leading cap once it is wide enough to render it;
    // `fillClip` covers the widths where it cannot. The colour is the variant's,
    // set in `paint`.
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
     * The label again, for the ground the trail has already covered.
     *
     * One label cannot serve both: on the four inverted variants the pill goes from a soft
     * slice to the vivid one, and the polarity of a readable text colour flips with it —
     * measured, a label painted for the soft pill reads 1.2–1.5:1 once the trail is under
     * it, in light and in dark alike. Fading the label out would answer legibility by
     * removing the instruction, which is the wrong trade on the control whose whole job is
     * to say what the slide will do. So it is drawn twice and the top copy is clipped to
     * the trail: each half of a straddling word sits on the ground it was painted for, and
     * the switch happens exactly at the trail's edge rather than at some threshold.
     */
    labelSwept: {
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
    // A variant with no vivid slice sweeps a wash, which the resting label already reads
    // against — so it falls back to the same colour and the two copies are one label.
    labelSwept: { color: colors.fgSelected ?? colors.fg },
    // The vivid slice where the variant named one, so the slide *arrives* at the intent
    // rather than opening on it. Everything else keeps a wash of the same foreground the
    // label uses, which reads against every pill without a token of its own. Either way a
    // raw `color` moves the trail, because both roles go through the tint pass.
    fill: {
      backgroundColor:
        colors.bgSelected ?? (colors.fg ? alpha(colors.fg, FILL_ALPHA) : undefined),
    },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** After `size`, so a caller's `radius` wins over the pill's `full`. */
    radius: radiusAxis('root', 'fillClip', 'fill'),
  },

  states: {
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      // The handle also puts its shadow down. Opacity fades the pill until its edges are
      // most of the way to the page, but it fades the shadow too — and a shadow at half
      // strength is still the strongest edge left in the picture, sitting a point below a
      // handle whose own outline has gone. What reads then is not a faded control, it is a
      // handle pressed into a dent. Nothing about a disabled control should look lifted
      // anyway, so the lift goes rather than being dimmed with everything else.
      thumb: NO_SHADOW,
    }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})

export { SIZES as slideButtonSizes }
