---
'@xaui/native': patch
---

Add `PressableFeedback` to `@xaui/native/system`: the touch feedback every pressable
component shares, instead of an animation file per component.

It renders the pressable root and is **controlled** — the component above owns `isPressed`,
because its recipe resolves on that value and needs it before rendering. The root scales
under the finger; anything laid over it is composed rather than named by a prop, through
the `PressableFeedback.Highlight` and `PressableFeedback.Ripple` parts.

`asChild` goes **through** this component rather than around it: a root swapping it for a
bare `Slot` would render the child with no touch feedback at all. `isDisabled` replaces
React Native's `disabled` (R8), and each overlay takes its own `animation` — `false`, or a
`duration` and `opacity` — over the blanket one on the root.

`animation` on the root accepts `false`, `'disabled'`, `'disable-all'` or an object
switching sub-animations off one at a time. Turning animations off renders a different component
rather than the same one with a branch inside, so no Reanimated hook is reached and no
worklet is mounted. `'disable-all'` reaches descendants through context, so a long list
disables every row's worklets with one prop.

Also types `XAUITheme['fontWeights']` as React Native's own `fontWeight` instead of
`string`, which does not assign to it — every component reading `t.fontWeights.medium`
would otherwise have needed a cast.
