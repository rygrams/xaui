# TextArea

A field of several lines with its label, its hint and its error: the Tram `TextField` on
several lines, the ground inside a 2-point line of ink, its text starting at the top.

It is a `TextField`. The root is the Tram `TextField`'s, unchanged — the same `size`,
`radius`, `accent`, `color`, `isInvalid`, `isDisabled`, `isRequired` and `asChild` — and
`Label`, `Description` and `Error` are its slots. Only the field differs, by being
multiline and by taking its height in lines.

## Import

```tsx
import { TextArea } from '@xaui/tram/text-area'
```

## Anatomy

```tsx
<TextArea>
  <TextArea.Label />
  <TextArea.Field />
  <TextArea.Description />
  <TextArea.Error />
</TextArea>
```

- **`TextArea`** — the root: the column. It takes `rows` and `maxRows`, where the field's
  shape is decided.
- **`TextArea.Label`** — the `TextField`'s label. A touch on it gives the field the focus.
- **`TextArea.Field`** — the multiline `TextInput`. It takes everything
  `TextField.Field` takes except `multiline`, which it sets.
- **`TextArea.Description`** — the `TextField`'s hint, in the muted ink.
- **`TextArea.Error`** — the `TextField`'s error, in `danger` read as ink. Mounting it is
  the caller's condition.

## Usage

### Basic

```tsx
<TextArea>
  <TextArea.Label>message</TextArea.Label>
  <TextArea.Field value={message} onChangeText={setMessage} />
  <TextArea.Description>three lines are enough.</TextArea.Description>
</TextArea>
```

### Rows

`rows` is how many lines tall the field starts (3 by default). The field grows with what
is typed up to `maxRows`, then scrolls; without `maxRows` it grows for as long as the text
goes on. A `height` in the field's `style` is the height it keeps.

```tsx
<TextArea rows={2} maxRows={5}>
  <TextArea.Label>comment</TextArea.Label>
  <TextArea.Field />
</TextArea>
```

### Invalid

```tsx
<TextArea isInvalid={isTooShort} isRequired>
  <TextArea.Label>reason</TextArea.Label>
  <TextArea.Field value={reason} onChangeText={setReason} />
  {isTooShort ? (
    <TextArea.Error>write at least ten characters.</TextArea.Error>
  ) : null}
</TextArea>
```

The border and the error are `danger`; the label and the description keep their ink.

### Disabled

```tsx
<TextArea isDisabled>…</TextArea>
```

The border, the text and the label turn grey, and the field takes no focus.

## Sizes

```tsx
<TextArea size="sm">…</TextArea>
<TextArea size="md">…</TextArea>
<TextArea size="lg">…</TextArea>
```

`size` sets the type and the padding, with lines 22, 26 and 32 tall. `rows` counts the
box's line and padding as well as its lines.

## Colour

As on the `TextField`: the focused border is the theme's accent read as ink, `accent`
picks one of the twenty named accents, and `color` takes a raw `#RRGGBB` that wins when
both are set. Neither applies while `isInvalid`.

## Accessibility

- The field is named by the label and described by the description and the error, as on
  the `TextField`; `isInvalid`, `isDisabled` and `isRequired` reach the input.
- The focus is the border alone, on a spring; with motion reduced it is a short fade.

## Differences from Native

- **No `variant`**: the Metro box has one fill — the ground, inside a line.
- **No `labelPlacement`**: the label stands above its box.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`accent`** and **`isRequired`** are added.
- **`rows`** counts the box's line as well as its padding.
