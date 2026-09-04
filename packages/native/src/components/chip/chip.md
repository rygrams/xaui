# Chip

A compact token — a status, a tag, a filter, a person.

## Import

```tsx
import { Chip } from '@xaui/native/chip'
```

## Anatomy

```tsx
<Chip>
  <Chip.Dot />
  <Chip.Avatar />
  <Chip.Icon />
  <Chip.Label />
  <Chip.Close />
</Chip>
```

- **`Chip`** — the root. A `View`, or a `PressableFeedback` when `isPressable` is set. It
  resolves the recipe once and publishes the resolved styles to its slots. A string child
  is wrapped in a `Chip.Label` automatically, which is the majority case:
  `<Chip>Payée</Chip>` is the whole component most of the time.
- **`Chip.Label`** — the text. Single-line by default, like `Button.Label` and for the same
  reason: a chip has a fixed height, so a label too long for it truncates rather than
  deforming the capsule.
- **`Chip.Dot`** — the status mark. A filled circle in the variant's foreground, sized by
  the chip.
- **`Chip.Icon`** — a glyph that takes the chip's size and colour without being told
  either. The three forms of `Icon`: `as`, a raw SVG child, or `source`.
- **`Chip.Avatar`** — a round, chip-sized frame: `source` renders an image, anything else
  is centred and clipped the same way. Its diameter always fits inside the chip's height.
- **`Chip.Close`** — the dismiss affordance, and **a control in its own right**. It owns
  its press state rather than reading the chip's, and with no children it draws its own
  cross — so a dismissible chip works in a project that has installed no icon set.

**JSX order is screen order** (R4). No slot carries a margin: what separates a dot from its
label, or a label from its cross, is the root's `gap`. That is why there is no
`startContent` / `endContent` — a leading cross and a trailing one differ by where you
wrote the slot, and nothing has to be undone to swap them.

## Usage

### Basic

```tsx
<Chip>Nouveau</Chip>
<Chip variant="success-soft">Payée</Chip>
```

### Composed

```tsx
<Chip variant="tertiary">
  <Chip.Dot />
  <Chip.Label>En cours</Chip.Label>
</Chip>

<Chip variant="default">
  <Chip.Avatar source={author.photo} />
  <Chip.Label>Amina</Chip.Label>
  <Chip.Close accessibilityLabel="Retirer Amina" onPress={remove} />
</Chip>

<Chip variant="warning-soft">
  <Chip.Icon as={AlertIcon} />
  <Chip.Label>Expire demain</Chip.Label>
</Chip>
```

### Pressable

```tsx
<Chip
  isPressable
  variant={isOn ? 'primary' : 'tertiary'}
  accessibilityState={{ selected: isOn }}
  onPress={toggle}
>
  Design
</Chip>
```

`isPressable` is a prop rather than an inference from `onPress` being present, because the
two answers are different **elements** — a `View` and a `Pressable`. Inferring it would
remount the chip, and change what a screen reader announces, on the render where a handler
happens to become `undefined`.

A chip carrying only a `Chip.Close` stays static: the control is the cross, not the chip
around it.

### Dismissible

```tsx
{
  tags.map(tag => (
    <Chip key={tag} variant="default">
      <Chip.Label>{tag}</Chip.Label>
      <Chip.Close
        accessibilityLabel={`Retirer ${tag}`}
        onPress={() => remove(tag)}
      />
    </Chip>
  ))
}
```

Pass a child to replace the built-in cross:

```tsx
<Chip.Close accessibilityLabel="Retirer">
  <Chip.Icon as={XIcon} />
</Chip.Close>
```

### As another element

```tsx
<Chip asChild variant="secondary">
  <Link href="/tags/design">Design</Link>
</Chip>
```

The caller's element **is** the chip, so the auto-wrap does not apply — write the label
yourself, or a slot, inside it.

### Sizes

`size` drives the height, the horizontal padding, the gap and the type — **never the
width**. A chip hugs its label: `alignSelf` is `flex-start`, so a chip in a column stays
the width of its text instead of stretching, which is the one place its layout deliberately
differs from a `Button`'s.

| `size` | Height | Padding | Label | Dot | Avatar |
| ------ | ------ | ------- | ----- | --- | ------ |
| `xs`   | 20     | 8       | 12/16 | 4   | 14     |
| `sm`   | 24     | 10      | 12/16 | 5   | 18     |
| `md`   | 28     | 12      | 14/20 | 6   | 22     |
| `lg`   | 36     | 16      | 16/24 | 8   | 28     |

The height is fixed where HeroUI uses vertical padding. Same numbers — theirs resolve to
20, 28 and 36 — and a different reason to arrive at them: with padding, a chip carrying an
avatar is taller than the chip beside it carrying only text, and a row of filters stops
lining up.

### Variants

Eleven flat names, replacing HeroUI's `variant × color` matrix — four emphases times five
intents, of which nine combinations paint the same thing.

The first five are the `Button`'s ladder, descending by how much accent is left. The six
that follow are the three status families the `Button` deliberately refused: a button is
something you press and neither a success nor a warning is an action, while a chip
**reports** — the outcome _is_ what it says.

| `variant`      | Background    | Border   | Text                    |
| -------------- | ------------- | -------- | ----------------------- |
| `primary`      | `accent`      | —        | `accentForeground`      |
| `secondary`    | `accentSoft`  | —        | `accentSoftForeground`  |
| `default`      | `default`     | —        | `defaultForeground`     |
| `tertiary`     | transparent   | `border` | `foreground`            |
| `ghost`        | transparent   | —        | `foreground`            |
| `success`      | `success`     | —        | `successForeground`     |
| `success-soft` | `successSoft` | —        | `successSoftForeground` |
| `warning`      | `warning`     | —        | `warningForeground`     |
| `warning-soft` | `warningSoft` | —        | `warningSoftForeground` |
| `danger`       | `danger`      | —        | `dangerForeground`      |
| `danger-soft`  | `dangerSoft`  | —        | `dangerSoftForeground`  |

The dot and the cross take the **text** colour, not a status token of their own: on a
filled `success` chip the only readable colour is the one the label already uses, and on a
`success-soft` one that token _is_ the green. One rule, eleven variants, and a tinted chip
gets it for free.

### Colour

```tsx
<Chip color="#7c3aed">Sprint 12</Chip>
<Chip variant="tertiary" color="#7c3aed">
  <Chip.Dot />
  <Chip.Label>Sprint 12</Chip.Label>
</Chip>
```

A raw tint, never a token (R7). Where it lands follows the variant, exactly as on a
`Button`: the fill of a `primary`, the border and text of a `tertiary`, the text of a
`ghost`. Its soft, contrasted and pressed slices are derived in OKLab, so the dot and the
cross follow without being told a second colour — and so a tinted chip presses the same way
a token one does.

It resolves outside the style cache, which is why it must be a hex value and why it is the
one prop that allocates per render.

### Style as props

Every node takes its own style keys as props (R14) — full React Native names, full React
Native values, no hidden scale:

```tsx
<Chip paddingHorizontal={20} maxWidth={160}>
  <Chip.Label fontSize={13} letterSpacing={0.4}>
    Un libellé très long qui sera tronqué
  </Chip.Label>
</Chip>

<Chip variant="tertiary">
  <Chip.Dot backgroundColor={theme.colors.success} />
  <Chip.Label>En ligne</Chip.Label>
</Chip>
```

A dot that reports something other than what its chip does is the case `backgroundColor`
exists for. `padding={16}` is 16 points; reach for the scale explicitly with
`padding={theme.spacing(4)}`.

### Everything else goes through `style`

- **A gradient fill, a tinted shadow, a border in a colour the fill does not imply** — the
  variant names one token for the edge, and a second one is not a variant.
- **`radius`** overrides the capsule. A chip is a pill at every size, which is what the
  name means, so this is the escape hatch for the tag that wants corners.

## Props

### `Chip`

Everything `PressableFeedback` accepts — and therefore everything `Pressable` accepts —
every `ViewStyle` key those two do not already claim (R14), plus:

| Prop                | Type                           | Default                   | Notes                                             |
| ------------------- | ------------------------------ | ------------------------- | ------------------------------------------------- |
| `variant`           | `ChipVariant`                  | `'primary'`               | The eleven names above                            |
| `size`              | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`                    | Height, padding, gap, type. Never width           |
| `radius`            | `RadiusKey`                    | —                         | Overrides the capsule                             |
| `color`             | `string`                       | —                         | A hex tint, placed by the variant                 |
| `isDisabled`        | `boolean`                      | `false`                   | Dims, stops a pressable chip, reaches its close   |
| `isPressable`       | `boolean`                      | `false`                   | Renders a `PressableFeedback` instead of a `View` |
| `asChild`           | `boolean`                      | `false`                   | Merge into the single child instead of rendering  |
| `animation`         | `AnimationProp`                | —                         | Pressable chips only; `false` mounts no worklet   |
| `accessibilityRole` | `AccessibilityRole`            | `'button'` when pressable | Overridable                                       |

The press props are on the type unconditionally, because `isPressable` is read at runtime.
A static chip is a `View` and ignores them — the component warns in development rather than
letting a chip look broken.

### `Chip.Label`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14). `numberOfLines` is `1`
by default.

### `Chip.Dot`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14). A circle sized by the
chip and filled with its foreground.

### `Chip.Icon`

The three forms of `Icon` — `as`, a raw SVG child, `source`. `size` and `color` default to
what the root resolved and an explicit value wins.

### `Chip.Avatar`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus `source` for the
image form. It is a frame, not the `Avatar` component of P3.11 — when that lands, this slot
becomes its call site rather than a second implementation.

### `Chip.Close`

Everything `PressableFeedback` accepts, plus the `ViewStyle` keys as props (R14).
`accessibilityRole` is `'button'` and `hitSlop` is `8` by default; `isDisabled` falls back
to the chip's.

## Touch feedback

**A pressed chip scales and its fill goes one step down**, using the variant's own
`…Pressed` token — the `Button`'s treatment, not the `Card`'s. A component picks **one**
pressed treatment, never both, and a chip picks this one because a wash over something this
small reads as a smudge, while the fill moving reads as the thing itself being pushed.

`Chip.Close` owns a press state of its own. The chip may be a `View`, and even when it is
pressable the two are different targets — pressing the cross must not read as pressing the
chip around it. `hitSlop` grows the cross's target outwards, because a cross big enough to
hit is a cross too big to look right.

`animation={false}` renders a different component rather than the same one with a branch
inside — no Reanimated hook is reached at all. `'disable-all'` does the same for every
descendant, which is how a long list of chips switches its rows off with one prop.

## Extending it

The context hook is exported, so a third party can write their own slot against the same
resolved values the built-in ones read:

```tsx
import { useChip } from '@xaui/native/chip'

function ChipCount({ children }) {
  const { labelStyle } = useChip()
  return <Text style={[labelStyle, { opacity: 0.6 }]}>{children}</Text>
}
```

Used outside a `<Chip>` it throws by name, pointing at the misplaced component rather than
failing three frames later on an undefined style.

## Accessibility

- A **static** chip has no role of its own and announces nothing: it is a label, and the
  text inside it is what a screen reader reads.
- A **pressable** chip is `accessibilityRole="button"` by default and stays overridable, and
  its `accessibilityState` carries `disabled` **merged** with any state you pass — adding
  `selected`, which is what a filter chip announces, does not erase it.
- **`Chip.Close` needs an `accessibilityLabel`**, and warns in development without one. A
  cross is not text, and unlike an icon-only button there is nothing to fall back on: the
  label beside it names what is being removed, not the action.
- **A dot is decoration.** A chip whose colour or dot is its only meaning is unreadable to
  a screen reader and to anyone who does not distinguish the hue — put the status in the
  label.
- A pressable chip is one target. Putting a `Chip.Close` inside one gives a screen reader
  two overlapping controls; it works, and it is worth asking whether the chip needs to be
  pressable at all.

## Migration from `@xaui/native-legacy`

| Legacy                               | v1                                                        |
| ------------------------------------ | --------------------------------------------------------- |
| `variant="solid"` + `themeColor`     | `variant="primary"` / `"success"` / `"danger"`…           |
| `variant="flat"` / `"faded"`         | the `-soft` slice: `variant="success-soft"`               |
| `variant="bordered"`                 | `variant="tertiary"`                                      |
| `variant="light"`                    | `variant="ghost"`                                         |
| `variant="dot"`                      | `variant="tertiary"` + `<Chip.Dot />`                     |
| `variant="shadow"`                   | removed — a chip is not a surface. `style` if you need it |
| `themeColor="primary"`               | `color={theme.colors.accent}`                             |
| `size="sm" \| "md" \| "lg"`          | `size` — now `xs` … `lg`, and `xs` is the legacy `sm`     |
| `radius="none"`                      | `radius="xs"`                                             |
| `avatar={<Image />}`                 | `<Chip.Avatar source={…} />`                              |
| `startContent` / `endContent`        | a slot, written before or after `Chip.Label`              |
| `onClose`                            | `<Chip.Close onPress={…} />` — composed, so you place it  |
| `onPress`                            | `isPressable` + `onPress`                                 |
| `customAppearance={{ container }}`   | `style` on the root                                       |
| `customAppearance={{ text }}`        | `style` on `Chip.Label`                                   |
| `customAppearance={{ dot }}`         | `style` on `Chip.Dot`                                     |
| `customAppearance={{ closeButton }}` | `style` on `Chip.Close`                                   |
| `ChipGroup` / `ChipItem`             | not in the 1.0 core — the group lands with P5             |
