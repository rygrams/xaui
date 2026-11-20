# FieldGroup

A field with something beside it — a glyph, a unit, a country, a reveal toggle — drawn in
Metro as one box around a cell, the text and a cell, inside the `TextField`'s line of 2,
which takes the accent while the field has the focus.

It goes inside a `TextField` and replaces nothing but the field. The label, the help, the
error, `size`, the accent, `isInvalid` and `isDisabled` are the `TextField`'s, and so is
the box: its line, corner, ground and height are read off the field's style, so a group
and a plain field on one form are the same box.

## Import

```tsx
import { FieldGroup } from '@xaui/tram/field-group'
```

## Anatomy

```tsx
<TextField>
  <TextField.Label />
  <FieldGroup>
    <FieldGroup.Prefix>
      <FieldGroup.Icon />
    </FieldGroup.Prefix>
    <FieldGroup.Field />
    <FieldGroup.Suffix />
  </FieldGroup>
  <TextField.Description />
</TextField>
```

- **`FieldGroup`** — the box: one row, a cell, the field and a cell.
- **`FieldGroup.Field`** — `TextField.Field` itself, inside the box, with no line of its
  own.
- **`FieldGroup.Prefix`**, **`FieldGroup.Suffix`** — a cell at the start or the end.
  `isDecorative` decides what it is: a mark leaning on the text, or a key of its own.
- **`FieldGroup.Icon`** — a glyph at the box's size (16, 20 or 24, the `CloseButton`'s)
  in the placeholder's grey. `size` and `color` passed to it win.

## Usage

### A decorative mark

```tsx
<TextField>
  <TextField.Label>email</TextField.Label>
  <FieldGroup>
    <FieldGroup.Prefix isDecorative>
      <FieldGroup.Icon as={MailIcon} />
    </FieldGroup.Prefix>
    <FieldGroup.Field keyboardType="email-address" />
  </FieldGroup>
</TextField>
```

A decorative cell stands off the box's end by the field's padding, takes no touch — a tap
on it focuses the field — and leaves the accessibility tree.

### A unit

```tsx
<FieldGroup>
  <FieldGroup.Field keyboardType="decimal-pad" />
  <FieldGroup.Suffix isDecorative>
    <Text>kg</Text>
  </FieldGroup.Suffix>
</FieldGroup>
```

### A control

```tsx
<FieldGroup>
  <FieldGroup.Field secureTextEntry={!isShown} />
  <FieldGroup.Suffix>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isShown ? 'Hide' : 'Show'}
      onPress={toggle}
    >
      <FieldGroup.Icon as={EyeIcon} />
    </Pressable>
  </FieldGroup.Suffix>
</FieldGroup>
```

A control cell is a key: padded on both sides and ruled off from the text by the
`NumberField`'s rule in `muted`. It keeps its touches and its place for a screen reader.

### Under `asChild`

`asChild` merges the box into the single child: the caller's element draws the box, and
its line stays at rest.

The group has no `size` of its own: the `TextField`'s sets the box — 40, 48 or 56 tall.

## Accessibility

- The box has no role: the control is the field inside it.
- A decorative cell is hidden from screen readers on both platforms; a control cell is
  not, and names itself with its own `accessibilityRole` and `accessibilityLabel`.
- A prefix is not a label: write a `TextField.Label` as well.
- A disabled group takes the touches of both cells.

## Differences from Native

- **One row**, where Native lays its decorators over the field and pads it by their
  measured width. The context carries the box's focus and geometry instead of
  `prefixWidth` / `suffixWidth` and their setters, and `decoratorPadding` is not exported.
- **`isDecorative`** also decides how the cell is drawn.
- **`FieldGroup.Icon`** reads its size and the placeholder's grey from the group.
- **Under `asChild`** the caller's element draws the box and its line stays at rest.
