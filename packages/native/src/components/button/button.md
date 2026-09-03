# Button

A control that runs an action when it is pressed. The reference component: every other one
in the library is this shape.

## Import

```tsx
import { Button } from '@xaui/native/button'
```

## Anatomy

```tsx
<Button>
  <Button.Spinner />
  <Button.Icon />
  <Button.Label />
</Button>
```

- **`Button`** — the root. A `PressableFeedback`, which owns the press state, resolves the
  recipe once and publishes the resolved styles to its slots. String children are wrapped
  in a `Button.Label` automatically.
- **`Button.Label`** — the text. Single-line by default: a control has a fixed height, so a
  label longer than the button truncates rather than deforming it.
- **`Button.Icon`** — an icon that takes the variant's colour and the size's scale with no
  prop. Accepts `Icon`'s three forms: `as`, a raw SVG child, or `source`.
- **`Button.Spinner`** — the busy indicator. `isLoading` inserts one when none is composed.

The view depth is one — `PressableFeedback > (Text | Icon)`. There is no wrapper view.

## Usage

### Basic

Text children are wrapped for you.

```tsx
<Button onPress={submit}>Envoyer</Button>
```

This works through a recursive stringify, not an inspection of the first child, so
`<Button>{count} items</Button>` is a label too — its children are the array `[3, ' items']`.

### Composed

Use the slots when you need more than a label. **JSX order is screen order**: there is no
`startContent` or `endContent`, and no slot carries a margin of its own — the gap belongs to
the root.

```tsx
<Button variant="danger">
  <Button.Icon as={TrashIcon} />
  <Button.Label>Supprimer</Button.Label>
</Button>

<Button variant="danger">
  <Button.Label>Supprimer</Button.Label>
  <Button.Icon as={TrashIcon} />
</Button>
```

### Icon only

```tsx
<Button isIconOnly accessibilityLabel="Supprimer">
  <Button.Icon as={TrashIcon} />
</Button>
```

`isIconOnly` drops the horizontal padding and squares the button on its fixed height. There
is no width to compute. **`accessibilityLabel` is required in practice** — there is no text
to announce, and the component warns in development when it is missing.

### Loading

```tsx
<Button isLoading>Envoi…</Button>
```

The spinner is inserted at the head when none is composed. Compose one to place it
yourself:

```tsx
<Button isLoading>
  <Button.Label>Envoi…</Button.Label>
  <Button.Spinner />
</Button>
```

A loading button is not pressable, and announces as busy rather than as disabled.

### As another element

`asChild` merges the button's props — the ref, the styles, the handlers — into its single
child instead of rendering a pressable of its own. The child _is_ the button.

```tsx
<Button asChild>
  <Link href="/projects">Voir les projets</Link>
</Button>
```

Neither the auto-wrap nor the auto-spinner applies there: there is one child, and it is
yours.

### Sizes

```tsx
<Button size="xs">xs</Button>
<Button size="sm">sm</Button>
<Button size="md">md</Button>
<Button size="lg">lg</Button>
```

`size` drives **height, padding, gap, radius and type — never width**. A button with no
width fills its parent in a column and hugs its content in a row, which is React Native's
own behaviour. There is no `fullWidth` prop — once R14 lands the deliberate case is
`width="100%"`, said explicitly. To tighten one, compose:

```tsx
<Row>
  <Button>Envoyer</Button>
</Row>

<Button style={{ alignSelf: 'flex-start' }}>Envoyer</Button>
```

### Variants

Ten values, emphasis and intention in one flat union. Each names tokens and computes
nothing.

```tsx
<Button variant="primary">primary</Button>
<Button variant="secondary">secondary</Button>
<Button variant="tertiary">tertiary</Button>
<Button variant="ghost">ghost</Button>
<Button variant="success">success</Button>
<Button variant="success-soft">success-soft</Button>
<Button variant="warning">warning</Button>
<Button variant="warning-soft">warning-soft</Button>
<Button variant="danger">danger</Button>
<Button variant="danger-soft">danger-soft</Button>
```

| `variant`      | background    | border   | label                   |
| -------------- | ------------- | -------- | ----------------------- |
| `primary`      | `accent`      | —        | `accentForeground`      |
| `secondary`    | `default`     | —        | `defaultForeground`     |
| `tertiary`     | transparent   | `border` | `foreground`            |
| `ghost`        | transparent   | —        | `foreground`            |
| `success`      | `success`     | —        | `successForeground`     |
| `success-soft` | `successSoft` | —        | `successSoftForeground` |
| `warning`      | `warning`     | —        | `warningForeground`     |
| `warning-soft` | `warningSoft` | —        | `warningSoftForeground` |
| `danger`       | `danger`      | —        | `dangerForeground`      |
| `danger-soft`  | `dangerSoft`  | —        | `dangerSoftForeground`  |

### Colour

One raw tint, and where it lands follows the variant rather than the prop:

```tsx
<Button variant="primary" color="#7c3aed">   // violet background
<Button variant="ghost" color="#7c3aed">     // violet label, no background
<Button variant="tertiary" color="#7c3aed">  // violet border and label
```

It is a **hex value, never a token**. Its contrasted, soft and pressed slices are derived
in OKLab, so a free tint behaves exactly like `accent` — same ratios, same rendering. It is
deliberately outside the style cache: letting arbitrary values into the key would grow the
table with the colours people invent instead of with the finite combinations of tokens.

### Style as props — coming

> **Not built yet.** R14 and §2 ter of the plan specify it; it is **P2.6** in the roadmap.
> Until it lands, everything below goes through `style`.

Loosening a button, giving it a width, changing a fill will not require opening an object:

```tsx
<Button padding={16} marginTop={8}>Envoyer</Button>
<Button width="100%" backgroundColor="#111">…</Button>

<Button>
  <Button.Label fontSize={18} letterSpacing={1}>Envoyer</Button.Label>
</Button>
```

**Full React Native names, and therefore full React Native values.** `padding` rather than
`p`; `padding={16}` is 16 points, exactly as `style` would be. A prop carrying the RN key's
name while silently multiplying its value by a scale would be the most expensive trap in
the API. The scale stays one word away:

```tsx
const t = useXAUITheme()
<Button padding={t.spacing(4)} borderRadius={t.radius.lg}>…</Button>
```

The set is not a list but a type — the node's style keys (`ViewStyle` on the root,
`TextStyle` on `Button.Label`) **minus the directional forms R13 bans**, which are not
exposed at all: `paddingStart`, never `paddingLeft`.

Each one styles **the node it is written on**, never a descendant — which is what separates
this from the legacy `customAppearance`. `width="100%"` is what replaces `fullWidth`, said
explicitly, and `height` beats the height `size` chose, because style props resolve after
the recipe. That is an escape hatch, not the normal path: a control whose height you
straighten by hand is usually one whose size is missing from the scale.

`color` keeps its meaning here — the tint the variant places (above) on the root, and
`TextStyle`'s `color` on `Button.Label`. Those coincide rather than conflict: in a text
component there is only one thing to tint. A raw fill on the root is `backgroundColor`,
which says what it does.

They resolve outside the style cache, and the slot's own `style` still wins — it stays the
last word for `transform`, a per-platform shadow, or a computed object.

### Everything else goes through `style`

There are two appearance props, `variant` and `color`, and no third. A shadow, a border in
a different colour than the background, a gradient — those are a slot's own `style`:

```tsx
<Button style={{ shadowColor: '#7c3aed', shadowOpacity: 0.4, shadowRadius: 12 }}>
  <Button.Label style={{ letterSpacing: 1 }}>Envoyer</Button.Label>
</Button>
```

`style` also accepts `Pressable`'s function form, `(state) => style`.

## Props

### `Button`

Everything `PressableFeedback` accepts — and therefore everything `Pressable` accepts —
plus:

| Prop                | Type                           | Default     | Notes                                             |
| ------------------- | ------------------------------ | ----------- | ------------------------------------------------- |
| `variant`           | `ButtonVariant`                | `'primary'` | The ten values above                              |
| `size`              | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`      | Height, padding, gap, radius, type. Never width   |
| `radius`            | `RadiusKey`                    | —           | Overrides the radius `size` implies               |
| `color`             | `string`                       | —           | A hex tint, placed by the variant                 |
| `isDisabled`        | `boolean`                      | `false`     |                                                   |
| `isLoading`         | `boolean`                      | `false`     | Not pressable; inserts a spinner if none composed |
| `isIconOnly`        | `boolean`                      | `false`     | No horizontal padding, square on the fixed height |
| `asChild`           | `boolean`                      | `false`     | Merge into the single child instead of rendering  |
| `feedbackVariant`   | `FeedbackVariant`              | `'scale'`   | See _Touch feedback_ below                        |
| `animation`         | `AnimationProp`                | —           | `false` mounts no worklet at all                  |
| `accessibilityRole` | `AccessibilityRole`            | `'button'`  | Overridable                                       |

### `Button.Label`

Everything `Text` accepts. `numberOfLines` defaults to `1`.

### `Button.Icon`

`Icon`'s props. `size` and `color` default to what the root resolved; passing either wins.
`style` reaches the `source` form only — the other two are not views this renders.

### `Button.Spinner`

| Prop        | Type                   | Default | Notes                                      |
| ----------- | ---------------------- | ------- | ------------------------------------------ |
| `style`     | `StyleProp<ViewStyle>` | —       |                                            |
| `animation` | `boolean`              | `true`  | `false` stops the rotation; the ring stays |

## Touch feedback

`feedbackVariant` defaults to `'scale'`, and that is a decision rather than an omission:
the recipe already paints the variant's own `…Pressed` token under the finger, so a wash on
top would darken it twice. A component picks **one** pressed treatment, never both.

`animation={false}` renders a different component rather than the same one with a branch
inside — no Reanimated hook is reached at all.

> `feedbackVariant="scale-ripple"` currently draws nothing. It is a known defect, tracked
> as P2.5 in the roadmap and written up in `.project-specs/P2-API-REVIEW.md` §D. No core
> component depends on it.

## Extending it

The context hook is exported, so a third party can write their own slot against the same
resolved values the built-in ones read:

```tsx
import { useButton } from '@xaui/native/button'

function ButtonBadge({ children }) {
  const { labelStyle, isDisabled } = useButton()
  return <Text style={labelStyle}>{children}</Text>
}
```

Used outside a `<Button>` it throws by name, pointing at the misplaced component rather
than failing three frames later on an undefined style.

## Accessibility

- `accessibilityRole` is `"button"` by default and stays overridable.
- `accessibilityState` carries `disabled` and `busy`, **merged** with any state you pass —
  adding `expanded` or `selected` does not erase them.
- An icon-only button needs an `accessibilityLabel`. There is no text to announce, and the
  component warns in development when one is missing.
- The label is real `Text`, so it is read, and it truncates rather than reflowing.

## Migration from `@xaui/native-legacy`

| Legacy                                    | v1                                                     |
| ----------------------------------------- | ------------------------------------------------------ |
| `themeColor="primary" variant="solid"`    | `variant="primary"`                                    |
| `themeColor="danger" variant="solid"`     | `variant="danger"`                                     |
| `variant="bordered"`                      | `variant="tertiary"`                                   |
| `variant="light"`                         | `variant="ghost"`                                      |
| `variant="flat"` / `"faded"`              | `variant="secondary"`, or the `-soft` of the intention |
| `startContent={<Icon />}`                 | `<Button.Icon />` before `<Button.Label />`            |
| `endContent={<Icon />}`                   | `<Button.Icon />` after `<Button.Label />`             |
| `customAppearance={{ container, label }}` | `style` on the root, `style` on `Button.Label`         |
| `fullWidth`                               | removed — that is already the default in a column      |
| `spinnerPlacement="end"`                  | compose `<Button.Spinner />` after the label           |
| `elevation`                               | `style={{ ...theme.shadows.surface }}`                 |
| `<IconButton icon={…} />`                 | `<Button isIconOnly accessibilityLabel="…">`           |
