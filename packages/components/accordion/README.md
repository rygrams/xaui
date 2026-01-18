# @xaui/accordion

Accordion components for XAUI - A modern React Native UI library with Flutter-inspired API.

## Installation

```bash
npm install @xaui/accordion @xaui/core @xaui/colors
# or
pnpm add @xaui/accordion @xaui/core @xaui/colors
# or
yarn add @xaui/accordion @xaui/core @xaui/colors
```

## Usage

### Basic Example

```tsx
import { Accordion, AccordionItem } from '@xaui/accordion'

function MyComponent() {
  return (
    <Accordion>
      <AccordionItem itemKey="1" title="Section 1">
        Content for section 1
      </AccordionItem>
      <AccordionItem itemKey="2" title="Section 2">
        Content for section 2
      </AccordionItem>
      <AccordionItem itemKey="3" title="Section 3">
        Content for section 3
      </AccordionItem>
    </Accordion>
  )
}
```

### Variants

```tsx
<Accordion variant="light">
  {/* Light variant (default) */}
</Accordion>

<Accordion variant="bordered">
  {/* Bordered variant with border around the accordion */}
</Accordion>

<Accordion variant="splitted">
  {/* Splitted variant with spacing between items */}
</Accordion>
```

### Selection Modes

```tsx
{/* Toggle mode - only one item can be expanded at a time */}
<Accordion selectionMode="toggle">
  {/* ... */}
</Accordion>

{/* Multiple mode - multiple items can be expanded simultaneously */}
<Accordion selectionMode="multiple">
  {/* ... */}
</Accordion>
```

### Controlled Mode

```tsx
import { useState } from 'react'
import { Accordion, AccordionItem } from '@xaui/accordion'

function ControlledAccordion() {
  const [selectedKeys, setSelectedKeys] = useState(['1'])

  return (
    <Accordion selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
      <AccordionItem itemKey="1" title="Section 1">
        Content 1
      </AccordionItem>
      <AccordionItem itemKey="2" title="Section 2">
        Content 2
      </AccordionItem>
    </Accordion>
  )
}
```

### With Subtitle and Start Content

```tsx
import { View, Text } from 'react-native'
import { Accordion, AccordionItem } from '@xaui/accordion'

function AccordionWithExtras() {
  return (
    <Accordion variant="splitted">
      <AccordionItem
        itemKey="1"
        title="User Profile"
        subtitle="Manage your account settings"
        startContent={<Text>👤</Text>}
      >
        <Text>Profile content here</Text>
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        title="Security"
        subtitle="Password and authentication"
        startContent={<Text>🔒</Text>}
      >
        <Text>Security settings here</Text>
      </AccordionItem>
    </Accordion>
  )
}
```

### Custom Styles

```tsx
<Accordion
  variant="bordered"
  containerStyle={{ marginVertical: 20 }}
  itemStyle={{ paddingHorizontal: 10 }}
>
  <AccordionItem
    itemKey="1"
    title="Custom Styled Item"
    titleStyle={{ color: 'blue', fontWeight: 'bold' }}
    contentStyle={{ backgroundColor: '#f0f0f0' }}
  >
    Custom content
  </AccordionItem>
</Accordion>
```

## API

### Accordion Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | AccordionItem components |
| variant | 'light' \| 'bordered' \| 'splitted' | 'light' | Visual variant |
| selectionMode | 'toggle' \| 'multiple' | 'toggle' | Selection behavior |
| showDivider | boolean | false | Show dividers between items |
| hideIndicator | boolean | false | Hide expand/collapse indicator |
| fullWidth | boolean | true | Take full width |
| selectedKeys | string[] | - | Controlled selected keys |
| defaultSelectedKeys | string[] | [] | Default selected keys |
| disabledKeys | string[] | [] | Keys of disabled items |
| disableAnimation | boolean | false | Disable animations |
| isCompact | boolean | false | Compact mode |
| containerStyle | ViewStyle | - | Container styles |
| itemStyle | ViewStyle | - | Item wrapper styles |
| onSelectionChange | (keys: string[]) => void | - | Selection change callback |

### AccordionItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| itemKey | string | - | Unique key (required) |
| children | ReactNode | - | Item content |
| title | ReactNode | - | Item title |
| subtitle | ReactNode | - | Item subtitle |
| startContent | ReactNode | - | Content at start of header |
| indicator | ReactNode | ChevronRight | Custom indicator |
| baseStyle | ViewStyle | - | Base container style |
| headingStyle | ViewStyle | - | Heading style |
| triggerStyle | ViewStyle | - | Trigger button style |
| titleStyle | TextStyle | - | Title text style |
| subtitleStyle | TextStyle | - | Subtitle text style |
| contentStyle | ViewStyle | - | Content container style |
| startContentStyle | ViewStyle | - | Start content style |
| indicatorStyle | ViewStyle | - | Indicator style |
| onSelected | (isSelected: boolean) => void | - | Selection callback |

## License

MIT
