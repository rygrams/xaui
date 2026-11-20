# Alert

A message the interface has to make sure is read, drawn as the Tram `Button` is — the soft
slice of the accent by default — with a square at the start in the colour of what it is
about, then the title on the Tram scale and the detail faded under it.

No shadow: depth is not part of Tram. A status is a colour, not a variant.

## Import

```tsx
import { Alert } from '@xaui/tram/alert'
```

## Anatomy

```tsx
<Alert>
  <Alert.Icon />
  <Alert.Content>
    <Alert.Title />
    <Alert.Description />
  </Alert.Content>
  <Alert.Close />
</Alert>
```

- **`Alert`** — the root, a row. It resolves the recipe once and hands the styles to its
  slots. A stringifiable child is wrapped in an `Alert.Description` for you.
- **`Alert.Icon`** — the square at the start, with a glyph in it. It takes `Icon`'s three
  forms: `as`, a raw SVG child, or `source`.
- **`Alert.Content`** — the middle column, holding the title over the description.
- **`Alert.Title`** — the heading.
- **`Alert.Description`** — the message, faded under the title as the `Card`'s detail.
- **`Alert.Close`** — the cross at the end, two bars of the `Button`'s line with no
  circle. It closes nothing by itself: `onPress` is where the app removes the alert.

## Usage

### One sentence

```tsx
<Alert>the account syncs again as soon as Wi-Fi is back.</Alert>
```

### Composed

```tsx
<Alert accent="amber">
  <Alert.Icon as={WarningIcon} />
  <Alert.Content>
    <Alert.Title>storage almost full</Alert.Title>
    <Alert.Description>180 MB left on this account.</Alert.Description>
  </Alert.Content>
  <Alert.Close accessibilityLabel="close" onPress={dismiss} />
</Alert>
```

JSX order is screen order; no slot carries a margin.

## Variants

Three of the `Button`'s drawings, with the icon square saying the rest:

| Variant     | Ground                           | Icon square             |
| ----------- | -------------------------------- | ----------------------- |
| `contained` | the true colour                  | the ink's line, no fill |
| `flat`      | its soft slice (default)         | the true colour, filled |
| `outline`   | the page, in the `Button`'s line | the true colour, filled |

```tsx
<Alert variant="flat">…</Alert>
<Alert variant="outline">…</Alert>
<Alert variant="contained">…</Alert>
```

There is no `text`: an alert with no box is a paragraph.

## Sizes

```tsx
<Alert size="sm">…</Alert>
<Alert size="md">…</Alert>
<Alert size="lg">…</Alert>
```

The icon square is 32, 40 or 48 a side.

## Colour

`accent` picks one of the twenty named accents; `color` takes a raw tint and wins over it.
A status is an accent: `green` for what Native calls `success`, `amber` for `warning`,
`red` for `danger`.

```tsx
<Alert accent="green">…</Alert>
<Alert variant="contained" color={theme.colors.danger}>…</Alert>
```

## Accessibility

- The root has the `alert` role and announces itself politely (`accessibilityLiveRegion`
  `polite`).
- The icon is hidden from screen readers: the title says what it says.
- `Alert.Close` needs an `accessibilityLabel`. The cross is drawn smaller than a finger
  and its touch reaches past it to 48.
- `isDisabled` fades the alert and disables its `Alert.Close`.

## Differences from Native

- **`variant`** is `contained`, `flat` or `outline` — how the box is drawn. Native's nine
  names (`default`, `success-soft`, `danger`…) become a drawing plus an `accent`.
- **`accent`** is added: one of the twenty named accents.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **No shadow**: Native's `default` is a lifted card.
- **The icon** is a square in the true colour, or the ink's line on `contained`.
- **The corner** stays within 2, the Tram radius scale.
