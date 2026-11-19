---
'@xaui/native': patch
---

`@xaui/native/rating` exports its two pure helpers as `ratingFill` and `snapRating`, and `@xaui/native/number-pad` its three as `appendPadKey`, `removePadKey` and `isPadComplete`, so `@xaui/tram` reads them instead of restating them. The `Rating` and the `NumberPad` behave as before.
