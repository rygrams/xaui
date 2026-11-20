# DummyField

A field that is pressed rather than typed into, drawn as the Tram `TextField`'s box: a line
of 2 round a value it only shows. A press opens what sets the value — a sheet, a picker, a
page.

It is a `TextField`: the root is the Tram `TextField`'s, and `Description` and `Error` are
its slots. Under the finger the line takes the accent and gives it back on release; the
box does not move.

## Import

```tsx
import { DummyField } from '@xaui/tram/dummy-field'
```

## Anatomy

```tsx
<DummyField>
  <DummyField.Label />
  <DummyField.Field>
    <DummyField.Value />
    <DummyField.Indicator />
  </DummyField.Field>
  <DummyField.Description />
  <DummyField.Error />
</DummyField>
```

- **`DummyField`** — the root, the `TextField`'s column. `onPress` is what a press on the
  field — or on its label — does.
- **`DummyField.Label`** — the `TextField`'s label, which presses the field instead of
  focusing an input. A disabled field's label is plain text again.
- **`DummyField.Field`** — the box, and the control a screen reader stops on. Text
  children become a `DummyField.Value`; with no children it shows `value`, or
  `placeholder` in grey.
- **`DummyField.Value`** — what the field shows, on one line, or its `placeholder` until
  there is something to show.
- **`DummyField.Indicator`** — a glyph at the end of the field, a chevron unless given
  `as`, at the `Select`'s sizes. Left out, the row holds the value alone.
- **`DummyField.Description`**, **`DummyField.Error`** — the `TextField`'s help lines.

## Usage

### Basic

```tsx
<DummyField onPress={openSlots}>
  <DummyField.Label>delivery</DummyField.Label>
  <DummyField.Field placeholder="choose a slot">{slot}</DummyField.Field>
  <DummyField.Description>tap to change the slot.</DummyField.Description>
</DummyField>
```

### Composed

```tsx
<DummyField onPress={openCountries}>
  <DummyField.Label>country</DummyField.Label>
  <DummyField.Field>
    <DummyField.Value placeholder="choose a country">{country}</DummyField.Value>
    <DummyField.Indicator />
  </DummyField.Field>
</DummyField>
```

### Invalid

```tsx
<DummyField onPress={openCalendar} isInvalid={!day}>
  <DummyField.Label>date</DummyField.Label>
  <DummyField.Field placeholder="choose a date" value={day} />
  <DummyField.Error>a date, please.</DummyField.Error>
</DummyField>
```

`isInvalid` draws the line in `danger`; the label keeps its ink. It does not mount the
error: that stays the caller's.

## Sizes

```tsx
<DummyField size="sm">…</DummyField>
<DummyField size="md">…</DummyField>
<DummyField size="lg">…</DummyField>
```

`size` drives the box's height, padding, gaps and type — never width.

## Colour

`accent` takes one of the twenty named accents: the colour of the line under the finger,
read as ink. `color` takes a raw `#RRGGBB` and wins when both are set; it is ignored while
`isInvalid`.

## Accessibility

- `DummyField.Field` has the `button` role, is labelled by the label and described by the
  description and the error, and announces `disabled` and `aria-invalid`.
- `isRequired` tells a screen reader the field has to be filled; it draws nothing.
- The line moves on the `navigation` spring; with motion reduced it is a short timing.

## Differences from Native

- **No `variant`**, no `labelPlacement`, no `xs`: the Metro box has one drawing, its label
  above it.
- **`accent`** is added.
- **The label** keeps its ink when invalid.
- **The root** does not bridge the `TextField` context for a `FieldGroup`.
