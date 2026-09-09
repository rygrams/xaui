# Badge

A count, or the fact that there is one.

## Import

```tsx
import { Badge } from '@xaui/native/badge'
```

## Anatomy

```tsx
<Badge />
```

**One node and no slots**, per the plan. A badge is a mark: whatever is inside it is one
line of two or three characters, and a slot would be a name for a `Text` this component can
just as well insert itself (R3).

## Usage

```tsx
<Badge>3</Badge>
<Badge variant="success-soft" size="sm">Payé</Badge>
<Badge isDot variant="warning" />
```

Hanging off what it counts:

```tsx
<View>
  <Icon as={BellIcon} size={24} />
  <Badge placement="top-end" accessibilityLabel="12 notifications non lues">
    12
  </Badge>
</View>
```

At the end of a list row, in flow, where no placement is wanted:

```tsx
<Row justifyContent="space-between" alignItems="center">
  <Typography>Boîte de réception</Typography>
  <Badge variant="default">128</Badge>
</Row>
```

## Props

| Prop        | Type                                                         | Default    |
| ----------- | ------------------------------------------------------------ | ---------- |
| `variant`   | `BadgeVariant` — the `Chip`'s eleven names                   | `'danger'` |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg'`                               | `'md'`     |
| `radius`    | `RadiusKey`                                                  | capsule    |
| `color`     | `string` — a raw hex tint (R7)                               | —          |
| `isDot`     | `boolean`                                                    | `false`    |
| `placement` | `'top-end' \| 'top-start' \| 'bottom-end' \| 'bottom-start'` | —          |
| `asChild`   | `boolean`                                                    | `false`    |
| `style`     | `StyleProp<ViewStyle>`                                       | —          |

Plus every `ViewStyle` key as a prop (R14) and every `View` prop.

### `danger` is the default

The only component in the library whose default is not the first name in its ladder. A badge
is overwhelmingly the count of something that wants attention — unread, failed, overdue —
and a red one is what a caller writing `<Badge>3</Badge>` means. The accent count is a
`variant` away.

### It is not a small `Chip`

A chip holds a word and hugs it; a badge holds a count and is round unless the count is too
wide to be. That is the `minWidth` equal to the height — one digit is a circle, two are a
capsule — and it is why the label stays at 12pt through three of the four sizes: a count
that grows with its badge stops being a count.

The four heights sit below the `Chip`'s: 16, 18, 20 and 24 against its 20, 24, 28 and 36.

### `isDot` — the bare circle

No label, no padding, a fixed diameter on its own ladder (6, 8, 10, 12) rather than the
height, because a 20pt circle beside a 16pt icon is not a dot. It is what a badge is when
the fact that there is _something_ is the whole message.

Children are not rendered while it is set: a dot is the absence of a label.

### `placement` — the parent becomes whatever the badge decorates

Unset, the badge is in flow and the parent lays it out like any other node, which is what a
badge at the end of a list row wants. Set, it is absolutely positioned in that corner,
pulled out by half its own height on each axis so its centre lands on the corner it marks.

It is a prop rather than four style keys at the call site because the offset is derived from
the badge's own `size`, and that arithmetic belongs with the measurements. R13 is the other
half: the keys are `start` and `end`, so a badge on the trailing corner mirrors in RTL
instead of staying put.

The insets are computed **outside the style cache**, and they have to be: in flow the node
is `position: 'relative'`, where an inset is a nudge rather than a placement, so a cached
style carrying `top: -10` would shift every badge that has no placement at all.

## Accessibility

No default `accessibilityRole`: a badge is a label, and what a screen reader reads is the
text inside it. What it cannot read is the **subject** — "3" beside a bell means three
notifications only to someone who can see the bell — so a placed badge is one of the few
places in this library where an `accessibilityLabel` is not optional.

## Migration

| Legacy                               | v1                                          |
| ------------------------------------ | ------------------------------------------- |
| `<Badge count={3} />`                | `<Badge>3</Badge>`                          |
| `<Badge dot />`                      | `<Badge isDot />`                           |
| `<Badge themeColor="success" />`     | `<Badge variant="success" />`               |
| `<Badge position="topRight" />`      | `<Badge placement="top-end" />` (RTL-safe)  |
| `<Badge>{children}</Badge>` wrapping | the parent wraps; the badge is placed on it |
