# Rating

A row of marks, given or shown.

## Import

```tsx
import { Rating } from '@xaui/native/rating'
```

## Usage

```tsx
<Rating value={score} onValueChange={setScore} />

<Rating value={4.3} isReadOnly />

<Rating value={score} onValueChange={setScore} precision={0.5}>
  <Rating.Icon as={HeartIcon} />
</Rating>
```

## One component for the input and the average

The fill of each mark is a **fraction**, not a boolean, so a value of 4.3 shows three tenths
of the fifth mark. A boolean per mark would have had to round it — and rounding is exactly
what an average must not do.

`precision` governs **input only**: it is the step a press lands on, and a `value` of any
precision displays as it is whatever that says.

## The row is data, not markup

`max` says how many marks there are, so the root renders them. Five hand-written marks is a
row that disagrees with the prop the moment either changes.

`children` is therefore the **glyph** — written once, drawn once per mark:

```tsx
<Rating>
  <Rating.Icon as={FlameIcon} />
</Rating>
```

## A mark is the same glyph twice

The neutral one sits in the flow and decides how wide the mark is. The filled one is pinned
over it inside a clip whose width is the fraction given, so the glyph is cut part-way through
rather than swapped for a different one.

Which layer an instance is in comes from the **layer**, not from a prop, which is what lets
the glyph be written once: `Rating.Icon` reads its own colour from where it was placed. A
`tone` prop would have made the caller write the glyph twice and keep the two in step.

An empty mark mounts one glyph rather than two — a clip of width zero is a node per mark for
every mark not yet given.

### The default mark is `★` in both layers

Never a hollow `☆` under a solid one. A solid pair is what every store's rating looks like,
and `☆` (U+2606) is not in Android's system face, so the empty half of the row would render as
a box on the platform where most of it is read. `★` (U+2605) is present on both.

It is a character rather than an SVG, so the component needs no `react-native-svg` for the one
glyph it draws itself.

## The press reads where it landed

`locationX` over the mark's width is the fraction the finger meant, and it rounds **up** to
the nearest `precision` step. That is the only rounding that matches the gesture: a tap
anywhere in the first mark is one star rather than zero, and with `precision={0.5}` the left
half of the third mark is 2.5 while the right half is 3.

Rounding to nearest would make the first sliver of every mark select the one before it — so
the leftmost strip of the row would silently rate zero.

## Appearance

Three variants, naming which colour a **filled** mark takes: `primary` the accent,
`secondary` the neutral foreground, `tertiary` the page's own foreground for a rating on a
coloured card.

The amber every store uses is not a token, because it is not a role the theme has an opinion
about — it is `color="#f59e0b"`, which is what a raw tint is for (R7). `warning` is
deliberately not offered in its place: it is a status, and a four-star review is not a
warning.

The unfilled marks read the **neutral fill** token rather than a faint version of the filled
colour. A pale tint of the accent under a row of stars looks like a control that half failed
to load; a neutral one looks like a mark that is simply not given yet. It is the same choice
the `Carousel`'s inactive dots make, and it is why a raw `color` reaches the filled marks
only.

| `size` | mark | gap |
| ------ | ---- | --- |
| `xs`   | 14   | 2   |
| `sm`   | 16   | 2   |
| `md`   | 20   | 4   |
| `lg`   | 24   | 4   |

**No width in the recipe.** A mark is as wide as the glyph in it, which is what keeps a star
and a heart the same row without either being told how wide the other is — and the mark's
width is its type size, because a glyph is text and the clip over it has to be measured in the
unit the glyph was set in.

The two layers take the same size. A fill layer one point off would show a rim of the layer
beneath it along every edge.

## What is not here

**No label.** A "4,3 out of 5" beside the row is a `Typography` in a `Row` — the screen's,
not the rating's (R1). The moment it were a slot it would need an alignment, a format and a
language.

**No `isClearable`.** Tapping the mark you already chose to go back to nothing is a gesture
half the world's rating inputs have and half do not, so it is not a default either way. A
caller who wants it holds the value and compares, which is three words and says which
behaviour they picked:

```tsx
<Rating value={score} onValueChange={next => setScore(next === score ? 0 : next)} />
```

## Accessibility

The marks carry the role, and which role depends on the job: `button` when it is an input,
`image` when `isReadOnly` makes it a display — five buttons that do nothing is worse than one
picture that says the value, and the read-only row announces `"4.3 out of 5"` on the row
itself.

The root carries no role. A role there would have a screen reader describe the box that holds
the marks as a second thing.

A mark carries **no press feedback overlay**: the mark filling _is_ the answer to the press,
and a wash over a glyph that is already changing colour reads as two things happening to it.

## See also

- **`Slider`** — a continuous value where this is a small number of discrete marks.
