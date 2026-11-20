# ToggleButton

A button that keeps whether it is chosen, drawn the Metro way: a rectangle with sharp
corners, the ground in a 2-point line of ink, filled with the accent once chosen.

Fill, line, label and icon fade together on one shared value. A group draws its buttons as
one frame with bars between the cases, and the whole group leans toward the finger.

## Import

```tsx
import { ToggleButton } from '@xaui/tram/toggle-button'
```

## Anatomy

```tsx
<ToggleButton.Group>
  <ToggleButton>
    <ToggleButton.Icon />
    <ToggleButton.Label />
  </ToggleButton>
</ToggleButton.Group>
```

- **`ToggleButton`** — the root: a pressable that keeps its state. String children are
  wrapped in a `ToggleButton.Label`; `children` may also be a function of `isSelected`,
  `isPressed` and `isDisabled`, for a glyph that changes with the state.
- **`ToggleButton.Label`** — the text on one line, on the `Button`'s type. The case is the
  app's.
- **`ToggleButton.Icon`** — an icon in the label's colour, at the button's size, fading
  with it. It takes `Icon`'s forms; a `color` given here holds in both states.
- **`ToggleButton.Group`** — one choice among a few, drawn as one box. A button joins it
  by naming a `value`.

## Usage

### Basic

```tsx
<ToggleButton defaultSelected>favourite</ToggleButton>
```

### Controlled

```tsx
<ToggleButton isSelected={isBold} onSelectedChange={setBold}>
  bold
</ToggleButton>
```

### Composed and icon only

```tsx
<ToggleButton defaultSelected>
  <ToggleButton.Icon as={StarIcon} />
  <ToggleButton.Label>favourite</ToggleButton.Label>
</ToggleButton>

<ToggleButton isIconOnly accessibilityLabel="Favourite">
  <ToggleButton.Icon as={StarIcon} />
</ToggleButton>
```

`isIconOnly` drops the horizontal padding and squares the box on its height.

### Group

```tsx
<ToggleButton.Group defaultValue="list">
  <ToggleButton value="list">list</ToggleButton>
  <ToggleButton value="grid">grid</ToggleButton>
</ToggleButton.Group>
```

The group draws a 2-point frame of ink and a bar of the same line between every two
buttons; the chosen one fills its whole case. A press chooses, never clears.
`orientation` is `horizontal` (the default) or `vertical`. The group takes the width of its
content; stretched (`alignSelf: 'stretch'`, a width, a `flex`), its cases share the width
equally. It hands down `size`, `radius`, `accent`, `color` and `isDisabled`; a button's
own value wins, but a disabled group has no enabled button.

## Variants

| Variant   | Released                    | Chosen                                    |
| --------- | --------------------------- | ----------------------------------------- |
| `outline` | the ground in a line of ink | a flat fill of the accent, its text on it |
| `text`    | the label alone, in the ink | the label alone, in the accent as ink     |

```tsx
<ToggleButton variant="outline">outline</ToggleButton>
<ToggleButton variant="text">text</ToggleButton>
```

Inside a group a button is always a case of the group's box.

## Sizes

```tsx
<ToggleButton size="sm">sm</ToggleButton>
<ToggleButton size="md">md</ToggleButton>
<ToggleButton size="lg">lg</ToggleButton>
```

40, 48 and 56 tall, with the `Button`'s type and paddings — never width. `radius` is 0 by
default whatever the theme says, and capped at 2.

## Colour

The chosen state is the theme's accent. `accent` picks one of the twenty named accents;
`color` takes a raw tint, wins over it and is never corrected. On a fill the label and
icon are in `onAccent`: black on lime, amber or yellow.

## Accessibility

- Alone, the button has the `button` role with `aria-pressed` and `selected`.
- In a group, the group is a `radiogroup` and each case a `radio` with `aria-checked` and
  `checked`. The bars are hidden from screen readers.
- On the web the arrow keys go from case to case past a disabled one, with one tab stop
  per group; the focus ring is a square line of ink inside the box.
- A press is felt as `press`, a change of state as `selection`, through `TramProvider`'s
  `onHaptic`.
- With motion reduced nothing tilts and the colours fade in 150 ms.
- Disabled is grey with no opacity.

## Differences from Native

- **`variant`** is `outline` (the default) or `text`. Native's `primary`, `secondary` and
  `ghost` are emphases; Tram has one colour to spend.
- **`radius`** is 0 by default whatever the theme, and a case of a group has no corner of
  its own.
- **`accent`** is added; `color` wins over it and is never corrected.
- **The group** is one frame with bars, with no `variant`, and does not wrap (Native's row
  wraps, with a gap).
- **The press** leans the box toward the finger — or, in a group, the whole group.
- **Disabled** is grey, not dimmed.
- **In a group** each case is a `radio`; Native's default stays `button`.
