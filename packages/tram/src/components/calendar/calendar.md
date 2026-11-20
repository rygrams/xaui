# Calendar

A month, and the day chosen in it, drawn as the Windows calendar: a light title at the
start, two bare chevrons at the end pointing up and down, and a grid of flat squares — the
chosen one in the accent, today lined in the ink.

The months page up and down: the next month rises from below and the one before drops in
from above. The month on screen, the chosen day and the panel are three pieces of state,
each controllable without the others.

## Import

```tsx
import { Calendar } from '@xaui/tram/calendar'
```

## Anatomy

```tsx
<Calendar>
  <Calendar.Header>
    <Calendar.Title />
    <Calendar.PreviousButton />
    <Calendar.NextButton />
  </Calendar.Header>
  <Calendar.Weekdays />
  <Calendar.Grid>
    <Calendar.Day />
  </Calendar.Grid>
  <Calendar.MonthPicker />
  <Calendar.YearPicker />
</Calendar>
```

- **`Calendar`** — the root. It holds the chosen day, the month on screen and the panel.
- **`Calendar.Header`** — the row over the grid.
- **`Calendar.Title`** — the month on screen, named through the locale, on `title`
  SemiLight. On the year and month panels it is the year alone. Children replace it.
- **`Calendar.PreviousButton`** / **`Calendar.NextButton`** — the chevrons, up and down.
  `step` is how many months a press moves; on the year and month panels they step a year.
  Children replace the chevron.
- **`Calendar.Weekdays`** — seven two-letter headings in the ink.
- **`Calendar.Grid`** — six weeks of the month on screen, always six, so nothing under it
  moves between months. A function child renders each day.
- **`Calendar.Day`** — one square. A day of another month is grey and still choosable;
  one out of bounds is the faint grey and inert.
- **`Calendar.MonthPicker`** — the twelve months, three to a row, rendered instead of the
  weekdays and the grid while `view` is `'month'`. `format` is `'short'` or `'long'`.
- **`Calendar.YearPicker`** — the years, three to a row in a scroll, rendered while `view`
  is `'year'`. `firstYear` and `lastYear` bound the list.

## Usage

### Basic

```tsx
<Calendar value={date} onValueChange={setDate}>
  <Calendar.Header>
    <Calendar.Title />
    <View style={{ flexDirection: 'row' }}>
      <Calendar.PreviousButton accessibilityLabel="previous month" />
      <Calendar.NextButton accessibilityLabel="next month" />
    </View>
  </Calendar.Header>
  <Calendar.Weekdays />
  <Calendar.Grid />
</Calendar>
```

`onValueChange` fires with the pressed day at midnight local time.

### Bounds and locale

```tsx
<Calendar minValue={today} maxValue={nextYear} locale="fr-FR">
  …
</Calendar>
```

Days outside the bounds are inert. `locale` names the months and the weekdays and, unless
`firstDayOfWeek` is set, decides which day a week starts on.

### Months and years

```tsx
<Calendar view={view} onViewChange={setView}>
  <Calendar.Header>
    <Calendar.Title
      onPress={() => setView(v => (v === 'grid' ? 'month' : 'year'))}
    />
    …
  </Calendar.Header>
  {view === 'grid' ? (
    <>
      <Calendar.Weekdays />
      <Calendar.Grid />
    </>
  ) : view === 'month' ? (
    <Calendar.MonthPicker />
  ) : (
    <Calendar.YearPicker style={{ maxHeight: 290 }} />
  )}
</Calendar>
```

Pressing a year goes on to its months; pressing a month lays the calendar on it and goes
back to the days. `month`, `defaultMonth` and `onMonthChange` control the month on screen.

## Sizes

```tsx
<Calendar size="sm">…</Calendar>
<Calendar size="md">…</Calendar>
<Calendar size="lg">…</Calendar>
```

Cells 36, 42 or 48 tall, and the type in them. The grid spans its parent; the squares
touch across and stand 2 apart down.

## Colour

The chosen day is the accent's flat square with its number in the ink that reads on it.
`accent` picks one of the twenty named accents; `color` takes a raw tint and wins.

```tsx
<Calendar accent="lime" defaultValue={today}>
  …
</Calendar>
```

`isDisabled` greys the calendar and stops every day.

## Accessibility

- A day is a `button` labelled with its full date, carrying `selected` and `disabled`.
  The weekday headings are hidden from screen readers.
- The title is a `header`. The chevrons are `button`s; their `accessibilityLabel` is the
  caller's.
- A month or a year on the panels is a `button` carrying `selected` and `disabled`.
- A press shrinks the cell and a choice is felt as a `selection` haptic.
- The months move 32 points on the Metro curve while they fade in; with motion reduced
  they only fade.

## Differences from Native

- **No `variant`**, **no `radius`**: the chosen day is the accent's flat square, and a
  Tram cell has no corner.
- **`accent`** is added.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **No `asChild`** on the root.
- **No today dot**: today is a square lined at 2 in the ink.
- **The months page up and down**, and the chevrons point up and down.
- **The arithmetic** is Native's, public from its root: `monthGrid`, `isSameDay`,
  `isSameMonth`, `isWithinBounds`, `startOfDay`, `firstDayOfWeekFor`, `weekdayNames`,
  `monthLabel`, `monthNames`.
