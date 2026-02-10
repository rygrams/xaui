# @xaui/native

React Native components and hooks that extend the core `@xaui/core` theme system. This mobile layer ships animated primitives (buttons, indicators, hooks) ready to use with `XUIProvider`.

## Installation

```bash
pnpm add @xaui/native
```

### Peer dependencies

- `react` ^18 || ^19
- `react-native` >=0.70.0
- `react-native-reanimated` >=4.0.0
- `react-native-svg` >=13.0.0

The package also relies on `@xaui/core/theme` for the shared tokens.

## Quick start

1. Wrap your tree with `XUIProvider` to expose the tokens and follow the system color scheme:

```tsx
import { XUIProvider } from '@xaui/native/core'
import { theme, darkTheme } from '@xaui/core/theme'

export default function App() {
  return (
    <XUIProvider theme={theme} darkTheme={darkTheme}>
      {/* your screens */}
    </XUIProvider>
  )
}
```

2. Consume the theme inside your components via `useXUITheme` or `useColorMode`:

```tsx
import { Text, View } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native/core'

function Banner() {
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View style={{ backgroundColor: theme.colors.primary.background }}>
      <Text style={{ color: theme.colors.primary.foreground }}>
        Current mode: {mode}
      </Text>
    </View>
  )
}
```

## Key components

### `Button`

- Variants: `solid`, `outlined`, `flat`, `light`, `faded`
- Sizes: `xs`, `sm`, `md`, `lg`
- Radii: `none`, `sm`, `md`, `lg`, `full`
- Supports start/end content, `fullWidth`, `isDisabled`, `isLoading` with an integrated spinner
- Declarative press animations (scale, opacity, spring)

```tsx
<Button
  themeColor="primary"
  variant="solid"
  elevation={2}
  size="lg"
  radius="full"
  isLoading={saving}
  spinnerPlacement="end"
  onPress={handleSave}
>
  Save changes
</Button>
```

### `ActivityIndicator`

- Variants: `circular` (default size 40) and `linear` (custom height)
- Draws from the theme colors (`primary`, `secondary`, etc.) and optionally renders a track with `showTrack`
- `disableAnimation` is provided for snapshots or silent loading states

```tsx
<ActivityIndicator
  variant="linear"
  themeColor="secondary"
  showTrack
  borderRadius={4}
/>
```

### `ExpansionPanel`

- Variants: `light`, `bordered`, `splitted`
- Selection modes: `toggle` (single expansion) or `multiple` (simultaneous expansions)
- Supports disabled items, compact mode, and custom appearance

```tsx
import { ExpansionPanel, ExpansionPanelItem } from '@xaui/native/expansion-panel'

;<ExpansionPanel variant="light" selectionMode="toggle" showDivider>
  <ExpansionPanelItem title="Section 1" itemKey="section1">
    <Text>Content for section 1</Text>
  </ExpansionPanelItem>
  <ExpansionPanelItem title="Section 2" itemKey="section2">
    <Text>Content for section 2</Text>
  </ExpansionPanelItem>
</ExpansionPanel>
```

### `Avatar`

- Variants: `circle`, `square`, `rounded`
- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Supports images, icons, or text initials
- Fallback support when image fails to load

```tsx
import { Avatar } from '@xaui/native/avatar'

// With image
<Avatar src="https://example.com/avatar.jpg" size="lg" variant="circle" />

// With icon
<Avatar icon={<UserIcon />} size="md" variant="rounded" />

// With text initials
<Avatar name="John Doe" size="sm" variant="square" />
```

### `Badge`

- Variants: `solid`, `outlined`, `flat`, `light`, `faded`
- Sizes: `xs`, `sm`, `md`, `lg`
- Supports icons, custom colors, and notification dots

```tsx
import { Badge } from '@xaui/native/badge'

<Badge themeColor="danger" variant="solid" size="md">
  99+
</Badge>

<Badge themeColor="success" variant="outlined" showDot>
  Online
</Badge>
```

### `Checkbox`

- Variants: `solid`, `outlined`, `flat`
- Sizes: `xs`, `sm`, `md`, `lg`
- Supports indeterminate state, custom icons, and line-through text

```tsx
import { Checkbox } from '@xaui/native/checkbox'

;<Checkbox
  isSelected={isChecked}
  onValueChange={setIsChecked}
  themeColor="primary"
  size="md"
>
  Accept terms and conditions
</Checkbox>
```

### `Chip`

- Variants: `solid`, `outlined`, `flat`, `light`, `faded`
- Sizes: `xs`, `sm`, `md`, `lg`
- Supports start/end content, close button, and selection state

```tsx
import { Chip } onPress={() => console.log('Chip pressed')}>
  Tag Label
</Chip>
```

### `Divider`

- Orientations: `horizontal`, `vertical`
- Supports custom color and size

```tsx
import { Divider } from '@xaui/native/divider'

<Divider orientation="horizontal" size={2} />
<Divider orientation="vertical" size={1} color="#E5E7EB" />
```

### `Radio` & `RadioGroup`

- Variants: `solid`, `outlined`, `flat`
- Sizes: `xs`, `sm`, `md`, `lg`
- Group support with controlled state

```tsx
import { Radio, RadioGroup } from '@xaui/native/radio'

;<RadioGroup value={selected} onValueChange={setSelected}>
  <Radio value="option1" themeColor="primary">
    Option 1
  </Radio>
  <Radio value="option2" themeColor="primary">
    Option 2
  </Radio>
</RadioGroup>
```

### `Switch`

- Sizes: `xs`, `sm`, `md`, `lg`
- Supports icons inside the thumb

```tsx
import { Switch } from '@xaui/native/switch'

;<Switch
  isSelected={isEnabled}
  onValueChange={setIsEnabled}
  size="md"
  themeColor="success"
/>
```

### View Components

#### `Center`

Centers its child both vertically and horizontally.

```tsx
import { Center } from '@xaui/native/center'

;<Center style={{ flex: 1 }}>
  <Text>Centered content</Text>
</Center>
```

#### `Column` & `Row`

Flexbox layout helpers with Flutter-like API.

```tsx
import { Column, Row } from '@xaui/native/view'

<Column mainAxisAlignment="center" crossAxisAlignment="stretch" gap={16}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Column>

<Row mainAxisAlignment="space-between" crossAxisAlignment="center">
  <Text>Left</Text>
  <Text>Right</Text>
</Row>
```

#### `Spacer` & `SizedBox`

Utility components for spacing.

```tsx
import { Spacer, SizedBox } from '@xaui/native/view'

<Row>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Row>

<SizedBox height={20} width={10} />
```

#### `RoundedView`

View with rounded corners and optional border.

```tsx
import { RoundedView } from '@xaui/native/rounded-view'

;<RoundedView borderRadius={16} borderWidth={2} borderColor="#E5E7EB" padding={20}>
  <Text>Content with rounded corners</Text>
</RoundedView>
```

## Theme hooks & utilities

- `useXUITheme()` must be used within `XUIProvider`; it throws if the provider is missing.
- `useXUIColors()` is a shortcut for reading just the color tokens.
- `useColorMode()` returns `light` or `dark` based on React Native's `useColorScheme()`.
- `XUIProvider` accepts `theme` and `darkTheme` as `DeepPartial<XUITheme>` so you can override partial token sets without redefining the entire theme.

## Testing & build

- Bundles are produced with `tsup` (ESM + CJS outputs under `dist`).
- Tests live under `packages/native/__tests__` and run with `vitest`.

## License

MIT
