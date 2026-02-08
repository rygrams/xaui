---
'@xaui/native': patch
---

Add List component with ListItem and ListBuilder

- Add List component for static list rendering with selection support
- Add ListItem component with title, description, startContent, endContent props
- Add ListBuilder component using FlatList for efficient large dataset rendering
- Support single/multiple selection modes with selectedKeys prop
- Add isPressable and isSelectable props for interaction control
- Add showDivider prop with subtle theme-aware divider colors
- Support themeColor prop for customizing selected item background
- Support size variants (xs, sm, md, lg)
- Add comprehensive test suite for all list components
- Add demo app examples showcasing all list features
