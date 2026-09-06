# Widget

A thing on a dashboard: a title, something in a well, and a line about it underneath.

## Import

```tsx
import { Widget } from '@xaui/native/widget'
```

## Usage

```tsx
<Widget>
  <Widget.Header>
    <Widget.Heading>
      <Widget.Title>Tokens consommés</Widget.Title>
      <Widget.Description>30 derniers jours</Widget.Description>
    </Widget.Heading>
    <Chart.Legend labels={['Entrée', 'Sortie']} />
  </Widget.Header>

  <Widget.Content>
    <LineChart data={rows} xKey="jour" yKeys={['entree', 'sortie']} />
  </Widget.Content>

  <Widget.Footer>Mis à jour il y a 2 minutes</Widget.Footer>
</Widget>
```

## It is a `Card` with a well cut into it

That is the whole difference, and it is worth stating plainly because the two look alike in
a screenshot.

A **card** puts its content flush on its own ground: the header, the body and the footer are
all the same surface, and what separates them is space.

A **widget** recesses the middle one level. What is inside `Widget.Content` reads as a panel
the card is _holding_ rather than as part of the card — which is exactly what a figure, a
table or a list needs when the card around it also carries a title and a timestamp that are
**not** part of the thing being shown.

Reach for a card when the content _is_ the card's content. Reach for a widget when the card
is a frame around something with its own edges.

## The well's corner is derived, not chosen

An inner corner is the outer one **less the gap between them** — here the card's own
padding:

```
wellRadius = theme.radius[radius] − theme.spacing(padding)
```

Two arcs that do not follow that rule run at different rates, and the inset stops reading as
a well cut into the card and starts reading as a sticker laid on it. It is the one thing
this component's shape depends on, so it is not a prop.

It is clamped at zero, because a large padding under a small corner would otherwise ask for
a negative radius — an `xs` widget at `radius="sm"` has a square well, correctly.

A `radius` prop therefore moves **both** corners. That is what the forty `size × radius`
compounds in the recipe are for: an axis sees only its own prop, and this value needs two.

## Slots

| slot                 | node   | what it is                                                          |
| -------------------- | ------ | ------------------------------------------------------------------- |
| `Widget`             | `View` | the card                                                            |
| `Widget.Header`      | `View` | the row above the well — heading on one side, anything on the other |
| `Widget.Heading`     | `View` | the title and its description, as one block                         |
| `Widget.Title`       | `Text` | what this is. An `accessibilityRole="header"`                       |
| `Widget.Description` | `Text` | what it is showing — the period, the unit, the caveat               |
| `Widget.Content`     | `View` | the well                                                            |
| `Widget.Footer`      | `Text` | when it was last updated, over what range, what it excludes         |

Every one of them is optional and none of them has a fixed order — a widget that is a well
and nothing else is a `Widget` with one `Widget.Content` in it.

### Why `Heading` exists

The gap between a title and its subtitle is a different gap from the one between that block
and the legend beside it, and R4 puts layout on a root — so two gaps need two roots. It also
shrinks rather than pushing, so a long title wraps instead of squeezing the trailing content
off the row.

### `Widget.Content` is a ground, not a chart slot

A figure, a table, a list of rows, a map — whatever the widget is showing goes there, and
the only thing the slot knows about it is that it is a different level from the card.

It **clips**, which matters for the case this component exists for: a chart's own box is a
rectangle, and a rectangle in a rounded well shows its corners.

### `Widget.Footer` is a `Text`

Because that is what it almost always is — a timestamp, a range, a caveat. A footer that
needs a control in it is a `View` you write, and this slot is what you put in it:

```tsx
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Widget.Footer>Mis à jour il y a 2 minutes</Widget.Footer>
  <Button variant="ghost" size="xs">
    Voir tout
  </Button>
</View>
```

## Variants

The `Surface`'s three levels, and deliberately the same three: a widget **is** a surface
with a well cut into it, and its content sits one level below whatever the card is.

| variant     | the card              | the well           |
| ----------- | --------------------- | ------------------ |
| `primary`   | `surface`             | `surfaceSecondary` |
| `secondary` | `surfaceSecondary`    | `surfaceTertiary`  |
| `tertiary`  | `background` + border | `surface`          |

`tertiary` is the one that inverts. Its card is the page's own colour with an outline, so
there is nothing below it to recess into — the well steps **up** instead, and reads as the
one solid thing inside an outline.

### Why the well is not a role

The engine's roles are what a raw `color` reaches. Naming the well `bgSelected` would have
made `color="#7c3aed"` paint the _inside_ of the card purple, which is not what a tint on a
container means — so it is a compound instead, and `color` lands on the card as it does
everywhere else.

## `isElevated` is on by default

Unlike the `Surface`'s, which is off. A widget is one of several on a dashboard, and the
shadow is what separates it from the next one; a surface is a ground under a form, where the
`Surface` doc's argument holds — a shadow reads as dirt under a level barely different from
the page.

That argument applies here to `tertiary`, and that is the variant to turn it off on:

```tsx
<Widget variant="tertiary" isElevated={false}>
```

## Size

`size` moves the padding, the gaps, the corner and the type — **never a height**. A widget
is as tall as what is in it.

| size | card padding | well padding | corner | title |
| ---- | ------------ | ------------ | ------ | ----- |
| `xs` | 3            | 2            | `xl`   | `sm`  |
| `sm` | 3.5          | 2.5          | `2xl`  | `md`  |
| `md` | 4            | 3            | `2xl`  | `lg`  |
| `lg` | 5            | 3.5          | `3xl`  | `xl`  |

The well's padding is smaller than the card's at every size: it is a panel, not a second
card, and matching them would double the inset at the edges.

## Accessibility

`Widget.Title` is an `accessibilityRole="header"`, which is what a screen reader jumps
between — so a dashboard of widgets is navigable by their titles. Pass your own
`accessibilityRole` to override it, on a widget whose title is not a heading.

The root has no role of its own: a widget is a grouping, and what is inside it carries the
semantics.

## Props

Every node takes R14's style props for its own style type — `ViewStyle` on the views,
`TextStyle` on the three texts — and forwards `ref`, `testID` and the a11y props.

`useWidget()` is exported: it returns the resolved styles, so a slot of your own — a toolbar
in the header, a second well under the first — is written the same way the shipped ones are.
