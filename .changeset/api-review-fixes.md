---
'@xaui/native': patch
'@xaui/hybrid': patch
---

Fix what the blocking P2 API review found, before fifteen components copy it.

**`require()` failed on every subpath.** `exports.require` pointed at the ESM build while
the CJS build was produced and never referenced, so in a `"type": "module"` package every
`require('@xaui/native')` threw a `SyntaxError`. Both packages now declare the full dual
form, with types **per condition** — `.d.ts` under `import`, `.d.cts` under `require` — so
a CommonJS consumer no longer type-checks against the ESM declarations.

**Overlays painted outside rounded corners.** `Highlight` and `Ripple` are absolute fills
with square corners, and every control in the library is rounded. The clip existed only for
`scale-ripple`, and only on the animated branch; it now applies on both branches whenever a
default overlay is mounted — and only then, so a root without one can still let a child
overflow.

**`accessibilityState` was replaced instead of merged** on `Button`. A caller adding
`expanded` or `selected` silently erased `disabled` and `busy`, and a screen reader stopped
announcing a disabled button.

**`defaultVariants` narrowed a recipe's whole `Variant` type** to the single value named in
it, making every other variant a type error at the call site. `NoInfer` in the engine
removes the cast each of the forty-seven components would otherwise have carried.
