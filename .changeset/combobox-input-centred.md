---
'@xaui/native': patch
---

Fix the text typed into `Combobox.Input` and `Autocomplete.Search` sitting at the bottom of the field on iOS. Both were single-line `TextInput`s carrying a `lineHeight`, which iOS lays out above the glyphs; they now take the size of the type and no line height, as the `TextField` does.
