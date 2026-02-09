import React from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { styles } from './chart.style'
import {
  DEFAULT_CHART_BACKGROUND,
  isLegendHorizontal,
  resolveElevationStyles,
} from './chart.shared'
import type { DonutChartCardProps } from './chart.type'

export const DonutChartCard: React.FC<DonutChartCardProps> = ({
  data,
  showLegend = true,
  legendPosition = 'top',
  total,
  title,
  elevation = 0,
  backgroundColor = DEFAULT_CHART_BACKGROUND,
  textColor = '#ffffff',
  size = 250,
  strokeWidth,
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

  const effectiveStrokeWidth = React.useMemo(() => {
    const autoStroke = Math.max(8, Math.min(24, Math.round(size * 0.082)))
    if (strokeWidth === undefined) {
      return autoStroke
    }

    return Math.max(6, Math.min(strokeWidth, Math.round(size * 0.22)))
  }, [size, strokeWidth])
  const radius = React.useMemo(
    () => (size - effectiveStrokeWidth) / 2,
    [effectiveStrokeWidth, size]
  )
  const circumference = React.useMemo(() => 2 * Math.PI * radius, [radius])
  const internalGapDegrees = React.useMemo(
    () => Math.max(6.5, Math.min(12.5, 8.1 * (250 / size))),
    [size]
  )
  const centerTitleFontSize = React.useMemo(
    () => Math.max(12, Math.round(size * 0.058)),
    [size]
  )
  const centerTotalFontSize = React.useMemo(
    () => Math.max(24, Math.round(size * 0.128)),
    [size]
  )

  const segments = React.useMemo(() => {
    if (!normalizedData.length || totalValue <= 0) {
      return []
    }

    const requestedGap = (internalGapDegrees / 360) * circumference
    const capCompensation = effectiveStrokeWidth * 0.66
    const maxGap = circumference / (normalizedData.length * 1.55)
    const gapLength = Math.min(requestedGap + capCompensation, maxGap)
    const availableArcLength = circumference - normalizedData.length * gapLength

    let offset = 0
    return normalizedData.map((item, index) => {
      const segmentLength = (item.value / totalValue) * availableArcLength
      const segment = {
        key: `${item.label}-${index}`,
        color: item.color,
        strokeDasharray: `${segmentLength} ${circumference}`,
        strokeDashoffset: -offset,
      }
      offset += segmentLength + gapLength
      return segment
    })
  }, [
    circumference,
    effectiveStrokeWidth,
    internalGapDegrees,
    normalizedData,
    totalValue,
  ])

  const chart = (
    <View style={[styles.chartWrapper, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={effectiveStrokeWidth}
          fill="none"
        />
        <Svg
          width={size}
          height={size}
          style={{ transform: [{ rotate: '-90deg' }] }}
        >
          {segments.map(segment => (
            <Circle
              key={segment.key}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.color}
              strokeWidth={effectiveStrokeWidth}
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </Svg>
      </Svg>

      {(title !== undefined || total !== undefined) && (
        <View style={styles.centerContent} pointerEvents="none">
          {title !== undefined && (
            <Text
              style={[
                styles.centerTitle,
                { fontSize: centerTitleFontSize, color: textColor },
              ]}
            >
              {title}
            </Text>
          )}
          {total !== undefined && (
            <Text
              style={[
                styles.centerTotal,
                {
                  color: textColor,
                  fontSize: centerTotalFontSize,
                  lineHeight: Math.round(centerTotalFontSize * 1.14),
                },
              ]}
            >
              {total}
            </Text>
          )}
        </View>
      )}
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
          <Text style={[styles.legendValue, { color: textColor }]}>{item.value}</Text>
        </View>
      ))}
    </View>
  ) : null

  const content = isLegendHorizontal(legendPosition) ? (
    <View style={styles.contentHorizontal}>
      {legendPosition === 'left' && legend}
      {chart}
      {legendPosition === 'right' && legend}
    </View>
  ) : (
    <View style={styles.contentVertical}>
      {legendPosition === 'top' && legend}
      {chart}
      {legendPosition === 'bottom' && legend}
    </View>
  )

  return (
    <View
      style={[
        styles.barCard,
        { backgroundColor },
        resolveElevationStyles(elevation),
        style,
      ]}
    >
      {content}
    </View>
  )
}
