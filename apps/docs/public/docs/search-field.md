# SearchField

## Overview

A query, with the mark that says so and the cross that takes it back. Imports from
`@xaui/native/search-field`. Run the `search-field` demo screen to try the real component
in light and dark mode.

It **is** a `TextField`: the same root, the same `size`, `radius`, `color`,
`labelPlacement`, `isInvalid` and `isDisabled`, and `Label`, `Description` and `Error` are
that component's own slots rather than wrappers around them. What differs is the fill —
two variants instead of four, neither carrying the `field` shadow — and the two marks.

The built-in magnifier is drawn with `react-native-svg`, an **optional** peer of this
package. `SearchField.Icon` takes an `as` for a project whose icon set already has one.

## Anatomy

```text
SearchField
  Label
  FieldGroup
    FieldGroup.Prefix → Icon
    Field
    Clear
  Description / Error
```

## Usage

```tsx
import { FieldGroup } from '@xaui/native/field-group'
import { SearchField } from '@xaui/native/search-field'
;<SearchField onValueChange={setQuery} onSearch={run}>
  <SearchField.Label>Find products</SearchField.Label>
  <FieldGroup>
    <FieldGroup.Prefix isDecorative>
      <SearchField.Icon />
    </FieldGroup.Prefix>
    <SearchField.Field placeholder="Search…" />
    <SearchField.Clear accessibilityLabel="Clear the search" />
  </FieldGroup>
  <SearchField.Description>Search by name, category, or SKU</SearchField.Description>
</SearchField>
```

**Typing and searching are two callbacks, on purpose.** `onValueChange` fires on every
keystroke and on the clear, which is what a list filtered in memory reads; `onSearch` fires
on the keyboard's search key, which is what a query costing a request waits for. A single
callback for both would make the caller debounce to tell them apart.

Use `value` with `onValueChange` for a controlled query, or `defaultValue` and let the
field keep its own. `SearchField.Clear` empties the box through the same path a keystroke
takes, so a filtered list comes back on its own. It renders nothing while the box is empty
— and it is its own `FieldGroup.Suffix`, unlike `Icon`, because a decorator is inset by the
field's own padding and an empty one would go on holding room for a cross that is not
there.

`SearchField.Field` takes everything `TextField.Field` takes except `value`,
`defaultValue`, `onChangeText` and `onSubmitEditing`, which are the root's. Its three
defaults — `autoCapitalize="none"`, `autoCorrect={false}` and `returnKeyType="search"` —
are the caller's to override.

## Props

Generated from TypeScript by `node tooling/component-docs/generate.mjs search-field`.
The root inherits TextField's styles, states, ref and `asChild` behavior.

<!-- props:start -->

### SearchFieldProps

Inherited React Native and composed component props remain available.

| Prop          | Type                                     | Description                                                                                                                                                         |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant       | `SearchFieldVariant \| undefined`        | The fill. Two, and `primary` is the default.                                                                                                                        |
| value         | `string \| undefined`                    | The query, controlled. Leave it unset and the field keeps its own.                                                                                                  |
| defaultValue  | `string \| undefined`                    | The query it starts with, uncontrolled.                                                                                                                             |
| onValueChange | `((query: string) => void) \| undefined` | Every keystroke, and the clear — this is what a field filtering as you type reads.                                                                                  |
| onSearch      | `((query: string) => void) \| undefined` | The search key on the keyboard. It is **not** every keystroke: a query that costs a request is submitted, and one that filters a list in memory is `onValueChange`. |

### SearchFieldFieldProps

Inherited React Native and composed component props remain available.

### SearchFieldIconProps

Inherited React Native and composed component props remain available.

| Prop  | Type                                             | Description                                                         |
| ----- | ------------------------------------------------ | ------------------------------------------------------------------- |
| as    | `ComponentType<IconComponentProps> \| undefined` | Replaces the built-in magnifier with an icon component of your own. |
| size  | `number \| undefined`                            | Overrides the field's own glyph size.                               |
| color | `string \| undefined`                            | A raw value (R7), never a token. Overrides the placeholder grey.    |

### SearchFieldClearProps

Inherited React Native and composed component props remain available.

<!-- props:end -->

## Slots

`Label`, `Description` and `Error` **are** the `TextField`'s slots, re-exported rather than
wrapped. `Field` is `TextField.Field` with the query and the search key taken over. `Icon`
is `FieldGroup.Icon` with the built-in magnifier as its default mark, so its size and
colour follow the field's own without being passed. `Clear` is the shared close button inside its own
`FieldGroup.Suffix`: it owns its press state, grows its target with `hitSlop`, and draws its
cross from two rotated bars when given no children. Each node accepts its own `style` and style props.

## Variants

Two, where the `TextField` has four:

| `variant`   | Fill              | For                                                    |
| ----------- | ----------------- | ------------------------------------------------------ |
| `primary`   | `fieldBackground` | A search box alone on a screen. The default.           |
| `secondary` | `defaultSoft`     | A search box on a surface — a sheet, a card, a header. |

Neither carries the `field` shadow the `TextField`'s `primary` has: a search box sits alone
rather than in a column of siblings, and there the elevation reads as a card that has lost
its content. `tertiary` and `ghost` are absent because a field with no fill cannot be told
from the text beside it once the placeholder is gone.

The edge, the focus colour and the `isInvalid` red are the `TextField`'s, which is handed
`tertiary` underneath. `color` is a raw tint (R7) and lands on the fill; the four sizes
(`xs`, `sm`, `md`, `lg`) and `radius` are inherited unchanged.

## Accessibility

The field carries `accessibilityRole="search"` and is associated with its label and its
description, so a screen reader reads both rather than falling back to the placeholder.
Give `Clear` an `accessibilityLabel` in your app's language — a cross says "clear" to
someone who can see it and nothing at all to someone who cannot; the component warns in
development when it is missing. Mark the prefix `isDecorative` so the magnifier hands its
touches to the field underneath. `isDisabled` stops the field and the cross together.

## Migration from legacy

This is a new component. There is no legacy SearchField to deprecate.
