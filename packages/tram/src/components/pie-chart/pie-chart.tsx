import { forwardRef, useMemo } from 'react'
import type { ForwardedRef, ReactElement, Ref } from 'react'
import { View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { useFigureInk } from '../chart'
import type { ChartDatum } from '../chart'
import { PIE_DIAMETERS, pieChartRecipe } from './pie-chart.recipe'
import { drawnSlices } from './pie-chart.utils'
import type { PieChartProps } from './pie-chart.type'

const DEFAULT_INNER_RADIUS = 0.62
const DEFAULT_GAP = 1.5

/**
 * The whole, and its parts — the Native `PieChart`'s API and geometry, in Metro flat
 * colour: shades of one accent, the ground showing through a drawn gap between slices,
 * and what sits in the hole in React Native.
 *
 * ```tsx
 * <PieChart data={rows} labelKey="device" valueKey="sessions">
 *   <Typography variant="section">4,5 k</Typography>
 * </PieChart>
 * ```
 */
const PieChartBase = forwardRef(function PieChart<
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
>(
  {
    data,
    labelKey,
    valueKey,
    accent,
    size,
    color,
    innerRadius = DEFAULT_INNER_RADIUS,
    gap = DEFAULT_GAP,
    children,
    isDisabled = false,
    style,
    ...props
  }: PieChartProps<Data, LK, VK>,
  ref: ForwardedRef<View>
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const ink = useFigureInk({
    accent,
    size,
    color,
    isDisabled,
    count: data.length,
  })

  const styles = pieChartRecipe.resolve({
    theme,
    selection: { size: ink.size },
    states: { disabled: isDisabled },
  })

  const diameter = PIE_DIAMETERS[ink.size]
  const { colors } = ink

  const slices = useMemo(
    () =>
      drawnSlices({
        values: data.map(row => Number(row[valueKey])),
        diameter,
        innerRadius,
        gap,
      }).map((d, index) => ({
        key: `${String(data[index][labelKey] ?? '')}-${index}`,
        color: colors[index] ?? colors[0],
        d,
      })),
    [colors, data, diameter, gap, innerRadius, labelKey, valueKey]
  )

  return (
    <View ref={ref} {...rest} style={[styles.root, styleProps, style]}>
      <Svg width={diameter} height={diameter}>
        {slices.map(slice =>
          slice.d === '' ? null : (
            <Path
              key={slice.key}
              d={slice.d}
              fill={slice.color}
              fillRule="evenodd"
            />
          )
        )}
      </Svg>

      {children === undefined ? null : <View style={styles.center}>{children}</View>}
    </View>
  )
})

PieChartBase.displayName = 'XAUI.Tram.PieChart'

/** Typed by the caller's rows: `forwardRef` alone would erase the generics. */
export const PieChart = PieChartBase as <
  Data extends ChartDatum,
  LK extends keyof Data & string,
  VK extends keyof Data & string,
>(
  props: PieChartProps<Data, LK, VK> & { ref?: Ref<View> }
) => ReactElement
