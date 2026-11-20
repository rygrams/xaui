# Skeleton

The shape of what has not arrived yet, drawn the Metro way: one flat, square block in a
fifth of the page's ink over its ground — `#333333` on black, `#CCCCCC` on white — that
breathes down to half and back.

## Import

```tsx
import { Skeleton } from '@xaui/tram/skeleton'
```

## Anatomy

```tsx
<Skeleton />
```

- **`Skeleton`** — one node and no slots. A paragraph of placeholders is several of them
  in a column. There is no `size`: only the caller knows the shape of what is missing, so
  `width` and `height` are the whole sizing API.

## Usage

### A block

```tsx
<Skeleton width={140} height={20} />
<Skeleton width="70%" height={16} />
```

### A row it stands in for

```tsx
<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
  <Skeleton width={52} height={52} />
  <View style={{ flex: 1, gap: 6 }}>
    <Skeleton height={12} width="50%" />
    <Skeleton height={12} width="80%" />
  </View>
</View>
```

### As a gate

```tsx
<Skeleton isLoading={!user} width={140} height={20}>
  <Typography>{user?.name}</Typography>
</Skeleton>
```

With `isLoading={false}` the block gives way to its `children`, rendered as they are: no
block style reaches them.

### The corner

```tsx
<Skeleton width={48} height={48} radius="full" />
```

Square by default, 2 at most, and `full` let through for a round avatar placeholder.

### The breath

The block breathes from full opacity down to half and back, 1100 ms each way, on one
clock shared by every block on the screen — a block mounted late joins in step.
`animation={false}` keeps it still and mounts no worklet.

## Colour

A placeholder carries no colour of the app: there is no `accent`. A block that has to
stand out on a particular ground takes a raw `color`, drawn as given.

```tsx
<Skeleton width={140} height={20} color="#2A2A2A" />
```

## Accessibility

- A block is hidden from screen readers (`accessibilityElementsHidden`,
  `importantForAccessibility="no-hide-descendants"`); announce loading as `busy` on the
  region that loads. Both stay overridable.
- Under reduced motion the block is still.

## Differences from Native

- **The drawing**: one flat, square block in a fifth of the page's ink; Native's is the
  theme's neutral fill with a rounded `md` corner.
- **`radius`** is square by default and stays within 2, with `full` let through.
- **The breath** runs 1 → 0.5 → 1 over 1100 ms each way on one shared clock, so blocks
  mounted at different times stay in step.
- **No `accent`**, as there is no `variant`. Native's props are otherwise unchanged.
