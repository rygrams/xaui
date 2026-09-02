# Menu Components

Menu components provide a popup menu system with smooth animations and flexible positioning.

## Components

- **Menu**: Container component that displays a popup menu
- **MenuItem**: Individual menu item with support for start/end content

## Basic Usage

```tsx
import React, { useState } from 'react'
import { Button } from '@xaui/native/button'
import { Menu, MenuItem } from '@xaui/native/menu'

const MyComponent = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      trigger={<Button onPress={() => setVisible(true)}>Open Menu</Button>}
    >
      <MenuItem title="Item 1" onPress={() => console.log('Item 1')} />
      <MenuItem title="Item 2" onPress={() => console.log('Item 2')} />
      <MenuItem title="Item 3" onPress={() => console.log('Item 3')} />
    </Menu>
  )
}
```

## Menu Props

- `visible` (required): Whether the menu is currently visible
- `trigger` (required): The element that triggers the menu
- `position`: Position relative to trigger (`'top'` | `'bottom'`). Default: `'bottom'`
- `onDismiss`: Callback when menu is dismissed
- `children`: Menu items to display
- `customAppearance`: Custom styles for overlay, container, and content
- `maxHeight`: Maximum height for scrollable content. Default: `280`

## MenuItem Props

- `title` (required): The menu item title (string or ReactNode)
- `startContent`: Content to display at the start of the item
- `endContent`: Content to display at the end of the item
- `isDisabled`: Whether the item is disabled. Default: `false`
- `dense`: Use dense layout with reduced height. Default: `false`
- `onPress`: Callback when item is pressed
- `customAppearance`: Custom styles for container, content, and title
- `accessibilityLabel`: Accessibility label for screen readers

## Advanced Examples

### With Icons

```tsx
import { SettingsIcon, PersonIcon } from '@xaui/icons'
;<Menu visible={visible} onDismiss={handleDismiss} trigger={trigger}>
  <MenuItem
    title="Settings"
    startContent={<SettingsIcon size={20} />}
    onPress={handleSettings}
  />
  <MenuItem
    title="Profile"
    startContent={<PersonIcon size={20} />}
    onPress={handleProfile}
  />
</Menu>
```

### With Custom Appearance

```tsx
<Menu
  visible={visible}
  onDismiss={handleDismiss}
  trigger={trigger}
  customAppearance={{
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    container: { borderRadius: 16 },
  }}
>
  <MenuItem
    title="Custom Item"
    customAppearance={{
      container: { backgroundColor: '#f0f0f0' },
      title: { fontSize: 18, fontWeight: 'bold' },
    }}
  />
</Menu>
```

### Dense Menu Items

```tsx
<Menu visible={visible} onDismiss={handleDismiss} trigger={trigger}>
  <MenuItem title="Compact Item 1" dense />
  <MenuItem title="Compact Item 2" dense />
  <MenuItem title="Compact Item 3" dense />
</Menu>
```

### Disabled Items

```tsx
<Menu visible={visible} onDismiss={handleDismiss} trigger={trigger}>
  <MenuItem title="Active Item" onPress={handlePress} />
  <MenuItem title="Disabled Item" isDisabled />
</Menu>
```

## Features

- ✅ Portal-based rendering for proper z-index stacking
- ✅ Smooth enter/exit animations
- ✅ Automatic positioning (top/bottom)
- ✅ Scrollable content support with maxHeight
- ✅ Support for startContent and endContent
- ✅ Dense mode for compact layouts
- ✅ Disabled state support
- ✅ Fully typed with TypeScript
- ✅ Accessibility support
- ✅ Custom styling via customAppearance
