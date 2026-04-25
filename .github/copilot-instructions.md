# Copilot Instructions

XAUI is a Flutter-inspired React Native UI library built as a **Turborepo + pnpm workspace monorepo**.

## Packages and apps

| Workspace | Description |
|-----------|-------------|
| `@xaui/core` | Theme config, design tokens, color palette |
| `@xaui/native` | React Native components |
| `@xaui/hybrid` | Mobile WebView components |
| `@xaui/icons` | Icon components |
| `@xaui/colors` | Tailwind-inspired color palette (20+ colors × 11 shades) |
| `apps/docs` | Next.js documentation site |
| `apps/demo` | Expo React Native demo |
| `apps/mcp` | MCP server app |

## Commands

```bash
# Root (all workspaces)
pnpm build
pnpm test
pnpm lint
pnpm type-check
pnpm format

# Target a workspace
pnpm --filter @xaui/native build
pnpm --filter @xaui/native lint
pnpm --filter @xaui/native type-check

# Run a single test file
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx

# Run a single named test
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx -t "renders default button"

# Lint a single file
pnpm --filter @xaui/native exec eslint src/components/button/button.tsx
```

> `pnpm test` depends on `build` (Turbo wires this automatically).

## Component structure (`@xaui/native` and `@xaui/hybrid`)

Each component lives in its own folder under `src/components/<name>/`:

```
src/components/button/
  button.type.ts      # prop types and variant types
  button.hook.ts      # logic hooks
  button.style.ts     # StyleSheet.create(...)
  button.animation.ts # animation helpers (optional)
  button.tsx          # component
  index.ts            # re-exports
src/__tests__/components/button/
  button.test.tsx
  button.hook.test.ts
```

**Every component must be added as:**
1. An entry in `tsup.config.ts` → `'button/index': 'src/components/button/index.ts'`
2. An export in `package.json` → `"./button": { "types": "...", "import": "...", "require": "..." }`

Icon components in `packages/native/src/components/icon/icons/` do **not** need test files.

## Theme system

Components consume theme via hooks from `src/core/`:

```ts
import { useXUITheme, useXUIColors, useBorderRadiusStyles, useColorMode } from '../../core/theme-hooks'
```

- `XUIProvider` (from `src/core/theme-context.tsx`) wraps the app and provides the theme via context.
- `useXUITheme()` — throws if used outside `XUIProvider`.
- `useColorMode()` — returns `'light' | 'dark'` from native color scheme.
- Theme tokens: `theme.borderRadius`, `theme.spacing`, `theme.fontSizes`, `theme.colors`, `theme.palette`.

Shared prop types (`ThemeColor`, `Size`, `Radius`) live in `packages/native/src/types/`.

```ts
type ThemeColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'default'
type Size = 'xs' | 'sm' | 'md' | 'lg'
type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full'
```

## Code conventions

- **No** `console.log`, `console.error`, or `debugger`.
- **No** unnecessary comments — only comment non-obvious decisions.
- Functions must have **≤ 3 parameters**.
- Use **early returns** to avoid deep nesting.
- Avoid `any`; prefer explicit types.
- Use `import type` for type-only imports.
- Animations: use React Native's built-in `Animated` API — **do not use** `react-native-reanimated`.
- Styles: use `StyleSheet.create` for `@xaui/native`; use Tailwind / framer-motion for `@xaui/hybrid`.
- Prefix unused variables with `_` to satisfy the no-unused-vars rule.

## Prettier settings

No semicolons · single quotes · `printWidth: 85` · `tabWidth: 2` · ES5 trailing commas · `arrowParens: avoid` · LF line endings.

## Release workflow (Changesets)

Every PR that touches a package needs a changeset. Always use **patch** bump (project is in beta).

```bash
pnpm changeset   # creates .changeset/*.md — commit this file
```

❌ **Never** run `pnpm changeset version`, `pnpm version-packages`, or `pnpm release` locally — CI handles these.

## Commit messages

Use [Commitizen](https://commitizen.github.io/) conventional commit format (e.g., `feat:`, `fix:`, `chore:`).
