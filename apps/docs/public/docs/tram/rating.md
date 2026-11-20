# Rating

A row of marks, given or shown, drawn the Metro way: flat marks, the given ones in the
accent and the rest in a faint grey, an average filling the last mark to the tenth.

One component serves the input and the average: a mark's fill is a fraction, so `4.3`
shows three tenths of the fifth mark.

## Import

```tsx
import { Rating } from '@xaui/tram/rating'
```

## Anatomy

```tsx
<Rating>
  <Rating.Icon />
</Rating>
```

- **`Rating`** — the root. It draws `max` marks in a row and holds the value.
- **`Rating.Icon`** — the glyph, written once and drawn once per mark, in both layers: the
  faint grey, and the given colour clipped to the fraction. Left out, the mark is a star.
  It takes `Icon`'s forms (`as`, a raw SVG child, or `source`).
- **`Rating.Item`** — one mark, pressable. The root draws `max` of them for you, each
  holding the glyph.

## Usage

### Basic

```tsx
<Rating value={score} onValueChange={setScore} />
```

Leave `value` out and the rating keeps its own, from `defaultValue` (0). `max` sets how
many marks: five by default.

### Read-only

```tsx
<Rating value={4.3} isReadOnly size="sm" />
```

A display rather than a control: the marks take no press and the row reads as one image,
"4.3 out of 5".

### Precision

```tsx
<Rating value={half} onValueChange={setHalf} precision={0.5} />
```

`precision` is the step a press lands on — `1` for whole marks, `0.5` for halves. It
governs input only: a value of any precision is shown as it is. A press is measured from
the start edge of the mark, mirrored in a row read right to left.

### Another glyph

```tsx
<Rating value={score} onValueChange={setScore} accent="teal">
  <Rating.Icon as={HeartIcon} />
</Rating>
```

An explicit `color` on `Rating.Icon` wins over both layers.

## Sizes

```tsx
<Rating size="sm" value={3} isReadOnly />
<Rating size="md" value={3.5} isReadOnly />
<Rating size="lg" value={4} isReadOnly />
```

`size` sets the mark's side — 16, 24 or 32 — and the gap between marks (4, 6 or 8). Every
mark is pressed as 48 points.

## Colour

The given marks are the theme's accent. `accent` picks another of the twenty named
accents; `color` takes a raw tint — the amber of a store, the page's ink — and wins when
both are set. The marks not given yet are always the faint grey.

```tsx
<Rating accent="amber" defaultValue={3} />
<Rating color={theme.colors.foreground} defaultValue={2} />
```

## Accessibility

- An input rating is a row of `button`s, each carrying its place as a value
  (`{ now, min: 1, max }`) and its `disabled` state.
- A read-only rating is one element labelled "value out of max"; its marks are `image`s.
- Each change is felt as a `selection` haptic through `TramProvider`'s `onHaptic`.
- A press shrinks the mark a little and springs back; the fill changes at once. Under
  reduced motion the mark does not move.

## Differences from Native

- **No `variant`.** Native has three fills for the given marks; Tram fills them with the
  accent, `accent` names another and `color` writes one as a raw tint.
- **`accent`** is added.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The marks** are flat: a mark not given yet is the faint grey of the `Skeleton`, and a
  given one does not grow, glow or bounce.
