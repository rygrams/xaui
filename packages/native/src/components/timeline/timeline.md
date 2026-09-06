# Timeline

What happened, in order, with a line through it.

## Import

```tsx
import { Timeline } from '@xaui/native/timeline'
```

## Usage

```tsx
<Timeline>
  <Timeline.Item status="success">
    <Timeline.Leading>09:12</Timeline.Leading>
    <Timeline.Rail />
    <Timeline.Content>
      <Timeline.Title>Commande passée</Timeline.Title>
      <Timeline.Description>Paiement accepté.</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

## The air between two entries is inside the one above them

There is **no `gap` on the root**, and there cannot be: the rail runs the full height of its
entry, so a gap would be a break in the line.

`density` is the entry's own bottom padding — and it lives on `Timeline.Content`, not on
`Timeline.Item`. A padding on the entry is _inside_ its box, so the rail, a child of that box,
stops above it and the line breaks at every step. On the content it makes the row taller
instead, and the rail, stretched to the row, runs through it.

## `status` is not `variant`

A variant says how loud something is. These say **what happened**, which is why a timeline is
the one place in the library where a per-item prop names an intent.

| status    | the marker                |
| --------- | ------------------------- |
| `default` | the page's ink            |
| `muted`   | the separator's grey      |
| `current` | the accent, as a **ring** |
| `success` | green                     |
| `warning` | amber                     |
| `danger`  | red                       |

`current` is the odd one and deliberately so: a ring rather than a disc, so "being done"
tells itself apart from "done" without relying on a hue.

**The six markers are resolved once, on the root.** An entry picks one rather than resolving
its own recipe (R5) — six resolutions on the root are six cache hits, and one per entry on a
fifty-entry list is not.

### The tint reaches two of them

`color` lands on `default` and `current`, and the **root names those two explicitly**. It has
to: a token named `success` is a bare name, so `resolveTint` maps it to the tint like any
other and a blue app would turn its green "succeeded" marker blue. A timeline's greens and
reds mean what happened, and a tint that repainted them would be a tint that lied.

## The rail is two halves

`Timeline.Rail` with no children draws the arrangement every timeline is: the upper half of
the line, the marker, the lower half. Children replace all three.

```tsx
<Timeline.Rail>
  <Timeline.Connector edge="above" />
  <Timeline.Marker>
    <Icon as={CheckIcon} />
  </Timeline.Marker>
  <Timeline.Connector edge="below" />
</Timeline.Rail>
```

**Two halves rather than one line, and that is what makes `align` work.** Below the marker
both are a share of the height, so it centres; above it the upper half is a fixed inset —
half the title's line — so it sits level with the first line of the text. One connector could
do neither.

**The end segments are left off**: the first entry has nothing above it and the last has
nothing below it, and a line running off the top of a list is a list that has been cut.
`force` draws one anyway, for a timeline that continues past what is on screen.

The first entry's upper half is still a **spacer** rather than nothing: the marker's place is
decided by what is above it, so removing it would lift the first dot out of line with every
other one.

## `Timeline.Leading`

The column before the rail — a time, a date, a step number. **Right-aligned and a fixed
width**, which is what makes a column of times read as a column: ragged times beside a
straight rail look like a mistake.

A `Text`, because that is what it almost always is. Something taller goes in a `View` you
write.

## `align`

`start` (the default) puts the marker level with the first line of the title, which is what a
list of events wants. `center` centres it against the whole entry, which is what a list of
two-line cards wants.

`itemAlign` on the root is the default; an entry's own `align` wins.

## Order is JSX order

`Timeline.Leading`, then the rail, then the content — R4, and nothing here reorders them. A
timeline whose times sit on the right is that JSX written the other way round.

## See also

- **`List`** — for rows that are not a sequence.
