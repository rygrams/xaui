---
name: xaui-review
description: Review an XAUI change against the v1 architecture rules and against clean-code standards — the fourteen principles, API vocabulary, style-cache correctness, accessibility, readability, naming, duplication, tests and package hygiene. Use after writing or modifying any component, system primitive, theme or hybrid code, and before opening a PR.
---

# XAUI v1 — Review

Run this after **every** component or system change, before `git commit` and before
`gh pr create`. It asks two questions in one pass: is this code **XAUI** (sections 1–5), and
is it **good code** (section 6). Neither passes on its own — a component that honours all
fourteen rules and is unreadable still fails review.

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

## 1. The fourteen rules

- [ ] **R1** — one `forwardRef` root + dot-notation slots. No prop styling another
      component's inside.
- [ ] **R2** — no `customAppearance`; each slot has its own `style`.
- [ ] **R3** — text children auto-wrapped via `childrenToString`, not an
      `isValidElement` check on the first child.
- [ ] **R4** — `gap` / `alignItems` / `flexDirection` on the root; **no margin on any
      slot**; no `startContent` / `endContent`.
- [ ] **R5** — context carries resolved style IDs, memoized; no slot re-resolves the
      recipe.
- [ ] **R6** — the **vocabulary** props take tokens only; `size={42}` is a type error. Raw
      values go the other path: `color` and R14, both outside the cache.
- [ ] **R7** — only `variant` and `color` in the vocabulary. R14's style props are raw
      overrides, the same category as `style` — flag one used where a `variant` would do.
- [ ] **R8** — `isX` / `hasX`; `disabled` is not public.
- [ ] **R9** *(blocking)* — root forwards `ref`, `style` **including `Pressable`'s function
      form**, `testID`, a11y props; `accessibilityRole` defaults but stays overridable.
- [ ] **R10** — the context hook is exported (`export { useButton }`).
- [ ] **R11** — `displayName` namespaced `'XAUI.<Component>.<Slot>'`.
- [ ] **R12** *(blocking)* — `asChild` is a real render branch through `Slot` /
      `mergeProps` + `mergeRefs`, not a prop that is destructured and then ignored.
- [ ] Caller props are spread **before** the internal press handlers, and those handlers
      compose the caller's `onPressIn` / `onPressOut` rather than replacing them.
- [ ] **R13** — no `left` / `right` / `paddingLeft` … anywhere in `src/`; RTL-safe
      `start` / `end` forms only.
- [ ] **R14** — style props carry **full RN names and RN values**: `padding={16}` is 16
      points. An abbreviation (`p`, `bg`) or a hidden scale is the defect.
- [ ] The set comes from the node's **style type**, not a hand-written list, and the
      directional keys R13 bans are **not exposed** — no `paddingLeft` prop can be written.
- [ ] A style prop styles **its own node**, never a descendant (R1).
- [ ] A component's own prop wins over a style prop of the same name, and the type says so.

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

## 5. Structure and packaging

- [ ] File layout matches the convention.
- [ ] A new shared file is in the folder §2 bis dictates — `system/` is public, `utils/` is
      private, promotion happens at the second use.
- [ ] Nothing re-exported from `utils/` to the outside.
- [ ] Optional peers (`gesture-handler`, `svg`, `safe-area-context`) imported only by the
      components that need them, never from a barrel, with an explicit dev error when
      missing.
- [ ] `.gen.ts` files not hand-edited.
- [ ] Subpath export added to `package.json` **and** `tsup.config.ts`.

## 6. Clean code and readability

Correct and idiomatic is not enough — the code has to be readable by someone who did not
write it. Judge each point by its failure: what does a future reader get wrong because of
this?

**Naming**

- [ ] Names state intent, not mechanism: `isPressed`, not `flag`; `deriveTint`, not `helper2`.
- [ ] Repo conventions held: PascalCase components, kebab-case files and folders,
      `*.type.ts` / `*.hook.ts` / `*.style.ts` / `*.recipe.ts` / `*.context.ts`,
      `<component>-<slot>.tsx` for slot files.
- [ ] No abbreviation a reader has to decode, and no name that lies about what the thing does.

**Shape**

- [ ] A function does one thing, at one level of abstraction. If explaining it needs an
      "and", it is two functions.
- [ ] **At most 3 parameters** (CLAUDE.md). Beyond that, pass an options object.
- [ ] **Early returns** instead of nesting. No `if` inside `if` inside `if`.
- [ ] No function so long the reader must scroll to hold it in their head — in this codebase,
      a component root that exceeds the reference Button by much is doing too much.

**Types**

- [ ] No `any`. A precise type, `unknown` with narrowing, or a generic — in that order.
- [ ] `import type` for type-only imports; imports grouped external-then-internal; no unused
      import left behind.
- [ ] Public props are documented by their types, not by a comment restating the type.

**Duplication and dead weight**

- [ ] Nothing copied a third time — extract at the second use, never by anticipation (§2 bis).
- [ ] No dead code, no commented-out block, no leftover scaffolding.
- [ ] No file created empty to satisfy a convention.

**Comments**

- [ ] Comments explain **why**, never **what** — the code says what. A comment restating the
      line below it is noise and drifts out of date.
- [ ] The non-obvious decision *is* commented: a resolution order that must not change, a
      prop spread whose position is load-bearing, a memo that exists for a specific bug.
- [ ] No `console.log`, no `console.error`, no `debugger`.

**Failure behaviour**

- [ ] Errors are explicit and named — a missing optional peer, a slot hook used outside its
      parent. Never `undefined is not a function` and never a silent fallback that hides the
      cause.
- [ ] External input is validated or clamped; defaults are safe.

**When the change is substantial**

- [ ] Ran the `code-simplification` skill — is any part heavier than it needs to be?
- [ ] Ran the `code-review-and-quality` skill for the broader axes (design, security,
      maintainability) that this checklist does not cover.

## 7. Tests

- [ ] **Pure functions only.** A new function that computes a value — in `utils/`, the
      colour engine, recipe resolution, the style cache, slot helpers, token generation —
      has a mirrored test at `src/__tests__/<same path>.test.ts`.
- [ ] **No test file for a component, a slot, a hook or a set of animation constants.**
      Flag one if it appears. Those are verified by their demo screen, and a timing that is
      right is right on screen rather than in an assertion.
- [ ] Cache behaviour has a reference-stability test.

## 8. Gates

```bash
pnpm lint && pnpm type-check && pnpm test
```

- [ ] All three green — paste the real result, never "should pass".
- [ ] Demo screen renders in light **and** dark.
- [ ] Legacy equivalent carries `@deprecated` pointing at the replacement.
- [ ] A changeset exists (`patch` — we are on the `alpha` line) for every touched package.

## The one blocking review of the project

End of P2, after `Button`: a full API review before any other component starts.
Fixing the pattern there costs 1; after the fifteen-component core, 15. If the current task
is the Button and that review hasn't happened, it happens now.
