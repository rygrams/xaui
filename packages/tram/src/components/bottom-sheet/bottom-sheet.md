# BottomSheet

A surface that comes up from the bottom edge and can be thrown back down, drawn as the
Metro sheet: a band the full width of the screen in the theme's contrast — white on the
dark theme, black on the light one — over the page dimmed, with no line, no shadow and no
corner.

The band has one height, its content's. It rises on the Metro curve and is dragged back
down. What is put on it reads the theme's other mode, so a field or an `outline` `Button`
on the band draws in the band's ink with nothing said.

## Import

```tsx
import { BottomSheet } from '@xaui/tram/bottom-sheet'
```

## Anatomy

```tsx
<BottomSheet>
  <BottomSheet.Trigger />
  <BottomSheet.Overlay />
  <BottomSheet.Content>
    <BottomSheet.Title />
    <BottomSheet.Close />
    <BottomSheet.Description />
  </BottomSheet.Content>
</BottomSheet>
```

- **`BottomSheet`** — the root. It renders no node: it holds whether the band is up, its
  motion and the styles the slots read.
- **`BottomSheet.Trigger`** — what brings the band up. It paints nothing of its own:
  `asChild` makes it a `Button`; a string is set in `body`.
- **`BottomSheet.Overlay`** — the dimmed page behind the band. A touch on it closes the
  sheet unless `isDismissable` is off.
- **`BottomSheet.Content`** — the band. It measures its own height and slides that far,
  and its bottom padding takes the safe area handed to `TramProvider`.
- **`BottomSheet.Title`** — the heading.
- **`BottomSheet.Description`** — the text under it.
- **`BottomSheet.Close`** — anything that sends the band down. Left empty, it is the
  `CloseButton`'s cross without its circle, pinned in the band's top-end corner.
  `asChild` makes it one of your buttons: the caller's `onPress` runs, then the band goes.

## Usage

### Basic

```tsx
<BottomSheet>
  <BottomSheet.Trigger asChild>
    <Button>share</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Overlay />
  <BottomSheet.Content>
    <BottomSheet.Title>share</BottomSheet.Title>
    <BottomSheet.Close accessibilityLabel="close" />
    <BottomSheet.Description>a read-only link.</BottomSheet.Description>
  </BottomSheet.Content>
</BottomSheet>
```

### Answers on the band

```tsx
<BottomSheet.Close asChild>
  <Button>add to cart</Button>
</BottomSheet.Close>
<BottomSheet.Close asChild>
  <Button variant="outline">later</Button>
</BottomSheet.Close>
```

### Controlled

```tsx
<BottomSheet isOpen={isOpen} onOpenChange={setOpen}>
  <BottomSheet.Overlay />
  <BottomSheet.Content>…</BottomSheet.Content>
</BottomSheet>
```

### One that has to be answered

```tsx
<BottomSheet.Overlay isDismissable={false} />
<BottomSheet.Content isSwipeable={false}>…</BottomSheet.Content>
```

`isDismissable={false}` stops a touch on the dimmed page and the system's back from
closing it; `isSwipeable={false}` stops the drag.

### The drag

A decisive drag down sends the band away; anything else springs it back.
`dismissThreshold` is how far down it has to be dragged before letting go closes it, as a
fraction of its height — `0.35` by default. The pan is `react-native-gesture-handler`'s,
an optional peer.

`isDisabled` greys the trigger, which then opens nothing.

## Accessibility

- The band is a modal dialog (`accessibilityViewIsModal`, `role="dialog"`), named by its
  title and described by its description. A screen reader stops at it, and the focus
  moves to it as it opens and back to the trigger once it has gone.
- The trigger carries `expanded` and `aria-haspopup="dialog"`; the title is a `header`.
- An empty `BottomSheet.Close` needs an `accessibilityLabel` — the cross is not text.
- The band is a `Modal`, so the system's back closes it unless the overlay is not
  dismissable.
- It rises in 250 ms on the Metro curve and sinks on the exit curve; with motion reduced
  it fades.

## Differences from Native

- **One height, the content's**: no `Handle`, no `Summary`, no `collapsedHeight` or
  `isExpanded` — the head is the title and an empty `Close`.
- **`BottomSheet.Close`** left empty draws the cross in the top-end corner, where
  Native's draws nothing.
- **The band** is the theme's contrast, edge to edge, with no corner and no shadow; what
  is put on it reads the theme's other mode.
- **`radius`** is kept so the two roots take the same props, and draws nothing.
- **It is a `Modal`**, as the Tram `Dialog`, where Native's is drawn in a portal: it keeps
  the theme it was written under and covers the navigation.
