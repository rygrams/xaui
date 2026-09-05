---
'@xaui/native': patch
'@xaui/hybrid': patch
---

A pressed fill now moves one way: towards the ink of the mode.

`accentPressed`, `successPressed`, `warningPressed` and `dangerPressed` mix towards
`foreground` instead of the variant's own text colour. That text is picked for contrast, so
its lightness followed the fill's and took the direction with it: `#9333ea` carries
near-white text and lightened under the finger in light mode, while `#c084fc` carries dark
text and darkened in dark mode. Same control, opposite gesture, and nobody had decided it.

Now `#9333ea → #8533d3` in light and `#c084fc → #c691fd` in dark — darker in light, lighter
in dark — and the label's contrast rises in both modes instead of falling in one. The
neutral fills already worked this way, since `defaultForeground` and `surfaceForeground`
_are_ the mode's ink; only the four saturated intents ever flipped. `deriveTint` follows the
same rule, so a raw `color` behaves like a token under the finger as much as it does at rest.

Visible on every filled control, which today means the `Button`.
