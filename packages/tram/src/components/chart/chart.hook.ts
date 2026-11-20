import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { chartPalette } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { flatPaint } from '../../system/flat-paint'
import type { TramAccentName } from '../../theme/tram-tokens'
import { useOptionalChart } from './chart.context'
import { DEFAULT_SIZE, chartRecipe } from './chart.recipe'
import type { ChartInk, ChartSize } from './chart.type'

type ChartInkArgs = {
  accent: TramAccentName | undefined
  size: ChartSize
  color: string | undefined
  isDisabled: boolean
  /** How many series there are. The palette is walked to exactly that length. */
  count: number
}

type ChartInkResult = {
  styles: ReturnType<typeof chartRecipe.resolve>
  ink: ChartInk
  colors: string[]
}

/**
 * The resolved values the plot paints with, and the palette its series wear.
 *
 * SVG paints by prop, not by style, so the recipe's colours are read back off it once
 * here. The palette is Native's engine — shades of one colour — seeded with `color`, the
 * named accent's true colour, or the theme's accent: a mark is a flat fill, never the
 * accent read as ink.
 */
export function useChartInk({
  accent,
  size,
  color,
  isDisabled,
  count,
}: ChartInkArgs): ChartInkResult {
  const theme = useXAUITheme()

  const styles = chartRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })
  const seed = flatPaint({ accent, color }) ?? theme.colors.accent

  return useMemo(() => {
    const label = StyleSheet.flatten(styles.label)
    const grid = StyleSheet.flatten(styles.grid)
    const axis = StyleSheet.flatten(styles.axis)

    return {
      styles,
      colors: chartPalette(seed, count),
      ink: {
        labelColor:
          typeof label.color === 'string' ? label.color : theme.colors.muted,
        labelSize: label.fontSize ?? theme.fontSizes.xs,
        gridColor:
          typeof grid.backgroundColor === 'string'
            ? grid.backgroundColor
            : theme.colors.muted,
        axisColor:
          typeof axis.backgroundColor === 'string'
            ? axis.backgroundColor
            : theme.colors.muted,
      },
    }
  }, [styles, seed, count, theme])
}

/** What a figure names of its own appearance; anything left unset is the frame's. */
type FigureInkArgs = {
  accent: TramAccentName | undefined
  size: ChartSize | undefined
  color: string | undefined
  /** The figure's own. A disabled frame dims itself, so its figures are not dimmed twice. */
  isDisabled: boolean
  count: number
}

/**
 * `useChartInk` for a figure, or a legend, that may sit in a `<Chart>`: the frame's
 * `accent`, `size` and `color` are defaults and the figure's own win. The size is handed
 * back resolved, for the figure's own recipe.
 */
export function useFigureInk({
  accent,
  size,
  color,
  isDisabled,
  count,
}: FigureInkArgs): ChartInkResult & { size: ChartSize } {
  const frame = useOptionalChart()
  const resolvedSize = size ?? frame?.size ?? DEFAULT_SIZE
  const ink = useChartInk({
    accent: accent ?? frame?.accent,
    size: resolvedSize,
    color: color ?? frame?.color,
    isDisabled,
    count,
  })

  return { ...ink, size: resolvedSize }
}
