import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import { Text, View } from 'react-native'
import { Line, Path, Rect, Svg } from 'react-native-svg'
import { radarWeb, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useFigureInk } from '../chart'
import { POINT_SIDE } from '../chart/chart.recipe'
import type { ChartDatum } from '../chart'
import {
  RADAR_BOXES,
  RADAR_LABEL_WIDTH,
  radarChartRecipe,
} from './radar-chart.recipe'
import type { RadarChartProps } from './radar-chart.type'

const DEFAULT_LEVELS = 4
const DEFAULT_FILL = 0.18

/** The web's rings and spokes: lines of 1, the plot's grid. */
const WEB_WIDTH = 1

/**
 * Several quantities at once, each on its own axis — the Native `RadarChart`'s API and
 * geometry (`radarWeb`), drawn in Metro: rings and spokes of 1 in the `Skeleton`'s grey,
 * series polygons with sharp corners, a stroke of 2 and a flat fill at 0.18, names on
 * `caption` around the web.
 *
 * ```tsx
 * <RadarChart data={skills} axisKey="skill" yKeys={['alice', 'bob']} maxValue={100} />
 * ```
 *
 * The data is transposed: a row is an axis. The vertices are the axes, so the edges are
 * always straight.
 */
const RadarChartBase = forwardRef(function RadarChart<
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  {
    data,
    axisKey,
    yKeys,
    accent,
    size,
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
  }: RadarChartProps<Data, AK, YK>,
  ref: ForwardedRef<View>
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const {
    ink,
    colors,
    size: resolvedSize,
  } = useFigureInk({
    accent,
    size,
    color,
    isDisabled,
    count: yKeys.length,
  })

  const styles = radarChartRecipe.resolve({
    theme,
    selection: { size: resolvedSize },
    states: { disabled: isDisabled },
  })

  const box = RADAR_BOXES[resolvedSize]

  const web = useMemo(
    () =>
      radarWeb({
        axes: data.map(row => String(row[axisKey] ?? '')),
        series: yKeys.map(key => data.map(row => Number(row[key]))),
        box,
        hasLabels,
        levels,
        maxValue,
      }),
    [axisKey, box, data, hasLabels, levels, maxValue, yKeys]
  )

  return (
    <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
      {web === null ? null : (
        <>
          <Svg width={box} height={box}>
            {web.rings.map((ring, level) => (
              <Path
                key={level}
                d={ring}
                fill="none"
                stroke={ink.gridColor}
                strokeWidth={WEB_WIDTH}
                strokeLinejoin="miter"
              />
            ))}

            {web.spokes.map((spoke, index) => (
              <Line
                key={index}
                x1={web.center.x}
                y1={web.center.y}
                x2={spoke.end.x}
                y2={spoke.end.y}
                stroke={ink.gridColor}
                strokeWidth={WEB_WIDTH}
              />
            ))}

            {web.series.map((one, index) => (
              <Path
                key={yKeys[index]}
                d={one.d}
                fill={colors[index] ?? colors[0]}
                // Its own prop, not an alpha in the colour: the native renderer drops it.
                fillOpacity={fillOpacity}
                stroke={colors[index] ?? colors[0]}
                strokeWidth={strokeWidth}
                strokeLinejoin="miter"
              />
            ))}

            {hasPoints
              ? web.series.flatMap((one, index) =>
                  one.points.map((point, axis) => (
                    <Rect
                      key={`${yKeys[index]}-${axis}`}
                      x={point.x - POINT_SIDE / 2}
                      y={point.y - POINT_SIDE / 2}
                      width={POINT_SIDE}
                      height={POINT_SIDE}
                      fill={colors[index] ?? colors[0]}
                    />
                  ))
                )
              : null}
          </Svg>

          {hasLabels
            ? web.spokes.map((spoke, index) => (
                <Text
                  key={index}
                  numberOfLines={1}
                  style={[
                    styles.label,
                    {
                      // Centred on its point, in the root's left-to-right frame: a fixed
                      // box pulled back by half of it holds at every angle.
                      start: spoke.labelAt.x - RADAR_LABEL_WIDTH / 2,
                      top: spoke.labelAt.y - ink.labelSize * 0.7,
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
})

RadarChartBase.displayName = 'XAUI.Tram.RadarChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const RadarChart = RadarChartBase as <
  Data extends ChartDatum,
  AK extends keyof Data & string,
  YK extends keyof Data & string,
>(
  props: RadarChartProps<Data, AK, YK> & { ref?: Ref<View> }
) => ReactElement
