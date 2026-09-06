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

**Sixty marks and twelve labels on the minutes.** A number on every minute is a smudge; a
mark on every minute is what makes a reader believe they can pick 07 as well as 05.
`minuteStep` coarsens both, for a picker that only wants quarters.

**Tap the mark, not the face.** A drag round the dial needs a gesture recogniser and a hit
test against a moving angle; a press on a number needs neither, and is what a reader does
anyway. The hand still travels to the choice, so the gesture reads as one motion.

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
