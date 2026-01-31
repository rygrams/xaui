---
'@xaui/native': patch
---

feat: introduce Autocomplete component with comprehensive filtering and customization

Add new Autocomplete component to the native package with the following features:
- Text input with real-time filtering of options
- Support for controlled and uncontrolled state (selectedKey, inputValue)
- Multiple variants: outlined, flat, light, faded, underlined
- Customizable label placement: inside, outside, outside-left, outside-top
- Menu trigger modes: focus, input, manual
- Clear button support with isClearable prop
- Custom value support with allowsCustomValue prop
- Animation support with Reanimated
- Full theme integration with color schemes
- Disabled keys support
- Error and description message display
- Start/end content slots for custom icons
- Responsive listbox positioning
- Empty state handling with allowsEmptyCollection
