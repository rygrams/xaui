# Card

A surface that groups related content, drawn as Tram asks: the discreet surface with no
line and no shadow, the content separated by space and type — a title on the Tram scale
over a detail faded under it, the actions in a row.

With `isPressable` it is the control that opens what it shows, and it leans toward the
finger as the Tram `Button` does, with no highlight.

## Import

```tsx
import { Card } from '@xaui/tram/card'
```

## Anatomy

```tsx
<Card>
  <Card.Background />
  <Card.Header>
    <Card.Title />
    <Card.Description />
  </Card.Header>
  <Card.Body />
  <Card.Footer />
</Card>
```

- **`Card`** — the surface. It resolves the recipe once and hands the styles to its
  slots. A stringifiable child is wrapped in a `Card.Description`.
- **`Card.Background`** — a photo (`source`) or anything already positioned, across the
  whole card under its text. The root paints it first wherever it is written, clipped to
  the card's corner.
- **`Card.Header`** — the top of the card: its title and what describes it, in a column.
- **`Card.Body`** — the content.
- **`Card.Footer`** — the actions, in a row: the space between them is their only frame.
- **`Card.Title`** — the heading, on `body`, `subtitle` or `title` with the size. It wraps.
- **`Card.Description`** — the detail, in the title's ink faded to `muted`.

No slot carries a margin: the gap belongs to the root, so JSX order is screen order.

## Usage

### Basic

```tsx
<Card>
  <Card.Header>
    <Card.Title>night market</Card.Title>
    <Card.Description>tonight, 9 pm</Card.Description>
  </Card.Header>
  <Card.Footer>
    <Button variant="outline" size="sm">
      going
    </Button>
  </Card.Footer>
</Card>
```

### Pressable

```tsx
<Card isPressable onPress={open}>
  <Card.Title>invoice #1024</Card.Title>
</Card>
```

`isPressable` is a prop, not read off `onPress`: the two are different elements. A press
handler without it warns in development. `asChild` makes the caller's element the card.

### Background

```tsx
<Card variant="ghost" style={{ minHeight: 180, justifyContent: 'flex-end' }}>
  <Card.Background source={{ uri: cover }} />
  <Card.Title>marrakech</Card.Title>
</Card>
```

## Variants

Native's names, each saying how much ground the card has:

| Variant     | Drawn as                                          |
| ----------- | ------------------------------------------------- |
| `default`   | the discreet surface, no line, no shadow          |
| `secondary` | the next grey, for a card inside a card           |
| `tertiary`  | the page inside the theme's line                  |
| `ghost`     | nothing: the content on the page, Metro's own way |

```tsx
<Card variant="secondary">…</Card>
```

## Sizes

```tsx
<Card size="sm">…</Card>
<Card size="md">…</Card>
<Card size="lg">…</Card>
```

`size` drives the padding, the gaps, and the type of the title and description — never a
height.

## Colour

`accent` picks one of the twenty named accents. It fills a `default` or a `secondary`
card with its true colour, the title in the ink that reads on it; on a `tertiary` it is
the line, and on a `ghost` the title, both as the mode's ink. `color` takes a raw tint,
lands where `accent` does, and wins.

```tsx
<Card accent="cobalt">…</Card>
```

`isDisabled` dims the card and, on a pressable one, stops the touch.

## Accessibility

- A static card has no role: the text inside it is what a screen reader reads.
- A pressable card is a `button` by default, its `disabled` state merged with any you pass.
- A pressable card is one target: put the actions in the footer of a static card rather
  than nesting buttons in a pressable one.
- The press is felt through `TramProvider`'s `onHaptic`. The tilt runs on the `press`
  spring, or fades with motion reduced; under `disable-all` the card does not move.

## Differences from Native

- **No line and no shadow**: `default` is the discreet surface, and `ghost` is the
  content on the page.
- **`accent`** is added.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The press** leans the card toward the finger and changes no colour; Native scales it
  and lays a wash over it.
- **The corner** stays within 2, the Tram radius scale.
- **`Card.Background`** is marked with Native's symbol (`Symbol.for`), shared by the two
  packages.
