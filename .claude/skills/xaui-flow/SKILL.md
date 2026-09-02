---
name: xaui-flow
description: The end-to-end XAUI workflow — situate a task in the v1 phasing, route it to the right skill, then branch, implement, test, review, changeset and PR. Use at the start of any non-trivial XAUI task, when asked "what's next", when a task spans several areas, or when you are unsure which XAUI skill applies.
---

# XAUI v1 — Working flow

Start here for any non-trivial task on this repo. This skill decides *what kind of work
this is*, hands off to the skill that owns it, and closes the loop.

Plan of record: `.project-specs/XAUI-V1-PLAN.md`. Runnable references:
`.project-specs/source.mjs`, `derive.mjs`, `oklab.mjs`, `tokens.json`.

## 1. Situate the task

The v1 phasing, in order. Each phase's **first line unblocks the rest**; within a phase the
remaining items can be ordered freely.

| Phase | What | Ships |
|---|---|---|
| **P0** | Package split, token source, OKLab engine, derived layer, contrast guard, `createTheme`, provider, legacy shim, peer-dep hygiene, ESLint R13 | `@xaui/native-legacy@0.2.8` |
| **P1** | `system/` — recipe + cache, slots, `PressableFeedback`, `Portal`, `Icon`, shared hooks | nothing (a UI package with no component makes no sense on npm) |
| **P2** | The reference `Button` + a perf baseline + **the blocking API review** | `@xaui/native@0.9.0-beta.1` |
| **P3** | The fifteen-component core, in the plan's order | betas |
| **P4** | Docs, generated prop tables, migration guide, `llms.txt` | `@xaui/native@1.0.0` |
| **P5** | The remaining 32, then the parity milestone | `1.x` |
| **P6** | `@xaui/hybrid` resumes | — |
| **P7** | Delete `native-legacy` | `2.0.0` |

Two consequences worth stating out loud when a request cuts across them:

- **Order is not advisory.** The `git mv` comes first, or everything else is written in a
  folder that is about to move. Tokens come before colours, colours before the theme, the
  theme before the provider, the provider before the first component.
- **`@xaui/hybrid` is frozen from P0 to P4.** A hybrid request during that window gets
  flagged before any code is written.

If the task doesn't fit a phase, it is probably scope creep — the core is **fifteen**
components, everything else waits for `1.x` (plan §10).

## 2. Route to the owning skill

| The task is about | Skill |
|---|---|
| A component: new, new slot, legacy → v1 conversion | `xaui-component` |
| Tokens, OKLab, `deriveColors`, `createTheme`, provider, `tokens:check` | `xaui-theme` |
| `system/` — recipe, style cache, slots, `asChild`, `PressableFeedback`, `Portal`, `Icon` | `xaui-system` |
| `packages/hybrid`, `em` units, web renderer | `xaui-hybrid` |
| `apps/docs`, `apps/demo`, prop tables, `llms.txt` | `xaui-docs` |
| `native-legacy`, `core-shim`, codemods, `@deprecated` | `xaui-legacy-migration` |
| Checking work against the v1 rules | `xaui-review` |

A task that touches several areas is done area by area, in dependency order, not all at
once — the review at the end covers all of them.

## 3. Branch

Never commit to `main`. One branch per coherent unit of work:

```bash
git checkout -b feat/button-v1        # new component or feature
git checkout -b fix/style-cache-key   # bug fix
git checkout -b chore/ai-setup        # tooling, config, skills
git checkout -b refactor/alert        # rework of an existing component
```

## 4. Implement

Follow the routed skill. Two constants regardless of the area:

- **Run `pnpm lint` and `pnpm test` after each change** (CLAUDE.md), not once at the end.
- **Tests cover utility functions only** — never components, slots or their hooks. Logic
  worth pinning down is extracted into a pure function and tested there.
- **Never** run `pnpm changeset version`, `pnpm version-packages` or `pnpm release`
  locally — CI owns those.

Useful commands:

```bash
pnpm --filter @xaui/native test
pnpm lint && pnpm type-check && pnpm test
```

## 5. Review

Run the `xaui-review` skill on the diff, then the generic `code-review-and-quality` /
`code-simplification` skills if the change is substantial. Fix what it finds, or state
plainly what you left and why.

## 6. Changeset

One per touched package, **always `patch`** while we're in beta:

```bash
pnpm changeset
```

Commit the generated `.changeset/*.md` with the change. Commit messages follow commitizen
(`feat:`, `fix:`, `chore:`, `refactor:`), and carry no Claude co-author line.

## 7. PR

```bash
gh pr create
```

Body has **What / Why / How** sections. All CI checks green before requesting review. After
merge, the Changesets action opens or updates the "Version Packages" PR; merging that one
publishes. Nothing else to do by hand.

## Definition of done — per component

`pnpm lint && pnpm type-check && pnpm test` pass · the demo screen renders correctly in
light and dark — that is how a component is verified, not a test file · the doc page follows
the eight-section structure · the legacy equivalent carries `@deprecated` pointing at the
replacement · a changeset is committed.

## When to stop and ask

- The task contradicts a rule in §1 of the plan (R1–R13) — those don't get negotiated
  component by component; changing one is a plan decision.
- The task adds a sixteenth component to the 1.0 core.
- The task asks for hybrid work before P4 is done.
- The task asks for a new prop where `style` would do (R7).

State the conflict in a sentence or two, propose the in-plan alternative, and continue with
everything the question doesn't block.
