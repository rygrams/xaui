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
<Timeline.Rail marker={28}>
  <Timeline.Connector edge="above" />
  <Timeline.Marker>
    <Icon as={CheckIcon} />
  </Timeline.Marker>
  <Timeline.Connector edge="below" />
</Timeline.Rail>
```

**`marker` is how a composed rail says how tall its marker is.** The upper half of the line is
a height, and the only height the rail can work out on its own is the dot's — so a rail
carrying a 28pt circled icon and told nothing places it eight points below the title it
labels. It clamps at zero: something taller than the title's own line cannot be centred on it
without hanging over the top of the entry.

**Two halves rather than one line, and that is what makes `align` work.** Below the marker
both are a share of the height, so it centres; above it the upper half is a fixed inset —
what is left of half the title's line once the dot's own half is taken off — so the dot's
centre lands on the middle of the first line of the text. One connector could do neither.

That inset is **derived, not chosen**: `(lineHeight(title) - marker) / 2`. Written by hand it
drifts, and a marker a point or three below the words it labels is exactly what a reader
reads as a crooked list.

**The end segments are left off**: the first entry has nothing above it and the last has
nothing below it, and a line running off the top of a list is a list that has been cut.
`force` draws one anyway, for a timeline that continues past what is on screen.

A segment that is left off is still **drawn, just not painted** — only its colour goes, its
flex stays. The marker's place is decided by what is above and below it, so a half that
collapses to nothing lifts the first dot to the top of its entry and drops the last one to the
bottom; on `center` that is the whole height of an entry's worth of error.

**The rail's column is a `minWidth`, not a width.** A composed marker wider than the dot — a
circled icon, a number — widens the column instead of spilling out of it and landing on the
words. The line stays centred in it either way.

## The gutter

`Timeline.Item` is a row with a `gap`, and that is where the air between the time, the rail
and the words lives. It cannot be padding inside the rail: the rail's own slack is what
centres the line in it, so widening it to make room for the text moves the line rather than
the text.

## `Timeline.Leading`

The column before the rail — a time, a date, a step number. **Right-aligned, a fixed width,
and tabular figures**, which together are what make a column of times read as a column:
letting each time be as wide as its own text is what makes them ragged, and proportional
digits leave `11:06` narrower than `10:43` even after that.

**It sits on the line the marker sits on** — the middle of the title's first line, not the top
of the row. A time is set smaller than the title it labels, so a cell that simply starts at
the top puts the time above both the dot and the words. It follows `align` for that: an inset
on a `start` entry, `alignSelf: 'center'` on a `center` one.

A `Text`, because that is what it almost always is. Something taller goes in a `View` you
write.

A time written on the **right** is content rather than a leading cell, and it has the same two
requirements: put it on the title's row and give it `fontVariant: ['tabular-nums']`.

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
