# AgendaCalendar

One week, and what is on it.

## Import

```tsx
import { AgendaCalendar } from '@xaui/native/agenda-calendar'
```

## Anatomy

```tsx
<AgendaCalendar value={day} onValueChange={setDay} events={dates}>
  <AgendaCalendar.Header>
    <AgendaCalendar.Title />
    <AgendaCalendar.Nav>
      <AgendaCalendar.PreviousButton accessibilityLabel="Semaine précédente" />
      <AgendaCalendar.TodayButton>Today</AgendaCalendar.TodayButton>
      <AgendaCalendar.NextButton accessibilityLabel="Semaine suivante" />
    </AgendaCalendar.Nav>
  </AgendaCalendar.Header>
  <AgendaCalendar.Weekdays />
  <AgendaCalendar.Week />
</AgendaCalendar>
```

| slot                            | what it is                                      |
| ------------------------------- | ----------------------------------------------- |
| `AgendaCalendar`                | The card, the state, the resolved style         |
| `AgendaCalendar.Header`         | The row above the strip                         |
| `AgendaCalendar.Title`          | The month the week is in                        |
| `AgendaCalendar.Nav`            | The cluster on the trailing end                 |
| `AgendaCalendar.PreviousButton` | A week back. Dead at the bounds                 |
| `AgendaCalendar.NextButton`     | A week forward                                  |
| `AgendaCalendar.TodayButton`    | Back to this week. It does not choose today     |
| `AgendaCalendar.Weekdays`       | The seven column headings                       |
| `AgendaCalendar.Week`           | The seven days                                  |
| `AgendaCalendar.Day`            | One day, and the mark under it                  |
| `AgendaCalendar.MonthPicker`    | The twelve months, in a row where the days were |
| `AgendaCalendar.YearPicker`     | The years, in a row where the days were         |

**Unlike the `Calendar`, this one draws its own card**: a `surface` ground, a corner and its
padding. A strip is a thing you put on a screen; a month grid is a thing you put in a sheet.

## It is a `Calendar` folded down to a week

**And the row of marks is the whole difference.** A strip of seven numbers is a date picker.
A strip of seven numbers with marks under some of them is an agenda.

```tsx
<AgendaCalendar events={[new Date(2026, 8, 7), new Date(2026, 8, 9)]} />
```

`events` is a list rather than a predicate, because a list is what a caller has: a month of
events mapped to their dates. It is read **by day**, so the time each one carries is ignored,
and it is turned into a set once per change rather than scanned per cell.

**The cells are the `Calendar`'s own style**, resolved through `calendarRecipe` rather than a
second table. A strip and a month showing two different discs for the same chosen day is
what that sharing exists to prevent — and the two sit one above the other the moment a caller
expands one into the other, which is what the chevron beside the title is usually for.

## Why it is a component rather than a prop

**It steps by weeks.** That is a different unit from the `Calendar`'s month, so the state
under it is different too: a `layout="week"` prop would have had to mean "and now `month` is
a week", which is a prop that changes what another prop means.

Everything genuinely shared — the cell, the disc, the mark, the column headings, the date
arithmetic — is shared. The API is not, because the two do not do the same thing.

## No day is ever "outside"

All seven are on screen and all seven are choosable. A strip that greyed out the two days
belonging to next month would be greying out days it is showing.

Only `minValue` / `maxValue` make a day inert. The chevrons go dead when the week they would
reach has no selectable day in it — the `Calendar`'s rule, one unit down.

## The week and the day are two pieces of state

```tsx
<AgendaCalendar
  value={day}
  onValueChange={setDay}
  week={week}
  onWeekChange={setWeek}
/>
```

Paging weeks is not choosing a day, for the reason `calendar.md` gives about months.

## Today, in one press

`AgendaCalendar.TodayButton` brings today's week on screen, closes any month or year row
that is open, **and chooses today** — the same three things legacy's dialog did. A button
that dropped you on the right week and left you to find the day would be half a button.
`select` still honours the bounds, so an out-of-range today moves the strip without choosing.

It goes dead, and reads dead, only when there is nothing left for it to do: today's week is
showing, the day strip is the view, and today is the chosen day. Page away, open a picker,
or choose another day and it comes back to life.

The word is the caller's — "Today", "Aujourd'hui", "Hoy" — and R3 wraps a text child into
the label.

## Changing the month and the year

```tsx
const [view, setView] = useState<AgendaCalendarView>('week')

<AgendaCalendar value={day} onValueChange={setDay} view={view} onViewChange={setView}>
  <AgendaCalendar.Header>
    <PressableFeedback onPress={() => setView(v => (v === 'week' ? 'year' : 'week'))}>
      <AgendaCalendar.Title />
    </PressableFeedback>
    <AgendaCalendar.Nav>
      <AgendaCalendar.PreviousButton accessibilityLabel="Précédent" />
      <AgendaCalendar.TodayButton>Today</AgendaCalendar.TodayButton>
      <AgendaCalendar.NextButton accessibilityLabel="Suivant" />
    </AgendaCalendar.Nav>
  </AgendaCalendar.Header>
  {view === 'year' ? (
    <AgendaCalendar.YearPicker />
  ) : view === 'month' ? (
    <AgendaCalendar.MonthPicker />
  ) : (
    <>
      <AgendaCalendar.Weekdays />
      <AgendaCalendar.Week />
    </>
  )}
</AgendaCalendar>
```

`view` is a third piece of state, controlled the way `value` and `week` are. The pickers are
**rows in the strip's place**, not a grid over it — they scroll sideways where the days
were, the way the strip itself does. The walk is the `Calendar`'s, one unit down: the title
opens the **years**, a year opens that year's months, a month lands back on the week that
holds it.

**One pair of chevrons pages all three.** `PreviousButton` / `NextButton` step whatever
`view` is showing — a week, a month, or a year — and go dead when the unit they would reach
has no selectable day in it. The caller reads `view` to render one of the three; the pickers
only ever step it.

## The title names the middle day's month

A week can straddle two. The **fourth of seven** is always in the majority month, and it is
the only rule that does not call a week with six September days in it "August".

## Sizes

| `size` | Cell | Nav button | Pill  |
| ------ | ---- | ---------- | ----- |
| `sm`   | 36   | 32         | 12/16 |
| `md`   | 40   | 36         | 14/20 |
| `lg`   | 44   | 40         | 16/24 |

The cell is the `Calendar`'s at the same `size`, so a strip and a month at `md` line up.

## Variants and colour

The `Calendar`'s four, on the same tokens, because the chosen day is the same day. `color`
is a raw value (R7) and reaches the disc, the mark on it, **and the Today pill's word** —
the pill is bordered rather than filled for that reason: between two bare chevrons, a filled
button would read as the primary action of the whole card.

## Cells of your own

`AgendaCalendar.Week` takes a function, exactly as `Calendar.Grid` does and for the same
reason: seven cells are generated from a date rather than written.

```tsx
<AgendaCalendar.Week>
  {date => (
    <AgendaCalendar.Day key={date.getTime()} date={date}>
      <Text>{date.getDate()}</Text>
    </AgendaCalendar.Day>
  )}
</AgendaCalendar.Week>
```

## Props

### `AgendaCalendar`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop             | Type                              | Default      | Notes                        |
| ---------------- | --------------------------------- | ------------ | ---------------------------- |
| `variant`        | `CalendarVariant`                 | `'primary'`  | The chosen day               |
| `size`           | `'sm' \| 'md' \| 'lg'`            | `'md'`       | The cell and the controls    |
| `radius`         | `RadiusKey`                       | `'2xl'`      | The card's corner            |
| `color`          | `string`                          | —            | The disc, its mark, the pill |
| `value`          | `Date`                            | —            | Controlled                   |
| `defaultValue`   | `Date`                            | —            |                              |
| `onValueChange`  | `(value: Date) => void`           | —            | Midnight, local time         |
| `week`           | `Date`                            | —            | Any day in the visible week  |
| `defaultWeek`    | `Date`                            | the value's  |                              |
| `onWeekChange`   | `(week: Date) => void`            | —            |                              |
| `view`           | `AgendaCalendarView`              | —            | Controlled strip on screen   |
| `defaultView`    | `AgendaCalendarView`              | `'week'`     | Uncontrolled starting strip  |
| `onViewChange`   | `(v: AgendaCalendarView) => void` | —            | Fires when a picker steps it |
| `events`         | `Date[]`                          | —            | The days that carry a mark   |
| `minValue`       | `Date`                            | —            | Compared by day              |
| `maxValue`       | `Date`                            | —            |                              |
| `firstDayOfWeek` | `0`–`6`                           | the locale's |                              |
| `locale`         | `string`                          | the device's |                              |
| `isDisabled`     | `boolean`                         | `false`      |                              |
| `asChild`        | `boolean`                         | `false`      |                              |

### `AgendaCalendar.Day`

`date` (required), `children`, `isDisabled`, plus everything `PressableFeedback` takes and
the `ViewStyle` keys as props (R14).

### `AgendaCalendar.MonthPicker`

Everything `ScrollView` accepts, plus `format` — `'long'` (`"septembre"`) or `'short'`
(`"sept."`, the default), clipped to a line since the row scrolls sideways.

### `AgendaCalendar.YearPicker`

Everything `ScrollView` accepts, plus `firstYear` / `lastYear` — the ends of the row,
defaulting to fifty each way, or to the bounds' own years when the strip is bounded.

## Extending it

`useAgendaCalendar()` is exported (R10) and carries the seven days, the chosen one,
`hasEvent`, `view` / `setView`, and the moves — `goByWeeks`, `goByMonths`, `goByYears`,
`page` (whichever the view shows), `goToYear`, `goToMonthInYear`, `goToToday` and `select` —
plus `isOnToday` and `isTodayResolved`.
Enough to write a strip of your own: names under the numbers, a count instead of a dot, a
second mark in another colour. Outside an `<AgendaCalendar>` it throws by name.

## Accessibility

- Each day is a `button` labelled with its full date, and a marked day says so in its label:
  a dot is invisible to a screen reader otherwise. The word is one language, which is the
  honest limit — a caller with two passes `accessibilityLabel`, and that wins.
- The weekday row is hidden from the accessibility tree; each day announces its own date.
- The chevrons need an `accessibilityLabel` from the caller, for the `Calendar`'s reason.
