import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { ColorPickerSize, ColorPickerSlot } from './color-picker.type'

const SLOTS = [
  'preview',
  'grid',
  'group',
  'groupLabel',
  'swatches',
  'swatch',
  'swatchSelected',
  'swatchFill',
] as const

/**
 * **The chip and the grid, because the field already exists.**
 *
 * The column, the box, the label, the hint, the focus and the invalid treatment are the
 * `DummyField`'s recipe, resolved on that root — the same table the legacy picker's
 * `InputTrigger` used, under its v1 name. Declaring a second one here would be two tables
 * to keep in step, and the drift would show as a colour field and a select side by side in
 * a form half a shade apart.
 *
 * What is left is what neither owns: a chip that shows the answer, and a grid of colours to
 * pick it from.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  // A single entry, and it is still a table: `resolveTint` maps the roles a variant
  // declared, so `border` is what carries a raw `color` onto the ring below. The field's
  // own tint travels through the `DummyField`'s table rather than this one.
  default: { border: 'accent' },
}

/**
 * The cell, the chip and the three gaps, per size — in spacing steps, so `spacing(8)` is 32
 * on the base-4 scale.
 *
 * **The cell is as large as a row of eight allows, and the gutter is as small as a gap can
 * be and still be one.** Eight cells and seven gutters have to fit the 310 points a dialog
 * leaves on a phone: at `md` that is 8×32 + 7×4 = 284, and at `lg` 8×34 + 7×4 = 300. A ramp
 * that wrapped halfway through itself would read as two colours rather than one getting
 * darker, which is the whole reason the row exists.
 *
 * A four-point gutter is also what makes the ramp legible: swatches nearly touching read as
 * one continuous scale, where the air between them reads as eight unrelated colours.
 *
 * The chip is smaller than the cell and not by a ratio: it sits inside a field beside a
 * line of text, so it follows the field's own scale rather than the grid's.
 */
type SizeStep = {
  /** One grid cell, ring included. */
  cell: number
  /** The chip on the trigger. */
  chip: number
  /** Between two cells in a ramp. */
  gap: number
  /** Between a group's name and its row. */
  labelGap: number
  /** Between two ramps. Wider than `gap`, or the grid reads as one block of colour. */
  stackGap: number
  /** The hue's name above its row. */
  label: FontSizeKey
}

const SIZES: Record<ColorPickerSize, SizeStep> = {
  xs: { cell: 6, chip: 4, gap: 1, labelGap: 1, stackGap: 2, label: 'xs' },
  sm: { cell: 7, chip: 5, gap: 1, labelGap: 1.25, stackGap: 2, label: 'xs' },
  md: { cell: 8, chip: 5, gap: 1, labelGap: 1.5, stackGap: 2.5, label: 'sm' },
  lg: { cell: 8.5, chip: 6, gap: 1, labelGap: 1.75, stackGap: 3, label: 'md' },
}

/**
 * The ring, and the air between it and the colour.
 *
 * Both are drawn **at every cell, always** — transparent until the cell is the answer — so
 * choosing a colour changes one colour and moves nothing. A ring that appears by growing
 * the border, which is what the legacy picker did, shrinks the swatch under it by six
 * points at the moment it is pressed.
 */
const RING = 2
const RING_GAP = 1

function sizeAxis(step: SizeStep) {
  const { cell, chip, gap, labelGap, stackGap, label } = step

  return (theme: XAUITheme): SlotStyles<ColorPickerSlot> => {
    const side = theme.spacing(cell)
    const ring = theme.borderWidth.default * RING
    const chipSide = theme.spacing(chip)

    return {
      preview: {
        width: chipSide,
        height: chipSide,
        borderRadius: theme.radius.sm,
      },
      grid: { gap: theme.spacing(stackGap) },
      group: { gap: theme.spacing(labelGap) },
      groupLabel: {
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
      swatches: { gap: theme.spacing(gap) },
      swatch: {
        width: side,
        height: side,
        borderWidth: ring,
        padding: theme.borderWidth.default * RING_GAP,
        // The ring's radius has to clear the fill's, or the corner shows a sliver of the
        // ground between the two curves.
        borderRadius: theme.radius.md,
      },
      swatchFill: { borderRadius: theme.radius.sm },
    }
  }
}

export const colorPickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The chip and the fill both carry a hairline, and for the same reason: a white swatch
    // on a white sheet is nothing at all without one.
    preview: {
      borderWidth: theme.borderWidth.default,
      borderColor: theme.colors.border,
      borderCurve: 'continuous',
    },
    group: { flexDirection: 'column' },
    groupLabel: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    swatches: { flexDirection: 'row', flexWrap: 'wrap' },
    swatch: {
      // Transparent rather than absent — see `RING`. The colour arrives from `paint`, on
      // the slot below, only for the cell that is the answer.
      borderColor: 'transparent',
      borderCurve: 'continuous',
    },
    swatchFill: {
      flex: 1,
      borderWidth: theme.borderWidth.default,
      borderColor: theme.colors.border,
      borderCurve: 'continuous',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The ring's colour, on a slot of its own.
   *
   * It is `paint` rather than a `isSelected` axis because **the tint pass re-runs `paint`
   * and the states, not the axes** — a ring painted from an axis would stay the accent on a
   * picker whose `color` is the caller's own.
   */
  paint: (_theme, colors) => ({ swatchSelected: { borderColor: colors.border } }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** Declared after `size`, so it overrides the radius the cell chose. */
    radius: radiusAxis('swatch', 'swatchFill', 'preview'),
  },

  /**
   * The grid dims as a whole rather than swatch by swatch, which is the treatment the
   * field above it already gets from the `DummyField`'s own recipe. It only ever shows on
   * a grid written **without** a dialog: a disabled field cannot be opened, so there is no
   * panel to dim.
   */
  states: {
    disabled: theme => ({ grid: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})
