---
'@xaui/native': patch
---

Emit declarations with `tsc`, not one `rollup-plugin-dts` worker

`tsup`'s `dts` rolls all thirty-five entry points up in a single worker that holds the
package's whole type graph at once — every component's props, and `react-native`'s `.d.ts`
under them. It crossed Node's default 4288 MB heap, and the worker does not fail
gracefully: the JS build reports success, then `ERR_WORKER_OUT_OF_MEMORY` takes the process
down with an error that names no file. `main` went red on its own, and every CI job that
runs `@xaui/native#build` as a turbo dependency — Pack Uniqueness, ESLint, Type Check,
Vitest — went down with it. The stopgap raised the ceiling with
`NODE_OPTIONS=--max-old-space-size=6144`; the package gains roughly a component per branch,
so the ceiling was going to be hit again.

Declarations now come from `tsc --emitDeclarationOnly` — a plain file-by-file emit with no
rollup pass and no worker to run out of heap — and `tooling/dual-dts` mirrors each emitted
`.d.ts` to the `.d.cts` that the `require` half of the `exports` map points at. The
`--max-old-space-size` flag is gone from the `build` script.

What a consumer sees: `dist` now carries a declaration file for every source module rather
than one bundled `.d.ts` per entry point. Both `import` and `require` type conditions still
resolve to a real file on every subpath, `pnpm pack:check` still passes, and `pnpm build`
succeeds on a default heap.
