---
name: xaui-docs
description: Write or update XAUI documentation — a component page in apps/docs, a demo screen in apps/demo, generated prop tables, or llms.txt. Use when documenting a component, adding a live preview, regenerating prop tables from TS types, or working on the docs site structure.
---

# XAUI v1 — Documentation and demo

`apps/docs` (Next.js) already has `react-native-web` and a `components/preview` folder —
the foundation exists. `apps/demo` is the Expo app.

Source of truth: `.project-specs/XAUI-V1-PLAN.md` §6, §9/P4.

## Live previews

The Next.js alias `react-native` → `react-native-web` makes the **real** components render
live and editable in the docs. The constraint it puts on library code: **no RN-only API in
the render path**. Reanimated and `react-native-svg` both have web support; anything else
needs checking before it lands in a core component.

Fallback when a component genuinely can't render on web: a video for that component only —
never block the whole docs on one component (plan §10).

## One page per component, fixed structure

1. **Overview** — live preview + code
2. **Anatomy** — the slot tree, explicitly
3. **Usage** — basic, then composed
4. **Props** of the root — **table generated from the TS types** (`ts-morph` or
   `react-docgen-typescript`)
5. **Slots** — one prop table per slot
6. **Variants** — the ten `variant` values × the sizes, rendered
7. **Accessibility** — roles, labels, focus order
8. **Migration from legacy** — before/after table

**Generated tables are what stops the docs from lying.** Anything that can be derived must
be generated: adding a prop updates the table with no manual edit. If you find yourself
hand-writing a prop table, fix the generator instead.

## Demo screen

Every component gets a screen in `apps/demo`, and it must render correctly in **light and
dark** — that's part of the component's definition of done, not a docs nicety.

## What replaced `@xaui/mcp`

`@xaui/mcp`'s `src/data/` was hand-written docs, already duplicated with `apps/docs` and
the READMEs. The same single source now feeds `llms.txt` (the `app/docs/llms-txt` route
already exists). **One doc source to maintain, not three** — never re-introduce a parallel
copy of component documentation.

## Checklist

- [ ] The eight sections are present and in order.
- [ ] The prop and slot tables are generated, not typed by hand.
- [ ] The preview renders in light and dark.
- [ ] The examples use the v1 API — dot-notation slots, `variant`, `color`, no
      `customAppearance`, no `startContent` / `endContent`.
- [ ] The migration table matches the legacy → v1 mapping (see the
      `xaui-legacy-migration` skill).
- [ ] `llms.txt` regenerated when the component set changed.
