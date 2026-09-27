# Theme

`@xaui/hybrid/theme` is `@xaui/native/theme`, re-exported in one line — the tokens,
`createTheme`, `deriveColors`, the hooks and the single `XAUIProvider`. Hybrid generates no
tokens and holds no second theme context: the numbers stay React Native numbers, and
`react-native-web` turns them into CSS pixels. Web-only components read the same theme
through the same hooks.
