import { createSlotContext } from '../../system/slot'
import type {
  NumberPadCellContextValue,
  NumberPadContextValue,
} from './number-pad.type'

/**
 * R10 — `useNumberPad` is exported so a control beside the pad can read the value it is
 * building, and so a caller can write their own cell (a `00` key on a currency pad)
 * against the same `insert` the built-in ones call. Outside a `<NumberPad>` it throws by
 * name.
 */
export const [NumberPadProvider, useNumberPad] =
  createSlotContext<NumberPadContextValue>('NumberPad')

/**
 * Which cell a label or a glyph is inside.
 *
 * It exists so `NumberPad.Icon` needs no prop to know whether it sits on a filled key or in
 * a bare corner — the cell it is in already knows, and the two want different foregrounds:
 * a `primary` pad's digits are `accentForeground`, and a backspace with no ground of its own
 * would take white on white. A `tone` prop would have made that the caller's problem, and
 * the caller cannot see the variant from inside the cell.
 */
export const [NumberPadCellProvider, useNumberPadCell] =
  createSlotContext<NumberPadCellContextValue>('NumberPad.Cell')
