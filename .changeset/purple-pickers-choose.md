---
'@xaui/native': patch
---

Add ColorPicker at `@xaui/native/color-picker`: a `DummyField` that opens a `Dialog` over the Tailwind palette, or that palette on its own as a grid. Two layouts — `ramps`, one named row per hue, and `mosaic`, every colour touching in one block with no labels. Ships `TAILWIND_PALETTE` — the seventeen hues plus Zinc, at eight steps each — with `Group` and `Swatch` to compose a palette of your own.
