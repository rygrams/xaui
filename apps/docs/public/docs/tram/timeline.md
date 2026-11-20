# Timeline

What happened, in order, drawn as the Windows Phone timeline: each entry opens on a flat
tile of its date, and a line drops from one tile to the next, with the title and the
description beside it.

The tile is painted by the entry's `status`. The root counts its children so the line
stops at the last tile.

## Import

```tsx
import { Timeline } from '@xaui/tram/timeline'
```

## Anatomy

```tsx
<Timeline>
  <Timeline.Item>
    <Timeline.Leading />
    <Timeline.Rail>
      <Timeline.Marker />
      <Timeline.Connector />
    </Timeline.Rail>
    <Timeline.Content>
      <Timeline.Title />
      <Timeline.Description />
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

- **`Timeline`** — the root, a column of entries. It decides the tile paints once.
- **`Timeline.Item`** — one entry: a row of the tile, the rail and what happened, in JSX
  order. `status` paints its tile.
- **`Timeline.Leading`** — the tile that opens the entry: a flat square, its large line
  Light and its `caption` under it, set at the foot as a tile's name is.
- **`Timeline.Rail`** — the line to the next entry, hung under the tile. An entry with no
  `Leading` gets a square mark at the top of its rail instead.
- **`Timeline.Marker`** — a square of 12 in the entry's status, drawn only for an entry
  with no tile.
- **`Timeline.Connector`** — the line, 2 wide in the faint grey. It is left off under the
  last entry unless `force` is set.
- **`Timeline.Content`** — what happened, 16 from the tile, with the density's air under
  it.
- **`Timeline.Title`** — on `subtitle`. **`Timeline.Description`** — on `caption`, in grey.

## Usage

### Basic

```tsx
<Timeline>
  <Timeline.Item status="success">
    <Timeline.Leading caption="nov">16</Timeline.Leading>
    <Timeline.Rail />
    <Timeline.Content>
      <Timeline.Title>request received</Timeline.Title>
      <Timeline.Description>green room, four nights</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
  <Timeline.Item status="current">
    <Timeline.Leading caption="nov">18</Timeline.Leading>
    <Timeline.Rail />
    <Timeline.Content>
      <Timeline.Title>check-in</Timeline.Title>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

### Without a tile

```tsx
<Timeline.Item>
  <Timeline.Rail />
  <Timeline.Content>
    <Timeline.Title>note added</Timeline.Title>
  </Timeline.Content>
</Timeline.Item>
```

### A timeline that goes on

```tsx
<Timeline.Rail>
  <Timeline.Connector force />
</Timeline.Rail>
```

`force` draws the line under the last entry too.

### Density

`density` is the air under an entry: `comfortable` (28, the default) or `compact` (16).

## Status

| Status    | Tile                                 |
| --------- | ------------------------------------ |
| `default` | the accent                           |
| `current` | the page's ink, the text in its page |
| `muted`   | the faint grey                       |
| `success` | green                                |
| `warning` | amber                                |
| `danger`  | red                                  |

The text on a tile is in the ink that reads on its fill.

## Sizes

```tsx
<Timeline size="sm">…</Timeline>
<Timeline size="md">…</Timeline>
<Timeline size="lg">…</Timeline>
```

`size` sets the tile — 60, 76, 92 — and the type in it.

## Colour

`accent` picks one of the twenty named accents for the tiles of `default` entries; `color`
takes a raw tint and wins over it. Neither reaches `current` or the other statuses.

## Accessibility

- The timeline sets no role: it is a column of text read in order. The status is drawn,
  not announced — write it in the title or the description when it matters.
- Nothing moves, so there is nothing for reduced motion to change.

## Differences from Native

- **`Leading`** is the tile, not a time beside the rail, and takes `caption`.
- **`Rail`** hangs under the tile.
- **`Marker`** draws only for an entry with no tile, as a square of 12.
- **`Connector`** draws only below; `edge="above"` draws nothing.
- **No `itemAlign` or `align`**, no `marker` on the rail, no `asChild`.
- **`accent` and `color`** reach `default` tiles only, not `current`.
