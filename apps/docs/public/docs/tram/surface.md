# Surface

A ground for other things to sit on, drawn flat: the discreet grey of the Tram design, or
the page inside a thin grey line — never a shadow.

One node and no slots: a fill, a corner and some padding. What goes on it is yours. Metro
laid its content on the ground, so a surface is the exception, not the frame.

## Import

```tsx
import { Surface } from '@xaui/tram/surface'
```

## Anatomy

```tsx
<Surface />
```

- **`Surface`** — the root and its only node. It resolves the recipe and draws the ground;
  its children are laid in a column with the size's gap.

## Usage

### Basic

```tsx
<Surface>
  <Typography variant="body">on the discreet surface</Typography>
</Surface>
```

### Nested

A `secondary` inside a `primary` is drawn by its line, since there is no second grey.

```tsx
<Surface>
  <Typography variant="body">primary</Typography>
  <Surface variant="secondary" size="sm">
    <Typography variant="caption">secondary</Typography>
  </Surface>
</Surface>
```

### As child

`asChild` draws the ground on the element you pass instead of a `View`.

## Variants

Two grounds, under Native's first two names:

| Variant     | Drawn as                                  |
| ----------- | ----------------------------------------- |
| `primary`   | the discreet surface, a grey off the page |
| `secondary` | the page itself, inside a thin grey line  |

```tsx
<Surface variant="primary">…</Surface>
<Surface variant="secondary">…</Surface>
```

The line of `secondary` is 2 points in `muted`: an outline rather than a frame, softer than
the page's ink so it does not read as a control.

## Sizes

```tsx
<Surface size="sm">…</Surface>
<Surface size="md">…</Surface>
<Surface size="lg">…</Surface>
```

`size` moves the padding (12, 16, 20) and the gap — never a height. A surface is as tall as
what it holds. `radius` overrides the corner, within the Tram ceiling of 2.

## Colour

`accent` picks one of the twenty named accents. It fills a `primary` with its true colour,
and draws the line of a `secondary` as the mode's ink, so a yellow line still reads on a
white page. `color` takes a raw value, lands where `accent` does, wins over it and is
never corrected.

```tsx
<Surface accent="cobalt">
  <Typography variant="body" color="#FFFFFF">
    cobalt
  </Typography>
</Surface>
<Surface variant="secondary" color="#7c3aed">…</Surface>
```

The text on a filled surface is yours to colour: the surface does not pick an ink for it.

## Accessibility

- A surface is a plain `View` with no role. It reports nothing; give it a role or a label
  yourself when the group it draws means something to a screen reader.

## Differences from Native

- **`variant`** is `primary` or `secondary`. Native's grey `secondary` and its `tertiary`
  are dropped: one grey is all the design has, and the outlined ground takes the second
  name.
- **`isElevated`** is dropped: a Tram surface is never lifted off the page, and no variant
  has a shadow.
- **`accent`** is added: a fill in its true colour, or a line as the mode's ink.
- **`size`** is `sm`, `md` or `lg` and moves the padding and gap only; Native also has `xs`
  and its size moves the corner too.
- **The corner** stays within 2, the Tram radius scale.
