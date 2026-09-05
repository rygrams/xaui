# Layout — Row, Column, Stack, Grid

Four components. `Row` and `Column` are the two axes and contribute one declaration each;
`Stack` overlays; `Grid` lays out fixed columns. Everything else you write on them is R14 —
React Native's own style keys, exposed as props on every node.

## Import

```tsx
import { Column, Grid, Row, Stack } from '@xaui/native/view'
```

## Anatomy

`Row` and `Column` have no slot — there is nothing inside an axis to publish. The other two
do, because in both cases a child needs something the root computed:

```
Stack            the containing block
└── Stack.Item   a layer, taken out of the flow

Grid             measures itself, publishes the column width
└── Grid.Item    a cell covering several columns
```

## Usage

### Basic

```tsx
<Row gap={8} alignItems="center">
  <Button.Icon as={Trash2} />
  <Typography variant="h6">Supprimer</Typography>
</Row>

<Column gap={16} padding={16}>
  <Typography variant="h3">Projets</Typography>
  <Typography variant="body-sm">Trois en cours, un archivé.</Typography>
</Column>
```

`gap`, `alignItems`, `justifyContent` and `padding` are **not props of `Row`**. They are
`ViewStyle` keys, and R14 exposes every one of them on every node — these two components
add nothing to that.

### What replaced the legacy vocabulary

```tsx
// legacy — a vocabulary the library invented
<Row mainAxisAlignment="spaceBetween" crossAxisAlignment="center" gap={8}>

// v1 — React Native's names, React Native's values
<Row justifyContent="space-between" alignItems="center" gap={8}>
```

`mainAxisAlignment`, `crossAxisAlignment`, `mainAxisSize`, `direction="horizontal"` and
`reversed` are gone. They were a second set of words for what the platform already says.

### Width comes from the axis, not from a prop

```tsx
<Row gap={8}>
  <Button size="sm">hugs</Button>
  <Button size="sm">hugs too</Button>
</Row>

<Column>
  <Button size="sm">stretched</Button>
</Column>
```

Nothing in a component's recipe sets a width, so React Native's own behaviour answers:
stretched in a column, hugging its content in a row. That is why there is no `fullWidth`
prop anywhere in the library — and `width="100%"` says it explicitly when it is wanted.

### Nested

```tsx
<Column
  gap={12}
  padding={16}
  borderRadius={12}
  backgroundColor={theme.colors.surface}
>
  <Row justifyContent="space-between" alignItems="center">
    <Typography variant="h5">Facture #2024-118</Typography>
    <Typography variant="body-sm">payée</Typography>
  </Row>

  <Row gap={8} justifyContent="flex-end">
    <Button size="sm" variant="tertiary">
      Télécharger
    </Button>
    <Button size="sm" variant="danger-soft">
      Annuler
    </Button>
  </Row>
</Column>
```

### As another element

```tsx
<Row asChild gap={8} alignItems="center">
  <Pressable onPress={open}>…</Pressable>
</Row>
```

## Props

| Prop      | Type                   | Default | Notes                                    |
| --------- | ---------------------- | ------- | ---------------------------------------- |
| `asChild` | `boolean`              | `false` | The child element becomes the axis (R12) |
| `style`   | `StyleProp<ViewStyle>` | —       | Applied last                             |

Plus every `ViewStyle` key as a prop (R14), **minus `flexDirection`**, and every `ViewProps`
React Native defines.

`flexDirection` is not exposed because it is the component's identity: a `Row` that could be
told to lay out as a column would be a `View` with a longer name. A genuine reversal goes
through `style={{ flexDirection: 'row-reverse' }}` — and note that `row` already flips in an
RTL layout, which is the case that usually matters.

## `Stack` — things on top of each other

```tsx
<Stack>
  <Image source={cover} />

  <Stack.Item bottom={0} start={0} end={0} padding={12}>
    <Typography color="#fff">Titre en surimpression</Typography>
  </Stack.Item>

  <Stack.Item top={8} end={8}>
    <Button size="xs">Fermer</Button>
  </Stack.Item>
</Stack>
```

`Row` places children across, `Column` down, `Stack` on top of each other.

- **`Stack`** declares `position: 'relative'` — the containing block. Without it an
  absolutely positioned child resolves against a distant ancestor, often the whole screen.
- **`Stack.Item`** declares `position: 'absolute'`. Where the layer sits is R14: `top`,
  `bottom`, `start`, `end` and `zIndex` are `ViewStyle` keys already exposed as props.

**The first child stays in the flow and gives the stack its size**; the items float over it
without affecting it.

Overlaying is composed rather than inferred. A `Stack` that absolutely positioned every
child but the first would have to guess which one sets the size, and would change meaning
the day a caller reordered them.

Note `start` / `end` rather than `left` / `right`: R13 bans the physical pair, and these
flip with the writing direction — which is what a caption over an image should do.

## `Grid` — a fixed number of columns, wrapping

```tsx
<Grid columns={3} gap={8}>
  <Card />
  <Card />
  <Grid.Item span={2}>
    <Card />
  </Grid.Item>
</Grid>
```

**The column width is measured, not expressed as a percentage.** `width: '33.33%'` resolves
against the content box and knows nothing about the gaps between cells, so three of them
plus two gaps overflow their row and the third wraps — the classic gutter bug. The root
reads its own width through `onLayout` and publishes the exact column width instead.

For one frame, before the measurement lands, a cell falls back to the naive percentage.
The alternative — rendering nothing until measured — flashes an empty grid.

Every child is wrapped in a one-column cell, so components are dropped straight in.
`Grid.Item` is only needed for a span, and its width carries the gaps it swallows: two
columns plus the gap between them line up exactly with the cells above.

`gap` is `Grid`'s own prop rather than one of R14's, because the root has to **read** it to
size the columns. It carries React Native's meaning all the same — `gap={8}` is 8 points,
the same gap `Row` takes as a style prop.

`Grid` has no `asChild`: it measures itself, so it has to be the node it renders.
`Grid.Item` has none either — the cell _is_ the layout, and merging it into a caller's
element would hand them a width they did not ask for.

## Why `Column` exists at all

It declares React Native's default, so it changes nothing on its own. It is there for what
it **says**: in a layout whose axes are all named, direction is read rather than inferred,
and a `Column` keeps its own direction the moment it is composed into a `Row`.

## What is deliberately not here

The legacy `view/` folder had twenty-six entries. Four are kept — the two axes, `Stack` and
`Grid`. Three lost their reason to exist when R14 landed, and are not being ported:

| Legacy                              | v1                                                          |
| ----------------------------------- | ----------------------------------------------------------- |
| `<Padding all={16}><X /></Padding>` | `<X padding={16} />` — R14, and one view node fewer         |
| `<Center><X /></Center>`            | `alignItems="center" justifyContent="center"` on the parent |
| `<Spacer />` between two items      | `justifyContent="space-between"` on the parent              |

Each of them added a view node to say what a style prop on an existing node already says,
and view depth is exactly what the v1 `Button` set out to reduce.

`Container` goes the same way: a `View` with a background is `backgroundColor` on the node
that needed it. The rest of the legacy lot — `Flex`, `Expanded`, `Flexible`, `SizedBox`,
`AspectRatio`, `FractionallySizedBox`, `Wrap`, `Positioned`, `Align`, `Margin` — is either
R14 or `Stack`, and none of it is planned.
