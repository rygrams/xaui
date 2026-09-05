---
'@xaui/native': patch
---

The toast stack collapses, like HeroUI's.

It was a flex column with a gap: every card fully visible, one under the next, so six
toasts took six card heights down the screen. HeroUI's is a pile — one card in front, the
rest scaled down and pushed toward the edge behind it, only their shoulders showing.

Every card is now anchored to the same edge and its depth is entirely in its transform:
`translateY: 10` toward the edge and `scale: 0.97` per step, their values, read off their
`toast.animation.ts`. A pile of eight costs the height of one. The ladder does not clamp —
their interpolation clamps the front side only, so the fourth card is genuinely further
back than the third rather than sitting on it and reading as one.

`limit` becomes `maxVisible`, and it no longer discards. A card past it is transparent,
keeps its timer and its place, and is promoted into view when the one in front leaves — so
a burst of six shows all six instead of losing three.
