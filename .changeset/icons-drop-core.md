---
'@xaui/icons': patch
---

Drop the `@xaui/core` dependency. Nothing under `src/` ever imported it — it only sat in
`package.json` and in two tsup `external` lists, pulling a package into every consumer's
tree for nothing.
