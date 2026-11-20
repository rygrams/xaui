# AppBar

The Metro App Bar: a band of round buttons docked on an edge of the screen, and a "…" that
opens it to show their labels and a menu of words. It is Tram's own, with no Native
equivalent.

The band is the theme's discreet `surface`, edge to edge, with no line and no shadow. It
never sits in the flow: it is docked on the bottom edge of the nearest positioned ancestor,
or on its top one, and comes in from that edge and leaves by it.

## Import

```tsx
import { AppBar } from '@xaui/tram/app-bar'
```

## Anatomy

```tsx
<AppBar>
  <AppBar.Button>
    <AppBar.Icon />
    <AppBar.Label />
  </AppBar.Button>
  <AppBar.Menu>
    <AppBar.MenuItem />
  </AppBar.Menu>
</AppBar>
```

- **`AppBar`** — the band. It draws the "…" itself, only when there is something to
  uncover; the "…" is not a slot, and `moreLabel` names it for a screen reader.
- **`AppBar.Button`** — a thin circle, up to four of them, centred. A bare string child is
  its label. A press runs `onPress` and closes the bar.
- **`AppBar.Icon`** — the glyph in the circle, in the size and colour the button resolved.
- **`AppBar.Label`** — the word under the circle: a caption on one line, cut past the room
  the button has. Shown while the bar is open, or always with `hasLabels`.
- **`AppBar.Menu`** — the list of words under the circles, shown while the bar is open.
- **`AppBar.MenuItem`** — one entry of the menu. A press runs `onPress` and closes the bar.

## Usage

### Basic

Write it last, over the page, inside a positioned ancestor.

```tsx
<AppBar>
  <AppBar.Button onPress={compose}>
    <AppBar.Icon as={PlusIcon} />
    <AppBar.Label>new</AppBar.Label>
  </AppBar.Button>
  <AppBar.Button onPress={search}>
    <AppBar.Icon as={SearchIcon} />
    <AppBar.Label>search</AppBar.Label>
  </AppBar.Button>
  <AppBar.Menu>
    <AppBar.MenuItem onPress={openSettings}>settings</AppBar.MenuItem>
  </AppBar.Menu>
</AppBar>
```

### Placement

```tsx
<AppBar placement="top">…</AppBar>
```

`bottom` is the default. `top` keeps the same order — circles, labels, then the menu —
under the status bar, so it opens downward over the page.

### Modes

`mode="minimal"` folds the bar to a thin strip of its "…", which unfolds to the circles,
their labels and the menu. `hasLabels` keeps the labels shown with the bar closed.

```tsx
<AppBar mode="minimal">…</AppBar>
<AppBar hasLabels>…</AppBar>
```

### Open and visible

`isOpen`, `defaultOpen` and `onOpenChange` hold whether the bar is open. A touch on the
dimmed page, the system's back (not on the web), a press on a button or an entry, or
hiding the bar closes it. `isVisible={false}` sends the bar past its edge and back.

```tsx
<AppBar isVisible={!isScrolling}>…</AppBar>
```

### Safe area

The band runs under its edge's safe area, read from the hook handed to `TramProvider`
(`safeArea={{ useSafeAreaInsets }}`). Pass `hasSafeArea={false}` for a bar docked in a box
that does not reach the screen's edge.

## Sizes

```tsx
<AppBar size="sm">…</AppBar>
<AppBar size="md">…</AppBar>
<AppBar size="lg">…</AppBar>
```

The circles are 32, 40 and 48 across, the `Fab`'s; every size is pressed as 48 through
`hitSlop`.

## Colour

The circles and their glyphs are in the bar's own ink, white or black; the accent is left
to the page. `accent` draws them in a named accent, moved until it reads on the bar.
`color` takes a raw colour, wins over `accent`, and is never corrected.

```tsx
<AppBar accent="cobalt">…</AppBar>
```

## Accessibility

- The band has the `toolbar` role; hidden, it is not read.
- A button has the `button` role and takes its label's text as its accessibility label;
  the label itself is not read twice. A button with no label needs an
  `accessibilityLabel` (a warning in development says so).
- The "…" is a `button` carrying `expanded`; menu entries have the `menuitem` role.
- A disabled button or entry is drawn grey and carries `disabled`.
- A press tilts the control and is felt through `TramProvider`'s `onHaptic`.
- With motion reduced the bar's room is set at once and what is in it fades;
  `animation="disable-all"` sets everything down without a movement.
