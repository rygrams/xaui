# @xaui/hybrid

## 0.9.1-alpha.2

### Patch Changes

- 18b3fd8: A pressed fill now moves one way: towards the ink of the mode.

  `accentPressed`, `successPressed`, `warningPressed` and `dangerPressed` mix towards
  `foreground` instead of the variant's own text colour. That text is picked for contrast, so
  its lightness followed the fill's and took the direction with it: `#9333ea` carries
  near-white text and lightened under the finger in light mode, while `#c084fc` carries dark
  text and darkened in dark mode. Same control, opposite gesture, and nobody had decided it.

  Now `#9333ea → #8533d3` in light and `#c084fc → #c691fd` in dark — darker in light, lighter
  in dark — and the label's contrast rises in both modes instead of falling in one. The
  neutral fills already worked this way, since `defaultForeground` and `surfaceForeground`
  _are_ the mode's ink; only the four saturated intents ever flipped. `deriveTint` follows the
  same rule, so a raw `color` behaves like a token under the finger as much as it does at rest.

  Visible on every filled control, which today means the `Button`.

## 0.9.1-alpha.1

### Patch Changes

- c4c4657: Fix what the blocking P2 API review found, before fifteen components copy it.

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

## 0.9.1-alpha.0

### Patch Changes

- 88c692a: Publish to npm again, under the `alpha` dist-tag.

  Both packages were `private` while the v1 rewrite started from an empty `src/`. They are
  publishable again, but the repo is now in changesets **pre mode** with the tag `alpha`, so
  `changeset publish` ships them as `alpha` and leaves `latest` where it is —
  `@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14`, the last releases that actually carry
  components. Installing either package without a tag keeps returning those.

  `pnpm add @xaui/native@alpha` is the opt-in. At this point it exports the theme layer only
  (`createTheme`, `XAUIProvider`, the token and colour utilities) — the components land from
  P2 on, one at a time, which is exactly what the tag announces.
