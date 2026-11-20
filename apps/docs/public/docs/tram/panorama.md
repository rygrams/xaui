# Panorama

The Metro hub: one wide page slid across section by section under a giant title, the title
and the backdrop travelling slower than the sections so the page reads as one surface seen
through the screen.

`Panorama` is Tram's own, with no Native equivalent. A `Pivot` filters; a `Panorama` shows.
Each section is the screen's width less 48 points, so the start of the next one always
shows at the end. The track does not loop: the last section rests against the screen's end.

## Import

```tsx
import { Panorama } from '@xaui/tram/panorama'
```

## Anatomy

```tsx
<Panorama>
  <Panorama.Background />
  <Panorama.Title />
  <Panorama.Section>
    <Panorama.Header />
  </Panorama.Section>
</Panorama>
```

- **`Panorama`** — the root. It fills what holds it, draws the theme's ground and holds the
  section on screen.
- **`Panorama.Background`** — what lies behind everything, wider than the screen: a picture,
  flat blocks of colour. It travels exactly a quarter as far as the sections.
- **`Panorama.Title`** — the giant title, `hero`, on one line at its natural width and
  clipped by the root. It travels a shorter way than the sections.
- **`Panorama.Section`** — one section, named by its `value`.
- **`Panorama.Header`** — a section's header, on `pivot`, Light, in the page's ink.

## Usage

### Basic

```tsx
<Panorama>
  <Panorama.Background>
    <Image source={cover} style={{ flex: 1 }} />
  </Panorama.Background>
  <Panorama.Title>music + videos</Panorama.Title>
  <Panorama.Section value="collection">
    <Panorama.Header>collection</Panorama.Header>
    {/* … */}
  </Panorama.Section>
  <Panorama.Section value="new">
    <Panorama.Header>new</Panorama.Header>
    {/* … */}
  </Panorama.Section>
</Panorama>
```

### Controlled

```tsx
<Panorama value={section} onValueChange={setSection}>
  {/* … */}
</Panorama>
```

`value`, `defaultValue` and `onValueChange` work by the sections' `value`, as on `Tabs`.
Without `defaultValue` the first section is shown first. Setting `value` from outside moves
the track.

### The swipe

The sections follow the finger, a third as fast past either end. A release moves on a
section when flung past 500 points per second or dragged a quarter of a section, and
settles on the `navigation` spring, felt as a `selection`. While the track rubber-bands, the
title and the backdrop hold at their ends.

A drag that is mostly vertical stays the section's: a `ScrollView` inside a section scrolls.

### `asChild`

With `asChild`, your one element is the panorama's frame: the slots are written inside it,
and its props and ref merge with the root's.

## Accessibility

- Only the current section is read by a screen reader; the others and the background are
  hidden. `Panorama.Header` is a `header`.
- `Panorama.Title` — or, without one, the current section's header — is `adjustable`, its
  value the section on screen. Its `increment` and `decrement` actions move to the next or
  the previous section.
- With motion reduced, the title and the backdrop stay put and the track fades to its
  section. Under an ancestor's `disable-all` it is placed.
- The track is mirrored in right-to-left layouts.
