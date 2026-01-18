# @xaui/view

View utilities for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/view
```

## Components

- **ConditionalView**: Renders children only when visible, with optional appearance animation.
- **Row**: Horizontal layout helper with Flutter-style axis alignment.
- **Column**: Vertical layout helper with Flutter-style axis alignment.
- **Grid**: Wraps children into a fixed-column grid layout.

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

## Row

### Basic Usage

```typescript
import { Row } from '@xaui/view'

function Example() {
  return (
    <Row spacing={12} mainAxisAlignment="space-between">
      <ActionButton />
      <ActionButton />
    </Row>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to render |
| `mainAxisAlignment` | `MainAxisAlignment` | `start` | Horizontal alignment |
| `crossAxisAlignment` | `CrossAxisAlignment` | `center` | Vertical alignment |
| `spacing` | `number` | - | Gap between children |
| `reverse` | `boolean` | `false` | Reverses the row order |
| `style` | `ViewStyle` | - | Additional view styles |

## Column

### Basic Usage

```typescript
import { Column } from '@xaui/view'

function Example() {
  return (
    <Column spacing={8} crossAxisAlignment="stretch">
      <SectionHeader />
      <SectionBody />
    </Column>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to render |
| `mainAxisAlignment` | `MainAxisAlignment` | `start` | Vertical alignment |
| `crossAxisAlignment` | `CrossAxisAlignment` | `center` | Horizontal alignment |
| `spacing` | `number` | - | Gap between children |
| `reverse` | `boolean` | `false` | Reverses the column order |
| `style` | `ViewStyle` | - | Additional view styles |

## Grid

### Basic Usage

```typescript
import { Grid } from '@xaui/view'

function Example() {
  return (
    <Grid columns={2} spacing={12}>
      <Card />
      <Card />
      <Card />
      <Card />
    </Grid>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to render |
| `columns` | `number` | `2` | Number of columns |
| `spacing` | `number` | - | Shared row/column gap |
| `rowSpacing` | `number` | - | Row gap override |
| `columnSpacing` | `number` | - | Column gap override |
| `style` | `ViewStyle` | - | Additional container styles |
| `itemStyle` | `ViewStyle` | - | Additional styles for each item |

## License

MIT
