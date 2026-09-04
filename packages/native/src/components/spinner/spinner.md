# Spinner

The wait, drawn. A circle whose arc turns until whatever is loading has loaded.

## Import

```tsx
import { Spinner } from '@xaui/native/spinner'
```

## Anatomy

```tsx
<Spinner />
```

**Two rings and no slots.** The root is the track — the full circle in the variant's ink,
at a fraction of its opacity — and its one child is the arc that turns over it: the same
circle with a quarter missing. The two are one figure rather than two parts, so there is
nothing between them for a slot to name.

## Usage

```tsx
<Spinner />
<Spinner variant="danger" size="sm" />
<Spinner variant="default" accessibilityLabel="Chargement des projets" />
```

Beside a label, in a row:

```tsx
<Row gap={8} alignItems="center">
  <Spinner size="xs" variant="tertiary" />
  <Typography variant="body-sm">Synchronisation…</Typography>
</Row>
```

Frozen, for a screenshot or a test:

```tsx
<Spinner animation={false} />
```

## Props

| Prop        | Type                                                                                        | Default     |
| ----------- | ------------------------------------------------------------------------------------------- | ----------- |
| `variant`   | `'primary' \| 'secondary' \| 'default' \| 'tertiary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                              | `'md'`      |
| `color`     | `string` — a raw hex tint (R7)                                                              | —           |
| `animation` | `boolean`                                                                                   | `true`      |
| `style`     | `StyleProp<ViewStyle>`                                                                      | —           |

Plus every `ViewStyle` key as a prop (R14) and every `View` prop.

### `variant` names an ink

A spinner has no fill, so a variant here names **the colour of the thing itself** rather
than a colour that reads on a surface. That is why `primary` is `accent` and not
`accentForeground` — the value it resolves to on a `Chip`, where there _is_ a fill.

| `variant`   | ink                    |
| ----------- | ---------------------- |
| `primary`   | `accent`               |
| `secondary` | `accentSoftForeground` |
| `default`   | `foreground`           |
| `tertiary`  | `muted`                |
| `success`   | `success`              |
| `warning`   | `warning`              |
| `danger`    | `danger`               |

**No `ghost`**: a spinner with no ink is not a spinner. **No `-soft` slices**: a soft slice
is a fill softened, and there is no fill here.

### `size` is the diameter

Sixteen, twenty, twenty-four and thirty-two points — HeroUI's three steps plus the one our
ladder adds between the first two. The stroke thickens once, at `lg`, because a 2pt ring on
a 32pt circle reads as a hairline and a 3pt ring on a 16pt one reads as a doughnut.

A spinner is a circle, so `size` is the only measurement it has. R14's `width` is available
and deliberately not what `size` means — a spinner that filled its parent would be a
progress bar.

## Accessibility

`accessibilityRole="progressbar"` and `accessibilityState={{ busy }}` are set, and both
stay overridable (R9). There is no default `accessibilityLabel`: only the caller knows what
is loading, and "loading" alone is what the role already announces.

## Notes

### No `asChild`

The one root in the library without one (R12). `Slot` merges a root's props into a single
element, and that element keeps its own children — so a caller's element could become the
track, but the arc is a second node it has no way to receive. Handing over the track alone
would render a ring that never turns, silently.

Styling is the escape hatch instead: every `ViewStyle` key is a prop (R14), and `style` is
still the last word.

### Why borders and not an SVG stroke

HeroUI draws one arc fading from opaque to 55%, which needs a `linearGradient` and
therefore `react-native-svg`. That package is an **optional peer** here, and a component in
the fifteen-component core cannot require one. Two circles of a single ink at two opacities
read as the same figure, cost two views, and pull in nothing.

### `Button.Spinner` is not this component with props

The button's spinner takes its diameter and its colour from the button's own recipe, which
has already resolved both. Handing them to `<Spinner size={…} color={…} />` would be R6 in
reverse — a vocabulary prop carrying a computed number. What the two share is the turn, and
that lives in `useRotation`.

## Migration

| Legacy                           | v1                             |
| -------------------------------- | ------------------------------ |
| `<Indicator />`                  | `<Spinner />`                  |
| `<Indicator themeColor="red" />` | `<Spinner variant="danger" />` |
| `<Indicator size={32} />`        | `<Spinner size="lg" />`        |
