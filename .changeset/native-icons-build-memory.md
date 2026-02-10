---
'@xaui/native': patch
'@xaui/icons': patch
---

fix(build): stabilize type generation and reduce dts heap pressure

- move `@xaui/native` type generation to tsup `dts` and remove the extra custom `tsc` type script
- set `NODE_OPTIONS=--max-old-space-size=4096` for native and icons `build`/`dev` scripts
- split large tsup entry maps into grouped configs so DTS runs in smaller batches
- update icons export generator to emit the grouped tsup config so prebuild keeps the memory-safe setup
