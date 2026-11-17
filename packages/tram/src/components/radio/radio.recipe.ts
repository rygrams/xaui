import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { MarkGeometry } from '../../system/selection-mark'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { RadioSlot } from './radio.type'

const SLOTS = ['root', 'indicator', 'mark', 'label'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'dot'

/**
 * Only the dot is the variant's colour, so only the dot follows `accent` and `color`. The
 * circle's line is the page's ink in every accent, and is named in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

type SizeStep = MarkGeometry & {
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** Spacing steps between the circle and the label. */
  gap: number
}

/**
 * `TRAM-DESIGN.md` §RadioButton: the diameter, the line, and how far in the dot sits.
 * Points, not spacing steps: 26 and 34 are not on the scale.
 *
 * All three stand under the 48 touch target, which the root makes up with `hitSlop`.
 */
export const RADIO_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { box: 20, line: 2, inset: 3, type: 'body', gap: 2.5 },
  md: { box: 26, line: 2, inset: 5, type: 'subtitle', gap: 3 },
  lg: { box: 34, line: 3, inset: 6, type: 'title', gap: 3.5 },
}

function sizeAxis(step: SizeStep) {
  const { box, line, inset } = step

  return (theme: XAUITheme): SlotStyles<RadioSlot> => ({
    root: { gap: theme.spacing(step.gap) },
    indicator: { width: box, height: box, borderWidth: line },
    // Placed from inside the line, on all four sides: the dot is what is left.
    mark: { top: inset, bottom: inset, start: inset, end: inset },
    label: roleType(step.type, theme),
  })
}

export const radioRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    // `full`, and no `radius` axis to change it: the circle is one of the two shapes
    // that go past the Tram corner, and it is the whole of what makes this a radio.
    indicator: {
      borderColor: theme.colors.foreground,
      borderRadius: theme.radius.full,
    },
    mark: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.full,
    },
    label: { color: theme.colors.foreground },
  }),

  variantTokens: VARIANT_TOKENS,

  /** A flat dot, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    mark: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(RADIO_GEOMETRY.sm),
      md: sizeAxis(RADIO_GEOMETRY.md),
      lg: sizeAxis(RADIO_GEOMETRY.lg),
    },

    /**
     * The line and the dot, in `danger`. The label keeps its ink: the circle says which
     * field is wrong, and the reason is written beside it by the app.
     */
    isInvalid: {
      true: theme => ({
        indicator: { borderColor: theme.colors.danger },
        mark: { backgroundColor: theme.colors.danger },
      }),
    },
  },

  /**
   * No `pressed`: the design's pressed circle fills with the accent, and Tram's rule is
   * that a press moves a control and leaves its colours alone. The row shrinks instead.
   */
  states: {
    /**
     * Everything grey and no accent left — a chosen, disabled option still shows its dot,
     * in the grey. Dimmed as well, which on true black lands on the design's `#4d4d4d`.
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
