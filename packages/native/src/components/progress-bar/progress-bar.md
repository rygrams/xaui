# ProgressBar

How far along something is.

## Import

```tsx
import { ProgressBar } from '@xaui/native/progress-bar'
```

## Anatomy

```tsx
<ProgressBar value={40}>
  <ProgressBar.Header>
    <ProgressBar.Label />
    <ProgressBar.Value />
  </ProgressBar.Header>
  <ProgressBar.Track>
    <ProgressBar.Fill />
  </ProgressBar.Track>
</ProgressBar>
```

- **`ProgressBar`** — the root. It clamps the value once, resolves the recipe once (R5) and
  publishes both to its slots.
- **`ProgressBar.Header`** — the line above the rail, its two halves pushed apart. It exists
  because R4 puts the gap and the alignment on a root rather than on the things being spaced.
- **`ProgressBar.Label`** — what is happening.
- **`ProgressBar.Value`** — how far along, as text. Formats itself.
- **`ProgressBar.Track`** — the rail: the whole of the distance.
- **`ProgressBar.Fill`** — the part of it that is behind you.

**The fill is a child of the rail, not a layer over it.** It grows to a percentage of the
width and the rail clips it, so one `radius` rounds both — an absolutely positioned overlay
would need a corner of its own and would get it wrong at 100%.

## There is no `isIndeterminate`

An unknown duration is a [`Spinner`](../spinner/spinner.md). That is the split the legacy
`Indicator` was two components pretending to be one, and a bar that runs a loop across
itself is a spinner drawn as a line.

This one reports a quantity, and a quantity it does not have is not a state it should be
able to be in.

## Usage

### R3 — the short form

```tsx
<ProgressBar value={40}>Téléchargement</ProgressBar>
```

A text child becomes the label, **and the bar comes with it**: a progress bar with no bar is
a line of text. The `Radio`'s rule, for the `Radio`'s reason.

Written with no children at all it is the rail alone, which is the form a list row wants:

```tsx
<ProgressBar value={40} size="sm" />
```

### The range

```tsx
<ProgressBar value={0.4} minValue={0} maxValue={1} />
<ProgressBar value={7} maxValue={12} />
```

`0` to `100` by default. Every argument is a caller's number, so all three are validated
once at the root: a value outside the range is clamped, an inverted or empty range reads as
empty, and anything that is not finite reads as zero. A fill of `NaN%` is something React
Native accepts and draws as nothing at all, with no error anywhere.

### The number beside it

```tsx
<ProgressBar value={40} />                                        // 40 %
<ProgressBar value={1250} maxValue={2000}
  formatOptions={{ style: 'currency', currency: 'EUR' }} />        // 1 250,00 €
<ProgressBar.Value>7 sur 12</ProgressBar.Value>                    // yours
```

`formatOptions` is `Intl.NumberFormat`'s, and **which number it formats follows the style**:
a percentage is a share of the range, so it formats the fraction; anything else is about the
quantity, so it formats the value. Formatting the fraction as euros would report a 1 250 €
goal as `0,63 €`.

A Hermes build compiled without ICU has no `Intl` at all; the fallback is the same number
with a plain percent sign rather than an exception.

The value is in `tabular-nums`, so a number ticking from 9 % to 10 % does not shift the
label beside it.

### The motion

The fill sweeps to each new width over 240ms. A bar that jumped would render a download
reporting every 5% as twenty still frames.

```tsx
<ProgressBar.Fill animation={false} />
```

`false` snaps — for a value the caller is already animating itself.

## Sizes

| `size` | Rail | Header type |
| ------ | ---- | ----------- |
| `sm`   | 4    | 14/20       |
| `md`   | 6    | 16/24       |
| `lg`   | 8    | 18/28       |

**`size` is the rail's thickness, never its width.** A bar's length is its parent's, exactly
as a `Button`'s is — which is why there is no `fullWidth` and why the root spans by default.

The rail's numbers are off the spacing grid on purpose, like the `Slider`'s: how thin a line
can be and still read as a bar has nothing to do with the gaps between things.

`radius` is `full` on both the rail and the fill, and it moves both — a squared-off rail
holding a rounded fill is the thing the axis exists to prevent.

## Variants and colour

| `variant`   | Rail      | Fill         |
| ----------- | --------- | ------------ |
| `primary`   | `default` | `accent`     |
| `secondary` | `default` | `foreground` |
| `success`   | `default` | `success`    |
| `warning`   | `default` | `warning`    |
| `danger`    | `default` | `danger`     |

Five of the ten, and the five that are left out say what this is. `tertiary` and `ghost` are
gone because a fill with no fill is not a progress bar; the `*-soft` pairs are gone because
the rail already is the soft half of every one of these, and a soft fill on a soft track is
one bar you cannot read.

The rail is the same neutral under all five: it is the room left to go, and that is not
success, warning or danger.

`color` is a raw value (R7) and lands on the fill, through the `bgSelected` role — the
`Checkbox`'s pair, meaning the same thing on a line instead of in a box. Why a role and not
an axis is written up once in [`checkbox.md`](../checkbox/checkbox.md#colour).

## Alignment with `heroui-native`

**Identical:** the three sizes, the label-and-value header, the clamped range with
`minValue` / `maxValue`, `formatOptions` through `Intl`, and Track · Fill as slots.

**Three deltas:**

| Theirs                          | Ours                | Why                                                                                                                                   |
| ------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `color="success"`               | `variant="success"` | Their `color` is our `variant`: an enum of intents is the design system's vocabulary, and `color` here is a raw tint (R7).            |
| `isIndeterminate`               | `Spinner`           | Two components pretending to be one. A bar with no quantity is a spinner drawn as a line.                                             |
| `TrackBackground` under `Track` | `Track` alone       | Two nodes for one rail. The rail _is_ the background; the second one existed to be themed separately, which `style` on the slot does. |

## Props

### `ProgressBar`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop            | Type                       | Default     | Notes                                 |
| --------------- | -------------------------- | ----------- | ------------------------------------- |
| `variant`       | `ProgressBarVariant`       | `'primary'` | The fill's colour                     |
| `size`          | `'sm' \| 'md' \| 'lg'`     | `'md'`      | The rail's thickness. Never its width |
| `radius`        | `RadiusKey`                | `'full'`    | The rail and the fill together        |
| `color`         | `string`                   | —           | A hex tint, on the fill               |
| `value`         | `number`                   | `0`         | Clamped into the range                |
| `minValue`      | `number`                   | `0`         |                                       |
| `maxValue`      | `number`                   | `100`       |                                       |
| `formatOptions` | `Intl.NumberFormatOptions` | percent     | What `Value` reads                    |
| `isDisabled`    | `boolean`                  | `false`     | Dims it. There is nothing to press    |
| `asChild`       | `boolean`                  | `false`     | Merge into the single child           |

### `ProgressBar.Fill`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop        | Type      | Default | Notes                          |
| ----------- | --------- | ------- | ------------------------------ |
| `animation` | `boolean` | `true`  | `false` snaps to the new width |

### `ProgressBar.Header`, `.Track`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14).

### `ProgressBar.Label`, `.Value`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14). `Value`'s children
replace the formatted number outright.

## Extending it

`useProgressBar()` is exported (R10) and carries the resolved styles plus `fraction`,
`value`, `formatOptions` and `isDisabled` — enough to write a second line under the bar, an
estimate beside it, or a mark at the point it has to reach, without recomputing a fraction
the root already clamped. Outside a `<ProgressBar>` it throws by name.

## Accessibility

- `accessibilityRole="progressbar"` on the root, overridable.
- `accessibilityValue` carries the **caller's** range and value — `{ min, max, now }` — not
  the clamped fraction: "40 sur 100" is what the caller wrote, and rounding it to a
  percentage here would be answering a question nobody asked.
- The label is a `Text` inside the root, so it is read with the value rather than beside it.
