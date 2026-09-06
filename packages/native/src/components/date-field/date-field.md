# DateField

A date, typed.

## Import

```tsx
import { DateField } from '@xaui/native/date-field'
```

## Usage

```tsx
<DateField
  locale="fr-FR"
  segmentLabels={{ day: 'JJ', month: 'MM', year: 'AAAA' }}
  onValueChange={setBirthday}
>
  <DateField.Label>Date de naissance</DateField.Label>
  <DateField.Field />
  <DateField.Description>Jour, mois, année.</DateField.Description>
</DateField>
```

## It is a `TextField`

The root is the `TextField`'s root, unchanged: the same recipe, the same four variants, the
same `size`, `radius`, `color`, `labelPlacement`, `isInvalid` and `isDisabled`.

`DateField.Label`, `DateField.Description` and `DateField.Error` **are** the `TextField`'s
slots — the same components, not wrappers around them. Only `DateField.Field` differs, by
masking what is typed into it. That is the `TextArea`'s arrangement, for the `TextArea`'s
reason: a component of its own is what a caller looks for, and sharing every line of it is
what keeps the two from drifting.

## A mask, not a set of segments

There is **one representation** — the digits, in order — and `maskDate` is the only thing
that turns them into text. The separator is put back on every keystroke rather than kept.

That is what makes the field survive the four things a three-input segmented field needs a
rule for each of:

- a paste, in any shape (`04-07-1995` into a `/` field lands as `04/07/1995`),
- a keyboard that offers its own punctuation,
- a backspace over a separator,
- a caret dropped into the middle of the text.

## The order and the separator come from the locale

Read out of `Intl` rather than off a table of countries: the platform already ships the
answer for every locale it supports, and a table here would be a second one, shorter and out
of date.

| locale  | shape        |
| ------- | ------------ |
| `fr-FR` | `JJ/MM/AAAA` |
| `en-US` | `MM/DD/YYYY` |
| `de-DE` | `TT.MM.JJJJ` |
| `ja-JP` | `YYYY/MM/DD` |

Give `order` when it is a decision rather than a locale — an ISO field is `YMD` wherever it
is read:

```tsx
<DateField order="YMD" separator="-">
```

### The placeholder letters are yours

`segmentLabels` defaults to `{ day: 'DD', month: 'MM', year: 'YYYY' }` — the letters code is
written in. A language's own are the caller's to give, because picking one on their behalf
is the kind of default that is wrong in every app that is not English. A `placeholder` on
`DateField.Field` wins over it entirely.

## What the mask does while you type

**Each part is clamped as it completes, and only then.** A month is capped at 12 once its
second digit lands, so `9` on its way to `09` is left alone while `95` becomes `12`.

**A part is never raised.** `00` stays `00` rather than becoming `01` — a reader halfway
through `01` has typed a zero, and moving it under them loses the keystroke.

**A day is capped by its month when the month is already known.** In `MDY` the month comes
first, so `02` then `31` gives `02/29` immediately. In `DMY` the day comes first and nothing
is known yet, so `31` stands and 31 is the ceiling.

### And what it deliberately does not do

It does not go back and rewrite a part the reader has moved past. `02/29/1995` can therefore
be typed in `MDY`: the 29 was legal when the month was February and the year unknown, and
1995 arriving afterwards does not reach back for it.

That date reads as **`null`**, which is the answer that matters — a caller acting on
`onValueChange` sees no date, and `isInvalid` with a `DateField.Error` is how the reader is
told. The alternative, rolling `31/02` forward into the 3rd of March, is what `new Date`
does and what nobody typing it meant.

## The value

```tsx
onValueChange?: (value: Date | null) => void
```

`null` covers both "not finished" and "not a real day", and deliberately so: a caller holding
a `Date | null` needs no third state, and the two produce the same empty value on the way out.

It fires on every edit **that moves the date** — a reader typing the year of an already
complete date does not get four `null`s on the way through.

A year is taken as written. `0023` is the year 23, not 2023: guessing a century is the kind
of help that is wrong once and then silently wrong forever.

### Controlled

`value` does not replace the text, it **overrides** it — and only when the two disagree about
which day it is.

Without that test a controlled field would erase the reader's own keystrokes on every render.
With it, `value` still wins whenever a caller sets the date from outside, and a half-typed
date is left alone because there is no day for it to disagree with.

```tsx
const [date, setDate] = useState<Date | null>(null)

<DateField value={date} onValueChange={setDate}>
```

`undefined` says the caller is not controlling this at all; `null` is an empty field.

## The calendar is optional, and composed

```tsx
<DateField locale="fr-FR" onValueChange={setDate}>
  <DateField.Label>Date de l’événement</DateField.Label>
  <FieldGroup>
    <DateField.Field />
    <DateField.Trigger accessibilityLabel="Ouvrir le calendrier" />
  </FieldGroup>
  <DateField.Sheet previousLabel="Mois précédent" nextLabel="Mois suivant" />
</DateField>
```

**A `FieldGroup`, because that is the thing that lays a decorator over a field and measures
it.** `DateField.Trigger` is a `FieldGroup.Suffix` with a press and a glyph in it, and
`DateField.Field` reads the same measurement to leave it room — so the text stops before the
mark instead of running under it. Writing the group out is what keeps the calendar optional:
a date that is only ever typed has neither line.

**A sheet rather than a popover**, and that is the whole difference from the `DatePicker`: a
month is three hundred points wide, which on a phone is the screen — so it comes up from the
bottom, where the thumb is, instead of hanging off a field near the top of a form.

Choosing a day fills the box and **closes the sheet**. A calendar that stays open after the
choice leaves the reader looking for the way out of a decision they have already made.

The sheet is mounted only while it is open, so the calendar costs nothing on a form nobody
opens. `isOpen`, `defaultOpen` and `onOpenChange` on the root are how it is driven from
outside.

### The glyph

With no children `DateField.Trigger` draws a calendar from four views — the `CloseButton`'s
cross settles what to do about an icon set the library does not ship: a component whose whole
affordance _is_ a glyph draws its own. Every measurement is a fraction of the size the field
chose, so it scales with the type rather than sitting at a hard-coded 16 beside it.

An `Icon` as children replaces it and takes the field's own size and colour, like every other
glyph in a field.

It needs an `accessibilityLabel`, and warns without one: a calendar mark is not text, and the
label above the field names the date rather than the action.

### Composing the sheet

Children replace the whole default arrangement. `DateField.SheetCalendar` is the binding on
its own, so a title above the month or a button under it costs no wiring:

```tsx
<DateField.Sheet>
  <BottomSheet.Handle />
  <BottomSheet.Title>Quand ?</BottomSheet.Title>
  <DateField.SheetCalendar previousLabel="…" nextLabel="…" minValue={today} />
</DateField.Sheet>
```

## What the field takes over

`DateField.Field` is `TextField.Field` with four props removed from its type: `value` and
`onChangeText` are the mask's, `keyboardType` is a number pad, and `maxLength` is the shape's
own length. Everything else a `TextInput` accepts is still yours.

## See also

- **`DatePicker`** — a date _chosen_ rather than typed.
- **`Calendar`** — the month a picker opens.
