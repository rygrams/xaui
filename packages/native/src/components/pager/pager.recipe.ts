import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { Size, XAUITheme } from '../../theme/theme.type'
import type { PagerSlot, PagerVariant } from './pager.type'

const SLOTS = ['root', 'content', 'page', 'indicator', 'dot'] as const

/**
 * The tokens paint the **dots**, and nothing else — the pages are the caller's content and
 * this component never touches them.
 *
 * One role, not two. Every dot takes `bgSelected` and the unfilled ones are the same colour
 * at `DOT_REST_OPACITY`, so there is no second token that has to be chosen to contrast with
 * the first. It is also the role a raw `color` re-tints, which is why a tinted pager tints
 * its whole indicator rather than half of it.
 */
const VARIANT_TOKENS: Record<PagerVariant, VariantTokens> = {
  primary: { bgSelected: 'accent' },
  // The page's own ink, for an indicator that has to read as chrome rather than as accent.
  secondary: { bgSelected: 'foreground' },
  // The raised ground — white on a light theme. A pager over a *photograph* wants
  // `color="#ffffff"` instead: a photograph is a photograph in both colour modes, and this
  // token flips with the theme.
  tertiary: { bgSelected: 'surface' },
}

/**
 * How far behind the current dot the others sit.
 *
 * **Opacity, not a second colour**, and this is the load-bearing decision in the file. A
 * neutral fill for the unfilled dots — the `Carousel`'s answer, which this copied first — has
 * to contrast with whatever the current one happens to be, and it cannot: `tertiary` puts
 * `surface` against `default`, which is `#ffffff` on `#e4e4e7` in light and two
 * near-identical greys in dark. The variant that exists for a pager over an image was the one
 * whose indicator could not be read.
 *
 * One colour at two opacities cannot collapse like that, whatever the variant, whichever the
 * colour mode, and for any raw `color` a caller invents. It is also what iOS's own page
 * control does.
 *
 * 0.3 rather than 0.5: the dots are seven points across, and at half strength a small mark
 * reads as the current one seen through something rather than as a mark behind it.
 */
export const DOT_REST_OPACITY = 0.3

type SizeStep = {
  /** A dot's diameter. */
  dot: number
  /** Between two dots, in spacing steps. */
  gap: number
}

const SIZES: Record<Size, SizeStep> = {
  xs: { dot: 5, gap: 1 },
  sm: { dot: 6, gap: 1.5 },
  md: { dot: 7, gap: 1.5 },
  lg: { dot: 8, gap: 2 },
}

/**
 * `size` moves the dots and the gap between them, and **nothing about a page**. A page is
 * exactly the track it sits in — measured, never given — so there is no size for `size` to
 * set and no width or height anywhere in this recipe.
 */
function sizeAxis(step: SizeStep) {
  const { dot, gap } = step

  return (theme: XAUITheme): SlotStyles<PagerSlot> => ({
    indicator: { gap: theme.spacing(gap) },
    dot: { width: dot, height: dot, borderRadius: dot / 2 },
  })
}

/**
 * Whether the dots run across or down, which follows the pages.
 *
 * The indicator is **in the flow** rather than over the track: a pager's dots usually sit
 * under the pages, and a caller who wants them on top writes it —
 * `position="absolute" bottom={16} start={0} end={0}` — which is what the style props are
 * for. Absolute by default would have made the common case the one that needs undoing.
 */
function orientationAxis(direction: 'row' | 'column') {
  return (): SlotStyles<PagerSlot> => ({
    indicator: { flexDirection: direction },
  })
}

export const pagerRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    /**
     * **The root has no size of its own**, and that is deliberate rather than missing.
     *
     * `flex: 1` here would have been the convenient default and it is a trap: React Native
     * expands it to a zero flex-basis, which **overrides an explicit `height`** — so
     * `<Pager height={240}>` would collapse to the height of its dots, and the prop the
     * caller reached for would silently do nothing. It is the same reason there is no
     * `fullWidth` on a `Button`: RN's own behaviour is the answer, and the caller says which
     * of the two they want — `flex={1}` to fill a screen, `height={320}` inside a scroll
     * view.
     *
     * The track keeps its `flex: 1`, so it takes whatever the root was given less the dots.
     * Nothing sizes it from outside, which is why it is safe there and not here.
     */
    content: { flex: 1 },
    // A page is the size of the track on both axes, and that number is measured rather than
    // named, so it arrives as an inline style instead of from here.
    page: { overflow: 'hidden' },
    indicator: { alignItems: 'center', justifyContent: 'center' },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Every dot takes the same colour. What separates the current one from the rest is its
   * opacity, animated on the UI thread — so this is a plain style rather than a value the
   * root has to flatten and hand to a worklet.
   */
  paint: (_theme, colors) => ({
    dot: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    orientation: {
      horizontal: orientationAxis('row'),
      vertical: orientationAxis('column'),
    },
  },

  states: {
    disabled: theme => ({ indicator: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md', orientation: 'horizontal' },
})
