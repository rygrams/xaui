# SearchField

A query, with the mark that says so and the cross that takes it back, drawn the Metro way:
one box holding the magnifier, the typed text and the cross, inside a line of 2 that takes
the accent with the focus.

It is a Tram `TextField`: the same root, `size`, `radius`, `accent`, `color`, `isInvalid`,
`isDisabled` and `isRequired`, and its `Label`, `Description` and `Error` are that
component's own slots.

## Import

```tsx
import { SearchField } from '@xaui/tram/search-field'
```

## Anatomy

```tsx
<SearchField>
  <SearchField.Label />
  <SearchField.Field>
    <SearchField.Icon />
    <SearchField.Clear />
  </SearchField.Field>
  <SearchField.Description />
  <SearchField.Error />
</SearchField>
```

- **`SearchField`** — the root, a `TextField` that holds the query.
- **`SearchField.Label`**, **`.Description`**, **`.Error`** — the `TextField`'s slots.
- **`SearchField.Field`** — the box and the text input in it. Its children are the marks:
  `SearchField.Icon` goes before the text, anything else after it. With none, the box
  draws the magnifier alone.
- **`SearchField.Icon`** — the magnifier, drawn from views in the box's line. `as`
  replaces it with an icon of your own; `size` and `color` override its side and ink.
- **`SearchField.Clear`** — the cross that empties the box: the Tram `CloseButton` drawn
  `text`, at the field's size. It renders nothing while the box is empty.

## Usage

### Basic

```tsx
<SearchField onValueChange={setQuery} onSearch={run}>
  <SearchField.Label>artists</SearchField.Label>
  <SearchField.Field placeholder="search">
    <SearchField.Icon />
    <SearchField.Clear accessibilityLabel="clear the search" />
  </SearchField.Field>
  <SearchField.Description>by name or by album.</SearchField.Description>
</SearchField>
```

### Typing and searching

`onValueChange` fires on every keystroke and on the clear — what a list filtered in memory
reads. `onSearch` fires on the keyboard's search key — what a query that costs a request
waits for. Use `value` with `onValueChange` for a controlled query, or `defaultValue` and
let the field keep its own.

`SearchField.Field` takes what `TextField.Field` takes, less `value`, `defaultValue`,
`onChangeText` and `onSubmitEditing`, which are the root's. Its defaults are a search
box's: no autocorrect, no leading capital, a return key that says "search" — all yours to
override.

### The clear

A press on `SearchField.Clear` empties the query, reports it through `onValueChange`, and
hands the focus back to the text so the next query is typed straight away.

### The magnifier alone

```tsx
<SearchField>
  <SearchField.Field placeholder="search" />
</SearchField>
```

## Variants

| Variant     | Drawn as                                               |
| ----------- | ------------------------------------------------------ |
| `primary`   | the ground inside a line of 2 in `muted` — the default |
| `secondary` | the discreet surface with no line at rest              |

Under both, the line takes the accent with the focus, and the magnifier goes from `muted`
to the page's ink. `secondary` is for a search box on a sheet or a header.

```tsx
<SearchField variant="secondary" defaultValue="timbuktu">
  <SearchField.Field placeholder="search" />
</SearchField>
```

## Sizes

```tsx
<SearchField size="sm" />
<SearchField size="md" />
<SearchField size="lg" />
```

The box is 40, 48 or 56 tall. `sm` is pressed as 48 points.

## Colour

The line of the focus is the theme's accent, read as ink. `accent` picks another of the
twenty named accents; `color` takes a raw tint and wins when both are set. `isInvalid`
draws the line in `danger`, focused or not, and outranks both; the label and the
description keep their ink. `radius` stays within 2.

## Accessibility

- The input has the `search` role and announces `disabled`. On the web it is labelled by
  `SearchField.Label` and described by `Description` and `Error`, with `aria-invalid` and
  `aria-required`.
- The magnifier is hidden from screen readers.
- `SearchField.Clear` is a cross, not text: it needs an `accessibilityLabel`.
- The line and the magnifier's ink move with the focus on the `navigation` spring, or a
  150 ms timing under reduced motion.

## Differences from Native

- **One box, no `FieldGroup`.** The marks are written inside `SearchField.Field`; Native
  composes a `FieldGroup` with a prefix and a suffix.
- **The magnifier** is drawn from views, so it needs no `react-native-svg`.
- **`variant`** keeps Native's two names, drawn flat: `primary` a line of 2 on the ground,
  `secondary` the discreet surface.
- **`accent`** is added. There is no `labelPlacement` (a Metro label stands above its box)
  and no `xs`.
- **`SearchField.Clear`** is the Tram `CloseButton` drawn `text`, pressed as 48.
