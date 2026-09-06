import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { chartPalette } from '../../utils/chart-palette'
import { chartRecipe } from './chart.recipe'
import type { ChartInk, ChartSize, ChartVariant } from './chart.type'

type ChartInkArgs = {
  variant: ChartVariant | undefined
  size: ChartSize
  color: string | undefined
  isDisabled: boolean
  /** How many series there are. The palette is walked to exactly that length. */
  count: number
}

/**
 * The resolved values the plot paints with, and the palette its series wear.
 *
 * **SVG paints by prop, not by style**, so a chart cannot hand a resolved `StyleSheet` id
 * down the way every other component does — it needs the strings and the numbers. This is
 * where R5 lands for a chart: the recipe still owns every value, and this reads them back
 * off it **once at the root** rather than letting each series resolve its own.
 *
 * The palette is walked out of the variant's ink, or out of `color` when a caller gave one,
 * so a chart's second series is a shade of its first rather than a colour from a list
 * nobody chose. `chartPalette` says why a ramp and not a wheel.
 */
export function useChartInk({
  variant,
  size,
  color,
  isDisabled,
  count,
}: ChartInkArgs): {
  styles: ReturnType<typeof chartRecipe.resolve>
  ink: ChartInk
  colors: string[]
} {
  const theme = useXAUITheme()

  const selection = { variant, size }
  const styles = chartRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const tint = color ? chartRecipe.tint({ theme, color, selection }) : undefined

  return useMemo(() => {
    const root = StyleSheet.flatten<TextStyle>([styles.root, tint?.root])
    const label = StyleSheet.flatten<TextStyle>([styles.label])
    const grid = StyleSheet.flatten([styles.grid])
    const axis = StyleSheet.flatten([styles.axis])

    const seed = typeof root.color === 'string' ? root.color : theme.colors.accent

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
            : theme.colors.separator,
        axisColor:
          typeof axis.backgroundColor === 'string'
            ? axis.backgroundColor
            : theme.colors.border,
        labelStyle: styles.label,
      },
    }
  }, [styles, tint, theme, count])
}
