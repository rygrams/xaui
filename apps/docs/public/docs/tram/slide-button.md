# SlideButton

A button you drag rather than tap, drawn as the Metro lock screen: a rectangle in the
`Button`'s line, a block of the accent at its start, and a slide toward the end that fills
the whole box with the accent once it counts.

It is the confirmation for an action that must not happen by accident: `onConfirm` fires
once, when the thumb is let go past `threshold`.

## Import

```tsx
import { SlideButton } from '@xaui/tram/slide-button'
```

## Anatomy

```tsx
<SlideButton>
  <SlideButton.Fill />
  <SlideButton.Label />
  <SlideButton.Thumb>
    <SlideButton.Icon />
  </SlideButton.Thumb>
</SlideButton>
```

- **`SlideButton`** — the box. It measures itself and owns the drag and the confirmed
  state. A bare string composes the fill, the label and the thumb for you.
- **`SlideButton.Fill`** — the trail behind the thumb, the accent's soft slice up to the
  middle of the thumb. Leave it out for a bare box.
- **`SlideButton.Label`** — the instruction, centred across the box and kept clear of the
  thumb.
- **`SlideButton.Thumb`** — the block of the accent the finger drags. It draws a chevron
  pointing to the end, then a check once confirmed; children replace both.
- **`SlideButton.Icon`** — a mark in the thumb. `size` and `color` default to the thumb's.
  It takes `Icon`'s forms (`as`, a raw SVG child, or `source`).

## Usage

### Basic

```tsx
<SlideButton onConfirm={unlock}>slide to unlock</SlideButton>
```

### Composed

```tsx
<SlideButton onConfirm={lock} accessibilityLabel="slide to lock">
  <SlideButton.Fill />
  <SlideButton.Label>slide to lock</SlideButton.Label>
  <SlideButton.Thumb>
    <SlideButton.Icon as={LockIcon} />
  </SlideButton.Thumb>
</SlideButton>
```

### Controlled

```tsx
<SlideButton isConfirmed={isReset} onConfirm={() => setIsReset(true)}>
  {isReset ? 'theme reset' : 'reset the theme'}
</SlideButton>
```

Uncontrolled, a confirmed slide stays confirmed (`defaultConfirmed` sets the start).
Controlled, set `isConfirmed` back to `false` to re-arm it; a caller that refuses the
confirm sends the thumb home.

### Threshold

```tsx
<SlideButton threshold={1}>all the way</SlideButton>
```

How far along the track the thumb has to reach, from 0 to 1 — `0.9` by default. Let go
short of it and the thumb springs home.

### The drag

The drag runs on `react-native-gesture-handler`, an optional peer. It takes only after 6
points sideways, so a vertical swipe stays the page's scroll. While held, the thumb
squashes a little.

## Sizes

```tsx
<SlideButton size="sm">sm</SlideButton>
<SlideButton size="md">md</SlideButton>
<SlideButton size="lg">lg</SlideButton>
```

The box is 48, 56 or 64 tall — a control height and 4 inside on each side — and the thumb
is a control height wide. `size` sets the label's type too (`subtitle` at `lg`), never the
width. `radius` sets the box and the thumb, capped at the Tram corner of 2, `full`
included.

## Colour

The thumb, the trail and the confirmed box are the theme's accent. `accent` picks another
of the twenty named accents; `color` takes a raw `#RRGGBB` and wins when both are set. The
line at rest stays the page's ink. Once confirmed, the label turns to the ink that reads
on the accent (`onAccent`) and the thumb inverts round a check.

```tsx
<SlideButton color={theme.colors.danger} onConfirm={wipe}>
  slide to erase
</SlideButton>
```

`isDisabled` greys the line, the thumb and the label, and stops the drag.

## Accessibility

- The box is one accessible element with the `button` role and a `disabled` state.
- A screen reader cannot drag: the `activate` action confirms. The box is still not
  confirmed by a plain tap.
- On the web the box is a tab stop, and Enter or Space confirms it.
- The grab is felt as a `press` haptic and the confirmation as a `longPress`, through
  `TramProvider`'s `onHaptic`.
- The chevron points to the end, mirrored right to left.
- Under reduced motion the thumb's squash is dropped and the fill-in is a short fade.

## Differences from Native

- **No `variant`.** One drawing: a line around the box and a block of the accent in it. A
  destructive slide is a raw `color`.
- **`accent`** is added.
- **The handle** is a flat block, not a shadowed pill, and the box is a rectangle under
  the Tram corner, never a pill.
- **A refused confirm**: a controlled caller that does not set `isConfirmed` sends the
  thumb home.
- **The root** is one accessible element, and Enter or Space confirms on the web.
