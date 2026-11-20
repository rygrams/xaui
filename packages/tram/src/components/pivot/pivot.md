# Pivot

The Metro pivot: giant titles in a row that loops, over the section they name — the current
title on the margin in the page's ink, the others grey after it, and the whole row sliding
with the sections under the finger.

`Pivot` is Tram's own, with no Native equivalent. A `Pivot` filters one set of things
several ways; a `Panorama` shows several things. It is not `Tabs`: it has no size and no
rule, and past the last section the first one comes back.

## Import

```tsx
import { Pivot } from '@xaui/tram/pivot'
```

## Anatomy

```tsx
<Pivot>
  <Pivot.Title />
  <Pivot.Header />
  <Pivot.Section />
</Pivot>
```

- **`Pivot`** — the root. It fills what holds it, draws the theme's ground and holds the
  section on screen.
- **`Pivot.Title`** — the app's name above the titles, on `caption` in the page's ink. It
  does not move. Its case is the app's.
- **`Pivot.Header`** — one title of the row, on `pivot`, Light, tied to its section by its
  `value`. It is written beside the sections and laid by the root in the loop's order.
- **`Pivot.Section`** — one section, named by its `value`. The order of the sections is the
  loop's.

`Pivot.Header` and `Pivot.Section` are direct children of the root: it sorts its children
and never reads a grandchild.

## Usage

### Basic

```tsx
<Pivot defaultValue="all">
  <Pivot.Title>MAIL</Pivot.Title>
  <Pivot.Header value="all">all</Pivot.Header>
  <Pivot.Header value="unread">unread</Pivot.Header>
  <Pivot.Header value="flagged">flagged</Pivot.Header>
  <Pivot.Section value="all">{/* … */}</Pivot.Section>
  <Pivot.Section value="unread">{/* … */}</Pivot.Section>
  <Pivot.Section value="flagged">{/* … */}</Pivot.Section>
</Pivot>
```

### Controlled

```tsx
<Pivot value={filter} onValueChange={setFilter}>
  {/* … */}
</Pivot>
```

`value`, `defaultValue` and `onValueChange` work by the sections' `value`. Without
`defaultValue` the first section is shown first.

### Moving through it

A swipe across the screen drags the loop a section per screen width: the titles slide by
their own advance and fade between grey and ink, the sections slide a screen apart and
fade. A release moves on a section either way, round the loop, when flung past 500 points
per second or dragged a quarter of the screen, and settles on the `navigation` spring, felt
as a `selection`.

A title pressed — or a `value` set from outside — is reached going forward, the way the row
slides. On the web, the arrow keys step either way and move the focus.

A drag that is mostly vertical stays the section's: a `ScrollView` inside a section
scrolls. Every section stays mounted.

### `asChild`

With `asChild`, your one element is the pivot's frame: the slots are written inside it, and
its props and ref merge with the root's.

## Accessibility

- The row is a `tablist`, the titles `tab`s and the sections `tabpanel`s; only the current
  section is read by a screen reader. `Pivot.Title` is a `header`.
- With motion reduced, the titles are laid for the nearest section and the sections fade
  where they stand. Under an ancestor's `disable-all` it is placed.
- The row is mirrored in right-to-left layouts.
