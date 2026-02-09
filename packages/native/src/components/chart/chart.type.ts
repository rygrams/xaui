import type { ViewStyle } from 'react-native'
import type { ElevationLevel } from '../button/button.type'

/**
 * Data item for a donut chart segment
 */
export type DonutChartDataItem = {
  /** Label text for the segment */
  label: string
  /** Numeric value of the segment */
  value: number
  /** Hex color for the segment */
  color: string
  /** Optional custom color for the label text */
  labelColor?: string
}

/**
 * Position of the legend relative to the chart
 */
export type DonutChartLegendPosition = 'top' | 'left' | 'right' | 'bottom'

/**
 * Props for DonutChartCard component
 */
export type DonutChartCardProps = {
  /** Array of data items to display */
  data: DonutChartDataItem[]
  /** Whether to show the legend. Default: true */
  showLegend?: boolean
  /** Position of the legend. Default: 'bottom' */
  legendPosition?: DonutChartLegendPosition
  /** Total value to display in the center */
  total?: string | number
  /** Chart title displayed at the top */
  title?: string
  /** Elevation level for shadow effect. Default: 0 */
  elevation?: ElevationLevel
  /** Background color of the card. Default: '#6a6a6a30' */
  backgroundColor?: string
  /** Text color for labels and values. Default: '#ffffff' */
  textColor?: string
  /** Diameter of the chart in pixels. Default: 220 */
  size?: number
  /** Width of the donut ring in pixels. Default: 24 */
  strokeWidth?: number
  /** Additional styles for the card container */
  style?: ViewStyle
}

/**
 * Data item for a vertical bar chart
 */
export type VerticalBarChartDataItem = {
  /** Label for the bar (X-axis) */
  label: string
  /** Numeric value (height) of the bar */
  value: number
  /** Optional custom color for the bar */
  color?: string
}

/**
 * Props for VerticalBarChartCard component
 */
export type VerticalBarChartCardProps = {
  /** Array of data items to display */
  data: VerticalBarChartDataItem[]
  /** Chart title displayed at the top */
  title?: string
  /** Elevation level for shadow effect. Default: 0 */
  elevation?: ElevationLevel
  /** Background color of the card. Default: '#6a6a6a30' */
  backgroundColor?: string
  /** Text color for labels and values. Default: '#ffffff' */
  textColor?: string
  /** Height of the chart area in pixels. Default: 280 */
  size?: number
  /** Whether to show X and Y axes. Default: false */
  showAxes?: boolean
  /** Whether to abbreviate X-axis labels. Default: false */
  abbreviateXAxisLabels?: boolean
  /** Max length for abbreviated labels. Default: 3 */
  xAxisAbbreviationLength?: number
  /** Whether to show full legend below chart. Default: false */
  showFullLegendBelow?: boolean
  /** Whether to space bars evenly. Default: false */
  justifyBars?: boolean
  /** Additional styles for the card container */
  style?: ViewStyle
}

/**
 * Data item for a pie chart segment
 */
export type PieChartDataItem = {
  /** Label text for the segment */
  label: string
  /** Numeric value of the segment */
  value: number
  /** Hex color for the segment */
  color: string
  /** Optional custom color for the label text */
  labelColor?: string
}

/**
 * Props for PieChartCard component
 */
export type PieChartCardProps = {
  /** Array of data items to display */
  data: PieChartDataItem[]
  /** Chart title displayed at the top */
  title?: string
  /** Total value to display in header */
  total?: string | number
  /** Whether to show the legend. Default: true */
  showLegend?: boolean
  /** Position of the legend. Default: 'bottom' */
  legendPosition?: DonutChartLegendPosition
  /** Elevation level for shadow effect. Default: 0 */
  elevation?: ElevationLevel
  /** Background color of the card. Default: '#6a6a6a30' */
  backgroundColor?: string
  /** Text color for labels and values. Default: '#ffffff' */
  textColor?: string
  /** Diameter of the chart in pixels. Default: 220 */
  size?: number
  /** Additional styles for the card container */
  style?: ViewStyle
}

/**
 * Data item for a line chart point
 */
export type LineChartDataItem = {
  /** Label for the data point (X-axis) */
  label: string
  /** Numeric value (Y-axis) */
  value: number
}

/**
 * Line rendering mode
 */
export type LineChartMode = 'smooth' | 'direct'

/**
 * Props for LineChartCard component
 */
export type LineChartCardProps = {
  /** Array of data points to display */
  data: LineChartDataItem[]
  /** Chart title displayed at the top */
  title?: string
  /** Elevation level for shadow effect. Default: 0 */
  elevation?: ElevationLevel
  /** Background color of the card. Default: '#6a6a6a30' */
  backgroundColor?: string
  /** Text color for labels and values. Default: '#ffffff' */
  textColor?: string
  /** Height of the chart area in pixels. Default: 300 */
  size?: number
  /** Whether to show X and Y axes. Default: false */
  showAxes?: boolean
  /** Whether to show points at data values. Default: false */
  showPoints?: boolean
  /** Line rendering mode. Default: 'smooth' */
  lineMode?: LineChartMode
  /** Color of the line. Default: '#57C9ED' */
  lineColor?: string
  /** Color of the area under the line. Default: transparent */
  areaColor?: string
  /** Whether to abbreviate X-axis labels. Default: false */
  abbreviateXAxisLabels?: boolean
  /** Max length for abbreviated labels. Default: 3 */
  xAxisAbbreviationLength?: number
  /** Additional styles for the card container */
  style?: ViewStyle
}

/**
 * Props for HeatmapChartCard component
 */
export type HeatmapChartCardProps = {
  /** 2D array of numeric values to display. Each inner array is a row. */
  data: number[][]
  /** Chart title displayed at the top */
  title?: string
  /** Labels for columns (X-axis) */
  xLabels?: string[]
  /** Labels for rows (Y-axis) */
  yLabels?: string[]
  /** Whether to show numeric values inside cells. Default: false */
  showValues?: boolean
  /** Whether to show color scale legend. Default: true */
  showLegend?: boolean
  /** Start color for gradient (low values). Default: '#3B82F6' (blue) */
  startColor?: string
  /** End color for gradient (high values). Default: '#EF4444' (red) */
  endColor?: string
  /** Elevation level for shadow effect. Default: 0 */
  elevation?: ElevationLevel
  /** Background color of the card. Default: '#6a6a6a30' */
  backgroundColor?: string
  /** Text color for labels. Default: '#ffffff' */
  textColor?: string
  /** Size of each cell in pixels. Default: 32 */
  cellSize?: number
  /** Gap between cells in pixels. Default: 4 */
  cellGap?: number
  /** Additional styles for the card container */
  style?: ViewStyle
}
