---
'@xaui/native': patch
---

feat(chart): `Chart` — the card a figure is read on

A figure on a screen is a card with words around it, and those words are a title, a subtitle,
a number and a legend. Every one of them is a `Text` that should take the theme's type rather
than a prop on a figure — so they are slots: `Chart.Header`, `Chart.Heading`, `Chart.Title`,
`Chart.Description`, `Chart.Value`, `Chart.Legend`, `Chart.LegendItem`, `Chart.Footer`.

**The frame owns the appearance and the figure takes it.** `variant`, `size` and `color` are
handed down, so the legend's dots and the figure's series are the same colours in the same
order without either being told twice — which is the whole reason `Chart.Legend` can exist
rather than being a prop on a figure. A figure that names its own still wins, and one outside
a frame is unchanged.

`seriesCount` is the one number the frame asks for: it cannot count the figure's series,
because it has not rendered the figure and the keys are that figure's props, and a legend
needs the palette walked to the right length or its third dot is the wrong colour.

**The labels stay the caller's.** What a series is called is a sentence in their language;
which colour it got is arithmetic the palette already did. `labels` is the short form and
children are the long one — a legend carrying a value beside each name, which is what a donut
wants under it.

**Optional in both directions.** A figure on its own draws no ground and belongs in whatever
card the caller has. A frame with no figure in it is a complete use too: a card with a title,
a value and a footer is what a chart looks like while its data is loading, or when there is
none.

`Chart.Heading` exists for `ProgressBar.Header`'s reason — the gap between a title and its
subtitle is a different gap from the one between that block and the legend beside it, and two
gaps belong to two roots. The recipe's `root` slot is now the card and the plot's box is
`plot`; the series ink moves to a slot of its own rather than riding on the root's `color`.
