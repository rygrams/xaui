# CloseButton

The way out, on its own.

## Import

```tsx
import { CloseButton } from '@xaui/native/close-button'
```

## Anatomy

```tsx
<CloseButton onPress={dismiss} accessibilityLabel="Fermer le panneau" />
```

No slots. There is one node and one mark in it, and a component with a single child has
nothing to publish a context for.

**It is the affordance `Chip`, `Alert`, `Dialog`, `Popover` and `BottomSheet` already have,
given a recipe of its own.** Those five keep theirs: a close _inside_ a component takes that
component's colours and that component's scale, resolved once at its root (R5), and
`Chip.Close` is five lines over the shared base for exactly that reason. What was missing is
this one — a dismiss on something the library does not own: a card header, a banner, a sheet
of your own.

## The base, and the component

Two things share the name, and the split is the point:

|                   | Where                       | What it is                                                                                                                                    |
| ----------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `CloseButtonBase` | `@xaui/native/system`       | The behaviour: its own press state, the grown target, the missing-label warning, the built-in cross. Takes the styles a host recipe resolved. |
| `CloseButton`     | `@xaui/native/close-button` | The component: the base plus a recipe — a box that follows `size`, a disc that follows `variant`, and a `color` that tints it.                |

Writing a dismissible component of your own means reaching for the base and publishing
`close` / `closeGlyph` from your recipe, exactly as `Chip` does. Dropping a dismiss into a
layout means reaching for the component.

## Usage

### The disc, and the bare cross

```tsx
<CloseButton onPress={dismiss} accessibilityLabel="Fermer" />
<CloseButton variant="ghost" onPress={dismiss} accessibilityLabel="Fermer" />
```

`secondary` — the neutral disc — is the default, for the reason the `Dialog` gives at its
own close: a cross floating on a panel with nothing under it reads as decoration, and the
disc is what makes it a target. `ghost` is the bare cross, for a component that is already
providing the target around it.

### A mark of your own

```tsx
<CloseButton accessibilityLabel="Fermer">
  <Icon as={XIcon} size={16} color={theme.colors.foreground} />
</CloseButton>
```

Children replace the built-in cross. Unset, the button draws its own from two bars a quarter
turn apart, so this works in a project that has installed no icon set — the same bargain the
`Checkbox`'s tick and the `Radio`'s dot take.

### As another element

```tsx
<CloseButton asChild onPress={dismiss}>
  <Link href="/">…</Link>
</CloseButton>
```

R12, through the base. The missing-label warning does not fire under `asChild`: the caller's
element carries its own label or its own text.

## Sizes

| `size` | Box | Bar | Cross |
| ------ | --- | --- | ----- |
| `xs`   | 24  | 12  | ~8    |
| `sm`   | 28  | 14  | ~10   |
| `md`   | 32  | 16  | ~11   |
| `lg`   | 40  | 20  | ~14   |

`md` is HeroUI's close button measured — a 32-point square — and it is the `Dialog`'s.

The **bar** is twice as long as the cross looks: a bar rotated a quarter turn spans
`length / √2` on each axis. It is kept as a ratio of the box rather than tabulated, so it is
one cross at four sizes instead of four drawings of one — the `Radio`'s dot, again.

The **stroke does not scale**. It is the shared thickness the `Chip`, the `Alert` and the
`Dialog` all draw their cross at; a family of crosses that thicken with their container
reads as four different marks rather than one at four sizes.

The box is small at `xs`, and it is still pressable: the target grows outwards through
`hitSlop`, which costs nothing in layout, rather than the glyph growing.

`radius` is the circle `size` sets — half the box — and overridable, like everywhere else.

## Variants and colour

| `variant`   | Disc      | Border   | Cross               |
| ----------- | --------- | -------- | ------------------- |
| `primary`   | `accent`  | —        | `accentForeground`  |
| `secondary` | `default` | —        | `defaultForeground` |
| `tertiary`  | —         | `border` | `foreground`        |
| `ghost`     | —         | —        | `foreground`        |

Four emphasis levels and **no intent**: dismissing is neither a success nor a danger. The
close that carries an intent is the one inside a component that has one — `Alert.Close` in a
danger alert — and it is the alert's recipe that says so, not a variant here.

`secondary` is the neutral grey, the `Checkbox`'s and the `Radio`'s reading of the word
rather than the `Button`'s accent-soft: a close button is grey before it is anything else,
and it sits beside those two more often than beside a `Button`.

`color` is a raw value (R7), and it lands where the variant puts it: the disc on `primary`
and `secondary`, the cross on `tertiary` and `ghost`.

**There is no pressed colour.** The press is the shared `PressableFeedback` treatment,
because the base owns the press state — a cross has to be a different target from the panel
around it — and a root that does not know it is pressed cannot resolve a colour for it.
Every other close button in the library reads the same way.

## Alignment with `heroui-native`

**Identical:** the 32-point box at the default size, the circle, the filled default rather
than a bare glyph, the grown touch target, and children replacing the mark.

**Three deltas:**

| Theirs                                                             | Ours                                | Why                                                                                                                     |
| ------------------------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| A `Button` preset — `tertiary`, `sm`, `isIconOnly`, `hitSlop={12}` | Its own recipe over the shared base | A preset inherits a label slot, a spinner and a `fullWidth`-shaped API for a control that has one mark and no text.     |
| `iconProps={{ size, color }}`                                      | `children`, or `color` and `size`   | R1 — a prop that styles the inside of another component is the thing the v1 API exists to remove. The glyph is a child. |
| The cross is an imported icon                                      | Two bars, a quarter turn apart      | A dismissible screen has to work in a project that has installed no icon set. Children still replace it.                |

## Props

Everything `PressableFeedback` accepts, every `ViewStyle` key it does not already claim
(R14), plus:

| Prop         | Type                           | Default       | Notes                                     |
| ------------ | ------------------------------ | ------------- | ----------------------------------------- |
| `variant`    | `CloseButtonVariant`           | `'secondary'` | Four emphasis levels, no intent           |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`        | The box, and the cross in it              |
| `radius`     | `RadiusKey`                    | half the box  | A circle, unless you say otherwise        |
| `color`      | `string`                       | —             | A hex tint — the disc, or the cross       |
| `isDisabled` | `boolean`                      | `false`       | Dims it and stops the press               |
| `children`   | `ReactNode`                    | —             | Replaces the built-in cross               |
| `hitSlop`    | `Insets \| number`             | `8`           | From the base — the target, not the glyph |
| `asChild`    | `boolean`                      | `false`       | Merge into the single child               |

## Accessibility

- `accessibilityRole="button"`, overridable.
- **An `accessibilityLabel` is required**, and its absence warns in development: a cross
  says "close" to someone who can see it and nothing at all to someone who cannot. Unlike an
  icon-only `Button`, the text beside it names the thing being dismissed rather than the
  action, so there is nothing to fall back on.
- The warning does not fire under `asChild`, where the caller's element carries its own
  label.
- The touch target is 8 points larger than the box on every side.
