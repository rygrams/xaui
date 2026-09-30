---
'@xaui/native': patch
---

Animations run on any `react-native-worklets` the peer range allows, not only 0.7.4 (#434).

The build no longer compiles worklets itself. It stamped every one with the Worklets Babel
plugin version in our lockfile, and the runtime refuses any other — so on Expo SDK 57
(Worklets 0.10.1, also Expo Go) every animation threw `Mismatch between JavaScript code
version and Worklets Babel plugin version`. `dist` now ships its `'worklet'` directives
uncompiled, and your app's own plugin compiles them against its own runtime, the way
Reanimated and Gesture Handler ship theirs.

Every gesture callback and animated-hook callback now declares `'worklet'` explicitly —
twenty of them relied on the plugin recognising the callee, which a bundled `dist` does not
guarantee — and `pnpm worklets:check` fails CI on any that does not. The deprecated
`runOnJS` is replaced by `scheduleOnRN` from `react-native-worklets`, available since 0.5.0,
the bottom of the peer range.
