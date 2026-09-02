# XAUI Library

XAUI is a Flutter-inspired component system targeting React Native and hybrid web/native experiences within a Turborepo monorepo. `@xaui/native` holds the tokens, the theme and the single provider; `@xaui/native-legacy` is the frozen v0 tree, kept only until the v1 API reaches parity.

**[Documentation → ui.xtartapp.com](https://ui.xtartapp.com)**

## Monorepo architecture

- **Package manager & task runner**: `pnpm` (v10+) for installations and `turbo` for orchestrating builds, linting, and tests.
- **Build graph**: `turbo run build` compiles every workspace and emits outputs under `dist/**` or `.next/**` depending on the target.
- **Quality pipeline**: `vitest` for tests, `eslint`/`@typescript-eslint` for linting, `prettier` for formatting, and `changesets` for release automation.

## Key workspaces

### Packages

- `@xaui/native` — the v1 API: design tokens, the OKLab colour engine, `createTheme` and `XAUIProvider`, with the component tree being rebuilt on top of them.
- `@xaui/native-legacy` — the 47 frozen v0 components. It carries no theme of its own and reads `@xaui/native`'s provider.

### Applications

- `apps/demo` — Expo-based sandbox showcasing mobile usage patterns.
- `apps/docs` — Next.js-powered documentation site.

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

## Testing & validation

- Unit tests run with `vitest` (config in `vitest.config.ts` at the root).
- Each package keeps its own `__tests__` folder under `packages/*/__tests__`.
- `turbo` ensures `test`, `lint`, and `type-check` run after a fresh `build` pass.

## Release workflow

Release automation relies on `@changesets/cli`:

- `pnpm changeset` creates change files describing API/dep updates.
- `pnpm version-packages` (alias `pnpm version`) adjusts versions and regenerates CHANGELOGs.
- `pnpm release` builds all `@xaui/*` packages (`turbo run build --filter=@xaui/*`) and runs `changeset publish`.

## Documentation

- **Component docs** — [ui.xtartapp.com](https://ui.xtartapp.com)
- `@xaui/native` — [packages/native/README.md](./packages/native/README.md) — React Native components, hooks, and providers.

## License

MIT
