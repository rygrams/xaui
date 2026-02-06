---
'@xaui/icons': patch
---

perf(icons): add individual icon exports for optimal tree-shaking

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
