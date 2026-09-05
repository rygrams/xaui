---
'@xaui/native': patch
---

`Skeleton` drops its `variant`

It shipped with two — the neutral fill and that fill at half — sold as the two backgrounds a
placeholder is drawn on. Measured against every surface, in both modes, the second is
**less** visible than the first everywhere:

| surface                      | `default` | the old `secondary` |
| ---------------------------- | --------- | ------------------- |
| the page (light)             | **1.216** | 1.100               |
| a `default` `Card` (light)   | **1.269** | 1.119               |
| a `secondary` `Card` (light) | **1.075** | 1.036               |
| the page (dark)              | **1.336** | 1.123               |
| a `default` `Card` (dark)    | **1.189** | 1.090               |
| a `secondary` `Card` (dark)  | **1.000** | **1.000**           |

So it was never the answer to "this block reads as a hole" — the full fill is the _more_
visible of the two on the very surface that claim named. And on a `secondary` `Card` in dark
mode both resolve to that surface's own `#27272a` and vanish, which is precisely the case
the pair existed to cover: `default` and `surfaceSecondary` are the same colour there.

A skeleton has to contrast with whatever sits under it, and a fixed token cannot know what
that is — two frozen values were never going to cover three surfaces times two modes. The
block paints `default`, the neutral fill the rest of the library uses for a `secondary`
`Button`, and `color` is the way past it: honest about being a raw value rather than a name
that promises a system.

The recipe keeps a single-entry `variantTokens` all the same, because `resolveTint` maps the
roles a variant declares and that mapping is what lets `color` land on the block.
