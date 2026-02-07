# @xaui/icons

Icon components for XAUI - A Flutter-inspired React Native UI library.

## Installation

```bash
pnpm add @xaui/icons react-native-svg
```

## Usage

### Individual Icon Imports (Recommended)

For optimal performance and tree-shaking, import icons individually:

```tsx
import { ChevronLeftIcon } from '@xaui/icons/chevron-left'
import { ChevronRightIcon } from '@xaui/icons/chevron-right'
import { HeartIcon } from '@xaui/icons/heart'
import type { IconProps } from '@xaui/icons/heart'

function MyComponent() {
  return (
    <>
      <ChevronLeftIcon size={24} color="#000" variant="baseline" />
      <ChevronRightIcon size={32} color="#FF0000" variant="filled" />
      <HeartIcon size={24} color="#FF0000" variant="filled" isAnimated />
    </>
  )
}
```

### Batch Import (Not Recommended)

If you need to import multiple icons, you can use the main entry point, but this will include all icons in your bundle:

```tsx
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@xaui/icons'
```

⚠️ **Warning**: This imports all 520+ icons into your bundle, significantly impacting performance.

## Icon Props

All icons support the following props:

- `variant`: Icon style variant
  - `'baseline'` (default) - Outline style
  - `'filled'` - Solid fill style
  - `'duotone'` - Two-tone style with opacity
  - `'round-outlined'` - Outline with circular background
  - `'square-outlined'` - Outline with square background
  - `'round-filled'` - Filled with circular background
  - `'square-filled'` - Filled with square background

- `size`: Icon size in pixels (default: `24`)

- `color`: Icon color as a string (default: `'default'`)
  - Can be any valid color string: `'#FF0000'`, `'rgb(255, 0, 0)'`, `'red'`

- `isAnimated`: Whether to animate the icon on mount (default: `false`)
  - Animates with a scale and fade-in effect

## Available Icons

This package includes 520+ icons. To see all available icons, check the [icons directory](./src/icons).

### Icon Naming Convention

Icon names follow kebab-case format:

- `chevron-left` → `ChevronLeftIcon`
- `arrow-forward-circle` → `ArrowForwardCircleIcon`
- `logo-react` → `LogoReactIcon`

## Performance

### Individual Imports vs Batch Imports

| Import Method | Bundle Size Impact | Load Time | Recommended |
|---------------|-------------------|-----------|-------------|
| Individual (`@xaui/icons/chevron-left`) | Minimal (~2-5KB per icon) | Fast | ✅ Yes |
| Batch (`@xaui/icons`) | Large (~2-3MB all icons) | Slow | ❌ No |

### Example Bundle Size Comparison

```tsx
// ✅ Good: Only loads ChevronLeftIcon (~3KB)
import { ChevronLeftIcon } from '@xaui/icons/chevron-left'

// ❌ Bad: Loads all 520+ icons (~2-3MB)
import { ChevronLeftIcon } from '@xaui/icons'
```

## TypeScript

All icons are fully typed with TypeScript. Import types alongside icons:

```tsx
import { ChevronLeftIcon } from '@xaui/icons/chevron-left'
import type { IconProps, IconVariant } from '@xaui/icons/chevron-left'

const iconProps: IconProps = {
  variant: 'filled',
  size: 32,
  color: '#FF0000',
  isAnimated: true,
}
```

## Development

### Generate Exports

The package uses a script to generate individual exports for each icon:

```bash
pnpm generate-exports
```

This script:
1. Scans all icon files in `src/icons/`
2. Generates entry files in `src/entries/`
3. Updates `package.json` exports
4. Updates `tsup.config.ts` entry points

### Build

```bash
pnpm build
```

The build automatically runs `pnpm generate-exports` before building.

## License

MIT
