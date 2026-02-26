# AGENTS.md

Practical guidance for agentic coding assistants in this monorepo.

## Scope and precedence

- Applies repository-wide unless a deeper instruction file overrides it.
- Follow `CLAUDE.md` in addition to this file.

## Cursor/Copilot rules

- `.cursor/rules/`: none found.
- `.cursorrules`: not present.
- `.github/copilot-instructions.md`: not present.
- Re-check these paths if new tooling files are added.

## Project layout

- Turborepo + pnpm workspace monorepo.
- Workspaces: `apps/*`, `packages/*`.
- Main libraries: `@xaui/core`, `@xaui/native`, `@xaui/hybrid`, `@xaui/icons`.
- Apps: `docs` (Next.js), `demo` (Expo).

## Environment

- Use `pnpm` only.
- Node 20+ preferred.
- Package manager pin: `pnpm@10.28.0`.

## Root scripts

Run from repo root:

```bash
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm type-check
pnpm format
```

## Workspace scripts

General form:

```bash
pnpm --filter <workspace> <script>
```

Examples:

```bash
pnpm --filter @xaui/native build
pnpm --filter @xaui/hybrid lint
pnpm --filter @xaui/core test
pnpm --filter docs dev
```

## Single test commands (most important)

Use Vitest directly for exact targeting:

```bash
# run one test file
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx
# run one named test in a file
pnpm --filter @xaui/native exec vitest run src/__tests__/components/button/button.test.tsx -t "renders default button"
# watch one test file
pnpm --filter @xaui/native exec vitest src/__tests__/components/button/button.test.tsx
```

Alternative passthrough form:

```bash
pnpm --filter @xaui/native test -- src/__tests__/components/button/button.test.tsx
```

## Lint, type-check, and build targeting

- Monorepo lint: `pnpm lint`
- Monorepo type-check: `pnpm type-check`
- Workspace lint: `pnpm --filter @xaui/native lint`
- Workspace type-check: `pnpm --filter @xaui/native type-check`
- Lint one file directly:

```bash
pnpm --filter @xaui/native exec eslint src/components/button/button.tsx
```

- Turbo note: root `test` depends on `build`.

## Formatting rules (Prettier)

- No semicolons.
- Single quotes.
- Trailing commas: ES5.
- Print width: 85.
- Tab width: 2 spaces.
- `arrowParens: avoid`.
- `endOfLine: lf`.

## ESLint and TypeScript rules

- Base ESLint config: `eslint.config.base.js`.
- TS linting enabled for `*.ts` and `*.tsx`.
- `@typescript-eslint/no-unused-vars`: error (allow `_`-prefixed names).
- `@typescript-eslint/no-explicit-any`: warn; avoid `any` unless necessary.
- TS strict mode is enabled (`tsconfig.base.json`).

## Import guidelines

- Keep imports grouped: external first, internal second.
- Prefer `import type` for type-only imports.
- Remove unused imports quickly.
- Prefer package entrypoints over brittle deep import paths.
- Match the style of nearby files when uncertain.

## Naming and file conventions

- React component identifiers: PascalCase (`Button`, `Alert`).
- Component folder/file slugs: commonly kebab-case (`bottom-sheet`).
- Types frequently live in `*.type.ts`.
- Hooks frequently live in `*.hook.ts` or `*.hook.tsx`.
- Styles frequently live in `*.style.ts`.
- Keep naming aligned with neighboring modules.

## Testing conventions

- Add/update tests for behavioral changes.
- Mirror source paths under `src/__tests__/...`.
- Common suffixes: `*.test.tsx`, `*.hook.test.ts`, `*.utils.test.ts`.
- Exception: icon components do not require dedicated tests.

## Error handling and control flow

- Use early returns to avoid deep nesting.
- Validate/clamp external inputs and provide safe defaults.
- Keep utility logic deterministic and side-effect light.
- Do not hide failures behind silent behavior changes.

## Prohibited patterns

- No `console.log`, `console.error`, or `debugger` in committed code.
- Avoid unnecessary comments; comment only non-obvious decisions.
- Avoid broad `any` usage.
- Avoid unrelated refactors in focused changes.
