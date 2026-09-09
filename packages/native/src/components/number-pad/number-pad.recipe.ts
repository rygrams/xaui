import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type {
  NumberPadSize,
  NumberPadSlot,
  NumberPadVariant,
} from './number-pad.type'

const SLOTS = [
  'root',
  'row',
  'key',
  'label',
  'icon',
  'ghost',
  'ghostLabel',
  'ghostIcon',
] as const

/**
 * The `Button`'s emphasis ladder with its two intents removed — a keypad is furniture, and
 * there is no `danger` keypad. `default` is what the pad ships as: eleven keys in the
 * accent is a wall of colour, and the digit is what the eye is looking for.
 */
const VARIANT_TOKENS: Record<NumberPadVariant, VariantTokens> = {
  primary: { bg: 'accent', bgPressed: 'accentPressed', fg: 'accentForeground' },
  secondary: {
    bg: 'accentSoft',
    bgPressed: 'accentSoftPressed',
    fg: 'accentSoftForeground',
  },
  default: { bg: 'default', bgPressed: 'defaultPressed', fg: 'defaultForeground' },
  tertiary: { border: 'border', bgPressed: 'defaultSoftPressed', fg: 'foreground' },
  ghost: { bgPressed: 'defaultSoftPressed', fg: 'foreground' },
}

/**
 * How much taller than a control a key is.
 *
 * A key is hit with a thumb rather than pointed at, and it is hit eleven times in a row —
 * a control-height key turns a PIN into a exercise in precision. One and a half puts `md`
 * at 72 points, which is the size every platform's own keypad settles near.
 *
 * Derived from `controlHeights` rather than written out, so a theme that raises its
 * controls raises its keypad with them.
 */
const KEY_HEIGHT_RATIO = 1.5

function keyHeight(theme: XAUITheme, size: NumberPadSize): number {
  return theme.controlHeights[size] * KEY_HEIGHT_RATIO
}

type SizeStep = {
  size: NumberPadSize
  /** Between the keys, in spacing steps — the same value across and down. */
  gap: number
  radius: RadiusKey
  digit: FontSizeKey
  glyph: FontSizeKey
}

/**
 * `size` drives the key's height, its corner, the gaps and the digit — **never a width**.
 * Every cell is `flex: 1`, so the pad is as wide as it is given and the three columns
 * divide that between them. There is no width in this recipe and none is needed.
 *
 * The gap is one value for both axes: a grid whose rows sit closer than its columns reads
 * as three separate rows rather than as one pad.
 */
function sizeAxis(step: SizeStep) {
  const { size, gap, radius, digit, glyph } = step

  return (theme: XAUITheme): SlotStyles<NumberPadSlot> => {
    const height = keyHeight(theme, size)
    const corner = theme.radius[radius]

    return {
      root: { gap: theme.spacing(gap) },
      row: { gap: theme.spacing(gap) },
      key: { height, borderRadius: corner },
      ghost: { height, borderRadius: corner },
      label: {
        fontSize: theme.fontSizes[digit],
        lineHeight: theme.lineHeights[digit],
      },
      ghostLabel: {
        fontSize: theme.fontSizes[glyph],
        lineHeight: theme.lineHeights[glyph],
      },
      icon: { fontSize: theme.fontSizes[glyph] },
      ghostIcon: { fontSize: theme.fontSizes[glyph] },
    }
  }
}

const SIZES: Record<NumberPadSize, SizeStep> = {
  sm: { size: 'sm', gap: 2, radius: 'xl', digit: '2xl', glyph: 'lg' },
  md: { size: 'md', gap: 2.5, radius: 'xl', digit: '3xl', glyph: 'xl' },
  lg: { size: 'lg', gap: 3, radius: '2xl', digit: '4xl', glyph: '2xl' },
}

export const numberPadRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    row: { flexDirection: 'row' },
    // `flex: 1` on both, so the three columns divide the width the pad was given. The
    // `borderCurve` is iOS's squircle, free on Android and what keeps a corner this large
    // reading as a shape rather than as two arcs meeting a straight edge.
    key: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
      borderCurve: 'continuous',
    },
    ghost: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderCurve: 'continuous',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      textAlign: 'center',
    },
    /**
     * The bare cells read the **page's** foreground rather than the variant's, and they
     * are painted here rather than in `paint` because that is exactly what makes them
     * independent of it: a `primary` pad puts `accentForeground` on its digits, and a
     * backspace with no ground of its own would take white on white. It is also why a raw
     * `color` does not reach them — `resolveTint` re-runs `paint`, not `base`.
     */
    ghostLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      textAlign: 'center',
      color: theme.colors.foreground,
    },
    ghostIcon: { color: theme.colors.foreground },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land. Only the filled keys: the border width follows the
   * *presence* of the border role rather than a per-variant flag, and `tertiary` is the one
   * variant that names one.
   */
  paint: (theme, colors) => ({
    key: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    label: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the corner `size` chose. */
  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },

    radius: radiusAxis('key', 'ghost'),
  },

  /**
   * A filled key presses to the variant's own `…Pressed` token, as the `Button` does. A
   * bare cell has no fill to darken, so it takes the neutral wash instead — the same one
   * `ghost` and `tertiary` take, which is what makes the backspace read as pressed on a
   * pad of any variant.
   */
  states: {
    pressed: (theme, colors) => ({
      key: { backgroundColor: colors.bgPressed },
      ghost: { backgroundColor: theme.colors.defaultSoftPressed },
    }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})
