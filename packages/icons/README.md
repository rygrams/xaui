# @xaui/icons

Icon components for XAUI - A Flutter-inspired React Native UI library. Includes 520+ icons with individual exports for optimal tree-shaking.

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
import { HomeIcon } from '@xaui/icons/home'
import { SettingsIcon } from '@xaui/icons/settings'
import type { IconProps } from '@xaui/icons/heart'

function MyComponent() {
  return (
    <>
      <ChevronLeftIcon size={24} color="#000" variant="baseline" />
      <ChevronRightIcon size={32} color="#FF0000" variant="filled" />
      <HeartIcon size={24} color="#FF0000" variant="filled" isAnimated />
      <HomeIcon size={28} color="#3B82F6" variant="duotone" />
      <SettingsIcon size={24} variant="round-outlined" />
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

### `variant`

Icon style variant:

- `'baseline'` (default) - Outline style
- `'filled'` - Solid fill style
- `'duotone'` - Two-tone style with opacity
- `'round-outlined'` - Outline with circular background
- `'square-outlined'` - Outline with square background
- `'round-filled'` - Filled with circular background
- `'square-filled'` - Filled with square background

### `size`

Icon size in pixels (default: `24`)

### `color`

Icon color as a string (default: `'default'`)

- Can be any valid color string: `'#FF0000'`, `'rgb(255, 0, 0)'`, `'red'`
- Use theme colors from `@xaui/core`: `theme.colors.primary.main`

### `isAnimated`

Whether to animate the icon on mount (default: `false`)

- Animates with a scale and fade-in effect

## Icon Naming Convention

Icon names follow kebab-case format:

| File Name              | Component Name           |
| ---------------------- | ------------------------ |
| `chevron-left`         | `ChevronLeftIcon`        |
| `arrow-forward-circle` | `ArrowForwardCircleIcon` |
| `logo-react`           | `LogoReactIcon`          |
| `home`                 | `HomeIcon`               |
| `settings`             | `SettingsIcon`           |
| `user-profile`         | `UserProfileIcon`        |

## Common Icons

### Navigation

- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `arrow-back`, `arrow-forward`
- `menu`, `close`, `more-horizontal`, `more-vertical`

### Actions

- `home`, `settings`, `search`, `filter`
- `plus`, `minus`, `check`, `x`
- `edit`, `trash`, `copy`, `share`
- `heart`, `star`, `bookmark`, `flag`

### Communication

- `mail`, `message`, `chat`, `bell`
- `phone`, `video`, `mic`, `camera`
- `send`, `attachment`, `emoji`

### Content

- `image`, `file`, `folder`, `document`
- `calendar`, `clock`, `location`, `map`
- `music`, `play`, `pause`, `skip-forward`

### Social & Brand

- `logo-react`, `logo-github`, `logo-twitter`, `logo-facebook`
- `logo-instagram`, `logo-linkedin`, `logo-youtube`
- `user`, `users`, `group`, `community`

### Status

- `check-circle`, `x-circle`, `alert-circle`, `info`
- `warning`, `error`, `success`, `help`
- `loading`, `spinner`, `refresh`, `sync`

## Performance

### Individual Imports vs Batch Imports

| Import Method                           | Bundle Size Impact        | Load Time | Recommended |
| --------------------------------------- | ------------------------- | --------- | ----------- |
| Individual (`@xaui/icons/chevron-left`) | Minimal (~2-5KB per icon) | Fast      | ✅ Yes      |
| Batch (`@xaui/icons`)                   | Large (~2-3MB all icons)  | Slow      | ❌ No       |

### Example Bundle Size Comparison

```tsx
// ✅ Good: Only loads ChevronLeftIcon (~3KB)
import { ChevronLeftIcon } from '@xaui/icons/chevron-left'

// ❌ Bad: Loads all 520+ icons (~2-3MB)
import { ChevronLeftIcon } from '@xaui/icons'
```

### Best Practices

1. **Always use individual imports** for production apps
2. **Import only the icons you need** in each component
3. **Use consistent icon sizes** across your app for visual harmony
4. **Leverage theme colors** instead of hardcoded colors

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

### Available Types

```typescript
import type { IconProps, IconVariant, IconSize } from '@xaui/icons/chevron-left'

// IconProps - All props available on icon components
// IconVariant - 'baseline' | 'filled' | 'duotone' | 'round-outlined' | 'square-outlined' | 'round-filled' | 'square-filled'
// IconSize - number (default: 24)
```

## Integration with Theme

Use icons with the XAUI theme system:

```tsx
import { useXUITheme } from '@xaui/core/theme'
import { HeartIcon } from '@xaui/icons/heart'

function LikeButton() {
  const theme = useXUITheme()

  return <HeartIcon size={24} color={theme.colors.danger.main} variant="filled" />
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
