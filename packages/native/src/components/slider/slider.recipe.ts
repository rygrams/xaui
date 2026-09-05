import { createRecipe, radiusAxis } from '../../system/recipe'
import { alpha } from '../../utils/colors'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { SliderOrientation, SliderSize, SliderSlot } from './slider.type'

const SLOTS = ['root', 'output', 'track', 'fill', 'thumb'] as const

/**
 * One variant, and it is not a gap. A slider reports a quantity, not an intent — a
 * `danger` volume control would be colouring a number. What a caller wants to change is
 * the tint, and `color` is that.
 *
 * The recipe keeps a single-entry `variantTokens` all the same, because `resolveTint` maps
 * the roles a variant declares and that mapping is what lets `color` reach the fill.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  default: { bg: 'default', bgSelected: 'accent' },
}

/**
 * How much of the colour the reach is made of.
 *
 * **Derived here rather than named in the theme, and that is deliberate.** The theme's soft
 * family is a pair — fifteen percent and twenty — sized for a chip or a soft button, and a
 * bar three hundred points long needs more of the colour than either to read as filled.
 * Adding a third step would move every `*-soft` family in the library for one component's
 * sake, and the two that exist are not wrong; this one is simply the slider's.
 *
 * It is taken from the **resolved role** rather than from a token name, so a raw `color`
 * flows through it untouched: whatever `resolveTint` handed the fill, the reach is that at
 * thirty-five percent and the knob is that at full.
 */
const FILL_ALPHA = 0.35

type SizeStep = {
  /** The rail's thickness, in points. The legacy scale, which is not on the spacing grid. */
  track: number
  /** The knob's diameter. Wider than the rail, so it rides on it rather than in it. */
  thumb: number
  output: FontSizeKey
}

/**
 * The legacy slider's proportions, point for point.
 *
 * A **thin rail with a round knob on it**, not a capsule with a core inside — which is what
 * this component shipped as, borrowed from HeroUI's. The rail is 6 to 10 points and the
 * knob 16 to 24, so the knob overhangs the rail by half their difference on each side. That
 * overhang is the shape: it is what makes the knob read as sitting *on* a line rather than
 * as a segment *of* one.
 *
 * The numbers are off the spacing grid on purpose. A rail is not a gap between two things,
 * and rounding 6 to `spacing(1.5)` and 10 to `spacing(2.5)` would put the three sizes on a
 * scale that has no bearing on how thin a line can be and still be pressable.
 */
const SIZES: Record<SliderSize, SizeStep> = {
  sm: { track: 6, thumb: 16, output: 'xs' },
  md: { track: 8, thumb: 20, output: 'sm' },
  lg: { track: 10, thumb: 24, output: 'md' },
}

/** How far a vertical rail runs when the caller gives it no height of its own. */
const VERTICAL_LENGTH = 220

/**
 * Everything that depends on the size **and** on the direction, which is most of the
 * geometry: which side of the rail is its thickness, which is its length, and how far the
 * knob has to be pulled back to sit centred on it.
 *
 * It is a compound rather than two axes because the two cannot be written apart. An
 * `orientation` axis setting `height: undefined` to undo a `size` axis's height is how
 * this component first shipped, and it left the rail with no thickness at all — declaration
 * order is application order, so the axis declared second won and the rail vanished.
 */
function rail(step: SizeStep, orientation: SliderOrientation) {
  const { track, thumb, output } = step
  const vertical = orientation === 'vertical'
  /** How far the knob overhangs the rail on each side. The shape, in one number. */
  const overhang = (thumb - track) / 2

  return (theme: XAUITheme): SlotStyles<SliderSlot> => ({
    root: vertical
      ? { flexDirection: 'row', alignItems: 'center' }
      : { flexDirection: 'column', width: '100%' },

    track: vertical
      ? {
          width: track,
          height: VERTICAL_LENGTH,
          alignItems: 'center',
          // The room the knob needs, reserved by the rail rather than by a box around it.
          // Without it the knob overhangs into whatever is beside the slider, and the
          // layout has no idea the control is wider than its rail.
          marginHorizontal: overhang,
        }
      : {
          height: track,
          width: '100%',
          justifyContent: 'center',
          marginVertical: overhang,
        },

    // Pulled back by the overhang so its centre sits on the rail's centre line.
    thumb: vertical
      ? { width: thumb, height: thumb, borderRadius: thumb / 2, start: -overhang }
      : { width: thumb, height: thumb, borderRadius: thumb / 2, top: -overhang },

    fill: vertical
      ? { start: 0, end: 0, bottom: 0 }
      : { top: 0, bottom: 0, start: 0 },

    output: {
      fontSize: theme.fontSizes[output],
      lineHeight: theme.lineHeights[output],
    },
  })
}

export const sliderRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { gap: theme.spacing(2) },
    output: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    // `full` rather than a step of the radius scale: a rail's ends are semicircles at every
    // thickness, and any fixed number is wrong for two of the three sizes.
    track: { borderRadius: theme.radius.full },
    fill: { position: 'absolute', borderRadius: theme.radius.full },
    /**
     * The knob: a solid disc of the fill's own colour, lifted off the rail by a shadow.
     *
     * That is Material's slider thumb rather than the legacy component's, which drew a
     * ring — the page's colour inside a two-point border. A ring reads as weak at sixteen
     * points and disappears against a busy background, and its border is the same two
     * points whether the knob is 16 or 24, so the smallest size is proportionally the
     * thinnest. The disc is the same shape at every size, and it never has to fight the
     * fill for contrast because the fill is a softened version of it.
     */
    thumb: { position: 'absolute', ...theme.shadows.surface },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Three steps of one colour, not two.
   *
   * The rail is the theme's neutral; the reach is the colour at `FILL_ALPHA`; the knob is
   * the colour at full. Read left to right that is grey, then a wash of the colour, then
   * the colour — so the eye lands on the knob, which is the value, rather than on the bar
   * behind it, which is only how far the value has come.
   *
   * Material's slider is the same relationship with the steps assigned differently: their
   * inactive track is the soft one and their active track is full. Moving the soft step
   * onto the *reach* rather than the remainder is where this stops being theirs — a filled
   * bar at full strength competes with the handle for the eye, and the handle is the part
   * you can move.
   *
   * Both the reach and the knob come off the same role, so a raw `color` moves all three
   * steps at once and none of them can drift from the others.
   */
  paint: (_theme, colors): SlotStyles<SliderSlot> => ({
    track: { backgroundColor: colors.bg },
    fill: {
      backgroundColor: colors.bgSelected
        ? alpha(colors.bgSelected, FILL_ALPHA)
        : undefined,
    },
    thumb: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    // The axes select; the compound below is what paints. Both are declared so `size` and
    // `orientation` are part of the cache key and a press still allocates nothing.
    size: { sm: () => ({}), md: () => ({}), lg: () => ({}) },
    orientation: { horizontal: () => ({}), vertical: () => ({}) },
    radius: radiusAxis('track', 'fill'),
  },

  compoundVariants: (['sm', 'md', 'lg'] as const).flatMap(size =>
    (['horizontal', 'vertical'] as const).map(orientation => ({
      when: { size, orientation },
      style: rail(SIZES[size], orientation),
    }))
  ),

  states: {
    /**
     * Grey, and the colour goes entirely. A disabled slider still reports a value, so the
     * bar has to stay legible — dimming the accent would leave a pale lavender that reads
     * as an enabled slider seen through fog, where a neutral one reads as switched off.
     */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      fill: { backgroundColor: theme.colors.defaultSoft },
      thumb: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: 'default', size: 'md', orientation: 'horizontal' },
})

export { SIZES as sliderSizes, VERTICAL_LENGTH as sliderVerticalLength }
