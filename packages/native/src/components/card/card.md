# Card

A surface that groups related content — and, with `isPressable`, the control that opens it.

## Import

```tsx
import { Card } from '@xaui/native/card'
```

## Anatomy

```tsx
<Card>
  <Card.Header>
    <Card.Title />
    <Card.Description />
  </Card.Header>
  <Card.Body />
  <Card.Footer />
</Card>
```

- **`Card`** — the root. A `View`, or a `PressableFeedback` when `isPressable` is set. It
  resolves the recipe once and publishes the resolved styles to its slots. A string child
  is wrapped in a `Card.Description` automatically.
- **`Card.Header`** — the top section: a badge, an icon, a title block. A column pinned to
  the leading edge; `flexDirection="row"` makes it a title-and-action bar.
- **`Card.Body`** — the main section, and the one that grows. Given a card with a height,
  it takes what the header and the footer leave.
- **`Card.Footer`** — the bottom section. A **row**, because a footer is an action row.
- **`Card.Title`** — the heading. It wraps, where `Button.Label` truncates: a card has no
  fixed height to deform.
- **`Card.Description`** — the prose. It sits behind the title on a fraction of the title's
  own colour rather than on `muted`, which is what keeps it readable on a tinted card.

**No slot carries a margin** (R4). What separates the sections is the root's `gap`, so JSX
order is screen order and nothing has to be undone to reorder them. The sections are
optional and independent: a card that is a title and a description needs neither a body nor
a footer.

## Usage

### Basic

```tsx
<Card>
  <Card.Header>
    <Card.Title>Facture #1024</Card.Title>
    <Card.Description>Émise le 3 mars, échéance le 2 avril.</Card.Description>
  </Card.Header>
</Card>
```

A stringifiable tree becomes a `Card.Description` on its own (R3) — `Description` and not
`Title`, because a card with prose and no heading is ordinary and the reverse is not:

```tsx
<Card>Une carte qui ne dit qu'une chose.</Card>
```

### Composed

```tsx
<Card>
  <Card.Header>
    <Card.Title>Facture #1024</Card.Title>
    <Card.Description>Émise le 3 mars.</Card.Description>
  </Card.Header>

  <Card.Body>
    <Text>Trois lignes, 1 240 € hors taxes.</Text>
  </Card.Body>

  <Card.Footer>
    <Button size="sm">Payer</Button>
    <Button size="sm" variant="ghost">
      Plus tard
    </Button>
  </Card.Footer>
</Card>
```

The header is a column and the footer a row, which are the two common cases. Either flips
with one style prop (R14):

```tsx
<Card.Header flexDirection="row" justifyContent="space-between">
  <Card.Title>Activité</Card.Title>
  <Button size="xs" variant="tertiary">
    Voir
  </Button>
</Card.Header>
```

### Pressable

```tsx
<Card isPressable onPress={open}>
  <Card.Header>
    <Card.Title>Facture #1024</Card.Title>
  </Card.Header>
</Card>
```

`isPressable` is a prop and not an inference from `onPress` being present, because the two
answers are different **elements** — a `View` and a `Pressable`. Inferring it would remount
the card, and change what a screen reader announces, on the render where a handler happens
to become `undefined`. A press handler written without it warns in development.

### As another element

```tsx
<Card asChild>
  <Link href="/invoices/1024">
    <Card.Title>Facture #1024</Card.Title>
  </Link>
</Card>
```

Under `asChild` the caller's element **is** the card: it receives the ref, the styles and
the handlers. There is no auto-wrap and, on a pressable card, no press wash — the element
is the pressable, and there is no sibling to paint under it.

### Sizes

```tsx
<Card size="xs" /> <Card size="sm" /> <Card size="md" /> <Card size="lg" />
```

`size` drives padding, both gaps, the radius and the type of `Title` and `Description` —
**never a height**. A card is a surface: it is as tall as what it holds, and as wide as its
parent lets it be. There is no `fullWidth`; `width="100%"` and `alignSelf` are the answer,
as everywhere else.

Two gaps move with it, not one. `gap` separates the sections; the gap inside a section
separates a title from its description. One value for both would read as a list of five
things rather than as three blocks.

### Variants

Four levels, and they are the `Button`'s own names — that is what makes this a subtype of
one vocabulary rather than a second one. A card **reports nothing**, so `success`,
`warning` and `danger` are absent: a card coloured by an outcome is a card holding a `Chip`
or an `Alert` that carries it.

| `variant`   | Surface            | Edge     | Elevation         |
| ----------- | ------------------ | -------- | ----------------- |
| `default`   | `surface`          | `border` | `shadows.surface` |
| `secondary` | `surfaceSecondary` | `border` | —                 |
| `tertiary`  | —                  | `border` | —                 |
| `ghost`     | —                  | —        | —                 |

The elevation belongs to the one variant that is a surface standing on the background.
`secondary` is the level for a card _inside_ a card, and `tertiary` and `ghost` have no
fill to lift, so a shadow under any of them would read as dirt rather than as height. In
dark mode the theme's `surface` shadow is already nothing, which is why the recipe names
the role instead of a set of numbers.

### Colour

```tsx
<Card color="#7c3aed">…</Card>
<Card variant="tertiary" color="#7c3aed">…</Card>
```

One raw tint, placed by the variant: the fill of a `default`, the border of a `tertiary`,
the text of a `ghost`. Its contrasted slice is derived in OKLab, so the title stays readable
on the fill without a second colour being named — and the description follows, because it
is a fraction of the title's colour rather than a fixed grey.

### Style as props

```tsx
<Card padding={32} width="70%">…</Card>
<Card.Title fontSize={24} letterSpacing={-0.5}>…</Card.Title>
```

Full React Native names, so full React Native values: `padding={32}` is 32 points, never a
step on a scale. They resolve after the recipe and before the node's own `style`, and they
are scoped to the node they are written on — a `padding` on `Card.Body` pads the body, not
the card.

### Everything else goes through `style`

A tinted shadow, a gradient, a `transform`, a per-platform value: `style`, on the root or on
the slot that needs it. Two cases worth naming:

- **A full-bleed image** needs `overflow="hidden"` on the root, which the card does not set
  itself: on iOS it clips the node's own shadow, and a `default` card would lose the
  elevation its variant just gave it.
- **A border in a different colour than the fill** is `borderColor` and `borderWidth` as
  style props — the variant names one token for the edge, and a second one is not a
  variant.

## Props

### `Card`

Everything `PressableFeedback` accepts — and therefore everything `Pressable` accepts —
every `ViewStyle` key those two do not already claim (R14), plus:

| Prop                | Type                           | Default                   | Notes                                                  |
| ------------------- | ------------------------------ | ------------------------- | ------------------------------------------------------ |
| `variant`           | `CardVariant`                  | `'default'`               | The four levels above                                  |
| `size`              | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`                    | Padding, gaps, radius, type. Never a height            |
| `radius`            | `RadiusKey`                    | —                         | Overrides the radius `size` implies                    |
| `color`             | `string`                       | —                         | A hex tint, placed by the variant                      |
| `isDisabled`        | `boolean`                      | `false`                   | Dims; on a pressable card, also stops the touch        |
| `isPressable`       | `boolean`                      | `false`                   | Renders a `PressableFeedback` instead of a `View`      |
| `asChild`           | `boolean`                      | `false`                   | Merge into the single child instead of rendering       |
| `animation`         | `AnimationProp`                | —                         | Pressable cards only; `false` mounts no worklet at all |
| `accessibilityRole` | `AccessibilityRole`            | `'button'` when pressable | Overridable                                            |

The press props are on the type unconditionally, because `isPressable` is read at runtime.
A static card is a `View` and ignores them — the component warns in development rather than
letting a card look broken.

### `Card.Header`, `Card.Body`, `Card.Footer`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14). The header is a column
aligned to the leading edge, the body grows, the footer is a row.

### `Card.Title`, `Card.Description`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14) — `fontSize`, `color`,
`numberOfLines`… Both wrap by default.

## Touch feedback

**A pressable card scales and takes a wash**, where the `Button` scales and uses its
variant's own `…Pressed` token. A component picks **one** pressed treatment, never both, and
the card picks the other one for two reasons: it has no pressed token per surface level to
swap to, and on an area this large a flat overlay says "under the finger" better than a fill
a shade darker does.

The wash contrasts with whatever the card is: the root reads the ink off its own resolved
background, so a tinted card, an outlined one and a ghost one each get an overlay that is
visible on them. It rounds itself to the card's corners, which is why the root needs no
`overflow: 'hidden'` — and must not have one, or the iOS shadow goes with it.

`animation={false}` renders a different component rather than the same one with a branch
inside — no Reanimated hook is reached at all. `'disable-all'` does the same for every
descendant, which is how a list of cards switches its rows off with one prop.

## Extending it

The context hook is exported, so a third party can write their own slot against the same
resolved values the built-in ones read:

```tsx
import { useCard } from '@xaui/native/card'

function CardMedia({ source }) {
  const { bodyStyle } = useCard()
  return <Image style={bodyStyle} source={source} />
}
```

Used outside a `<Card>` it throws by name, pointing at the misplaced component rather than
failing three frames later on an undefined style.

## Accessibility

- A **static** card has no role of its own and announces nothing: it is a box, and the text
  inside it is what a screen reader reads. `accessibilityRole` is yours to set when the card
  is a landmark.
- A **pressable** card is `accessibilityRole="button"` by default and stays overridable, and
  its `accessibilityState` carries `disabled` **merged** with any state you pass — adding
  `expanded` or `selected` does not erase it.
- A pressable card is one target. Nesting a `Button` inside one gives a screen reader two
  overlapping controls and a sighted user an ambiguous tap — put the actions in the footer
  of a _static_ card instead.
- `Title` and `Description` are real `Text`, so they are read and they reflow at large font
  sizes rather than truncating.

## Migration from `@xaui/native-legacy`

| Legacy                                        | v1                                                        |
| --------------------------------------------- | --------------------------------------------------------- |
| `themeColor="default"`                        | `variant="default"`                                       |
| `themeColor="primary"`                        | `color={theme.colors.accent}`                             |
| `padding={16}`                                | `size`, or `padding={16}` as a style prop                 |
| `elevation={2}`                               | `variant="default"` — the surface shadow is the variant's |
| `fullWidth`                                   | removed — that is already the default in a column         |
| `isPressable`                                 | `isPressable` — now a `PressableFeedback`                 |
| `isHoverable`                                 | removed — there is no hover on a touch surface            |
| `isBlurred` / `isFooterBlurred`               | removed — a glass theme, not a card prop. Out of 1.0      |
| `disableAnimation`                            | `animation={false}`                                       |
| `disableRipple`                               | removed — a card washes, it does not ripple               |
| `customAppearance={{ container }}`            | `style` on the root                                       |
| `customAppearance={{ header, body, footer }}` | `style` on `Card.Header` / `.Body` / `.Footer`            |
| `customAppearance={{ title, description }}`   | `style` on `Card.Title` / `.Description`                  |
