import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import { ROWS } from './wheel-picker.geometry'
import type {
  WheelPickerSize,
  WheelPickerSlot,
  WheelPickerVariant,
} from './wheel-picker.type'

const SLOTS = ['root', 'band', 'column', 'item', 'itemSelected'] as const

/**
 * What the variant names is **the band** — the shape behind the middle row — and the colour
 * the row on it takes.
 *
 * `ghost` names neither a fill nor a border, and that is the design rather than an omission:
 * a wheel whose rows fade and turn away from the centre already says which one is chosen,
 * and on a busy screen the band is the part that reads as chrome.
 *
 * **`secondary` names `defaultForeground` rather than `foreground`**, and the difference is
 * only visible under a tint. `resolveTint` reads the role off the token's own name: a bare
 * `foreground` is a neutral and maps to the tint itself, so a tinted band would have been
 * painted the same colour as the row sitting on it. The `*Foreground` suffix is what asks
 * for the colour that reads *against* the tint instead.
 */
const VARIANT_TOKENS: Record<WheelPickerVariant, VariantTokens> = {
  primary: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  secondary: { bg: 'default', fg: 'defaultForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

function sizeAxis(size: WheelPickerSize) {
  const { height, type } = ROWS[size]

  return (theme: XAUITheme): SlotStyles<WheelPickerSlot> => ({
    // Pulled back by half its own height, because `top: '50%'` puts its *edge* at the
    // middle of the wheel and what has to sit there is its centre.
    band: { height, marginTop: -height / 2 },
    item: {
      height,
      lineHeight: height,
      fontSize: theme.fontSizes[type],
    },
  })
}

export const wheelPickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'stretch' },
    // Laid over the columns rather than drawn between them, and behind them: it is one
    // shape across the whole wheel, where a band per column would show its seams wherever
    // two columns sit at different widths.
    band: {
      position: 'absolute',
      start: 0,
      end: 0,
      // Centred by its own half-height rather than by `justifyContent`, because the wheel
      // is a fixed height and the band has to sit at the middle of it whatever is inside.
      top: '50%',
      borderRadius: theme.radius.lg,
      pointerEvents: 'none',
    },
    // One column takes what is left after the others. A wheel of three columns is three
    // equal columns unless a caller says otherwise, which is what `flex` on a slot means.
    column: { flex: 1 },
    item: {
      fontFamily: theme.fontFamilies.body,
      textAlign: 'center',
      // A wheel of numbers that jumped sideways at every turn would read as broken.
      fontVariant: ['tabular-nums'],
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    band: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      // `tertiary` is two hairlines rather than a box: the band marks a row in a column of
      // rows, and a full border round it reads as a field the wheel is inside.
      borderTopWidth: colors.border ? theme.borderWidth.default : 0,
      borderBottomWidth: colors.border ? theme.borderWidth.default : 0,
    },
    item: { color: theme.colors.foreground },
    itemSelected: { color: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },

    /** The band, and only the band. Nothing else here has a corner. */
    radius: radiusAxis('band'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'secondary', size: 'md' },
})
