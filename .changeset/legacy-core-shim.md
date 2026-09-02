---
'@xaui/native-legacy': patch
---

Read the theme from `@xaui/native` instead of `@xaui/core`.

`@xaui/core` is dissolved: its palette now lives in `@xaui/native/theme`, its declarative
types are copied into this package, and its MD3 colour object is gone. `core-shim.ts`
re-exports that surface under the old names and projects the v1 theme onto the MD3 shape
the 47 frozen components read — by role, so `createTheme({ colors: { light: { accent } } })`
re-skins both trees at once.

`@xaui/native` is now a **peer dependency**: there is exactly one `XAUIProvider` at runtime,
which is what makes a screen-by-screen migration possible. `XUIProvider` stays exported from
`@xaui/native-legacy/core` as a deprecated wrapper around it, and is no longer prop-compatible
with v0 — `theme` takes the set returned by `createTheme`.
