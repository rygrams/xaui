# Slider

A value chosen along a line, drawn the Metro way: a line of soft grey, filled with the
accent up to a block thumb of ink — the `Switch`'s thumb, standing across the line.

## Import

```tsx
import { Slider } from '@xaui/tram/slider'
```

## Anatomy

```tsx
<Slider>
  <Slider.Output />
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb />
  </Slider.Track>
</Slider>
```

- **`Slider`** — the root. It holds the value, the scale and the motion the fill and the
  thumbs share.
- **`Slider.Output`** — the value as text: the number, or the two ends joined by an en
  dash on a range. A function child formats it.
- **`Slider.Track`** — the box the line is drawn in, and what a touch lands on. It holds
  the fill and the thumbs; it carries no margin.
- **`Slider.Fill`** — the filled part, in the accent: from the start to the thumb, or
  between two thumbs.
- **`Slider.Thumb`** — the block the finger holds. `index` says which: `0` on a plain
  slider, `0` and `1` on a range.

## Usage

### Basic

```tsx
<Slider defaultValue={40} onValueCommit={save}>
  <Slider.Output />
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb />
  </Slider.Track>
</Slider>
```

A touch on the track brings the nearest thumb there; a drag carries it. `onValueChange`
fires on every step crossed, while dragging included; `onValueCommit` fires once, when the
finger lifts — what a network call belongs on.

### Formatting the output

```tsx
<Slider value={volume} onValueChange={setVolume}>
  <Slider.Output>{value => `volume ${value}`}</Slider.Output>…
</Slider>
```

### A range

```tsx
<Slider defaultValue={[20, 60]}>
  <Slider.Output />
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb index={0} accessibilityLabel="minimum" />
    <Slider.Thumb index={1} accessibilityLabel="maximum" />
  </Slider.Track>
</Slider>
```

A pair makes it a range, and it comes back as a pair. The two thumbs do not cross.

### Scale and orientation

```tsx
<Slider defaultValue={40} min={0} max={200} step={10} orientation="vertical">
  <Slider.Track>
    <Slider.Fill />
    <Slider.Thumb />
  </Slider.Track>
</Slider>
```

`min` and `max` default to `0` and `100`, `step` to `1`; `step={0}` makes it continuous.
`vertical` counts from the bottom.

## Sizes

```tsx
<Slider size="sm" defaultValue={30}>…</Slider>
<Slider size="md" defaultValue={55}>…</Slider>
<Slider size="lg" defaultValue={70}>…</Slider>
```

`size` sets the line — 8, 12 or 16 thick — the thumb — as wide as the `Switch`'s, 18, 26
or 36 long — and the output's type. `radius` overrides the corner of the line, the fill
and the thumb; every key stays within 2.

## Colour

The fill is the theme's accent. `accent` picks another of the twenty named accents;
`color` takes a raw `#RRGGBB` and wins when both are set. The line stays the soft grey and
the thumb the page's ink.

```tsx
<Slider defaultValue={[20, 60]} step={10} accent="lime">
  …
</Slider>
```

`isDisabled` greys the line, the fill, the thumb and the output, and stops the touch.

## Accessibility

- Each thumb is an `adjustable` element with `{ min, max, now }`, and the `increment` and
  `decrement` actions. On the web it carries the `aria-value*` attributes and
  `aria-orientation`.
- `accessibilityValueText` on a thumb reads a text instead of the raw number; name the two
  thumbs of a range with `accessibilityLabel`.
- Each step is felt as a `selection` haptic through `TramProvider`'s `onHaptic`; a
  continuous slider has no step to feel.
- The thumb springs to a value through Tram's motion (150 ms under reduced motion). The
  squash of a held thumb is dropped under reduced motion.

## Differences from Native

- **The drawing**: a line of soft grey 8 / 12 / 16 thick and a block thumb of ink, the
  `Switch`'s.
- **`accent`** and **`asChild`** are added.
- **Haptics**: a `selection` per step, through `TramProvider`.
- **The line** is drawn inside the `Slider.Track` box, which carries no margin.
- **`useSlider`** reads Tram's own context. `fromFraction`, `snap` and `toFraction` are
  not exported.
