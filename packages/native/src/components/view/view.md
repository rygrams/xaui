# Row and Column

The two axes of a layout. Each contributes **one declaration**; everything else you write
on them is R14 — React Native's own style keys, exposed as props on every node.

## Import

```tsx
import { Column, Row } from '@xaui/native/view'
```

## Anatomy

Neither has a slot. There is nothing inside an axis to publish.

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
<Column gap={12} padding={16} borderRadius={12} backgroundColor={theme.colors.surface}>
  <Row justifyContent="space-between" alignItems="center">
    <Typography variant="h5">Facture #2024-118</Typography>
    <Typography variant="body-sm">payée</Typography>
  </Row>

  <Row gap={8} justifyContent="flex-end">
    <Button size="sm" variant="tertiary">Télécharger</Button>
    <Button size="sm" variant="danger-soft">Annuler</Button>
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

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | The child element becomes the axis (R12) |
| `style` | `StyleProp<ViewStyle>` | — | Applied last |

Plus every `ViewStyle` key as a prop (R14), **minus `flexDirection`**, and every `ViewProps`
React Native defines.

`flexDirection` is not exposed because it is the component's identity: a `Row` that could be
told to lay out as a column would be a `View` with a longer name. A genuine reversal goes
through `style={{ flexDirection: 'row-reverse' }}` — and note that `row` already flips in an
RTL layout, which is the case that usually matters.

## Why `Column` exists at all

It declares React Native's default, so it changes nothing on its own. It is there for what
it **says**: in a layout whose axes are all named, direction is read rather than inferred,
and a `Column` keeps its own direction the moment it is composed into a `Row`.

## What is deliberately not here

The legacy `view/` folder had twenty-six entries. Three of them lost their reason to exist
when R14 landed, and are not being ported:

| Legacy | v1 |
| --- | --- |
| `<Padding all={16}><X /></Padding>` | `<X padding={16} />` — R14, and one view node fewer |
| `<Center><X /></Center>` | `alignItems="center" justifyContent="center"` on the parent |
| `<Spacer />` between two items | `justifyContent="space-between"` on the parent |

Each of them added a view node to say what a style prop on an existing node already says,
and view depth is exactly what the v1 `Button` set out to reduce.
