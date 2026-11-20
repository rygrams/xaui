# Fab

The one thing to do on a screen, drawn as the round button of the Metro App Bar: a circle
in a band of the discreet `surface`, docked edge to edge on the bottom of the nearest
positioned ancestor — a flat circle of the accent, or the App Bar's thin circle.

It never sits in the flow. The band comes up from the bottom edge on the `navigation`
spring and leaves the same way; a press leans the circle toward the finger.

## Import

```tsx
import { Fab } from '@xaui/tram/fab'
```

## Anatomy

```tsx
<Fab>
  <Fab.Icon />
  <Fab.Label />
  <Fab.Spinner />
</Fab>
```

- **`Fab`** — the root: the band and the circle in it.
- **`Fab.Icon`** — the glyph, at the size's scale and in the ink that reads on the circle.
  It takes `Icon`'s three forms: `as`, a raw SVG child, or `source`.
- **`Fab.Label`** — a caption laid under the circle, drawn only while `isExtended`. A bare
  string child is a label too.
- **`Fab.Spinner`** — the busy ring. `isLoading` puts one in the glyph's place when none
  is composed; `animation={false}` stops its rotation.

## Usage

### Basic

```tsx
<Fab accessibilityLabel="New message" onPress={compose}>
  <Fab.Icon as={PlusIcon} />
</Fab>
```

### Extended

```tsx
<Fab isExtended placement="bottom-end" onPress={compose}>
  <Fab.Icon as={PlusIcon} />
  <Fab.Label>new</Fab.Label>
</Fab>
```

The circle does not stretch: the label is laid under it in the band's ink, centred, on one
line no wider than the circle plus the band's side padding, and the band rises by its
height. A visible label names the button.

### Showing and hiding

```tsx
<Fab isVisible={!isScrolling} accessibilityLabel="New">
  <Fab.Icon as={PlusIcon} />
</Fab>
```

`isVisible={false}` sends the band under the bottom edge, where it can be neither seen,
pressed nor read. A change of `placement` is a way out, then a way in.

### Safe area

`offset` is the band's padding under the circle (8 by default). The bottom safe area is
added under it, from the hook the app handed `TramProvider`
(`safeArea={{ useSafeAreaInsets }}`). `hasSafeArea={false}` leaves it out, for a band
docked in a box that does not reach the screen's bottom edge.

### Placement

`placement` is `bottom-start`, `bottom-center` (default) or `bottom-end`: where the
circle sits across its band.

## Variants

| Variant     | Drawn as                                                    |
| ----------- | ----------------------------------------------------------- |
| `contained` | a flat fill of the true colour, the glyph in the ink on it  |
| `outline`   | the App Bar's button: a line of 2 and a glyph in the colour |

Both are the same size: the filled circle draws its line in its fill. `contained` is the
default.

## Sizes

```tsx
<Fab size="sm" accessibilityLabel="New"><Fab.Icon as={PlusIcon} /></Fab>
<Fab size="md" accessibilityLabel="New"><Fab.Icon as={PlusIcon} /></Fab>
<Fab size="lg" accessibilityLabel="New"><Fab.Icon as={PlusIcon} /></Fab>
```

The circle is 32, 40 or 48 across, around a glyph of 16, 20 or 24. Every size is pressed
as 48: `hitSlop` makes up the rest.

## Colour

`accent` takes one of the twenty named accents: a `contained` circle is filled with its
true colour, the glyph black or white, whichever reads; an `outline` is drawn in its ink,
moved until it reads on the band. `color` takes a raw tint, is never corrected, and wins
when both are set.

## Accessibility

- The circle has the `button` role and announces `disabled` and `busy`.
- A `Fab` with no visible label needs an `accessibilityLabel`, and warns in development
  without one. A visible label names the button without being read twice.
- Hidden by `isVisible={false}`, the band is out of the accessibility tree.
- A press is felt as `press` through `TramProvider`'s `onHaptic`. With motion reduced the
  circle does not lean; the spinner still turns, and is a fixed ring under `disable-all`.
- No focus ring is drawn on the web.

## Differences from Native

- **`radius`** is dropped: a Tram `Fab` is a circle.
- **`variant`** is `contained` or `outline`, Tram's two drawings.
- **`placement`** is never unset and only along the bottom.
- **`accent`** is added; `color` wins and is never corrected.
- **No shadow**; Native carries one at rest.
- **The extended label goes under the circle**, a caption in the band's ink; Native writes
  it beside the glyph in a pill.
- **`isVisible`** is added.
- **`isLoading`** keeps the colours; Native dims.
- **Disabled** is a flat grey circle, or a grey line and glyph, not an opacity.
- **Smaller**: 32 / 40 / 48 across, where Native's are 40 / 56 / 72.
