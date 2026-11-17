import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { tramType } from '../../theme/tram-tokens'
import type { TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from './typography.role'
import type { TypographySlot } from './typography.type'

const SLOTS = ['root'] as const

const ROLES = Object.keys(tramType) as TramTypeRole[]

export const DEFAULT_ROLE: TramTypeRole = 'body'

/** Ink alone, and the same ink for all eight: a role is a size, not an emphasis. */
const VARIANT_TOKENS = Object.fromEntries(
  ROLES.map(role => [role, { fg: 'foreground' }])
) as Record<TramTypeRole, VariantTokens>

/** No `lineHeight`: the face's own leading is what a 120-point Light was drawn with. */
function metricsOf(role: TramTypeRole) {
  return (theme: XAUITheme): SlotStyles<TypographySlot> => ({
    root: roleType(role, theme),
  })
}

/**
 * The axis is named `variant` and carries the measurements, as in Native's `Typography`:
 * the role is the size and the weight at once, so there is no second axis to pair it with.
 * It also keeps the eight roles in the cache key — eight stable styles for the app's
 * lifetime.
 */
const ROLE_AXIS = Object.fromEntries(
  ROLES.map(role => [role, metricsOf(role)])
) as Record<TramTypeRole, ReturnType<typeof metricsOf>>

/** No `base`, and nothing about case: the text is drawn as the app wrote it. */
export const typographyRecipe = createRecipe({
  slots: SLOTS,
  variantTokens: VARIANT_TOKENS,
  paint: (_theme, colors) => ({ root: { color: colors.fg } }),
  variants: { variant: ROLE_AXIS },
  defaultVariants: { variant: DEFAULT_ROLE },
})
