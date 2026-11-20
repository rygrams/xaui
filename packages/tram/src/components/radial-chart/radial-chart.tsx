import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import { View } from 'react-native'
import { Circle, Svg } from 'react-native-svg'
import { radialRings, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useFigureInk } from '../chart'
import type { ChartDatum } from '../chart'
import { RADIAL_GEOMETRY, radialChartRecipe } from './radial-chart.recipe'
import { radialFractions } from './radial-chart.utils'
import type { RadialChartProps } from './radial-chart.type'

/** In proportion at every size, which a gap written in points would not be. */
const DEFAULT_GAP_RATIO = 0.5

/**
 * Several quantities, each as far round its own ring as it has got — the Native
 * `RadialChart`'s API, drawn in Metro: rings with **cut ends**, on a track of the
 * `Skeleton`'s grey.
 *
 * ```tsx
 * <RadialChart
 *   data={[
 *     { label: 'calories', value: 1623, target: 2000 },
 *     { label: 'pas', value: 5400, target: 10000 },
 *   ]}
 *   labelKey="label"
 *   valueKey="value"
 *   maxKey="target"
 * />
 * ```
 *
 * A ring is not a slice: each is a quantity against a target of its own. The first row is
 * the outermost ring; when the rings ask for more room than the box has, they thin
 * (Native's `radialRings`).
 */
const RadialChartBase = forwardRef(function RadialChart<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
>(
  {
    data,
    labelKey,
    valueKey,
    maxKey,
    maxValue,
    accent,
    size,
    color,
    thickness,
    gap,
    hasTrack = true,
    children,
    isDisabled = false,
    style,
    ...props
  }: RadialChartProps<Data, LK, VK, MK>,
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
    count: data.length,
  })

  const styles = radialChartRecipe.resolve({
    theme,
    selection: { size: resolvedSize },
    states: { disabled: isDisabled },
  })

  const { diameter, thickness: step } = RADIAL_GEOMETRY[resolvedSize]

  const arcs = useMemo(() => {
    const stroke = thickness ?? step
    const { strokeWidth, rings } = radialRings({
      diameter,
      count: data.length,
      thickness: stroke,
      gap: gap ?? stroke * DEFAULT_GAP_RATIO,
    })
    const fractions = radialFractions({
      values: data.map(row => Number(row[valueKey])),
      targets:
        maxKey === undefined ? undefined : data.map(row => Number(row[maxKey])),
      maxValue,
    })

    return rings.map((ring, index) => ({
      key: `${String(data[index][labelKey] ?? '')}-${index}`,
      color: colors[index] ?? colors[0],
      radius: ring.radius,
      circumference: ring.circumference,
      offset: ring.circumference * (1 - fractions[index]),
      fraction: fractions[index],
      strokeWidth,
    }))
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
    <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
      <View style={styles.canvas}>
        <Svg width={diameter} height={diameter}>
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

          {arcs.map(arc =>
            // An empty ring draws no arc: a dash of nothing is still a sliver on some
            // renderers.
            arc.fraction <= 0 ? null : (
              <Circle
                key={arc.key}
                cx={centre}
                cy={centre}
                r={arc.radius}
                stroke={arc.color}
                strokeWidth={arc.strokeWidth}
                strokeDasharray={arc.circumference}
                strokeDashoffset={arc.offset}
                strokeLinecap="butt"
                fill="none"
              />
            )
          )}
        </Svg>
      </View>

      {children === undefined ? null : <View style={styles.center}>{children}</View>}
    </View>
  )
})

RadialChartBase.displayName = 'XAUI.Tram.RadialChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const RadialChart = RadialChartBase as <
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
  MK extends keyof Data & string,
>(
  props: RadialChartProps<Data, LK, VK, MK> & { ref?: Ref<View> }
) => ReactElement
