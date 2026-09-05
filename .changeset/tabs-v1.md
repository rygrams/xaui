---
'@xaui/native': patch
---

`Tabs` — List · Trigger · Label · Indicator · Content

**The indicator is one node sliding**, not a border on each tab appearing and disappearing.
The triggers publish their rectangles on layout, the root keeps them, and the indicator
springs between them on the UI thread — so it keeps travelling while whatever the new tab
shows is mounting.

Softer than the chevron's spring: damping 20 against stiffness 220 at mass 0.6. That one
turns 180 degrees and must not overshoot; this one slides a few dozen points, and a touch
of overshoot is what makes it feel attached to the press. Its **first** placement jumps
rather than springing — animating it would slide the pill in from the start of the row on
mount, which reads as the tab bar arranging itself rather than as a control at rest.

`Tabs.Indicator` is written by the caller, inside the list. Leaving it out is a legitimate
bar, where the label's colour is the only thing saying which tab is chosen, and that is why
it is a slot rather than something the list conjures.

**Two shapes, not two emphases.** `primary` is the segmented control — a pill inside a
filled track; `secondary` is the underline. Different affordances rather than the same one
louder, which is why the union is two rather than the usual four. Both read the same two
roles, so a tint lands on either through the same names.

**A tab is named, not numbered.** The legacy component took an `activeIndex`, which breaks
the moment a tab is inserted.

**A panel is mounted only while its tab is chosen.** A tab bar over four screens of content
should not have four screens of content mounted; a panel that must keep its state across a
switch is one the caller holds the state for, which is the same trade every router makes.

No `xs`: a tab is a target before it is a label, and at that height there is nothing left
of it.

A scrollable list and `Tabs.Separator` are not here. Centring the chosen tab when the bar
overflows means the indicator has to account for a scroll offset the triggers' own layout
does not report, which is worth its own change.
