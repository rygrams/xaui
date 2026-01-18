# @xaui/checkbox

Checkbox components for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
pnpm add @xaui/checkbox @xaui/core
```

## Components

- **Checkbox** - Versatile checkbox component with filled and light variants, animated SVG checkmarks, and flexible label alignment

## Checkbox

A comprehensive checkbox component with support for multiple variants, sizes, and smooth animations using React Native's built-in Animated API.

### Basic Usage

```tsx
import { Checkbox } from '@xaui/checkbox'

function App() {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      label="Accept terms and conditions"
      isChecked={checked}
      onValueChange={setChecked}
    />
  )
}
```

### Variants

The Checkbox component supports 2 different variants:

```tsx
<Checkbox variant="filled" label="Filled Checkbox" />
<Checkbox variant="light" label="Light Checkbox" />
```

- **filled** (default) - Material Design style with animated background fill when checked
- **light** - Minimal style with no border/background, only animated checkmark appears when checked (larger icon size)

### Theme Colors

```tsx
<Checkbox themeColor="primary" label="Primary" />
<Checkbox themeColor="secondary" label="Secondary" />
<Checkbox themeColor="tertiary" label="Tertiary" />
<Checkbox themeColor="success" label="Success" />
<Checkbox themeColor="warning" label="Warning" />
<Checkbox themeColor="danger" label="Danger" />
<Checkbox themeColor="default" label="Default" />
```

### Sizes

```tsx
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
```

### Border Radius

```tsx
<Checkbox radius="none" label="No Radius" />
<Checkbox radius="sm" label="Small Radius" />
<Checkbox radius="md" label="Medium Radius" />
<Checkbox radius="lg" label="Large Radius" />
<Checkbox radius="full" label="Full Radius" />
```

### Label Alignment

Control the position and layout of the label relative to the checkbox:

```tsx
// Label on the right (default)
<Checkbox label="Label on right" labelAlignment="right" />

// Label on the left
<Checkbox label="Label on left" labelAlignment="left" />

// Label on left, justified (checkbox and label pushed to edges)
<Checkbox label="Justified left" labelAlignment="justify-left" fullWidth />

// Label on right, justified (checkbox and label pushed to edges)
<Checkbox label="Justified right" labelAlignment="justify-right" fullWidth />
```

- **right** (default) - Label appears to the right of checkbox
- **left** - Label appears to the left of checkbox
- **justify-left** - Label on left, checkbox and label justified to container edges
- **justify-right** - Label on right, checkbox and label justified to container edges

### Full Width

Make the checkbox container take full available width (useful with justify alignments):

```tsx
<Checkbox
  label="Full width checkbox"
  labelAlignment="justify-right"
  fullWidth
  isChecked={checked}
  onValueChange={setChecked}
/>
```

### States

```tsx
// Checked
const [checked, setChecked] = React.useState(true)
<Checkbox label="Checked" isChecked={checked} onValueChange={setChecked} />

// Unchecked
const [unchecked, setUnchecked] = React.useState(false)
<Checkbox label="Unchecked" isChecked={unchecked} onValueChange={setUnchecked} />

// Disabled
<Checkbox label="Disabled" isDisabled />

// Disabled & Checked
<Checkbox label="Disabled & Checked" isDisabled isChecked />
```

### Custom Styling

```tsx
<Checkbox
  themeColor="primary"
  label="Custom Styled Checkbox"
  labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
  style={{ marginTop: 20 }}
  isChecked={checked}
  onValueChange={setChecked}
/>
```

### Checkbox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Checkbox label text |
| `labelAlignment` | `'left' \| 'right' \| 'justify-left' \| 'justify-right'` | `'right'` | Label position and alignment |
| `themeColor` | `'primary' \| 'secondary' \| 'tertiary' \| 'danger' \| 'warning' \| 'success' \| 'default'` | `'default'` | Theme color |
| `variant` | `'filled' \| 'light'` | `'filled'` | Checkbox variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` | Border radius |
| `fullWidth` | `boolean` | `false` | Make container full width |
| `isChecked` | `boolean` | `false` | Checked state |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `labelStyle` | `TextStyle` | - | Custom label text style |
| `style` | `ViewStyle` | - | Custom container style |
| `onValueChange` | `(isChecked: boolean) => void` | - | Value change handler |

---

## Advanced Examples

### Checkbox Group

```tsx
function CheckboxGroup() {
  const [selected, setSelected] = React.useState({
    option1: false,
    option2: false,
    option3: false,
  })

  return (
    <View style={{ gap: 12 }}>
      <Checkbox
        label="Option 1"
        isChecked={selected.option1}
        onValueChange={(checked) =>
          setSelected({ ...selected, option1: checked })
        }
      />
      <Checkbox
        label="Option 2"
        isChecked={selected.option2}
        onValueChange={(checked) =>
          setSelected({ ...selected, option2: checked })
        }
      />
      <Checkbox
        label="Option 3"
        isChecked={selected.option3}
        onValueChange={(checked) =>
          setSelected({ ...selected, option3: checked })
        }
      />
    </View>
  )
}
```

### Form Integration

```tsx
function RegistrationForm() {
  const [formData, setFormData] = React.useState({
    acceptTerms: false,
    newsletter: false,
    marketing: false,
  })

  const handleSubmit = () => {
    if (!formData.acceptTerms) {
      alert('Please accept terms and conditions')
      return
    }
  }

  return (
    <View style={{ gap: 16 }}>
      <Checkbox
        themeColor="primary"
        label="I accept the terms and conditions"
        isChecked={formData.acceptTerms}
        onValueChange={(checked) =>
          setFormData({ ...formData, acceptTerms: checked })
        }
      />

      <Checkbox
        themeColor="default"
        label="Subscribe to newsletter"
        isChecked={formData.newsletter}
        onValueChange={(checked) =>
          setFormData({ ...formData, newsletter: checked })
        }
      />

      <Checkbox
        themeColor="default"
        label="Receive marketing emails"
        isChecked={formData.marketing}
        onValueChange={(checked) =>
          setFormData({ ...formData, marketing: checked })
        }
      />

      <Button themeColor="primary" onPress={handleSubmit}>
        Register
      </Button>
    </View>
  )
}
```

### Different Variants Comparison

```tsx
<View style={{ gap: 16 }}>
  <Text style={{ fontWeight: 'bold' }}>Filled Variant</Text>
  <Checkbox variant="filled" themeColor="primary" label="Filled Primary" isChecked />
  <Checkbox variant="filled" themeColor="success" label="Filled Success" isChecked />

  <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Light Variant</Text>
  <Checkbox variant="light" themeColor="primary" label="Light Primary" isChecked />
  <Checkbox variant="light" themeColor="success" label="Light Success" isChecked />
</View>
```

### Label Alignment Examples

```tsx
<View style={{ gap: 16, padding: 20 }}>
  <Checkbox
    label="Default (right aligned)"
    labelAlignment="right"
    isChecked={checked1}
    onValueChange={setChecked1}
  />

  <Checkbox
    label="Left aligned"
    labelAlignment="left"
    isChecked={checked2}
    onValueChange={setChecked2}
  />

  <Checkbox
    label="Settings"
    labelAlignment="justify-left"
    fullWidth
    isChecked={checked3}
    onValueChange={setChecked3}
  />

  <Checkbox
    label="Notifications"
    labelAlignment="justify-right"
    fullWidth
    isChecked={checked4}
    onValueChange={setChecked4}
  />
</View>
```

## Animations

The Checkbox component features smooth animations using React Native's built-in Animated API:

- **Checkmark animation** - SVG stroke-dashoffset animation for smooth checkmark drawing
- **Background scale** - Filled variant background scales from center when checking
- **Press animation** - Spring animation on press for tactile feedback
- **Opacity transitions** - Smooth fade in/out for checkmark

All animations are optimized for native performance using `useNativeDriver` where possible.

## Theme Integration

Checkbox integrates seamlessly with the XAUI theme system via `@xaui/core`:

```tsx
import { XUIProvider } from '@xaui/core'
import { Checkbox } from '@xaui/checkbox'

function App() {
  const [checked, setChecked] = React.useState(false)

  return (
    <XUIProvider>
      <Checkbox
        themeColor="primary"
        label="Themed Checkbox"
        isChecked={checked}
        onValueChange={setChecked}
      />
    </XUIProvider>
  )
}
```

## Accessibility

The component supports standard React Native accessibility props:

```tsx
<Checkbox
  label="Accept terms and conditions"
  isChecked={checked}
  onValueChange={setChecked}
  accessibilityLabel="Accept terms"
  accessibilityHint="Double tap to accept terms and conditions"
  accessibilityRole="checkbox"
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { CheckboxProps, CheckboxEvents } from '@xaui/checkbox'
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
