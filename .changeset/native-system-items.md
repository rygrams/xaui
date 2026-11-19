---
'@xaui/native': patch
---

`system/` gains `items/` — `collectItemLabels`, `readItemLabel`, `filterItems` and `matchesQuery`, the rows of a list read off its elements and filtered by what is typed, moved out of the private `utils/` onto `@xaui/native/system` so `@xaui/tram` reads them instead of restating them. `@xaui/native/phone-number-field` now also exports its pure helpers — `phoneCountries`, `filterPhoneCountries`, `readPhoneNumber`, `editPhoneNumber` — the way `@xaui/native/mask-field` exports `maskInput`. The `Select`, `Autocomplete`, `Combobox` and `PhoneNumberField` behave as before.
