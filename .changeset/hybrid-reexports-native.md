---
'@xaui/hybrid': patch
---

`@xaui/hybrid` is now `@xaui/native` rendered for the web. It depends on `@xaui/native` and
re-exports every one of its 78 subpaths in one line each — `@xaui/hybrid/button` is the
Native `Button`, with the same props, slots, hooks, defaults and theme. `react-native-web`
turns them into DOM nodes; alias `react-native` to it in your bundler (see
`HYBRID-SETUP.md`).

The Emotion ports of `Typography`, `TextSpan` and `Icon`, the Hybrid `tokens.gen.ts` and
provider are gone: `@xaui/hybrid/theme` and `@xaui/hybrid/system` now re-export Native's.
`react-native-web` and `react-dom` join the peers, with the same optional peers Native
declares; Emotion and Framer Motion stay as optional peers for future web-only components.
