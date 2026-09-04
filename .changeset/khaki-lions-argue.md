---
'@xaui/native': patch
---

`Typography` and `TextSpan` — the first entry of the v1 core

Ten roles, aligned with HeroUI Native's `text`: `h1`–`h6`, `body`, `body-sm`, `body-xs` and
`code`. Each role fixes size, line height, weight and family **together**, which is why
there is no `size` prop and no `weight` prop — the combinations they allowed (a heading in
a light weight, a caption in a display size) become unwritable rather than discouraged.

`TextSpan` is a bare React Native `Text`. Nesting a `Text` inside a `Text` already inherits
font, size, weight and colour on both platforms, so a span needs no context to read and no
role to resolve: the legacy `TextSpanContext` was reimplementing the platform, and it is
gone. `Typography` therefore publishes no slot and does none of a span's work.

Neither alignment nor truncation gets a prop. `textAlign` is a `TextStyle` key that R14
already exposes, and `numberOfLines` is React Native's own — a prop of ours would be a
second name for the same thing.
