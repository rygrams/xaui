---
'@xaui/native': patch
---

`Button` gains `isRipple`

A button mounts no overlay by default — the recipe's `pressed` state already paints the
variant's own pressed colour, and a wave on top of it would darken the control twice.
`isRipple` opts in without composing anything.

It follows the bargain `isLoading` already makes: the prop is the shorthand, composing a
`<PressableFeedback.Ripple />` yourself is how you give the wave its own `style` or
`animation`, and doing both mounts one wave rather than two. Under `asChild` it does
nothing and says so in dev — the caller's element is the button, so there is no sibling to
insert the wave next to, and it has to be composed inside that element.
