# @xaui/switches

Switch components for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/switches @xaui/core
```

## Components

- **Switch** - Versatile switch/toggle component with inside and overlap variants, smooth animations, and flexible label alignment

## Switch

A comprehensive switch component with support for two distinct variants, multiple sizes, and smooth animations using React Native's built-in Animated API.

### Basic Usage

```tsx
import { Switch } from '@xaui/switches'

function App() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <Switch
      label="Enable notifications"
      isSelected={enabled}
      onValueChange={setEnabled}
    />
  )
}
```

### Variants

The Switch component supports 2 different variants:

```tsx
<Switch variant="inside" label="Inside Switch" />
<Switch variant="overlap" label="Overlap Switch" />
```

- **inside** (default) - Traditional switch where the thumb moves inside the track with padding
- **overlap** - Modern iOS-style where the thumb overlaps the track with shadow effects and uses background color palette when selected

### Theme Colors

```tsx
<Switch themeColor="primary" label="Primary" />
<Switch themeColor="secondary" label="Secondary" />
<Switch themeColor="tertiary" label="Tertiary" />
<Switch themeColor="success" label="Success" />
<Switch themeColor="warning" label="Warning" />
<Switch themeColor="danger" label="Danger" />
<Switch themeColor="default" label="Default" />
```

### Sizes

```tsx
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />
```

### Border Radius

```tsx
<Switch radius="none" label="No Radius" />
<Switch radius="sm" label="Small Radius" />
<Switch radius="md" label="Medium Radius" />
<Switch radius="lg" label="Large Radius" />
<Switch radius="full" label="Full Radius" />
```

### Label Alignment

Control the position and layout of the label relative to the switch:

```tsx
// Label on the right (default)
<Switch label="Label on right" labelAlignment="right" />

// Label on the left
<Switch label="Label on left" labelAlignment="left" />

// Label on left, justified (switch and label pushed to edges)
<Switch label="Justified left" labelAlignment="justify-left" fullWidth />

// Label on right, justified (switch and label pushed to edges)
<Switch label="Justified right" labelAlignment="justify-right" fullWidth />
```

- **right** (default) - Label appears to the right of switch
- **left** - Label appears to the left of switch
- **justify-left** - Label on left, switch and label justified to container edges
- **justify-right** - Label on right, switch and label justified to container edges

### Full Width

Make the switch container take full available width (useful with justify alignments):

```tsx
<Switch
  label="Enable dark mode"
  labelAlignment="justify-right"
  fullWidth
  isSelected={enabled}
  onValueChange={setEnabled}
/>
```

### States

```tsx
// Selected
const [selected, setSelected] = React.useState(true)
<Switch label="Selected" isSelected={selected} onValueChange={setSelected} />

// Unselected
const [unselected, setUnselected] = React.useState(false)
<Switch label="Unselected" isSelected={unselected} onValueChange={setUnselected} />

// Disabled
<Switch label="Disabled" isDisabled />

// Disabled & Selected
<Switch label="Disabled & Selected" isDisabled isSelected />
```

### Custom Styling

```tsx
<Switch
  themeColor="primary"
  label="Custom Styled Switch"
  labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
  style={{ marginTop: 20 }}
  isSelected={enabled}
  onValueChange={setEnabled}
/>
```

### Switch Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Switch label text |
| `labelAlignment` | `'left' \| 'right' \| 'justify-left' \| 'justify-right'` | `'right'` | Label position and alignment |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'primary'` | Theme color |
| `variant` | `'inside' \| 'overlap'` | `'inside'` | Switch variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius |
| `fullWidth` | `boolean` | `false` | Make container full width |
| `isSelected` | `boolean` | `false` | Selected state |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `labelStyle` | `TextStyle` | - | Custom label text style |
| `style` | `ViewStyle` | - | Custom container style |
| `onValueChange` | `(isSelected: boolean) => void` | - | Value change handler |

---

## Advanced Examples

### Settings Screen

```tsx
function SettingsScreen() {
  const [settings, setSettings] = React.useState({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
  })

  return (
    <View style={{ gap: 12, padding: 20 }}>
      <Switch
        variant="inside"
        label="Enable notifications"
        labelAlignment="justify-left"
        fullWidth
        isSelected={settings.notifications}
        onValueChange={(value) =>
          setSettings({ ...settings, notifications: value })
        }
      />
      <Switch
        variant="inside"
        label="Dark mode"
        labelAlignment="justify-left"
        fullWidth
        isSelected={settings.darkMode}
        onValueChange={(value) =>
          setSettings({ ...settings, darkMode: value })
        }
      />
      <Switch
        variant="inside"
        label="Auto update"
        labelAlignment="justify-left"
        fullWidth
        isSelected={settings.autoUpdate}
        onValueChange={(value) =>
          setSettings({ ...settings, autoUpdate: value })
        }
      />
    </View>
  )
}
```

### Form Integration

```tsx
function PreferencesForm() {
  const [preferences, setPreferences] = React.useState({
    newsletter: false,
    marketing: false,
    analytics: true,
  })

  const handleSubmit = () => {
    console.log('Preferences:', preferences)
  }

  return (
    <View style={{ gap: 16 }}>
      <Switch
        themeColor="primary"
        variant="overlap"
        label="Subscribe to newsletter"
        isSelected={preferences.newsletter}
        onValueChange={(value) =>
          setPreferences({ ...preferences, newsletter: value })
        }
      />

      <Switch
        themeColor="secondary"
        variant="overlap"
        label="Receive marketing emails"
        isSelected={preferences.marketing}
        onValueChange={(value) =>
          setPreferences({ ...preferences, marketing: value })
        }
      />

      <Switch
        themeColor="default"
        variant="overlap"
        label="Allow analytics tracking"
        isSelected={preferences.analytics}
        onValueChange={(value) =>
          setPreferences({ ...preferences, analytics: value })
        }
      />

      <Button themeColor="primary" onPress={handleSubmit}>
        Save Preferences
      </Button>
    </View>
  )
}
```

### Different Variants Comparison

```tsx
<View style={{ gap: 16 }}>
  <Text style={{ fontWeight: 'bold' }}>Inside Variant</Text>
  <Switch variant="inside" themeColor="primary" label="Inside Primary" isSelected />
  <Switch variant="inside" themeColor="success" label="Inside Success" isSelected />

  <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Overlap Variant</Text>
  <Switch variant="overlap" themeColor="primary" label="Overlap Primary" isSelected />
  <Switch variant="overlap" themeColor="success" label="Overlap Success" isSelected />
</View>
```

### Label Alignment Examples

```tsx
<View style={{ gap: 16, padding: 20 }}>
  <Switch
    label="Default (right aligned)"
    labelAlignment="right"
    isSelected={enabled1}
    onValueChange={setEnabled1}
  />

  <Switch
    label="Left aligned"
    labelAlignment="left"
    isSelected={enabled2}
    onValueChange={setEnabled2}
  />

  <Switch
    label="Dark mode"
    labelAlignment="justify-left"
    fullWidth
    isSelected={enabled3}
    onValueChange={setEnabled3}
  />

  <Switch
    label="Notifications"
    labelAlignment="justify-right"
    fullWidth
    isSelected={enabled4}
    onValueChange={setEnabled4}
  />
</View>
```

### Size Comparison

```tsx
<View style={{ gap: 16 }}>
  <Switch size="sm" label="Small switch" isSelected />
  <Switch size="md" label="Medium switch" isSelected />
  <Switch size="lg" label="Large switch" isSelected />
</View>
```

## Animations

The Switch component features smooth animations using React Native's built-in Animated API:

- **Thumb sliding** - Spring animation for smooth thumb movement across the track
- **Press animation** - Spring animation on press for tactile feedback (thumb and track scale)
- **Color transition** - Smooth color transitions for track background
- **Shadow effects** - Overlap variant includes elevation shadow for depth

All animations use `useNativeDriver: true` for optimal native performance.

## Variant Details

### Inside Variant
- Thumb moves inside the track with padding
- Track changes color when selected (uses `main` color from theme)
- Thumb remains white
- More compact appearance

### Overlap Variant
- Thumb is larger than track and overlaps it
- Track uses `background` color from theme palette when selected (lighter shade)
- Thumb uses `main` color from theme when selected
- Shadow effects for visual depth
- Modern iOS-style appearance

## Theme Integration

Switch integrates seamlessly with the XAUI theme system via `@xaui/core`:

```tsx
import { XUIProvider } from '@xaui/core'
import { Switch } from '@xaui/switches'

function App() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <XUIProvider>
      <Switch
        themeColor="primary"
        label="Themed Switch"
        isSelected={enabled}
        onValueChange={setEnabled}
      />
    </XUIProvider>
  )
}
```

## Accessibility

The component supports standard React Native accessibility props:

```tsx
<Switch
  label="Enable notifications"
  isSelected={enabled}
  onValueChange={setEnabled}
  accessibilityLabel="Enable notifications"
  accessibilityHint="Double tap to toggle notifications"
  accessibilityRole="switch"
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { SwitchProps, SwitchEvents } from '@xaui/switches'
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## License

MIT

## Related Packages

- [@xaui/core](../core) - Core theme system and provider
- [@xaui/colors](../colors) - Color palette system
- [@xaui/checkboxes](../checkboxes) - Checkbox components
