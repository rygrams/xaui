---
"@xaui/native": patch
---

Add RoundedView component and carousel animations implementation

**RoundedView Component:**
- Add RoundedView component with flexible corner radius control
- Support individual corner props (topLeft, topRight, bottomLeft, bottomRight)
- Support side props (top, bottom, left, right)
- Support all corners prop (all)
- Add fullWidth and backgroundColor props
- Implement priority system (specific corners > side props > all prop)
- Add comprehensive TypeScript documentation
- Add 27 unit tests (component props and hook logic)

**Carousel Animations:**
- Implement slide animations for multi-browse and hero layouts using React Native Reanimated
- Add AnimatedCarouselItem component with interpolated scale and opacity effects
- Multi-browse: scale (0.85 → 1 → 0.85) and opacity (0.6 → 1 → 0.6)
- Hero: scale (0.9 → 1 → 0.9), opacity (0.5 → 1 → 0.5), and translateX (-10 → 0 → 10)
- Use useAnimatedScrollHandler for smooth scroll tracking
- Add conditional rendering for animated vs static items based on layout

**Carousel Improvements:**
- Reduce default spacing for multi-browse layout from 8px to 4px
- Add comprehensive JSDoc documentation for all carousel types and props
- Update itemSpacing documentation to reflect layout-specific defaults
- Export AnimatedCarouselItem as internal component
