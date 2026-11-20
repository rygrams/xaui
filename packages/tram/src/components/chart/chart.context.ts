import { createContext, useContext } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { TramAccentName } from '../../theme/tram-tokens'
import type { ChartSize } from './chart.type'

/**
 * The resolved styles the frame's slots wear, plus the appearance a figure inside it takes
 * when it names none of its own. The appearance keys are defaults, not styles: a figure
 * can be given an `accent` the frame did not choose.
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
  /** The square of a legend entry — Native's name for its dot. */
  legendDotStyle: StyleProp<ViewStyle>
  legendLabelStyle: StyleProp<TextStyle>
  /**
   * The palette the figure inside is drawing with, so a legend can print it. Walked to
   * `seriesCount`; read by a legend only when that was given.
   */
  colors: string[]
  /** What the frame was told; `0` when unset, and a legend then walks its own length. */
  seriesCount: number
  accent: TramAccentName | undefined
  size: ChartSize | undefined
  color: string | undefined
  isDisabled: boolean
}

const ChartContext = createContext<ChartFrameContextValue | null>(null)
ChartContext.displayName = 'XAUI.Tram.Chart.Context'

export const ChartProvider = ChartContext.Provider

/** The frame's resolved styles and its palette, for a header or a legend of your own. */
export function useChart(): ChartFrameContextValue {
  const value = useContext(ChartContext)

  if (value === null) {
    throw new Error(
      'XAUI Tram: useChart must be called inside <Chart>. It reads the styles and the ' +
        'palette that frame resolved, so it can only be called under one.'
    )
  }

  return value
}

/**
 * The same context, read by a figure that may not be in a frame at all — a figure on its
 * own is a complete use, so its absence is not an error.
 */
export function useOptionalChart(): ChartFrameContextValue | null {
  return useContext(ChartContext)
}
