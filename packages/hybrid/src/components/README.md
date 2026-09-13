# Components

Two kinds of folders live here, and the difference matters.

**Re-exports.** Every component of the public `@xaui/native` API is exposed from here as a
one-line re-export of its Native subpath — `export * from '@xaui/native/button'`. No
wrapper, no re-typing, no DOM adapter: `react-native-web` is the adapter. A web bug is fixed
in `@xaui/native`, behind a `.web.tsx` file or a `Platform.OS === 'web'` branch, so both
packages get the fix.

**Web-only components.** The ones `react-native-web` cannot supply, and the ones Native has
no reason to own. They are written here with Emotion Styled and Framer Motion, follow the
same v1 API rules as a Native component, read tokens from the Native theme, and convert
fixed lengths to root-relative CSS units at the Emotion boundary. Each carries a
`<component>.md` beside the code and is marked web-only. If Native could plausibly want the
component, it belongs in Native.
