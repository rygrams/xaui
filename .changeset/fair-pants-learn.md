---
'@xaui/native': patch
---

Add multiple usability and stability improvements across toolbar, datepicker, and timepicker.

- fix toolbar icon export usage and adjust toolbar action icon sizing/layout behavior
- fix Reanimated UI-thread/worklet issues in toolbar and timepicker animations
- add `TimePickerTrigger` component (datepicker-style trigger API) and export it from `@xaui/native/timepicker`
- improve timepicker interaction:
  - faster hand rotation animation
  - corrected hand direction to selected hour/minute
  - manual text input now updates time and hand state correctly
  - reduced center marker size and hand selection dot size
- improve 24-hour timepicker hour layout with paired inner/outer ring positions (`1-12` and `13-24`)
