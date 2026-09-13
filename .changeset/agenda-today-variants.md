---
'@xaui/native': patch
---

feat(agenda-calendar): the Today pill answers the variant

The four variants aimed the chosen day and nothing else, so a strip whose selected day was a
soft wash sat under a pill that had kept a hard accent border — two levels of emphasis on one
card, from one prop. The pill now resolves from the same `variant`: outlined with the word in
the accent on `primary`, a soft accent fill on `secondary`, a neutral one on `tertiary`, the
bare word on `ghost`. `primary` is what the pill already looked like, so nothing moves for a
caller who never set the prop.

**The emphasis runs the other way round from a `Button`'s**, and on purpose: `primary`
outlines rather than fills. The pill sits between two bare chevrons, and the filled accent
that makes a `Button` primary would read there as the primary action of the whole card, so
the accent goes on the word instead — which is where the strip's own accent already is.

A raw `color` follows the variant rather than one fixed role: the border and the word on
`primary`, the fill on `secondary` and `tertiary`, the word on `ghost`. That is `resolveTint`
mapping the roles the variant declared, with nothing per-variant to say about what `color`
means.
