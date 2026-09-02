---
"@xaui/native": patch
---

Add an ESLint rule (R13) that forbids directional style properties (`left`, `right`, `paddingLeft`, `marginRight`, `borderLeftWidth`…) in `packages/native/src` — use the Start/End equivalents instead so React Native mirrors layout correctly under RTL.
