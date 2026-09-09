import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type {
  MorphButtonSize,
  MorphButtonSlot,
  MorphButtonVariant,
} from './morph-button.type'

const SLOTS = [
  'root',
  'collapsed',
  'expanded',
  'label',
  'title',
  'description',
  'icon',
] as const

/**
 * The `Button`'s table, copied deliberately rather than imported: a `MorphButton` is a
 * button and has to read as one at rest, and the day the button's ladder moves this one
 * moves with it — but a shared table would also make a new role on either component a
 * change to the other.
 */
const VARIANT_TOKENS: Record<MorphButtonVariant, VariantTokens> = {
  primary: { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
  secondary: {
    bg: 'accentSoft',
    bgPressed: 'accentSoftPressed',
    fg: 'accentSoftForeground',
  },
  default: { bg: 'default', bgPressed: 'defaultPressed', fg: 'defaultForeground' },
  tertiary: { border: 'border', bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  ghost: { bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  danger: { bg: 'danger', bgPressed: 'dangerPressed', fg: 'dangerForeground' },
  'danger-soft': {
    bg: 'dangerSoft',
    bgPressed: 'dangerSoftPressed',
    fg: 'dangerSoftForeground',
  },
}

/**
 * The sentence under the title, turned down rather than recoloured.
 *
 * Down by opacity and not by a second token, for the reason `FabDiscovery` gives: the
 * ground is the variant's own fill as often as it is a raw `color`, and there is no
 * contrast colour in the theme for a colour the caller invented. The one guaranteed to
 * read on it is the one the title already uses, at less of it.
 */
const DESCRIPTION_OPACITY = 0.72

type SizeStep = {
  /** The collapsed height, which is also what the shared corner is derived from. */
  height: Size
  /** The pill's side inset, in spacing steps. */
  inset: number
  /** Between the mark and the label, in the pill. */
  gap: number
  /** The card's inset — a frame on four sides, where the pill has one on two. */
  padding: number
  /** Between the title and the sentence under it. */
  stack: number
  label: FontSizeKey
  title: FontSizeKey
  description: FontSizeKey
  glyph: FontSizeKey
}

/**
 * One corner for both shapes, and it is **half the collapsed height**.
 *
 * That single value is what makes the morph read: at the collapsed height it is exactly a
 * pill, and on the taller card it is a corner in proportion to the control's scale. A
 * radius key would have to be two keys — a pill at `sm` is 20 points and a card that
 * rounded is a gélule — and the pair would then be a compound of `size` and `radius`
 * saying what this line says once.
 */
function sharedCorner(theme: XAUITheme, height: Size): number {
  return theme.controlHeights[height] / 2
}

/**
 * `size` moves the collapsed height, both insets, the gaps, the corner and the type —
 * **never a width**. The collapsed shape hugs its label in a row and fills its parent in a
 * column, which is RN's own behaviour and the reason there is no `fullWidth` prop; the
 * expanded one is as tall as what is in it.
 *
 * The height lives on the **collapsed face** rather than on the root, and the paddings on
 * the two faces rather than on the box they share. That is what removes the compound this
 * component would otherwise need: exactly one face is mounted at a time, so the root takes
 * its shape from whichever one that is, and `size` writes each face's measurements once
 * instead of writing the root's twice.
 */
function sizeAxis(step: SizeStep) {
  const { height, inset, gap, padding, stack, label, title, description, glyph } =
    step

  return (theme: XAUITheme): SlotStyles<MorphButtonSlot> => ({
    root: { borderRadius: sharedCorner(theme, height) },
    collapsed: {
      height: theme.controlHeights[height],
      paddingHorizontal: theme.spacing(inset),
      gap: theme.spacing(gap),
    },
    expanded: { padding: theme.spacing(padding), gap: theme.spacing(stack) },
    label: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[description],
      lineHeight: theme.lineHeights[description],
    },
    icon: { fontSize: theme.fontSizes[glyph] },
  })
}

const SIZES: Record<MorphButtonSize, SizeStep> = {
  sm: {
    height: 'sm',
    inset: 3.5,
    gap: 1.5,
    padding: 4,
    stack: 1,
    label: 'sm',
    title: 'md',
    description: 'xs',
    glyph: 'md',
  },
  md: {
    height: 'md',
    inset: 4,
    gap: 2,
    padding: 5,
    stack: 1.5,
    label: 'md',
    title: 'lg',
    description: 'sm',
    glyph: 'lg',
  },
  lg: {
    height: 'lg',
    inset: 5,
    gap: 2.5,
    padding: 6,
    stack: 2,
    label: 'lg',
    title: 'xl',
    description: 'md',
    glyph: 'xl',
  },
}

export const morphButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      // No width and no height: the faces carry the measurements, so the box is the size of
      // whichever one is mounted. RN's own `alignItems: 'stretch'` is what lets the card
      // fill the box the pill's label sized.
      borderWidth: 0,
      // The entering face is at its final size while the box is still travelling, so
      // without this the card's content is drawn outside the shape for the length of the
      // spring. Clipped, the same frames read as the shape revealing it.
      overflow: 'hidden',
      // iOS's squircle, and what keeps a corner this large reading as a shape rather than
      // as two arcs meeting a straight edge.
      borderCurve: 'continuous',
    },
    collapsed: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      opacity: DESCRIPTION_OPACITY,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once — the `Button`'s `paint`,
   * with the card's two text slots reading the same foreground as the pill's label. The
   * border width follows the *presence* of the border role rather than a per-variant flag.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
    title: { color: colors.fg },
    description: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the corner `size` derived. */
  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root'),
  },

  /**
   * The pressed colour is the variant's own `…Pressed` token rather than a
   * `PressableFeedback.Highlight`, exactly as on the `Button`: a control picks one
   * treatment or the other, and both would darken it twice.
   */
  states: {
    pressed: (_theme, colors) => ({ root: { backgroundColor: colors.bgPressed } }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
