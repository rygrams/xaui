---
'@xaui/native': patch
---

`Stepper` — where you are in a sequence of steps.

**The value is the caller's, always.** There is no `defaultValue` and no `onValueChange`,
because nothing inside a stepper can move it: a step is not a control, it is a report. The
number comes from the form, the wizard or the route that actually knows, and an
uncontrolled stepper would be a piece of state that could never change. It counts from one,
so `value={2}` is "step 2 of 4" — the number you would say out loud rather than an index.

**The root numbers its children.** An item declares no index and no key: JSX order is step
order, so inserting a step in the middle renumbers the rest by being there. It is the
reasoning that puts the `Accordion`'s separators on its root — what an item cannot know
about its neighbours belongs to the thing that has them all.

**Three statuses, and they are an order.** Every step before the current one is completed
and every step after it is upcoming. A completed step keeps its full contrast — it is a
thing you did, not a thing greyed out — and what recedes is the road ahead. The line under
the current step is still track: the stepper has not left that step yet.

**Two orientations that differ by more than the axis.** `vertical` puts the indicator beside
the text and aligned to the top of it, with the line running down through whatever height
that text takes; it is the layout that can carry a description at all. `horizontal` centres
each indicator over its label and gives every step the same width, so the circles land at
even intervals whatever the labels say.

**The connectors belong to the indicator rather than to the root**, which is the opposite of
the `Accordion`'s separators: a vertical line has to run from under one circle to the next
through the text beside it, and only something inside that row can measure that height. A
horizontal step carries two halves, one either side, so its circle stays centred over its
label — and the two ends of the rail are drawn transparent rather than dropped, or the first
and last circles would slide off theirs.

**A step is not pressable**, and that is `asChild`'s job rather than a prop. A stepper where
a completed step takes you back is one composition away; one where tapping ahead skips a
form's validation is not something this component should make easy.

`color` paints the **progress and not the track**: the travelled line, the ring around the
step you are on, the disc behind the ones you are past. The road ahead stays grey, because
the untravelled track is written from the theme rather than named as a role.

The tick a completed step draws moves to `utils/check-glyph`, shared with the `Checkbox`:
two borders of an empty box a quarter turn from where they look like one, so both work in a
project that has installed no icon set.
