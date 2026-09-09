# ToggleButton

## Overview

A button that keeps whether it is active. It is for independent choices such as Like,
Favourite, Pin or Mute — one press turns the choice on, the next turns it off.

```tsx
import { ToggleButton } from '@xaui/native/toggle-button'
;<ToggleButton defaultSelected>Like</ToggleButton>
```

It follows the `Button` scale and composition model, but selection is part of its value,
not a momentary pressed visual.

## Anatomy

```tsx
<ToggleButton>
  <ToggleButton.Icon />
  <ToggleButton.Label />
</ToggleButton>
```

- **`ToggleButton`** — the pressable root. It owns or receives selection, resolves the
  recipe once and publishes the selected styles and values.
- **`ToggleButton.Icon`** — an icon that inherits the root's size and current colour.
- **`ToggleButton.Label`** — single-line text that inherits the current colour and type.

The view depth is one: `PressableFeedback > (Icon | Text)`. JSX order is screen order, and
neither slot carries a margin.

## Usage

### Uncontrolled

`defaultSelected` supplies the initial value; the root owns it afterwards.

```tsx
<ToggleButton defaultSelected onSelectedChange={saveFavourite}>
  Favourite
</ToggleButton>
```

### Controlled

```tsx
const [liked, setLiked] = useState(false)

<ToggleButton isSelected={liked} onSelectedChange={setLiked}>
  Like
</ToggleButton>
```

`onSelectedChange` fires with the proposed next value in both modes. A controlled root
does not store that value; the caller decides whether it moves.

### Changing the mark

A render child receives the current state. This is how the reference's outline heart turns
into a filled heart without a prop configuring the inside of the component.

```tsx
<ToggleButton>
  {({ isSelected }) => (
    <>
      <ToggleButton.Icon as={isSelected ? HeartFilled : HeartOutline} />
      <ToggleButton.Label>Like</ToggleButton.Label>
    </>
  )}
</ToggleButton>
```

### Text shorthand

Stringifiable children are wrapped in `ToggleButton.Label` automatically.

```tsx
<ToggleButton>Pin</ToggleButton>
```

### Exclusive group

`ToggleButton.Group` gives a set one selected value. A member joins by naming `value`; it
can still be nested in a layout, because the group communicates through context instead of
walking its children.

```tsx
<ToggleButton.Group value={alignment} onValueChange={setAlignment}>
  <ToggleButton value="start">Start</ToggleButton>
  <ToggleButton value="center">Center</ToggleButton>
  <ToggleButton value="end">End</ToggleButton>
</ToggleButton.Group>
```

The group is horizontal and wrapping by default. `orientation="vertical"` makes a column.
Its `variant`, `size`, `radius`, `color` and `isDisabled` are member defaults; a member can
still name its own appearance, while a disabled group always disables every member.

### Icon only

```tsx
<ToggleButton isIconOnly accessibilityLabel="Ajouter aux favoris">
  {({ isSelected }) => (
    <ToggleButton.Icon as={isSelected ? HeartFilled : HeartOutline} />
  )}
</ToggleButton>
```

`isIconOnly` removes the horizontal padding and squares the root on its fixed height. An
accessible label is required in practice; its absence warns in development.

### Style props

Every node accepts its React Native style keys directly, after the recipe and before
`style`:

```tsx
<ToggleButton width="100%" paddingHorizontal={24}>Pin</ToggleButton>

<ToggleButton>
  <ToggleButton.Label letterSpacing={1}>Pin</ToggleButton.Label>
</ToggleButton>
```

They are raw React Native values, not hidden token steps. `style` remains the last word.

## Props

`ToggleButton` accepts `PressableFeedback` props and `ViewStyle` props, plus:

| Prop               | Type                                           | Default     | Notes                                   |
| ------------------ | ---------------------------------------------- | ----------- | --------------------------------------- |
| `variant`          | `'default' \| 'ghost'`                         | `'default'` | Resting surface                         |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg'`                 | `'md'`      | Height, padding, gap, radius and type   |
| `radius`           | `RadiusKey`                                    | by size     | Overrides the shape the size chose      |
| `color`            | `string`                                       | —           | Raw tint; selection uses its soft slice |
| `value`            | `string`                                       | —           | Joins a `ToggleButton.Group`            |
| `isSelected`       | `boolean`                                      | —           | Controlled value                        |
| `defaultSelected`  | `boolean`                                      | `false`     | Initial uncontrolled value              |
| `onSelectedChange` | `(isSelected: boolean) => void`                | —           | Receives the proposed next value        |
| `isDisabled`       | `boolean`                                      | `false`     | Dims the root and stops interaction     |
| `isIconOnly`       | `boolean`                                      | `false`     | Square root with no horizontal padding  |
| `asChild`          | `boolean`                                      | `false`     | Merges the root into one child          |
| `children`         | `ReactNode \| (state => ReactNode)`            | —           | Text, composed slots or a render child  |
| `style`            | `StyleProp<ViewStyle> \| (state => StyleProp)` | —           | Last style layer                        |

## Slots

### `ToggleButton.Label`

Accepts `Text` props and `TextStyle` props. `numberOfLines` defaults to `1` so a long label
truncates instead of deforming the fixed-height control.

### `ToggleButton.Icon`

Accepts `Icon`'s three forms: `as`, an SVG child, or `source`. `size` and `color` inherit
from the root; an explicit value wins.

`useToggleButton()` is exported for custom slots. It returns the resolved label and icon
values with `isSelected`, `isPressed` and `isDisabled`, and throws by name outside a root.

## Variants

| `variant` | Resting background | Resting content     | Selected background | Selected content       |
| --------- | ------------------ | ------------------- | ------------------- | ---------------------- |
| `default` | `default`          | `defaultForeground` | `accentSoft`        | `accentSoftForeground` |
| `ghost`   | transparent        | `foreground`        | `accentSoft`        | `accentSoftForeground` |

The variant describes the resting surface. Selection is the same semantic value in both
variants, so it keeps one accent treatment. `color` replaces that family through the tint
pass rather than entering the style cache.

## Accessibility

- The root has `accessibilityRole="button"` by default and remains overridable.
- `accessibilityState.selected` always reflects the current value and is merged with state
  supplied by the caller.
- `aria-pressed` mirrors the same value for React Native Web.
- In a group, members use the `radio` role and `aria-checked`; the group is announced as a
  `radiogroup`.
- `accessibilityState.disabled` follows `isDisabled`.
- An icon-only root warns without `accessibilityLabel` or `aria-label`.
- Press handlers are composed: the toggle, `onPress` and the internal pressed state all
  survive together.

## Migration from legacy

There is no legacy `ToggleButton`; this is a net-new v1 component. A legacy `Button` that
manually switched its appearance can move its boolean directly:

| Before                                      | After                                                           |
| ------------------------------------------- | --------------------------------------------------------------- |
| `<Button onPress={() => setLiked(!liked)}>` | `<ToggleButton isSelected={liked} onSelectedChange={setLiked}>` |
| conditional `customAppearance`              | selected styling from the recipe                                |
| conditional `startContent`                  | render child + `ToggleButton.Icon`                              |
