# NumberStepper

A quantity, and the two presses that move it.

## Import

```tsx
import { NumberStepper } from '@xaui/native/number-stepper'
```

## Usage

```tsx
<NumberStepper min={0} max={99} defaultValue={1} onValueChange={setQuantity}>
  <NumberStepper.Track />
  <NumberStepper.Decrement accessibilityLabel="Un de moins" />
  <NumberStepper.Value />
  <NumberStepper.Increment accessibilityLabel="Un de plus" />
</NumberStepper>
```

## It is not a `NumberField` without its box

A field is typed into and this is not. It has no keyboard, no caret, no parse, no
`isInvalid` and no bounds to apply late — a value that can only be pressed into existence is
inside its range at every moment.

What the two share is the arithmetic, and nothing else. `stepNumber`, `clampNumber` and
their rounding live in `utils/number.ts`, so neither component owns them and both read the
same answers.

| you want                                              | reach for                                        |
| ----------------------------------------------------- | ------------------------------------------------ |
| a small number, and the presses are the point         | `NumberStepper`                                  |
| a number long enough that pressing to it is absurd    | [`NumberField`](../number-field/number-field.md) |
| where it sits in its range, more than its exact value | [`Slider`](../slider/slider.md)                  |

## The track is a slot, and it is written first

It is out of flow and painted behind everything after it, so its place in the JSX is what
puts it under the rest rather than over it. `Slider.Track`'s arrangement, and its reason: a
ground a caller cannot leave out is a ground a caller cannot replace either.

**The inset is the shape.** The buttons are the control's full height and the pill is
shorter, so the two circles stand proud of the ground between them. A pill as tall as its
buttons is a segmented control, which says "pick one" rather than "more of it".

It takes no touches and is hidden from the accessibility tree — a ground is not a control.

## The variant paints the buttons

Because they are what a finger is aimed at. The pill under them is the ground they are
raised off, and it is the same soft grey at every level that has a pill at all.

| `variant`   | the buttons                           | the pill |
| ----------- | ------------------------------------- | -------- |
| `primary`   | the accent, filled                    | yes      |
| `secondary` | raised `surface`, hairline border     | yes      |
| `tertiary`  | the border alone, no fill and no lift | yes      |
| `ghost`     | neither                               | no       |

`secondary` is the default, and it is the one thing here that departs from the vocabulary
table: `default` is the token `secondary` usually names, and a `default` button on a
`defaultSoft` pill is two greys a shade apart, in which the button stops reading as raised
at all.

There are no intents. A stepper **reports nothing** — it is a quantity being set, not a
verdict — so `success`, `warning` and `danger` are absent, exactly as they are on the `Card`
and the `TextField`.

## Each button owns its own press state

Two buttons on one control are two targets: pressing the plus must not light the minus.
That is why the recipe has no `bgPressed` and the press is the shared `PressableFeedback`
treatment instead — the `CloseButton`'s arrangement, for the `CloseButton`'s reason.

**A spent button fades its mark and keeps its fill**, and stops taking presses. The mark
and not the box, because a button dimmed whole goes translucent — and a translucent button
stops hiding the pill it is raised off, so the ground reads straight through the circle. It
is also the wrong thing to say: the affordance is gone, the button is still there.

Which end is spent is asked of the **result** rather than of the bound: a value half a step
short of the ceiling can still reach it, and a button dead at that point strands the reader.

With no children each draws its own mark — one bar, or two a quarter turn apart — so a
stepper works in a project that has installed no icon set.

## A bin at the floor is `children` and a ternary

```tsx
<NumberStepper.Decrement
  accessibilityLabel={quantity === 1 ? 'Retirer du panier' : 'Un de moins'}
  onPress={quantity === 1 ? remove : undefined}
>
  {quantity === 1 ? <Icon as={TrashIcon} color={theme.colors.danger} /> : undefined}
</NumberStepper.Decrement>
```

Not a prop of its own. The condition is the caller's — it is a basket row's rule, not a
stepper's — and both halves of it are already props this slot has.

**A caller's own `onPress` replaces the step** rather than running beside it: removing the
row is not also decrementing it.

## The value

With no children it is the number written through `formatOptions`, and an **em dash** while
there is none — an em dash and not a zero, because a stepper that has never been pressed is
holding nothing rather than holding none.

A function child is given the number itself, for a unit, a plural, or a word in place of a
digit:

```tsx
<NumberStepper.Value>
  {value => `${value ?? 0} ${value === 1 ? 'convive' : 'convives'}`}
</NumberStepper.Value>
```

It keeps the page's own ink whatever the buttons are painted, because it sits on the pill
rather than on a button.

## Width

There is no `fullWidth`. The root hugs its content, and `alignSelf` is a style prop (R14)
like any other:

```tsx
<NumberStepper alignSelf="stretch">
  <NumberStepper.Track />
  <NumberStepper.Decrement accessibilityLabel="Un de moins" />
  <NumberStepper.Value flex={1} />
  <NumberStepper.Increment accessibilityLabel="Un de plus" />
</NumberStepper>
```
