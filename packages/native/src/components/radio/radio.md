# Radio

One option out of a set, and the label that says which.

## Import

```tsx
import { Radio } from '@xaui/native/radio'
```

## Anatomy

```tsx
<Radio>
  <Radio.Indicator />
  <Radio.Label />
</Radio>
```

- **`Radio`** — the root, and it is the **row, not the circle**. It is the pressable: it
  owns the selected state, resolves the recipe once (R5) and publishes it to its slots.
- **`Radio.Indicator`** — the circle, and the dot inside it. With no children it draws its
  own dot.
- **`Radio.Label`** — what choosing this option means.

**It is the [`Checkbox`](../checkbox/checkbox.md) in a circle, with one rule changed: a
press selects, it never clears.** A set of options has no "none of these" unless one of
them says so, and a radio you could tap back to empty would be a checkbox that happens to
be round. `onSelectedChange` therefore only ever fires with `true`, and pressing the chosen
option fires nothing at all.

Everything else is the checkbox's, deliberately: the root is the row so the label chooses
the option, R3 wraps a text child into the label _and_ supplies the circle, the three
variants and the four sizes are the same tokens, and no slot carries a margin (R4).

## There is no group

The set lives where its state does:

```tsx
const [plan, setPlan] = useState('monthly')

<View accessibilityRole="radiogroup" style={{ gap: 12 }}>
  {PLANS.map(value => (
    <Radio
      key={value}
      isSelected={plan === value}
      onSelectedChange={() => setPlan(value)}
    >
      {LABELS[value]}
    </Radio>
  ))}
</View>
```

`RadioGroup` is a **P5 component with a context of its own** — one of the ten the plan
names as "a layer of slots over an existing group context" — not a prop this component is
missing. Until it lands, the wrapper carries `accessibilityRole="radiogroup"` and each
option compares the value it stands for. That is three lines, and they are the three lines
the group component will replace rather than the ones it would have to undo.

## Usage

### Controlled, or not

```tsx
<Radio isSelected={plan === 'yearly'} onSelectedChange={() => setPlan('yearly')}>
  Tous les ans — deux mois offerts
</Radio>

<Radio defaultSelected>Choisie au départ</Radio>
```

`isSelected` present means the caller owns the value, which is what a set needs;
`defaultSelected` is for the standalone case. `onPress` still fires, composed with the
selection — it is what a wrapper listens to when it wants the press rather than the change.

### Invalid

```tsx
<Radio isInvalid>Aucune option choisie</Radio>
```

The border, the fill and the label turn `danger`, and the resting fill is dropped: an
option that is wrong reads as an outline. On a set, put `isInvalid` on every row — the
error belongs to the question, not to one of its answers.

### Disabled

```tsx
<Radio isDisabled defaultSelected>
  Indisponible
</Radio>
```

On the row, not the circle: what is disabled is the control, and the label is part of it.

### A mark of your own

```tsx
<Radio.Indicator>
  <Icon as={CheckIcon} size={12} color={theme.colors.accentForeground} />
</Radio.Indicator>
```

Children replace the built-in dot and ride the same fade.

### As another element

```tsx
<Radio asChild isSelected={isChosen} onSelectedChange={choose}>
  <Animated.View layout={LinearTransition}>…</Animated.View>
</Radio>
```

R12 — the caller's element **is** the row, so it takes the children it was written with and
the auto-wrap does not apply.

## Sizes

| `size` | Circle | Dot | Gap | Label |
| ------ | ------ | --- | --- | ----- |
| `xs`   | 16     | 7   | 8   | 14/20 |
| `sm`   | 20     | 8   | 8   | 14/20 |
| `md`   | 24     | 10  | 8   | 16/24 |
| `lg`   | 28     | 12  | 10  | 18/28 |

The same four boxes as the `Checkbox`, so a radio and a checkbox in one form line up. The
dot keeps HeroUI's ratio — 10 in 24 — rather than being tabulated, so it is one dot at four
sizes instead of four drawings of one.

`radius` is `full` and overridable: a squared-off option in a segmented row is a real
design, and every control in this library takes the same prop.

## Variants and colour

The `Checkbox`'s three levels, on the same `field*` tokens:

| `variant`   | Circle at rest    | Border        | Shadow  |
| ----------- | ----------------- | ------------- | ------- |
| `primary`   | `fieldBackground` | `fieldBorder` | `field` |
| `secondary` | `default`         | `fieldBorder` | —       |
| `tertiary`  | transparent       | `fieldBorder` | —       |

A variant describes the circle **at rest**. Chosen, all three are the accent — or `color`,
which lands on the fill through the `bgSelected` role, with the dot on `fgSelected`. The
tint is ignored while `isInvalid`, as on the `Checkbox`.

Why a role and not an axis is written up once, in
[`checkbox.md`](../checkbox/checkbox.md#colour), and it holds here unchanged.

## Alignment with `heroui-native`

Measured against their `radio.tsx` and `radio.css`.

**Identical:** the 24pt circle, the field border and its width, the `field` fill plus shadow
on `primary` and the neutral `default` on `secondary`, the accent fill with an
`accentForeground` dot at 10/24 of the circle, the danger treatment including the dropped
resting fill, and a built-in dot so no icon set is required.

**Four deltas:**

| Theirs                                               | Ours                                     | Why                                                                                                                     |
| ---------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| The root is the circle; a label needs `ControlField` | The root is the row, `Label` is a slot   | The plan's slots are Indicator · Label, and a label that does not choose the option is a bug waiting to be filed.       |
| `Radio.IndicatorThumb` is a part                     | The dot is the indicator's default child | Two nodes to write for one dot. Children replace it, which is the same escape hatch with one component fewer.           |
| The thumb scales 1.5 → 1 on its own                  | The fill and the dot arrive together     | One `SelectionFill`, shared with the `Checkbox`: what differs between the two controls is the mark, not how it arrives. |
| `Radio.IndicatorBackground` (a glass layer)          | —                                        | A theme-registered blur layer belongs to their Uniwind theming, which is the premise XAUI does not share.               |

Their `RadioGroup` is a component of its own and so is ours, in P5.

## Props

### `Radio`

Everything `PressableFeedback` accepts, every `ViewStyle` key it does not already claim
(R14), plus:

| Prop               | Type                            | Default       | Notes                                   |
| ------------------ | ------------------------------- | ------------- | --------------------------------------- |
| `variant`          | `RadioVariant`                  | `'secondary'` | The circle at rest                      |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg'`  | `'md'`        | Circle, dot, gap, label type            |
| `radius`           | `RadiusKey`                     | `'full'`      | A circle, unless you say otherwise      |
| `color`            | `string`                        | —             | A hex tint — the colour once chosen     |
| `isSelected`       | `boolean`                       | —             | Controlled                              |
| `defaultSelected`  | `boolean`                       | `false`       | Uncontrolled starting value             |
| `onSelectedChange` | `(isSelected: boolean) => void` | —             | Fires with `true` only                  |
| `isInvalid`        | `boolean`                       | `false`       | Danger colours, and the tint is ignored |
| `isDisabled`       | `boolean`                       | `false`       | Dims the row and stops the press        |
| `animation`        | `AnimationProp`                 | —             | The press treatment, as everywhere else |
| `asChild`          | `boolean`                       | `false`       | Merge into the single child             |

### `Radio.Indicator`

Everything `View` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop        | Type        | Default | Notes                                           |
| ----------- | ----------- | ------- | ----------------------------------------------- |
| `children`  | `ReactNode` | —       | Replaces the built-in dot, inside the fill      |
| `animation` | `boolean`   | `true`  | `false` shows the dot with no fade and no scale |

### `Radio.Label`

Everything `Text` accepts, plus the `TextStyle` keys as props (R14).

## Extending it

`useRadio()` is exported (R10) and carries the resolved styles plus `isSelected`,
`isDisabled` and `isInvalid` — enough to write a description under the label or a price
beside it. Outside a `<Radio>` it throws by name.

## Accessibility

- `accessibilityRole="radio"` on the root, overridable, with `accessibilityState.checked`
  following the value and `.disabled` following `isDisabled`. A caller's own
  `accessibilityState` is **merged**, not spread over.
- `aria-invalid` follows `isInvalid`.
- **Wrap the set** in a `View` with `accessibilityRole="radiogroup"` so a screen reader
  announces "2 sur 3" rather than three unrelated controls.
- The whole row is the touch target, which is what makes a 24pt circle reachable.

## Migration from `@xaui/native-legacy`

| Legacy                         | v1                                                                    |
| ------------------------------ | --------------------------------------------------------------------- |
| `label="…"`                    | `<Radio>…</Radio>` — the text child _is_ the label                    |
| `labelAlignment="left"`        | write `<Radio.Label>` before `<Radio.Indicator>`                      |
| `labelAlignment="justify-*"`   | `justifyContent="space-between"` plus a width, in style props         |
| `isChecked` / `defaultChecked` | `isSelected` / `defaultSelected`                                      |
| `onValueChange`                | `onSelectedChange` — and it fires with `true` only                    |
| `themeColor="primary"`         | `color={theme.colors.accent}` — a raw value (R7)                      |
| `variant="filled"`             | `variant="tertiary"` — a border at rest, the accent once chosen       |
| `variant="light"`              | gone: a dot with no circle. `<Radio.Indicator>` with your own mark    |
| `size="sm" \| "md" \| "lg"`    | `size` — now `xs` … `lg`                                              |
| `radius`                       | `radius` — a `RadiusKey` now, and still `full` by default             |
| `fullWidth`                    | `width="100%"` in style props (R14)                                   |
| `isDisabled`                   | unchanged, on the root                                                |
| `labelStyle`                   | `style` on `<Radio.Label>`                                            |
| `style`                        | `style` on the root                                                   |
| **`<RadioGroup>` and `value`** | **not yet** — the twelve lines above, or wait for the P5 `RadioGroup` |

The last row is the one to plan around: the legacy `RadioGroup` carried `value`,
`defaultValue`, `onValueChange`, `orientation` and the shared `variant` / `size` / `radius`
/ `themeColor` / `labelAlignment` / `fullWidth` for its options. Until the v1 group lands,
a set is the `useState` and the `map` shown at the top of this page, and the shared props
are written on each row — or spread from one object.
