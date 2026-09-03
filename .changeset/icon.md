---
'@xaui/native': patch
---

Add `Icon` to `@xaui/native/system`.

An icon is a third-party component, so a slot context never reaches it and every call site
ends up computing the colour by hand. `Icon` closes that: three forms — a component through
`as` (`size` and `color` injected, covering Lucide, Ionicons and vector-icons), a raw
`react-native-svg` element as children, or an image through `source` — all resolving the
same way. An explicit prop, else what the surrounding slot published through `IconContext`,
else the theme.

For a raw SVG the resolved values win over the element's own `width`, `height` and `color`:
one arriving from a design tool carries a baked-in size, and inheriting the slot's instead
is the point of wrapping it. `react-native-svg` stays an optional peer — nothing here
imports it, the raw-SVG form only clones an element the caller already made.
