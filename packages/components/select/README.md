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
