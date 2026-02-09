import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 18,
    width: '100%',
  },
  contentVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  contentHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  pieContentVertical: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
  },
  pieContentHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pieHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  pieHeaderTotal: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    textAlign: 'right',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '62%',
  },
  centerTitle: {
    fontSize: 17,
    color: '#aeb7c2',
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
  },
  centerTotal: {
    marginTop: 6,
    fontSize: 44,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 50,
    includeFontPadding: false,
  },
  legend: {
    width: '100%',
    gap: 10,
  },
  legendCompact: {
    width: 'auto',
    minWidth: 180,
    flexShrink: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 14,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#f4f6f8',
    flexShrink: 1,
  },
  legendValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    minWidth: 34,
    textAlign: 'right',
  },
  barCard: {
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    width: '100%',
  },
  barTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
  },
  barChartRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  yAxis: {
    width: 44,
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  chartAndLabels: {
    flex: 1,
  },
  xAxisRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  xAxisLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
  },
  legendBelow: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendBelowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12,
  },
  legendBelowDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
  legendBelowText: {
    fontSize: 12,
    fontWeight: '500',
  },
  legendBelowValue: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  lineChartArea: {
    flex: 1,
  },
  lineChartGrid: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  chartHeader: {
    width: '100%',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  heatmapContainer: {
    alignItems: 'flex-start',
  },
  heatmapGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heatmapCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  heatmapCellText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  heatmapXLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heatmapYLabel: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 4,
  },
  heatmapLabelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  heatmapLegend: {
    marginTop: 20,
    width: '100%',
  },
  heatmapLegendGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  heatmapLegendItem: {
    alignItems: 'center',
    gap: 6,
  },
  heatmapLegendBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  heatmapLegendValue: {
    fontSize: 11,
    fontWeight: '500',
  },
})
