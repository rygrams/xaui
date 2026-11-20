# Autocomplete

A field that opens a list you search, drawn as the Tram `Select` it is built on: the
`TextField`'s box with the value and a chevron, which opens the `Select`'s page swivelled
in on its top edge, with the search under its title and the rows narrowing as you type.

It is not a `Select`: a select is for a list you read, an autocomplete for one you cannot,
where choosing is finding. The letters a row matched are written in the accent, as ink.

## Import

```tsx
import { Autocomplete } from '@xaui/tram/autocomplete'
```

## Anatomy

```tsx
<Autocomplete>
  <Autocomplete.Label />
  <Autocomplete.Trigger>
    <Autocomplete.Value />
    <Autocomplete.Indicator />
  </Autocomplete.Trigger>
  <Autocomplete.Overlay />
  <Autocomplete.Content>
    <Autocomplete.Search />
    <Autocomplete.Item>
      <Autocomplete.ItemLabel />
    </Autocomplete.Item>
    <Autocomplete.Empty />
  </Autocomplete.Content>
  <Autocomplete.Description />
  <Autocomplete.Error />
</Autocomplete>
```

- **`Autocomplete`** — the root, a column: the label, the field, then the help lines. It
  holds the value, the open state and the query.
- **`Autocomplete.Label`**, **`.Trigger`**, **`.Value`**, **`.Indicator`**, **`.Overlay`**,
  **`.Item`**, **`.ItemLabel`**, **`.Description`**, **`.Error`** — the Tram `Select`'s
  own slots, the same components.
- **`Autocomplete.Content`** — the list, always a page. It drops the rows that do not
  match the query.
- **`Autocomplete.Search`** — the Tram `SearchField`'s box, held under the page's title
  above the scrolling rows. Its children are the marks in the box (`SearchField.Icon`,
  `SearchField.Clear`); with none it draws the magnifier.
- **`Autocomplete.Empty`** — what the list says when nothing matches, drawn only then.

## Usage

### Basic

```tsx
<Autocomplete onValueChange={setCountry}>
  <Autocomplete.Label>country</Autocomplete.Label>
  <Autocomplete.Trigger>
    <Autocomplete.Value placeholder="choose a country" />
    <Autocomplete.Indicator />
  </Autocomplete.Trigger>
  <Autocomplete.Content paddingTop={insets.top + 24}>
    <Autocomplete.Search placeholder="name or code" />
    <Autocomplete.Item value="ci">Côte d'Ivoire</Autocomplete.Item>
    <Autocomplete.Item value="ml">Mali</Autocomplete.Item>
    <Autocomplete.Empty>no country matches.</Autocomplete.Empty>
  </Autocomplete.Content>
</Autocomplete>
```

The page starts at the very top of the screen and Tram reads no safe area: pad it with
the app's own inset.

### The search

The search takes focus as the page opens; `autoFocus={false}` turns that off. Matching
folds diacritics and case, and matches any word of a row's label. Only the direct
children of `Autocomplete.Content` are filtered; a row with no readable label is never
hidden.

```tsx
<Autocomplete.Search placeholder="country name">
  <SearchField.Icon />
  <SearchField.Clear accessibilityLabel="clear the search" />
</Autocomplete.Search>
```

### Controlled

```tsx
<Autocomplete
  value={country}
  onValueChange={setCountry}
  query={query}
  onQueryChange={setQuery}
>
  …
</Autocomplete>
```

Left uncontrolled, the query is cleared every time the list closes. `isOpen`,
`defaultOpen` and `onOpenChange` hold the open state.

### Invalid and disabled

`isInvalid` draws the border in `danger` and shows `Autocomplete.Error`. A disabled
autocomplete greys its border, value and label, and does not open.

## Sizes

```tsx
<Autocomplete size="sm">…</Autocomplete>
<Autocomplete size="md">…</Autocomplete>
<Autocomplete size="lg">…</Autocomplete>
```

`size` drives the field's height, padding, gaps and type — never its width.

## Colour

`accent` picks one of the twenty named accents: the border while the list is open, the
current choice, and the matched letters, read as ink. `color` takes a raw tint and wins.

```tsx
<Autocomplete accent="teal">…</Autocomplete>
```

## Accessibility

- The trigger has the `combobox` role, carries `expanded` and `disabled`, and sets
  `aria-invalid` when invalid. It points at the label, the description and the error
  through `aria-labelledby` and `aria-describedby`.
- Rows carry `selected` and `disabled`; the page's title is a `header`.
- `Autocomplete.Empty` is announced politely as it appears.
- With motion reduced, the page fades in instead of swivelling.

## Differences from Native

- **No `variant`**: the Metro box has one fill, the ground inside a line. `accent` is
  added.
- **`Autocomplete.Content`** is always a page: it drops Native's eight placement props
  and takes no `mode`.
- **`Autocomplete.Search`** takes `SearchField.Field`'s props, and its marks as children.
- **An item** may draw itself through a function child, as a `Select` item does.
- **`useAutocomplete`** returns the search's own context (query, mode); the field's is
  `useSelect`.
