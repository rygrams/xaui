import { ChartDescription, ChartTitle, ChartValue } from './chart-text'
import { ChartFooter } from './chart-footer'
import { ChartHeader } from './chart-header'
import { ChartHeading } from './chart-heading'
import { ChartLegend, ChartLegendItem } from './chart-legend'
import { ChartRoot } from './chart'

/** The words around a figure, with no shell, and the palette they share with it. */
export const Chart = Object.assign(ChartRoot, {
  Header: ChartHeader,
  Heading: ChartHeading,
  Title: ChartTitle,
  Description: ChartDescription,
  Value: ChartValue,
  Legend: ChartLegend,
  LegendItem: ChartLegendItem,
  Footer: ChartFooter,
})

export { ChartRoot } from './chart'
export { ChartFooter } from './chart-footer'
export { ChartHeader } from './chart-header'
export { ChartHeading } from './chart-heading'
export { ChartLegend, ChartLegendItem, useChartLegend } from './chart-legend'
export { ChartDescription, ChartTitle, ChartValue } from './chart-text'
export { ChartPlotRoot as ChartPlot } from './chart-plot'
export { useChart, useOptionalChart } from './chart.context'
export { useChartInk, useFigureInk } from './chart.hook'
export { chartRecipe } from './chart.recipe'
export type { ChartFrameContextValue } from './chart.context'
export type {
  ChartBand,
  ChartDatum,
  ChartFrame,
  ChartFrameProps,
  ChartInk,
  ChartLegendItemProps,
  ChartLegendProps,
  ChartPlot as ChartPlotArg,
  ChartPlotProps,
  ChartSeries,
  ChartSeriesProps,
  ChartSize,
  ChartSlot,
  ChartTextSlotProps,
  ChartViewSlotProps,
  Curve,
} from './chart.type'
