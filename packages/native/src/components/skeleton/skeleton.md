# Skeleton

The shape of what has not arrived yet.

## Import

```tsx
import { Skeleton } from '@xaui/native/skeleton'
```

## Anatomy

```tsx
<Skeleton />
```

**One node and no slots.** A placeholder is a rectangle; there is nothing inside it to
name. A paragraph of them is three of these in a `Column` — composition doing what a
`lines={3}` prop would otherwise hard-code, including the last line being shorter, which is
the only reason the paragraph reads as a paragraph.

## Usage

A block, sized by the caller:

```tsx
<Skeleton width={140} height={20} />
<Skeleton width={48} height={48} radius="full" />
```

A paragraph:

```tsx
<Column gap={8}>
  <Skeleton height={12} />
  <Skeleton height={12} />
  <Skeleton height={12} width="60%" />
</Column>
```

As a gate, which is what `isLoading` is for:

```tsx
<Skeleton isLoading={!user} height={20} width={140}>
  <Typography>{user?.name}</Typography>
</Skeleton>
```

A row of one, mirroring the layout it stands in for:

```tsx
<Row gap={12} alignItems="center">
  <Skeleton width={40} height={40} radius="full" />
  <Column gap={6} flex={1}>
    <Skeleton height={12} width="50%" />
    <Skeleton height={12} width="80%" />
  </Column>
</Row>
```

## Props

| Prop        | Type                           | Default     |
| ----------- | ------------------------------ | ----------- |
| `variant`   | `'default' \| 'secondary'`     | `'default'` |
| `radius`    | `RadiusKey`                    | `'md'`      |
| `color`     | `string` — a raw hex tint (R7) | —           |
| `isLoading` | `boolean`                      | `true`      |
| `animation` | `boolean`                      | `true`      |
| `children`  | `ReactNode`                    | —           |
| `style`     | `StyleProp<ViewStyle>`         | —           |

Plus every `ViewStyle` key as a prop (R14) and every `View` prop.

### There is no `size`, and that is the design

Only the caller knows the shape of the thing that is missing, so R14's `width` and `height`
are the whole sizing API — full React Native names and values, `width="60%"` as readily as
`width={140}`. A `size` token here would be a scale of rectangles nobody's content happens
to be.

### `variant` is the two backgrounds a placeholder is drawn on

| `variant`   | token         | for                                               |
| ----------- | ------------- | ------------------------------------------------- |
| `default`   | `default`     | a block on the page                               |
| `secondary` | `defaultSoft` | a block on a `Card`, where the full one is a hole |

**No status families and no `primary`** — a skeleton reports nothing, and a placeholder in
the accent announces the brand where there is nothing yet to announce. **No `tertiary` and
no `ghost`**: a skeleton with a border and no fill is an empty box, and one with neither is
nothing at all.

HeroUI reaches the same grey from `muted` at 30% opacity. Naming the token instead is what
lets a theme move the skeleton by moving `default`, rather than by discovering that a
percentage of a text colour is where the placeholder grey came from.

### `radius="full"` is the avatar placeholder

It is a prop rather than the caller's own `borderRadius` because a circle is a shape the
vocabulary names, and it has to survive a theme redrawing every corner in the library.

### No `asChild`

R12 asks for one on every root, and this is the second of the two places in the library it
is deliberately absent. `children` is already taken here, and it means the opposite of what
`asChild` would need: the content the block stands in for, rendered once `isLoading` is
`false`. `asChild` hands `Slot` an element to merge the block's styles into. One `children`
with two meanings, disambiguated by a second prop, is the kind of API this library exists
not to ship.

Styling is the escape hatch instead: every `ViewStyle` key is a prop (R14).

## Animation

One pulse: the block breathes between full opacity and a half, a second each way, eased in
and out. `animation={false}` freezes it at full and mounts no worklet — the branch renders
a plain `View`, so a long list frozen for a screenshot costs nothing.

**No shimmer**, where HeroUI's default is one. A shimmer is a gradient sweeping across the
block; a gradient needs `react-native-svg`, and that is an optional peer a component in the
fifteen-component core cannot require. One animation, so there is nothing for a name to
choose between — `animation` is a boolean rather than HeroUI's
`'shimmer' | 'pulse' | 'none'`.

## Accessibility

`accessibilityElementsHidden` and `importantForAccessibility="no-hide-descendants"` are
set. A block stands in for content that is not there; announcing its absence is `busy` on
whatever region is loading, not a stop on each rectangle. Both stay overridable (R9).

## Migration

| Legacy                                | v1                                                  |
| ------------------------------------- | --------------------------------------------------- |
| `<Skeleton width={140} height={20}/>` | `<Skeleton width={140} height={20} />`              |
| `<Skeleton circle size={40} />`       | `<Skeleton width={40} height={40} radius="full" />` |
| `<Skeleton lines={3} />`              | three `<Skeleton>` in a `<Column>`                  |
| `<Skeleton animated={false} />`       | `<Skeleton animation={false} />`                    |
