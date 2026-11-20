import { createContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type { ColorPickerContextValue } from './color-picker.type'

/**
 * R10 — `useColorPicker` is exported so a third party can write its own slot against the
 * chosen colour and the resolved styles the built-in ones read: a hex field beside the
 * grid, a row of recent colours. Outside a `<ColorPicker>` it throws by name.
 */
export const [ColorPickerProvider, useColorPicker] =
  createSlotContext<ColorPickerContextValue>('Tram.ColorPicker')

/**
 * A swatch's turn in the page's cascade, handed down by its `Group`. Outside one it is the
 * first: a swatch written alone arrives with the page.
 */
export const SwatchRankContext = createContext(0)
