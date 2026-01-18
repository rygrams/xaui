# @xaui/view

View utilities for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/view
```

## Components

- **ConditionalView**: Renders children only when visible, with optional appearance animation.

## ConditionalView

### Basic Usage

```typescript
import { ConditionalView, ConditionalViewAnimation } from '@xaui/view'

function Example({ isVisible }: { isVisible: boolean }) {
  return (
    <ConditionalView
      isVisible={isVisible}
      animation={ConditionalViewAnimation.SlideUp}
    >
      <MyCard />
    </ConditionalView>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isVisible` | `boolean` | - | Controls whether children are rendered |
| `children` | `React.ReactNode` | - | Content to render |
| `animation` | `ConditionalViewAnimation` | `ConditionalViewAnimation.Fade` | Appearance animation when becoming visible |
| `disableAnimation` | `boolean` | `false` | Disables the appearance animation |

### Animations

```typescript
ConditionalViewAnimation.Fade
ConditionalViewAnimation.Scale
ConditionalViewAnimation.SlideUp
ConditionalViewAnimation.SlideDown
ConditionalViewAnimation.SlideLeft
ConditionalViewAnimation.SlideRight
ConditionalViewAnimation.ZoomIn
ConditionalViewAnimation.ZoomOut
```

## License

MIT
