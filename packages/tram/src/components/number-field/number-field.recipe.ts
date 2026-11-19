import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize } from '../../theme/tram-tokens'
import type { NumberFieldSlot } from './number-field.type'

const SLOTS = [
  'group',
  'groupField',
  'step',
  'press',
  'rule',
  'ruleStart',
  'ruleEnd',
  'glyph',
  'glyphSpent',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** The `TextField`'s line — the `Button`'s 2 — for the box and for the bars of the marks. */
const LINE_WIDTH = 2

/**
 * A stepper's cell and the bar its mark is drawn with, per size. The cell is nearly as
 * wide as the box is tall, so the pair reads as two square keys at the ends of the value;
 * the bar is the `CloseButton`'s cross, unrotated.
 */
export const NUMBER_FIELD_GEOMETRY: Record<TramSize, { cell: number; bar: number }> =
  {
    sm: { cell: 36, bar: 12 },
    md: { cell: 44, bar: 14 },
    lg: { cell: 52, bar: 16 },
  }

function sizeAxis(size: TramSize) {
  const { cell, bar } = NUMBER_FIELD_GEOMETRY[size]

  return (theme: XAUITheme): SlotStyles<NumberFieldSlot> => ({
    // The field's own height, less the box's line: the box is the control's height.
    groupField: { minHeight: theme.controlHeights[size] - LINE_WIDTH * 2 },
    step: { width: cell },
    glyph: { width: bar },
  })
}

function cornerAxis(): Record<RadiusKey, StyleFn<NumberFieldSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<NumberFieldSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      group: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/**
 * The box and its steppers. Everything the field itself wears — the type, the label, the
 * help, the error — is the `TextField`'s recipe, resolved on the root below; inside the box
 * the field gives up its line, which the box draws around the three of them.
 *
 * The value sits centred in tabular figures, so a number that changes under a press does
 * not shift sideways. The cells are separated from it by a rule in `muted` — softer than
 * the box's ink, so the box stays one control.
 */
export const numberFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    group: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderWidth: LINE_WIDTH,
      borderColor: theme.colors.fieldBorder,
      borderRadius: boxCornerFor('lg', theme.radius),
      backgroundColor: theme.colors.fieldBackground,
      overflow: 'hidden',
    },
    groupField: {
      flex: 1,
      minWidth: 0,
      // The box draws the line; a written `borderColor` also tells the field's own
      // animated line to step aside.
      borderWidth: 0,
      borderColor: theme.colors.fieldBackground,
      borderRadius: 0,
      paddingHorizontal: theme.spacing(2),
      textAlign: 'center',
      fontVariant: ['tabular-nums'],
    },
    step: { alignSelf: 'stretch' },
    press: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    rule: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: LINE_WIDTH,
      backgroundColor: theme.colors.muted,
    },
    // The decrement's rule is on its trailing side, the increment's on its leading one:
    // both face the value.
    ruleStart: { end: 0 },
    ruleEnd: { start: 0 },
    // Absolute, because the plus is this bar and a second one a quarter turn from it.
    glyph: {
      position: 'absolute',
      height: LINE_WIDTH,
      backgroundColor: theme.colors.foreground,
    },
    // A stepper with nowhere left to go: out, in grey. Not a state on the root — the two
    // run out at different ends of the range.
    glyphSpent: {
      backgroundColor: theme.colors.muted,
      opacity: theme.opacity.disabled,
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
    radius: cornerAxis(),
  },

  states: {
    /** The box grey with the field, its marks grey and out. */
    disabled: theme => ({
      group: { borderColor: theme.colors.muted },
      glyph: {
        backgroundColor: theme.colors.muted,
        opacity: theme.opacity.disabled,
      },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})
