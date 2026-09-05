---
'@xaui/native': patch
---

The build cleans `dist/` before writing it

`clean: false` had been set since the legacy era, with nothing saying why, and against
`splitting: true` it is a bug waiting for the entry list to change.

Split output names its shared chunks by content hash. A build whose entries changed writes
new chunk names and leaves the old ones behind, so `dist/` becomes a mix of two builds: an
entry from the first still importing `chunk-ZF6KIHXH.js`, which the second replaced with a
different hash and never wrote.

Metro's report of that is `Unable to resolve "@xaui/native/accordion"` — it names the
component and says nothing about chunks, which sends you looking at the export map, the
subpath and the workspace link, all three of which are fine.

It bites hardest across branches, because turbo restores a cached `dist/**` **over**
whatever is already there rather than in place of it. Switching from a branch that has a
component to one that does not, or back, is enough.
