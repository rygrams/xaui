# RangeCalendar

A month, and the period chosen in it, drawn as the Tram `Calendar`: the two ends are the
accent's flat squares and the days between them its soft slice, filling their cells edge
to edge so the period reads as one strip across the weeks.

It is the Tram `Calendar` — the same root, header, chevrons, weekday headings and paging.
Only the day differs.

## Import

```tsx
import { RangeCalendar } from '@xaui/tram/range-calendar'
```

`DateRange` and `RangePosition` are re-exported as types.

## Anatomy

```tsx
<RangeCalendar>
  <RangeCalendar.Header>
    <RangeCalendar.Title />
    <RangeCalendar.PreviousButton />
    <RangeCalendar.NextButton />
  </RangeCalendar.Header>
  <RangeCalendar.Weekdays />
  <RangeCalendar.Grid>
    {date => <RangeCalendar.Day date={date} />}
  </RangeCalendar.Grid>
</RangeCalendar>
```

- **`RangeCalendar`** — the root: the `Calendar`'s root holding a period instead of a day.
- **`RangeCalendar.Header`**, **`.Title`**, **`.PreviousButton`**, **`.NextButton`**,
  **`.Weekdays`** — the `Calendar`'s own slots, re-exported. The title names the month
  through the locale; the chevrons point up and down and step a month.
- **`RangeCalendar.Grid`** — six weeks of squares. With no children it draws a
  `RangeCalendar.Day` in every cell; a function child of your own wins.
- **`RangeCalendar.Day`** — one day and its place in the period: an end, a day between, or
  neither.

## Usage

### Basic

```tsx
const [stay, setStay] = useState<DateRange>({ start: null, end: null })

<RangeCalendar value={stay} onValueChange={setStay}>
  <RangeCalendar.Header>
    <RangeCalendar.Title />
    <View style={{ flexDirection: 'row' }}>
      <RangeCalendar.PreviousButton accessibilityLabel="previous month" />
      <RangeCalendar.NextButton accessibilityLabel="next month" />
    </View>
  </RangeCalendar.Header>
  <RangeCalendar.Weekdays />
  <RangeCalendar.Grid />
</RangeCalendar>
```

Leave `value` out and the calendar holds its own period, from `defaultValue`. The month on
screen opens on the period's start, and is its own state (`month`, `defaultMonth`,
`onMonthChange`).

### Three presses

| The state        | Pressing a day                       |
| ---------------- | ------------------------------------ |
| nothing chosen   | it becomes the start                 |
| a start, no end  | on or after it → it becomes the end  |
| a start, no end  | before it → it becomes the new start |
| both ends chosen | a new period starts from it          |

A one-day period is allowed and draws as one square.

### Bounds and locale

```tsx
<RangeCalendar
  minValue={today}
  maxValue={inSixMonths}
  locale="en-GB"
  firstDayOfWeek={1}
/>
```

Days outside `minValue` / `maxValue` are the faint grey and inert. `locale` names the
months and the weekdays; `firstDayOfWeek` is read from it when unset.

## Sizes

```tsx
<RangeCalendar size="sm" />
<RangeCalendar size="md" />
<RangeCalendar size="lg" />
```

`size` sets the cell's height — 36, 42 or 48 — and the type in it. The grid spans its
parent.

## Colour

The ends are the theme's accent; the days between are its soft slice at 30 %. `accent`
picks another of the twenty named accents; `color` takes a raw tint and wins when both
are set. `isDisabled` greys the calendar and stops every day.

```tsx
<RangeCalendar accent="magenta" size="sm" />
```

## Accessibility

- A day has the `button` role, is named by its full date in the locale, and announces
  `selected` while it is part of the period and `disabled` when out of bounds.
- The chevrons are `button`s with no text: give each an `accessibilityLabel`.
- A press shrinks the cell and is felt as a `selection` haptic.
- The next month rises from below as it fades in; under reduced motion it only fades.

## Differences from Native

- Those of the Tram `Calendar`: **no `variant`**, **no `radius`**, **no `xs`**, **no
  `asChild`**; **`accent`** is added; no today dot — today is a square lined in the ink.
- **The band**: no half band hidden under a disc. A Tram day is a square that fills its
  cell, so the period runs edge to edge.
