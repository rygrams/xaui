# Copilot Instructions

XAUI is a pnpm + Turborepo monorepo. The active workspaces are `packages/core`,
`packages/native`, `packages/hybrid`, `packages/icons`, `apps/docs`, and
`apps/demo`.

## Build, test, and lint commands

```bash
# Root
pnpm build
pnpm test
pnpm lint
pnpm type-check
pnpm format

# Target a workspace
pnpm --filter @xaui/native build
pnpm --filter @xaui/native test
pnpm --filter @xaui/native lint
pnpm --filter @xaui/native type-check
pnpm --filter docs build
pnpm --filter docs test
pnpm --filter demo lint

# Run a single test file
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx

# Run a single named test
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx -t "renders default button"

# Lint a single file
pnpm --filter @xaui/native exec eslint src/components/button/button.tsx
```

`turbo` wires task dependencies: root `test` depends on `build`, and root
`lint`/`type-check` depend on upstream builds. `packages/core`,
`packages/icons`, and `apps/docs` use `passWithNoTests: true` in Vitest.

## High-level architecture

- `@xaui/core` is the source of truth for tokens, palette, and theme types.
  Both native and hybrid providers build their runtime theme from
  `defaultTheme` / `defaultDarkTheme` in `@xaui/core/theme`.
- `@xaui/native` is the main component surface. Public APIs are exported as deep
  entrypoints such as `@xaui/native/button` and `@xaui/native/dialog`; the root
  `packages/native/src/index.ts` is intentionally empty.
- `@xaui/hybrid` mirrors the same theme model for browser and mobile-webview
  components, with its own provider that reads `prefers-color-scheme`.
- `apps/docs` is data-driven rather than page-per-component. The component
  catalog lives in `apps/docs/lib/data/components.ts`, prop tables and examples
  live in `apps/docs/lib/data/component-props.ts`, and the route page derives
  install/import/usage snippets from that metadata.
- `apps/demo` is the Expo app that consumes the workspace packages for manual
  validation of native behavior.
- Native tests run in jsdom and alias `@xaui/core/*` directly to source files.
  They also rely on package-level mocks for `react-native`,
  `react-native-reanimated`, and `react-native-svg`.

## Key conventions

- Use `pnpm` only.
- In `@xaui/native` and `@xaui/hybrid`, components live under
  `src/components/<slug>/` and usually include `<slug>.type.ts`,
  `<slug>.hook.ts`, `<slug>.style.ts`, optional `<slug>.animation.ts`,
  `<slug>.tsx`, and `index.ts`. Tests mirror the source path under
  `src/__tests__/components/<slug>/`.
- A new public component is only fully wired when all related surfaces are
  updated together: the component folder, the package `tsup.config.ts` entry
  map, the package `exports` in `package.json`, and the docs catalog in
  `apps/docs/lib/data/components.ts` when the API should appear on the site.
- Theme access should go through the package hooks and providers:
  `useXUITheme`, `useXUIColors`, `useXUIPalette`, `useBorderRadiusStyles`, and
  `XUIProvider`. `useXUITheme()` throws outside a provider.
- Match the existing package split for implementation details:
  `@xaui/native` styles are built with `StyleSheet.create`, and animations may
  use either React Native `Animated` or `react-native-reanimated` depending on
  the surrounding component. `@xaui/hybrid` uses web-oriented styling and
  browser color-scheme detection.
- Prefer `import type` for type-only imports, and prefix intentionally unused
  variables with `_` to satisfy the repo ESLint config.
- Package changes require a changeset via `pnpm changeset`. Do not run
  `pnpm changeset version`, `pnpm version-packages`, or `pnpm release`
  locally.
