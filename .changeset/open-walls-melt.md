---
'@xaui/native': patch
---

fix(native): fix dark mode background colors on Button, FAB, Badge and SegmentButton

- Button, FAB: solid variant uses colorScheme.background in dark mode instead of colorScheme.main; flat variant uses withOpacity(background, 0.5) so it is never darker than solid
- Button, FAB: solid text/icon color switches to colorScheme.main in dark mode for proper contrast
- Badge: apply same dark mode color logic across solid, flat, faded and shadow variants; increase text fontWeight from 600 to 700
- SegmentButton flat: selected item uses withOpacity(main, 0.2) instead of a full solid color so the variant truly looks flat
- SegmentButton faded: align selected item style with flat (withOpacity(main, 0.2) + main text) so faded is distinct from outlined and not just flat with a border
