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

## Not `@gorhom/bottom-sheet`

HeroUI wraps it. A sheet that slides, springs and dismisses is a pan gesture and a shared
value; taking a dependency for that would put a second animation library in every app that
installs one component. What we lose is their snap points and their scroll integration —
both worth having, and both worth their own change rather than a dependency.

## Accessibility

The sheet is `accessibilityViewIsModal`, so a screen reader stops at it rather than reading
the page behind — the spoken half of what the backdrop says visually. The title is a
`header`. The handle and the overlay announce nothing: a pill carries no information, and
the drag it stands for is not a gesture a screen reader performs.
