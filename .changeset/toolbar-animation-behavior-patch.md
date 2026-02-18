---
'@xaui/native': patch
---

Document toolbar animation behavior updates:

- replace spring-based motion with `withTiming` for deterministic show/hide transitions
- tune easing curves for faster, smoother entry/exit
- reduce initial translation offset from `100` to `24` for subtler movement

These changes affect Toolbar motion feel and visual behavior when toggling visibility.
