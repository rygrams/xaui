# Checkbox

A box that is either ticked or not, with the label that says what it means.

## Import

```tsx
import { Checkbox } from '@xaui/native/checkbox'
```

## Anatomy

```tsx
<Checkbox>
  <Checkbox.Indicator />
  <Checkbox.Label />
</Checkbox>
```

- **`Checkbox`** — the root, and it is the **row, not the box**. It is the pressable: it
  owns the selected state, resolves the recipe once (R5) and publishes it to its slots.
- **`Checkbox.Indicator`** — the box, and the mark inside it. With no children it draws its
  own check.
- **`Checkbox.Label`** — what ticking the box means.

**The root is the row** so that tapping the label toggles the checkbox. That is the whole
reason the label is a slot here rather than a `Text` you put beside the component and wire
up yourself — and it is why `PressableProps` are on the root.

**R3 — and the box comes with the auto-wrap.** A stringifiable tree becomes the label _and_
the root supplies the indicator, because a checkbox without one is not a checkbox:

```tsx
<Checkbox>J'accepte</Checkbox>
// is exactly
<Checkbox>
  <Checkbox.Indicator />
  <Checkbox.Label>J'accepte</Checkbox.Label>
</Checkbox>
```

Written with no children at all, it is the box alone — the form you want inside a table
row, where the label is a cell of its own. Anything else and the arrangement is yours.

**No slot carries a margin** (R4). What separates the box from its label is the root's
`gap`, so JSX order is screen order — a label before the box is a matter of where you
wrote it.

## Usage

### Controlled, or not

```tsx
<Checkbox isSelected={accepted} onSelectedChange={setAccepted}>
  J'accepte les conditions
</Checkbox>

<Checkbox defaultSelected onSelectedChange={save}>
  Recevoir la lettre d'information
</Checkbox>
```

`isSelected` present means the caller owns the value; `defaultSelected` means the checkbox
keeps it. `onSelectedChange` fires either way, and so does `onPress` — the tick and your
handler both happen, in that order.

### Invalid

```tsx
<Checkbox isInvalid={!accepted} isSelected={accepted} onSelectedChange={setAccepted}>
  Il faut accepter pour continuer
</Checkbox>
```

The border, the mark's fill and the label turn `danger`, and the **resting fill is
dropped**: a box that is wrong reads as an outline rather than as a filled control that
happens to be red at the edge. HeroUI reaches the same shape with a compound.

It does not mount a message. Put one under the row yourself — a slot that silently renders
nothing is a slot you cannot debug, which is the `TextField.Error` bargain again.

### Indeterminate

```tsx
<Checkbox isIndeterminate={some && !all} isSelected={all} onSelectedChange={setAll}>
  Tout sélectionner
</Checkbox>
```

Neither ticked nor empty — the state a "select all" sits in while some of its rows are.
The box fills as if selected and the mark is a dash, a screen reader hears `mixed`, and a
press resolves it to **selected** rather than toggling into it: "some of these" is a state
a control reports, never one a person picks.

It is a display state and does not touch `isSelected` — the caller decides when the
tri-state collapses, because only the caller knows what the rows say.

### Disabled

```tsx
<Checkbox isDisabled defaultSelected>
  Verrouillé
</Checkbox>
```

On the row, not the box: what is disabled is the control, and the label is part of it. R8
keeps `disabled` off the public surface.

### A label that wraps

```tsx
<Checkbox alignItems="flex-start" maxWidth={320}>
  <Checkbox.Indicator />
  <Checkbox.Label>J'accepte que ces informations soient conservées…</Checkbox.Label>
</Checkbox>
```

The box centres on the row, which is right for one line and wrong for a paragraph. A style
prop moves it (R14) — no second API for it.

### A mark of your own

```tsx
<Checkbox.Indicator>
  <Icon as={CheckIcon} size={14} color={theme.colors.accentForeground} />
</Checkbox.Indicator>
```

Children replace the built-in check and ride the same fade. The built-in one exists so a
checkbox works in a project that has installed no icon set — `@xaui/icons` was deleted in
P0 — not to stop you having your own.

### As another element

```tsx
<Checkbox asChild isSelected={on} onSelectedChange={setOn}>
  <Animated.View layout={LinearTransition}>…</Animated.View>
</Checkbox>
```

R12 — the caller's element **is** the row, so it takes the children it was written with and
the auto-wrap does not apply.

## Sizes

| `size` | Box | Corner   | Check        | Gap | Label |
| ------ | --- | -------- | ------------ | --- | ----- |
| `sm`   | 20  | `sm` (6) | 10 × 5 · 2   | 8   | 14/20 |
| `md`   | 24  | `md` (9) | 12 × 6 · 2   | 8   | 16/24 |
| `lg`   | 28  | `md` (9) | 14 × 7 · 2.5 | 10  | 18/28 |

`size` drives the box, the glyph, the gap and the label's type — **never width**. A
checkbox hugs its label; a row that has to fill its parent is a style prop away.

The check is **derived from the box** — half its width, a quarter its height — rather than
tabulated, so it is one glyph at four sizes instead of four drawings of one.

`md` is HeroUI's checkbox measured: a 24pt box with the field's 1pt border. The corner is
`md` (9) where theirs is `lg` (8) — the same key is 12 on our radius base, and 12 on a 24pt
box is a circle, which is the `Radio`.

## Variants

Three of the `TextField`'s four levels, meaning here what they mean there — this is the
`field*` family again, on a box 24pt wide instead of a field 48pt tall.

| `variant`   | Box at rest       | Border        | Shadow  |
| ----------- | ----------------- | ------------- | ------- |
| `primary`   | `fieldBackground` | `fieldBorder` | `field` |
| `secondary` | `default`         | `fieldBorder` | —       |
| `tertiary`  | transparent       | `fieldBorder` | —       |

**`ghost` is absent**, where the `TextField` has it: a field with no border is still a line of
text you can see; a checkbox with no border and no fill is nothing at all.

**A variant describes the box at rest.** Ticked, all three are the accent — or `color`.

## Colour

```tsx
<Checkbox color="#7c3aed" defaultSelected>
  Teinté
</Checkbox>
```

A raw tint, never a token (R7), and on this component it is **the colour the box checks
in**, with a mark derived to read against it.

That works because the selected fill is a **role** — `bgSelected`, with `fgSelected` for
the mark — rather than a token named in an `isSelected` axis. The tint pass re-runs `paint`
and the states, never the axes, so a fill written as an axis would have been the accent
again the moment the box was ticked. `Radio` and `Switch` need the same pair, which is why
it is in the engine rather than here.

**The tint is ignored while `isInvalid`.** An error outranks a brand colour, the same way it
outranks focus on the `TextField` — and unlike the `TextField`, where a tint and an error currently
fight over the border, this one is decided in the root and not left to resolution order.

## Selection is not a style axis

`isSelected` never reaches the recipe. The fill and the mark are two slots the indicator
**mounts only while it is ticked**, painted unconditionally from the roles above.

That buys two things at once: the style cache keeps one entry per token combination instead
of two, and `color` reaches the selected fill — which an axis would have skipped.

## Animation

The fill fades and grows in over 120ms, and the mark rides with it: a check arriving before
its background reads as a glitch rather than as an animation. `<Checkbox.Indicator
animation={false} />` turns it off, and then the Reanimated hooks are never reached at all —
two components rather than a branch inside one.

The press treatment is `PressableFeedback`'s, so `animation` on the root is the library's
usual knob: `false`, `'disabled'`, `'disable-all'`, or the object.

## Alignment with `heroui-native`

Measured against their `checkbox.tsx` and `checkbox.css` rather than eyeballed.

**Identical:** the 24pt box, the field border and its width, the `field` fill plus shadow on
`primary` and the neutral `default` on `secondary`, the accent fill with an
`accentForeground` mark, the danger treatment including the dropped resting fill, the fade
and scale on the mark, and a built-in check so no icon set is required.

**Four deltas:**

| Theirs                                            | Ours                                   | Why                                                                                                                               |
| ------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| The root is the box; a label needs `ControlField` | The root is the row, `Label` is a slot | The plan's slots for this component are Indicator · Label, and a label that does not toggle the box is a bug waiting to be filed. |
| `variant` auto-switches on a surface              | `secondary` by default                 | We have no surface detection, and the `TextField` already answers this the same way.                                              |
| One size                                          | Four                                   | Every control in this library has the same ladder.                                                                                |
| `Checkbox.Background` (a glass layer)             | —                                      | A theme-registered blur layer belongs to their Uniwind theming, which is the premise XAUI does not share.                         |

**We have `isIndeterminate` and they do not.** The legacy `@xaui/native-legacy` checkbox
had it, a "select all" is the reason it exists, and `accessibilityState.checked: 'mixed'` is
a thing only the component can say.

## Props

### `Checkbox`

Everything `PressableFeedback` accepts, every `ViewStyle` key it does not already claim
(R14), plus:

| Prop               | Type                            | Default       | Notes                                         |
| ------------------ | ------------------------------- | ------------- | --------------------------------------------- |
| `variant`          | `CheckboxVariant`               | `'secondary'` | The box at rest                               |
| `size`             | `'sm' \| 'md' \| 'lg'`          | `'md'`        | Box, glyph, gap, label type                   |
| `radius`           | `RadiusKey`                     | —             | Overrides the corner the size chose           |
| `color`            | `string`                        | —             | A hex tint — the colour it checks in          |
| `isSelected`       | `boolean`                       | —             | Controlled                                    |
| `defaultSelected`  | `boolean`                       | `false`       | Uncontrolled starting value                   |
| `onSelectedChange` | `(isSelected: boolean) => void` | —             | Fires on every tick, either mode              |
| `isIndeterminate`  | `boolean`                       | `false`       | The third state — a dash, and `mixed` in a11y |
| `isInvalid`        | `boolean`                       | `false`       | Danger colours, and the tint is ignored       |
| `isDisabled`       | `boolean`                       | `false`       | Dims the row and stops the press              |
| `animation`        | `AnimationProp`                 | —             | The press treatment, as everywhere else       |
| `asChild`          | `boolean`                       | `false`       | Merge into the single child                   |

### `Checkbox.Indicator`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop        | Type        | Default | Notes                                            |
| ----------- | ----------- | ------- | ------------------------------------------------ |
| `children`  | `ReactNode` | —       | Replaces the built-in check, inside the fill     |
| `animation` | `boolean`   | `true`  | `false` shows the mark with no fade and no scale |

### `Checkbox.Label`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14).

## Extending it

The context hook is exported, so a third party can write its own slot against the same
resolved values the built-in ones read:

```tsx
import { useCheckbox } from '@xaui/native/checkbox'

function CheckboxDescription({ children }) {
  const { isInvalid } = useCheckbox()
  return <Text style={{ opacity: isInvalid ? 1 : 0.7 }}>{children}</Text>
}
```

Used outside a `<Checkbox>` it throws by name, pointing at the misplaced component rather
than failing three frames later on an undefined style.

## Accessibility

- `accessibilityRole="checkbox"` on the root, overridable, with
  `accessibilityState.checked` following the value and `.disabled` following `isDisabled`.
  A caller's own `accessibilityState` is **merged**, not spread over: naming one key must
  not silently drop the two a screen reader reads this control by.
- `aria-invalid` follows `isInvalid`.
- **The label is inside the control**, so the checkbox announces itself with its text
  instead of as an unnamed box. A checkbox with no label needs an `accessibilityLabel`.
- The whole row is the touch target, which is what makes a 24pt box reachable; `hitSlop` is
  `Pressable`'s and still available for the case where it is not.
- **The built-in check mirrors under RTL**, because `borderStartWidth` is a logical edge and
  R13 leaves no other kind. A check reads as a check either way.

## Migration from `@xaui/native-legacy`

| Legacy                        | v1                                                                   |
| ----------------------------- | -------------------------------------------------------------------- |
| `label="…"`                   | `<Checkbox>…</Checkbox>` — the text child _is_ the label             |
| `labelAlignment="left"`       | write `<Checkbox.Label>` before `<Checkbox.Indicator>`               |
| `labelAlignment="justify-*"`  | `justifyContent="space-between"` plus a width, in style props        |
| `isChecked` / `onValueChange` | `isSelected` / `onSelectedChange`, plus `defaultSelected`            |
| `isIndeterminate`             | `isIndeterminate` — unchanged, and now `mixed` in a11y too           |
| `isDisabled`                  | unchanged, on the root                                               |
| `themeColor="primary"`        | `color={theme.colors.accent}` — a raw value (R7)                     |
| `variant="filled"`            | `variant="tertiary"` — a border at rest, the accent once ticked      |
| `variant="light"`             | gone: a mark with no box. `<Checkbox.Indicator>` with your own glyph |
| `size="sm" \| "md" \| "lg"`   | `size` — the same three                                              |
| `radius`                      | `radius` — a `RadiusKey` now, not the legacy `Radius`                |
| `fullWidth`                   | `width="100%"` in style props (R14)                                  |
| `labelStyle`                  | `style` on `<Checkbox.Label>`                                        |
| `style`                       | `style` on the root                                                  |
