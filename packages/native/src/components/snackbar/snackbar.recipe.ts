import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { SnackbarSlot, SnackbarVariant } from './snackbar.type'

const SLOTS = ['root', 'message', 'actions', 'action', 'actionLabel'] as const
const VARIANT_TOKENS: Record<SnackbarVariant, VariantTokens> = {
  secondary: { bg: 'foreground', fg: 'background' },
  success: { bg: 'success', fg: 'successForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
}

export const snackbarRecipe = createRecipe({
  slots: SLOTS,
  base: theme => ({
    root: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingStart: theme.spacing(4),
      paddingEnd: theme.spacing(2),
      paddingVertical: theme.spacing(3.5),
      gap: theme.spacing(2),
      borderCurve: 'continuous',
      ...theme.shadows.overlay,
    },
    message: {
      flex: 1,
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
    },
    actions: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(1) },
    action: {
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(2),
      borderRadius: theme.radius.full,
    },
    actionLabel: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      fontWeight: theme.fontWeights.medium,
    },
  }),
  variantTokens: VARIANT_TOKENS,
  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg },
    message: { color: colors.fg },
    actionLabel: { color: colors.fg },
  }),
  variants: { radius: radiusAxis('root') },
  defaultVariants: { variant: 'secondary', radius: 'md' },
})

export type { SnackbarSlot }
