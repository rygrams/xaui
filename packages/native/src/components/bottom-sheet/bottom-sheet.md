# BottomSheet

A surface that comes up from the bottom edge and can be thrown back down.

## Import

```tsx
import { BottomSheet } from '@xaui/native/bottom-sheet'
```

`react-native-gesture-handler` is an **optional** peer of this package, and this component
needs it. It is imported here and in the `Slider`, so an app that uses neither never pays
for it.

## Anatomy

```tsx
<BottomSheet>
  <BottomSheet.Trigger>…</BottomSheet.Trigger>
  <BottomSheet.Overlay />
  <BottomSheet.Content>
    <BottomSheet.Handle />
    <BottomSheet.Title>…</BottomSheet.Title>
    <BottomSheet.Description>…</BottomSheet.Description>
    <BottomSheet.Close>…</BottomSheet.Close>
  </BottomSheet.Content>
</BottomSheet>
```

- **`BottomSheet`** — state and resolved style. **It renders no node.**
- **`BottomSheet.Trigger`** — what brings it up.
- **`BottomSheet.Overlay`** — the backdrop. It dims, and closes on a press.
- **`BottomSheet.Content`** — the sheet, and the gesture.
- **`BottomSheet.Handle`** — the grab bar.
- **`BottomSheet.Title`** / **`BottomSheet.Description`** — its two texts.
- **`BottomSheet.Close`** — anything that sends it back down.

## Usage

### Basic

```tsx
<BottomSheet>
  <BottomSheet.Trigger asChild>
    <Button>Partager</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Overlay />
  <BottomSheet.Content>
    <BottomSheet.Handle />
    <BottomSheet.Title>Partager ce document</BottomSheet.Title>
  </BottomSheet.Content>
</BottomSheet>
```

### One that cannot be escaped

```tsx
<BottomSheet.Overlay isDismissable={false} />
<BottomSheet.Content isSwipeable={false}>…</BottomSheet.Content>
```

**Two separate refusals**, because a sheet that can be tapped away but not dragged is a real
design, and so is the reverse.

### Style as props

```tsx
<BottomSheet.Content padding={24} />
<BottomSheet.Handle width={48} />
```

Full RN names, full RN values (R14). Every node takes them.

## Props

### `BottomSheet`

| prop               | type                        | default | description                                   |
| ------------------ | --------------------------- | ------- | --------------------------------------------- |
| `radius`           | `RadiusKey`                 | —       | Overrides the **top** corners                 |
| `isOpen`           | `boolean`                   | —       | Controlled                                    |
| `defaultOpen`      | `boolean`                   | `false` | Uncontrolled                                  |
| `onOpenChange`     | `(isOpen: boolean) => void` | —       | Fires on open and on close                    |
| `isDisabled`       | `boolean`                   | `false` | Stops the trigger                             |
| `dismissThreshold` | `number`                    | `0.35`  | How far down, as a fraction of its own height |

`radius` moves the **top** corners only. A sheet sits on the bottom edge of the screen, so
its lower corners are off it — rounding them would put two arcs against a straight edge
nobody can see.

No `variant`: a sheet is the theme's floating surface, with no emphasis to report.

### `BottomSheet.Content`

`isSwipeable` (default `true`), plus `ViewProps` and `ViewStyle` as props.

### `BottomSheet.Handle`

Written by you, not drawn by the content — a sheet with `isSwipeable={false}` should not
advertise a gesture it refuses. It is the **only** thing telling a reader the sheet can be
dragged, so leave it out only when the drag is off.

## How the gesture works

**It measures its own height, then slides that far.** A sheet is as tall as what is in it,
and nothing else on the screen knows that number — the first layout is what tells the
animation how far "down" is. Until it has one the sheet waits off-screen at a pessimistic
distance rather than flashing at its resting place for a frame.

**Downward only.** A sheet dragged upward has nowhere to go — it is already against the top
of its own content — and letting it stretch there is a rubber-band nobody asked for.

**Far enough or fast enough.** Past `dismissThreshold` of its height it closes; so does a
flick over 900 points a second, whatever the distance. Without the second, a quick flick
from the top of a tall sheet is refused however clearly it meant to throw the thing away.
Anything short of either springs back.

## A reduced state

```tsx
<BottomSheet collapsedHeight={200} defaultExpanded={false}>
  <BottomSheet.Content>
    <BottomSheet.Handle accessibilityLabel="Réduire ou déplier la fiche" />…
  </BottomSheet.Content>
</BottomSheet>
```

`collapsedHeight` gives the sheet a **second disclosure inside the first**: it is either up
or gone, and while it is up it is either full or reduced. `isExpanded`, `defaultExpanded`
and `onExpandedChange` control it the way `isOpen` controls the other one.

**These are not snap points.** There are two heights, not an array of them, and the reduced
one is a number you give rather than a fraction of the screen the sheet works out.

**The sheet is not re-laid out.** It is the same box at its full height, moved further down,
so the tail below the reduced height slides off the bottom of the screen and comes back
untouched. Nothing re-measures — which is why a bare `collapsedHeight` cuts wherever the
number happens to land, and why `BottomSheet.Summary` below exists.

### `BottomSheet.Summary` — cut at a seam you chose

```tsx
<BottomSheet defaultExpanded={false}>
  <BottomSheet.Content>
    <BottomSheet.Handle accessibilityLabel="Réduire ou déplier la fiche" />
    <BottomSheet.Summary>
      <BottomSheet.Title>Café des Arts</BottomSheet.Title>
      <BottomSheet.Description>★★★★☆ · Ouvert jusqu'à 22 h</BottomSheet.Description>
    </BottomSheet.Summary>
    <Hours />
    <Reviews />
  </BottomSheet.Content>
</BottomSheet>
```

It is `<summary>` to the sheet's `<details>`, and the same thing an `Accordion.Trigger` is:
**the part that survives**, not a second view for the reduced state. It renders in both —
what changes is whether everything under it does — so it costs no extra layout.

**It reports where its bottom edge falls**, not how tall it is, so whatever sits above it is
counted too: a handle above a summary stays visible when the sheet reduces. That is why it
must be a **direct child of `Content`** — `y` is relative to the immediate parent, and a
summary wrapped in a `View` would report the wrapper's coordinates.

**The sheet adds its own bottom padding back onto that edge.** Cutting on the summary's last
pixel would leave the reduced sheet with air above the handle and none at all under the last
line — the text against the screen edge, and under the gesture bar on a phone that has one.
The reduced sheet ends with the padding its expanded self ends with, and overriding the
sheet's `padding` moves the seam with it.

`collapsedHeight` is not extended that way. It is a number you wrote against a sheet you
were looking at, and two hundred points showing has to mean two hundred.

Give both and the summary wins, with a warning in development: a measurement of the content
is truer than a number that has to be kept in step with it.

### Where a drag goes

A drag that was not decisive puts the sheet back, whatever distance it covered. Decisive is
past `dismissThreshold` of the sheet's height **or** faster than 900 points a second, either
alone being enough.

| from      | decisive down                                                    | decisive up |
| --------- | ---------------------------------------------------------------- | ----------- |
| expanded  | collapsed — or **closed**, if the throw was aimed past the notch | —           |
| collapsed | closed                                                           | expanded    |

The exception in the first row is the one thing a strict one-state-per-drag rule gets wrong:
dragging a sheet the whole way to the bottom and having it stop half open reads as a
refusal. Where the throw was aimed is the release point plus 0.15 s of its velocity.

Without a `collapsedHeight` there is no middle row and no exception — the sheet behaves
exactly as it always has.

### The handle becomes a control

On a collapsible sheet `BottomSheet.Handle` is pressable, the way an `Accordion.Trigger` is,
and a press toggles the two heights. That is not decoration acquiring a behaviour by
accident: a drag would otherwise be the only way in and out of the reduced state, and a drag
is a gesture some people cannot perform. It carries `accessibilityRole="button"` and
`accessibilityState={{ expanded }}`, and warns in development without an
`accessibilityLabel` — a pill says nothing to someone who cannot see it.

Without a `collapsedHeight` the handle stays what it was: a pill, hidden from screen
readers, taking no touches.

**The backdrop does not know about any of this.** A reduced sheet is often a persistent
panel rather than a modal, and a dimmed page behind one reads oddly — leave
`BottomSheet.Overlay` out, or drive its own props, if that is the sheet you are building.

## Not `@gorhom/bottom-sheet`

HeroUI wraps it. A sheet that slides, springs and dismisses is a pan gesture and a shared
value; taking a dependency for that would put a second animation library in every app that
installs one component. What we lose is their scroll integration, which is worth having and
worth its own change rather than a dependency.

Their snap points we do not have and are not planning: `collapsedHeight` covers the case
they are almost always used for, with two named states instead of an array of positions.

## Accessibility

The sheet is `accessibilityViewIsModal`, so a screen reader stops at it rather than reading
the page behind — the spoken half of what the backdrop says visually. The title is a
`header`. The handle and the overlay announce nothing: a pill carries no information, and
the drag it stands for is not a gesture a screen reader performs.
