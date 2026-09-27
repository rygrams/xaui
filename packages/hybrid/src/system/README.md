# System

`@xaui/hybrid/system` is `@xaui/native/system`, re-exported in one line — the recipe engine,
slots, `asChild`, `PressableFeedback`, `Portal` and `Icon` are the Native modules, rendered
by `react-native-web`. Nothing is written here. A primitive that misbehaves on the web is
fixed in `@xaui/native`, behind a `.web.tsx` file or a `Platform.OS === 'web'` branch.
