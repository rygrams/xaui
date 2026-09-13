---
'@xaui/hybrid': patch
---

Document the new direction for `@xaui/hybrid`: it becomes `@xaui/native` re-exported for the
web over `react-native-web` rather than a component-by-component Emotion port. Emotion Styled
and Framer Motion stay in the package for the web-only components React Native Web cannot
supply. Documentation and agent instructions only — no code change yet; the P6 tasks in the
roadmap carry the migration.
