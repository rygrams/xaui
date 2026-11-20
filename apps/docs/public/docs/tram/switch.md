# Switch

A setting that is on or off, drawn the Metro way: a rectangular track inside a line,
filled with the accent up to the middle of a block thumb that stands above and below it.

The root is the whole row, so a tap on the label flips the switch too. The thumb can also
be dragged: let go past the half, it turns on.

## Import

```tsx
import { Switch } from '@xaui/tram/switch'
```

## Anatomy

```tsx
<Switch>
  <Switch.Label />
  <Switch.State />
  <Switch.Track>
    <Switch.Thumb />
  </Switch.Track>
</Switch>
```

- **`Switch`** — the root: the pressable row. It owns the state, resolves the recipe and
  hands the styles to its slots. A string child becomes a `Switch.Label` written before a
  default track and thumb.
- **`Switch.Label`** — the setting's name, in the size's type.
- **`Switch.State`** — the state written out, Metro's large `on` / `off` at the start of
  the row. It takes the two texts as `on` and `off` rather than children.
- **`Switch.Track`** — the rectangle the thumb slides on, with the accent filled from its
  start. The drag is caught here.
- **`Switch.Thumb`** — the block. Children are a glyph that travels with it.

## Usage

### Basic

```tsx
<Switch isSelected={isOn} onSelectedChange={setIsOn}>
  dark mode
</Switch>
```

### Uncontrolled

```tsx
<Switch defaultSelected>sync</Switch>
```

### Composed

JSX order is screen order: the Metro row reads from its start and ends on the switch.

```tsx
<Switch size="lg" accent="lime" defaultSelected>
  <Switch.Label>wi-fi</Switch.Label>
  <Switch.Track>
    <Switch.Thumb />
  </Switch.Track>
</Switch>
```

### State written out

A row whose only text is its state has no name to announce: give it an
`accessibilityLabel`.

```tsx
<Switch accessibilityLabel="wi-fi" justifyContent="space-between">
  <Switch.State on="on" off="off" />
  <Switch.Track>
    <Switch.Thumb />
  </Switch.Track>
</Switch>
```

Tram ships no language: the two words are the app's.

## Sizes

```tsx
<Switch size="sm">sm</Switch>
<Switch size="md">md</Switch>
<Switch size="lg">lg</Switch>
```

`size` drives the track, the thumb, the gap and the label's type; `lg` is Windows Phone's.
`sm` and `md` are drawn under 48 points, and a hit slop makes up the touch target.
`radius` overrides the corner of the track and thumb, within 2.

## Colour

The track fills with the theme's accent. `accent` picks one of the twenty named accents;
`color` takes a raw `#RRGGBB` and wins when both are set. The fill is flat, so a named
accent is its true colour. The line and the thumb stay the page's ink.

```tsx
<Switch accent="magenta">notifications</Switch>
```

## Accessibility

- The root has the `switch` role, with `checked` and `disabled` in its state and
  `aria-checked` on the web. A caller's `accessibilityState` is merged, not replaced.
- A flip is felt through `TramProvider`'s `onHaptic`, as a `selection`.
- Under the finger the thumb squashes; with motion reduced it keeps its full size.
  `animation="disable-all"` also places the thumb with no slide.
- A disabled switch greys the track, the thumb and the label, and stops the press and the
  drag.

## Differences from Native

- **No `variant`**: Native's `primary` and `secondary` are two shapes of one control, and
  the Metro switch has one.
- **`accent`** is added: one of the twenty named accents.
- **`Switch.State`** is added: the state written out at the start of the row.
- **The label** is written before the track, not after it.
- **The thumb** is a block over a lined track, tapped or dragged. The drag uses
  `react-native-gesture-handler`, an optional peer.
- **The corner** stays within 2, the Tram radius scale.
