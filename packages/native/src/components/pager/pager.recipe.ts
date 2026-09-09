import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { Size, XAUITheme } from '../../theme/theme.type'
import type { PagerSlot, PagerVariant } from './pager.type'

const SLOTS = ['root', 'content', 'page', 'indicator', 'dot', 'dotActive'] as const

/**
 * The tokens paint the **dots**, and nothing else — the pages are the caller's content and
 * this component never touches them.
 *
 * Only `bgSelected` is named, because only the current dot is a colour decision: the ones
 * behind it keep the neutral fill `base` gives them, which is the ground the current one
 * travels over. `bgSelected` is also the role a raw `color` re-tints, which is why the
 * colour that matters is the one carrying that name.
 */
const VARIANT_TOKENS: Record<PagerVariant, VariantTokens> = {
  primary: { bgSelected: 'accent' },
  secondary: { bgSelected: 'defaultForeground' },
  // The raised ground rather than the page's, which on a light theme is white: this is the
  // pager over a photograph, where an accent dot disappears into whatever is behind it.
  tertiary: { bgSelected: 'surface' },
}

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

  base: theme => ({
    // A pager holds screens, so it fills what it is given. A caller who wants it shorter
    // says so — `height={240}` — rather than the component guessing on their behalf.
    root: { flex: 1 },
    content: { flex: 1 },
    // A page is the size of the track on both axes, and that number is measured rather than
    // named, so it arrives as an inline style instead of from here.
    page: { overflow: 'hidden' },
    indicator: { alignItems: 'center', justifyContent: 'center' },
    /**
     * A neutral fill rather than a faint version of the current one: a pale tint of the
     * accent under the pages reads as a control that has half failed to load. A raw `color`
     * reaches the current dot, which is the one it should move.
     */
    dot: { backgroundColor: theme.colors.default },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The current dot, **read as a value and never applied as a style**: the colour is
   * interpolated on the UI thread, and `interpolateColor` needs a string rather than a
   * `StyleSheet` id. The root flattens this slot into `dotInk`, so the recipe still owns it.
   */
  paint: (_theme, colors) => ({
    dotActive: { backgroundColor: colors.bgSelected },
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
