---
'@xaui/native': patch
---

feat(date-picker): a field that opens a month

P5.26, and it owns almost nothing — which is the design. The trigger **is** a `Select`'s
trigger, the panel **is** a `Select`'s panel, and the grid **is** a `Calendar`, all three by
construction rather than by resemblance: a select and a date field in one form cannot drift
apart, and a calendar in a picker cannot differ from one on a page.

What it adds is the wiring, and every piece of it is a place two things could otherwise
disagree: the day read into the field through `Intl`, a panel that closes when a day is
pressed, and **one** set of bounds that the field, the grid and the chevrons all read.
`DatePicker.Calendar` takes the `Calendar`'s props _minus_ the ones the picker already owns,
because two sources for one of them would be two answers to one question.

**The panel is as wide as the grid, not as wide as the field.** A list is as wide as the
field that opens it because its rows are that field's answers; a month grid is seven columns
of a fixed cell, and squeezing it into a narrow field would crush the cells or clip the week.
So `width` defaults to `content-fit`, and the calendar is given an explicit `7 × cell` read
off the `Calendar`'s own ladder — a grid of seven percentage columns inside a box with no
width of its own measures zero.

**The field's level is not the calendar's.** A `ghost` field over a `primary` calendar is the
ordinary case — the trigger is quiet on the form and the chosen day is not — so `variant`
dresses the field and `calendarVariant` dresses the grid, while `color` reaches both.

**The month on screen stays the calendar's own state.** Opening the panel a second time after
paging leaves you where you were, and choosing a day in another month still works.

`closeOnSelect` is on by default: a picker whose only job is one date has been answered the
moment a day is pressed. Off, the caller writes their own footer under the grid through
`DatePicker.Calendar`'s children.

`calendarRecipe`'s size table is now exported for the width above, alongside the `List`'s,
which the `ListGroup` exports for its header inset — same reason, same shape.
