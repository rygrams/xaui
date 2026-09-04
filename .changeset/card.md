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

The rendering is HeroUI's card measured — `md` is 16pt of padding, a 24pt radius, an
18/28 title in `medium` over a 16/24 description, no border on a filled surface — reached
through our own vocabulary rather than through their utility classes, and with the gaps the
component owns instead of leaving to the call site.

Also fixes a `NoInfer` gap in the recipe engine: a `compoundVariants` entry naming one
variant used to collapse the whole recipe's variant union to that single value.

**`Card.Background`** — a photo, a gradient or a video behind the card. The root **hoists**
it, so JSX order does not decide stacking: a background written after the header would
otherwise cover it, which is the invisible ordering rule composition should not carry. It
reuses the marking idiom `PressableFeedback` uses for its overlays, and `markBackground` is
exported so a third party's layer is not a second-class citizen.

The clip lives on the layer rather than on the root: `overflow: 'hidden'` cuts the node's
own shadow on iOS, so clipping the card would cost a `default` one the elevation its variant
just gave it. `radius` therefore moves both slots together — a corner that moved only the
root would round the card and leave its photo square. HeroUI reaches the same feature
through a `background` **prop** and clips on both nodes, losing the shadow.

**The light `surfaceSecondary` moves up half a step**, `#f4f4f5` → `#ececee`. It sat so
close to the `background` (`#fafafa`) that a `secondary` card on the page read as no card at
all, and `zinc[200]` was already `surfaceTertiary` — so the level between them was the only
one left. It is the OKLab midpoint of the two, written in the source layer rather than added
to the palette: `PaletteShade` is derived from `zinc`, so a `150` there would have claimed
every other family has one too.
