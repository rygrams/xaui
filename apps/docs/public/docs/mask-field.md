# MaskField

A value typed into a shape — a date, a time, a card number, or a pattern of your own.

## Import

```tsx
import { MaskField, parseMaskedDate } from '@xaui/native/mask-field'
```

## Usage

```tsx
<MaskField mask="credit-card" onValueChange={setCard}>
  <MaskField.Label>Card number</MaskField.Label>
  <MaskField.Field />
</MaskField>

<MaskField
  mask="date"
  locale="fr-FR"
  convert={text => parseMaskedDate(text, 'fr-FR')}
  onValueChange={(text, value) => setBirthday(value as Date | null)}
>
  <MaskField.Label>Date de naissance</MaskField.Label>
  <MaskField.Field />
  <MaskField.Description>Jour, mois, année.</MaskField.Description>
</MaskField>
```

## It is a `TextField`

The root below is the `TextField`'s root, unchanged: the same recipe, the same four
variants, the same `size`, `radius`, `color`, `labelPlacement`, `isInvalid` and
`isDisabled`. `MaskField.Label`, `.Description` and `.Error` **are** the `TextField`'s slots
— the same components, re-exported rather than wrapped — and only `MaskField.Field` differs,
by masking what is typed into it. The `TextArea`'s arrangement exactly, and `TextField` is
not touched.

## It is a mask, not a set of segments

There is one representation — the accepted characters, in order — and `maskInput` is the
only thing that turns them into text. Everything else is dropped, including the literals,
which are **put back** rather than kept.

That is what makes the field survive a paste, a keyboard that offers its own punctuation,
and a backspace over a separator, none of which a segmented field survives without a rule
each.

## `mask` is a preset or a pattern

| preset          | shape                 | rules                                                              |
| --------------- | --------------------- | ------------------------------------------------------------------ |
| `'date'`        | `DD/MM/YYYY`          | order and separator from `locale`; each part clamped, never raised |
| `'time'`        | `HH:MM`               | 24-hour; hour ≤ 23, minute ≤ 59                                    |
| `'datetime'`    | `DD/MM/YYYY HH:MM`    | the two above, joined by a space                                   |
| `'credit-card'` | `#### #### #### ####` | shape only                                                         |

`MASK_FIELD_MASKS` is the list of them.

Anything else is a **pattern string**:

| token   | accepts                                  |
| ------- | ---------------------------------------- |
| `#`     | a digit                                  |
| `A`     | a letter                                 |
| `*`     | either                                   |
| _other_ | a literal, put back in as the parts fill |

```tsx
<MaskField mask="+33 # ## ## ## ##" />
<MaskField mask="AA## ####" />
```

A pattern is a shape, not a range — it does not clamp. If a custom mask needs clamping, that
is a follow-up, an object form `{ pattern, clamp }`.

### The date parts come from the locale

Read out of `Intl` rather than off a table of countries. `order` overrides it when the
order is a decision rather than a locale — an ISO field is `YMD` wherever it is read.
`separator` and `segmentLabels` (`{ day, month, year }`) override the rest.

A date that cannot exist — the 31st of February — is capped by the mask the moment the
month is known, and `parseMaskedDate` returns `null` for one typed before it, rather than
rolling forward into March the way `new Date` would.

## The value is the masked string

`value` / `defaultValue` / `onValueChange` operate on the masked text, controlled or not, as
everywhere in the library. A raw string handed to `value` is masked on the way in.

`convert` is the one plug that turns the text into a value of your own:

```tsx
<MaskField mask="time" convert={parseMaskedTime} onValueChange={(text, time) => …} />
```

`parseMaskedDate(text, locale?, order?)` → `Date | null` and `parseMaskedTime(text)` →
`{ hours, minutes } | null` are exported for the `date` and `time` shapes, with
`formatMaskedDate` / `formatMaskedTime` as their inverses. Without `convert`,
`onValueChange`'s second argument is the masked text itself.

## Slots

| slot                    | node        | what it is                    |
| ----------------------- | ----------- | ----------------------------- |
| `MaskField`             | `TextField` | the field                     |
| `MaskField.Label`       | `Text`      | the `TextField`'s label       |
| `MaskField.Field`       | `TextInput` | the box, masked               |
| `MaskField.Description` | `Text`      | the `TextField`'s description |
| `MaskField.Error`       | `Text`      | the `TextField`'s error       |

`MaskField.Field` takes the number pad for a digit shape and the default keyboard for one
with letters, and caps the caret at the shape's own rendered length. Inside a `FieldGroup`
it leaves the decorators their room, exactly as `FieldGroup.Field` does — so a `$` prefix or
a clear button sits beside it without the text running under.

## For a date chosen rather than typed

That is `DatePicker` — a trigger, an overlay and a `Calendar` in it. `MaskField` is the box
alone; it has no picker.

## Props

Every node takes R14's style props for its own style type and forwards `ref`, `testID` and
the a11y props. `useMaskField()` is exported — it returns the masked text, the keystroke
handler and the shape, so a field of your own is written the same way the shipped one is.
