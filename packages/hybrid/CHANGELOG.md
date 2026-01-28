# @xaui/web

## 0.0.3

### Patch Changes

- Updated dependencies [c09ae37]
  - @xaui/core@0.1.6

## 0.0.2

### Patch Changes

- Fix TypeScript errors in button hook tests and resolve linting issues

## 0.0.1

### Patch Changes

- Introduce hybrid package with Button component featuring full TypeScript support, comprehensive tests, custom hooks, and Framer Motion animations

## 0.0.3

### Patch Changes

- Fix startContent and endContent layout in Button web component by using flexbox and removing redundant margins.

## 0.0.2

### Patch Changes

- d910b08: feat: Add ActivityIndicator component with circular and linear variants

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

## 0.0.1

### Patch Changes

- 17ce4b0: Restructure monorepo into core, mobile, and web packages and add the shared progress component.
- Updated dependencies [17ce4b0]
  - @xaui/core@0.1.5
