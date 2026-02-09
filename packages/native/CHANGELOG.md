# @xaui/mobile

## 0.0.22

### Patch Changes

- 84b49e1: Add multiple usability and stability improvements across toolbar, datepicker, and timepicker.
  - fix toolbar icon export usage and adjust toolbar action icon sizing/layout behavior
  - fix Reanimated UI-thread/worklet issues in toolbar and timepicker animations
  - add `TimePickerTrigger` component (datepicker-style trigger API) and export it from `@xaui/native/timepicker`
  - improve timepicker interaction:
    - faster hand rotation animation
    - corrected hand direction to selected hour/minute
    - manual text input now updates time and hand state correctly
    - reduced center marker size and hand selection dot size
  - improve 24-hour timepicker hour layout with paired inner/outer ring positions (`1-12` and `13-24`)

- 6098b6d: Add slider and tabs implementations for the native package, including component APIs, animations, styling hooks, and test coverage updates.

## 0.0.21

### Patch Changes

- 2d6c4eb: Add List component with ListItem and ListBuilder
  - Add List component for static list rendering with selection support
  - Add ListItem component with title, description, startContent, endContent props
  - Add ListBuilder component using FlatList for efficient large dataset rendering
  - Support single/multiple selection modes with selectedKeys prop
  - Add isPressable and isSelectable props for interaction control
  - Add showDivider prop with subtle theme-aware divider colors
  - Support themeColor prop for customizing selected item background
  - Support size variants (xs, sm, md, lg)
  - Add comprehensive test suite for all list components
  - Add demo app examples showcasing all list features

## 0.0.20

### Patch Changes

- 624b6d4: Improve TextInput component with focus wrapper, animations, and better styling
  - Add clickable wrapper to focus input when clicking anywhere in the field
  - Add smooth border color animation on focus (200ms transition)
  - Borders are always visible - only color animates between unfocused and focused states
  - Fix border bottom color for underlined variant using borderBottomColor
  - Increase inside label font size for better readability (sm: 12, md: 13, lg: 15)
  - Add padding bottom (2px) to inside labels for better spacing
  - Reduce border color opacity from 0.2 to 0.1 for subtler appearance

## 0.0.19

### Patch Changes

- 407a5a2: Add `radius` support to `Skeleton` so placeholder shapes can use theme radius tokens (`none`, `sm`, `md`, `lg`, `full`) without relying on custom style overrides.

## 0.0.18

### Patch Changes

- e0e7bdd: Add Card component with comprehensive features including header, body, footer sections, theme color support, blur effects, press/hover interactions, and proper light/dark theme defaults (white in light mode, dark.default.background in dark mode)

## 0.0.17

### Patch Changes

- bfa9f19: Add AspectRatio view component
  - Add AspectRatio component for maintaining aspect ratio constraints
  - Support custom ratio values (e.g., 16/9, 4/3, 1, 2/1)
  - Simple API with ratio prop and style customization
  - Useful for images, videos, and responsive layouts

- ff4c396: Add RoundedView component and carousel animations implementation

  **RoundedView Component:**
  - Add RoundedView component with flexible corner radius control
  - Support individual corner props (topLeft, topRight, bottomLeft, bottomRight)
  - Support side props (top, bottom, left, right)
  - Support all corners prop (all)
  - Add fullWidth and backgroundColor props
  - Implement priority system (specific corners > side props > all prop)
  - Add comprehensive TypeScript documentation
  - Add 27 unit tests (component props and hook logic)

  **Carousel Animations:**
  - Implement slide animations for multi-browse and hero layouts using React Native Reanimated
  - Add AnimatedCarouselItem component with interpolated scale and opacity effects
  - Multi-browse: scale (0.85 → 1 → 0.85) and opacity (0.6 → 1 → 0.6)
  - Hero: scale (0.9 → 1 → 0.9), opacity (0.5 → 1 → 0.5), and translateX (-10 → 0 → 10)
  - Use useAnimatedScrollHandler for smooth scroll tracking
  - Add conditional rendering for animated vs static items based on layout

  **Carousel Improvements:**
  - Reduce default spacing for multi-browse layout from 8px to 4px
  - Add comprehensive JSDoc documentation for all carousel types and props
  - Update itemSpacing documentation to reflect layout-specific defaults
  - Export AnimatedCarouselItem as internal component

- 4bce937: Add Material Design 3 inspired Carousel component with four layout variants: multi-browse, uncontained, hero, and full-screen

## 0.0.16

### Patch Changes

- 726393d: Full FAB implementation update across all FAB-related components.
  - rework core `Fab` implementation and styling behavior
  - update `Fab` API to use semantic `radius` values (`'none' | 'sm' | 'md' | 'lg' | 'full'`)
  - rework `FabMenu` implementation, state handling, and toggle behavior
  - improve `FabMenu` backdrop rendering and open/close animations
  - update `FabMenu` API to use semantic `radius` values (`'none' | 'sm' | 'md' | 'lg' | 'full'`)
  - improve `FabMenuItem` rendering and icon color visibility
  - align FAB demo usage and FAB-related type tests with the new implementation

## 0.0.15

### Patch Changes

- 339c150: feat(native): implement Chip component with ChipGroup and selectable ChipItem variants

## 0.0.14

### Patch Changes

- 5ac3865: feat(native): implement BottomSheet component and fix sheet surface/background rendering
- Updated dependencies
  - @xaui/icons@0.0.3

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
