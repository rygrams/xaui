---
'@xaui/native': patch
'@xaui/native-legacy': patch
---

feat(alert): the v1 `Alert` — P3.6

A message the interface has to make sure is read. Compound root plus five slots:
`Alert.Icon`, `Alert.Content`, `Alert.Title`, `Alert.Description` and `Alert.Close`, laid
out as a row of three columns spaced by the root's `gap` alone.

Nine variants: the `Card`'s `surface` for the neutral level — HeroUI's alert root, token
for token, shadow included — and the `Chip`'s status ladder for the rest, each family in
its full and soft slice.

Visually aligned with `heroui-native`: 12pt of padding, a 12pt gap, a 24pt radius, a 16/24
title above a 14/20 description and an 18pt icon at `md`. The icon's optical offset is
derived from the title's leading rather than hard-coded, so it stays right at all four
sizes.

The root is **never a control** — no `isPressable`, no press behaviour on the type. What
you press is `Alert.Close`, which now comes from a shared `system/close-button`: the
`Chip`'s close became its second use, so its press state, grown touch target, missing-label
warning and built-in cross are written once and both components are five-line call sites.

Also fixes an inference bug in `createRecipe`: a `compoundVariants` entry declared the
variant union instead of selecting from it, so a recipe whose only compound was
`{ when: { variant: 'default' } }` rejected every other variant at the call site.
