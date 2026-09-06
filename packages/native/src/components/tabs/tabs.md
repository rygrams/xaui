# Tabs

A row of tabs, and what each one shows.

## Import

```tsx
import { Tabs } from '@xaui/native/tabs'
```

## Anatomy

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="…">
      <Tabs.Label>…</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="…">…</Tabs.Content>
</Tabs>
```

- **`Tabs`** — holds what is chosen, and every trigger's measured rectangle.
- **`Tabs.List`** — the row the triggers sit in, and the box the indicator slides inside.
- **`Tabs.Trigger`** — one tab. It measures itself.
- **`Tabs.Label`** — its text.
- **`Tabs.Indicator`** — the one node that says which tab is chosen.
- **`Tabs.Content`** — what a tab shows.

## Usage

### Basic

```tsx
<Tabs defaultValue="all">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="all">Tout</Tabs.Trigger>
    <Tabs.Trigger value="unread">Non lus</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="all">…</Tabs.Content>
</Tabs>
```

A stringifiable trigger becomes its label (R3), which is what makes the common case one
line per tab.

### Three shapes

```tsx
<Tabs variant="light">…</Tabs>
```

| variant     | track            | indicator        | chosen label        |
| ----------- | ---------------- | ---------------- | ------------------- |
| `primary`   | filled, rounded  | a pill behind it | `segmentForeground` |
| `secondary` | a hairline under | a two-point rule | `foreground`        |
| `light`     | none             | none             | `accent`            |

Three affordances rather than the same one louder, which is why the union is three rather
than the usual four.

`light` is the quietest a tab bar can be and still be one: no track, no rule, nothing but
the chosen tab's label going to the accent. The colour is the whole signal, which is why it
goes to the accent rather than to plain ink — a tab merely darker than its neighbours is not
chosen, it is just darker. It belongs over content that is already busy, and not where a bar
has to be found before it can be read.

`Tabs.Indicator` draws nothing under `light`, whether you leave it in or take it out.

### Widening the bar

```tsx
<Tabs.List style={{ alignSelf: 'stretch' }}>
  <Tabs.Indicator />
  <Tabs.Trigger value="all" style={{ flex: 1 }}>
    Tout
  </Tabs.Trigger>
</Tabs.List>
```

The list hugs its tabs by default. A tab bar as wide as the screen with three tabs in it is
a segmented control pretending to be a navigation bar, so widening it is a decision you
make rather than one you undo.

### No indicator

Leave `Tabs.Indicator` out and the label's colour is the only thing saying which tab is
chosen. That is a legitimate bar, and it is why the indicator is a slot rather than
something the list conjures.

### Style as props

```tsx
<Tabs.List padding={6} />
<Tabs.Trigger paddingHorizontal={20} />
<Tabs.Label fontSize={18} />
```

Full RN names, full RN values (R14). Every node takes them.

## Separators, for options that are peers

`hasSeparator` draws a hairline between the tabs the pill is nowhere near — the thing that
separates a segmented control from a tab bar wearing the same clothes.

It is **off by default**. The pill already says which tab is chosen; the rules are what a
segmented control adds when its options are things to compare rather than places to go.

**Both edges of the pill stay clear.** A rule running into a raised surface reads as a crack
in it, so neither the selected tab's own leading rule nor the one belonging to the tab after
it is drawn. That is the behaviour iOS has had since the segmented control was introduced,
and it is why a segmented control does not look like a table.

The rule belongs to the tab on its trailing side, which is what lets a trigger decide alone:
the list has no way to know which of its children is which without reading their props, and
reading a child's props is introspection this library does not do. Every trigger already
publishes its rectangle for the indicator to slide to, and an ordering is all this needs —
so before the first layout nothing is drawn, and the rules arrive with the pill rather than
a frame ahead of it.

## Props

### `Tabs`

| prop            | type                                  | default   | description                     |
| --------------- | ------------------------------------- | --------- | ------------------------------- |
| `variant`       | `'primary' \| 'secondary' \| 'light'` | `primary` | A pill, a rule, or colour alone |
| `size`          | `'sm' \| 'md' \| 'lg'`                | `md`      | Trigger padding, gap and type   |
| `radius`        | `RadiusKey`                           | —         | Overrides the track and pill    |
| `color`         | `string`                              | —         | The tint (R7) — a raw value     |
| `value`         | `string`                              | —         | Controlled                      |
| `defaultValue`  | `string`                              | —         | Uncontrolled                    |
| `onValueChange` | `(value: string) => void`             | —         | Fires on every choice           |
| `hasSeparator`  | `boolean`                             | `false`   | Hairlines between the tabs      |
| `isDisabled`    | `boolean`                             | `false`   | Dims the bar, stops every tab   |

No `xs`. A tab is a target before it is a label, and at that height there is nothing left
of it.

### `Tabs.Trigger`

`value` (required), `isDisabled`, `asChild`. `children` may be a function taking
`{ isSelected, isPressed, isDisabled }`.

### `Tabs.Content`

`value` (required). **Mounted when its tab is chosen, absent otherwise** — a tab bar over
four screens of content should not have four screens of content mounted. A panel that must
keep its state across a switch is one you hold the state for, which is the same trade every
router makes.

## Motion

The indicator is **one node sliding**, not a border on each tab appearing and disappearing.
The triggers publish their rectangles on layout, the root keeps them, and the indicator
springs between them on the UI thread — so it keeps travelling while whatever the new tab
shows is mounting.

Softer than the chevron's spring: damping 20 against stiffness 220 at mass 0.6. That one
turns 180 degrees and must not overshoot; this one slides a few dozen points, and a touch
of overshoot is what makes it feel attached to the press.

**The first placement jumps rather than springing.** Animating it would slide the pill in
from the start of the row on mount, which reads as the tab bar arranging itself rather than
as a control at rest. Until a rectangle exists the indicator renders at zero opacity, so
there is no flash at the start of the row either.

## Not here yet

**A scrollable list.** HeroUI's `Tabs.ScrollView` centres the chosen tab when the bar
overflows, and that means the indicator has to account for a scroll offset the triggers'
own layout does not report. Worth its own change.

**`Tabs.Separator`.** A hairline between tabs in the `secondary` shape.

## Accessibility

The list is a `tablist`, each trigger a `tab` carrying `selected`, each panel a `tab`.

## Migration from `@xaui/native-legacy`

| Legacy                     | v1                                 |
| -------------------------- | ---------------------------------- |
| `<Tabs tabs={[…]} />`      | one `<Tabs.Trigger>` per tab       |
| `activeIndex`              | `value` — a string, not a position |
| `onIndexChange`            | `onValueChange`                    |
| `variant="segmented"`      | `variant="primary"`                |
| `variant="underline"`      | `variant="secondary"`              |
| `customAppearance={{ … }}` | `style` on the slot that key named |

**A tab is named, not numbered.** An index breaks the moment a tab is inserted, and it is
what made the legacy component's `activeIndex` a prop nobody could hold correctly.
