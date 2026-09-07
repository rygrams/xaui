---
'@xaui/native': patch
---

feat(agenda-calendar): one week, and what is on it

P5.26c. **The row of marks is the whole difference**: a strip of seven numbers is a date
picker, and a strip of seven numbers with marks under some of them is an agenda.

**The cells are the `Calendar`'s own style**, resolved through `calendarRecipe` rather than a
second table — a strip and a month showing two different discs for the same chosen day is
what that sharing exists to prevent, and the two sit one above the other the moment a caller
expands one into the other.

**It is a component rather than a `layout` prop on the `Calendar` because it steps by
weeks.** A different unit means different state under it, and `layout="week"` would have been
a prop that changes what another prop means. Everything genuinely shared is shared; the API
is not, because the two do not do the same thing.

**No day is ever "outside".** All seven are on screen and all seven are choosable — a strip
that greyed out the two days belonging to next month would be greying out days it is showing.
Only the bounds make a day inert, and the chevrons go dead when the week they would reach has
none left.

**Today moves the strip; it does not choose today.** The two are one press apart, and a
button that quietly answered the question would be a button you cannot use to look. It goes
dead — and now reads dead — while this week is already the one showing.

`events` is a list read by day and turned into a set once per change, rather than a scan per
cell. The title names the month of the week's **middle** day, which is always the majority
month of a seven-day window and the only rule that does not call a week with six September
days in it "August".
