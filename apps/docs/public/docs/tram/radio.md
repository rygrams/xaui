# Radio

One option out of a set, drawn the Metro way: a circle with a line around it on the page's
ground, and a dot of the accent inside once it is the chosen one.

## Import

```tsx
import { Radio, RadioGroup } from '@xaui/tram/radio'
```

`RadioGroup` is `Radio.Group` under another name, for a call site that reads better naming
the set.

## Anatomy

```tsx
<Radio.Group>
  <Radio>
    <Radio.Indicator />
    <Radio.Label />
  </Radio>
</Radio.Group>
```

- **`Radio.Group`** — the set. It holds the chosen `value` and hands `size`, `accent` and
  `color` down as defaults.
- **`Radio`** — one option, and the whole row: a tap on the label chooses it too. A text
  child becomes the label and the root supplies the circle; with no children it is the
  circle alone.
- **`Radio.Indicator`** — the circle and its dot. Children replace the dot and keep its
  motion and its place.
- **`Radio.Label`** — the text beside the circle.

## Usage

### In a group

```tsx
<Radio.Group value={plan} onValueChange={setPlan}>
  <Radio value="monthly">monthly</Radio>
  <Radio value="yearly">yearly</Radio>
</Radio.Group>
```

An option joins the set by naming a `value`; nothing walks the children, so an option
nested in a row is in the set as much as a direct child. Leave `value` out of the group
and it holds its own, starting from `defaultValue`. A press selects and never clears:
`onValueChange` is never called with `undefined`.

### Composed

```tsx
<Radio value="yearly" accent="lime">
  <Radio.Indicator />
  <Radio.Label>yearly</Radio.Label>
</Radio>
```

### Alone

```tsx
<Radio isSelected={isMuted} onSelectedChange={() => setIsMuted(true)}>
  muted
</Radio>
```

Outside a group, a radio runs on its own `isSelected` / `defaultSelected`.
`onSelectedChange` fires with `true` only.

### Orientation

```tsx
<Radio.Group orientation="horizontal" defaultValue="m">
  <Radio value="s">small</Radio>
  <Radio value="m">medium</Radio>
  <Radio value="l">large</Radio>
</Radio.Group>
```

`vertical` is the default. `horizontal` wraps rather than overflowing.

### Disabled and invalid

```tsx
<Radio.Group defaultValue="card" isInvalid>
  <Radio value="card">card</Radio>
  <Radio value="transfer" isDisabled>
    transfer
  </Radio>
</Radio.Group>
```

`isDisabled` greys the circle, the dot and the label and stops the press; a disabled set
has no option that can opt back in. `isInvalid` draws the circle's line and the dot in
`danger`, and the label keeps its ink.

## Sizes

```tsx
<Radio size="sm">sm</Radio>
<Radio size="md">md</Radio>
<Radio size="lg">lg</Radio>
```

`size` sets the circle (20, 26 or 34 across), the dot, the gap and the label's type —
never the width. Every size is pressed as 48 points.

## Colour

The dot is the theme's accent. `accent` picks another of the twenty named accents; `color`
takes a raw `#RRGGBB` and wins when both are set. The circle's line stays the page's ink.
An option's own paint wins over its group's, and `isInvalid` overrides both.

```tsx
<Radio.Group accent="cobalt" defaultValue="a">
  <Radio value="a">cobalt</Radio>
  <Radio value="b" accent="magenta">
    magenta
  </Radio>
</Radio.Group>
```

## Accessibility

- An option has the `radio` role and announces `checked` and `disabled`; on the web it
  sets `aria-checked` and `aria-invalid`. The group has the `radiogroup` role.
- A choice is felt as a `selection` haptic through `TramProvider`'s `onHaptic`, only when
  the choice moves.
- The dot grows from the centre on a spring. Under reduced motion it fades in and out at
  its full size, and the row no longer shrinks under the finger.
- `animation={false}` keeps the row its full size under the finger; `'disable-all'` also
  places the dot with no spring.

## Differences from Native

- **No `variant`.** Native's three are three fills of the circle at rest; the Metro circle
  has no fill.
- **No `radius`.** A radio is a circle.
- **`accent`** is added.
- **The press** shrinks the row and fills nothing: no highlight, no ripple.
- **`isInvalid`** leaves the label its ink: the circle says which option is wrong.
- **The set** spaces its options on a pitch of 48.
