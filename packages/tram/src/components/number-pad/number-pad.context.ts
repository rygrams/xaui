import { createSlotContext } from '@xaui/native/system'
import type {
  NumberPadCellContextValue,
  NumberPadContextValue,
} from './number-pad.type'

/**
 * `useNumberPad` is exported so a cell of your own can insert, delete or read the value
 * against the same edits the built-in keys call. Outside a `<NumberPad>` it throws by name.
 */
export const [NumberPadProvider, useNumberPad] =
  createSlotContext<NumberPadContextValue>('Tram.NumberPad')

/** The cell a label or a glyph is inside. */
export const [NumberPadCellProvider, useNumberPadCell] =
  createSlotContext<NumberPadCellContextValue>('Tram.NumberPad.Cell')
