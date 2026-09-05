---
'@xaui/native': patch
---

The front toast can be thrown away with a swipe, like HeroUI's.

Away from its edge — up on a top stack, down on a bottom one — past 50 points or 500 points
a second, their thresholds, either alone being enough. Dragged the wrong way it resists
rather than refuses: the whole screen's travel maps onto 40 points. The throw carries on at
the speed the finger left it and the record goes a moment later, so a hard flick leaves
faster than a soft one.

Only the front card. The ones behind show a seven-point shoulder, which is a target under
any reasonable minimum, and dragging the second card out from under the first reads as a
glitch rather than as a dismissal. `isSwipeable={false}` on the host turns it off.

Note that this dismisses **one** card and the pile empties a swipe at a time — HeroUI's
gesture calls `hide(id)`, not a clear-all, and their provider has no such thing.

The gesture runs on `react-native-gesture-handler`, already an optional peer, reached only
through `@xaui/native/toast`.
