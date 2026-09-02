---
name: xaui-review
description: Review an XAUI change against the v1 architecture rules — the thirteen principles, API vocabulary, style-cache correctness, accessibility, tests and package hygiene. Use after writing or modifying any component, system primitive, theme or hybrid code, and before opening a PR.
---

# XAUI v1 — Review

Run this after **every** component or system change, before `git commit` and before
`gh pr create`. It complements the generic `code-review-and-quality` skill; that one asks
whether the code is good, this one asks whether it is **XAUI**.

Rules referenced here are defined in `.project-specs/XAUI-V1-PLAN.md` §1 and detailed in
the `xaui-component`, `xaui-system` and `xaui-theme` skills.

## How to run it

1. Read the diff — `git diff main...HEAD` (or the staged diff for an in-progress change).
2. Walk the applicable sections below. Skip a section only when the diff genuinely
   doesn't touch that area.
3. Report findings **most severe first**, each as: file:line, the rule broken, the concrete
   failure it causes. A finding with no failure scenario is a preference, not a finding —
   drop it.
4. Fix, or list what you deliberately left and why.

Severity: **blocking** = R9, R12, cache correctness, a11y, one-provider rule, generated
files edited by hand — these are the ones that are unfixable or expensive later.

## 1. The thirteen rules

- [ ] **R1** — one `forwardRef` root + dot-notation slots. No prop styling another
      component's inside.
- [ ] **R2** — no `customAppearance`; each slot has its own `style`.
- [ ] **R3** — text children auto-wrapped via `childrenToString`, not an
      `isValidElement` check on the first child.
- [ ] **R4** — `gap` / `alignItems` / `flexDirection` on the root; **no margin on any
      slot**; no `startContent` / `endContent`.
- [ ] **R5** — context carries resolved style IDs, memoized; no slot re-resolves the
      recipe.
- [ ] **R6** — props take tokens only; arbitrary numbers are a type error (except `color`).
- [ ] **R7** — only `variant` and `color`. No `background`, no `borderColor`, no third
      appearance prop.
- [ ] **R8** — `isX` / `hasX`; `disabled` is not public.
- [ ] **R9** *(blocking)* — root forwards `ref`, `style` **including `Pressable`'s function
      form**, `testID`, a11y props; `accessibilityRole` defaults but stays overridable.
- [ ] **R10** — the context hook is exported (`export { useButton }`).
- [ ] **R11** — `displayName` namespaced `'XAUI.<Component>.<Slot>'`.
- [ ] **R12** *(blocking)* — `asChild` on the root, via `mergeProps` + `mergeRefs`.
- [ ] **R13** — no `left` / `right` / `paddingLeft` … anywhere in `src/`; RTL-safe
      `start` / `end` forms only.

## 2. API vocabulary

- [ ] `variant` values come from the sanctioned union; no `themeColor` anywhere.
- [ ] The recipe **names tokens** — grep the diff for hex literals and raw numbers in
      `.recipe.ts`; there should be none.
- [ ] `size` sets height / horizontal padding / gap / radius, **never width**. Fixed
      `height`, not `minHeight`. No `fullWidth` prop.
- [ ] `color` is a raw value, never a token, and lands where the variant says.
- [ ] Anything else that wanted a prop goes through `style`.

## 3. Style engine and performance

- [ ] Resolution order respected: base → variants → compoundVariants → states → slot props
      → slot style.
- [ ] Cache key is `themeId|variant|size|radius|states` — **no arbitrary value in it**, and
      `color` is not in it.
- [ ] `StyleSheet.create` is not called per render; slots receive stable references.
- [ ] A test asserts reference stability across two resolutions of the same tokens.
- [ ] `deriveTint` memoized per tint value.
- [ ] No new theme memo depending on prop identity (that was the v0 provider bug).
- [ ] View depth is minimal — no wrapper `<View>` that exists only for layout.

## 4. Accessibility

- [ ] `accessibilityRole` and `accessibilityState` set on the root, not optional.
- [ ] Disabled and busy states reach `accessibilityState`.
- [ ] Slot text is reachable by screen readers; icon-only controls carry a label.

## 5. Structure and hygiene

- [ ] File layout matches the convention; **no empty file created "for the convention"**.
- [ ] A new shared file is in the folder §2 bis dictates — `system/` is public, `utils/` is
      private, promotion happens at the second use.
- [ ] Nothing re-exported from `utils/` to the outside.
- [ ] Optional peers (`gesture-handler`, `svg`, `safe-area-context`) imported only by the
      components that need them, never from a barrel, with an explicit dev error when
      missing.
- [ ] `.gen.ts` files not hand-edited.
- [ ] Subpath export added to `package.json` **and** `tsup.config.ts`.
- [ ] No `console.log`, no `debugger`, no needless comment (CLAUDE.md).
- [ ] No function with more than 3 parameters; early returns instead of deep nesting.

## 6. Tests

- [ ] Mirror path: `src/__tests__/components/<name>/<name>.test.tsx`.
- [ ] Covers: each slot renders, the context hook throws by name outside its parent,
      `asChild` merges props and refs, style reference stability, disabled/loading states.
- [ ] Icons are the only exemption from the one-test-per-component rule.

## 7. Gates

```bash
pnpm lint && pnpm type-check && pnpm test
```

- [ ] All three green — paste the real result, never "should pass".
- [ ] Demo screen renders in light **and** dark.
- [ ] Legacy equivalent carries `@deprecated` pointing at the replacement.
- [ ] A changeset exists (`patch` — we are in beta) for every touched package.

## The one blocking review of the project

End of P2, after `Button`: a full API review before any other component starts.
Fixing the pattern there costs 1; after the fifteen-component core, 15. If the current task
is the Button and that review hasn't happened, it happens now.
