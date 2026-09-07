---
'@xaui/native': patch
---

`NumberStepper` — Track · Decrement · Value · Increment

P5.3e, net new. The increment pair the legacy `Stepper` is not — that one is a progress
indicator, and this is a control.

**It is not a `NumberField` without its box.** A field is typed into and this is not: no
keyboard, no caret, no parse, no `isInvalid`, and no bounds to apply late, because a value
that can only be pressed into existence is inside its range at every moment. What the two
share is the arithmetic and nothing else — which is why `parseNumber`, `formatNumber`,
`clampNumber` and `stepNumber` **move to `utils/number.ts`** in this change, at their second
use and not by anticipation (§2 bis). Both components re-export the six from their own
subpath, so a caller never reaches into `utils/`, which is private.

**The track is a slot, and it is written first.** Out of flow and painted behind everything
after it, so its place in the JSX is what puts it under the rest — `Slider.Track`'s
arrangement. The inset is the shape: the buttons are the control's full height and the pill
is shorter, so the two circles stand proud of the ground between them. A pill as tall as its
buttons is a segmented control, which says "pick one" rather than "more of it".

**The variant paints the buttons**, because they are what a finger is aimed at. Four
emphasis levels, no intents — a stepper reports nothing. `secondary` is the default and the
one departure from the vocabulary table: it names `surface` rather than `default`, because
a `default` button on a `defaultSoft` pill is two greys a shade apart and stops reading as
raised at all.

**Each button owns its own press state.** Two buttons on one control are two targets, so
pressing the plus must not light the minus — which is why the recipe has no `bgPressed` and
the press is the shared `PressableFeedback` treatment, the `CloseButton`'s arrangement. Each
goes flat and stops taking presses when the value has nowhere left to go, asked of the
**result** rather than of the bound.

**A bin at the floor is `children` and a ternary**, not a prop: the condition is a basket
row's rule rather than a stepper's, and a caller's own `onPress` replaces the step rather
than running beside it — removing the row is not also decrementing it.

`NumberStepper.Value` takes a function child for a unit or a plural, and writes an **em
dash** rather than a zero while nothing has been pressed.
