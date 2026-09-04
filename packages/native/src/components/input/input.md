# Input

A text field, with the label, the hint and the error that make it usable.

## Import

```tsx
import { Input } from '@xaui/native/input'
```

## Anatomy

```tsx
<Input>
  <Input.Label />
  <Input.Field />
  <Input.Description />
  <Input.Error />
</Input>
```

- **`Input`** — the root, and it is the **column, not the field**. A `View` that resolves
  the recipe once and publishes the resolved styles to its slots. It owns the focus state,
  because the recipe resolves on it (R5).
- **`Input.Field`** — the `TextInput`. Everything `TextInput` accepts is written here:
  `value`, `onChangeText`, `keyboardType`, `secureTextEntry`, `multiline`, `autoComplete`.
- **`Input.Label`** — what the field is for. It carries the id the field points at.
- **`Input.Description`** — the hint under the field: the format expected, what the value
  is used for.
- **`Input.Error`** — what is wrong with the value, in `danger`.

**The root is the column** so that the label, the hint and the error are slots of one
component rather than three components a form has to keep in step. That is also why
`TextInputProps` are on `Input.Field` and not on the root: the field is the node that has
them.

**No auto-wrap** (R3), unlike `Button`, `Card`, `Chip` and `Alert`: a string child of an
input is not a label, a value or a placeholder in any way the component could guess.

**No slot carries a margin** (R4). What separates the three lines is the root's `gap`, so
JSX order is screen order — a label under the field is a matter of where you wrote it.

## Usage

### Basic

```tsx
<Input>
  <Input.Label>Courriel</Input.Label>
  <Input.Field
    value={email}
    onChangeText={setEmail}
    placeholder="nom@exemple.fr"
    keyboardType="email-address"
    autoCapitalize="none"
    autoComplete="email"
  />
  <Input.Description>On ne le partage jamais.</Input.Description>
</Input>
```

### Invalid

```tsx
<Input isInvalid={Boolean(error)}>
  <Input.Label>Courriel</Input.Label>
  <Input.Field value={email} onChangeText={setEmail} />
  {error ? <Input.Error>{error}</Input.Error> : null}
</Input>
```

`isInvalid` paints the border, the label and the description in `danger`, and **takes the
focus treatment off**: an error outranks focus, and a field that is both should read as
wrong rather than as busy.

It does **not** mount or unmount `Input.Error`. You write that condition yourself and see
it — a slot that silently renders nothing is a slot you cannot debug.

### Multiline

```tsx
<Input>
  <Input.Label>Message</Input.Label>
  <Input.Field
    multiline
    numberOfLines={4}
    minHeight={120}
    paddingTop={12}
    textAlignVertical="top"
  />
</Input>
```

The field's height from `size` is a **minimum**, so a multiline field grows past it instead
of clipping. `minHeight` and `paddingTop` as style props (R14) are how you give it a
starting size and stop the text sitting against the top edge.

### Disabled

```tsx
<Input isDisabled>
  <Input.Label>Identifiant</Input.Label>
  <Input.Field value={login} />
</Input>
```

`editable` is not a public prop — it is `disabled` under another name, and R8 keeps that
off the surface. `isDisabled` on the root dims the column and stops the field.

### As another element

```tsx
<Input asChild>
  <Animated.View layout={LinearTransition}>…</Animated.View>
</Input>
```

The caller's element **is** the column. The slots still read the root's context.

### Sizes

`size` drives the field's minimum height, its padding, the gaps and the type — **never the
width**. A field with no width fills its parent in a column, which is RN's own behaviour
and the reason there is no `fullWidth` prop.

| `size` | Field min-height | Padding | Field | Label | Description / Error |
| ------ | ---------------- | ------- | ----- | ----- | ------------------- |
| `xs`   | 32               | 10      | 14    | 14/20 | 12/16               |
| `sm`   | 40               | 12      | 16    | 14/20 | 12/16               |
| `md`   | 48               | 12      | 16    | 16/24 | 14/20               |
| `lg`   | 56               | 16      | 18    | 18/28 | 16/24               |

`md` is HeroUI's input measured: a 48pt minimum, 12pt of horizontal padding, a 16/24 label
above the field and a 14/20 line below it.

**A minimum and not a fixed height**, which is the one place this component departs from
the rule the `Button` and the `Chip` follow. A `TextInput` with `multiline` holds three
lines of the user's own text and has to grow; a control whose content is not the
developer's cannot be truncated into shape. HeroUI reaches the same conclusion with
`min-height`.

The label and the help text carry a small horizontal inset — half the `md` field's padding
— so the column reads as one block. It does not scale: it is an optical alignment, not a
measurement.

### Variants

The library's four emphasis levels, narrowed like the `Card`'s — and this is the **first
real use of the theme's `field*` family**, the tokens P0 derived for exactly this component
and nothing else has read since.

| `variant`   | Background        | Border        | Focus border       | Shadow  |
| ----------- | ----------------- | ------------- | ------------------ | ------- |
| `primary`   | `fieldBackground` | `fieldBorder` | `fieldBorderFocus` | `field` |
| `secondary` | `default`         | `fieldBorder` | `fieldBorderFocus` | —       |
| `tertiary`  | transparent       | `fieldBorder` | `fieldBorderFocus` | —       |
| `ghost`     | transparent       | —             | — (no border)      | —       |

The four names split HeroUI's two-name `primary | secondary` by saying what each of their
ends already is:

- **`primary`** is their `primary` — the `fieldBackground` fill — plus the theme's `field`
  shadow, the elevation their flat token only implies.
- **`secondary`** is their `secondary`, the neutral `default` fill, and **the default
  here**: on a plain background a white field is its border and nothing else, while on a
  card the `fieldBackground` token _is_ the card's own colour.
- **`tertiary`** is the border alone, the same drop the `Button`'s `tertiary` makes.
- **`ghost`** is neither, and it has no border to move — its focus shows in the caret
  alone. Reach for `tertiary` when a focus ring matters.

The first three name the `fieldBorder` edge and `ghost` gives it up. Its **width** is the
theme's `borderWidth.field` — the same knob HeroUI exposes as `--field-border-width`, and
the one shipped default where the two libraries differ: **they ship `0`**, so their input is
a fill with no visible edge, and we ship `1`. `createTheme({ borderWidth: { field: 0 } })`
reproduces theirs exactly.

A field **reports nothing** — an error is `isInvalid`, which is a state and not a variant —
so `success`, `warning` and `danger` are absent here exactly as they are on the `Card`.

### Label placement

```tsx
<Input labelPlacement="inside">
  <Input.Label>Courriel</Input.Label>
  <Input.Field placeholder="nom@exemple.fr" />
  <Input.Description>On ne le partage jamais.</Input.Description>
</Input>
```

`outside` (the default) leaves the label above the box, in the column's flow. `inside`
lifts it into the box, above the text: the label is taken **out of flow** and placed
against the box's own padding, so **the JSX is identical either way** and nothing is
reparented (R4). The field then pays for the room — `paddingTop` clears the line and the
box grows by the same amount, so the text keeps the height its `size` promised.

Because the inside label positions itself against the top of the root, it assumes the field
is the first thing left in the column's flow. Write `Input.Description` and `Input.Error`
after the field, which is where they belong anyway.

| `size` | Outside min-height | Inside min-height | Inside label |
| ------ | ------------------ | ----------------- | ------------ |
| `xs`   | 32                 | 48                | 12/16        |
| `sm`   | 40                 | 52                | 12/16        |
| `md`   | 48                 | 52                | 12/16        |
| `lg`   | 56                 | 60                | 14/20        |

The inside height is built from the two lines the box now holds rather than added to the
control height — `controlHeights` already pays for centring one line — and floored at the
control height, so a theme that raises `controlHeights` never ends up with an inside field
shorter than the outside one beside it.

### Focus

The border darkens towards the mode's ink — `fieldBorderFocus`, which is `fieldBorder`
mixed 26% towards `fieldForeground`. **No ring and no accent**: a form where every focused
field flashes the brand colour is a form where the accent has stopped meaning "the action".

The focus state lives on the **root**, because the recipe resolves on it (R5), while the
node that hears the event is `Input.Field` — the field composes the caller's `onFocus` and
`onBlur` with the two the context published, so your handlers run and the border still
moves.

### Alignment with `heroui-native`

Measured against their `input.css`, `text-field.css`, `label.css`, `description.css`,
`field-error.css` and `variables.css` rather than eyeballed.

**Identical at `md`:** the 4pt spacing unit, the `12/16 · 14/20 · 16/24 · 18/28` type scale
(Tailwind v4's defaults, which they use), the 48pt minimum, 12pt of horizontal padding, the
6pt column gap, the 6pt inset on the label and the help text, a 16/24 `medium` label in
`foreground`, a 14/20 `muted` description, a 14/20 `danger` error, a `400` field text and
the `field-placeholder` colour. The whole radius scale shares their multipliers
(`0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 3 · 4`) and the field radius is `base × 1.75` in both.

We read `fieldForeground` where they read `foreground`; the two resolve to the same value in
both modes, and the field token is the one that can be themed apart later.

**Two deltas, both deliberate and both in the theme rather than in this component:**

| Token               | HeroUI           | XAUI              | Why                                                                                                                                                                                                                                                 |
| ------------------- | ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderWidth.field` | `0`              | `1`               | Their input is a fill with no visible edge. Ours keeps a hairline, because `tertiary` — the border alone — has nothing left to be without it. Same knob, different shipped default: `createTheme({ borderWidth: { field: 0 } })` reproduces theirs. |
| radius base         | `8` → field `14` | `12` → field `21` | `RADIUS_BASE` is a P0 decision that draws every corner in the library. Changing it for one component would be incoherent; changing it globally is a theme decision, not this one.                                                                   |

**Two things we add that they do not have:** a focus state — their CSS has none, and the
theme derived `fieldBorderFocus` for it — and the `field` shadow on `primary`, which is what
makes it read as raised rather than as a second flat fill.

### Colour

```tsx
<Input variant="tertiary" color="#7c3aed">
  <Input.Field placeholder="la teinte est la bordure, et le focus" />
</Input>
```

A raw tint, never a token (R7). It lands where the variant put its tokens, and because the
focus colour is a role like any other it is also what the field borders on focus.

**On a `primary` or a `secondary` the tint is the fill** — a solid coloured box with
contrasted text, consistent with a tinted `Button` and rarely what a form wants. `tertiary`
and `ghost` are where a tint is useful on a field.

### Style as props

Every node takes its own style keys as props (R14) — full React Native names, full React
Native values, no hidden scale:

```tsx
<Input maxWidth={420}>
  <Input.Label letterSpacing={0.4}>Courriel</Input.Label>
  <Input.Field borderWidth={2} textAlign="center" />
</Input>
```

### Everything else goes through `style`

- **`selectionColor`, `cursorColor`, `placeholderTextColor`** are `TextInput` props — write
  them on `Input.Field`. The placeholder already takes the theme's `fieldPlaceholder`; the
  prop is there to override it.
- **A leading or trailing adornment** — a search glyph, a clear button — is not in the 1.0
  core. Write it beside the field in a row of your own, or use `useInput()` and the
  extension recipe below.

## Props

### `Input`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop             | Type                           | Default       | Notes                                              |
| ---------------- | ------------------------------ | ------------- | -------------------------------------------------- |
| `variant`        | `InputVariant`                 | `'secondary'` | The four levels above                              |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`        | The field's minimum height, padding, gaps, type    |
| `radius`         | `RadiusKey`                    | —             | Overrides the theme's `field` radius               |
| `labelPlacement` | `'outside' \| 'inside'`        | `'outside'`   | `inside` lifts the label into the box, out of flow |
| `color`          | `string`                       | —             | A hex tint, placed by the variant                  |
| `isInvalid`      | `boolean`                      | `false`       | Danger colours, and focus is suppressed            |
| `isDisabled`     | `boolean`                      | `false`       | Dims the column and stops the field                |
| `asChild`        | `boolean`                      | `false`       | Merge into the single child instead of rendering   |

**`TextInputProps` are not here.** They belong to `Input.Field`.

### `Input.Field`

Everything `TextInput` accepts **except `editable`**, plus the `TextStyle` keys as props
(R14) — `value`, `defaultValue`, `onChange`, `onChangeText`, `maxLength`, `multiline`,
`readOnly` and the rest, under React Native's own names.

**There is no `type`.** That is an HTML prop; React Native splits it into `inputMode`,
`keyboardType`, `secureTextEntry` and `autoComplete`, and the field takes all four:

```tsx
<Input.Field inputMode="email" autoComplete="email" autoCapitalize="none" />
<Input.Field secureTextEntry autoComplete="password" />
```

`placeholderTextColor` defaults to the theme's `fieldPlaceholder` and stays
overridable. `onFocus` and `onBlur` are composed, never replaced.

### `Input.Label`, `Input.Description`, `Input.Error`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14). `Label` and
`Description` carry the ids the field points at; passing `nativeID` overrides them.

## Extending it

The context hook is exported, so a third party can write their own slot against the same
resolved values the built-in ones read:

```tsx
import { useInput } from '@xaui/native/input'

function InputCounter({ length, max }) {
  const { descriptionStyle } = useInput()
  return (
    <Text style={descriptionStyle}>
      {length} / {max}
    </Text>
  )
}
```

Used outside an `<Input>` it throws by name, pointing at the misplaced component rather
than failing three frames later on an undefined style.

## Accessibility

- **The wrapper has no role.** The control is the field inside it, and a role on the column
  would give a screen reader a second element to stop on before reaching it.
- `Input.Field` points at the label with `aria-labelledby` and at the description with
  `aria-describedby`, so a screen reader announces "Courriel, champ de saisie" instead of
  falling back to whatever the placeholder happens to say.
- `aria-invalid` follows `isInvalid`, and `accessibilityState.disabled` follows
  `isDisabled`.
- **`Input.Error` sets no live region**, deliberately: an error that changes while you are
  still typing would be re-announced on every keystroke. The field's `aria-invalid` is what
  reports the state.
- **A placeholder is not a label.** A field with only a placeholder loses its name the
  moment a value is typed — write an `Input.Label`, and hide it with
  `<Input.Label height={0} opacity={0}>` only if the design truly cannot show one.

## Migration from `@xaui/native-legacy`

The legacy component is `TextInput`, and its props are the ones this table names.

| Legacy                                                | v1                                                                      |
| ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `label="…"`                                           | `<Input.Label>…</Input.Label>`                                          |
| `description="…"`                                     | `<Input.Description>…</Input.Description>`                              |
| `errorMessage="…"`                                    | `<Input.Error>…</Input.Error>`, mounted by you, plus `isInvalid`        |
| `value` / `defaultValue`                              | the same two props, on `<Input.Field>`                                  |
| `onValueChange`                                       | `onChangeText` on `<Input.Field>` — RN's name. `onChange` works too     |
| `labelPlacement="inside"`                             | `labelPlacement="inside"` — a static label, not a floating one          |
| `variant="colored"`                                   | `variant="primary"`                                                     |
| `variant="light"`                                     | `variant="secondary"`                                                   |
| `variant="bordered"`                                  | `variant="tertiary"`                                                    |
| `variant="underlined"`                                | `variant="ghost"` + `borderBottomWidth` on `<Input.Field>`              |
| `themeColor="primary"`                                | `color={theme.colors.accent}`                                           |
| `size="sm" \| "md" \| "lg"`                           | `size` — now `xs` … `lg`, and the legacy `sm` is the new `xs`           |
| `radius`                                              | `radius` — a `RadiusKey` now, not the legacy `Radius`                   |
| `isSecured`                                           | `secureTextEntry` on `<Input.Field>` — RN's own name                    |
| `isReadOnly`                                          | `readOnly` on `<Input.Field>`                                           |
| `isDisabled` / `isInvalid`                            | unchanged, on the root                                                  |
| `isClearable`                                         | not in the 1.0 core — a clear button beside the field is yours to write |
| `fullWidth`                                           | removed — that is already the default in a column                       |
| `startContent` / `endContent`                         | a node beside the field, in a row of your own                           |
| `customAppearance={{ container }}`                    | `style` on the root                                                     |
| `customAppearance={{ input }}`                        | `style` on `<Input.Field>`                                              |
| `customAppearance={{ label }}`                        | `style` on `<Input.Label>`                                              |
| `customAppearance={{ helperText }}`                   | `style` on `<Input.Description>` / `<Input.Error>`                      |
| `customAppearance={{ inputContainer, inputWrapper }}` | gone with the wrappers they styled                                      |
