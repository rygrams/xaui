# Divider

The line between two things.

## Import

```tsx
import { Divider } from '@xaui/native/divider'
```

## Anatomy

```tsx
<Divider />
```

**One node and no slots.** A rule is a filled box one point thick; there is nothing inside
it. A divider with a word in the middle of it is a `Row` holding two of these and a
`Typography` — the composition the library already has. A `Divider.Label` would put a
layout inside a line.

## Usage

Between rows, in a column:

```tsx
<Column gap={12}>
  <Row>…</Row>
  <Divider />
  <Row>…</Row>
</Column>
```

Between two words, in a row:

```tsx
<Row gap={12} alignItems="center">
  <Typography variant="body-sm">Brouillon</Typography>
  <Divider orientation="vertical" />
  <Typography variant="body-sm">Il y a deux minutes</Typography>
</Row>
```

A section break, rather than a row break:

```tsx
<Divider size="sm" />
```

With a word across it — two dividers and a label, not a prop:

```tsx
<Row gap={12} alignItems="center">
  <Divider flex={1} />
  <Typography variant="body-xs" color={theme.colors.muted}>
    ou
  </Typography>
  <Divider flex={1} />
</Row>
```

## Props

| Prop          | Type                           | Default        |
| ------------- | ------------------------------ | -------------- |
| `orientation` | `'horizontal' \| 'vertical'`   | `'horizontal'` |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'xs'`         |
| `color`       | `string` — a raw hex tint (R7) | —              |
| `style`       | `StyleProp<ViewStyle>`         | —              |

Plus every `ViewStyle` key as a prop (R14) and every `View` prop.

### No `variant`, and it is the only component in the core without one

A variant is the design system's **vocabulary** (§1 bis) — a name that means the same thing
everywhere it appears. On a rule there is nothing for such a name to describe: no fill
against a foreground, no border against a surface, no intent to report.

It used to have three, naming the three separator tokens. That is a shade of grey wearing a
word. `size` says how heavy the rule is, `color` says what colour it is in React Native's
own values, and between them there is nothing a third name would add.

The theme still decides the default: the rule paints `separator`, and `color` is the way
past it.

### `size` is the thickness

`xs` is HeroUI's `thin` — one device pixel, `StyleSheet.hairlineWidth` — and `lg` is their
`thick`, six points, with the two steps our ladder puts between them.

It is `size` and not `thickness` because that is the vocabulary word (§1 bis), and it is
consistent with the rest of the library rather than in spite of it: "`size` drives height,
never width" is exactly what this does, on the axis `orientation` names.

**`xs` is the default, where every other component defaults to `md`.** It is the one place
in the library that departs from that, because a rule you notice is a rule that is too
thick.

### The other axis comes from the parent

`alignSelf: 'stretch'` is the whole mechanism. In a `Column` the cross axis is horizontal,
so a stretched child is full width; in a `Row` it is vertical, so the same word makes a
vertical rule full height. On the axis the thickness fixes, `stretch` is ignored.

So there is no `width` prop and no `height` prop to remember, and a **horizontal divider
written inside a `Row` collapses on purpose** rather than guessing what you meant. Give it
a width if that is really what you want.

### `asChild`

R12. What it is for here is the animated rule: an `Animated.View` that collapses a section
takes the thickness and the ink from the recipe and the height from a shared value.

```tsx
<Divider asChild>
  <Animated.View style={collapse} />
</Divider>
```

## Accessibility

`accessibilityElementsHidden` and `importantForAccessibility="no"` are set: a rule is
furniture. A screen reader reads the two groups it sits between, not the line — and React
Native has no `separator` role to announce, so leaving it visible would add a stop to every
list. Both stay overridable (R9).

## Migration

| Legacy                        | v1                                   |
| ----------------------------- | ------------------------------------ |
| `<Divider />`                 | `<Divider />`                        |
| `<Divider vertical />`        | `<Divider orientation="vertical" />` |
| `<Divider thickness={2} />`   | `<Divider size="md" />`              |
| `<Divider color="#e5e5e5" />` | `<Divider color="#e5e5e5" />`        |
