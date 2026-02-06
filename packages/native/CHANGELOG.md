# @xaui/mobile

## 0.0.13

### Patch Changes

- 395b05b: Add Menu and MenuItem components
  - Added Menu component with Portal-based rendering and smooth animations
  - Added MenuItem component with support for startContent and endContent
  - Both components support customAppearance for flexible styling
  - Menu supports position prop (top/bottom) and maxHeight for scrollable content
  - MenuItem supports dense mode and disabled state

- 9cba698: Extract icon components into separate @xaui/icons package

  This refactoring moves all 518 icon components from @xaui/native into a new dedicated @xaui/icons package.

  ## Changes

  ### New Package: @xaui/icons
  - Created new @xaui/icons package with 518 icon components
  - Icons are simplified and no longer depend on theme context
  - Icons accept color as a string prop directly
  - Package exports all icons and icon-related types

  ### @xaui/native Changes
  - Removed icon components directory
  - Added @xaui/icons as a dependency
  - Updated all icon imports to use @xaui/icons
  - Removed icon export from package.json

  ## Migration Guide

  If you were importing icons from @xaui/native, update your imports:

  ```tsx
  // Before
  import { CloseIcon } from '@xaui/native/icon'

  // After
  import { CloseIcon } from '@xaui/icons'
  ```

  All icon components now accept color as a direct string value instead of resolving theme colors internally.

- Updated dependencies [9cba698]
- Updated dependencies [cb50e8a]
  - @xaui/icons@0.0.2

## 0.0.12

### Patch Changes

- fcfccbf: Add DatePicker component with dialog-based calendar interface, supporting date selection, min/max ranges, locale customization, and theme variants (outlined, flat, light, faded, underlined)

## 0.0.11

### Patch Changes

- eb4820e: Add Avatar, AvatarGroup, and Badge components with comprehensive styling, hooks, and tests. Includes new demo pages showcasing component usage and features.
- 2295a7f: **BREAKING**: Replace Button `style` and `textStyle` props with `customAppearance` object for consistent styling API across components. Use `customAppearance={{ container, button, text }}` instead.

## 0.0.10

### Patch Changes

- 64d76ca: Add new Alert component with comprehensive features:
  - Complete Alert component with support for multiple theme colors (default, primary, success, warning, danger)
  - Four visual variants: solid, flat, bordered, and faded
  - Customizable appearance through `customAppearance` prop for container, title, and description styles
  - Built-in icon support with theme-aware colors, or custom icon/emoji support
  - Closable alerts with smooth fade and scale animations (250ms duration)
  - Controlled and uncontrolled visibility modes
  - Flexible content support (title, description, and custom children)
  - Custom close button support with preserved event handlers
  - Comprehensive test coverage
  - Dedicated demo screen showcasing all features and variants

## 0.0.9

### Patch Changes

- a4b7b3e: feat: introduce Autocomplete component with comprehensive filtering and customization

  Add new Autocomplete component to the native package with the following features:
  - Text input with real-time filtering of options
  - Support for controlled and uncontrolled state (selectedKey, inputValue)
  - Multiple variants: outlined, flat, light, faded, underlined
  - Customizable label placement: inside, outside, outside-left, outside-top
  - Menu trigger modes: focus, input, manual
  - Clear button support with isClearable prop
  - Custom value support with allowsCustomValue prop
  - Animation support with Reanimated
  - Full theme integration with color schemes
  - Disabled keys support
  - Error and description message display
  - Start/end content slots for custom icons
  - Responsive listbox positioning
  - Empty state handling with allowsEmptyCollection

## 0.0.8

### Patch Changes

- 976cea6: feat(native): add Typography component with semantic scale, text truncation support, and comprehensive styling system
- 7c8dde8: Add GridBuilder and MasonryGridBuilder for Flutter-style builder APIs and fix MasonryGrid layout updates for newly measured items.
- dbbd7bc: Add view layout components (grid, row, column, conditional view) and set default theme colors to primary for button, checkbox, and switch.

## 0.0.7

### Patch Changes

- d4859cb: Add Switch component with full feature support including controlled/uncontrolled modes, variants (inside/overlap), sizes, themes, and smooth animations

## 0.0.6

### Patch Changes

- 88fea0e: Refactor Select implementation by splitting hooks/animation/trigger and align
  Select size styles with Button sizing.

## 0.0.5

### Patch Changes

- 3c21e3f: Add native Accordion component with multiple variants (light, bordered, splitted), selection modes (toggle, multiple), and support for animations, dividers, and custom styling
- d05a489: Add theme palette and mode support with new hooks
  - Add `palette` field to XUITheme interface for accessing full color token system
  - Add `mode` field to XUITheme to track current theme mode (light/dark)
  - Add `useXUIPalette` hook for accessing theme palette with memoization
  - Update theme provider to dynamically set mode based on color scheme

- Updated dependencies [d05a489]
  - @xaui/core@0.1.7

## 0.0.4

### Patch Changes

- 876281e: Enhanced Checkbox component with placeholder icon for light variant and improved checkmark color handling for better visual feedback

## 0.0.3

### Patch Changes

- c09ae37: Enhance button component with new animations, size options, and text styles. Update theme colors with improved color definitions.
- Updated dependencies [c09ae37]
  - @xaui/core@0.1.6

## 0.0.2

### Patch Changes

- Fix TypeScript errors in button hook tests and resolve linting issues
- Add safe theme color access in button hook to prevent runtime errors with missing color schemes

## 0.0.1

### Patch Changes

- Introduce native package with Button, Progress, and ActivityIndicator components featuring full TypeScript support, comprehensive tests, and React Native Reanimated animations

## 0.0.3

### Patch Changes

- 52b0278: fix: Standardize activity indicator track color logic to correctly apply `backgroundColor` when `showTrack` is enabled

## 0.0.2

### Patch Changes

- ef03ddd: feat(indicator): add activity indicator

## 0.0.1

### Patch Changes

- 17ce4b0: Restructure monorepo into core, mobile, and web packages and add the shared progress component.
- Updated dependencies [17ce4b0]
  - @xaui/core@0.1.5
