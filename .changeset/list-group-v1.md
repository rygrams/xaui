---
'@xaui/native': patch
---

feat(list): `ListGroup` — the sectioned list

The settings screen: sections side by side, each under what its rows have in common, with
the sentence underneath that says what the switch actually does.

**It is a group of `List`s, not a `List` with headings in it.** A list draws its container
and its separators **between its own children**, so a heading placed among the rows would
get a hairline above and below it and would sit inside the card it names. Sections are
containers side by side, and a heading belongs outside them.

**`ListGroup.Section` exists because proximity is the only thing grouping a header with its
list** — nothing draws a box around a section. One gap on the group would put a heading
exactly as far from its own rows as from the section above it, so there are two gaps, on the
two roots that own them (R4). That ratio is the whole design.

The header is inset by the **row's own padding**, read off the `List`'s size table rather
than guessed, so the heading and the text it heads share a left edge; the footer is inset
with it. `ListGroup.Header` carries `accessibilityRole="header"`, which is what lets a
screen reader jump between sections. The footer carries none — a footnote is prose.

`variant`, `size`, `radius`, `color` and `hasSeparator` are handed down as **defaults**, and
a list that names its own wins: a settings screen is uniform, and setting `variant` on five
lists is five chances to set it differently. `isDisabled` is the one that is not a default.
A `List` outside any group is unchanged; `hasSeparator` loses its literal default so that an
unset prop can still reach the group's.

Nothing is walked and nothing is counted: the group publishes two gaps and a type scale, the
sections are ordinary children, and one can be built out of something that is not a list.

For the record, since the name is theirs: HeroUI's `ListGroup` **is our `List`** — a Surface
container with Item · ItemPrefix · ItemContent · ItemTitle · ItemDescription · ItemSuffix,
slot for slot. What ships here under that name is the thing neither of us had.
