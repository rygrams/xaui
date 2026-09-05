# Icon

An icon is a third-party component, so a slot context does not reach it and every call site
ends up computing the colour by hand. `Icon` closes that gap: it reads what the surrounding
slot published and hands it to whatever renders the glyph.

## Import

```tsx
import { Icon } from '@xaui/native/system'
```

Most of the time you do not import it at all — a component that accepts an icon publishes
its own slot: `Button.Icon`, `Chip.Icon`, `Alert.Icon`. Those are this component with the
context already wired.

## Anatomy

Three forms, and the type says which one you are in. They are mutually exclusive.

```tsx
<Icon as={Trash2} />                          // an icon component
<Icon><Svg>…</Svg></Icon>                     // a raw react-native-svg element
<Icon source={require('./glyph.png')} />      // an image
```

## Usage

### Inside a slot — nothing to pass

```tsx
<Button variant="danger">
  <Button.Icon as={Trash2} />
  <Button.Label>Supprimer</Button.Label>
</Button>
```

The button's root resolves size and colour once and publishes them. Change the variant and
the glyph follows the label; change `size` and it follows the scale. This is the case the
component exists for.

### A raw SVG, its baked-in size overridden

```tsx
<Button.Icon>
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path d="…" stroke="currentColor" />
  </Svg>
</Button.Icon>
```

An SVG pasted from a design tool carries its own `width`, `height` and `color`. Inside an
`Icon` they are **replaced** by the resolved ones — that is the entire point of wrapping it.

### An image

```tsx
<Icon source={require('./assets/glyph.png')} size={24} />
```

Tinted through `tintColor`, so a monochrome asset follows the theme like the other two forms.

### Outside any slot

```tsx
<Icon as={Trash2} />                            // fontSizes.md, the mode's foreground
<Icon as={Trash2} size={32} color="#7c3aed" />  // explicit, wins over everything
```

### The cascade

The same for all three forms, in this order:

1. an explicit `size` / `color` prop
2. what the surrounding slot published
3. the theme — `fontSizes.md` and `colors.foreground`

## Props

| Prop       | Type                               | Form              | Notes                                                         |
| ---------- | ---------------------------------- | ----------------- | ------------------------------------------------------------- |
| `as`       | `ComponentType<{ size?, color? }>` | `as`              | The props Lucide, Ionicons and vector-icons all accept        |
| `children` | `ReactNode`                        | children          | A `react-native-svg` element, cloned with the resolved values |
| `source`   | `ImageSourcePropType`              | `source`          | An image, tinted with the resolved colour                     |
| `size`     | `number`                           | all               | Overrides what the slot asked for                             |
| `color`    | `string`                           | all               | A raw value (R7), never a token                               |
| `style`    | `StyleProp<ImageStyle>`            | **`source` only** | See below                                                     |

Plus every `ImageStyle` key as a prop (R14) — **on the `source` form only**.

## Why R14 stops at one form

`Icon` renders the node in exactly one of its three forms. On `as` the third party renders
it, and no published interface says it would accept a style; on the children form the node
is the caller's own element, which they can style where they wrote it. Wrapping either in a
view to make style props work would add a level of depth to every icon in the library.

That boundary used to live in a comment while the type offered the props to all three
forms, so this compiled and silently did nothing:

```tsx
<Icon as={Trash2} marginEnd={8} /> // ← now a compile error
```

The props are a union now, so the type refuses it and points at `size` and `color`, which
are the levers those two forms actually have. For spacing around an icon inside a slot,
the gap belongs to the root (R4) — `Button` already sets it.

## Failure

`Icon` with none of the three throws by name rather than rendering nothing:

```
XAUI: Icon needs one of `as` (an icon component), a raw SVG element as its child,
or `source` (an image). It renders nothing on its own.
```
