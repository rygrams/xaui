import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { ColorPickerSize, ColorPickerSlot } from './color-picker.type'

const SLOTS = [
  'content',
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
 * darker rather than as eight unrelated chips. Touching is also what moved the selection
 * ring out of the box model: as a border it reserved its own width plus the air behind it
 * at every edge, and six points of ground between two colours is not a ramp. It is drawn
 * over the cell instead — see `RING`.
 *
 * **The name sits beside the ramp, not above it.** Eighteen ramps with a caption over each
 * is eighteen lines of type in a dialog that could have been colour, and the eye reads a
 * label to the left of the thing it names as readily as one on top of it.
 *
 * **The cell is a basis, not a width.** A row has to hold the label column, a gap and eight
 * cells inside whatever the dialog leaves — 326 points on one phone and 311 on the next —
 * and a fixed cell has to be sized for the narrowest of them or a ramp wraps halfway
 * through itself, which reads as two bars rather than one colour getting darker. So the
 * cell below is what it takes when there is room, and the ramp **shrinks** rather than
 * wrapping when there is not: 32 at `md` on a 390-point screen, 31 on a 375. That is what
 * lets the number be the size the palette deserves instead of the size the smallest phone
 * allows.
 *
 * The chip is smaller than the cell and not by a ratio: it sits inside a field beside a
 * line of text, so it follows the field's own scale rather than the grid's.
 */
type SizeStep = {
  /** What one cell takes when the row has room for it. It gives before the row does. */
  cell: number
  /** The chip on the trigger. */
  chip: number
  /**
   * The dialog's own inset, under the `Dialog`'s five steps. A panel of colour wants less
   * chrome than a panel of prose, and every point taken off it is a point of ramp.
   */
  pad: number
  /** Between a group's name and its ramp. */
  labelGap: number
  /** Between two ramps — the only air in the grid, and what keeps them apart. */
  stackGap: number
  /** The hue's name above its row. */
  label: FontSizeKey
}

const SIZES: Record<ColorPickerSize, SizeStep> = {
  xs: { cell: 6, chip: 4, pad: 2, labelGap: 1, stackGap: 1.5, label: 'xs' },
  sm: { cell: 7, chip: 5, pad: 2.5, labelGap: 1.25, stackGap: 1.5, label: 'xs' },
  md: { cell: 8, chip: 5, pad: 3, labelGap: 1.5, stackGap: 2, label: 'sm' },
  // The label holds at `sm`: a hue's name is a caption beside a bar rather than body copy,
  // and letting the type grow here would take the width straight off the colour.
  lg: { cell: 9, chip: 6, pad: 3.5, labelGap: 1.75, stackGap: 2, label: 'sm' },
}

/**
 * The label column, as a multiple of the label's own type.
 *
 * **A fixed width, and that is the whole point of it**: with the name in the flow the ramps
 * would each start where their own name ended, and eighteen bars would step in and out of
 * the column by the length of the word beside them. Four ems clears the longest hue in the
 * palette — "Fuchsia", seven characters at roughly 0.55em each — and a name longer than
 * that truncates rather than pushing its bar out of line.
 */
const LABEL_WIDTH = 4

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
  const { cell, chip, pad, labelGap, stackGap, label } = step

  return (theme: XAUITheme): SlotStyles<ColorPickerSlot> => {
    const side = theme.spacing(cell)
    const chipSide = theme.spacing(chip)

    return {
      content: { padding: theme.spacing(pad) },
      preview: {
        width: chipSide,
        height: chipSide,
        borderRadius: theme.radius.sm,
      },
      grid: { gap: theme.spacing(stackGap) },
      group: { gap: theme.spacing(labelGap) },
      groupLabel: {
        width: theme.fontSizes[label] * LABEL_WIDTH,
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
      // A basis rather than a width, and square whatever it ends up: `aspectRatio` takes
      // the height off the width the row actually granted.
      swatch: { flexBasis: side, flexGrow: 0, flexShrink: 1, aspectRatio: 1 },
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
    // A row, so the name reads beside the ramp and the eighteen of them stack in half the
    // height. Centred on the cross axis: a caption level with the bar it names.
    group: { flexDirection: 'row', alignItems: 'center' },
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
      // No `gap`: the cells of one ramp touch. What separates two ramps is `grid`'s.
      //
      // No `flexWrap` either, and no `flexGrow`: the bar is as wide as its cells want to be
      // and shrinks with them when the row is narrower than that. Wrapping would break a
      // ramp in half and growing would leave a hairline around empty ground on a group of
      // four swatches.
      flexShrink: 1,
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

    /**
     * Every colour touching every other, with nothing named.
     *
     * Declared after `size` so it overrides what the cell chose, and it is one axis rather
     * than two props because the two halves are the same decision: the names were the only
     * thing holding the rows apart, so dropping them is what lets the block close up. The
     * width they were taking goes back to the colour — the cells **grow** here where they
     * only shrink in a ramp, so eight of them divide the whole row instead of stopping at
     * their basis, which is what makes a mosaic cell half again the size.
     *
     * The hairline moves with the shape it describes. Around each ramp it would double into
     * a two-point line between every pair of rows, so in a mosaic it is the block's own
     * edge — and the block fills the row, which is what makes a full-width border right
     * here and wrong in a ramp.
     */
    layout: {
      ramps: () => ({}),
      mosaic: theme => ({
        grid: {
          gap: 0,
          overflow: 'hidden',
          borderWidth: theme.borderWidth.default,
          borderColor: theme.colors.border,
        },
        swatches: { flexGrow: 1, borderWidth: 0 },
        swatch: { flexGrow: 1 },
      }),
    },

    /** Declared last, so it overrides the corner the block, the bar and the chip chose. */
    radius: radiusAxis('grid', 'swatches', 'preview'),
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

  // `variant` is named even though the table has one entry: without it the selection
  // resolves to `undefined`, `paint` is handed an empty set of colours, and the ring's
  // `borderColor` comes out `undefined` — so the chosen swatch is drawn with no ring at
  // all. `createRecipe` warns about exactly this now.
  defaultVariants: { variant: 'default', size: 'md', layout: 'ramps' },
})
