---
'@xaui/native': patch
---

`npm i @xaui/native` installs v1.

Until now every beta landed on the `beta` dist-tag only, and `latest` stayed on `0.2.8`,
the last release of the previous API: a plain install gave you components this
documentation does not describe. The release workflow now moves `latest` onto each
`@xaui/native` it publishes, so `pnpm add @xaui/native` and `pnpm add @xaui/native@beta`
install the same version.

Nothing else changes. The version still says `-beta` and the API can still move until
`1.0.0`, as the release notes say when it does. `0.2.8` stays on npm for the projects that
pin it, and `@xaui/hybrid` keeps its `beta` opt-in.
