# @xaui/core

## 0.1.3

### Patch Changes

- Updated dependencies [2fd4e38]
  - @xaui/colors@0.1.5

## 0.1.2

### Patch Changes

- 3011107: Add Button and IconButton components with comprehensive features
  - Implement Button component with 6 variants (solid, outlined, flat, light, elevated, faded)
  - Add IconButton component for icon-only actions with default transparent background
  - Add ripple effect animation using native Animated API
  - Support loading states with CircularActivityIndicator integration
  - Include 7 theme colors (primary, secondary, tertiary, danger, warning, success, default)
  - Provide 4 size options (xs, sm, md, lg) and 5 radius options
  - Add comprehensive test suite with 17 passing tests
  - Include detailed documentation with examples and API reference
  - Update demo app with button component examples

  Add Progress component with comprehensive features
  - Implement CircularProgress and LinearProgress components
  - Add support for custom colors and sizes
  - Include loading states and progress tracking
  - Add comprehensive test suite with 10 passing tests
  - Include detailed documentation with examples and API reference
  - Update demo app with progress component examples

- Updated dependencies [3011107]
  - @xaui/colors@0.1.4

## 0.1.1

### Patch Changes

- 906a1b1: Add @xaui/core package with theme system and simplified useTheme hook API
  - Add comprehensive theme system with colors, spacing, typography, and shadows
  - Add XUIProvider for theme context management
  - Add useTheme hook with simplified API (direct color access without .color suffix)
  - Add useXUITheme hook for full theme object access
  - Support both light and dark theme variants
  - Integrate with @xaui/colors package for design tokens
