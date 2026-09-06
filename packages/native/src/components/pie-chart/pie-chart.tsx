import { useMemo } from 'react'
import { View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { arcPath } from '../../utils/chart-path'
import { useChartInk } from '../chart'
import type { ChartDatum } from '../chart'
import { DIAMETERS, pieChartRecipe } from './pie-chart.recipe'
import type { PieChartProps } from './pie-chart.type'

const DEFAULT_INNER_RADIUS = 0.62
const DEFAULT_GAP = 1.5
const FULL_TURN = Math.PI * 2

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
  const { colors } = useChartInk({
    variant,
    size,
    color,
    isDisabled,
    count: data.length,
  })

  const styles = pieChartRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const diameter = DIAMETERS[size]

  const slices = useMemo(() => {
    const values = data.map(row => {
      const value = Number(row[valueKey])
      // A negative share has no meaning in a pie — it is a slice of less than nothing —
      // and clamping is what keeps one from eating the ring in the other direction.
      return Number.isFinite(value) && value > 0 ? value : 0
    })
    const total = values.reduce((sum, value) => sum + value, 0)
    if (total === 0) return []

    const radius = diameter / 2
    const inner = radius * Math.min(Math.max(innerRadius, 0), 0.95)
    // Half the gap at either end of every slice, so the ring loses `gap` between each pair
    // and the same amount at the seam where the last one meets the first.
    const half = (Math.min(Math.max(gap, 0), 20) * Math.PI) / 180 / 2

    let angle = 0

    return values.map((value, index) => {
      const sweep = (value / total) * FULL_TURN
      const start = angle
      angle += sweep

      // A slice thinner than the gap would be drawn inside out. It keeps a hairline
      // instead, because a row with a real value should not disappear.
      const inset = Math.min(half, sweep / 2 - 1e-4)

      return {
        key: String(data[index][labelKey] ?? index),
        color: colors[index] ?? colors[0],
        d: arcPath({
          cx: radius,
          cy: radius,
          outerRadius: radius,
          innerRadius: inner,
          startAngle: start + inset,
          endAngle: start + sweep - inset,
        }),
      }
    })
  }, [colors, data, diameter, gap, innerRadius, labelKey, valueKey])

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
