---
'@xaui/native': patch
---

Add `useAppearance` and `appearanceFor` to `@xaui/native/theme`: the resolved theme read as app chrome — the mode, the ink the system bars need (which is its opposite), and the ground and ink for a navigator's header. The library still depends on nothing but React Native; this is what an app hands to `StatusBar`, `expo-status-bar` or React Navigation's `screenOptions` instead of re-deriving it.
