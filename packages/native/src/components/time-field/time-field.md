# TimeField

A time, typed.

## Import

```tsx
import { TimeField } from '@xaui/native/time-field'
```

## Usage

```tsx
<TimeField locale="fr-FR" onValueChange={setStart}>
  <TimeField.Label>Heure de début</TimeField.Label>
  <TimeField.Field />
</TimeField>
```

## It is a `TextField`, and the `DateField`'s sibling

The root is the `TextField`'s root, unchanged. `TimeField.Label`, `.Description` and `.Error`
**are** the `TextField`'s slots — the same components, not wrappers. Only the field differs,
by masking what is typed into it.

Everything the [`DateField`](../date-field/date-field.md) says about the mask holds here: one
representation — the digits, in order — with the colons put back rather than kept, each part
clamped as it completes and never raised, and `null` for anything that is not a time yet.

| part    | ceiling   |
| ------- | --------- |
| hours   | 23, or 12 |
| minutes | 59        |
| seconds | 59        |

## The period is not typed

On a twelve-hour clock the hours cap at 12 and AM or PM comes from `TimeField.Period`:

```tsx
<TimeField locale="en-US">
  <TimeField.Label>Starts at</TimeField.Label>
  <FieldGroup>
    <TimeField.Field />
    <TimeField.Period accessibilityLabel="Morning or afternoon" />
  </FieldGroup>
</TimeField>
```

**Because the keyboard cannot produce it.** A time field opens a number pad, which has no
letters on it — the legacy field asked for "AM" to be typed into one and the letters never
arrived. Two halves of a day is also a choice between two things, which is a control rather
than a value.

**It renders nothing on a twenty-four-hour field**, so the same JSX serves both and a locale
that switches cycle needs no branch at the call site.

It goes in a `FieldGroup`, like `DateField.Trigger`: that is the thing that lays a decorator
over a field and measures it, and the field reads the same measurement to leave it room.

### Midnight and noon

`12 AM` is midnight and `12 PM` is noon. The naive `hours + 12` gets exactly those two wrong
— it makes them 24 and 12 — so the arithmetic is a remainder instead, and there is a test
that says so.

## The hour cycle comes from the locale

Out of `Intl`, for the reason the date's order does. `en-US` is twelve hours, `fr-FR` and
`de-DE` are twenty-four. Give `hourCycle` when it is a decision rather than a locale.

## Granularity

`granularity` is `'minute'` or `'second'`, and it moves the shape, the mask's width and the
field's `maxLength` together — so the caret stops at the end of a finished time either way.

## The value is a `Date`

A time on its own still lands on a day, and keeping the type is what lets a `DateField`'s
value pass straight through rather than being a second shape to merge by hand.

**The day is the one already held**, not today's: a field given `4 July 1995, 14:30` and
edited to `15:00` reports the 4th of July at three, not this afternoon. With no value yet, it
is today's.

```tsx
onValueChange?: (value: Date | null) => void
```

Controlled the same way the `DateField` is: `value` overrides the text only when the two
disagree about which moment they name, so a reader's keystrokes survive a re-render.

## See also

- **`DateField`** — the same mask, for a date, with a calendar beside it.
- **`TimePicker`** — a time _chosen_ rather than typed.
