import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './chart.style'
import {
  abbreviateLabel,
  DEFAULT_CHART_BACKGROUND,
  resolveElevationStyles,
} from './chart.shared'
import type { HeatmapChartCardProps } from './chart.type'

const getHeatmapColor = (
  value: number,
  min: number,
  max: number,
  startColor: string,
  endColor: string
): string => {
  if (max === min) {
    return startColor
  }

  const ratio = (value - min) / (max - min)

  const parseColor = (color: string) => {
    const hex = color.replace('#', '')
    return {
      r: Number.parseInt(hex.substring(0, 2), 16),
      g: Number.parseInt(hex.substring(2, 4), 16),
      b: Number.parseInt(hex.substring(4, 6), 16),
    }
  }

  const start = parseColor(startColor)
  const end = parseColor(endColor)

  const r = Math.round(start.r + (end.r - start.r) * ratio)
  const g = Math.round(start.g + (end.g - start.g) * ratio)
  const b = Math.round(start.b + (end.b - start.b) * ratio)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export const HeatmapChartCard: React.FC<HeatmapChartCardProps> = ({
  data,
  title,
  xLabels,
  yLabels,
  showValues = false,
  showLegend = true,
  startColor = '#3B82F6',
  endColor = '#EF4444',
  elevation = 0,
  backgroundColor = DEFAULT_CHART_BACKGROUND,
  textColor = '#ffffff',
  cellSize = 32,
  cellGap = 4,
  style,
}) => {
  const { minValue, maxValue } = React.useMemo(() => {
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY

    for (const row of data) {
      for (const value of row) {
        if (value < min) {
          min = value
        }
        if (value > max) {
          max = value
        }
      }
    }

    return { minValue: min, maxValue: max }
  }, [data])

  const rows = data.length
  const cols = data[0]?.length ?? 0

  const labelWidth = 50
  const labelHeight = 30

  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
        resolveElevationStyles(elevation),
        style,
      ]}
    >
      {title && (
        <View style={styles.chartHeader}>
          <Text style={[styles.chartTitle, { color: textColor }]}>{title}</Text>
        </View>
      )}

      <View style={styles.heatmapContainer}>
        <View style={styles.heatmapGrid}>
          <View style={{ width: labelWidth, height: labelHeight }} />

          {xLabels?.map((label, index) => (
            <View
              key={`x-label-${index}`}
              style={[
                styles.heatmapXLabel,
                {
                  width: cellSize,
                  height: labelHeight,
                  marginRight: index < cols - 1 ? cellGap : 0,
                },
              ]}
            >
              <Text
                style={[styles.heatmapLabelText, { color: textColor }]}
                numberOfLines={1}
              >
                {abbreviateLabel(label, 3)}
              </Text>
            </View>
          ))}
        </View>

        {data.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.heatmapRow}>
            {yLabels?.[rowIndex] && (
              <View style={[styles.heatmapYLabel, { width: labelWidth }]}>
                <Text
                  style={[styles.heatmapLabelText, { color: textColor }]}
                  numberOfLines={1}
                >
                  {abbreviateLabel(yLabels[rowIndex], 5)}
                </Text>
              </View>
            )}

            {row.map((value, colIndex) => {
              const cellColor = getHeatmapColor(
                value,
                minValue,
                maxValue,
                startColor,
                endColor
              )

              return (
                <View
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={[
                    styles.heatmapCell,
                    {
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: cellColor,
                      marginRight: colIndex < cols - 1 ? cellGap : 0,
                      marginBottom: rowIndex < rows - 1 ? cellGap : 0,
                    },
                  ]}
                >
                  {showValues && <Text style={styles.heatmapCellText}>{value}</Text>}
                </View>
              )
            })}
          </View>
        ))}
      </View>

      {showLegend && (
        <View style={styles.heatmapLegend}>
          <View style={styles.heatmapLegendGradient}>
            {Array.from({ length: 5 }).map((_, index) => {
              const ratio = index / 4
              const value = minValue + (maxValue - minValue) * ratio
              const color = getHeatmapColor(
                value,
                minValue,
                maxValue,
                startColor,
                endColor
              )

              return (
                <View key={`legend-${index}`} style={styles.heatmapLegendItem}>
                  <View
                    style={[styles.heatmapLegendBox, { backgroundColor: color }]}
                  />
                  <Text style={[styles.heatmapLegendValue, { color: textColor }]}>
                    {value.toFixed(1)}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      )}
    </View>
  )
}
