# Spinner

The wait, drawn as Metro's progress ring: five round dots of the accent, piled into one,
set off one after the other — slow, fast over the top, slow again into the next meeting
point — where each is caught up by the next until the five are one dot again.

The dots meet at six, then seven, then eight, round the clock in twelve laps, and never go
out.

## Import

```tsx
import { Spinner } from '@xaui/tram/spinner'
```

## Anatomy

```tsx
<Spinner />
```

- **`Spinner`** — one element: the ring and the five dots that run round it, drawn from
  the props. It has no slots and no `asChild` — the five dots are nodes a caller's
  element could not receive.

## Usage

### Basic

```tsx
<Spinner accessibilityLabel="loading messages" />
```

### Inline

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <Spinner size="sm" accessibilityLabel="syncing" />
  <Typography>syncing…</Typography>
</View>
```

### Standing still

```tsx
<Spinner animation={false} />
```

`animation={false}` stops the run and mounts no worklet: the five stand evenly round the
ring, so a list frozen this way keeps its height.

## Sizes

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

The ring is 20, 32 or 48 across, and the dots go with it.

## Colour

The dots are the theme's accent, as the `ProgressBar`'s bubbles are. `accent` picks
another of the twenty named accents, in its true colour; `color` takes a raw tint and wins
when both are set. A spinner in the page's ink is `color={theme.colors.foreground}`.

```tsx
<Spinner size="lg" accent="magenta" />
<Spinner color={theme.colors.foreground} />
```

## Accessibility

- The root has the `progressbar` role and announces as busy.
- There is no default label: only the caller knows what is loading, so give it an
  `accessibilityLabel`.
- Under reduced motion the five stand evenly round the ring and the ring turns slowly — a
  spinner that stopped would no longer say that something is on its way. Under an
  ancestor's `disable-all`, or with `animation={false}`, they stand still.

## Differences from Native

- **The drawing**: five dots running round a ring, where Native turns an arc.
- **No `variant`.** The dots are the accent; Native's seven variants are inks for the arc.
- **`accent`** is added.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The slots** are `root` and `dot`, for Native's `root` and `arc`.
- **Reduced motion** turns the five evenly round the ring; `animation={false}` stands them
  still.
