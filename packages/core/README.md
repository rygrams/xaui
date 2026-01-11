# @xaui/core

A modern React Native UI library with Flutter-inspired API, smooth animations powered by React Native Reanimated, and a comprehensive design system.

## Installation

```bash
pnpm add @xaui/core
```

## Features

- **Flutter-inspired API**: Intuitive component props like `padding`, `margin`, `borderRadius`
- **Smooth Animations**: Built on React Native Reanimated for native performance
- **Design System**: Integrated with @xaui/colors for consistent theming
- **TypeScript First**: Fully typed for excellent developer experience
- **Performance**: Optimized for mobile with native animations

## Usage

### Basic Example

```typescript
import { View, Text } from '@xaui/core'

export default function App() {
  return (
    <View padding={16} backgroundColor="blue">
      <Text color="white">Hello XAUI!</Text>
    </View>
  )
}
```

### With Colors

```typescript
import { View, Text } from '@xaui/core'
import { colors } from '@xaui/colors'

export default function App() {
  return (
    <View
      padding={20}
      backgroundColor={colors.blue[500]}
      borderRadius={12}
    >
      <Text color={colors.white}>Styled Component</Text>
    </View>
  )
}
```

## Components

### View

A flexible container component with Flutter-like styling props.

```typescript
<View
  padding={16}
  margin={8}
  backgroundColor="blue"
  borderRadius={12}
  elevation={4}
>
  {children}
</View>
```

### Text

A text component with built-in typography support.

```typescript
<Text
  color="blue"
  fontSize={16}
  fontWeight="bold"
>
  Hello World
</Text>
```

## API Reference

More detailed API documentation coming soon.

## License

MIT
