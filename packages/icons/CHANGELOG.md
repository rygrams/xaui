# @xaui/icons

## 0.0.8

### Patch Changes

- Updated dependencies [23e3c1c]
  - @xaui/core@0.1.11

## 0.0.7

### Patch Changes

- Updated dependencies [53408ce]
  - @xaui/core@0.1.10

## 0.0.6

### Patch Changes

- Updated dependencies [d16bad0]
  - @xaui/core@0.1.9

## 0.0.5

### Patch Changes

- Updated dependencies [04252c6]
  - @xaui/core@0.1.8

## 0.0.4

### Patch Changes

- 0b79534: fix(build): stabilize type generation and reduce dts heap pressure
  - move `@xaui/native` type generation to tsup `dts` and remove the extra custom `tsc` type script
  - set `NODE_OPTIONS=--max-old-space-size=4096` for native and icons `build`/`dev` scripts
  - split large tsup entry maps into grouped configs so DTS runs in smaller batches
  - update icons export generator to emit the grouped tsup config so prebuild keeps the memory-safe setup

## 0.0.3

### Patch Changes

- fix(icons): resolve merge conflicts and restore standard pattern in CalendarIcon

## 0.0.2

### Patch Changes

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

- cb50e8a: perf(icons): add individual icon exports for optimal tree-shaking
  - Add individual export paths for all 520+ icons (e.g., `@xaui/icons/chevron-left`)
  - Create automatic export generation script (`scripts/generate-exports.js`)
  - Update build configuration to support individual icon bundles
  - Add comprehensive README with usage examples and performance guidelines
  - Significantly reduce bundle size when importing individual icons (~3KB vs ~2-3MB)

  **Breaking Changes:** None. Existing batch imports still work but are not recommended for production.

  **Migration:**

  ```tsx
  // Before (loads all icons)
  import { ChevronLeftIcon } from '@xaui/icons'

  // After (loads only one icon)
  import { ChevronLeftIcon } from '@xaui/icons/chevron-left'
  ```
