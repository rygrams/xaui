# ProgressBar

How far along something is, drawn the Metro way: a bar of soft grey with nearly square
corners, filled with the accent — or, when the duration is unknown, five bubbles of the
accent that run across it.

## Import

```tsx
import { ProgressBar } from '@xaui/tram/progress-bar'
```

## Anatomy

```tsx
<ProgressBar>
  <ProgressBar.Header>
    <ProgressBar.Label />
    <ProgressBar.Value />
  </ProgressBar.Header>
  <ProgressBar.Track>
    <ProgressBar.Fill />
  </ProgressBar.Track>
</ProgressBar>
```

- **`ProgressBar`** — the root. It holds the value within the range once and hands the
  result and the resolved styles to its slots.
- **`ProgressBar.Header`** — the line above the bar, the label and the value pushed apart.
- **`ProgressBar.Label`** — what is happening.
- **`ProgressBar.Value`** — how far along, as text. It formats itself; children replace
  it.
- **`ProgressBar.Track`** — the bar: the whole of the distance.
- **`ProgressBar.Fill`** — what is done of it, a child the track clips. On an
  indeterminate bar it draws the five bubbles instead.

## Usage

### Basic

```tsx
<ProgressBar value={40}>download</ProgressBar>
```

A text child becomes the label, and the bar comes with it. With no children at all it is
the bar alone — give it an `accessibilityLabel`.

```tsx
<ProgressBar value={40} size="sm" accessibilityLabel="download" />
```

### The range and the number

```tsx
<ProgressBar value={7} minValue={5} maxValue={10} />
<ProgressBar
  value={1250}
  maxValue={2000}
  formatOptions={{ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }}
>
  collected
</ProgressBar>
```

`0` to `100` by default; the value is held within the range. `formatOptions` is
`Intl.NumberFormat`'s and is what `ProgressBar.Value` reads — a percentage unless told
otherwise. The value is set in tabular figures, so it does not push the label as it ticks.

### Composed

```tsx
<ProgressBar value={7} minValue={5} maxValue={10}>
  <ProgressBar.Header>
    <ProgressBar.Label>step</ProgressBar.Label>
    <ProgressBar.Value>3 of 6</ProgressBar.Value>
  </ProgressBar.Header>
  <ProgressBar.Track>
    <ProgressBar.Fill />
  </ProgressBar.Track>
</ProgressBar>
```

### Indeterminate

```tsx
<ProgressBar isIndeterminate>connecting</ProgressBar>
```

The bar gives way to five bubbles that come in fast, close up in the middle without
overlapping, and leave fast. `value` is not read, and `ProgressBar.Value` writes only the
children it is handed.

### The motion

The fill reaches a new value on a spring with next to no bounce.
`<ProgressBar.Fill animation={false} />` puts it at its width at once — for a value the
caller already animates — and stands the bubbles still.

## Sizes

```tsx
<ProgressBar size="sm" value={30} />
<ProgressBar size="md" value={55} />
<ProgressBar size="lg" value={70} />
```

`size` sets the bar's thickness — 8, 12 or 16 — and the header's type, never the width.
`radius` overrides the corner of the bar and of its fill; every key stays within 2.

## Colour

The fill and the bubbles are the theme's accent. `accent` picks another of the twenty
named accents; `color` takes a raw `#RRGGBB` and wins when both are set.

```tsx
<ProgressBar value={60} accent="lime">
  sync
</ProgressBar>
```

`isDisabled` greys the fill and the header and dims the bar.

## Accessibility

- The root has the `progressbar` role and reads the caller's own range,
  `{ min, max, now }`, not the clamped fraction. On the web it sets the matching
  `aria-value*` attributes.
- An indeterminate bar has no value to read: it announces as busy.
- The label is a `Text` inside the root, read with the value.
- Under reduced motion the fill moves on a 150 ms timing, and the five bubbles stand in a
  row in the middle of the bar.

## Differences from Native

- **No `variant`.** Native colours the fill by intention (`primary`, `success`,
  `danger`…); Tram has one colour to spend — the accent, another `accent`, or a raw
  `color`.
- **`accent`** is added.
- **`isIndeterminate`** is added: the Metro bar's five bubbles. Native leaves an unknown
  duration to its `Spinner`.
- **The bar** is 8 / 12 / 16 thick with nearly square corners; Native's is a thinner,
  rounded rail.
- **The fill** moves through Tram's motion (a spring, or 150 ms under reduced motion)
  rather than a fixed 240 ms sweep.
