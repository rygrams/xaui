# @xaui/core

## 0.1.8

### Patch Changes

- 04252c6: Fix AppBar theme-color surface behavior and improve AppBar documentation previews.
  - ensure `secondary` theme background uses its own neutral token in core colors
  - update AppBar slot alignment API by using `alignment` on `AppBarContent`
  - refine floating AppBar width behavior to fill available space with a 97% max width
  - add AppBar screenshot previews in docs using assets from `apps/docs/public/screenshots`

## 0.1.7

### Patch Changes

- d05a489: Add theme palette and mode support with new hooks
  - Add `palette` field to XUITheme interface for accessing full color token system
  - Add `mode` field to XUITheme to track current theme mode (light/dark)
  - Add `useXUIPalette` hook for accessing theme palette with memoization
  - Update theme provider to dynamically set mode based on color scheme

## 0.1.6

### Patch Changes

- c09ae37: Enhance button component with new animations, size options, and text styles. Update theme colors with improved color definitions.

## 0.1.5

### Patch Changes

- 17ce4b0: Restructure monorepo into core, mobile, and web packages and add the shared progress component.

## 0.1.4

### Patch Changes

- Update core exports, hooks, and documentation to match the refactored structure.

## 0.1.3

### Patch Changes

- 64783ab: Update core exports, hooks, and documentation to match the refactored structure.
