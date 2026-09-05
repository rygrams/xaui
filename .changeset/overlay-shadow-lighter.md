---
'@xaui/native': patch
---

The `overlay` shadow gets lighter

It was a 24-point blur eight points down, at 16 of Android's elevation. Android draws
elevation on its own curve and draws it strongly, so a panel that read as lifted on iOS
read as detached on Android — a dark halo about as wide as the gap between the panel and
the field it came out of.

Half the elevation, two thirds of the blur, half the offset: still "above the page",
without the panel looking cut out of it.

|           | before       | after         |
| --------- | ------------ | ------------- |
| offset    | `0, 8`       | `0, 4`        |
| blur      | `24`         | `16`          |
| elevation | `16`         | `8`           |
| opacity   | `.14` / `.6` | `.10` / `.45` |

It is the token rather than the component because a recipe names tokens and computes
nothing — and because `Dialog`, `BottomSheet`, `Popover` and `Menu` are all going to read
this one. `Select` is its only consumer today, so nothing else moves yet.
