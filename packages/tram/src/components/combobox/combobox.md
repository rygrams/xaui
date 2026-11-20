# Combobox

A field you type in, over a list you must choose from — drawn as the Tram `Select`'s box
with the value replaced by the field being typed into, and the list unfolding under the
row, inside the same line.

The list is closed: what is typed narrows the rows and never becomes the value. It is
always unfolded in place, never a page — a page would cover the field being typed into.

## Import

```tsx
import { Combobox } from '@xaui/tram/combobox'
```

## Anatomy

```tsx
<Combobox>
  <Combobox.Label />
  <Combobox.Trigger>
    <Combobox.Input />
    <Combobox.Indicator />
  </Combobox.Trigger>
  <Combobox.Overlay />
  <Combobox.Content>
    <Combobox.Item>
      <Combobox.ItemLabel />
    </Combobox.Item>
    <Combobox.Empty />
  </Combobox.Content>
  <Combobox.Description />
  <Combobox.Error />
</Combobox>
```

- **`Combobox`** — the root: the `Autocomplete`'s props — the value, the open state and the
  query.
- **`Combobox.Trigger`** — the `Select`'s box around the row, which also holds the list
  once it unfolds. A `View`, not a pressable: the input takes the touch.
- **`Combobox.Input`** — the text input, where the value stands in the `Select`: the query
  while open, the chosen label while not. Typing and focus open the list
  (`opensOnChange`, `opensOnFocus`, both on by default).
- **`Combobox.Indicator`** — the `Select`'s chevron as a key of 48: the way into the list
  without typing.
- **`Combobox.Overlay`** — a touch outside the unfolded list closes it; `isDismissable`
  set to false leaves only a choice to close it.
- **`Combobox.Content`**, **`Item`**, **`ItemLabel`**, **`Empty`** — the `Autocomplete`'s
  list, rows and the line shown when nothing matches.
- **`Combobox.Label`**, **`Description`**, **`Error`** — the `Select`'s own.

## Usage

### Basic

```tsx
<Combobox value={city} onValueChange={setCity}>
  <Combobox.Label>city</Combobox.Label>
  <Combobox.Trigger>
    <Combobox.Input placeholder="search a city" />
    <Combobox.Indicator accessibilityLabel="Open the list" />
  </Combobox.Trigger>
  <Combobox.Overlay />
  <Combobox.Content>
    <Combobox.Item value="bko">Bamako</Combobox.Item>
    <Combobox.Item value="dkr">Dakar</Combobox.Item>
    <Combobox.Empty>no city matches</Combobox.Empty>
  </Combobox.Content>
</Combobox>
```

The list pushes what is under the field and scrolls past five rows. The letters each row
matched are in the accent, read as ink. Closing without a choice puts the chosen row's
label back in the field.

### Controlled query

```tsx
<Combobox
  query={query}
  onQueryChange={setQuery}
  value={city}
  onValueChange={setCity}
>
  …
</Combobox>
```

Left uncontrolled, the query is cleared every time the list closes.

## Sizes

```tsx
<Combobox size="sm">…</Combobox>
<Combobox size="md">…</Combobox>
<Combobox size="lg">…</Combobox>
```

`size` drives the field's height, padding, gaps and type — never width.

## Colour

`accent` takes one of the twenty named accents: the colour of the line while the list is
open and of the current choice in it, read as ink. `color` takes a raw `#RRGGBB` and wins
when both are set.

## Accessibility

- `Combobox.Trigger` has the `combobox` role. `Combobox.Input` is labelled by the label,
  described by the description and the error, and carries `aria-controls`,
  `aria-expanded` and `aria-autocomplete="list"`.
- `Combobox.Indicator` is a `button`; give it an `accessibilityLabel`.
- Each row is an `option` with its selected state.
- The list unfolds on the `navigation` spring; with motion reduced it fades in instead.

## Differences from Native

- **No `variant`**; **`accent`** is added.
- **Always in place**, never a page — a page would cover the field being typed into.
- **The input** carries `aria-controls`, `aria-expanded` and `aria-autocomplete`.
