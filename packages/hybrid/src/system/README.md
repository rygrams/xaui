# System

The public `system` subpath re-exports `@xaui/native/system`: the recipe engine and its
cache, `asChild` slots, style props, `Portal`, `PressableFeedback` and `Icon` are the Native
primitives, rendered on the web by `react-native-web`.

What may legitimately live here is the renderer support the web-only components of
`components/` need and Native has no equivalent for — the Emotion boundary and its
point-to-`rem` conversion. Those stay off the public `system` barrel: exporting one would
put a Hybrid-only name on a subpath whose contents must match Native's.
