import { useMemo } from 'react'
import { View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { pieSlices } from '../../system/chart/chart-pie'
import { useChartInk, useOptionalChart } from '../chart'
import type { ChartDatum } from '../chart'
import { DIAMETERS, pieChartRecipe } from './pie-chart.recipe'
import type { PieChartProps } from './pie-chart.type'

const DEFAULT_INNER_RADIUS = 0.62
const DEFAULT_GAP = 1.5

/**
 * The whole, and its parts.
 *
 * ```tsx
 * <PieChart data={rows} labelKey="device" valueKey="count">
 *   <Text>4,5K</Text>
 *   <Text>Appareils</Text>
 * </PieChart>
 *
 * <PieChart data={rows} labelKey="browser" valueKey="share" innerRadius={0} />
 * ```
 *
 * **`innerRadius` is a fraction, not points.** The hole has to stay in proportion at every
 * size; a caller who writes 40 points gets a donut on a phone and a pie on a tablet. `0` is
 * the pie, and the default is the donut.
 *
 * **The middle is React Native, not SVG.** What sits in the hole is `children` in a `View`
 * laid over the canvas — a `Text`, a number, an icon, taking the theme's font and its
 * scaling like everything else on the screen. It takes no touches, so a press still reaches
 * the slice under it.
 *
 * **The colours are the cartesian family's**, walked out of the same variant by the same
 * palette: a donut beside a bar chart on one dashboard should be the same blue in the same
 * order, which is what asking the caller's data for a colour would have given away.
 *
 * **The gap is drawn, not stroked.** Each slice is shortened by half the gap at either end,
 * so the ring's ground shows through between them — a stroke would sit on top of the slice
 * and read as an outline.
 */
export function PieChart<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
>({
  data,
  labelKey,
  valueKey,
  variant,
  size = 'md',
  color,
  innerRadius = DEFAULT_INNER_RADIUS,
  gap = DEFAULT_GAP,
  children,
  isDisabled = false,
  style,
  ...props
}: PieChartProps<Data, LK, VK>) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const frame = useOptionalChart()
  const { colors } = useChartInk({
    variant: variant ?? frame?.variant,
    size,
    color: color ?? frame?.color,
    isDisabled: isDisabled || (frame?.isDisabled ?? false),
    count: data.length,
  })

  const styles = pieChartRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const diameter = DIAMETERS[size]

  const slices = useMemo(
    () =>
      pieSlices({
        values: data.map(row => Number(row[valueKey])),
        diameter,
        innerRadius,
        gap,
      }).map((d, index) => ({
        key: String(data[index][labelKey] ?? index),
        color: colors[index] ?? colors[0],
        d,
      })),
    [colors, data, diameter, gap, innerRadius, labelKey, valueKey]
  )

  return (
    <View {...rest} style={[styles.root, styleProps, style]}>
      <Svg width={diameter} height={diameter}>
        {slices.map(slice => (
          <Path key={slice.key} d={slice.d} fill={slice.color} fillRule="evenodd" />
        ))}
      </Svg>

      {children === undefined ? null : <View style={styles.center}>{children}</View>}
    </View>
  )
}

PieChart.displayName = 'XAUI.PieChart'
