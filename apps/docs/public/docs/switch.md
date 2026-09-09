# Switch

A setting that is on or off, and takes effect the moment it is flipped.

## Import

```tsx
import { Switch } from '@xaui/native/switch'
```

## Anatomy

```tsx
<Switch>
  <Switch.Track>
    <Switch.Thumb />
  </Switch.Track>
  <Switch.Label />
</Switch>
```

- **`Switch`** — the root, and it is the **row, not the track**. It is the pressable: it
  owns the state, resolves the recipe once (R5) and publishes it to its slots.
- **`Switch.Track`** — the bar the knob slides on, and the surface that says on or off.
- **`Switch.Thumb`** — the knob. The only thing on this component that moves.
- **`Switch.Label`** — what the setting is.

**The root is the row** so that tapping the label flips the switch — the `Checkbox`'s
shape, for the `Checkbox`'s reason.

**R3 — and the track comes with the auto-wrap:**

```tsx
<Switch>Mode sombre</Switch>
// is exactly
<Switch>
  <Switch.Track>
    <Switch.Thumb />
  </Switch.Track>
  <Switch.Label>Mode sombre</Switch.Label>
</Switch>
```

With no children at all it is the track alone — the form a settings list wants, where the
label is the row's own text.

## A switch is not a checkbox

They look like the same control with two skins and they are not:

|               | `Checkbox`                        | `Switch`              |
| ------------- | --------------------------------- | --------------------- |
| When it acts  | Later, when the form is submitted | **Immediately**       |
| What it says  | An intention                      | A state of the system |
| `isInvalid`   | Yes — the value can be wrong      | **No**                |
| Indeterminate | Yes — a "select all" needs it     | No                    |

There is no `isInvalid` here because a setting that has already taken effect has no later
moment at which it can be wrong. A setting that cannot be turned on is `isDisabled`, with
the reason written beside it.

## Usage

### Controlled, or not

```tsx
<Switch isSelected={isOn} onSelectedChange={setIsOn}>
  Mode sombre
</Switch>

<Switch defaultSelected onSelectedChange={save}>
  Synchroniser en Wi-Fi seulement
</Switch>
```

`onPress` still fires, composed with the flip.

### The two shapes

```tsx
<Switch variant="primary">Le pouce à l'intérieur</Switch>
<Switch variant="secondary">Le pouce par-dessus</Switch>
```

`variant` is a **geometry** axis on this component, which is unusual and deliberate — both
shapes are the accent when they are on, and what changes is where the knob sits:

- **`primary`** (the default) rides the thumb **inside** the track, clear of its edges by
  the track's own inset. The shape everything else in this library shares: a filled surface
  with something on it.
- **`secondary`** makes the track a thin bar and stands the thumb **over** it, overhanging
  above and below. Less ink, and the knob reads as the thing you drag.

They are the legacy component's `inside` and `overlap`, under the library's own two names —
the same two shapes, the same measurements, and one vocabulary across the whole v1 API
instead of a third pair of words for this component alone.

### A glyph on the knob

```tsx
<Switch.Track>
  <Switch.Thumb>
    <Icon as={CheckIcon} size={12} color={theme.colors.accent} />
  </Switch.Thumb>
</Switch.Track>
```

The knob's children travel with it. Anything else you put in the track stays where you put
it — a glyph at each end, for instance, which is what HeroUI's `StartContent` and
`EndContent` are; here they are two `View`s you position, because the track is a node you
were given rather than one that was hidden from you.

### Disabled

```tsx
<Switch isDisabled defaultSelected>
  Géré par votre organisation
</Switch>
```

On the row, not the track: what is disabled is the control, and the label is part of it.

### As another element

```tsx
<Switch asChild isSelected={isOn} onSelectedChange={setIsOn}>
  <Animated.View layout={LinearTransition}>…</Animated.View>
</Switch>
```

R12 — the caller's element **is** the row, so it takes the children it was written with and
the auto-wrap does not apply.

## Sizes

`primary` — the knob inside the track:

| `size` | Track   | Knob | Inset | Travel | Label |
| ------ | ------- | ---- | ----- | ------ | ----- |
| `sm`   | 44 × 26 | 20   | 3     | 18     | 14/20 |
| `md`   | 48 × 28 | 22   | 3     | 20     | 16/24 |
| `lg`   | 56 × 32 | 26   | 3     | 24     | 18/28 |

`secondary` — the knob over the bar:

| `size` | Track   | Knob | Inset | Travel | Label |
| ------ | ------- | ---- | ----- | ------ | ----- |
| `sm`   | 44 × 18 | 24   | 0     | 20     | 14/20 |
| `md`   | 48 × 18 | 26   | 0     | 22     | 16/24 |
| `lg`   | 56 × 20 | 30   | 0     | 26     | 18/28 |

`md` is the legacy switch measured — a 48 × 28 track with a 22 knob — and HeroUI's is the
same 48 wide.

**The width is part of the control**, unlike everywhere else in the library, where `size`
never touches it: a switch is a fixed shape, and a track that stretched with its parent
would be a progress bar.

The travel is not a number anyone writes: it is `width − knob − 2 × inset`, arithmetic the
root does on the flattened style, because a slide happens in a worklet and a worklet needs
a number rather than a style to flatten every frame.

`radius` is the **track's** corner, `full` by default. The knob stays round — a squared
track with a round knob is a real design; the reverse is not.

## Colour

```tsx
<Switch color="#7c3aed">Teinté</Switch>
```

A raw tint (R7), and here it is **the colour the switch turns on to**, with a knob derived
to read against it. The track at rest keeps its neutral: a switch that is off is off in
every brand.

It reaches there through the `bgSelected` / `fgSelected` roles, which the tint pass
repaints — the same mechanism as the `Checkbox`'s, written up once in
[`checkbox.md`](../checkbox/checkbox.md#colour).

The knob at rest is the theme's `white`, one of the two places in the library where a
primitive is named on purpose: a switch's knob is white in both modes, the way the
platform's own is, because it has to read against the neutral track **and** against the
accent one.

## Animation

The track's colour is **crossed, not swapped** — `interpolateColor` between the two ends —
and the knob slides on the same 175ms, so a flip reads as one movement rather than as a
repaint under a jump. The number lives in `switch.style.ts` and neither slot owns it, which
is what keeps them arriving together.

`animation={false}` on `Switch.Track` or `Switch.Thumb` puts that one at its end state with
no worklet mounted at all. `animation` on the **root** is the library's usual press knob —
`false`, `'disabled'`, `'disable-all'`, or the object — and belongs to `PressableFeedback`.

**The knob moves with `translateX`, not with an edge.** R13 bans a directional inset, and a
transform is not one — but a transform does not mirror under RTL either, so the sign is
flipped by hand against `I18nManager.isRTL`. It is the one place in the library that reads
it, and it reads it for a movement rather than for a layout.

## Alignment with `heroui-native`

Measured against their `switch.tsx` and `switch.css`, and against the legacy component this
one replaces.

**Identical to HeroUI:** the 48pt track at `md`, the knob's `field` shadow, the accent
track when on with a contrasting knob, the 175ms crossfade, and a default knob so nothing
has to be written for the common case.

**Four deltas:**

| Theirs                          | Ours                                   | Why                                                                                                                |
| ------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The root is the track; no label | The root is the row, `Label` is a slot | The `Checkbox`'s reason, and the legacy component had a `label` too.                                               |
| A 28 × 20 pill knob             | A round knob, 22 at `md`               | The legacy switch's, and the platform's. A pill knob in a round track is a shape neither of our two variants is.   |
| No shape variants               | `primary` / `secondary`                | The legacy component shipped both, and dropping one at the migration would be a redesign rather than a port.       |
| `StartContent` / `EndContent`   | Children of the track                  | The track is a slot here, so a glyph at either end is a `View` you place — one API instead of two named positions. |

## Props

### `Switch`

Everything `PressableFeedback` accepts, every `ViewStyle` key it does not already claim
(R14), plus:

| Prop               | Type                            | Default     | Notes                                   |
| ------------------ | ------------------------------- | ----------- | --------------------------------------- |
| `variant`          | `'primary' \| 'secondary'`      | `'primary'` | The shape: knob inside, or over the bar |
| `size`             | `'sm' \| 'md' \| 'lg'`          | `'md'`      | Track, knob, gap, label type            |
| `radius`           | `RadiusKey`                     | `'full'`    | The track's corner                      |
| `color`            | `string`                        | —           | A hex tint — the colour it turns on to  |
| `isSelected`       | `boolean`                       | —           | Controlled                              |
| `defaultSelected`  | `boolean`                       | `false`     | Uncontrolled starting value             |
| `onSelectedChange` | `(isSelected: boolean) => void` | —           | Fires on every flip, either mode        |
| `isDisabled`       | `boolean`                       | `false`     | Dims the row and stops the press        |
| `animation`        | `AnimationProp`                 | —           | The press treatment, as everywhere else |
| `asChild`          | `boolean`                       | `false`     | Merge into the single child             |

**No `isInvalid`.** See above.

### `Switch.Track`, `Switch.Thumb`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop        | Type        | Default | Notes                                               |
| ----------- | ----------- | ------- | --------------------------------------------------- |
| `children`  | `ReactNode` | —       | The knob, for the track; a glyph, for the knob      |
| `animation` | `boolean`   | `true`  | `false` shows the end state with no worklet mounted |

### `Switch.Label`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14).

## Extending it

`useSwitch()` is exported (R10) and carries the resolved styles, the two colour pairs, the
travel and the state — enough to write a glyph that changes at each end of the track, or a
second label:

```tsx
import { useSwitch } from '@xaui/native/switch'

function SwitchState() {
  const { isSelected, labelStyle } = useSwitch()
  return <Text style={labelStyle}>{isSelected ? 'Activé' : 'Désactivé'}</Text>
}
```

Outside a `<Switch>` it throws by name.

## Accessibility

- `accessibilityRole="switch"` on the root, overridable, with `accessibilityState.checked`
  following the value and `.disabled` following `isDisabled`. A caller's own
  `accessibilityState` is **merged**, not spread over.
- **The label is inside the control**, so the switch announces itself with its text. A
  switch with no label needs an `accessibilityLabel`.
- The whole row is the touch target.
- **The label does not change with the state.** "Mode sombre" is the setting whether it is
  on or off; a label reading "Activé" would say what the track and the role already say,
  twice.

## Migration from `@xaui/native-legacy`

| Legacy                         | v1                                                            |
| ------------------------------ | ------------------------------------------------------------- |
| `label="…"`                    | `<Switch>…</Switch>` — the text child _is_ the label          |
| `labelAlignment="left"`        | write `<Switch.Label>` before `<Switch.Track>`                |
| `labelAlignment="justify-*"`   | `justifyContent="space-between"` plus a width, in style props |
| `variant="inside"`             | `variant="primary"` — the same shape, the library's name      |
| `variant="overlap"`            | `variant="secondary"` — likewise                              |
| `isSelected` / `onValueChange` | `isSelected` / `onSelectedChange`, plus `defaultSelected`     |
| `themeColor="primary"`         | `color={theme.colors.accent}` — a raw value (R7)              |
| `size="sm" \| "md" \| "lg"`    | `size` — the same three                                       |
| `radius`                       | `radius` — a `RadiusKey` now, still `full` by default         |
| `fullWidth`                    | `width="100%"` in style props (R14)                           |
| `isDisabled`                   | unchanged, on the root                                        |
| `labelStyle`                   | `style` on `<Switch.Label>`                                   |
| `style`                        | `style` on the root                                           |
