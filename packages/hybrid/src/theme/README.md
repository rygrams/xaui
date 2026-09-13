# Theme

There is no Hybrid theme. Tokens, scales, `createTheme` and the theme hooks come from
`@xaui/native` and are re-exported from here; `react-native-web` renders their numeric
Native points as CSS pixels.

Nothing in this folder is generated, and nothing in it is hand-written either — a token
change happens once, in `tooling/tokens/source.ts`, and reaches the web through the
re-export.
