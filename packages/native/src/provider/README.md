# `provider/`

What wraps the application, once. Exported from `@xaui/native/theme` — the provider only
publishes the theme, so a second subpath for it bought nothing.

```tsx
import { XAUIProvider } from '@xaui/native/theme'
import { appTheme } from './theme'

<XAUIProvider theme={appTheme}>
  <App />
</XAUIProvider>
```

## Rules

- **Exactly one provider may be loaded at runtime.** Two copies mean two React contexts, and
  a legacy component under the v1 provider would throw. This is why
  `@xaui/native-legacy` carries no theme code and declares `@xaui/native` as a peer.
- **`theme` comes from `createTheme`, at module level.** A literal object changes identity on
  every parent render; the provider holds no memo to absorb that, by design.
- **`colorMode` is controlled** — `'light' | 'dark' | 'system'`, defaulting to `'system'`.
  The library owns neither the state nor its persistence. An app that wants a switch holds
  the state and passes it down.

## What does not belong here

Anything a component needs. This folder is the composition root: theme selection, and later
the portal host. Component-facing helpers live in `system/`.
