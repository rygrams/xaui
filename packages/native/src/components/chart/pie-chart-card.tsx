import React from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import * as SvgElements from 'react-native-svg'
import { styles } from './chart.style'
import {
  DEFAULT_CHART_BACKGROUND,
  isLegendHorizontal,
  resolveElevationStyles,
} from './chart.shared'
import type { PieChartCardProps } from './chart.type'

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const createSectorPath = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(centerX, centerY, radius, endAngle)
  const end = polarToCartesian(centerX, centerY, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    `M ${centerX} ${centerY}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  data,
  title,
  total,
  showLegend = true,
  legendPosition = 'bottom',
  elevation = 0,
  backgroundColor = DEFAULT_CHART_BACKGROUND,
  textColor = '#ffffff',
  size = 220,
  style,
}) => {
  const normalizedData = React.useMemo(
    () => data.filter(item => item.value > 0),
    [data]
  )
  const totalValue = React.useMemo(
    () => normalizedData.reduce((sum, item) => sum + item.value, 0),
    [normalizedData]
  )

  const chartSize = Math.max(120, size)
  const center = chartSize / 2
  const radius = chartSize * 0.44
  const gapDegrees = 1

  const sectors = React.useMemo(() => {
    if (!normalizedData.length || totalValue <= 0) {
      return []
    }

    let startAngle = 0
    return normalizedData.map((item, index) => {
      const portion = (item.value / totalValue) * 360
      const sweep = Math.max(0, portion - gapDegrees)
      const endAngle = startAngle + sweep
      const path = createSectorPath(center, center, radius, startAngle, endAngle)

      startAngle += portion

      return {
        key: `${item.label}-${index}-sector`,
        color: item.color,
        path,
      }
    })
  }, [center, gapDegrees, normalizedData, radius, totalValue])
  const PathElement = SvgElements.Path as unknown as React.ComponentType<{
    d: string
    fill: string
  }>

  const chart = (
    <View style={[styles.chartWrapper, { width: chartSize, height: chartSize }]}>
      <Svg width={chartSize} height={chartSize}>
        {PathElement
          ? sectors.map(sector => (
              <PathElement key={sector.key} d={sector.path} fill={sector.color} />
            ))
          : sectors.map((sector, index) => (
              <Circle
                key={`${sector.key}-fallback`}
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={Math.max(8, radius - index * 8)}
                fill={sector.color}
              />
            ))}
      </Svg>
    </View>
  )

  const legend = showLegend ? (
    <View
      style={[
        styles.legend,
        isLegendHorizontal(legendPosition) && styles.legendCompact,
      ]}
    >
      {data.map((item, index) => (
        <View style={styles.legendItem} key={`${item.label}-${index}-legend`}>
          <View style={styles.legendLeft}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text
              style={[styles.legendTitle, { color: item.labelColor ?? textColor }]}
            >
              {item.label}
            </Text>
          </View>
          <Text style={[styles.legendValue, { color: textColor }]}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  ) : null

  const content = isLegendHorizontal(legendPosition) ? (
    <View style={styles.pieContentHorizontal}>
      {legendPosition === 'left' && legend}
      {chart}
      {legendPosition === 'right' && legend}
    </View>
  ) : (
    <View style={styles.pieContentVertical}>
      {legendPosition === 'top' && legend}
      {chart}
      {legendPosition === 'bottom' && legend}
    </View>
  )

  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
        resolveElevationStyles(elevation),
        style,
      ]}
    >
      {(title !== undefined || total !== undefined) && (
        <View style={styles.pieHeader}>
          <Text style={[styles.pieHeaderTitle, { color: textColor }]}>
            {title ?? ''}
          </Text>
          <Text style={[styles.pieHeaderTotal, { color: textColor }]}>
            {total ?? ''}
          </Text>
        </View>
      )}
      {content}
    </View>
  )
}
