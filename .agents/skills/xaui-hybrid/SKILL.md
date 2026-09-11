---
name: xaui-hybrid
description: Port the @xaui/native v1 API to @xaui/hybrid with Emotion Styled, Framer Motion, strict public-API parity, DOM-safe props, and pixel-equivalent responsive sizing. Use for any work in packages/hybrid or any Native-to-Hybrid port.
---

# XAUI — Porting to `@xaui/hybrid`

`@xaui/hybrid` is the web renderer of `@xaui/native`, not a related API. It remains frozen
until P4 ships, then follows the P6 order in `.project-specs/XAUI-V1-PLAN.md`. P6 remains on
`0.9.x-beta.x` and the `beta` dist-tag even after parity; do not publish a stable or `1.0.0`
Hybrid version without a separate explicit task.

## The parity contract

For every Native entry, Hybrid has the same subpath, component names, dot-notation slots,
exported context hooks, XAUI-owned props, unions, defaults and controlled/uncontrolled
behaviour. Keep `variant`, `color`, style props, `style`, `asChild`, accessibility and the
style precedence identical.

Only host-bound types differ where the platform makes identity impossible: a ref targets a
DOM element and an event is a DOM event. Adapt those at the renderer boundary without adding
Hybrid-only props. Add or update the export/type parity checks with every port; a difference
is a defect unless Native changed first.

Do not add Hybrid component pages or previews to `apps/docs`. Native documentation is the
single documentation source for the shared API.

## Renderer choices

- Use `@emotion/styled` for every styled node. No Tailwind, inline stylesheet system or CSS
  file in `packages/hybrid`.
- Use Framer Motion for every animation. Preserve the public animation props and semantics,
  make `animation={false}` static, and respect reduced-motion preferences.
- Filter XAUI props and style props before they reach the DOM. Unknown-property warnings are
  renderer bugs, not harmless noise.
- Preserve `asChild`, ref merging, event composition, focus and keyboard activation.
- Map accessibility props to the equivalent semantic element, role and ARIA attributes while
  keeping the Native-facing prop names.

## Geometry and device scaling

Public numeric style values keep their React Native meaning. At scale 1, **one Native point
equals one CSS logical pixel**: a Native size of `4` must have a computed Hybrid size of
`4px`, not `4em` or a density-multiplied value.

Use a root-relative conversion at the Emotion renderer boundary:

```ts
const toWebUnit = (value: number) => `${value / 16}rem`
```

With the browser's default `16px` root, `toWebUnit(4)` is `0.25rem` and computes to `4px`.
Using `rem` instead of a local `em` prevents a parent's text size from silently enlarging a
nested component. Do not force the document root back to `16px`: browser zoom, a user's root
font-size preference and device DPR are the natural scaling layer. Never multiply dimensions
by DPR, viewport width or another device factor inside a component.

Convert every fixed length at this boundary: spacing, dimensions, gaps, borders, radii,
typography and every hardcoded length brought over from Native. Do not convert unitless values
such as opacity, flex ratios, font weight or z-index. Preserve strings the public API already
accepts.

Translate direction-aware Native names to CSS logical properties, for example
`paddingStart` → `paddingInlineStart` and `start` → `insetInlineStart`. Do not replace them
with physical left/right properties. Expand RN-only internal shorthands before styling.

Use `toWebUnit()` on a resolved number such as `toWebUnit(theme.spacing(2))`; `spacing` is a
function, so passing the function itself produces an invalid value.

## Tokens

`packages/hybrid/src/theme/tokens.gen.ts` is generated from
`tooling/tokens/source.ts`; never edit it by hand. Regenerate it with the Native tokens in
the same commit. `pnpm tokens:check` must keep keys and generated values in parity.

## Porting shape

Mirror Native's source boundaries and component folder names: recipe, context, types, hooks,
root, one file per slot, styles and index. Animation files keep the same responsibility but
use Framer Motion. Pure recipe resolution keeps the Native semantics; Emotion enters only at
the styled-node boundary.

Every component subpath must exist in both `package.json` and `tsup.config.ts`. Root exports
must match Native as well.

Tests follow the repository rule: only pure functions receive unit tests. Components, slots,
hooks and animation constants are verified in a browser, not with component test files.

## P6 order

1. Contract and renderer: theme, provider, hooks, system primitives, Emotion, Framer Motion,
   DOM filtering and parity checks.
2. Reference slice: `Typography`/`TextSpan`, `Icon`, `view`, `Spinner`, `Button`.
3. Static primitives: `Surface`, `Divider`, `Skeleton`, both progress components, `Card`,
   `Avatar`, `Badge`.
4. Actions/status: `CloseButton`, `Chip`, `Alert`, `Fab`, `MorphButton`, `EmptyState`,
   `Widget`, `FlipCard`.
5. Fields/selection: `TextField` through `TagGroup`, in P6.4 of the plan.
6. Overlays/choices: `Accordion` through `Snackbar`, in P6.5 of the plan.
7. Date/calendar, then data/navigation, then charts, in P6.6–P6.8.
8. Parity milestone: all 75 subpaths, exports and public types match before the next beta
   release. Parity does not graduate Hybrid from beta.

## Review checklist

- [ ] Same subpath, exports, slots, hook, XAUI props, unions and defaults as Native.
- [ ] Emotion Styled only; no CSS file or Tailwind in the package.
- [ ] Framer Motion only; static opt-out and reduced motion both work.
- [ ] No style or XAUI-only prop leaks to the DOM.
- [ ] At a `16px` root, every Native numeric length computes to the same CSS pixel value
      (`4` → `0.25rem` → `4px`); no local font-size or DPR multiplier changes it.
- [ ] Fixed lengths use the root-relative conversion; unitless values remain unitless.
- [ ] Logical CSS properties preserve RTL behaviour; no physical left/right style.
- [ ] `style` remains the final override and does not change descendant slots.
- [ ] Only pure helpers have unit tests; browser verification covers rendering and motion.
- [ ] `apps/docs` is untouched.
- [ ] lint, type-check, tests, build, tarball check and export/type parity all pass.
