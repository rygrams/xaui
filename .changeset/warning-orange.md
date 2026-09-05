---
'@xaui/native': patch
---

`warning` moves from the `amber` family to `orange`

The dark `warning` was `amber[400]`, a distinctly yellow 84° in OKLCh, which read as gold
rather than as a caution — next to a green `success` and a red `danger` it looked like a
third decorative colour instead of the middle of a status ladder.

Swapping the family moves both modes the same way and **narrows the gap between them**: the
two ramps sit 35° apart today at the steps we use, and 18° after. Light barely moves at all
— `amber[700]` and `orange[700]` are 11° apart and share a lightness, so the change there is
a slight warming rather than a new colour, and the contrast against `warningForeground` goes
_up_, 4.81 → 4.96. Dark moves further, because that is where the yellow was.

Everything derived follows through `deriveColors`: `warningPressed`, `warningSoft`,
`warningSoftForeground` and `warningSoftPressed`. `pnpm tokens:check` passes on both modes.

It reaches every component with a `warning` variant — `Chip`, `Alert`, `Badge`, `Spinner`
and the ones still in review — which is the point of the token layer: one line in
`tooling/tokens/source.ts`, no component touched.
