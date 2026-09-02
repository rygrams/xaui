---
'@xaui/native-legacy': patch
---

Inline the twelve icons the components draw, and drop the `@xaui/icons` dependency.

`@xaui/icons` shipped 200+ icons in seven variants each so that this package could use one
variant of twelve of them. Those twelve now live in `src/icons/`, traced on the same
Ionicons 512 grid, so nothing shifts on screen. They are internal — an app picks its own
icon set.

`@xaui/native-legacy` now has **zero runtime dependencies**.
