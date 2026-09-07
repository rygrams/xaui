import { createContext, useContext } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ChartSize, ChartVariant } from './chart.type'

/**
 * R5 — the resolved styles the frame's slots wear, plus the appearance a figure inside it
 * takes when it names none of its own.
 *
 * The appearance keys are **defaults, not resolved styles**: a figure resolves its own
 * recipe because it can be given a `variant` the frame did not choose, and a frame that
 * published styles would have to resolve them a second time per figure anyway. The `Radio`
 * and its group, again.
 */
export type ChartFrameContextValue = {
  headerStyle: StyleProp<ViewStyle>
  headingStyle: StyleProp<ViewStyle>
  footerStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  valueStyle: StyleProp<TextStyle>
  legendStyle: StyleProp<ViewStyle>
  legendItemStyle: StyleProp<ViewStyle>
  legendDotStyle: StyleProp<ViewStyle>
  legendLabelStyle: StyleProp<TextStyle>
  /** The palette the figure inside is drawing with, so a legend can print it. */
  colors: string[]
  variant: ChartVariant | undefined
  size: ChartSize | undefined
  color: string | undefined
  isDisabled: boolean
}

const ChartContext = createContext<ChartFrameContextValue | null>(null)
ChartContext.displayName = 'XAUI.Chart.Context'

export const ChartProvider = ChartContext.Provider

/**
 * R10 — the frame's resolved styles and its palette, for a header or a legend of your own.
 *
 * Strict, and named: a hook that asks for the frame is asking for its palette, and outside
 * one there is none.
 */
export function useChart(): ChartFrameContextValue {
  const value = useContext(ChartContext)

  if (value === null) {
    throw new Error(
      'XAUI: useChart must be called inside <Chart>. It reads the styles and the palette ' +
        'that frame resolved, so it can only be called under one.'
    )
  }

  return value
}

/**
 * The same context, read by a figure that may not be in a frame at all — a chart on its own
 * is the shape every one of the five shipped as, and it stays supported.
 *
 * Written by hand rather than through `createSlotContext` for exactly that: this is a
 * context whose absence is a valid arrangement rather than a misplaced slot, so the throwing
 * read and the optional one are two functions instead of one.
 */
export function useOptionalChart(): ChartFrameContextValue | null {
  return useContext(ChartContext)
}
