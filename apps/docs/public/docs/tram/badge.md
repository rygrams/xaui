# Badge

A count, or a sign that something is new, drawn as a sharp rectangle of the accent with
the number cut into it — the `Button`'s drawings, from a fill to the number alone.

The count is set on the Tram scale in tabular figures. Placed on a parent, the badge sits
flush inside its corner, as the count did on a Metro tile.

## Import

```tsx
import { Badge } from '@xaui/tram/badge'
```

## Anatomy

```tsx
<Badge />
```

One node and no slots. A stringifiable child is the count, wrapped in a `Text` on one
line for you; anything else is drawn as given. A dot draws no child.

## Usage

### Basic

```tsx
<Badge>3</Badge>
<Badge accent="red" size="sm">99+</Badge>
```

### On what it counts

```tsx
<View>
  <Avatar>am</Avatar>
  <Badge placement="top-end">3</Badge>
</View>
```

`placement` pins the badge in a corner of the nearest positioned parent: `top-end`,
`top-start`, `bottom-end` or `bottom-start`. Leave it unset for a badge in the flow, at
the end of a list row.

### Dot

```tsx
<Badge isDot />
```

A square with nothing in it: something is new, not how much. On `text`, where no box is
drawn, the square is drawn in the ink.

### Pill

```tsx
<Badge radius="full">12</Badge>
```

`radius` caps at the Tram corner of 2, or lets `full` through for a pill.

## Variants

| Variant     | Drawn as                                  |
| ----------- | ----------------------------------------- |
| `contained` | filled with the true colour (default)     |
| `flat`      | filled with its soft slice                |
| `outline`   | the `Button`'s line and the count, as ink |
| `text`      | the count alone — a Metro tile's          |

```tsx
<Badge variant="contained">12</Badge>
<Badge variant="flat">12</Badge>
<Badge variant="outline">12</Badge>
<Badge variant="text">12</Badge>
```

## Sizes

```tsx
<Badge size="sm">3</Badge>
<Badge size="md">3</Badge>
<Badge size="lg">3</Badge>
```

16, 20 or 24 tall; the dot is a square of 6, 8 or 10.

## Colour

`contained` in the theme's accent is the default. `accent` picks one of the twenty named
accents, and a status is one of them: `red` for what Native calls `danger`, `green` for
`success`, `amber` for `warning`. `color` takes a raw tint and wins over `accent`.

```tsx
<Badge accent="red">3</Badge>
<Badge variant="outline" color="#7c3aed">new</Badge>
```

## Accessibility

- A badge has no role. What the number counts is the caller's to say: give the parent, or
  the badge, an `accessibilityLabel` such as "12 unread notifications".
- A dot says nothing to a screen reader on its own; put what it means in the parent's
  label.

## Differences from Native

- **`variant`** is `contained`, `flat`, `outline` or `text` — how the box is drawn.
  Native's eleven names become a drawing plus an `accent`.
- **The default** is `contained` in the accent; Native's default is `danger`.
- **`accent`** is added: one of the twenty named accents.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`placement`** pins the badge flush inside the corner; Native's straddles it, half out.
- **The shape** is a sharp rectangle and the dot a square; `radius` caps at 2 or lets
  `full` through for a pill.
