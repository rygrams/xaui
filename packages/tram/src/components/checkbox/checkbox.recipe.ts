import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { MarkGeometry } from './checkbox.mark'
import type { CheckboxSlot } from './checkbox.type'

const SLOTS = ['root', 'indicator', 'mark', 'label'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'square'

/**
 * Only the mark is the variant's colour, so only the mark follows `accent` and `color`.
 * The box's line is the page's ink in every accent, and is named in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

type SizeStep = MarkGeometry & {
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** Spacing steps between the box and the label. */
  gap: number
}

/**
 * The scale of the Metro radio — `TRAM-DESIGN.md` §RadioButton — on a square: the side,
 * the line, and how far in the mark sits. Points, not spacing steps: 26 and 34 are not on
 * the scale.
 *
 * All three stand under the 48 touch target, which the root makes up with `hitSlop`.
 */
export const CHECKBOX_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { box: 20, line: 2, inset: 3, type: 'body', gap: 2.5 },
  md: { box: 26, line: 2, inset: 5, type: 'subtitle', gap: 3 },
  lg: { box: 34, line: 3, inset: 6, type: 'title', gap: 3.5 },
}

function sizeAxis(step: SizeStep) {
  const { box, line, inset } = step

  return (theme: XAUITheme): SlotStyles<CheckboxSlot> => ({
    root: { gap: theme.spacing(step.gap) },
    indicator: { width: box, height: box, borderWidth: line },
    // Placed from inside the line, on all four sides: the mark is what is left.
    mark: { top: inset, bottom: inset, start: inset, end: inset },
    label: roleType(step.type, theme),
  })
}

/** The `radius` axis under the Tram ceiling — `full` included: the box is a square. */
function cornerAxis(): Record<RadiusKey, StyleFn<CheckboxSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<CheckboxSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      indicator: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

export const checkboxRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    indicator: {
      borderColor: theme.colors.foreground,
      borderRadius: boxCornerFor('lg', theme.radius),
    },
    mark: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: { color: theme.colors.foreground },
  }),

  variantTokens: VARIANT_TOKENS,

  /** A flat square, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    mark: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(CHECKBOX_GEOMETRY.sm),
      md: sizeAxis(CHECKBOX_GEOMETRY.md),
      lg: sizeAxis(CHECKBOX_GEOMETRY.lg),
    },

    radius: cornerAxis(),

    /**
     * The line and the mark, in `danger`. The label keeps its ink: the box says which
     * field is wrong, and the reason is written beside it by the app.
     */
    isInvalid: {
      true: theme => ({
        indicator: { borderColor: theme.colors.danger },
        mark: { backgroundColor: theme.colors.danger },
      }),
    },
  },

  states: {
    /**
     * Everything grey and no accent left — a ticked, disabled box still shows its mark, in
     * the grey. Dimmed as well, which on true black lands on the design's `#4d4d4d`.
     */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      indicator: { borderColor: theme.colors.muted },
      mark: { backgroundColor: theme.colors.muted },
      label: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})
