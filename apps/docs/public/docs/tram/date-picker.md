# DatePicker

A field that opens a page of wheels to choose a day, drawn as the Metro date picker: the
`TextField`'s box with the day in it, and a page that swivels in with three columns of
squares — the day, the month and the year — and the App Bar's ✓ and ✕ along the bottom.

Nothing is chosen while the wheels turn: ✓ takes the day and fires `onValueChange`; ✕ and
the system's back leave the value as it was.

## Import

```tsx
import { DatePicker } from '@xaui/tram/date-picker'
```

## Anatomy

```tsx
<DatePicker>
  <DatePicker.Label />
  <DatePicker.Field />
  {/* or */}
  <DatePicker.Trigger>
    <DatePicker.Value />
    <DatePicker.Indicator />
  </DatePicker.Trigger>
  <DatePicker.Overlay />
  <DatePicker.Content>
    <DatePicker.Wheel />
  </DatePicker.Content>
  <DatePicker.Description />
  <DatePicker.Error />
</DatePicker>
```

- **`DatePicker`** — the root is the column: the label, the field, the description or the
  error. `ref`, `style` and the style props dress that column.
- **`DatePicker.Label`** — what the field is for. Its text also titles the page.
- **`DatePicker.Field`** — the trigger and its value in one tag; `placeholder` is the line
  shown while nothing is chosen.
- **`DatePicker.Trigger`** — the box and its row, the control a screen reader stops on.
- **`DatePicker.Value`** — the day as the root reads it; children replace it.
- **`DatePicker.Indicator`** — a glyph at the end of the field. It draws nothing unless
  given one with `as`.
- **`DatePicker.Overlay`** — draws nothing: the page takes the screen. It carries only
  `isDismissable`, whether the system's back closes the page.
- **`DatePicker.Content`** — the page: the label as its title, the wheels, and the ✓ and ✕
  bar. `confirmLabel` and `cancelLabel` name the two buttons (`done` and `cancel`).
- **`DatePicker.Wheel`** — the wheel on the page: the `WheelPicker`'s props, less its
  columns, colour and disabled state. Unwritten, the page draws it for you.
- **`DatePicker.Description`**, **`DatePicker.Error`** — the help lines under the field.

## Usage

### Basic

```tsx
<DatePicker value={date} onValueChange={setDate}>
  <DatePicker.Label>birthday</DatePicker.Label>
  <DatePicker.Field placeholder="choose a date" />
  <DatePicker.Content confirmLabel="ok" cancelLabel="cancel" />
</DatePicker>
```

The field reads the day through `Intl` (`dateStyle: 'medium'`); `formatOptions` takes
anything `Intl.DateTimeFormat` takes. `value` is a day at midnight.

### Locale

```tsx
<DatePicker locale="ja-JP">…</DatePicker>
```

The columns are in the locale's order — the day first in French, the month first in
American English, the year first in Japanese. A month square carries its number and its
short name, a day square its number and its weekday.

### Bounds

```tsx
<DatePicker minValue={new Date(2026, 0, 1)} maxValue={new Date(2026, 11, 31)}>
  …
</DatePicker>
```

The day and the month turn without end; the year runs a century each way, or between the
bounds. A day outside them turns back to the nearest one; 31 January turned to February
lands on its last day.

### The wheel

```tsx
<DatePicker.Content>
  <DatePicker.Wheel variant="light" isAwake visibleCount={3} />
</DatePicker.Content>
```

## Sizes

```tsx
<DatePicker size="sm">…</DatePicker>
<DatePicker size="md">…</DatePicker>
<DatePicker size="lg">…</DatePicker>
```

`size` sets the field's height and type, and the side of the squares on the page.

## Colour

`accent` takes one of the twenty named accents: the field's line while the page is open,
read as ink, and the fill of the current squares. `color` takes a raw `#RRGGBB` and wins
when both are set.

## Accessibility

- The trigger is a `button`, labelled by the label and described by the help lines, with
  `aria-expanded` and `aria-controls` pointing at the page.
- The page is a modal `dialog` labelled by the label; its title is a `header`.
- ✓ and ✕ are buttons named by `confirmLabel` and `cancelLabel`; a press is felt through
  `TramProvider`'s `onHaptic`.
- A column is named for a screen reader in the locale (`Intl.DisplayNames`).
- With motion reduced the page fades in instead of swivelling.

## Differences from Native

- **`Calendar`** is replaced by **`Wheel`**: the `WheelPicker`'s props less its columns,
  colour and disabled state; `size` defaults to the picker's.
- **No `variant`** (one box), no `calendarVariant` (written on `Wheel`), no
  `firstDayOfWeek` (no grid), no `closeOnSelect` (✓ confirms); **`accent`** is added.
- **`Overlay`** draws nothing and only carries `isDismissable` — the page takes the screen.
- **`Content`** is a page, not an anchored panel: its placement props are dropped and
  `confirmLabel` / `cancelLabel` are added.
- **`Indicator`** draws nothing unless given a glyph; Native draws a calendar.
