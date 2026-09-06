---
'@xaui/native': patch
---

feat(carousel): a series of slides, and the controls to move between them

`Carousel` in the v1 shape: the slides are children rather than a `data` array and a
`renderItem`, and every control — the arrows, the dots, the counter, the thumbnails — is a
slot rather than a `showX` prop.

A slide's width comes from the measured track through `carouselMetrics`, so `itemsPerView`
and `peek` divide it rather than a number of points that is wrong on the next screen size.
The indicator follows the drag frame by frame on the UI thread, and the settled index is
derived from the same offset — which is also what makes it work under a wheel or a trackpad.
