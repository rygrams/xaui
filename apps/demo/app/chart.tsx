import {
  DonutChartCard,
  HeatmapChartCard,
  LineChartCard,
  PieChartCard,
  VerticalBarChartCard,
} from '@xaui/native/chart'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const sampleData = [
  { label: 'Cuts', value: 100, color: '#F2F3F4', labelColor: '#F2F3F4' },
  {
    label: 'Professional braiding',
    value: 10,
    color: '#E3B15F',
    labelColor: '#F2F3F4',
  },
  {
    label: 'Straight razor shave',
    value: 27,
    color: '#B53AF5',
    labelColor: '#F2F3F4',
  },
]

const weeklyServices = [
  { label: 'Monday', value: 28, color: '#57C9ED' },
  { label: 'Tuesday', value: 33, color: '#31D76A' },
  { label: 'Wednesday', value: 24, color: '#F9E300' },
  { label: 'Thursday', value: 42, color: '#E3B15F' },
  { label: 'Friday', value: 38, color: '#B53AF5' },
  { label: 'Saturday', value: 30, color: '#F2F3F4' },
]

const pieServices = [
  { label: 'Cuts', value: 35, color: '#F2F3F4' },
  { label: 'Coloring', value: 22, color: '#57C9ED' },
  { label: 'Braiding', value: 19, color: '#E3B15F' },
  { label: 'Facials', value: 14, color: '#31D76A' },
]

const lineServices = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 24 },
  { label: 'Fri', value: 21 },
  { label: 'Sat', value: 27 },
]

const heatmapData = [
  [12, 18, 25, 32, 28, 20, 15],
  [15, 22, 30, 35, 32, 25, 18],
  [20, 28, 35, 42, 38, 30, 22],
  [18, 25, 32, 38, 35, 28, 20],
  [10, 15, 20, 25, 22, 18, 12],
]

const heatmapXLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const heatmapYLabels = ['Morning', 'Noon', 'Afternoon', 'Evening', 'Night']

export default function ChartScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.xl }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Donut Chart
        </Text>
        <DonutChartCard
          title="Total Services"
          total={522}
          data={sampleData}
          elevation={3}
          backgroundColor="#20262D"
          textColor="#F2F3F4"
          legendPosition="bottom"
          showLegend
          size={244}
          strokeWidth={24}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Vertical Bar Chart
        </Text>
        <VerticalBarChartCard
          title="Services / Day"
          data={weeklyServices}
          size={280}
          showAxes
          abbreviateXAxisLabels
          xAxisAbbreviationLength={3}
          showFullLegendBelow
          justifyBars
          elevation={2}
          backgroundColor="#20262D"
          textColor="#F2F3F4"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Pie Chart
        </Text>
        <PieChartCard
          title="Service Mix"
          total={90}
          data={pieServices}
          size={230}
          showLegend
          legendPosition="bottom"
          elevation={2}
          backgroundColor="#20262D"
          textColor="#F2F3F4"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Line Chart
        </Text>
        <LineChartCard
          title="Weekly Trend"
          data={lineServices}
          size={300}
          showAxes
          showPoints
          lineMode="smooth"
          lineColor="#57C9ED"
          areaColor="rgba(87, 201, 237, 0.14)"
          abbreviateXAxisLabels={false}
          elevation={2}
          backgroundColor="#20262D"
          textColor="#F2F3F4"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Heatmap Chart
        </Text>
        <HeatmapChartCard
          title="Activity Heatmap"
          data={heatmapData}
          xLabels={heatmapXLabels}
          yLabels={heatmapYLabels}
          showValues
          showLegend
          startColor="#3B82F6"
          endColor="#EF4444"
          cellSize={30}
          cellGap={4}
          elevation={2}
          backgroundColor="#20262D"
          textColor="#F2F3F4"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 44,
  },
  section: {
    width: '100%',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
