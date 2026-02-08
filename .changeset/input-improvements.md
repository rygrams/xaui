---
'@xaui/native': patch
---

Improve TextInput component with focus wrapper, animations, and better styling

- Add clickable wrapper to focus input when clicking anywhere in the field
- Add smooth border color animation on focus (200ms transition)
- Borders are always visible - only color animates between unfocused and focused states
- Fix border bottom color for underlined variant using borderBottomColor
- Increase inside label font size for better readability (sm: 12, md: 13, lg: 15)
- Add padding bottom (2px) to inside labels for better spacing
- Reduce border color opacity from 0.2 to 0.1 for subtler appearance
