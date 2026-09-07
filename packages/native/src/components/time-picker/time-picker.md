# TimePicker

A field that opens a clock.

## Import

```tsx
import { TimePicker } from '@xaui/native/time-picker'
```

## Usage

```tsx
<TimePicker value={time} onValueChange={setTime}>
  <TimePicker.Trigger>
    <TimePicker.Value placeholder="Choisir une heure" />
    <TimePicker.Indicator />
  </TimePicker.Trigger>
  <TimePicker.Sheet />
</TimePicker>
```

## It owns almost nothing

The trigger **is** a `Select`'s trigger — the same resolved styles, the same four field
levels, the same focus and invalid treatment — by construction rather than by resemblance, so
a select and a time field in one form cannot drift apart. The panel is a `BottomSheet`.

What it adds is the dial and the wiring.

**`variant` dresses the field and never reaches the dial**, which is not a field: it has one
appearance and takes it from the theme. `color` is the exception — a raw tint (R7) lands on
the chosen mark, the hand and the hub.

## A sheet, not an anchored panel

A clock face is close to three hundred points square, which beside a field on a phone is the
screen. It comes up from the bottom, where the thumb is — the `DateField.Sheet` argument, and
where the legacy put it too.

## The dial

**Two rings on a twenty-four hour face.** 1–12 outside and 13–00 inside, which is the only
way twenty-four numbers fit on a circle without the labels touching. `00` rather than `24`:
midnight is the start of a day, not its end, and the hour reported is 0.

**Twelve labels on the minutes, and no marks between them.** A number on every minute is a
smudge and a dot on every minute is clutter; the unlabelled minutes are still targets, they
are just not drawn. `minuteStep` coarsens them, for a picker that only wants quarters.

**The whole face is the control.** A touch anywhere on it moves the hand to the value under
the finger; keep the finger down and the hand follows it, live, so an unlabelled `07` is
reached by turning the hand onto it. One gesture, whether the reader aims at a number or
turns the hand round to it.

**The choice settles on release.** Choosing an hour hands the dial on to the minutes and
choosing a minute closes the sheet — do either on touch-down and the ring flips under the
finger with nothing left to turn. So the frames of a drag only write the value, and the
release picks it. A tap is that pair with nothing in between.

The pan claims the touch **on contact** rather than after a hold. A hold let the sheet win —
`BottomSheet.Content` wraps its children in a pan of its own with no threshold, so a finger's
jitter slid the sheet down before the dial's hold had elapsed. The marks keep their button
role for a screen reader, which activates them directly and never reaches the pan.

**Choosing an hour goes straight to the minutes**, which is the one thing that makes a
two-ring dial feel like one gesture rather than two. Choosing a minute closes the sheet,
because at that point the time is complete — `closeOnSelect={false}` keeps it open.

The geometry is `utils/clock.ts` and it is tested: the quarter turn that puts twelve at the
top, the sign that keeps it _above_ the centre in a coordinate system that grows downwards,
and the conversion from `atan2`'s own convention.

## The pieces are composable

`TimePicker.Sheet` with no children assembles `TimePicker.Display` and `TimePicker.Clock`.
Writing them yourself is how a title goes above the dial or a confirm row below it — and how
the dial goes on a page with no sheet at all:

```tsx
<TimePicker value={time} onValueChange={setTime} closeOnSelect={false}>
  <TimePicker.Display />
  <TimePicker.Clock />
</TimePicker>
```

### The display

The two big numbers, and pressing one switches the ring. Which of the two is lit says which
ring is on screen — without it a reader who reopened the sheet on the minutes would think the
hours had been forgotten.

The period is **two halves of one control** rather than a toggle, unlike `TimeField.Period`:
there is room here, and a reader choosing a time from nothing should see both options rather
than press one to find the other.

`AM` and `PM` sit **side by side** in a small pill, well below the dial's numbers in size —
they caption the time rather than being part of it. The display is **as wide as the face
beneath it** and the pill is out of flow, pinned to its trailing edge: the two numbers keep
the middle of that box, so the time reads dead centre over the dial whether the reader is on
a twelve- or a twenty-four hour clock.

### The indicator

With no `as` and no children it draws a clock from three views — a ring and two hands, at ten
past ten, where a clock is always drawn. The `CloseButton`'s cross settles what to do about an
icon set the library does not ship. An `Icon` passed instead takes the field's size and colour
through `IconContext` without being told either.

## Props

`hourCycle` comes from `locale` through `Intl` when it is not given. `formatOptions` is
`Intl.DateTimeFormatOptions`, so the field reads the locale's own punctuation and period
marker rather than a template written here.

The root **renders no node**: `ref`, `style` and the a11y props live on `TimePicker.Trigger`.

## See also

- **`TimeField`** — a time _typed_ rather than chosen.
- **`DatePicker`** — the same arrangement for a date.
