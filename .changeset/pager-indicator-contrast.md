---
'@xaui/native': patch
---

`Pager` — the indicator is one colour at two opacities

The dots were a **pair** of tokens: the current one from the variant, the rest from the
neutral `default` fill, which is what `Carousel` does. A pair has to be chosen to contrast
with itself, and it cannot be — measured in the DOM, `tertiary` put `surface` against
`default`, which is `#ffffff` on `#e4e4e7` in light and two near-identical greys in dark. The
one variant that exists for a pager over an image was the one whose indicator could not be
read, in both colour modes.

Every dot now takes the variant's one colour, the current one at full strength and the rest at
`DOT_REST_OPACITY` (0.3, exported). That cannot collapse whatever the variant, whichever the
colour mode, and for any raw `color` a caller invents — and it is what iOS's own page control
does. 30% rather than 50%, because the dots are seven points across and at half strength a
small mark reads as the current one seen through something rather than as a mark behind it.

Three consequences:

- `secondary` is now `foreground` rather than `defaultForeground` — the page's own ink, for an
  indicator that has to read as chrome.
- A pager over a **photograph** is `color="#ffffff"` rather than `tertiary`: a photograph is a
  photograph in both colour modes, and `surface` flips with the theme. The doc said `tertiary`
  was the answer; it was not.
- `PagerDotInk` and the context's `dotInk` are gone, along with the flatten that built them —
  there is no pair for a worklet to interpolate between, so the recipe's `dot` is a plain
  style and the travel is an `opacity`.

Also adds a full-screen `Pager` verification to the demo, which is the case a section inside a
`ScrollView` cannot show, and the one that surfaced this.
