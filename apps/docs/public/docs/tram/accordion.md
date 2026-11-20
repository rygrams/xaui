# Accordion

A list of rows that open, drawn the Metro way: a title on the Tram scale and a plus at the
end that lies down into a minus as the panel unrolls, with no line anywhere — the rows are
told apart by their space, as in a Metro list.

An open row's title is written in the accent, as ink. A press tilts the row toward the
finger and changes no colour.

## Import

```tsx
import { Accordion } from '@xaui/tram/accordion'
```

## Anatomy

```tsx
<Accordion>
  <Accordion.Item value="…">
    <Accordion.Trigger>
      …
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>…</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

- **`Accordion`** — the root. Holds what is open and resolves every slot's style once.
- **`Accordion.Item`** — one row, identified by its `value`. Its children may be a
  function of `{ isExpanded, isDisabled, value }`.
- **`Accordion.Trigger`** — the part you press. A stringifiable child is wrapped in a
  `Text` and takes the row's type.
- **`Accordion.Indicator`** — the plus, drawn from two bars. `as` swaps in a glyph, which
  turns half a turn as the row opens.
- **`Accordion.Content`** — the panel. Mounted when open, absent when not.

## Usage

### Basic

```tsx
<Accordion defaultValue="trash">
  <Accordion.Item value="trash">
    <Accordion.Trigger>
      where do deleted files go?
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>
      <Typography variant="body">to the trash, for 30 days.</Typography>
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Several at a time

```tsx
<Accordion selectionMode="multiple" defaultValue={['formats']}>
  …
</Accordion>
```

The value becomes a list of the open rows.

### Always one open

```tsx
<Accordion defaultValue="a" isCollapsible={false}>
  …
</Accordion>
```

Pressing the open row leaves it open, and `onValueChange` does not fire.

### Controlled

```tsx
const [open, setOpen] = useState<AccordionValue>('trash')

<Accordion value={open} onValueChange={setOpen}>…</Accordion>
```

### Disabled

`isDisabled` on the root stops every row; on an `Accordion.Item` it stops that row alone.
A disabled row fades its trigger only.

## Variants

Native's four names, none of them drawing a border:

| Variant     | Ground                                       |
| ----------- | -------------------------------------------- |
| `ghost`     | the page (default)                           |
| `primary`   | the discreet surface, as the `Card`          |
| `secondary` | the accent's soft slice, the `Button`'s flat |
| `tertiary`  | drawn as `ghost`                             |

```tsx
<Accordion variant="primary">…</Accordion>
```

## Sizes

```tsx
<Accordion size="sm">…</Accordion>
<Accordion size="md">…</Accordion>
<Accordion size="lg">…</Accordion>
```

Rows 48, 56 and 64 tall, the title on `body`, `subtitle` and `title`.

## Colour

`accent` picks one of the twenty named accents: the open row's title, and the ground of
`secondary`. `color` takes a raw tint, wins over `accent`, and is never corrected.

```tsx
<Accordion accent="magenta">…</Accordion>
```

## Accessibility

- The trigger has the `button` role and carries `expanded` and `disabled`; the indicator
  is hidden from screen readers.
- A press is felt through `TramProvider`'s `onHaptic`.
- The row's height moves by a layout transition on the Metro curve. With motion reduced
  the height jumps, the panel fades in over 150 ms and the row does not tilt; under
  `disable-all` nothing moves.

## Differences from Native

- **No line anywhere**: `tertiary` (Native's outline) and `hasSeparator` are kept so the
  import is the whole migration, and draw nothing of their own; the `separator` slot is
  never rendered.
- **The indicator** is a plus of two bars that lies down into a minus, where Native's is a
  turning chevron (`indicatorBar` slot added).
- **`accent`** is added; an open row's title is the accent as ink.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The press** tilts the row and leaves its colours alone.
- **The corner** stays within 2, the Tram radius scale.
