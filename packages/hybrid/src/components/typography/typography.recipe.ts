import { createRecipe } from '../../system/recipe'
import type { TextStyle, VariantTokens } from '../../system'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TypographySlot, TypographyVariant } from './typography.type'

type StyleFunction = (theme: XAUITheme) => Record<TypographySlot, TextStyle>

const SLOTS = ['root'] as const

const VARIANT_TOKENS: Record<TypographyVariant, VariantTokens> = {
  h1: { fg: 'foreground' },
  h2: { fg: 'foreground' },
  h3: { fg: 'foreground' },
  h4: { fg: 'foreground' },
  h5: { fg: 'foreground' },
  h6: { fg: 'foreground' },
  body: { fg: 'foreground' },
  'body-sm': { fg: 'foreground' },
  'body-xs': { fg: 'foreground' },
  code: { fg: 'foreground' },
}

type Role = {
  step: FontSizeKey
  weight: keyof XAUITheme['fontWeights']
  family: keyof XAUITheme['fontFamilies']
  letterSpacing?: number
  chip?: true
}

const ROLES: Record<TypographyVariant, Role> = {
  h1: { step: '4xl', weight: 'bold', family: 'heading', letterSpacing: -0.5 },
  h2: { step: '3xl', weight: 'bold', family: 'heading', letterSpacing: -0.4 },
  h3: { step: '2xl', weight: 'bold', family: 'heading', letterSpacing: -0.3 },
  h4: { step: 'xl', weight: 'semibold', family: 'heading' },
  h5: { step: 'lg', weight: 'semibold', family: 'heading' },
  h6: { step: 'md', weight: 'semibold', family: 'heading' },
  body: { step: 'md', weight: 'regular', family: 'body' },
  'body-sm': { step: 'sm', weight: 'regular', family: 'body' },
  'body-xs': { step: 'xs', weight: 'regular', family: 'body' },
  code: { step: 'sm', weight: 'regular', family: 'mono', chip: true },
}

function metricsOf({
  step,
  weight,
  family,
  letterSpacing,
  chip,
}: Role): StyleFunction {
  return theme => ({
    root: {
      fontSize: theme.fontSizes[step],
      lineHeight: theme.lineHeights[step],
      fontWeight: theme.fontWeights[weight],
      fontFamily: theme.fontFamilies[family],
      ...(letterSpacing === undefined ? {} : { letterSpacing }),
      ...(chip === undefined
        ? {}
        : {
            alignSelf: 'flex-start' as const,
            backgroundColor: theme.colors.default,
            paddingHorizontal: theme.spacing(1.5),
            paddingVertical: theme.spacing(0.5),
            borderRadius: theme.radius.md,
          }),
    },
  })
}

const ROLE_AXIS = Object.fromEntries(
  Object.entries(ROLES).map(([name, spec]) => [name, metricsOf(spec)])
) as Record<TypographyVariant, StyleFunction>

export const typographyRecipe = createRecipe({
  slots: SLOTS,
  variantTokens: VARIANT_TOKENS,
  paint: (_theme, colors) => ({ root: { color: colors.fg } }),
  variants: { variant: ROLE_AXIS },
  defaultVariants: { variant: 'body' },
})
