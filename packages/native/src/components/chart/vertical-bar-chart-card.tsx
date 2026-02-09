import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './chart.style'
import {
  abbreviateLabel,
  DEFAULT_CHART_BACKGROUND,
  formatAxisValue,
  resolveElevationStyles,
} from './chart.shared'
import type { VerticalBarChartCardProps } from './chart.type'

export const VerticalBarChartCard: React.FC<VerticalBarChartCardProps> = ({
  data,
  title,
  elevation = 0,
  backgroundColor = DEFAULT_CHART_BACKGROUND,
  textColor = '#ffffff',
  size = 260,
  showAxes = true,
  abbreviateXAxisLabels = true,
  xAxisAbbreviationLength = 3,
  showFullLegendBelow = true,
  justifyBars = true,
  style,
}) => {
  const normalizedData = React.useMemo(
    () => data.filter(item => item.value >= 0),
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

    const total = normalizedData.reduce((sum, item) => sum + item.value, 0)
    return total / normalizedData.length
  }, [normalizedData])

  const chartWidth = Math.max(170, size)
  const chartHeight = Math.max(130, Math.min(220, Math.round(size * 0.56)))
  const horizontalPadding = justifyBars ? 0 : Math.max(10, Math.round(size * 0.045))
  const barsCount = Math.max(normalizedData.length, 1)
  const usableWidth = chartWidth - horizontalPadding * 2
  const slotWidth = usableWidth / barsCount
  const dynamicBarWidth = Math.max(8, Math.min(30, slotWidth * 0.52))
  const cornerRadius = Math.min(dynamicBarWidth / 2, 10)
  const graphHeight = chartHeight - 8

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
          <View style={[styles.yAxis, { height: chartHeight }]}>
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
          <View
            style={{
              width: chartWidth,
              height: chartHeight,
              position: 'relative',
              justifyContent: 'flex-end',
            }}
          >
            {showAxes && (
              <>
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: Math.round((chartHeight - 1) / 2),
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  }}
                />
              </>
            )}

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                height: chartHeight,
                paddingHorizontal: horizontalPadding,
                justifyContent: justifyBars ? 'space-between' : 'flex-start',
              }}
            >
              {normalizedData.map((item, index) => {
                const valueRatio = Math.max(0, Math.min(1, item.value / maxValue))
                const barHeight = Math.max(2, Math.round(valueRatio * graphHeight))

                return (
                  <View
                    key={`${item.label}-${index}-bar`}
                    style={{
                      width: slotWidth,
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <View
                      style={{
                        width: dynamicBarWidth,
                        height: barHeight,
                        borderRadius: cornerRadius,
                        backgroundColor: item.color ?? '#57C9ED',
                      }}
                    />
                  </View>
                )
              })}
            </View>
          </View>

          <View style={[styles.xAxisRow, { width: chartWidth }]}>
            {normalizedData.map((item, index) => (
              <View key={`${item.label}-${index}-x`} style={{ width: slotWidth }}>
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

      {showFullLegendBelow && (
        <View style={[styles.legend, { marginTop: 18 }]}>
          {normalizedData.map((item, index) => (
            <View key={`${item.label}-${index}-legend`} style={styles.legendItem}>
              <View style={styles.legendLeft}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: item.color ?? '#57C9ED' },
                  ]}
                />
                <Text style={[styles.legendTitle, { color: textColor }]}>
                  {item.label}
                </Text>
              </View>
              <Text style={[styles.legendValue, { color: textColor }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
