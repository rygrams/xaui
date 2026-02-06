---
'@xaui/icons': patch
'@xaui/native': patch
---

Extract icon components into separate @xaui/icons package

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
