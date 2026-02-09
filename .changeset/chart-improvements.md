---
'@xaui/native': patch
---

feat(native): improve PieChart and add HeatmapChart component

- Remove spacing between PieChart sections for seamless appearance
- Add new HeatmapChart component with customizable gradient colors (blue to red)
- Add comprehensive JSDoc documentation for all chart component props
- Remove deprecated elevetion prop in favor of elevation prop
- Replace title/titleColor with label/labelColor in DonutChartDataItem for consistency
- Heatmap X-axis labels (top): abbreviated to 3 characters max
- Heatmap Y-axis labels (left): abbreviated to 5 characters max with 50px width
- Heatmap cell gap increased from 2px to 4px for better visual separation
- Heatmap cell size default: 32px to prevent overflow
- Fix heatmap X-axis label alignment to match columns perfectly
- Update demo app with HeatmapChart example showing activity data
- Add comprehensive tests for HeatmapChartCard
