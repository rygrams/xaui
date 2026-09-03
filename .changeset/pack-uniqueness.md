---
'@xaui/native': patch
---

Declare `semver` where it is used. `tooling/pack-check` checks, against the **packed**
manifests, that `@xaui/native` can only ever appear once in a consumer's resolution tree:
it is a peer and never a dependency, neither package carries a runtime dependency, no
`workspace:` protocol survives packing, and every peer range admits the version actually
shipped.
