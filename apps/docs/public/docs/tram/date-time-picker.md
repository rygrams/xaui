# DateTimePicker

A field that opens a page of wheels to choose a moment — a day and a time — drawn as the
Tram `DatePicker`'s field and page, its two halves taking turns under a pair of tabs.

Six columns do not fit across a phone, so the page shows the date or the time: two titles
along the top each read their half of the moment being chosen, and a press on one brings
its wheels in from its side. Nothing is chosen until ✓.

## Import

```tsx
import { DateTimePicker } from '@xaui/tram/date-time-picker'
import { Tabs } from '@xaui/tram/tabs' // only to write the panels out
```

## Anatomy

```tsx
<DateTimePicker>
  <DateTimePicker.Label />
  <DateTimePicker.Field />
  {/* or */}
  <DateTimePicker.Trigger>
    <DateTimePicker.Value />
    <DateTimePicker.Indicator />
  </DateTimePicker.Trigger>
  <DateTimePicker.Overlay />
  <DateTimePicker.Content>
    <DateTimePicker.Steps>
      <Tabs.Content value="date">
        <DateTimePicker.DateWheel />
      </Tabs.Content>
      <Tabs.Content value="time">
        <DateTimePicker.TimeWheel />
      </Tabs.Content>
    </DateTimePicker.Steps>
  </DateTimePicker.Content>
  <DateTimePicker.Description />
  <DateTimePicker.Error />
</DateTimePicker>
```

- **`DateTimePicker`** — the root is the column: the label, the field, the description or
  the error.
- **`Label`**, **`Field`**, **`Trigger`**, **`Value`**, **`Indicator`**, **`Overlay`**,
  **`Content`**, **`Description`**, **`Error`** — the `DatePicker`'s slots, with a moment
  in them. `Indicator` draws nothing unless given a glyph; `Overlay` draws nothing and
  carries only `isDismissable`.
- **`DateTimePicker.Steps`** — the two halves as the Tram `Tabs`. Unwritten, `Content`
  draws it; with no children, its panels hold the two wheels. Written out, each panel is a
  `Tabs.Content` whose `value` is the step's name, `date` or `time`.
- **`DateTimePicker.DateWheel`** — the `DatePicker`'s wheel: a day turned keeps the time.
- **`DateTimePicker.TimeWheel`** — the `TimePicker`'s wheel, on the picker's clock: a time
  turned keeps the day.

## Usage

### Basic

```tsx
<DateTimePicker value={moment} onValueChange={setMoment}>
  <DateTimePicker.Label>appointment</DateTimePicker.Label>
  <DateTimePicker.Field placeholder="choose a moment" />
  <DateTimePicker.Content confirmLabel="ok" cancelLabel="cancel" />
</DateTimePicker>
```

The field reads the moment as `{ dateStyle: 'medium', timeStyle: 'short' }` on the
picker's clock; `formatOptions` replaces it. ✓ confirms the moment from either half; ✕ and
the system's back drop it. The page opens on the date.

### Clock and step

```tsx
<DateTimePicker locale="fr-FR" hourCycle={12} minuteStep={15}>
  …
</DateTimePicker>
```

The clock is the locale's unless `hourCycle` (`12` or `24`) says otherwise. `minuteStep`
is how far apart two minute squares are.

### Controlled step

```tsx
<DateTimePicker step={step} onStepChange={setStep}>
  <DateTimePicker.Label>departure</DateTimePicker.Label>
  <DateTimePicker.Field />
  <DateTimePicker.Content>
    <DateTimePicker.Steps labels={{ date: 'date', time: 'time' }} />
  </DateTimePicker.Content>
</DateTimePicker>
```

### Bounds

`minValue` and `maxValue` are compared to the minute: a moment before the first turns to
the first square after it, one past the last to the last square before it.

## Sizes

```tsx
<DateTimePicker size="sm">…</DateTimePicker>
<DateTimePicker size="md">…</DateTimePicker>
<DateTimePicker size="lg">…</DateTimePicker>
```

`size` sets the field's height and type, and the side of the squares on the page.
`Steps` has its own `size`, `md` by default.

## Colour

`accent` takes one of the twenty named accents: the field's line while the page is open,
read as ink, and the fill of the current squares. `color` takes a raw `#RRGGBB` and wins
when both are set.

## Accessibility

- The trigger is a `button`, labelled by the label and described by the help lines, with
  `aria-expanded` and `aria-controls` pointing at the page.
- The page is a modal `dialog` labelled by the label.
- The step titles show the halves of the moment, not words: `labels` name them for a
  screen reader, announced as "date, 18 Nov 2026".
- ✓ and ✕ are buttons named by `confirmLabel` and `cancelLabel`.
- With motion reduced the page fades in instead of swivelling.

## Differences from Native

- **The root is the column**, with `Label`, `Field`, `Description` and `Error`; Native's
  root renders no node.
- **`Sheet`** is replaced by **`Content`** (a page), and **`Overlay`** is added.
- **`Calendar`** and **`Clock`** are replaced by **`DateWheel`** and **`TimeWheel`**.
- **`Steps`** takes `labels` for a screen reader, and its children are the panels
  (`Tabs.Content` per step).
- **No `variant`**, no `closeOnSelect`; **`accent`** is added.
- **`Indicator`** draws nothing unless given a glyph.
