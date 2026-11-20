# TimePicker

A field that opens a page of wheels, drawn as the Metro time picker: the `TextField`'s box
with the time in it, and a page that swivels in on its top edge with a column of hours,
one of minutes and, on a twelve-hour clock, the half of the day.

**Nothing is chosen while the wheels turn.** The wheels stand on a draft: ✓ makes it the
value and fires `onValueChange`; ✕ and the system's back leave the value as it was.

## Import

```tsx
import { TimePicker } from '@xaui/tram/time-picker'
```

## Anatomy

```tsx
<TimePicker>
  <TimePicker.Label />
  <TimePicker.Field />
  <TimePicker.Overlay />
  <TimePicker.Content>
    <TimePicker.Wheel />
  </TimePicker.Content>
  <TimePicker.Description />
  <TimePicker.Error />
</TimePicker>
```

- **`TimePicker`** — the root: the column holding the label, the field and the help lines.
- **`TimePicker.Label`** — what the time is for. It also titles the page.
- **`TimePicker.Field`** — the trigger and its value in one tag. `placeholder` is shown
  while nothing is chosen.
- **`TimePicker.Trigger`**, **`TimePicker.Value`**, **`TimePicker.Indicator`** — the
  field taken apart, for a field composed by hand. `Indicator` draws nothing unless given
  a glyph through `as`.
- **`TimePicker.Overlay`** — draws nothing; `isDismissable={false}` keeps the system's
  back from closing the page.
- **`TimePicker.Content`** — the page: the label as its title, the wheels, and the App
  Bar's ✓ and ✕ along the bottom, named by `confirmLabel` and `cancelLabel`.
- **`TimePicker.Wheel`** — the columns, a Tram `WheelPicker`. It is what the page holds
  when `Content` is given no children.
- **`TimePicker.Description`**, **`TimePicker.Error`** — the hint and the error under the
  field.

## Usage

### Basic

```tsx
<TimePicker value={time} onValueChange={setTime}>
  <TimePicker.Label>alarm</TimePicker.Label>
  <TimePicker.Field placeholder="choose a time" />
  <TimePicker.Content confirmLabel="ok" cancelLabel="cancel" />
</TimePicker>
```

`value` keeps its day: the wheels change its hours and minutes, and drop its seconds.

### Clock and locale

The clock is the locale's unless `hourCycle` (`12` or `24`) says otherwise, and so is the
order of the columns — the half of the day comes first in Korean. The field reads the
time through `Intl`; `formatOptions` changes how.

```tsx
<TimePicker locale="fr-FR" hourCycle={12} defaultValue={noon}>
  <TimePicker.Label>start</TimePicker.Label>
  <TimePicker.Field />
  <TimePicker.Content />
</TimePicker>
```

The hours and minutes loop: 12 · 1 … 11 on a twelve-hour clock, 00 … 23 on a 24-hour one.

### Minute step

```tsx
<TimePicker minuteStep={5}>…</TimePicker>
```

A step that does not divide the hour is fitted to the nearest one under it that does
(7 → 6, 45 → 30). A time between two squares stands on the one under it.

### Wheel

`TimePicker.Wheel` takes the `WheelPicker`'s own props — `variant`, `size`,
`visibleCount`, `isAwake`, the style props — but not its colour or disabled state, which
are the picker's.

```tsx
<TimePicker.Content>
  <TimePicker.Wheel variant="light" />
</TimePicker.Content>
```

### Open state

`isOpen`, `defaultOpen` and `onOpenChange` control the page.

## Sizes

```tsx
<TimePicker size="sm">…</TimePicker>
<TimePicker size="md">…</TimePicker>
<TimePicker size="lg">…</TimePicker>
```

`size` sets the field's height and type, and the side of the squares on the page.
`radius` overrides the field's corner, within 2.

## Colour

`accent` picks one of the twenty named accents: the field's line while the page is open,
read as ink, and the current squares' fill. `color` takes a raw `#RRGGBB` for the same two
places and wins when both are set.

## Accessibility

- The field is a `button` with `aria-expanded` and `aria-controls`, named by the label and
  described by the description and the error.
- The page is a modal `dialog` titled by the label; ✓ and ✕ are `button`s named by
  `confirmLabel` and `cancelLabel` (`done` and `cancel` by default).
- `isDisabled` greys the line, the value and the label, and the picker does not open.
  `isInvalid` draws the line in `danger`; the label keeps its ink.

## Differences from Native

- **The root is the column**, not a node-less provider, and adds `Label`, `Field`,
  `Description` and `Error`: the label titles the page, as the Metro "choose time" did.
- **`Sheet`** is replaced by `Content`, a page rather than a bottom sheet.
- **`Display` and `Clock`** are replaced by `Wheel`: the squares are the display.
- **`Overlay`** is added, carrying `isDismissable`.
- **No `variant`** and **no `closeOnSelect`**: one box, and nothing is chosen until ✓.
- **`accent`** is added.
- **`Indicator`** draws nothing unless given a glyph; Native's is a clock.
