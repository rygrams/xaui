# Calendar

A month, and the day chosen in it.

## Import

```tsx
import { Calendar } from '@xaui/native/calendar'
```

## Anatomy

```tsx
<Calendar value={date} onValueChange={setDate}>
  <Calendar.Header>
    <Calendar.PreviousButton accessibilityLabel="Mois précédent" />
    <Calendar.Title />
    <Calendar.NextButton accessibilityLabel="Mois suivant" />
  </Calendar.Header>
  <Calendar.Weekdays />
  <Calendar.Grid />
</Calendar>
```

| slot                      | what it is                                              |
| ------------------------- | ------------------------------------------------------- |
| `Calendar`                | State and resolved style. It draws no ground of its own |
| `Calendar.Header`         | The row above the grid, and the glyph scale in it       |
| `Calendar.Title`          | The month, named through the locale                     |
| `Calendar.PreviousButton` | A month back. Dead at the bounds                        |
| `Calendar.NextButton`     | A month forward                                         |
| `Calendar.Weekdays`       | The seven column headings                               |
| `Calendar.Grid`           | Six weeks of cells                                      |
| `Calendar.Day`            | One day                                                 |

**The header lays itself out with `space-between` and nothing else.** Where the title sits —
between the chevrons, or beside them with both on the right, as `AgendaCalendar` has it — is
what the caller writes, not a prop.

## The month on screen is state of its own

```tsx
<Calendar
  value={date}
  onValueChange={setDate}
  month={month}
  onMonthChange={setMonth}
/>
```

Paging through months is **not** choosing a day. A calendar that jumped back to the chosen
month every time you looked at the next one would be unusable, and one that chose a day
because you paged past it would be worse. So there are two pieces of state, and either can
be controlled without the other.

Uncontrolled, the month starts on the chosen day's — or on this one.

## The grid is always six weeks

Never five for a short month. A grid that changed height between March and April would move
everything under it twice a year, and the calendar would jump as you paged through it.

Days from the months either side fill the ends. They are **muted and still choosable**: a
calendar that refused the 1st of next month would be refusing a date you can see. What makes
a day inert is `minValue` / `maxValue`, not which month it belongs to.

## The week starts where the locale says

`Intl.Locale`'s week info answers it properly where it exists — Saturday-first locales are
real, and a hand-kept list of Monday-first languages has never included them. Most React
Native engines do not have it, so a list of Monday-first languages is the fallback rather
than the source.

`firstDayOfWeek={1}` overrides both. `locale` names the months and the weekdays, and defaults
to the device's.

## Cells of your own

```tsx
<Calendar.Grid>
  {date => (
    <Calendar.Day key={date.getTime()} date={date}>
      <Text>{date.getDate()}</Text>
    </Calendar.Day>
  )}
</Calendar.Grid>
```

**`Calendar.Grid` takes a function, and it is the one place in this library that does.**
Forty-two cells are generated from a month rather than written, so there is nothing for a
caller to compose against: `asChild` merges into one element, and a slot list cannot
enumerate a month.

**A day is a date plus the calendar around it.** `Calendar.Day` reads everything else off
its `date` — chosen, outside the month, out of bounds, today — which is what makes the
function above two lines rather than a wiring exercise. It is also what `AgendaCalendar`
builds its event dots on.

## The bounds

```tsx
<Calendar minValue={new Date()} maxValue={addMonths(new Date(), 3)} />
```

Days outside them are muted and inert, and **the chevrons go dead**: a step that would land
on a month with no selectable day in it has nothing to show, and a chevron that stays lit
while it stops working is the worst of the three options.

Bounds are compared **by day, not by instant**. A `maxValue` written as `new Date()` carries
the current time, and an instant comparison would refuse the rest of today.

## Sizes

| `size` | Cell | Number | Title | Weekday |
| ------ | ---- | ------ | ----- | ------- |
| `sm`   | 36   | 14/20  | 16/24 | 12/16   |
| `md`   | 40   | 16/24  | 18/28 | 14/20   |
| `lg`   | 44   | 18/28  | 20/30 | 16/24   |

**`size` is the cell's box, never the grid's width.** A calendar is seven columns wide
whatever the size, so a `size` that drove width would be deciding the calendar's own; the
grid spans its parent and each column takes a seventh of it.

`radius` is the circle `size` sets, and it moves the cell and the disc together — a
squared-off day holding a round disc is what the pair exists to prevent.

## Variants and colour

| `variant`   | The chosen day | Its number             |
| ----------- | -------------- | ---------------------- |
| `primary`   | `accent`       | `accentForeground`     |
| `secondary` | `accentSoft`   | `accentSoftForeground` |
| `tertiary`  | `default`      | `defaultForeground`    |
| `ghost`     | `foreground`   | `background`           |

Four emphasis levels and **no intent** — a date is neither a success nor a danger. What the
variant names is the chosen day, because a day at rest is the same on all four: a calendar is
a grid of numbers, and the variant is about the one that is answered.

The pair is `bgSelected` / `fgSelected` — the `Checkbox`'s roles, for the `Checkbox`'s
reason. Forty-two cells share one resolution and exactly one is chosen, so selection cannot
be a variant axis without resolving the recipe per cell; and it has to be a **role** or a raw
`color` would stop reaching the chosen day the moment it became the chosen one, since the
tint pass re-runs `paint` and never the axes.

`color` is a raw value (R7) and lands on the disc, with the number derived to read against it.

## Today

Today carries a dot under its number — muted on a plain day, and in the chosen day's own
contrast colour when today _is_ the chosen day. It is positioned absolutely so the number
does not shift down the day the dot appears.

## The dates behind it

The arithmetic is `utils/dates.ts`, and it is tested: `startOfDay`, `isSameDay`,
`isSameMonth`, `addDays`, `addMonths`, `startOfWeek`, `isWithinBounds`, `monthGrid`,
`weekGrid`, `weekdayNames`, `monthLabel`, `firstDayOfWeekFor`.

Two of those exist because the obvious version is wrong:

- **`addMonths` clamps to the end of the target month.** `new Date(2026, 0, 31)` plus a
  month is the 31st of February, which `Date` rolls forward to the 3rd of March — so a
  calendar stepping from January to February would land on March.
- **`addDays` goes through the day-of-month, not through milliseconds.** A day is not always
  86 400 seconds, and adding that many across a daylight-saving boundary lands an hour into
  the day before.

## Props

### `Calendar`

Everything `View` accepts, every `ViewStyle` key it does not already claim (R14), plus:

| Prop             | Type                    | Default      | Notes                            |
| ---------------- | ----------------------- | ------------ | -------------------------------- |
| `variant`        | `CalendarVariant`       | `'primary'`  | The chosen day                   |
| `size`           | `'sm' \| 'md' \| 'lg'`  | `'md'`       | The cell's box and its type      |
| `radius`         | `RadiusKey`             | a circle     | The cell and the disc together   |
| `color`          | `string`                | —            | A hex tint, on the chosen day    |
| `value`          | `Date`                  | —            | Controlled                       |
| `defaultValue`   | `Date`                  | —            | Uncontrolled starting day        |
| `onValueChange`  | `(value: Date) => void` | —            | Fires at midnight local time     |
| `month`          | `Date`                  | —            | The month on screen. Controlled  |
| `defaultMonth`   | `Date`                  | the value's  | Uncontrolled starting month      |
| `onMonthChange`  | `(month: Date) => void` | —            |                                  |
| `minValue`       | `Date`                  | —            | Compared by day                  |
| `maxValue`       | `Date`                  | —            |                                  |
| `firstDayOfWeek` | `0`–`6`                 | the locale's |                                  |
| `locale`         | `string`                | the device's |                                  |
| `isDisabled`     | `boolean`               | `false`      | Every day, and none opts back in |
| `asChild`        | `boolean`               | `false`      | Merge into the single child      |

### `Calendar.Day`

Everything `PressableFeedback` accepts, plus the `ViewStyle` keys as props (R14), plus:

| Prop         | Type        | Default | Notes                                     |
| ------------ | ----------- | ------- | ----------------------------------------- |
| `date`       | `Date`      | —       | Required. Everything else follows from it |
| `children`   | `ReactNode` | —       | Replaces the number and the dot           |
| `isDisabled` | `boolean`   | —       | Overrides what the bounds say             |

### `Calendar.PreviousButton`, `.NextButton`

Everything `PressableFeedback` accepts, plus `step` — how many months one press moves.

## Extending it

`useCalendar()` is exported (R10) and carries the resolved styles, the month on screen, the
chosen day, the locale, and the three moves: `select`, `goToMonth` and `canGoToMonth`. Enough
to write a year picker beside the title, or a "Today" button of your own. Outside a
`<Calendar>` it throws by name.

## Accessibility

- Each day is a `button` labelled with its **full date** — "dimanche 6 septembre 2026" —
  because the number alone says "6", and carries `accessibilityState.selected`.
- The title is a `header`, which is what a screen reader jumps between.
- The weekday row is hidden from the accessibility tree: the names are for the eye, and each
  day already announces the day it is.
- The chevrons need an `accessibilityLabel` from the caller: the month they go to is what
  should be announced, and only the caller knows which language to say it in.
