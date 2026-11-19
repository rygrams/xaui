import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { roleType } from '../typography/typography.role'
import type { ToastSlot, ToastVariant } from './toast.type'

const SLOTS = ['root', 'title', 'description', 'actions'] as const

export const DEFAULT_VARIANT: ToastVariant = 'default'

/**
 * The pile's geometry, in spacing steps: what the host leaves between two toasts. A toast
 * is a band the width of the screen, edge to edge, as Metro's was — nothing on its sides —
 * and the gap is the host's to apply: a toast has no margin of its own.
 */
export const TOAST_GAP = 2

/** The height of a toast of one line: the tallest control, Windows Phone's 56. */
export function toastLine(theme: XAUITheme): number {
  return theme.controlHeights.lg
}

/**
 * A variant names a fill and the ink the theme computed for it — `onAccent` of that fill,
 * so black on amber. `default` is the accent: a toast is the accent's rectangle.
 */
const VARIANT_TOKENS: Record<ToastVariant, VariantTokens> = {
  default: { bg: 'accent', fg: 'accentForeground' },
  accent: { bg: 'accent', fg: 'accentForeground' },
  success: { bg: 'success', fg: 'successForeground' },
  warning: { bg: 'warning', fg: 'warningForeground' },
  danger: { bg: 'danger', fg: 'dangerForeground' },
}

/** The `radius` axis under the Tram ceiling — `full` included: the toast is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<ToastSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<ToastSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

export const toastRecipe = createRecipe({
  slots: SLOTS,

  /**
   * One row, Metro's: what the caller put first, the title, the description on what is
   * left of the line, the actions at the end. No border and no shadow: a flat fill.
   */
  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(2.5),
      minHeight: toastLine(theme),
      paddingHorizontal: theme.spacing(3.5),
      paddingVertical: theme.spacing(2),
      // Square: a band that meets both edges of the screen has no corner to round.
      // `radius` still rounds it, up to the Tram 2, for a pile placed inside a frame.
      borderRadius: 0,
    },
    // The body role, heavier: Selawik has no semibold face to name, so the weight is the
    // theme's, as on the `Button`'s label.
    title: {
      ...roleType('body', theme),
      fontWeight: theme.fontWeights.semibold,
      flexShrink: 1,
    },
    // What is left of the line, and no more than the line.
    description: { ...roleType('body', theme), flex: 1 },
    actions: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing(2) },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg },
    title: { color: colors.fg },
    description: { color: colors.fg },
  }),

  variants: {
    radius: cornerAxis(),

    /** With no description to take the rest of the line, the title does. */
    isTitleOnly: { true: () => ({ title: { flexGrow: 1 } }) },
  },

  defaultVariants: { variant: DEFAULT_VARIANT },
})
