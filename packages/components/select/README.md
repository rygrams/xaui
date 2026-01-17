# @xaui/select

Select components for XAUI.

## Installation

```bash
pnpm add @xaui/select
```

## Usage

```tsx
import { Select, SelectItem } from '@xaui/select'

<Select
  label="Country"
  placeholder="Choose a country"
  selectionMode="single"
  defaultSelectedKeys={['fr']}
>
  <SelectItem key="fr" title="France" />
  <SelectItem key="es" title="Spain" />
</Select>
```

## Props

### Select

- `selectionMode`: `single | multiple`
- `selectedKeys`: `string[]`
- `disabledKeys`: `string[]`
- `defaultSelectedKeys`: `string[]`
- `variant`: `flat | outlined | faded | underlined | light`
- `themeColor`: `primary | secondary | tertiary | danger | warning | success | default`
- `size`: `sm | md | lg`
- `radius`: `none | sm | md | lg | full`
- `placeholder`: `string`
- `labelPlacement`: `inside | outside | outside-left | outside-top`
- `label`: `ReactNode`
- `hint`: `ReactNode`
- `errorMessage`: `ReactNode`
- `startContent`: `ReactNode`
- `endContent`: `ReactNode`
- `selectorIcon`: `ReactNode`
- `maxListboxHeight`: `number`
- `fullWidth`: `boolean`
- `isOpened`: `boolean`
- `isDisabled`: `boolean`
- `isInvalid`: `boolean`

### Events

- `onClose`: `() => void`
- `onOpenChange`: `(isOpen: boolean) => void`
- `onSelectionChange`: `(keys: string[]) => void`
- `onClear`: `() => void`

### SelectItem

- `title`: `ReactNode`
- `description`: `ReactNode`
- `startContent`: `ReactNode`
- `endContent`: `ReactNode`
- `selectedIcon`: `ReactNode`
- `isDisabled`: `boolean`
- `isSelected`: `boolean`
- `isReadOnly`: `boolean`
- `onSelected`: `() => void`
