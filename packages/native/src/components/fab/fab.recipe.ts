import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { FabSize, FabSlot, FabVariant } from './fab.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

/**
 * The `Button`'s table, token for token — and deliberately not the `Button`'s *recipe*.
 *
 * A FAB and a button are the same seven intents on two different boxes: one is a row of text
 * with padding, the other is a circle that floats and carries a shadow at rest. Sharing the
 * recipe would mean a `size` axis that means a height on one and a side on the other, and a
 * `shadow` in `base` that a button never wants. Sharing the *table* is what keeps a compose
 * button and a compose FAB the same green.
 */
const VARIANT_TOKENS: Record<FabVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { fg: 'foreground', border: 'border' },
  ghost: { fg: 'foreground' },
  success: { bg: 'success', fg: 'successForeground' },
  'success-soft': { bg: 'successSoft', fg: 'success' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  'warning-soft': { bg: 'warningSoft', fg: 'warning' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
  'danger-soft': { bg: 'dangerSoft', fg: 'danger' },
}

type SizeStep = {
  /** The square's side. Material's three, measured, and the legacy's. */
  side: number
  /** An extended one's inset, in spacing steps. Its height is still `side`. */
  paddingHorizontal: number
  /** Between the mark and the word. */
  gap: number
  label: FontSizeKey
  /** The mark, in points — a glyph, not a token, because `Icon` takes a number. */
  glyph: number
}

const SIZES: Record<FabSize, SizeStep> = {
  sm: { side: 40, paddingHorizontal: 4, gap: 2, label: 'sm', glyph: 18 },
  md: { side: 56, paddingHorizontal: 5, gap: 2.5, label: 'md', glyph: 24 },
  lg: { side: 96, paddingHorizontal: 7, gap: 3, label: 'lg', glyph: 36 },
}

/** The glyph the size implies, read as a value — an `Icon` takes props, not styles. */
export function fabGlyph(size: FabSize): number {
  return SIZES[size].glyph
}

/**
 * The busy ring, at the mark's own diameter.
 *
 * The `Button`'s, geometry for geometry — a circle with one quarter left transparent, which
 * is what turning it into a spinner needs and what `useRotation` turns.
 */
function ring(theme: XAUITheme, size: number): SlotStyles<FabSlot>['spinner'] {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: theme.borderWidth.default * 2,
    borderTopColor: 'transparent',
  }
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<FabSlot> => ({
    // A fixed side both ways, which is what makes it round. An extended one keeps the
    // height and gives up the width — the compound below is where that happens.
    root: {
      width: step.side,
      height: step.side,
      gap: theme.spacing(step.gap),
    },
    label: {
      fontSize: theme.fontSizes[step.label],
      lineHeight: theme.lineHeights[step.label],
    },
    spinner: ring(theme, step.glyph),
  })
}

export const fabRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // It hugs its content rather than filling its parent, which is where a FAB parts
      // company with a `Button`: a button in a column stretching to the column's width is
      // RN's own behaviour and the right one, and a full-width FAB is a button. The legacy
      // said the same thing in the same line.
      alignSelf: 'flex-start',
      borderCurve: 'continuous',
      // At rest, and that is the difference from a button: a FAB floats over the content it
      // acts on, and a shadow is what says so before it is touched.
      ...theme.shadows.overlay,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
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
    // A slot read as a value rather than applied: `Icon` and `Spinner` take a colour as a
    // prop, and this is where the recipe names it.
    icon: { color: colors.fg },
    spinner: { borderColor: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },

    radius: radiusAxis('root'),

    /**
     * Wider than it is tall. The width is given up — `auto`, so the box is its content plus
     * its inset — and the height stays the size's own, which is what keeps an extended FAB
     * and a round one on the same line at the same height.
     */
    extended: {
      true: () => ({ root: { width: 'auto' } }),
    },
  },

  compoundVariants: [
    // The inset belongs to the pair, not to either axis: a round FAB has none at all — its
    // mark is centred in a fixed square — and an extended one's grows with the size.
    ...(['sm', 'md', 'lg'] as const).map(size => ({
      when: { size, extended: 'true' as const },
      style: (theme: XAUITheme) => ({
        root: { paddingHorizontal: theme.spacing(SIZES[size].paddingHorizontal) },
      }),
    })),
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md', radius: 'full' },
})
