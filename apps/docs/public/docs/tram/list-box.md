# ListBox

Rows on a ground, drawn as the rows of the Metro settings page: no fill, no line, no shadow
and no corner — a title in the page's ink, a description in the muted grey, and the space
between the rows to tell them apart.

`ListBoxGroup` stacks several lists into sections under headers. A row you can press leans
toward the finger; a row can also be chosen or ticked, as in the Metro mail list.

## Import

```tsx
import { ListBox, ListBoxGroup } from '@xaui/tram/list-box'
```

## Anatomy

```tsx
<ListBoxGroup>
  <ListBoxGroup.Section>
    <ListBoxGroup.Header />
    <ListBox>
      <ListBox.Item>
        <ListBox.ItemPrefix />
        <ListBox.ItemContent>
          <ListBox.ItemTitle />
          <ListBox.ItemDescription />
        </ListBox.ItemContent>
        <ListBox.ItemSuffix />
      </ListBox.Item>
      <ListBox.ItemButton />
    </ListBox>
    <ListBoxGroup.Footer />
  </ListBoxGroup.Section>
</ListBoxGroup>
```

- **`ListBox`** — the root, a `list`. It resolves the rows' styles once and holds the
  selection.
- **`ListBox.Item`** — a plain row: no press, no movement, a `listitem`. A control inside it
  keeps its own role and press.
- **`ListBox.ItemButton`** — a row you can press, used in place of `ListBox.Item`. Its `id`
  is what the selection reads.
- **`ListBox.ItemPrefix`** — what leads the row. `variant="bare"` draws it as given;
  `variant="square"` puts it on a square of the accent, its glyph in the ink that reads on
  it.
- **`ListBox.ItemContent`** — the text column, which pushes the suffix to the end.
- **`ListBox.ItemTitle`** — what the row is, in the page's ink.
- **`ListBox.ItemDescription`** — what it is set to, in the muted grey.
- **`ListBox.ItemSuffix`** — a value or a control at the end, in the muted grey. It draws
  nothing of its own.
- **`ListBoxGroup`** — the sections, with the defaults every list inside takes.
- **`ListBoxGroup.Section`** — one section, a `group` named by its header.
- **`ListBoxGroup.Header`** / **`ListBoxGroup.Footer`** — the text above and below a list.

## Usage

### Basic

```tsx
<ListBox>
  <ListBox.ItemButton onPress={openWifi}>
    <ListBox.ItemPrefix variant="square">
      <Icon as={WifiIcon} />
    </ListBox.ItemPrefix>
    <ListBox.ItemContent>
      <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
      <ListBox.ItemDescription>home</ListBox.ItemDescription>
    </ListBox.ItemContent>
  </ListBox.ItemButton>
</ListBox>
```

A row holding a `Switch` in its suffix is a plain `ListBox.Item`: the switch is the
control.

### Sections

```tsx
<ListBoxGroup>
  <ListBoxGroup.Section>
    <ListBoxGroup.Header>network</ListBoxGroup.Header>
    <ListBox>{/* rows */}</ListBox>
    <ListBoxGroup.Footer>Turns off when the screen sleeps.</ListBoxGroup.Footer>
  </ListBoxGroup.Section>
</ListBoxGroup>
```

The group's `size`, `accent`, `color` and `isDisabled` are the defaults of every list in it.

### Single selection

```tsx
<ListBox selectionMode="single" selectedKeys={tone} onSelectionChange={setTone}>
  {tones.map(item => (
    <ListBox.ItemButton key={item.id} id={item.id}>
      <ListBox.ItemContent>
        <ListBox.ItemTitle>{item.id}</ListBox.ItemTitle>
      </ListBox.ItemContent>
    </ListBox.ItemButton>
  ))}
</ListBox>
```

A press chooses the row and its title turns to the accent, read as ink; `onPress` still
runs. A row without an `id` is never chosen.

### Multiple selection

```tsx
<ListBox
  selectionMode="multiple"
  selectedKeys={picked}
  onSelectionChange={setPicked}
  isSelecting={isPicking}
  onSelectingChange={setIsPicking}
>
  {/* ItemButtons, each with an id and an onPress */}
</ListBox>
```

A press on the row's first 48 points puts the boxes out and ticks it. While the list is
selecting, every press ticks or unticks and `onPress` does not run; leaving empties the
selection. `isSelecting` / `defaultSelecting` hold whether the boxes are out.

## Sizes

`size` is `sm`, `md` or `lg`: the rows' height — 52, 64 or 80 at least — the type of the
title and the description, and the prefix's square. Never the width.

## Colour

The squares of `ItemPrefix variant="square"` and the chosen title take the theme's accent.
`accent` picks one of the twenty named Metro accents; `color` takes a raw tint and wins when
both are set. Nothing else on a row is the accent.

## Accessibility

- The root is a `list`; `ListBox.Item` a `listitem`; `ListBoxGroup.Section` a `group`, and
  `ListBoxGroup.Header` a `header`.
- `ListBox.ItemButton` is a `button`, announced as `selected` when chosen in `single`; while
  a `multiple` list is selecting it is a `checkbox`, announced as `checked`.
- `isDisabled` greys the rows and stops their press, on one row or the whole list.
- The rows, headers and footers arrive in one cascade through every section; a row added or
  removed later opens or closes its height. With motion reduced the list only fades in, and
  the boxes' column is open or shut. `hasEntrance={false}` places the rows.
- The start edge of a row is mirrored in right-to-left layouts.

## Differences from Native

- **No `variant`** — Native's four are card fills — and **no `radius`**: there is no card.
- **`hasSeparator`** is dropped on the list and the group: a Metro list reads by the space
  between its rows, never a line.
- **Selection** is added — `selectionMode`, the selected keys, `isSelecting`, and an `id`
  on `ItemButton`. Native's `ListBox` has none.
- **`accent`** is added, and **`hasEntrance`** on both roots.
- **`ItemPrefix`** gains `variant="square"`.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The press** on `ItemButton` leans the row toward the finger; Native washes it.
