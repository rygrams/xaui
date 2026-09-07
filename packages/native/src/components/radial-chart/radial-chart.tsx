import { useMemo } from 'react'
import { View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { progressFraction } from '../../utils/progress'
import { useChartInk, useOptionalChart } from '../chart'
import type { ChartDatum } from '../chart'
import { SIZES, radialChartRecipe } from './radial-chart.recipe'
import { radialRings } from './radial-chart.utils'
import type { RadialChartProps } from './radial-chart.type'

/** In proportion at every size, which a gap written in points would not be. */
const DEFAULT_GAP_RATIO = 0.5

/**
 * Several quantities, each as far round its own ring as it has got.
 *
 * ```tsx
 * <RadialChart
 *   data={[
 *     { label: 'Calories', value: 1623, target: 2000 },
 *     { label: 'Pas', value: 5400, target: 10000 },
 *     { label: 'Exercice', value: 25, target: 120 },
 *   ]}
 *   labelKey="label"
 *   valueKey="value"
 *   maxKey="target"
 * />
 *
 * <RadialChart data={rows} labelKey="source" valueKey="kcal" maxValue={2000}>
 *   <Text>Calories</Text>
 *   <Text>700 kcal</Text>
 * </RadialChart>
 * ```
 *
 * **A ring is not a slice.** The `PieChart` splits one quantity into shares that add up to
 * the whole; this draws several quantities that have nothing to do with each other, each
 * against a target of its own. Calories, steps and minutes do not sum to anything, and a
 * donut of them would be drawing a total nobody measured.
 *
 * **The first row is the outermost ring**, and the palette walks the rows in that order —
 * so the ring that catches the eye first is the row written first.
 *
 * **Each ring has its own target.** `maxKey` is the column that holds it; `maxValue` is one
 * target for all of them; with neither, it is the largest value in the data, so the biggest
 * ring closes and the rest are read against it.
 *
 * **The track is the rest of the distance.** Without it a ring at a fifth is an arc
 * floating in space with nothing saying how far it had to go, which is the one thing this
 * figure exists to say.
 *
 * **The middle is React Native, not SVG** — the `PieChart`'s arrangement, for the
 * `PieChart`'s reason: what sits in the hole is `children` in a `View` laid over the
 * canvas, taking the theme's font and its scaling like everything else on the screen.
 *
 * **The colours are the cartesian family's**, walked out of the same variant by the same
 * palette, so a radial chart beside a bar chart on one dashboard is the same blue in the
 * same order. Inside a `<Chart>` it takes the frame's — and the frame's `seriesCount` is
 * what walks a `Chart.Legend`'s dots to the same length.
 */
export function RadialChart<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
>({
  data,
  labelKey,
  valueKey,
  maxKey,
  maxValue,
  variant,
  size = 'md',
  color,
  thickness,
  gap,
  hasTrack = true,
  children,
  isDisabled = false,
  style,
  ...props
}: RadialChartProps<Data, LK, VK, MK>) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const frame = useOptionalChart()
  const { ink, colors } = useChartInk({
    variant: variant ?? frame?.variant,
    size,
    color: color ?? frame?.color,
    isDisabled: isDisabled || (frame?.isDisabled ?? false),
    count: data.length,
  })

  const styles = radialChartRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const { diameter, thickness: step } = SIZES[size]

  const arcs = useMemo(() => {
    const stroke = thickness ?? step
    const { strokeWidth, rings } = radialRings({
      diameter,
      count: data.length,
      thickness: stroke,
      gap: gap ?? stroke * DEFAULT_GAP_RATIO,
    })

    const values = data.map(row => {
      const value = Number(row[valueKey])
      // A ring runs from nothing to its target; a negative reading has no arc on it, and
      // letting one through would draw a dash offset longer than the path.
      return Number.isFinite(value) && value > 0 ? value : 0
    })
    // The shared ceiling, which a row's own `maxKey` then overrides. `Math.max` of an empty
    // list is `-Infinity`, so the zero is what keeps an empty chart drawing its tracks.
    const ceiling = maxValue ?? Math.max(...values, 0)

    return rings.map((ring, index) => {
      const row = data[index]
      const target = maxKey === undefined ? ceiling : Number(row[maxKey])
      const fraction = progressFraction(values[index], 0, target)

      return {
        key: String(row[labelKey] ?? index),
        color: colors[index] ?? colors[0],
        radius: ring.radius,
        circumference: ring.circumference,
        // A dash offset rather than an arc rebuilt per value, which is what lets a ring be
        // one path with one rounded cap at each end.
        offset: ring.circumference * (1 - fraction),
        strokeWidth,
      }
    })
  }, [
    colors,
    data,
    diameter,
    gap,
    labelKey,
    maxKey,
    maxValue,
    step,
    thickness,
    valueKey,
  ])

  const centre = diameter / 2

  return (
    <View {...rest} style={[styles.root, styleProps, style]}>
      <View style={styles.canvas}>
        <Svg width={diameter} height={diameter}>
          {/* Every track first, so a ring's rounded cap is never cut by the ground of the
              one inside it. */}
          {hasTrack
            ? arcs.map(arc => (
                <Circle
                  key={`${arc.key}-track`}
                  cx={centre}
                  cy={centre}
                  r={arc.radius}
                  stroke={ink.gridColor}
                  strokeWidth={arc.strokeWidth}
                  fill="none"
                />
              ))
            : null}

          {arcs.map(arc => (
            <Circle
              key={arc.key}
              cx={centre}
              cy={centre}
              r={arc.radius}
              stroke={arc.color}
              strokeWidth={arc.strokeWidth}
              strokeDasharray={arc.circumference}
              strokeDashoffset={arc.offset}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </Svg>
      </View>

      {children === undefined ? null : <View style={styles.center}>{children}</View>}
    </View>
  )
}

RadialChart.displayName = 'XAUI.RadialChart'
