# @xaui/divider

Divider component for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/divider
```

## Divider

### Basic Usage

```typescript
import { Divider } from '@xaui/divider'

function Example() {
  return <Divider />
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `horizontal` | Divider orientation |
| `thickness` | `number` | `1` | Divider thickness |
| `length` | `number \| string` | `100%` | Divider length |
| `indent` | `number` | `0` | Start margin |
| `endIndent` | `number` | `0` | End margin |
| `themeColor` | `ThemeColor` | `default` | Theme-based color |
| `color` | `string` | - | Override divider color |
| `style` | `ViewStyle` | - | Additional view styles |

## License

MIT
