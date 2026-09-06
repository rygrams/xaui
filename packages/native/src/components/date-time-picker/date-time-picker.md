# DateTimePicker

A field that opens a month, and then a clock.

## Import

```tsx
import { DateTimePicker } from '@xaui/native/date-time-picker'
```

## Usage

```tsx
<DateTimePicker value={moment} onValueChange={setMoment}>
  <DateTimePicker.Trigger>
    <DateTimePicker.Value placeholder="Choisir un moment" />
    <DateTimePicker.Indicator />
  </DateTimePicker.Trigger>
  <DateTimePicker.Sheet
    stepLabels={{ date: 'Date', time: 'Heure' }}
    previousLabel="Mois précédent"
    nextLabel="Mois suivant"
  />
</DateTimePicker>
```

## It owns nothing at all

| the part      | what it actually is    |
| ------------- | ---------------------- |
| the field     | a `Select`'s trigger   |
| the two steps | a `Tabs`               |
| the month     | a `Calendar`           |
| the dial      | a `TimePicker`         |
| the mark      | `TimePicker.Indicator` |

Four components rendered **as themselves** rather than four tables restated. It has no recipe
of its own — the only style it touches is the field's, and that one belongs to the `Select`.

That is also why `TimePicker.Indicator` reads `IconContext` rather than its own picker's
context: a glyph another field can render is one glyph to keep right, not two.

## Two steps rather than two fields

A moment is one value, so it is one control. A calendar and a clock will not fit on a phone at
the same time, which is why the two take turns.

**Choosing a day moves to the clock** — the `TimePicker`'s hours handing over to its minutes,
one level up — and choosing the minutes closes the sheet. The common path is one gesture.

**The steps are a tab bar and not a stepper**, because either half can be changed at any time:
a reader who set the day, then the time, then wants the day again presses "date" rather than
starting over.

Each tab **reads the half it stands for** once there is one — the date under "date", the time
under "time" — so the sheet says what has been decided without a header of its own.

The sheet reopens on the date, always: one that reopened on the clock would hide the month
from a reader who came to change the day.

## Each half keeps the other

A day chosen after a time keeps the time. A time chosen after a day keeps the day. The value
is **one moment being narrowed**, not two values being collected.

With nothing chosen yet, the first day lands at midnight — which is what the dial shows when
it opens.

## The pieces are composable

`DateTimePicker.Sheet` with no children assembles `Steps`, `Calendar` and `Clock`. Written
out, the whole thing goes on a page with no sheet at all, which is also how the demo screen
makes both steps visible without opening anything:

```tsx
<DateTimePicker
  value={moment}
  onValueChange={setMoment}
  step={step}
  onStepChange={setStep}
>
  <DateTimePicker.Steps labels={labels} />
  {step === 'date' ? <DateTimePicker.Calendar /> : <DateTimePicker.Clock />}
</DateTimePicker>
```

`DateTimePicker.Clock` renders a real `TimePicker` with `closeOnSelect={false}`: the minutes
close the sheet the _trigger_ opened, and that inner picker has no sheet of its own.

## Props

`hourCycle`, `minuteStep`, `minValue`, `maxValue` and `locale` pass straight through to the
two components. `formatOptions` is `Intl.DateTimeFormatOptions` and defaults to
`{ dateStyle: 'medium', timeStyle: 'short' }`.

`step` / `defaultStep` / `onStepChange` drive which half is on screen, controlled or not.

The root **renders no node**: `ref`, `style` and the a11y props live on
`DateTimePicker.Trigger`.

## See also

- **`DateTimeField`** — a moment _typed_ rather than chosen.
- **`DatePicker`** and **`TimePicker`** — either half on its own.
