# Layout — Row, Column, Stack, Grid

The layout components — `Row`, `Column`, `Stack` and `Grid` — are Native's own,
re-exported unchanged from `@xaui/native/view`, so an app can import its whole screen from
`@xaui/tram`.

They carry no token — no colour, no type, no corner, no motion — only React Native's own
style keys as props. A Tram copy would be Native's code under another name, so this is the
one module Tram re-exports rather than drawing its own. Everything on the Native page
holds here.

## Import

```tsx
import { Column, Grid, Row, Stack } from '@xaui/tram/view'
```

## Anatomy

```tsx
<Stack>
  <Stack.Item />
</Stack>

<Grid>
  <Grid.Item />
</Grid>
```

- **`Row`**, **`Column`** — the two axes. No slot: there is nothing inside an axis to
  publish.
- **`Stack`** — the containing block; the first child gives the size.
- **`Stack.Item`** — a layer taken out of the flow, placed by `top`, `bottom`, `start`
  and `end`.
- **`Grid`** — fixed columns. It measures itself and publishes the column width
  (`useGrid`).
- **`Grid.Item`** — a cell covering several columns, by `span`.

## Usage

### Row and Column

`gap`, `alignItems`, `padding` and the rest are React Native's style keys, as props.

```tsx
<Row gap={12} alignItems="center">
  <Avatar>LM</Avatar>
  <Column gap={2} flexShrink={1}>
    <Typography variant="body">Léa Martin</Typography>
    <Typography variant="caption">shared 12 photos</Typography>
  </Column>
</Row>
```

### Stack

```tsx
<Stack height={160}>
  <Column flex={1} backgroundColor={tramAccents.teal} />
  <Stack.Item top={0} end={0}>
    <Badge>12</Badge>
  </Stack.Item>
</Stack>
```

### Grid

`columns` is floored and never below one (2 by default); a `span` is clamped to the
grid's count.

```tsx
<Grid columns={4} gap={8}>
  <Grid.Item span={2}>…</Grid.Item>
  <Cell />
  <Cell />
</Grid>
```

## Accessibility

- The four are plain `View`s with no role. Give a group a role or a label yourself when
  it means something to a screen reader.

## Differences from Native

- None: `@xaui/tram/view` is `@xaui/native/view`, the same module under a Tram subpath.
