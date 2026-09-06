# Carousel

A series of slides, one or a few at a time, with the controls to move between them.

## Import

```tsx
import { Carousel } from '@xaui/native/carousel'
```

## Usage

```tsx
<Carousel autoPlayInterval={2500}>
  <Carousel.Content>
    {photos.map(photo => (
      <Carousel.Item key={photo.id}>
        <Image source={photo.source} style={{ width: '100%', height: 200 }} />
      </Carousel.Item>
    ))}
  </Carousel.Content>

  <Carousel.Previous accessibilityLabel="Photo précédente" />
  <Carousel.Next accessibilityLabel="Photo suivante" />
  <Carousel.Indicator />
</Carousel>
```

## The slides are yours and the controls are the library's

`variant`, `color` and the palette reach the arrows, the dots and the counter. **Nothing
here paints what is inside a `Carousel.Item`** — a carousel of photographs and a carousel of
cards want opposite things there, and the caller is the one who knows which this is.

That is also why there is no `renderItem` and no `data`: the slides are children, in JSX
order, and what is in one is whatever you put there.

## A slide's width comes from the track's, never from a prop

`itemsPerView` says how many whole slides are in view; `peek` says how much of the next one
shows at each edge. `carouselMetrics` divides the measured track between them:

```
├ peek ┼ gap ┼──── item ────┼ gap ┼──── item ────┼ gap ┼ peek ┤
```

A carousel whose slide width is given in points is a carousel that is wrong on the next
screen size — so it is not a prop, and the arithmetic lives in `utils/carousel.ts` where it
is read and tested rather than in the component where it is neither.

**The peek brings a gap of its own.** The run it costs at each edge is `peek + gap`, not
`peek`; without that second term the peeking neighbour touches the slide in view, and a
carousel whose slides touch reads as one wide image that has been cut.

Everything is clamped at zero. A track too narrow for the gaps and the peeks it was asked
for gives slides of no width rather than negative ones.

## Every control is a slot, not a prop

| slot                  | what it is                                         |
| --------------------- | -------------------------------------------------- |
| `Carousel.Content`    | the track                                          |
| `Carousel.Item`       | one slide                                          |
| `Carousel.Previous`   | back one, over the slides                          |
| `Carousel.Next`       | on one                                             |
| `Carousel.Indicator`  | the row of dots                                    |
| `Carousel.Dot`        | one of them, for an indicator you compose yourself |
| `Carousel.Counter`    | `3 / 12`                                           |
| `Carousel.Thumbnails` | a strip of small versions of the slides            |
| `Carousel.Thumbnail`  | one of them                                        |

A carousel that wants dots and no arrows leaves the arrows out. There is no
`showArrows={false}`, and there is no order to respect — the indicator above the track is a
`<Carousel.Indicator />` written first.

### The arrows are over the slides

An arrow in the flow would move the track it belongs to, and then the two would disagree
about where the middle is. They are centred on the **track's** own measured height, so a
carousel with dots under it does not have its arrows sitting low.

At the end of a series that does not loop an arrow **stays in place and goes quiet** —
disabled, not removed. A control that disappears at the last slide takes its width with it
and shifts everything beside it.

They need an `accessibilityLabel`, and there is a development warning when one is missing. A
chevron is not text, and unlike a labelled button there is nothing beside it to fall back on
— and no default, because which language it would be in is not this library's to decide.

### The dot is the pill

The chosen dot **grows in the row** rather than being covered by a wider node over it. An
overlay keeps the row's width fixed, so the pill spills over the dots either side and the
reader sees a lozenge with a grey dot half under it.

It follows the **drag**, not the settle: the width and the colour are interpolated from the
live scroll offset on the UI thread, so the pill grows out of one dot and into the next while
the finger is still down. That is what makes a reader believe the indicator is attached to
the thing they are moving.

A screen reader hears "3 of 5" through `accessibilityValue` rather than a label, for the
same reason the arrows have no default one.

### The thumbnails show what they point at

The one thing dots cannot do: on a series of photographs a reader picks the one they want
rather than counting across to it. The ring around the chosen one is always drawn and only
its colour moves — a border that appears on selection nudges every thumbnail after it along
the strip.

## The index

`index` / `defaultIndex` / `onIndexChange`, controlled or not, as everywhere in the library.

It changes as the track **crosses** the halfway point, not when it stops. `onMomentumScrollEnd`
would be the obvious place and it is the wrong one twice: it never fires for a wheel or a
trackpad, so under the web renderer the index would never move at all; and it lands after the
fact, so the arrows and the thumbnails would sit on the previous slide for the length of the
deceleration.

A fast flick across three slides therefore reports three changes. That is what happened.

## `hasLoop` is about the arrows

Unset, they stop at the ends. Set, they wrap.

**Autoplay always wraps**, whatever `hasLoop` says. That prop answers "what does the arrow do
at the last slide"; an autoplay that stopped there would be one that quietly dies.

## `autoPlayInterval` stops at the first interaction

And does not come back. A carousel that resumes moving under a reader who has taken hold of it
is a carousel fighting them. A drag, an arrow, a dot or a thumbnail all count.

It is a number of milliseconds rather than a `hasAutoPlay` beside an interval, because the two
would only ever be set together.

## Variants

The four emphases, narrowed as `Card` and `Surface` narrow them: a carousel reports nothing —
it is a way of arranging what does — so `success` or `danger` would be an intent nothing here
has.

| variant     | the arrows                  |
| ----------- | --------------------------- |
| `primary`   | on `surface`                |
| `secondary` | on `default`                |
| `tertiary`  | on `surface`, with a border |
| `ghost`     | no ground at all            |

The arrows sit **on** a slide, so their ground is the raised one rather than the page's: a
control the same colour as the page vanishes over a pale photograph. `ghost` is what a
carousel over a dark photograph wants and what one over a white photograph must not use.

`color` lands where the variant put its roles — the active pill and the chevron. The dots at
rest keep their neutral fill: they are the ground the pill travels on, and a pale tint of the
accent there reads as a control that has half failed to load.

## Size

`size` moves the arrows, the dots, the gap between slides, the thumbnails and the counter's
type — **never a slide**. A slide's width is the track's; its height is whatever is in it.

## Accessibility

The arrows are buttons and carry `accessibilityState.disabled` at the ends. The dots and the
thumbnails carry `accessibilityValue` — position and total — and `accessibilityState.selected`.

What is _in_ a slide or a thumbnail is yours, so an image with its own `accessibilityLabel` is
how a slide says what it shows.

## Props

Every node takes R14's style props for its own style type and forwards `ref`, `testID` and the
a11y props.

`useCarousel()` is exported: it returns the resolved styles, the metrics, the index, the count
and the live scroll offset — so an indicator of your own is written the same way the shipped
one is.
