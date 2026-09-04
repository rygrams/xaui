---
'@xaui/native': patch
---

`Card` — the v1 surface, and the control it becomes.

A compound root with five slots — `Header`, `Body`, `Footer`, `Title`, `Description` — on
the same shape as the `Button`: the recipe resolves once at the root and publishes the
resolved styles, every node takes its own style props (R14), `asChild` merges into the
caller's element, and the context hook is exported so a third party can add a slot.

`variant` narrows the shared vocabulary to its four emphasis levels — `default`,
`secondary`, `tertiary`, `ghost` — over the theme's `surface*` family, with the surface
shadow on the one level that stands on the background. `size` drives padding, both gaps,
the radius and the type of the two text slots, and never a height: a card is as tall as
what it holds. `isPressable` turns the surface into a `PressableFeedback` with a press
wash, `accessibilityRole="button"` and the shared scale.

Also fixes a `NoInfer` gap in the recipe engine: a `compoundVariants` entry naming one
variant used to collapse the whole recipe's variant union to that single value.
