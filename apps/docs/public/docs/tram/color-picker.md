# ColorPicker

A colour chosen off a palette, drawn as the Windows Phone accents page: a field that shows
the chosen colour as a square and its name, and a full-screen page of swatches that
swivels in on its top edge.

The field is the Tram `DummyField`. The palette is the twenty Tram accents
(`TRAM_PALETTE`), named, with no shades; `colors` replaces it. A grid can also stand on
the screen with no field and no page.

## Import

```tsx
import { ColorPicker, TRAM_PALETTE } from '@xaui/tram/color-picker'
```

## Anatomy

```tsx
<ColorPicker>
  <ColorPicker.Label />
  <ColorPicker.Field>
    <ColorPicker.Preview />
  </ColorPicker.Field>
  <ColorPicker.Description />
  <ColorPicker.Error />
  <ColorPicker.Overlay />
  <ColorPicker.Content>
    <ColorPicker.Title />
    <ColorPicker.Close />
    <ColorPicker.Grid>
      <ColorPicker.Group>
        <ColorPicker.Swatch />
      </ColorPicker.Group>
    </ColorPicker.Grid>
  </ColorPicker.Content>
</ColorPicker>
```

- **`ColorPicker`** — the root, the `DummyField`'s column. It holds the value and the open
  state.
- **`ColorPicker.Label`**, **`Description`**, **`Error`** — the `DummyField`'s own slots.
- **`ColorPicker.Field`** — the box that opens the page. Left empty, it draws the chip,
  the colour's name and the `Select`'s chevron; `value` replaces the name.
- **`ColorPicker.Preview`** — the flat square of the chosen colour, the box height less 20;
  an empty square lined in grey while nothing is chosen. `color` shows another one.
- **`ColorPicker.Overlay`** — draws nothing: the page takes the screen. It carries only
  `isDismissable`, whether the system's back closes the page.
- **`ColorPicker.Content`** — the page, a `Modal`.
- **`ColorPicker.Title`** — a light page title; the page is labelled by it.
- **`ColorPicker.Close`** — the Tram `CloseButton`, `text` by default, in the top-end
  corner.
- **`ColorPicker.Grid`** — a `ScrollView` of swatches; with no children it draws `colors`.
- **`ColorPicker.Group`** — a group of swatches under an optional `name`, a `caption`.
- **`ColorPicker.Swatch`** — one colour, with an optional `name`.

## Usage

### Field and page

```tsx
<ColorPicker value={accent} onValueChange={setAccent}>
  <ColorPicker.Label>accent colour</ColorPicker.Label>
  <ColorPicker.Field placeholder="choose a colour" />
  <ColorPicker.Overlay />
  <ColorPicker.Content>
    <ColorPicker.Title>accents</ColorPicker.Title>
    <ColorPicker.Close accessibilityLabel="Close" />
    <ColorPicker.Grid />
  </ColorPicker.Content>
</ColorPicker>
```

The page closes on a choice; `closeOnSelect={false}` keeps it open.

### Grid on the page

```tsx
<ColorPicker layout="mosaic" value={tile} onValueChange={setTile}>
  <ColorPicker.Grid scrollEnabled={false} />
</ColorPicker>
```

### A palette by hand

```tsx
<ColorPicker closeOnSelect={false} value={recent} onValueChange={setRecent}>
  <ColorPicker.Grid scrollEnabled={false}>
    <ColorPicker.Group name="recent">
      <ColorPicker.Swatch color="#A20025" name="crimson" />
      <ColorPicker.Swatch color="#00ABA9" name="teal" />
    </ColorPicker.Group>
  </ColorPicker.Grid>
</ColorPicker>
```

A `ColorGroup`'s `name` heads the group and prefixes every swatch's name ("violet 600");
unset, each swatch is named by its `shade` alone.

## Layout

| Layout   | Drawn as                                                                |
| -------- | ----------------------------------------------------------------------- |
| `ramps`  | the Windows Phone 7 list: a square of 48 and the name, rows of 56       |
| `mosaic` | the Windows Phone 8 grid: squares five to a row, 2 apart, with no names |

`ramps` is the default; the chosen colour's name is written in its own colour, read as
ink. In `mosaic` the chosen square wears a ring: 3 of the ground, then 2 of ink.

## Sizes

`size` is the `DummyField`'s — `sm`, `md` or `lg` — and sizes the field. The page does not
change with it.

## Colour

`accent` and `color` are the field's line under the finger, as on the `DummyField`; the
palette is not tinted by them.

## Accessibility

- The page is a `dialog`, modal, labelled by `ColorPicker.Title` when one is mounted. The
  system's back and a screen reader's escape close it, unless `Overlay` sets
  `isDismissable={false}`.
- The grid is a `radiogroup` and each swatch a `radio` with its `selected` and `checked`
  state; a swatch reads its `name`, else the colour's hex.
- A choice is felt as `selection` through `TramProvider`'s `onHaptic`.
- With motion reduced the page fades in instead of swivelling; with animations off it is
  there or not, and the swatches do not lean.

## Differences from Native

- **No `variant`**, no `labelPlacement`, no `xs`; **`accent`** is added.
- **`Content`** is a full-screen page, not a `Dialog`, so `Overlay` draws nothing and
  takes only `isDismissable`.
- **`TRAM_PALETTE`** replaces `TAILWIND_PALETTE`.
- **`ColorGroup.name`** is optional, and `Swatch` gains `name`.
- **The chip** sits inside the box, not in a `FieldGroup.Prefix`, and the field shows the
  colour's name (its hex off the palette) where Native shows the upper-case hex.
- **A group's name** is a `caption` above its swatches.
