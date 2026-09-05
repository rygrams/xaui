---
'@xaui/native': patch
---

`Dialog.Close` draws a cross when it is empty, like HeroUI's.

It was a bare pressable that rendered whatever it was given and nothing when it was given
nothing, so `<Dialog.Close />` — the first line of HeroUI's own anatomy — put an invisible
32 points in the corner. It now reads `system/close-button`, which draws the cross from two
rotated bars, and the dialog's recipe resolves the box and the bar the way `Chip.Close`
already did.

The measurements are theirs, read off their CSS rather than guessed: a 32-point disc
(`height: calc(var(--spacing) * 8)`, `aspect-ratio: 1`), filled with `default` because
their `CloseButton` is a `tertiary` button, and a `muted` cross inside it.

`asChild` is unchanged in behaviour and better in two details: the 32-point box is not
forced onto the element you hand it, and the missing-label warning no longer fires on
`<Dialog.Close asChild><Button>Compris</Button></Dialog.Close>`, where the label is the
button's own text. That second fix is in `CloseButton` and reaches every consumer.

Also exports `SliderValue`, which `SliderProps.value` and `onValueChange` both name and
which no consumer could import.
