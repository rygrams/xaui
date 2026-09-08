# ColorPicker

## Overview

A colour, chosen off a palette. Imports from `@xaui/native/color-picker`. Run the
`color-picker` demo screen to try the real component in light and dark mode.

**Two arrangements, one component.** The **dialog** is a field that opens the palette — the
legacy picker's shape — and the **grid** is that palette on its own, for a settings row or a
theme editor where there is nothing to open. Neither is a mode the root is told about: the
caller writes the slots they want, and a picker with no `Content` in it never mounts a
dialog.

It owns almost nothing. The field is a `DummyField` — the v1 name of the `InputTrigger` the
legacy picker opened its sheet from — and the panel is a `Dialog`, both by construction
rather than by resemblance, so a colour field and a select in one form cannot drift apart.
What this component adds is the chip, the grid and the wiring between them.

## Anatomy

```text
ColorPicker
  Label
  FieldGroup
    FieldGroup.Prefix → Preview
    Field
  Description / Error
  Overlay
  Content
    Title / Close
    Grid
      Group
        Swatch
```

## Usage

```tsx
import { ColorPicker } from '@xaui/native/color-picker'
import { FieldGroup } from '@xaui/native/field-group'
;<ColorPicker value={brand} onValueChange={setBrand}>
  <ColorPicker.Label>Brand colour</ColorPicker.Label>
  <FieldGroup>
    <FieldGroup.Prefix isDecorative>
      <ColorPicker.Preview />
    </FieldGroup.Prefix>
    <ColorPicker.Field placeholder="Pick a colour" />
  </FieldGroup>
  <ColorPicker.Description>Used across the whole app.</ColorPicker.Description>
  <ColorPicker.Overlay />
  <ColorPicker.Content>
    <ColorPicker.Title>Pick a colour</ColorPicker.Title>
    <ColorPicker.Grid />
  </ColorPicker.Content>
</ColorPicker>
```

The grid on its own — no field, no dialog, nothing to open:

```tsx
<ColorPicker value={brand} onValueChange={setBrand} closeOnSelect={false}>
  <ColorPicker.Grid scrollEnabled={false} />
</ColorPicker>
```

A palette of your own, composed rather than configured:

```tsx
<ColorPicker value={brand} onValueChange={setBrand} closeOnSelect={false}>
  <ColorPicker.Group name="Recently used">
    <ColorPicker.Swatch color="#7c3aed" accessibilityLabel="Violet 600" />
    <ColorPicker.Swatch color="#0ea5e9" accessibilityLabel="Sky 500" />
  </ColorPicker.Group>
</ColorPicker>
```

Use `value` with `onValueChange` for a controlled colour, or `defaultValue` and let the
picker hold its own. The value is a hex string, and `ColorPicker.Field` writes it in upper
case because a hex is a code rather than a word. Choosing a swatch closes the dialog;
`closeOnSelect={false}` keeps it open, which is also what a grid on a page wants.

`colors` replaces the palette. It defaults to `TAILWIND_PALETTE` — the seventeen Tailwind
hues plus Zinc, at eight steps each — which is exported from the same subpath, so a picker
that wants a subset filters it rather than restating it.

## Props

Generated from TypeScript by `node tooling/component-docs/generate.mjs color-picker`.
The root inherits DummyField's column, styles, states, ref and `asChild` behavior.

<!-- props:start -->

### ColorPickerProps

Inherited React Native and composed component props remain available.

| Prop           | Type                                       | Description                                                                                                                                                                                                    |
| -------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| variant        | `ColorPickerVariant \| undefined`          | The **field**'s emphasis. It never reaches the grid, which is not a field.                                                                                                                                     |
| size           | `Size \| undefined`                        | The field's height, its padding and the grid's cell. Never width.                                                                                                                                              |
| radius         | `RadiusKey \| undefined`                   | The field's corner, the chip's and the swatch's. The dialog keeps the `Dialog`'s.                                                                                                                              |
| color          | `string \| undefined`                      | A raw tint (`'#7c3aed'`), never a token (R7). It dresses the field, and it is the ring around the chosen swatch — the legacy picker's `themeColor`, which drove the same two.                                  |
| labelPlacement | `DummyFieldLabelPlacement \| undefined`    | Above the box, or lifted into it.                                                                                                                                                                              |
| value          | `string \| undefined`                      | The chosen colour, as a hex string. Controlled — leave it out and the picker holds its own.                                                                                                                    |
| defaultValue   | `string \| undefined`                      |                                                                                                                                                                                                                |
| onValueChange  | `((color: string) => void) \| undefined`   | Every choice, including one made in a grid that stays open.                                                                                                                                                    |
| isOpen         | `boolean \| undefined`                     | Controlled open state of the dialog. Ignored by a grid with no dialog in it.                                                                                                                                   |
| defaultOpen    | `boolean \| undefined`                     |                                                                                                                                                                                                                |
| onOpenChange   | `((isOpen: boolean) => void) \| undefined` |                                                                                                                                                                                                                |
| colors         | `readonly ColorGroup[] \| undefined`       | What the grid draws. Defaults to `TAILWIND_PALETTE` — the seventeen hues plus Zinc, at eight steps each.                                                                                                       |
| closeOnSelect  | `boolean \| undefined`                     | Whether choosing a colour closes the dialog. On by default: a picker whose only job is one colour has been answered the moment a swatch is pressed. Off for a grid on a page, where there is nothing to close. |
| isInvalid      | `boolean \| undefined`                     | Paints the field's border, label and description in `danger`.                                                                                                                                                  |
| isDisabled     | `boolean \| undefined`                     | Dims the field and stops the dialog, the field and every swatch together.                                                                                                                                      |
| children       | `ReactNode`                                |                                                                                                                                                                                                                |
| asChild        | `boolean \| undefined`                     |                                                                                                                                                                                                                |

### ColorPickerFieldProps

Inherited React Native and composed component props remain available.

### ColorPickerPreviewProps

Inherited React Native and composed component props remain available.

| Prop  | Type                  | Description                                                                         |
| ----- | --------------------- | ----------------------------------------------------------------------------------- |
| color | `string \| undefined` | A colour of your own. Unset, it is the chosen one — which is the point of the chip. |

### ColorPickerContentProps

Inherited React Native and composed component props remain available.

| Prop     | Type        | Description |
| -------- | ----------- | ----------- |
| children | `ReactNode` |             |

### ColorPickerGridProps

Inherited React Native and composed component props remain available.

### ColorPickerGroupProps

Inherited React Native and composed component props remain available.

| Prop     | Type        | Description                                                                                                                                                |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `ReactNode` | The hue's name, drawn above the row. A string is wrapped in the label's own `Text` (R3); an element is rendered as it is. Unset, the row carries no label. |
| children | `ReactNode` | The swatches.                                                                                                                                              |

### ColorPickerSwatchProps

Inherited React Native and composed component props remain available.

| Prop               | Type                                                                                    | Description                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color              | `string`                                                                                | The colour this cell offers.                                                                                                                              |
| accessibilityLabel | `string \| undefined`                                                                   | What a screen reader reads. Unset, it is the colour's own hex — pass the name a designer would use ("Violet 600"), which is what `ColorPicker.Grid` does. |
| style              | `StyleProp<ViewStyle> \| ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)` | R9 — `Pressable`'s function form as much as an object or an array.                                                                                        |

<!-- props:end -->

## Slots

`Label`, `Description` and `Error` **are** the `DummyField`'s slots, and `Overlay`, `Title`
and `Close` **are** the `Dialog`'s — re-exported rather than wrapped. `Field` is
`DummyField.Field` with the chosen colour filled in as its value and the root's press
attached. `Preview` is the chip, a `View` rather than a control: the field around it is what
opens the dialog, and it wears a dashed edge while nothing is chosen so the field's text does
not shift the first time it is used. `Content` is `Dialog.Content` with the picker's context
put back on the far side of the portal; with no children it is the grid alone. `Grid` is a
`ScrollView` of `Group`s, and `Group` is a wrapping row of `Swatch`es. Each node accepts its
own `style` and style props.

## Variants

The `DummyField`'s four — `primary`, `secondary`, `tertiary`, `ghost` — dress the **field**,
and the four sizes (`xs`, `sm`, `md`, `lg`) drive the field's height and the grid's cell:
24, 28, 32 and 34 points, with a four-point gutter between them at every size. The cell is
as large as a row of eight allows — 8×32 + 7×4 is 284 inside the 310 a dialog leaves on a
phone — because a ramp that wrapped halfway through itself would read as two colours rather
than one getting darker.

`color` is a raw tint (R7). It dresses the field and it is the ring around the chosen
swatch — the legacy picker's `themeColor`, which drove the same two. `radius` moves the
field's corner, the chip's and the swatch's together; the dialog keeps the `Dialog`'s own,
because a picker asked for a pill of a trigger did not ask for a pill of a panel.

The ring is drawn at **every** cell, transparent until the cell is the answer, so choosing a
colour changes one colour and moves nothing — where thickening a border, which is what the
legacy picker did, shrank the swatch under it at the moment it was pressed.

## Accessibility

The grid is the radio group and each swatch is a radio: a reader chooses one colour out of
the palette, and the rows are how it is arranged rather than what is being asked. Every
swatch carries a label — `ColorPicker.Grid` passes the palette's own name, "Violet 600", and
a hand-written `Swatch` should be given one, because a colour is not text and the hex is
what it falls back to. Mark the prefix `isDecorative` so the chip hands its touches to the
field. `isDisabled` stops the field, the dialog and every swatch together.

## Migration from legacy

| Legacy                  | v1                                                                  |
| ----------------------- | ------------------------------------------------------------------- |
| `onColorChange`         | `onValueChange` — the vocabulary every other picker already used    |
| `label` / `description` | `ColorPicker.Label` / `ColorPicker.Description`, siblings not props |
| `errorMessage`          | `ColorPicker.Error`, mounted by the caller                          |
| `themeColor`            | `color`, a raw value                                                |
| `variant="colored"`     | `variant`, the field's four levels                                  |
| `colorGroups`           | `colors`, and `TAILWIND_PALETTE` is the default                     |
| `defaultColorGroups`    | `TAILWIND_PALETTE`                                                  |
| `sheetTitle`            | `ColorPicker.Title`, a slot                                         |
| `sheetStyle`            | `style` on `ColorPicker.Content`                                    |
| `swatchSize`            | `size`, which moves the field and the cell together                 |
| `isOpened`              | `isOpen` / `defaultOpen`                                            |
| `fullWidth`             | gone — a column fills its parent, which is RN's own behaviour       |
| a bottom sheet          | a `Dialog`, or no overlay at all with `ColorPicker.Grid`            |

The legacy palette's `Lime` group held green values and its `Neutral` group held eleven
entries where every other held eight. `TAILWIND_PALETTE` is eighteen ramps of the same
eight steps, so the grid is rectangular and Lime is lime.
