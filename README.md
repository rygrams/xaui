# XAUI Library

> [!WARNING]
> **🚧 ALPHA VERSION — ACTIVE DEVELOPMENT 🚧**
>
> This library is evolving rapidly. Public APIs may change without notice as the project matures.

XAUI is a Flutter-inspired component system targeting React Native, hybrid web/native experiences, and interactive documentation within a Turborepo monorepo. The thematic core (`@xaui/core`) centralises tokens, dynamic theming, and motion primitives. Platform-specific packages build on that foundation to deliver native-ready, hybrid, and documentation-focused tooling.

## Monorepo architecture

- **Package manager & task runner**: `pnpm` (v10+) for installations and `turbo` for orchestrating builds, linting, and tests.
- **Build graph**: `turbo run build` compiles every workspace and emits outputs under `dist/**` or `.next/**` depending on the target.
- **Quality pipeline**: `vitest` for tests, `eslint`/`@typescript-eslint` for linting, `prettier` for formatting, and `changesets` for release automation.

## Key workspaces

### Packages
- `@xaui/core` — shared theme tokens (colors, spacing, typography, shadows) plus hooks like `useXUITheme` and `useColorMode`. It is the source of truth for all downstream packages.
- `@xaui/native` — React Native components (animated buttons, circular/linear indicators, hooks, `XUIProvider`) that leverage `@xaui/core` while exposing mobile-first helpers (variants, spinner, lightweight animation states powered by Reanimated).
- `@xaui/hybrid` — hybrid React/ReactDOM package layered with `framer-motion` and `tailwindcss` for web-first experiences. In-depth documentation is still pending (`packages/hybrid/README.md`).

### Applications
- `apps/demo` — Expo-based sandbox (with `app` router + `app.json`) showcasing mobile usage patterns.
- `apps/docs` — Next.js-powered documentation site (`app/` directory, `next/font`, content in `apps/docs/contents`).
- `apps/mcp` — placeholder (only `.gitkeep`) reserved for future tooling or internal console.

## Getting started

1. Install dependencies from the root: `pnpm install`.
2. Run `pnpm dev` to start `turbo run dev` (each workspace watches files).
3. Target a specific workspace with `pnpm --filter=<workspace> dev` (e.g., `pnpm --filter=apps/demo dev`).

### Useful scripts

- `pnpm build` → `turbo run build` (compile everything).
- `pnpm test` → `turbo run test` (depends on `build`; runs all Vitest suites).
- `pnpm lint` → `turbo run lint`.
- `pnpm format` → `prettier --write "**/*.{ts,tsx,md}"`.
- `pnpm type-check` → `turbo run type-check`.

App-level instructions (Expo, Next.js) remain in `apps/demo/README.md` and `apps/docs/README.md` respectively.

## Testing & validation

- Unit tests run with `vitest` (config in `vitest.config.ts` at the root).
- Each package keeps its own `__tests__` folder under `packages/*/__tests__`.
- `turbo` ensures `test`, `lint`, and `type-check` run after a fresh `build` pass.

## Release workflow

Release automation relies on `@changesets/cli`:

- `pnpm changeset` creates change files describing API/dep updates.
- `pnpm version-packages` (alias `pnpm version`) adjusts versions and regenerates CHANGELOGs.
- `pnpm release` builds all `@xaui/*` packages (`turbo run build --filter=@xaui/*`) and runs `changeset publish`.

## Resources

- `packages/core/README.md` details the theme system and shared APIs.
- `packages/native/README.md` explains mobile components, hooks, and providers.
- `packages/hybrid/README.md` currently states “no doc yet” but lists installation/dependency info.
- `apps/docs/README.md` and `apps/demo/README.md` cover Next.js and Expo workflows.

For questions, open an issue or follow the future MCP guidelines when the cockpit app is defined.
