# Checkbox

A box that is ticked or not, drawn in Metro: a square with a line around it, and a square
of the accent inside once it is ticked, arriving on a spring.

The root is the row, so a tap on the label ticks the box too.

## Import

```tsx
import { Checkbox } from '@xaui/tram/checkbox'
```

## Anatomy

```tsx
<Checkbox>
  <Checkbox.Indicator />
  <Checkbox.Label />
</Checkbox>
```

- **`Checkbox`** — the row and the control. A text child is the label, and the root
  supplies the box; with no children it is the box alone.
- **`Checkbox.Indicator`** — the box and the mark inside it. Children replace the square
  and keep its motion and its place.
- **`Checkbox.Label`** — the text beside the box. It keeps the case you write.

## Usage

### Basic

```tsx
<Checkbox defaultSelected>remember me</Checkbox>
```

### Controlled

```tsx
<Checkbox isSelected={accepted} onSelectedChange={setAccepted}>
  i accept the terms
</Checkbox>
```

`onSelectedChange` fires with the new value on every tick, controlled or not.

### Composed

```tsx
<Checkbox size="lg" accent="lime" defaultSelected>
  <Checkbox.Indicator />
  <Checkbox.Label>get the newsletter</Checkbox.Label>
</Checkbox>
```

### A mark of your own

```tsx
<Checkbox.Indicator>
  <Icon as={CheckIcon} size={14} />
</Checkbox.Indicator>
```

### Indeterminate

```tsx
<Checkbox isIndeterminate={someSelected} isSelected={allSelected}>
  select all
</Checkbox>
```

Neither ticked nor empty: the mark is a bar, and a press resolves it to selected. It is a
display state and does not touch `isSelected`.

### Box alone

```tsx
<Checkbox accessibilityLabel="select row" />
```

### Invalid and disabled

`isInvalid` draws the box's line and the mark in `danger`; the label keeps its ink.
`isDisabled` greys the box, the mark and the label, and stops the press.

## Sizes

```tsx
<Checkbox size="sm">sm</Checkbox>
<Checkbox size="md">md</Checkbox>
<Checkbox size="lg">lg</Checkbox>
```

`size` drives the box, the mark, the gap and the label's type — never width. The touch
reaches past a small box.

## Colour

The mark is the theme's accent. `accent` picks one of the twenty named accents; `color`
takes a raw `#RRGGBB` and wins when both are set. The box's line stays the page's ink.
Both are ignored while `isInvalid`: an error outranks a brand colour.

```tsx
<Checkbox accent="magenta">magenta</Checkbox>
```

## Accessibility

- The root has the `checkbox` role and carries `checked` — `mixed` when indeterminate —
  and `disabled`.
- A box with no label needs an `accessibilityLabel`.
- A tick is felt through `TramProvider`'s `onHaptic`, as a `selection`.
- The mark grows from the centre on a spring; with motion reduced it fades in and out at
  its full size. `animation={false}` keeps the row its full size under the finger;
  `'disable-all'` also places the mark with no spring.

## Differences from Native

- **No `variant`**: Native's three are fills of the box at rest, and the Metro box has no
  fill — a line on the ground.
- **`accent`** is added: one of the twenty named accents, for the mark.
- **The mark** is a square of the accent, not a tick.
- **`isInvalid`** leaves the label its ink.
- **The press** shrinks the row; Native's scale, highlight and ripple are off.
- **The corner** stays within 2, the Tram radius scale.
