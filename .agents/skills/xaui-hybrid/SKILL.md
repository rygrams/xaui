---
name: xaui-hybrid
description: Port a component or theme from @xaui/native to @xaui/hybrid (web renderer for mobile webviews) with the em sizing convention. Use when working in packages/hybrid, porting a native component to the web renderer, or fixing an em/px or RN-shorthand issue in hybrid styles.
---

# XAUI — Porting to `@xaui/hybrid`

`@xaui/hybrid` is the same public API rendered on the web. **It is frozen from P0 to P4** —
no new component, no API change — so that no decision has to be paid for twice before it
stabilises. Work here resumes after `@xaui/native@1.0.0` (plan §9/P6). If a task asks for a
hybrid component while the native v1 core is unfinished, say so before starting.

Once it resumes: same folder tree, same file names, same testing rule as native. Only `.style.ts`
and the renderer differ — `createRecipe` is taken as-is, it is pure resolution and the
renderer only comes in at the very end.

## The `em` rule — the whole reason this package has a convention

Every size in `@xaui/hybrid` uses **`em`**, never `px`, so the hybrid version scales
identically to the native one:

```ts
const toEm = (px: number) => `${px / 16}em`
```

Applies to spacing (padding, margin, gap), dimensions (width, height), border
(`borderWidth`, `borderRadius`), typography (`fontSize`) — **every fixed pixel value**
coming from the theme or from the native `StyleSheet`.

## Porting a native component

1. Copy the folder shape verbatim: `.recipe.ts`, `.context.ts`, `.type.ts`, `.hook.ts`,
   `.style.ts`, root, one file per slot, `index.ts`.
2. Wrap every numeric size from `theme.spacing`, `theme.borderWidth`, `theme.fontSizes`,
   `theme.borderRadius` in `toEm()`.
3. Wrap every hardcoded pixel value from the native `StyleSheet` too — `gap: 12` becomes
   `gap: toEm(12)`.
4. **Use CSS-valid properties only.** Never RN shorthands: no `paddingVertical`,
   `paddingHorizontal`, `marginVertical`, `marginHorizontal` — split them into
   `paddingTop`/`paddingBottom`, `paddingLeft`/`paddingRight`, etc. The token generator
   does this split automatically for generated tokens; hand-written styles are on you.
5. No component test file — same rule as native. Only pure helpers are tested, in the
   mirror `__tests__/` path.
6. Same subpath export shape: `@xaui/hybrid/<component>`.

Styling uses Tailwind or framer-motion for animation — **no CSS files** (CLAUDE.md).

## Tokens

`packages/hybrid/src/theme/tokens.gen.ts` is **generated** from the single source in
`tooling/tokens/source.ts` with the `em` conversion applied. Never edit it by hand, and
regenerate it in the same commit as any native token change — `pnpm tokens:check` fails the
build when native and hybrid drift apart.

## Review checklist

- [ ] No `px` literal anywhere in a style, no bare number where a length is expected.
- [ ] No RN shorthand property.
- [ ] No CSS file added.
- [ ] Same component API as native — props, slots, `variant` values, `asChild`.
- [ ] Any pure helper added has a test; the component itself has none.
- [ ] `pnpm lint && pnpm type-check && pnpm test` pass.
