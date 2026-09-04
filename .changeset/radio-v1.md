---
'@xaui/native': patch
---

feat(radio): the v1 `Radio` — the `Checkbox` in a circle, with one rule changed

The ninth entry of the core. Same anatomy, same three levels on the same `field*` tokens,
same four boxes so a radio and a checkbox in one form line up — and **a press selects, it
never clears**. A set of options has no "none of these" unless one of them says so, so
`onSelectedChange` fires with `true` only, and pressing the chosen option fires nothing at
all.

There is **no group**: `RadioGroup` is a P5 component with a context of its own, not a prop
this one is missing. A set is a `useState` and a `map` over `isSelected={value === option}`,
inside a `View` with `accessibilityRole="radiogroup"` — three lines the group component will
replace rather than undo. The legacy `RadioGroup` and its shared props are named in the
migration table, so nobody discovers the gap at merge time.

`SelectionFill` moves into `system/`: the fill that fades and grows in with the mark riding
on it was the `Checkbox`'s, and this is its second use — §2 bis says extract there. The
`Checkbox`'s indicator now renders it too, which is thirty lines it no longer owns.

`Radio.IndicatorThumb` has no counterpart here: the dot is the indicator's default child,
replaced by writing children, which is the same escape hatch with one component fewer.
