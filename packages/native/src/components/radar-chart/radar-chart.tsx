import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { Circle, Line, Path, Svg } from 'react-native-svg'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { radarWeb } from '../../system/chart/chart-radar'
import { useChartInk, useOptionalChart } from '../chart'
import type { ChartDatum } from '../chart'
import { DIAMETERS, radarChartRecipe } from './radar-chart.recipe'
import type { RadarChartProps } from './radar-chart.type'

const DEFAULT_LEVELS = 4
const DEFAULT_FILL = 0.18
const POINT_RADIUS = 3

/**
 * Several quantities at once, each on its own axis.
 *
 * ```tsx
 * <RadarChart
 *   data={[
 *     { skill: 'Vitesse', alice: 80, bob: 55 },
 *     { skill: 'Endurance', alice: 65, bob: 90 },
 *     { skill: 'Précision', alice: 92, bob: 70 },
 *   ]}
 *   axisKey="skill"
 *   yKeys={['alice', 'bob']}
 * />
 * ```
 *
 * **The data is transposed**, and it is the one thing to get right at the call site: a row
 * here is an **axis**, not a reading along one. That is what a radar is — several quantities
 * compared across the same set of measures — and reading it the other way round produces a
 * chart with one axis per month.
 *
 * **The vertices are the axes, so the edges are always straight.** A curve between two of
 * them would draw a reading on an axis that does not exist, which is why nothing here takes
 * a `curve`.
 *
 * **`maxValue` is what makes two radars comparable.** Unset, the web's edge is the highest
 * reading in this chart, so a shape says how the measures compare *within* it and nothing
 * about any other. A dashboard of radars should give all of them the same top.
 *
 * The palette and the variants are the cartesian family's, so a radar beside a line chart is
 * the same colour in the same order.
 */
export function RadarChart<
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
>({
  data,
  axisKey,
  yKeys,
  variant,
  size = 'md',
  color,
  levels = DEFAULT_LEVELS,
  maxValue,
  hasLabels = true,
  fillOpacity = DEFAULT_FILL,
  strokeWidth = 2,
  hasPoints = false,
  isDisabled = false,
  style,
  ...props
}: RadarChartProps<Data, AK, YK>) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const frame = useOptionalChart()
  const { ink, colors } = useChartInk({
    variant: variant ?? frame?.variant,
    size,
    color: color ?? frame?.color,
    isDisabled: isDisabled || (frame?.isDisabled ?? false),
    count: yKeys.length,
  })

  const styles = radarChartRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })

  const box = DIAMETERS[size].box

  const web = useMemo(() => {
    const geometry = radarWeb({
      axes: data.map(row => String(row[axisKey] ?? '')),
      series: yKeys.map(key => data.map(row => Number(row[key]))),
      box,
      hasLabels,
      levels,
      maxValue,
    })
    if (geometry === null) return null

    return {
      ...geometry,
      series: geometry.series.map((one, index) => ({
        ...one,
        key: yKeys[index],
        color: colors[index] ?? colors[0],
      })),
    }
  }, [axisKey, box, colors, data, hasLabels, levels, maxValue, yKeys])

  return (
    <View {...rest} style={[styles.root, styleProps, style]}>
      {web === null ? null : (
        <>
          <Svg width={box} height={box}>
            {/* The web, outermost first, so a ring never covers the one outside it. */}
            {web.rings.map((ring, level) => (
              <Path
                key={level}
                d={ring}
                fill="none"
                stroke={ink.gridColor}
                strokeWidth={1}
              />
            ))}

            {web.spokes.map(spoke => (
              <Line
                key={spoke.label}
                x1={web.center.x}
                y1={web.center.y}
                x2={spoke.end.x}
                y2={spoke.end.y}
                stroke={ink.gridColor}
                strokeWidth={1}
              />
            ))}

            {web.series.map(one => (
              <Path
                key={one.key}
                d={one.d}
                fill={one.color}
                // Its own prop rather than an alpha channel in the colour, for the reason
                // the `AreaChart`'s gradient gives: the native renderer drops the alpha.
                fillOpacity={fillOpacity}
                stroke={one.color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            ))}

            {hasPoints
              ? web.series.flatMap(one =>
                  one.points.map((point, index) => (
                    <Circle
                      key={`${one.key}-${index}`}
                      cx={point.x}
                      cy={point.y}
                      r={POINT_RADIUS}
                      fill={one.color}
                    />
                  ))
                )
              : null}
          </Svg>

          {hasLabels
            ? web.spokes.map(spoke => (
                <Text
                  key={spoke.label}
                  numberOfLines={1}
                  style={[
                    {
                      position: 'absolute',
                      // Centred on the point the label belongs to: a fixed box, pulled back
                      // by half of it, is the only placement that works at every angle
                      // without measuring the text.
                      start: spoke.labelAt.x - LABEL_WIDTH / 2,
                      top: spoke.labelAt.y - ink.labelSize * 0.7,
                      width: LABEL_WIDTH,
                      textAlign: 'center',
                      color: ink.labelColor,
                      fontSize: ink.labelSize,
                      fontFamily: theme.fontFamilies.body,
                    },
                  ]}
                >
                  {spoke.label}
                </Text>
              ))
            : null}
        </>
      )}
    </View>
  )
}

RadarChart.displayName = 'XAUI.RadarChart'

/** Wide enough for a word, narrow enough that two neighbours do not meet. */
const LABEL_WIDTH = 64
