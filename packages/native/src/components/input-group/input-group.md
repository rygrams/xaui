# InputGroup

A field with something beside it — a glyph, a unit, a reveal toggle.

## Import

```tsx
import { Input } from '@xaui/native/input'
import { InputGroup } from '@xaui/native/input-group'
```

Two imports, because they are two components and the second one lives **inside** the first.

## Anatomy

```tsx
<Input>
  <Input.Label />
  <InputGroup>
    <InputGroup.Prefix />
    <InputGroup.Field />
    <InputGroup.Suffix />
  </InputGroup>
  <Input.Description />
  <Input.Error />
</Input>
```

- **`InputGroup`** — one row of the `Input`'s column, and the positioning context the two
  decorators are laid over. It owns exactly one thing: how wide they turned out to be.
- **`InputGroup.Prefix`** — pinned to the leading edge, inset by the field's own padding.
  Its measured width becomes the field's `paddingStart`.
- **`InputGroup.Suffix`** — the same, on the trailing edge, as `paddingEnd`.
- **`InputGroup.Field`** — `Input.Field` with that padding. It **is** that field: the same
  `TextInput`, the same focus plumbing, the same styles, every `TextInput` prop.
- **`InputGroup.Icon`** — a glyph at the field's scale in the placeholder's colour.

**The label, the hint and the error are not here.** They are the `Input`'s, and this
replaces nothing but the field — which is why there is no `variant`, no `size`, no `color`
and no `isDisabled` on this root: a second `size` here would be a second answer to a
question the field has already answered.

**The box is still the `TextInput`.** The decorators are taken out of flow and laid over
it, so no wrapper borrows the border, the fill, the radius and the shadow — an `InputGroup`
and a bare `Input` cannot drift apart, because there is only one box in the library and
this is not a second one.

**No slot carries a margin** (R4), and no decorator pushes the text: the field clears them
by padding.

## Usage

### With a prefix

```tsx
<Input>
  <Input.Label>Recherche</Input.Label>
  <InputGroup>
    <InputGroup.Prefix isDecorative>
      <InputGroup.Icon as={SearchIcon} />
    </InputGroup.Prefix>
    <InputGroup.Field
      value={query}
      onChangeText={setQuery}
      placeholder="Rechercher…"
    />
  </InputGroup>
</Input>
```

### With a suffix that does something

```tsx
<Input>
  <Input.Label>Mot de passe</Input.Label>
  <InputGroup>
    <InputGroup.Prefix isDecorative>
      <InputGroup.Icon as={LockIcon} />
    </InputGroup.Prefix>
    <InputGroup.Field
      secureTextEntry={!isVisible}
      value={password}
      onChangeText={setPassword}
    />
    <InputGroup.Suffix>
      <Pressable
        onPress={() => setIsVisible(!isVisible)}
        hitSlop={20}
        accessibilityRole="button"
        accessibilityLabel={isVisible ? 'Masquer' : 'Afficher'}
      >
        <InputGroup.Icon as={isVisible ? EyeOffIcon : EyeIcon} />
      </Pressable>
    </InputGroup.Suffix>
  </InputGroup>
  <Input.Description>Douze caractères au moins.</Input.Description>
</Input>
```

The library ships no button for a suffix. A `Pressable` with a `hitSlop` is the thing to
put there — a 16pt glyph is not a touch target on its own.

### Decorative, or a control

```tsx
<InputGroup.Prefix isDecorative>…</InputGroup.Prefix>
<InputGroup.Suffix>…</InputGroup.Suffix>
```

`isDecorative` does two things and they belong together: touches pass through to the field
underneath, so tapping the glyph focuses the field, and the content leaves the
accessibility tree, so a screen reader never stops on a mark it cannot act on.

It is **off by default**, because the trailing edge is where a decorator is most often a
control and a suffix that swallowed its own taps would be a reveal toggle you cannot press.

### Anything, not just a glyph

```tsx
<InputGroup>
  <InputGroup.Prefix isDecorative>
    <Text>+33</Text>
  </InputGroup.Prefix>
  <InputGroup.Field keyboardType="phone-pad" />
</InputGroup>
```

Nobody is told a number. The decorator measures itself and the field clears it by that
width, so a country code, two glyphs and a 16pt mark all land right.

### Multiline

`InputGroup.Field` is `Input.Field`, so `multiline` works on it — and `rows` and `maxRows`
do not, because those are the [`TextArea`](../text-area/text-area.md)'s and reach
`TextArea.Field` alone. A decorator spans the whole box, so over several lines it lands in
the middle of it; style props are what pin it where it belongs:

```tsx
<InputGroup>
  <InputGroup.Field multiline height={96} textAlignVertical="top" paddingTop={12} />
  <InputGroup.Suffix isDecorative alignItems="flex-start" paddingTop={12}>
    <InputGroup.Icon as={MailIcon} />
  </InputGroup.Suffix>
</InputGroup>
```

### Disabled

```tsx
<Input isDisabled>
  <InputGroup>
    <InputGroup.Prefix isDecorative>…</InputGroup.Prefix>
    <InputGroup.Field />
    <InputGroup.Suffix>…</InputGroup.Suffix>
  </InputGroup>
</Input>
```

`isDisabled` is on the **`Input`**, and it reaches everything: the column dims, the field
stops, and both decorators stop taking touches — including a suffix that is not decorative,
because a toggle you can still press on a disabled field is a bug rather than a feature.

### As another element

```tsx
<InputGroup asChild>
  <Animated.View layout={LinearTransition}>…</Animated.View>
</InputGroup>
```

R12 — the caller's element **is** the row. The decorators still measure into it.

## How the padding gets there

A decorator is out of flow, so it cannot push the text aside the way a sibling in a row
would. It measures itself with `onLayout`, reports the width to the root, and
`InputGroup.Field` turns the two numbers into `paddingStart` and `paddingEnd`.

That is the same shape `TextArea` uses for `rows`: **a raw value the slot turns into a
style, outside the style cache** (R6). A width is not knowable before layout and takes as
many values as there are decorators, so it could never be a cache key.

They land after the recipe's own `paddingHorizontal`, which is what makes them win, and
before the caller's `style`, which still has the last word. `start` and `end`, never `left`
and `right` (R13): the prefix is the leading edge in both directions of writing.

The cost is one extra layout pass on mount, and the first frame draws before the width is
known. That is the trade the alternative avoids — a wrapper `View` carrying the box, with
the field flattened inside it — and the reason we did not take it is above: a second box is
a second thing to keep in step with `Input`.

## Sizes

There is no `size` here. The `Input`'s decides everything:

| `size` | Decorator inset | Gap | Icon |
| ------ | --------------- | --- | ---- |
| `xs`   | 10              | 10  | 16   |
| `sm`   | 12              | 12  | 18   |
| `md`   | 12              | 12  | 18   |
| `lg`   | 16              | 16  | 20   |

The inset is the field's own horizontal padding, so the glyph starts where the text would
have. The gap is that same step — HeroUI's, and it is what separates two glyphs in one
decorator.

The icon sits **one step above the field's type**, exactly as on the `Button` and the
`Chip`: a 16pt glyph beside 16pt of text reads as an icon smaller than the text it sits
with. HeroUI's component sizes no icon at all — theirs is a number at the call site — so
this is a slot they do not have rather than a value we disagree on.

## Colour

`InputGroup.Icon` takes the theme's `fieldPlaceholder`: a mark in a field is decoration for
the text, not text. An explicit `color` wins, which is what `Icon` promises everywhere else
in the library, and it is the answer for a tinted `primary` or `secondary` field — there the
fill is the caller's colour and the placeholder grey is no longer readable over it:

```tsx
<Input variant="primary" color="#7c3aed">
  <InputGroup>
    <InputGroup.Prefix isDecorative>
      <InputGroup.Icon as={SearchIcon} color="#ffffff" />
    </InputGroup.Prefix>
    <InputGroup.Field />
  </InputGroup>
</Input>
```

Everything else a tint touches — the border, the fill, the focus — is the `Input`'s and
reaches the group untouched.

## Alignment with `heroui-native`

Measured against their `input-group.tsx` and `input-group.css` rather than eyeballed.

**Identical:** the anatomy (a root, two decorators, a field), the decorators pinned out of
flow with a `zIndex` over the field, the 12pt inset and 12pt gap at `md`, the field cleared
by the decorator's _measured_ width on the logical edges, `isDecorative` doing exactly the
two things it does there — `pointerEvents="none"`, `accessibilityElementsHidden` and
`importantForAccessibility="no-hide-descendants"` — and the disabled cascade reaching both
decorators.

**Three deltas, all of them the shape of our `Input` rather than a disagreement:**

| Theirs                                          | Ours               | Why                                                                                                                                      |
| ----------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `isDisabled` on the group                       | on the `Input`     | Their `Input` is the box and their `TextField` is the column; ours is the column already, and it holds the state the recipe resolves on. |
| `InputGroup.Input`, a pass-through to `Input`   | `InputGroup.Field` | Our field is `Input.Field`, so the slot keeps the field's name.                                                                          |
| No icon slot — a size and a colour at each call | `InputGroup.Icon`  | The slot `Button`, `Chip` and `Alert` all have, so a form does not carry a hard-coded `#888` on every field.                             |

Their `animation="disable-all"` has no counterpart because nothing here animates: a
decorator that is laid over the field does not move when the field is focused.

## Props

### `InputGroup`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop      | Type      | Default | Notes                                            |
| --------- | --------- | ------- | ------------------------------------------------ |
| `asChild` | `boolean` | `false` | Merge into the single child instead of rendering |

**No `variant`, `size`, `radius`, `color`, `isInvalid` or `isDisabled`.** They are the
`Input`'s.

### `InputGroup.Prefix`, `InputGroup.Suffix`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop           | Type      | Default | Notes                                             |
| -------------- | --------- | ------- | ------------------------------------------------- |
| `isDecorative` | `boolean` | `false` | Touches pass through, and the content leaves a11y |

`onLayout` is composed, never replaced — the measurement happens and your handler runs.

### `InputGroup.Field`

Everything `Input.Field` accepts, which is everything `TextInput` accepts except
`editable`, plus the `TextStyle` keys as props (R14).

### `InputGroup.Icon`

Everything `Icon` accepts. `size` and `color` default to the field's own; passing either
wins.

## Extending it

Both hooks are exported, so a third party can write its own decorator against the same
values the built-in two read:

```tsx
import { useInput } from '@xaui/native/input'
import { useInputGroup } from '@xaui/native/input-group'

function InputGroupCounter({ length, max }) {
  const { suffixStyle, icon } = useInput()
  const { setSuffixWidth } = useInputGroup()

  return (
    <View
      style={suffixStyle}
      onLayout={event => setSuffixWidth(event.nativeEvent.layout.width)}
    >
      <Text style={{ color: icon.color }}>
        {length} / {max}
      </Text>
    </View>
  )
}
```

Reporting the width is what makes the field clear it. Skip that and the decorator still
draws — over the text.

Used outside an `<InputGroup>` the hook throws by name, pointing at the misplaced component
rather than failing three frames later on an undefined width.

## Accessibility

- **The row has no role.** The control is the field inside it, and a role here would give a
  screen reader a second element to stop on before reaching it.
- **A decorative decorator is hidden on both platforms** — `accessibilityElementsHidden` on
  iOS, `importantForAccessibility="no-hide-descendants"` on Android — and only when
  decorative: a reveal toggle is a control and has to stay reachable.
- **A control in a suffix names itself.** Give it an `accessibilityRole` and an
  `accessibilityLabel`; a glyph has no text for a screen reader to read.
- **A prefix is not a label.** `+33` in front of a field says nothing to a screen reader
  about what the field holds — write an `Input.Label` as well.

## Migration from `@xaui/native-legacy`

The legacy component is `TextInput`, and these are the two props this replaces.

| Legacy                         | v1                                                      |
| ------------------------------ | ------------------------------------------------------- |
| `startContent={<Icon />}`      | `<InputGroup.Prefix isDecorative>…</InputGroup.Prefix>` |
| `endContent={<Icon />}`        | `<InputGroup.Suffix>…</InputGroup.Suffix>`              |
| `isClearable`                  | a `Pressable` in a suffix that sets the value to `''`   |
| `customAppearance={{ input }}` | `style` on `<InputGroup.Field>`                         |
