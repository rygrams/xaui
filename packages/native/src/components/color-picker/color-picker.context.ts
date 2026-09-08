import { createSlotContext } from '../../system/slot'
import type { ColorPickerContextValue } from './color-picker.type'

/**
 * R10 — `useColorPicker` is exported so a third party can write its own slot against the
 * chosen colour and the resolved styles the built-in ones read: a hex field beside the
 * grid, a row of recent colours, a "no colour" cell. Outside a `<ColorPicker>` it throws
 * by name rather than failing three frames later on an undefined style.
 */
export const [ColorPickerProvider, useColorPicker] =
  createSlotContext<ColorPickerContextValue>('ColorPicker')
