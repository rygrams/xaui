# Chip

A compact token — a status, a tag, a filter, a person — drawn as the `Button`'s sharp
rectangle made small: 24, 32 or 40 tall, square corners, in the `Button`'s four drawings.

A static chip is a `View`. `isPressable` makes it a control that tilts toward the finger,
as the `Button` does, and changes no colour.

## Import

```tsx
import { Chip } from '@xaui/tram/chip'
```

## Anatomy

```tsx
<Chip>
  <Chip.Dot />
  <Chip.Avatar />
  <Chip.Icon />
  <Chip.Label />
  <Chip.Close />
</Chip>
```

- **`Chip`** — the root. It resolves the recipe once and hands the resolved styles to its
  slots. A string child is wrapped in a `Chip.Label` for you.
- **`Chip.Label`** — the text, on one line.
- **`Chip.Dot`** — a small square before the label, in the ink — on `flat`, the true colour
  the soft fill stands for.
- **`Chip.Icon`** — a glyph at the chip's size and in its ink. It takes `Icon`'s three
  forms: `as`, a raw SVG child, or `source`.
- **`Chip.Avatar`** — a square, chip-sized frame. `source` lays a photo over it; without
  one, the children are its content.
- **`Chip.Close`** — the cross at the end: two bars of the `Button`'s line, no circle. It
  is a control of its own, so a static chip can still be dismissed.

## Usage

### Basic

```tsx
<Chip>new</Chip>
```

### Composed

JSX order is screen order. No slot carries a margin: the gap belongs to the root.

```tsx
<Chip variant="flat" accent="green">
  <Chip.Dot />
  <Chip.Label>delivered</Chip.Label>
</Chip>
```

### Dismissible

```tsx
<Chip variant="outline">
  <Chip.Avatar source={{ uri: photo }} />
  <Chip.Label>inès</Chip.Label>
  <Chip.Close accessibilityLabel="Remove Inès" onPress={remove} />
</Chip>
```

The cross is smaller than a finger: its touch reaches past it to 48.

### Filter

```tsx
<Chip isPressable variant={isOn ? 'contained' : 'outline'} onPress={toggle}>
  unread
</Chip>
```

A press handler needs `isPressable`; without it the chip is a `View` that never receives
the touch, and a development warning says so.

## Variants

The `Button`'s four drawings, in the accent or in `color`. `contained` is the default.

| Variant     | Drawn as                          |
| ----------- | --------------------------------- |
| `contained` | filled with the true colour       |
| `flat`      | filled with its soft slice        |
| `outline`   | the `Button`'s line and the label |
| `text`      | the label alone                   |

```tsx
<Chip variant="contained">contained</Chip>
<Chip variant="flat">flat</Chip>
<Chip variant="outline">outline</Chip>
<Chip variant="text">text</Chip>
```

## Sizes

```tsx
<Chip size="sm">sm</Chip>
<Chip size="md">md</Chip>
<Chip size="lg">lg</Chip>
```

24, 32 and 40 tall; `md` is the default. A pressable chip reaches 48 through `hitSlop`.

## Colour

A status is a colour, not a variant: `accent="green"` for a success, `amber` for a
warning, `red` for a danger. `accent` takes one of the twenty named Metro accents; `color`
takes a raw tint, is never corrected, and wins when both are set.

```tsx
<Chip variant="flat" accent="amber">pending</Chip>
<Chip variant="outline" color="#7c3aed">raw</Chip>
```

`radius` overrides the Tram corner of 2, on the theme's scale, so it stays within 2.

## Accessibility

- A pressable chip has the `button` role and announces `disabled`; a static chip has no
  role of its own.
- `Chip.Close` needs an `accessibilityLabel` — the cross has no text to read.
- The press tilt is dropped when animations are disabled.

## Differences from Native

- **`variant`** is `contained`, `flat`, `outline` or `text` — the `Button`'s four drawings
  for Native's eleven names. A status is an `accent`.
- **`accent`** is added: one of the twenty named accents.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The shape** is a sharp rectangle with a corner of 2, not a capsule; the dot and the
  avatar are squares, not circles.
- **The cross** is two bars of the `Button`'s line with no circle.
- **The press** of `isPressable` tilts the chip and changes no colour (no `pressed` state).
