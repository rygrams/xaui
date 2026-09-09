import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, Size, XAUITheme } from '../../theme/theme.type'
import type { ToggleButtonSlot, ToggleButtonVariant } from './toggle-button.type'

const SLOTS: readonly ToggleButtonSlot[] = [
  'root',
  'rootPressed',
  'rootSelected',
  'label',
  'labelSelected',
  'icon',
  'iconSelected',
]

/**
 * Rest is neutral; selection is the accent's soft slice for both variants. The selected
 * roles also make a raw `color` follow into that state through the uncached tint pass.
 */
const VARIANT_TOKENS: Record<ToggleButtonVariant, VariantTokens> = {
  default: {
    bg: 'default',
    bgPressed: 'defaultPressed',
    fg: 'defaultForeground',
    bgSelected: 'accentSoft',
    fgSelected: 'accentSoftForeground',
  },
  ghost: {
    bgPressed: 'defaultSoftPressed',
    fg: 'foreground',
    bgSelected: 'accentSoft',
    fgSelected: 'accentSoftForeground',
  },
}

function sizeAxis(step: SizeStep) {
  const { size, padding, gap, glyph, radius } = step

  return (theme: XAUITheme): SlotStyles<ToggleButtonSlot> => ({
    root: {
      height: theme.controlHeights[size],
      paddingHorizontal: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    label: {
      fontSize: theme.fontSizes[size],
      lineHeight: theme.lineHeights[size],
    },
    icon: { fontSize: theme.fontSizes[glyph] },
  })
}

type SizeStep = {
  size: Size
  padding: number
  gap: number
  glyph: FontSizeKey
  radius: RadiusKey
}

export const toggleButtonRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      borderWidth: 0,
      borderCurve: 'continuous',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg },
    rootPressed: { backgroundColor: colors.bgPressed },
    rootSelected: { backgroundColor: colors.bgSelected },
    label: { color: colors.fg },
    labelSelected: { color: colors.fgSelected },
    icon: { color: colors.fg },
    iconSelected: { color: colors.fgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis({ size: 'xs', padding: 3, gap: 1, glyph: 'sm', radius: '3xl' }),
      sm: sizeAxis({
        size: 'sm',
        padding: 3.5,
        gap: 1.5,
        glyph: 'md',
        radius: '3xl',
      }),
      md: sizeAxis({ size: 'md', padding: 4, gap: 2, glyph: 'lg', radius: '3xl' }),
      lg: sizeAxis({ size: 'lg', padding: 5, gap: 2.5, glyph: 'xl', radius: '4xl' }),
    },

    radius: radiusAxis('root'),

    isIconOnly: {
      true: () => ({ root: { paddingHorizontal: 0, aspectRatio: 1 } }),
    },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})
