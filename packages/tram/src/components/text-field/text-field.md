# TextField

A text field with its label, its hint and its error, drawn the Metro way: the ground inside
a 2-point line of ink, and the line in the accent once the field has the focus.

The root is the column, not the field: `TextField.Field` is the `TextInput` and takes its
props. A touch on the label gives the field the focus.

## Import

```tsx
import { TextField } from '@xaui/tram/text-field'
```

## Anatomy

```tsx
<TextField>
  <TextField.Label />
  <TextField.Field />
  <TextField.Description />
  <TextField.Error />
</TextField>
```

- **`TextField`** — the root: the column. It resolves the recipe and holds the state the
  slots read — invalid, disabled, required — and the ids that tie them together.
- **`TextField.Label`** — what the field is for, in the page's ink, above the box.
- **`TextField.Field`** — the `TextInput` itself. It takes everything `TextInput` takes
  except `editable`, which is `isDisabled` on the root.
- **`TextField.Description`** — the hint under the field, in the muted ink.
- **`TextField.Error`** — what is wrong with the value, in `danger` read as ink. It always
  renders what it is given: mounting it is the caller's condition.

## Usage

### Basic

```tsx
<TextField>
  <TextField.Label>email</TextField.Label>
  <TextField.Field
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
  />
  <TextField.Description>we never share it.</TextField.Description>
</TextField>
```

### Invalid

`isInvalid` draws the border in `danger`, focused or not. The label and the description
keep their ink.

```tsx
<TextField isInvalid={Boolean(error)}>
  <TextField.Label>password</TextField.Label>
  <TextField.Field secureTextEntry />
  {error ? <TextField.Error>{error}</TextField.Error> : null}
</TextField>
```

### Disabled and read-only

```tsx
<TextField isDisabled>…</TextField>

<TextField>
  <TextField.Label>account</TextField.Label>
  <TextField.Field readOnly value={account} />
</TextField>
```

A disabled field greys the border, the text and the label, and cannot be edited. A
`readOnly` field greys nothing and keeps its selection: its text can be copied.

### Several lines

A field on several lines is its own component: `TextArea`, from `@xaui/tram/text-area`.

## Sizes

```tsx
<TextField size="sm">…</TextField>
<TextField size="md">…</TextField>
<TextField size="lg">…</TextField>
```

`size` drives the field's height (40, 48, 56), its padding, the gaps and the type — never
the width. A box drawn under 48 gets a hit slop that makes up the touch target. `radius`
overrides the corner, within 2.

## Colour

The focused border is the theme's accent, read as ink: a line has to stand out on the
ground. `accent` picks one of the twenty named accents; `color` takes a raw `#RRGGBB`,
used as written, and wins when both are set. Neither applies while `isInvalid`.

```tsx
<TextField accent="lime">…</TextField>
```

A `borderColor` written on `TextField.Field` replaces the line, focused or not.

## Accessibility

- The field is named by the label (`aria-labelledby`) and described by the description
  and the error (`aria-describedby`), each slot carrying its own id.
- `isInvalid`, `isDisabled`, `isRequired` and `readOnly` reach the input as
  `aria-invalid`, `aria-disabled`, `aria-required` and `aria-readonly`. `isRequired` draws
  nothing.
- The focus is the border alone, moving on a spring; with motion reduced it is a short
  fade.

## Differences from Native

- **No `variant`**: Native's four are four fills of the box, and the Metro box has one —
  the ground, inside a line.
- **No `labelPlacement`**: a Metro label stands above its box.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`accent`** and **`isRequired`** are added.
- **The line** is 2 points of ink, the `Button`'s, not the theme's 3.
- **A touch on the label** gives the field the focus.
- **`isInvalid`** leaves the label and the description their ink.
- **Disabled** is grey, not dimmed.
- **No `TextField.TextArea`** slot: several lines are the `TextArea` component.
- **`TextField.Error`** carries an id the field is described by.
