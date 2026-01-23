---
'@xaui/web': patch
---

feat: Add ActivityIndicator component with circular and linear variants

Implement a new ActivityIndicator component for web with two variants:
- Circular variant: Material Design-compliant animated spinner with custom Bézier easing curves
- Linear variant: Indeterminate progress bar with dual-bar animation matching Material Design specs

Features:
- Theme color integration with the XAUI color system
- Customizable size, colors, and border radius
- Optional track display with `showTrack` prop
- Animation control with `disableAnimation` prop
- Fully typed with TypeScript
- Component tests included

Export as `@xaui/web/indicator` for modular imports.
