---
'@xaui/native': patch
---

Add InputTrigger, Picker and ColorPicker components

- `InputTrigger`: pressable view styled identically to a text input (same variants, sizes, radius, label placements) but non-editable — designed as a trigger for overlays, sheets, and dialogs
- `Picker`: bottom sheet item selector with InputTrigger trigger, chevron indicator, checkmark on the selected item, and support for disabled options
- `ColorPicker`: bottom sheet color palette picker with a color swatch trigger showing the selected color and its hex value; ships with a built-in Tailwind-inspired palette and supports custom color groups
