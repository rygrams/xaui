# Stepper

Where you are in a sequence of steps.

## Import

```tsx
import { Stepper } from '@xaui/native/stepper'
```

## Usage

```tsx
<Stepper value={2}>
  <Stepper.Item>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title>Compte</Stepper.Title>
      <Stepper.Description>Créez votre compte</Stepper.Description>
    </Stepper.Content>
  </Stepper.Item>
  <Stepper.Item>
    <Stepper.Indicator />
    <Stepper.Content>
      <Stepper.Title>Profil</Stepper.Title>
    </Stepper.Content>
  </Stepper.Item>
</Stepper>
```

## Anatomy

| slot                  | what it is                                             |
| --------------------- | ------------------------------------------------------ |
| `Stepper`             | The container, and the thing that numbers its children |
| `Stepper.Item`        | One step                                               |
| `Stepper.Indicator`   | Its circle, and the rail the circle sits on            |
| `Stepper.Content`     | What the step is about                                 |
| `Stepper.Title`       | The step's name                                        |
| `Stepper.Description` | The line under it — vertical steppers only             |

## The value is the caller's, always

There is **no `defaultValue` and no `onValueChange`**. Nothing inside a stepper can move the
value: a step is not a control, it is a report. The number comes from the form, the wizard
or the route that actually knows which step it is on, and an uncontrolled stepper would be a
piece of state that could never change.

`value` counts from **one**, so `value={2}` is "step 2 of 4" — the number you would say out
loud, not an array index.

Out of range is not an error. `value={0}` leaves every step upcoming, which is the honest
reading of a flow that has not started, and a value past the last step completes them all,
which is what a finished one looks like.

## The root numbers its children

An item declares no index and no key of its own. JSX order is step order (R4), so inserting
a step in the middle renumbers the rest by being there:

```tsx
<Stepper value={3}>
  <Stepper.Item>…</Stepper.Item> {/* completed */}
  <Stepper.Item>…</Stepper.Item> {/* completed */}
  <Stepper.Item>…</Stepper.Item> {/* current   */}
</Stepper>
```

It is the reasoning that puts the `Accordion`'s separators on its root: what an item cannot
know about its neighbours belongs to the thing that has them all. A step reads its own
standing through `useStep`, or through a function child:

```tsx
<Stepper.Item>
  {({ status }) => (status === 'current' ? <Now /> : <Later />)}
</Stepper.Item>
```

## Three statuses, and they are an order

| status      | indicator          | title      | line leaving it |
| ----------- | ------------------ | ---------- | --------------- |
| `completed` | accent disc, check | foreground | travelled       |
| `current`   | accent ring        | foreground | track           |
| `upcoming`  | neutral ring       | muted      | track           |

Every step before the current one is `completed` and every step after it is `upcoming` — a
stepper with two current steps is not a stepper.

A **completed step keeps its full contrast**: it is a thing you did, not a thing greyed out.
What recedes is the road ahead, so the eye finds where it is rather than counting from the
top.

The line under the current step is still track, not progress: the stepper has not left that
step yet.

## Two orientations, and they differ by more than the axis

`vertical` puts the indicator beside the text and aligned to the **top** of it, with the
line running down through whatever height that text takes. It is the layout that can carry
a description at all.

`horizontal` centres each indicator over a label and gives every step the same width, so the
circles land at even intervals whatever the labels say. There is no room under a label for a
second line, which is why `Stepper.Description` is a vertical affair.

### Why the connectors belong to the indicator

A vertical line has to run from under one circle to the next **through the text beside it**,
and only something inside that row can measure that height. That is the opposite of the
`Accordion`, whose separator spans the full width and can only be drawn by the root.

A horizontal step carries **two** halves, one on each side of its circle, so the circle stays
centred over its label whatever the neighbours do — two halves meeting at the item boundary
draw one continuous rail. The two ends of that rail are drawn transparent rather than
dropped: removing them would slide the first and last circles off their labels.

`hasConnector={false}` leaves the circles on their own.

## A step is not pressable

There is no `onPress` and no `isLocked`. A stepper where a completed step takes you back is
one composition away:

```tsx
<Stepper.Item asChild>
  <Pressable onPress={() => setStep(1)}>…</Pressable>
</Stepper.Item>
```

and one where tapping ahead skips a form's validation is not something this component should
make easy.

## The indicator draws its own mark

With no children it shows its number, and a check once the step is behind you — drawn out of
two borders (`utils/check-glyph`, the same tick the `Checkbox` uses) so a stepper works in a
project that has installed no icon set. Children replace both:

```tsx
<Stepper.Indicator>
  <Icon as={LockIcon} size={14} />
</Stepper.Indicator>
```

## Props

| prop           | type                           | default    | description                  |
| -------------- | ------------------------------ | ---------- | ---------------------------- |
| `value`        | `number`                       | `1`        | Which step, counted from one |
| `orientation`  | `'vertical' \| 'horizontal'`   | `vertical` | Which way the steps run      |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md`       | Indicator and type           |
| `color`        | `string`                       | —          | The tint (R7) — a raw value  |
| `hasConnector` | `boolean`                      | `true`     | Whether the rail is drawn    |
| `asChild`      | `boolean`                      | `false`    | Renders the caller's element |

`size` moves the indicator and the type — **never a width**. A vertical stepper is as wide as
its parent lets it be and a horizontal one splits that width evenly, which is RN's own
behaviour and the reason there is no `fullWidth` prop here either.

## A tint paints the progress, not the track

`color` moves the travelled line, the ring around the step you are on and the disc behind the
ones you are past. The road ahead stays grey — the untravelled track is written from the theme
rather than named as a role, which is what makes that guaranteed rather than incidental. A
stepper whose whole rail took the tint would have stopped showing progress.

## Accessibility

The **root** announces the progress — `accessibilityRole="progressbar"` with an
`accessibilityValue` of `{ min: 1, max: <count>, now: value }`, so a screen reader says "step
2 of 4" once rather than a status on each of the four. Both stay overridable (R9).

The titles and descriptions are read as the text they are. An indicator's number is
decoration on top of that announcement — give it an `accessibilityLabel` if you replace it
with something that carries meaning of its own.

## Everything else is a style prop

`padding`, `gap`, `backgroundColor` — full RN names, full RN values (R14), on the root and on
every slot. There is nothing here a prop had to be invented for.
