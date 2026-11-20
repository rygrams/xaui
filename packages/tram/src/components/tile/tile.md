# Tile

The live tile of the Metro start screen — icon, shortcut and widget in one square: a flat
fill of the accent that can carry a count, a name, a picture, and turn over to a second
face.

The tile is Tram's own: it has no Native equivalent. `Tile.Grid` lays tiles out as the
start screen did, each in the first hole it fits.

## Import

```tsx
import { Tile, useTileFace } from '@xaui/tram/tile'
```

## Anatomy

```tsx
<Tile.Grid>
  <Tile>
    <Tile.Image />
    <Tile.Front>
      <Tile.Icon />
      <Tile.Count />
      <Tile.Label />
    </Tile.Front>
    <Tile.Back />
  </Tile>
</Tile.Grid>
```

- **`Tile`** — the root: a pressable square. A text child is the tile's name, written as a
  `Tile.Label`.
- **`Tile.Front`**, **`Tile.Back`** — the two faces, for a tile that turns over. Only the
  face that shows is read by a screen reader.
- **`Tile.Label`** — the tile's name, in the caption role, on one line, truncated.
- **`Tile.Count`** — what a small tile has to say (unread mail, missed calls), in the title
  role, with digits of one width.
- **`Tile.Icon`** — a glyph at the tile's size, in the colour that reads on its fill. An
  explicit `size` or `color` wins.
- **`Tile.Image`** — a picture in place of the fill, on the tile or on one face, cropped
  to it.
- **`Tile.Grid`** — the start screen: square cells, as wide as its parent.

## Usage

### Basic

```tsx
<Tile size="small" onPress={openMail}>
  <Tile.Icon as={MailIcon} />
  <Tile.Count>7</Tile.Count>
</Tile>
```

### Two faces

The tile never turns on its own: the app holds `face`. `useTileFace(interval, isPaused)`
gives a cadence; give each tile its own interval, and pause it when the screen is out of
sight.

```tsx
const face = useTileFace(4000, !isFocused)

<Tile size="medium" face={face} onPress={openWeather}>
  <Tile.Front>
    <Tile.Count>29°</Tile.Count>
    <Tile.Label>weather</Tile.Label>
  </Tile.Front>
  <Tile.Back>
    <Tile.Label>storms near 5 pm</Tile.Label>
  </Tile.Back>
</Tile>
```

`transition="flip"` (the default) turns the tile over on the `tile` spring;
`transition="slide"` slides one face out as the other follows it in.

### Picture

What is written over a picture is set in white on a black band across the foot of the
square. `hasBand={false}` leaves the band out, for a photo already dark where the text
goes.

```tsx
<Tile size="wide">
  <Tile.Image source={cover} />
  <Tile.Label>music</Tile.Label>
</Tile>
```

### Grid

```tsx
<Tile.Grid columns={tramTileColumns.phone}>
  <Tile size="medium">…</Tile>
  <Tile size="small">…</Tile>
  <Tile size="wide">…</Tile>
</Tile.Grid>
```

`columns` is 4 by default — `tramTileColumns` (from `@xaui/tram/theme`) gives 4, 6 and 8
for a phone, a tablet and an open foldable. `gap` is in points. Each child's `size` is
read to place it, so a component wrapping a `Tile` has to take `size` and hand it down.
`placeTiles` exposes the placement on its own.

### The app's own text

`useTile()` returns `foreground`, the colour that reads on the tile, for text that is not
a `Tile.Label` or a `Tile.Count`.

## Variants

| Variant     | Drawn as                                       |
| ----------- | ---------------------------------------------- |
| `contained` | filled with the true colour                    |
| `flat`      | filled with its soft slice, the accent as ink  |
| `surface`   | the discreet surface — `accent` paints nothing |

Metro filled every tile with the accent; Tram spends it on a few and lets the rest sit
back.

## Sizes

| Size     | Cells     |
| -------- | --------- |
| `small`  | 1         |
| `medium` | 4 (2 × 2) |
| `wide`   | 8 (4 × 2) |

Not `sm` / `md` / `lg`: a wide tile is not a large one, it is a medium one twice as long.
Outside a grid a tile is as wide as it is told to be.

## Colour

The fill is the theme's accent. `accent` picks one of the twenty named accents; `color`
takes a raw `#RRGGBB` — the fill of a `contained`, the slice of a `flat` — and wins when
both are set. A `surface` tile has no accent to repaint.

## Accessibility

- The root has the `button` role; a disabled tile announces its state.
- Only the face that shows is exposed to a screen reader; the other is hidden.
- A picture says nothing to a screen reader: the tile is the button, its label the name.
- A press leans the tile toward the finger and is felt through `TramProvider`'s
  `onHaptic`. With motion reduced, nothing turns or travels: one face fades into the
  other.
