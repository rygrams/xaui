# Select

A field that opens a list, drawn as the Metro list picker: the Tram `TextField`'s box,
which unfolds in place for up to five choices and pushes what is under it, or opens a page
of its own that swivels in for more.

Open, the border and the current choice are the accent read as ink; nothing else changes
colour.

## Import

```tsx
import { Select } from '@xaui/tram/select'
```

## Anatomy

```tsx
<Select>
  <Select.Label />
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Overlay />
  <Select.Content>
    <Select.GroupLabel />
    <Select.Item>
      <Select.ItemLabel />
      <Select.ItemDescription />
      <Select.ItemIndicator />
    </Select.Item>
  </Select.Content>
  <Select.Description />
  <Select.Error />
</Select>
```

- **`Select`** — the root is the column — label, field, description, error — not the
  field. It holds the value and the open state.
- **`Select.Label`** — what the field is for. A touch on it opens the list; on a page it
  becomes the page's title.
- **`Select.Trigger`** — the field's row and the control a screen reader stops on.
- **`Select.Value`** — the chosen item's label, or `placeholder` until one is chosen.
  Children name the value when the root cannot read it off the items.
- **`Select.Indicator`** — the chevron at the end; it turns as the list opens. `as`,
  `size` and `color` override it.
- **`Select.Overlay`** — draws nothing. Around an unfolded list it closes the list on a
  touch above or below the box; `isDismissable={false}` leaves only a choice to close it.
  Omitted, a touch outside closes nothing.
- **`Select.Content`** — the list, inside the field or as a page.
- **`Select.GroupLabel`** — a heading over a run of choices.
- **`Select.Item`** — one choice, pressed like a control of 48. `label` is the string the
  field shows when the children are not one; `children` may be a function of
  `{ isSelected, isPressed, isDisabled }`.
- **`Select.ItemLabel`**, **`.ItemDescription`** — an item's line, and a second one in
  `muted`.
- **`Select.ItemIndicator`** — a mark beside the chosen item. It draws nothing unless
  given `as`: the current choice is read by its colour.
- **`Select.Description`**, **`.Error`** — the lines under the field.

## Usage

### Basic

```tsx
<Select defaultValue="fr" onValueChange={setLocale}>
  <Select.Label>language</Select.Label>
  <Select.Trigger>
    <Select.Value placeholder="choose a language" />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Overlay />
  <Select.Content>
    <Select.Item value="fr">français</Select.Item>
    <Select.Item value="en">english</Select.Item>
  </Select.Content>
  <Select.Description>the interface's.</Select.Description>
</Select>
```

`value` / `defaultValue` / `onValueChange` and `isOpen` / `defaultOpen` / `onOpenChange`
are each controlled or left to the root.

### In place or a page

Unset, the number of choices decides: five at most unfold inside the field, more open a
page. `mode` on `Select.Content` forces one or the other.

```tsx
<Select.Content mode="fullscreen" paddingTop={insets.top + 24}>
  {items}
</Select.Content>
```

A page starts at the very top of the screen and reads no safe area: pad it with the app's
own inset. On a page, the system's back closes the list unless `Select.Overlay` says
`isDismissable={false}`.

### Groups and a second line

```tsx
<Select.Content>
  <Select.GroupLabel>automatic</Select.GroupLabel>
  <Select.Item value="wifi" label="on wi-fi">
    <Select.ItemLabel>on wi-fi</Select.ItemLabel>
    <Select.ItemDescription>never on mobile data.</Select.ItemDescription>
  </Select.Item>
</Select.Content>
```

### Invalid and disabled

`isInvalid` draws the border in `danger`, open or not; the label and the description keep
their ink. `Select.Error` stays the caller's to mount. `isDisabled` greys the border, the
value and the label, and the select does not open. An item's own `isDisabled` greys it
and keeps it from being chosen.

## Sizes

```tsx
<Select size="sm" />
<Select size="md" />
<Select size="lg" />
```

The `TextField`'s heights — 40, 48 and 56 — so a select and a text field stacked in a form
read as one control. `size` never sets the width; `sm` is pressed as 48 points. `radius`
overrides the box's corner and stays within 2.

## Colour

The open border and the current choice are the theme's accent, read as ink. `accent`
picks another of the twenty named accents; `color` takes a raw `#RRGGBB` and wins when
both are set.

```tsx
<Select accent="magenta">…</Select>
```

## Accessibility

- The trigger has the `combobox` role and announces `expanded` and `disabled`. On the web
  it carries `aria-controls`, `aria-expanded`, `aria-invalid`, and is labelled and
  described by the label, description and error.
- An item has the `option` role and announces `selected` and `disabled`.
- The list is a `listbox` on the web and a `list` on a phone, whose roles have no
  `listbox`.
- A choice is felt as a `selection` haptic through `TramProvider`'s `onHaptic`.
- The box unfolds and the border changes on the `navigation` spring; the page swivels in
  on its top edge and its choices arrive in cascade. Under reduced motion the height is
  set at once and the list fades.

## Differences from Native

- **No `variant`.** Native's four are four fills of the box; the Metro box has one — the
  ground inside a line.
- **`accent`** is added.
- **`mode`** (`inline` / `fullscreen`) is added on `Select.Content`, whose eight placement
  props — `placement`, `align`, `offset`, `alignOffset`, `avoidCollisions`, `insets`,
  `width`, `minWidth` — are dropped: the list is part of its field or the whole screen.
- **`Select.ItemIndicator`** draws nothing unless given `as`; Native draws a check.
- **Roles**: the trigger is a `combobox` and an item an `option`; Native uses `button`
  and `menuitem`.
- **Disabled** is grey, not dimmed, and does not open.
- **A touch on the label** opens the list.
- **`Select.Overlay`** closes on a touch above or below an unfolded list, not beside it;
  on a page, `isDismissable` is the system's back.
- **A page reads no safe area**: `Select.Content` is padded by the app.
