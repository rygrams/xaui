# DatePicker

A field that opens a month.

## Import

```tsx
import { DatePicker } from '@xaui/native/date-picker'
```

## Usage

```tsx
<DatePicker value={date} onValueChange={setDate} isInvalid={Boolean(error)}>
  <DatePicker.Label>Date de naissance</DatePicker.Label>
  <DatePicker.Field placeholder="Choisir une date" />
  {error ? (
    <DatePicker.Error>{error}</DatePicker.Error>
  ) : (
    <DatePicker.Description>jj/mm/aaaa</DatePicker.Description>
  )}
  <DatePicker.Overlay />
  <DatePicker.Content>
    <DatePicker.Calendar />
  </DatePicker.Content>
</DatePicker>
```

`DatePicker.Field` is the trigger in one tag — `DatePicker.Trigger` around
`DatePicker.Value` and `DatePicker.Indicator`. Open it up for finer control:

```tsx
<DatePicker.Trigger>
  <DatePicker.Value placeholder="Choisir une date" />
  <DatePicker.Indicator />
</DatePicker.Trigger>
```

## Anatomy

| slot                     | what it is                                         |
| ------------------------ | -------------------------------------------------- |
| `DatePicker`             | The **column** — state, resolved style, one `gap`  |
| `DatePicker.Label`       | What the field is for. `danger` on `isInvalid`     |
| `DatePicker.Field`       | The trigger in one tag — value and glyph inside it |
| `DatePicker.Trigger`     | The control — the field the user sees              |
| `DatePicker.Value`       | The chosen day, or the placeholder                 |
| `DatePicker.Indicator`   | The calendar glyph on the field                    |
| `DatePicker.Description` | The hint under the field                           |
| `DatePicker.Error`       | What is wrong, in `danger`                         |
| `DatePicker.Overlay`     | The backdrop. Optional                             |
| `DatePicker.Content`     | The panel                                          |
| `DatePicker.Calendar`    | The month, bound to the picker                     |

**The root is the `TextField`'s column**, token for token: the same `root` gap, the same
label and help styles, resolved through `textFieldRecipe`. A date field and a text field
stacked in one form line up and read as one control — the same reason the trigger is a
`Select`'s and the grid is a `Calendar`.

**`isInvalid` paints the colours; the caller mounts the message.** It turns the border, the
label and the description `danger` — it does not add or remove `DatePicker.Error`, because a
slot that silently renders nothing is one you cannot debug. You write the condition and see
it, exactly as on a `TextField`. No auto-wrap either (R3): a string child of the root is not
a label or a hint in any way the component could guess.

## It owns almost nothing

The trigger **is** a `Select`'s trigger, the panel **is** a `Select`'s panel, and the grid
**is** a [`Calendar`](../calendar/calendar.md) — all three by construction rather than by
resemblance. A select and a date field in one form cannot drift apart, and a calendar in a
picker cannot differ from one on a page.

What this component adds is the wiring, and it is worth naming because each piece is a place
two things could otherwise disagree:

- the chosen day read into the field through `Intl`,
- a panel that closes when a day is pressed,
- **one** set of bounds, which the field, the grid and the chevrons all read.

`DatePicker.Calendar` takes the `Calendar`'s props _minus_ the ones the picker already owns —
value, bounds, locale, first day, variant, disabled — because two sources for one of them
would be two answers to one question.

## The panel matches the field, with the grid as its floor

`width` defaults to **`trigger`** with a `minWidth` of **seven cells** — the `Calendar`'s
own `7 × cell` at the picker's `size`.

So a narrow field opens a panel exactly seven cells wide, and a wide field opens one as wide
as itself: the panel belongs to the field, and a month grid squeezed under a narrow one
would crush its columns or clip a week. `DatePicker.Calendar` fills the panel (`width: 100%`)
so a wide one spreads its cells rather than leaving a gap beside them.

Override it like any anchored surface: `width="content-fit"` for the compact seven-cell
panel whatever the field, `width={320}` for a fixed one, or your own `minWidth`.

`minWidth` is `maxWidth`'s mirror — a floor under the resolved width, on `DatePicker.Content`
and `Select.Content`, and the screen edge still overrides it.

## The field's level is not the calendar's

```tsx
<DatePicker variant="ghost" calendarVariant="primary" />
```

A quiet trigger over an emphatic chosen day is the ordinary case, so `variant` dresses the
field and `calendarVariant` dresses the grid. `color` reaches both — the field's fill and the
chosen day's disc are the same brand.

## The month on screen is not bound

The picker owns the **value**; the calendar owns the **month it is showing**. Opening the
panel a second time after paging leaves you where you were, and choosing a day in another
month still works — paging is not choosing, which `calendar.md` argues at length.

## A year and a month, from the panel

`DatePicker.Calendar` is a `Calendar`, so its year → month → day walk composes here exactly
as it does on a page: pass the children, hold `view`, and mount `Calendar.YearPicker` /
`Calendar.MonthPicker` in the grid's place.

```tsx
const [view, setView] = useState<CalendarView>('grid')

<DatePicker onOpenChange={open => { if (!open) setView('grid') }}>
  {/* trigger, overlay … */}
  <DatePicker.Content>
    <DatePicker.Calendar view={view} onViewChange={setView}>
      <Calendar.Header>
        <Calendar.PreviousButton />
        <PressableFeedback onPress={() => setView(v => (v === 'grid' ? 'year' : 'grid'))}>
          <Calendar.Title />
        </PressableFeedback>
        <Calendar.NextButton />
      </Calendar.Header>
      {view === 'year' ? (
        <Calendar.YearPicker />
      ) : view === 'month' ? (
        <Calendar.MonthPicker />
      ) : (
        <>
          <Calendar.Weekdays />
          <Calendar.Grid />
        </>
      )}
    </DatePicker.Calendar>
  </DatePicker.Content>
</DatePicker>
```

`view` is the `Calendar`'s, not the picker's — resetting it to `'grid'` on close is what
makes the panel open on the month every time.

## `closeOnSelect`

On by default: a picker whose only job is one date has been answered the moment a day is
pressed, and a panel that stayed open would need a second control to say so.

`closeOnSelect={false}` for a picker inside a form that confirms — where the caller writes
their own footer under the grid through `DatePicker.Calendar`'s children.

## `formatOptions`

```tsx
<DatePicker formatOptions={{ dateStyle: 'full' }} />
```

Anything `Intl.DateTimeFormat` takes. `dateStyle: 'medium'` by default — "6 sept. 2026" —
because a field is a line on a form and the long form is a sentence.

It changes **how the field reads the day and nothing else**: the value is a `Date` at
midnight local time either way. A Hermes build with no ICU falls back to the ISO day, which
is unambiguous everywhere even where it is nobody's habit.

## Props

### `DatePicker`

| Prop              | Type                         | Default      | Notes                              |
| ----------------- | ---------------------------- | ------------ | ---------------------------------- |
| `variant`         | `DatePickerVariant`          | `'primary'`  | The field's level                  |
| `size`            | `'sm' \| 'md' \| 'lg'`       | `'md'`       | The field, and the calendar's cell |
| `radius`          | `RadiusKey`                  | —            | The field's corner                 |
| `color`           | `string`                     | —            | The field and the chosen day       |
| `calendarVariant` | `CalendarVariant`            | —            | The grid's level                   |
| `value`           | `Date`                       | —            | Controlled                         |
| `defaultValue`    | `Date`                       | —            |                                    |
| `onValueChange`   | `(value: Date) => void`      | —            | Midnight, local time               |
| `isOpen`          | `boolean`                    | —            | Controlled open state              |
| `defaultOpen`     | `boolean`                    | `false`      |                                    |
| `onOpenChange`    | `(isOpen: boolean) => void`  | —            |                                    |
| `minValue`        | `Date`                       | —            | Compared by day                    |
| `maxValue`        | `Date`                       | —            |                                    |
| `firstDayOfWeek`  | `0`–`6`                      | the locale's |                                    |
| `locale`          | `string`                     | the device's |                                    |
| `formatOptions`   | `Intl.DateTimeFormatOptions` | `medium`     | How the field reads it             |
| `closeOnSelect`   | `boolean`                    | `true`       |                                    |
| `isDisabled`      | `boolean`                    | `false`      |                                    |
| `isInvalid`       | `boolean`                    | `false`      | Paints the colours, mounts nothing |
| `asChild`         | `boolean`                    | `false`      | The caller's element is the column |

The root **is the column** (a `View`, or the caller's element with `asChild`), so `ref`,
`style` and R14's style props are the column's. `DatePicker.Trigger` keeps its own — it is
the node the panel measures, and everything `Pressable` takes is written there.

### `DatePicker.Content`

The `Select`'s placement props — `placement`, `align`, `width`, `minWidth`, `offset`,
`alignOffset`, `avoidCollisions`, `insets` — with `width` defaulting to `trigger` and
`minWidth` to the `Calendar`'s seven-cell width.

## Accessibility

- The trigger is a `button`, not a `combobox`: there is nothing to type into, and a month
  grid is not a list of options a screen reader can walk from the field.
  `accessibilityState.expanded` follows the panel; `aria-invalid` follows `isInvalid`.
- The backdrop announces nothing — it is the absence of the panel, and "button" over the
  whole screen is worse than silence.
- Every day inside is labelled with its full date by the `Calendar`.
