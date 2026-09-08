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
 * **The cells of one ramp touch**, so the row reads as a single bar of one colour getting
 * darker rather than as eight unrelated chips. There is no gutter to add to the arithmetic:
 * the cell is simply as large as a row of eight allows inside the 310 points a dialog
 * leaves on a phone — 8×32 at `md`, 8×36 at `lg`. A ramp that wrapped halfway through
 * itself would read as two bars, which is the whole reason the row exists.
 *
 * Touching is also what moved the selection ring out of the box model: as a border it
 * reserved its own width plus the air behind it at every edge, and six points of ground
 * between two colours is not a ramp. It is drawn over the cell instead — see `swatch`.
 *
 * The chip is smaller than the cell and not by a ratio: it sits inside a field beside a
 * line of text, so it follows the field's own scale rather than the grid's.
 */
type SizeStep = {
  /** One grid cell, ring included. */
  cell: number
  /** The chip on the trigger. */
  chip: number
  /** Between a group's name and its row. */
  labelGap: number
  /** Between two ramps — the only air in the grid, and what keeps them apart. */
  stackGap: number
  /** The hue's name above its row. */
  label: FontSizeKey
}

const SIZES: Record<ColorPickerSize, SizeStep> = {
  xs: { cell: 6, chip: 4, labelGap: 1, stackGap: 2, label: 'xs' },
  sm: { cell: 7, chip: 5, labelGap: 1.25, stackGap: 2, label: 'xs' },
  md: { cell: 8, chip: 5, labelGap: 1.5, stackGap: 2.5, label: 'sm' },
  lg: { cell: 9, chip: 6, labelGap: 1.75, stackGap: 3, label: 'md' },
}

/**
 * The ring, in multiples of the theme's hairline.
 *
 * It is **drawn over the cell, out of the box model** — an absolutely positioned edge
 * rather than a border — for two reasons at once. A border would reserve its width at
 * every cell whether or not that cell is the answer, which is six points of ground between
 * two colours that are supposed to touch; and a border that appeared only on the chosen
 * cell, which is what the legacy picker did, shrinks the swatch under the finger at the
 * moment it is pressed. Over the top, nothing moves and nothing is reserved.
 */
const RING = 2

function sizeAxis(step: SizeStep) {
  const { cell, chip, labelGap, stackGap, label } = step

  return (theme: XAUITheme): SlotStyles<ColorPickerSlot> => {
    const side = theme.spacing(cell)
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
      swatch: { width: side, height: side },
      swatchSelected: { borderWidth: theme.borderWidth.default * RING },
    }
  }
}

export const colorPickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The chip carries a hairline for the reason the bar below does: a white swatch on a
    // white sheet is nothing at all without one.
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
    /**
     * The ramp is a **square bar**: no gap between its cells and no corner on either end.
     * A rounded end would put a curve on two of the eight colours and leave the other six
     * square, which reads as a bar that has been cut rather than one that stops — and the
     * corner is the one shape a swatch cannot afford, because it is the shape of the
     * colour itself.
     *
     * The hairline is the grid's only edge. One around the bar rather than one around each
     * cell: per-cell borders double up into a two-point line between every pair of colours,
     * and what actually needs an outline is the pale end of a ramp against a white sheet.
     *
     * `overflow` is for the `radius` axis rather than for the default — a caller who asks
     * for a corner gets one, and the cells inside are clipped to it.
     */
    swatches: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // No `gap`: the cells of one ramp touch. What separates two ramps is `grid`'s.
      alignSelf: 'flex-start',
      overflow: 'hidden',
      borderWidth: theme.borderWidth.default,
      borderColor: theme.colors.border,
    },
    swatchFill: { flex: 1 },
    // Over the cell rather than around it — see `RING`. R13: `start` and `end`, never
    // `left` and `right`, so the ring mirrors with the row it sits in.
    swatchSelected: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
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

    /** Declared after `size`, so it overrides the corner the bar and the chip chose. */
    radius: radiusAxis('swatches', 'preview'),
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
