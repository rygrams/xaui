---
name: xaui-hybrid
description: Expose the @xaui/native v1 API on the web through @xaui/hybrid — a dependency on native re-exported over react-native-web, with Emotion Styled and Framer Motion kept only for web-only components native does not have. Use for any work in packages/hybrid.
---

# XAUI — `@xaui/hybrid`

`@xaui/hybrid` is **`@xaui/native` rendered for the web**. It depends on `@xaui/native` and
re-exports it; `react-native-web` turns those React Native components into DOM nodes. There
is no port and no second implementation: a Hybrid `Button` **is** the Native `Button`.

That is the whole contract. Parity is structural — you cannot drift from an API you import.

`@xaui/hybrid` stays frozen until P4 ships, then follows the P6 order in
`.project-specs/XAUI-V1-PLAN.md`. P6 remains on `0.9.x-beta.x` and the `beta` dist-tag even
at the parity milestone; a stable or `1.0.0` Hybrid release needs a separate explicit task.

## What Hybrid is made of

| Layer                   | Comes from                                                                  |
| ----------------------- | --------------------------------------------------------------------------- |
| Components, slots, hooks | `@xaui/native`, re-exported verbatim                                       |
| DOM rendering            | `react-native-web`, via the consumer's `react-native` alias                |
| Theme, tokens, provider  | `@xaui/native` — Hybrid generates no tokens of its own                     |
| Motion                   | Reanimated, which `react-native-web` runs in the browser                   |
| Web-only components      | Written here, with Emotion Styled + Framer Motion                          |

## The re-export

Every Native subpath has a Hybrid subpath, declared in `package.json` **and**
`tsup.config.ts`, whose source is one line:

```ts
// packages/hybrid/src/components/button/index.ts
export * from '@xaui/native/button'
```

- A subpath exists in Hybrid **because** it exists in Native. Adding one to Hybrid alone is
  a defect; so is leaving one out.
- Never wrap, re-type, rename or narrow a re-export. No `Omit<>`, no adapter component, no
  "DOM-safe" variant of a prop. `react-native-web` is the adapter.
- Ref targets and event objects become their DOM equivalents through `react-native-web`,
  not through anything written here.
- If a component misbehaves on the web, fix it in `@xaui/native` behind a
  `Platform.OS === 'web'` branch or a `.web.tsx` file, so both packages get the fix. A patch
  applied in `packages/hybrid` is a fork.

## Web-only components

`react-native-web` does not cover everything a web app needs, and some things Native has no
reason to own. Those, and only those, are written in `packages/hybrid/src/components/`:

- Use `@emotion/styled` for styling and Framer Motion for animation. No Tailwind, no CSS
  file, no inline stylesheet system.
- Follow the same v1 API rules as a Native component — compound root plus dot-notation
  slots, `asChild`, `variant` / `color` / style props, exported context hook, namespaced
  `displayName`. The API vocabulary does not change because the renderer does.
- Read tokens from the `@xaui/native` theme. Convert fixed lengths at the Emotion boundary
  with a root-relative unit so one Native point stays one CSS logical pixel at scale 1:

  ```ts
  const toWebUnit = (value: number) => `${value / 16}rem`
  ```

  Do not force the document root back to `16px`, and never multiply by DPR or viewport
  width — browser zoom and the user's root font-size are the scaling layer.
- Use logical CSS properties: `paddingStart` → `paddingInlineStart`, `start` →
  `insetInlineStart`. Never physical `left` / `right`.
- Filter XAUI and style props before they reach the DOM. An unknown-property warning is a
  bug, not noise.
- If Native could plausibly want the component too, it belongs in Native, not here.

## Setup on the consumer side

The bundler resolves `react-native` to `react-native-web` and prefers `.web.*` files. The
proven configuration is the one `apps/docs` already runs, and `HYBRID-SETUP.md` documents
it for Next.js, Vite and webpack. Keep that document in step with any change here.

## Geometry

At scale 1, one Native point equals one CSS logical pixel — `react-native-web` performs that
conversion for every re-exported component. Hybrid adds no density multiplier of its own,
and the rule applies unchanged to the web-only components above.

## Tests

The repository rule holds: pure functions only. A re-export has nothing to test; the browser
verifies rendering and motion. Web-only components are verified in a browser, like Native
components are verified on their demo screen.

## Docs

Do not add Hybrid component pages or previews to `apps/docs`. The Native documentation is
the single source for the shared API — it describes the same components. A web-only
component is documented once, on its own page, and marked as web-only.

## P6 order

1. **Dependency and peers** — `@xaui/native` as a dependency; `react-native-web`, `react`,
   `react-dom` and Native's optional peers declared; Emotion and Framer Motion kept as peers
   for the web-only surface.
2. **Re-export layer** — every Native subpath re-exported, in `package.json` and
   `tsup.config.ts`, root barrel included.
3. **Retire the superseded ports** — the Emotion `Typography`, `TextSpan` and `Icon`, the
   Hybrid `tokens.gen.ts` and the renderer boundary that existed only to mirror Native.
4. **Bundler setup** — alias, `.web.*` resolution and transpile list, documented and
   verified in the browser.
5. **Web audit** — walk the 75 subpaths under `react-native-web`; record every component
   that does not render or behave correctly as its own task.
6. **Web-only fills** — Emotion + Framer Motion, only where the audit found a real gap.
7. **Parity milestone** — every Native subpath resolves from `@xaui/hybrid`, the tarball is
   complete, and Hybrid publishes `0.9.x-beta.x` without graduating.

## Review checklist

- [ ] Hybrid depends on `@xaui/native`; no component is re-implemented here.
- [ ] Every new Native subpath has its one-line Hybrid re-export in `package.json` and
      `tsup.config.ts`; no Hybrid-only subpath exists without a web-only component behind it.
- [ ] No wrapper, no re-typed export, no Hybrid-only prop on a shared component.
- [ ] A web fix went into `@xaui/native` (`.web.tsx` / `Platform.OS`), not into a Hybrid copy.
- [ ] Web-only components: Emotion Styled + Framer Motion, v1 API rules, tokens from the
      Native theme, no CSS file or Tailwind.
- [ ] Fixed lengths use the root-relative conversion (`4` → `0.25rem` → `4px`); unitless
      values stay unitless; logical properties preserve RTL.
- [ ] `HYBRID-SETUP.md` still matches what the package expects from a bundler.
- [ ] Only pure helpers have unit tests; the browser covers rendering and motion.
- [ ] `apps/docs` is untouched by shared-API work.
- [ ] lint, type-check, tests, build and the tarball check all pass.
