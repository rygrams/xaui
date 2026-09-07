# Segment

A filter: one of a few options, chosen in place.

## Import

```tsx
import { Segment } from '@xaui/native/segment'
```

## Usage

```tsx
<Segment value={view} onValueChange={setView}>
  <Segment.Item value="dashboard">Dashboard</Segment.Item>
  <Segment.Item value="analytics">Analytics</Segment.Item>
</Segment>
```

## Anatomy

| slot            | what it is                                         |
| --------------- | -------------------------------------------------- |
| `Segment`       | The track, and the pill that slides across it      |
| `Segment.Item`  | One option                                         |
| `Segment.Label` | The word on it — written for you from a text child |

## It is not `Tabs`

They wear the same clothes: a pill sliding under the chosen option inside a filled track, on
the theme's own `segment` / `segmentForeground` tokens. They do different jobs.

|                   | `Tabs`                         | `Segment`                    |
| ----------------- | ------------------------------ | ---------------------------- |
| what it is for    | places to go                   | a value something else reads |
| what it holds     | panels, through `Tabs.Content` | nothing — the value is yours |
| what it announces | `tablist` / `tab`              | `radiogroup` / `radio`       |
| the indicator     | a slot; `light` has none       | drawn by the root, always    |

A tab bar **wraps content**: its triggers name panels that live under it. A segment names
nothing — it holds a value, the way a radio group does, and what reads that value is
somewhere else on the screen. Which of the two a control is, is what a screen reader hears,
so it cannot be a flag on one component.

## The pill is not a slot

`Tabs` makes you write `<Tabs.Indicator />` because a tab bar can be `light` and have no
indicator at all. A segment without its pill is not a segment, so the root draws it and
there is nothing to remember.

`color` is how you move it — see below.

## Separators, for a list long enough to need dividing

`hasSeparator` draws a hairline between the options the pill is nowhere near. It is off by
default: the pill already says which option is chosen.

**Both edges of the pill stay clear.** A rule running into a raised surface reads as a crack
in it, so neither the chosen option's own leading rule nor the one belonging to the option
after it is drawn. That is the behaviour iOS has had since the segmented control was
introduced, and it is why one does not look like a table.

The rule belongs to the option on its **trailing** side, which is what lets an option decide
alone: the root has no way to know which of its children is which without reading their
props, and reading a child's props is introspection this library does not do. Every option
already publishes its rectangle for the pill to slide to, and an ordering is all
`hasLeadingSeparator` needs — so before the first layout nothing is drawn, and the rules
arrive with the pill rather than a frame ahead of it.

## Props

| prop            | type                      | default | description                   |
| --------------- | ------------------------- | ------- | ----------------------------- |
| `value`         | `string`                  | —       | Controlled                    |
| `defaultValue`  | `string`                  | —       | Uncontrolled                  |
| `onValueChange` | `(value: string) => void` | —       | Fires on every choice         |
| `size`          | `'sm' \| 'md' \| 'lg'`    | `md`    | Option padding, gap and type  |
| `radius`        | `RadiusKey`               | —       | Overrides the track and pill  |
| `color`         | `string`                  | —       | The tint (R7) — a raw value   |
| `hasSeparator`  | `boolean`                 | `false` | Hairlines between the options |
| `isDisabled`    | `boolean`                 | `false` | Dims it, stops every option   |
| `asChild`       | `boolean`                 | `false` | Renders the caller's element  |

No `xs`: a segment holds words, and at that height the word gets nothing.

## It hugs its options

A segment as wide as the screen with two options in it is a navigation bar pretending to be
a filter. A row that has to fill its parent is a `style` away, as everywhere else in this
library — there is no `fullWidth` prop.

## The tint reaches the word, not just the pill

`color` moves the pill **and** the label on it. `fgSelected` is a role rather than a token
named in a state, which is what makes the tint follow into the chosen option's colour — the
tint pass re-runs `paint`, not the axes. Without that, a tinted segment would slide a
coloured pill under a word that had stopped reading against it.

## The pill slides on the UI thread

`useSlidingIndicator`, shared with the `Tabs`. Nothing is drawn before the first layout —
an indicator at zero width would flash at the start of the row — and the first placement
jumps where every one after it springs, because animating the first reads as the control
arranging itself rather than as one at rest.

## Everything else is a style prop

`padding`, `gap`, `backgroundColor` — full RN names, full RN values (R14), on the root and on
every slot.
