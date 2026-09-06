# ProgressCircle

How far along something is, drawn as a ring.

## Import

```tsx
import { ProgressCircle } from '@xaui/native/progress-circle'
```

## Anatomy

```tsx
<ProgressCircle value={72}>
  <ProgressCircle.Indicator />
  <ProgressCircle.Value />
</ProgressCircle>
```

- **`ProgressCircle`** — the root. It clamps the value, resolves the recipe and computes the
  ring's geometry once, then publishes all three.
- **`ProgressCircle.Indicator`** — the ring: the track, and the arc of it that is done.
- **`ProgressCircle.Value`** — how far along, written in the middle.

Written with no children it is the ring alone, which is the form a row wants.

**It is the [`ProgressBar`](../progress-bar/progress-bar.md) bent into a circle** — the same
five variants, the same clamped range, the same `formatOptions`, the same 240ms — and it is
a second component rather than a `shape` prop on that one because the two share no geometry
at all: a bar is a `View` that grows, and this is an SVG path whose dash offset moves.

There is no `isIndeterminate` here either. The reason is the bar's, and it is written up
[there](../progress-bar/progress-bar.md#there-is-no-isindeterminate).

## `radius` is a number here

```tsx
<ProgressCircle radius={28} value={72} />
```

**The one place in this library where `radius` means what it means in geometry**, because a
circle has no corner to round. It is a raw number, so it lives outside the style cache and
outside the vocabulary (R6): it wins over `size` exactly as a raw `color` wins over a
variant's token.

Reach for it when the ring has to line up with something already on the screen — an avatar,
a row's height. Reach for `size` otherwise: the ladder is the vocabulary.

`strokeWidth` is the same kind of prop, and both are clamped. A stroke thicker than the ring
is wide would draw a path with a negative radius, which renders nothing, on one platform,
with no error.

## Usage

### The number in the middle

```tsx
<ProgressCircle value={72}>
  <ProgressCircle.Indicator />
  <ProgressCircle.Value />
</ProgressCircle>

<ProgressCircle value={100} variant="success">
  <ProgressCircle.Indicator />
  <ProgressCircle.Value>✓</ProgressCircle.Value>
</ProgressCircle>
```

`Value` is positioned absolutely so it centres on the ring rather than pushing it: the root
is a box the size of the circle, and a text node in the flow would make that box taller than
the drawing in it.

It formats through the root's `formatOptions`, on the same rule as the bar's — the fraction
for a percentage, the value for anything else. Children replace it outright.

**Not at `sm`.** 32 points across, less two strokes, is narrower than "64 %" is wide. That
step is the ring on its own.

### The motion

The arc sweeps to each new length over 240ms — the bar's number, because two progress
indicators on one screen moving at two speeds is a bug nobody files and everybody sees.

It is a **dash offset on one path** rather than a shape rebuilt per value, which is what
keeps one rounded cap at each end while it moves, and it is an animated _prop_ rather than
an animated style, because `strokeDashoffset` is an SVG attribute.

```tsx
<ProgressCircle.Indicator animation={false} />
```

The ring starts at twelve o'clock. The turn is on the indicator's wrapper rather than on
each path: `Circle`'s own `originX` / `originY` / `rotation` emit an invalid DOM property on
web, and one rotation on the box is one thing to read instead of three props on two circles.

## `react-native-svg`

An arc with a rounded cap is a stroked path, so `ProgressCircle.Indicator` imports
`react-native-svg` — an **optional peer**. The alternative in plain views is two rotated
half-discs clipped by a third, which cannot round its own ends.

Only that one file imports it, and this component is its own subpath export
(`@xaui/native/progress-circle`), so a project that never renders a ring never pays for it.
The `Select`'s check and the `Icon`'s chevron are already in the same position.

## Sizes

| `size` | Diameter | Stroke | Value type |
| ------ | -------- | ------ | ---------- |
| `sm`   | 32       | 3      | 12/16      |
| `md`   | 48       | 4      | 14/20      |
| `lg`   | 64       | 5      | 16/24      |

Bigger than the [`Spinner`](../spinner/spinner.md)'s ladder at every step, and that is the
difference between the two: a spinner says "wait" and this says how long, which usually
means it has a number written in the middle of it.

The stroke is centred on the path, so the ring fits its box: the path's radius is half the
diameter less half the stroke.

## Variants and colour

The `ProgressBar`'s table, unchanged — one neutral ring, and five arcs on it. `color` is a
raw value (R7) and lands on the arc through the same `bgSelected` role.

The two colours reach the SVG as **strings**, not styles: a path is stroked by a prop rather
than by a stylesheet. The recipe still owns them, on two slots it never renders — the same
thing the `Tabs` recipe does with its `content` slot — because that is what makes a raw
`color` reach the arc through `resolveTint`, which only maps roles a variant declared.

## Alignment with `heroui-native`

**Identical:** the three sizes, the clamped range, `formatOptions`, the SVG ring with a
rounded cap starting at twelve o'clock, and Indicator · Value as slots.

**Three deltas:**

| Theirs                                                      | Ours                                               | Why                                                                                                                      |
| ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `size={40}` — the ladder takes a number                     | `size` is tokens, `radius` is the number           | R6: a vocabulary prop takes tokens or it is not a vocabulary. The raw escape hatch gets its own name, like `color` does. |
| `strokeWidth` / `trackColor` / `fillColor` on the Indicator | `strokeWidth` on the root, colours from the recipe | R1 — colours are the recipe's, and `variant` plus `color` is the way in.                                                 |
| `color="success"`                                           | `variant="success"`                                | Their `color` is our `variant`, as on the bar.                                                                           |

## Props

### `ProgressCircle`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop            | Type                       | Default     | Notes                                         |
| --------------- | -------------------------- | ----------- | --------------------------------------------- |
| `variant`       | `ProgressCircleVariant`    | `'primary'` | The arc's colour                              |
| `size`          | `'sm' \| 'md' \| 'lg'`     | `'md'`      | Diameter, stroke, and the type inside         |
| `radius`        | `number`                   | —           | The ring's radius in points. Wins over `size` |
| `strokeWidth`   | `number`                   | —           | Clamped to half the diameter                  |
| `color`         | `string`                   | —           | A hex tint, on the arc                        |
| `value`         | `number`                   | `0`         | Clamped into the range                        |
| `minValue`      | `number`                   | `0`         |                                               |
| `maxValue`      | `number`                   | `100`       |                                               |
| `formatOptions` | `Intl.NumberFormatOptions` | percent     | What `Value` reads                            |
| `isDisabled`    | `boolean`                  | `false`     | Dims it. There is nothing to press            |
| `asChild`       | `boolean`                  | `false`     | Merge into the single child                   |

### `ProgressCircle.Indicator`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop        | Type      | Default | Notes                           |
| ----------- | --------- | ------- | ------------------------------- |
| `animation` | `boolean` | `true`  | `false` snaps to the new length |

### `ProgressCircle.Value`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14). Children replace the
formatted number.

## Extending it

`useProgressCircle()` is exported (R10) and carries the resolved geometry, the two stroke
colours, the fraction and the value — enough to draw a second arc, a mark at the target, or
an icon in place of the number. Outside a `<ProgressCircle>` it throws by name.

## Accessibility

- `accessibilityRole="progressbar"` on the root, overridable.
- `accessibilityValue` carries the caller's range and value, not the clamped fraction.
- The ring itself is a drawing; what a screen reader reads is that value.
