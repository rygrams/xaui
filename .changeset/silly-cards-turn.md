---
'@xaui/native': patch
---

feat(flip-card): a card with two faces, and a turn between them

`FlipCard` paints nothing and has no recipe: what turns is two faces the caller supplied, and
each is usually a `Card` with its own variant and radius. The front decides how big the card
is and the back fills it out of flow.

The two faces stay a half turn apart at every moment, which with a hidden backface leaves
exactly one of them drawn — `utils/flip.ts` is that relationship, tested, including the case
it exists to prevent.
