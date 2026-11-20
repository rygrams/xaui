# Carousel

A series of slides, one or a few at a time, drawn in Metro: the slides are the caller's
and nothing paints them; the arrows are squares of the page's ground; the indicator is a
row of squares whose current one stretches into a bar of the accent.

Every move goes through the index — an arrow, a square, a thumbnail, autoplay or a
controlled parent — and the track glides to it on the Metro curve.

## Import

```tsx
import { Carousel } from '@xaui/tram/carousel'
```

## Anatomy

```tsx
<Carousel>
  <Carousel.Content>
    <Carousel.Item />
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
  <Carousel.Indicator>
    <Carousel.Dot />
  </Carousel.Indicator>
  <Carousel.Counter />
  <Carousel.Thumbnails>
    <Carousel.Thumbnail />
  </Carousel.Thumbnails>
</Carousel>
```

- **`Carousel`** — the root. It holds the index and measures the track.
- **`Carousel.Content`** — the track, a `ScrollView` that snaps a slide at a time. It
  counts its children; your `onScroll` and `contentContainerStyle` are composed with its own.
- **`Carousel.Item`** — one slide. Its width is the track's, divided by `itemsPerView`
  less the gaps and the peeks; its height is what is inside it. It clips.
- **`Carousel.Previous`** / **`Carousel.Next`** — the arrows: squares the size of a key,
  8 in from the track's edge and centred on its height, a chevron of 2 in the ink.
  Children replace the chevron.
- **`Carousel.Indicator`** — the row of squares, held to the start. With no children it
  draws one `Carousel.Dot` per slide.
- **`Carousel.Dot`** — one square, which stretches into a bar of the accent as its slide
  comes into view. `index` is the slide it stands for.
- **`Carousel.Counter`** — `3 / 12` in tabular `body`, the total muted. Children replace it.
- **`Carousel.Thumbnails`** — a strip of thumbnails, a horizontal `ScrollView`.
- **`Carousel.Thumbnail`** — a square the size of a key, ringed; the current one's ring
  is a line of 2 in the ink. `index` is the slide it goes to.

## Usage

### Basic

```tsx
<Carousel autoPlayInterval={3200}>
  <Carousel.Content>
    {photos.map(photo => (
      <Carousel.Item key={photo.id}>
        <Image source={photo.source} style={{ width: '100%', height: 176 }} />
      </Carousel.Item>
    ))}
  </Carousel.Content>
  <Carousel.Previous accessibilityLabel="previous photo" />
  <Carousel.Next accessibilityLabel="next photo" />
  <Carousel.Indicator />
</Carousel>
```

### Peek, counter and thumbnails

```tsx
<Carousel peek={32}>
  <Carousel.Content>…</Carousel.Content>
  <Carousel.Counter />
  <Carousel.Thumbnails>
    {photos.map((photo, at) => (
      <Carousel.Thumbnail key={photo.id} index={at}>
        <Image source={photo.source} style={{ width: '100%', height: '100%' }} />
      </Carousel.Thumbnail>
    ))}
  </Carousel.Thumbnails>
</Carousel>
```

### Several in view, looping

```tsx
<Carousel itemsPerView={2} hasLoop>
  …
</Carousel>
```

Without `hasLoop`, the arrow at an end of the series stays in place, its chevron in the
faint grey, disabled.

### Controlled

```tsx
<Carousel index={index} onIndexChange={setIndex}>
  …
</Carousel>
```

`defaultIndex` places the track without animation. `autoPlayInterval` advances every so
many milliseconds; it always wraps and stops at the first interaction for good.

## Sizes

```tsx
<Carousel size="sm">…</Carousel>
<Carousel size="md">…</Carousel>
<Carousel size="lg">…</Carousel>
```

`size` sets the arrows' and thumbnails' key (32, 40, 48), the indicator's squares (6, 8
or 10) and the gap between slides (8, 12, 16) — never a slide. `gap` overrides the last.

## Colour

The indicator's bar is the one thing in a colour. `accent` picks one of the twenty named
accents for it; `color` takes a raw tint, wins, and reaches only the bar.

```tsx
<Carousel accent="lime">…</Carousel>
```

`radius` rounds the slides and thumbnails, within 2; unset, they are square.

## Accessibility

- The arrows are `button`s and need an `accessibilityLabel` — a development warning says
  so. At an end of a non-looping series they carry `disabled`.
- A square and a thumbnail are `button`s carrying `selected`, and read `3/5` through
  `accessibilityValue`. What is in a slide or thumbnail is yours to label.
- Arrows reach 48 all round; squares and thumbnails reach 48 above and below.
- Arrows and thumbnails tilt; a `press` haptic is felt on an arrow and a `selection` on a
  square or a thumbnail.
- The glide runs on the Metro curve; with motion reduced the track jumps.

## Differences from Native

- **No `variant`**: Native's four only paint the arrows' ground; Tram keeps one, the page's.
- **`accent`** is added for the bar; `color` wins over it and reaches only the bar.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`radius`** stays within 2, slides and thumbnails square when unset; Native's is `2xl`.
- **The indicator**: Native's round dots and pill are squares and a bar.
