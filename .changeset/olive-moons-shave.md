---
'@xaui/native': patch
'@xaui/hybrid': patch
---

The `default` variant reads as grey rather than as near-white

Light `default` was zinc-100 on a white background — a fill faint enough to be mistaken
for no fill at all, where dark's zinc-800 sits clearly off its own background. One step to
zinc-200 balances the two modes instead of shifting one.

The derived layer follows from the single source: `defaultPressed`, `defaultSoft` and
`defaultSoftPressed` move with it, so `tertiary` and `ghost` keep a pressed state that
matches the new grey. Both packages regenerate their `tokens.gen.ts` from that source.
