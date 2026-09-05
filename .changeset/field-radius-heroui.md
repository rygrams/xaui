---
'@xaui/native': patch
---

The `field` radius aligns on HeroUI's — 21 points becomes 12

`buildRadius` derived it as `base * 1.75`, which on the default base of 12 put a 48-tall
field at 21 — 87% of its geometric maximum, so it read as a gélule rather than as a rounded
box. HeroUI reaches 12 for the same control from the other side of the scale: their
`--radius-field` is an alias of their `--radius-xl`, and their base is 8 where ours is 12.

It coincides with `lg` at the default base and stays its own key, because that is what lets
a theme round its fields without rounding its cards.

Only `Input` reads it — and `TextArea` through it, since that component has no recipe of its
own and renders an `InputRoot`. `InputOTP` deliberately does not: its box is very nearly
square, where a wide field's corner is a shape nobody decided for it.
