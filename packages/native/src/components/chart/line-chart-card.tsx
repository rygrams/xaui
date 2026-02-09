import React from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import * as SvgElements from 'react-native-svg'
import { styles } from './chart.style'
import {
  abbreviateLabel,
  DEFAULT_CHART_BACKGROUND,
  formatAxisValue,
  resolveElevationStyles,
} from './chart.shared'
import type { LineChartCardProps } from './chart.type'

const buildSmoothPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 2) {
    return ''
  }

  let path = `M ${points[0].x} ${points[0].y}`
  for (let index = 1; index < points.length; index += 1) {
    const prev = points[index - 1]
    const current = points[index]
    const controlX = (prev.x + current.x) / 2
    path += ` C ${controlX} ${prev.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`
  }

  return path
}

const buildDirectPath = (points: Array<{ x: number; y: number }>) => {
  if (!points.length) {
    return ''
  }

  const [first, ...rest] = points
  return rest.reduce(
    (path, point) => `${path} L ${point.x} ${point.y}`,
    `M ${first.x} ${first.y}`
  )
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
  data,
  title,
  elevation = 0,
  backgroundColor = DEFAULT_CHART_BACKGROUND,
  textColor = '#ffffff',
  size = 280,
  showAxes = true,
  showPoints = true,
  lineMode = 'smooth',
  lineColor = '#57C9ED',
  areaColor = 'rgba(87,201,237,0.16)',
  abbreviateXAxisLabels = true,
  xAxisAbbreviationLength = 3,
  style,
}) => {
  const normalizedData = React.useMemo(
    () => data.filter(item => Number.isFinite(item.value)),
    [data]
  )
  const minValue = React.useMemo(() => {
    if (!normalizedData.length) {
      return 0
    }

    return Math.min(...normalizedData.map(item => item.value))
  }, [normalizedData])
  const maxValue = React.useMemo(() => {
    if (!normalizedData.length) {
      return 1
    }

    return Math.max(...normalizedData.map(item => item.value), 1)
  }, [normalizedData])
  const meanValue = React.useMemo(() => {
    if (!normalizedData.length) {
      return 0
    }

    return (
      normalizedData.reduce((sum, item) => sum + item.value, 0) /
      normalizedData.length
    )
  }, [normalizedData])

  const chartWidth = Math.max(190, size)
  const chartHeight = Math.max(130, Math.min(220, Math.round(size * 0.56)))
  const paddingX = Math.max(10, Math.round(size * 0.05))
  const rightPadding = paddingX + 8
  const graphHeight = chartHeight - 10
  const dataRange = Math.max(1, maxValue - minValue)

  const points = React.useMemo(() => {
    if (!normalizedData.length) {
      return []
    }

    const slots = Math.max(normalizedData.length - 1, 1)
    return normalizedData.map((item, index) => {
      const x = paddingX + (index * (chartWidth - paddingX - rightPadding)) / slots
      const ratio = (item.value - minValue) / dataRange
      const y = graphHeight - ratio * graphHeight
      return { x, y }
    })
  }, [chartWidth, dataRange, graphHeight, minValue, normalizedData, paddingX, rightPadding])

  const linePath =
    lineMode === 'smooth' ? buildSmoothPath(points) : buildDirectPath(points)
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${graphHeight} L ${points[0].x} ${graphHeight} Z`
    : ''
  const PathElement = SvgElements.Path as unknown as React.ComponentType<{
    d: string
    fill?: string
    stroke?: string
    strokeWidth?: number
    strokeLinecap?: 'round' | 'square' | 'butt'
    strokeLinejoin?: 'round' | 'bevel' | 'miter'
  }>

  return (
    <View
      style={[
        styles.barCard,
        { backgroundColor },
        resolveElevationStyles(elevation),
        style,
      ]}
    >
      {title !== undefined && (
        <Text style={[styles.barTitle, { color: textColor }]}>{title}</Text>
      )}

      <View style={styles.barChartRow}>
        {showAxes && (
          <View style={styles.yAxis}>
            <Text style={[styles.yAxisLabel, { color: textColor }]}>
              {formatAxisValue(maxValue)}
            </Text>
            <Text style={[styles.yAxisLabel, { color: textColor }]}>
              {formatAxisValue(meanValue)}
            </Text>
            <Text style={[styles.yAxisLabel, { color: textColor }]}>
              {formatAxisValue(minValue)}
            </Text>
          </View>
        )}

        <View style={styles.chartAndLabels}>
          <View style={[styles.lineChartArea, { width: chartWidth, height: chartHeight }]}>
            {showAxes && (
              <>
                <View style={[styles.lineChartGrid, { top: 0 }]} />
                <View
                  style={[styles.lineChartGrid, { top: Math.round(chartHeight / 2) }]}
                />
                <View style={[styles.lineChartGrid, { top: chartHeight - 1 }]} />
              </>
            )}

            <Svg width={chartWidth} height={chartHeight}>
              {!!areaPath &&
                (PathElement ? (
                  <PathElement d={areaPath} fill={areaColor} />
                ) : null)}
              {!!linePath &&
                (PathElement ? (
                  <PathElement
                    d={linePath}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : null)}
              {showPoints &&
                points.map((point, index) => (
                  <Circle
                    key={`line-point-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r={3.8}
                    fill={lineColor}
                  />
                ))}
            </Svg>
          </View>

          <View style={[styles.xAxisRow, { width: chartWidth }]}>
            {normalizedData.map((item, index) => (
              <View
                key={`${item.label}-${index}-line-x`}
                style={{ width: chartWidth / Math.max(normalizedData.length, 1) }}
              >
                <Text style={[styles.xAxisLabel, { color: textColor }]}>
                  {abbreviateXAxisLabels
                    ? abbreviateLabel(item.label, xAxisAbbreviationLength)
                    : item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
