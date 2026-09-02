---
name: xaui-legacy-migration
description: Work on the @xaui/native-legacy transition — the package split, core-shim, the legacy → v1 prop mapping, codemods, and @deprecated markers. Use when touching packages/native-legacy, writing or running a codemod, mapping old variant/themeColor/customAppearance props to the v1 API, or deprecating a legacy component.
---

# XAUI — Legacy transition

The old tree is **not** a subpath of `@xaui/native`. It is republished as-is under a new
npm name.

| Package | Content | Version |
|---|---|---|
| `@xaui/native-legacy` | the 47 current components, frozen | `0.2.8` — same number as the last real release |
| `@xaui/native` | the v1 API, from scratch | `0.9.0-beta.x` → `1.0.0` |
| `@xaui/hybrid` | frozen during P0–P4 | unchanged |

Source of truth: `.project-specs/XAUI-V1-PLAN.md` §7.

## The non-negotiable condition

**Exactly one `XAUIProvider` may be loaded at runtime.** Two copies of the provider means
two distinct React contexts: a legacy `Button` under the v1 provider would throw "must be
used within XAUIProvider", and screen-by-screen migration would be impossible.

Therefore `@xaui/native-legacy` **contains no theme code at all** and declares
`@xaui/native` as a peer dependency:

```jsonc
{ "name": "@xaui/native-legacy",
  "peerDependencies": { "@xaui/native": ">=1.0.0", "react": "…", "react-native": "…" } }
```

Its `core-shim.ts` imports the flat tokens from `@xaui/native/theme` and **rebuilds the MD3
shape** (`{ main, onMain, container, onContainer }`) the 47 components expect — so that no
legacy file is modified.

Check at `pnpm pack` time: `@xaui/native` must appear **once** in the resolution tree. A
duplicate version means two modules, two contexts, and the bug you just avoided.

## Rules for the legacy tree

- **Frozen.** Bug fixes only. No new component, no new prop.
- Its tests are kept as-is — they protect the migration.
- Every component whose v1 equivalent exists gets an `@deprecated` pointing at the
  replacement.
- Its RN legacy `Animated` code stays; the v1 tree is 100% Reanimated. Do not "modernise"
  legacy files.
- `npm deprecate @xaui/native-legacy` on the parity milestone, then the folder is deleted
  (P7).

## The mapping — deterministic, therefore codemoddable

```
variant="solid"    + themeColor="primary"   → variant="primary"
variant="flat"     + themeColor="primary"   → variant="secondary"
variant="bordered" + themeColor="primary"   → variant="tertiary"
variant="light"    + themeColor="primary"   → variant="ghost"
variant="faded"    + themeColor="primary"   → variant="secondary"  (+ border via style)

variant="solid"    + themeColor="danger"    → variant="danger"
variant="flat"     + themeColor="danger"    → variant="danger-soft"
…same for success, warning

themeColor="secondary" | "tertiary"         → removed (they were levels, not colours)
themeColor="default"                        → variant="secondary"

customAppearance={{ text: s }}              → <X.Label style={s}>
customAppearance={{ container: s }}         → style={s}
startContent={<I/>} / endContent={<I/>}     → <X.Icon/> placed in the intended order
```

`Container.color` and `Typography.color` keep their current meaning: under the
"`color` = the tint" model, a container can only tint its background and text its stroke.
Nothing to rename.

## Codemods

They live in `tooling/codemods/` — `legacy-imports`, `variant-map`, `slots`.

User-side migration is one dependency plus a scope change:

```diff
+ pnpm add --save-exact @xaui/native-legacy@0.2.8

- import { Button } from '@xaui/native/button'
+ import { Button } from '@xaui/native-legacy/button'
```

**Always document the pinned form.** The package is frozen, so a range buys nothing and is
how an unattended `pnpm update` pulls in a change nobody asked for. Every install snippet —
README, docs, migration guide — uses `--save-exact` and an explicit version.

`pnpm xaui-codemod legacy-imports` does it across a project. A codemod must be idempotent
and must leave a comment (or fail loudly) on any case it cannot transform mechanically —
`faded` needs a manual border, `customAppearance` with unknown keys needs a human.

## Checklist

- [ ] No theme code left in `native-legacy`; `@xaui/native` is a peer dep.
- [ ] A legacy component renders under the v1 `XAUIProvider` with no context error.
- [ ] `pnpm pack` on both packages: `@xaui/native` resolves once.
- [ ] Legacy tests untouched and green.
- [ ] `@deprecated` added for every component that now has a v1 equivalent.
- [ ] The docs migration table matches this mapping exactly.
