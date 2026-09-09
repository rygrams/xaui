# DummyField

A field container styled identically to a text input (`TextField`), but non-editable and
pressable. Designed as a trigger for pickers, modals, bottom sheets, menus, or file selection —
or for presenting a read-only field value that can be tapped.

Renamed from legacy `InputTrigger` to match the `*Field` vocabulary (`TextField`, `MaskField`,
`NumberField`, `TimeField`) and avoid clashing with the `*.Trigger` slot vocabulary of overlay
compounds (`Select.Trigger`, `Popover.Trigger`, `Menu.Trigger`).

## Import

```tsx
import { DummyField } from '@xaui/native/dummy-field'
```

## Usage

### Basic trigger

```tsx
<DummyField onPress={openCountrySheet}>
  <DummyField.Label>Country</DummyField.Label>
  <DummyField.Field placeholder="Select country">{selectedCountry}</DummyField.Field>
  <DummyField.Description>Where you reside.</DummyField.Description>
</DummyField>
```

### Composed with Indicator

```tsx
<DummyField onPress={openDatePicker}>
  <DummyField.Label>Appointment date</DummyField.Label>
  <DummyField.Field>
    <DummyField.Value placeholder="Pick a date">{appointmentDate}</DummyField.Value>
    <DummyField.Indicator />
  </DummyField.Field>
</DummyField>
```

### Inside label

```tsx
<DummyField labelPlacement="inside" onPress={openPicker}>
  <DummyField.Label>Category</DummyField.Label>
  <DummyField.Field placeholder="Choose category">{category}</DummyField.Field>
</DummyField>
```

### Inside a `FieldGroup`

```tsx
<DummyField onPress={pickFile}>
  <DummyField.Label>Attachment</DummyField.Label>
  <FieldGroup>
    <FieldGroup.Prefix isDecorative>
      <Icon as={FileIcon} />
    </FieldGroup.Prefix>
    <DummyField.Field placeholder="Select a file..." />
    <FieldGroup.Suffix>
      <Icon as={UploadIcon} />
    </FieldGroup.Suffix>
  </FieldGroup>
</DummyField>
```

## Anatomy

- **The root is the column (`DummyFieldRoot`), not the field.** It renders the outer `View` that stacks
  `DummyField.Label`, `DummyField.Field`, `DummyField.Description`, and `DummyField.Error`.
- **`DummyField.Field` is the pressable control.** It renders a `PressableFeedback`, forwards refs,
  applies pressed styling, and receives touch interactions.
- **`DummyField.Value` is the content text.** It renders the selected text or the placeholder in
  `fieldPlaceholder` colour when empty.
- **`DummyField.Indicator` is the affordance glyph.** Defaults to `ChevronDownIcon` and inherits
  glyph size and color from the resolved recipe context.

## Props

### `DummyField` (Root)

| Prop             | Type                                                | Default       | Description                                      |
| ---------------- | --------------------------------------------------- | ------------- | ------------------------------------------------ |
| `variant`        | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost'` | `'secondary'` | Visual emphasis of the field box                 |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg'`                      | `'md'`        | Height, horizontal padding, type size, and gaps  |
| `radius`         | `RadiusKey`                                         | `'field'`     | Corner radius override                           |
| `labelPlacement` | `'outside' \| 'inside'`                             | `'outside'`   | Outside in column flow or lifted inside the box  |
| `color`          | `string`                                            | —             | Raw tint override                                |
| `isInvalid`      | `boolean`                                           | `false`       | Turns border, label, and description to `danger` |
| `isDisabled`     | `boolean`                                           | `false`       | Reduces opacity and disables press interactions  |
| `onPress`        | `(event: GestureResponderEvent) => void`            | —             | Field press handler passed through context       |
| `asChild`        | `boolean`                                           | `false`       | Merge props and refs into single child element   |

### `DummyField.Field`

| Prop          | Type         | Default | Description                                    |
| ------------- | ------------ | ------- | ---------------------------------------------- |
| `placeholder` | `string`     | —       | Text shown when no value or child is provided  |
| `value`       | `ReactNode`  | —       | Value to display when child is not passed      |
| `onPress`     | `() => void` | —       | Called on press; composed with root `onPress`  |
| `asChild`     | `boolean`    | `false` | Merge props and refs into single child element |

### `DummyField.Value`

| Prop            | Type     | Default | Description                                    |
| --------------- | -------- | ------- | ---------------------------------------------- |
| `placeholder`   | `string` | —       | Text shown when empty                          |
| `numberOfLines` | `number` | `1`     | Maximum number of text lines before truncating |

### `DummyField.Indicator`

| Prop | Type                                | Default           | Description                |
| ---- | ----------------------------------- | ----------------- | -------------------------- |
| `as` | `ComponentType<IconComponentProps>` | `ChevronDownIcon` | Custom indicator component |
