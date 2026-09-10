---
'@xaui/native': patch
'@xaui/hybrid': patch
---

Move the pre-release line from `alpha` to `beta`.

`.changeset/pre.json` now carries the tag `beta`, so both packages are versioned
`0.9.x-beta.x` and every publish lands on the `beta` dist-tag: `pnpm add @xaui/native@beta`
is the opt-in from here on. The `alpha` dist-tag is frozen on the last `0.9.1-alpha.x`
publish and no longer moves, and `latest` is untouched — it still points at
`@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14` until `1.0.0`.

Only the `tag` field changed. `initialVersions` and the list of consumed changesets are
kept as they were, which is what a `pre exit` + `pre enter beta` would have thrown away —
the next `changeset version` would then have replayed every entry into the changelogs.
