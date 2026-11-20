# Divider

The line between two things, drawn in the Tram grey: one point of `muted`, faded so the
space around it still does most of the separating — Metro's way.

It is one node with no slots. It takes the axis it does not run along from its parent, so
it needs no width.

## Import

```tsx
import { Divider } from '@xaui/tram/divider'
```

## Anatomy

```tsx
<Divider />
```

- **`Divider`** — the rule. Under `asChild` the child element becomes the rule and keeps
  its thickness and ink.

## Usage

### Basic

```tsx
<Row />
<Divider />
<Row />
```

### Vertical

```tsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Typography>pivot</Typography>
  <Divider orientation="vertical" size="md" />
  <Typography>panorama</Typography>
</View>
```

`orientation` is `horizontal` (the default) or `vertical`.

## Sizes

```tsx
<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />
```

| Size | Thickness              |
| ---- | ---------------------- |
| `sm` | 1 (default)            |
| `md` | 2, the `Button`'s line |
| `lg` | 3, the theme's border  |

## Colour

The rule is `muted`, faded to half on a dark theme and to three quarters on a light one.
`color` takes a raw tint, never a token, and is drawn whole, not faded. There is no
`accent`: a line in the accent is a `color`.

```tsx
<Divider size="md" color={theme.colors.accent} />
```

## Accessibility

- The rule is furniture: `accessibilityElementsHidden` and
  `importantForAccessibility="no"` are set, so a screen reader reads the two groups it sits
  between, not the line. Both stay overridable.

## Differences from Native

- **`size`** is `sm`, `md` or `lg` — 1, 2 or 3 points — with `sm` the default; Native's
  default is the `xs` hairline, and Tram has no `xs`.
- **The grey** is faded to half on black and to three quarters on white; a raw `color` is
  drawn whole.
- **No `accent`**: a line in the accent is a `color`.
