# AGENTS.md

Practical guidance for agentic coding assistants in this monorepo.

## Scope and precedence

- Applies repository-wide unless a deeper instruction file overrides it.
- Follow `CLAUDE.md` in addition to this file.
- The library follows the **v1 API** described in `.project-specs/XAUI-V1-PLAN.md`. Load the
  skill that owns the task before writing code — see *Skills* below.

## Cursor/Copilot rules

- `.cursor/rules/`: none found.
- `.cursorrules`: not present.
- `.github/copilot-instructions.md`: not present.
- Re-check these paths if new tooling files are added.

## Project layout

- Turborepo + pnpm workspace monorepo.
- Workspaces: `apps/*`, `packages/*`.
- Published libraries: `@xaui/native` (React Native), `@xaui/hybrid` (mobile webview).
- Apps: `docs` (Next.js), `demo` (Expo).

## Roadmap status

- Tracked in the `Roadmap status` table of `CLAUDE.md` — one line per task: ref, title, status.
- Update the status there when a task lands; it is the only place that records progress.

## Skills

Source of truth in `.agents/skills/<name>/SKILL.md`, copied (never symlinked) into
`.claude/skills/`.

- `xaui-flow` — start here on any non-trivial task; it routes to the others
- `xaui-component` — writing a component
- `xaui-system` — recipe engine, style cache, slots, `PressableFeedback`, `Portal`, `Icon`
- `xaui-theme` — tokens, OKLab derivation, `createTheme`, provider
- `xaui-hybrid` — porting to the web renderer, `em` units
- `xaui-docs` — docs pages, demo screens, generated tables
- `xaui-legacy-migration` — the frozen tree and its codemods
- `xaui-review` — run on the diff before every PR

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
pnpm --filter @xaui/native test
pnpm --filter docs dev
```

## Single test commands (most important)

Use Vitest directly for exact targeting:

```bash
# run one test file
pnpm --filter @xaui/native exec vitest run src/__tests__/utils/colors.test.ts
# run one named test in a file
pnpm --filter @xaui/native exec vitest run src/__tests__/utils/colors.test.ts -t "mix in oklab"
# watch one test file
pnpm --filter @xaui/native exec vitest src/__tests__/utils/colors.test.ts
```

Alternative passthrough form:

```bash
pnpm --filter @xaui/native test -- src/__tests__/utils/colors.test.ts
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
- Types live in `*.type.ts`, hooks in `*.hook.ts`, static styles in `*.style.ts`.
- Style variants live in `*.recipe.ts`, slot context in `*.context.ts`.
- One file per slot, named `<component>-<slot>.tsx`.
- Keep naming aligned with neighboring modules.

## Testing conventions

- **Utility functions only.** Pure, deterministic code gets a test file: `utils/`, the
  colour engine, `deriveColors`, `createTheme`, recipe resolution, the style cache,
  `childrenToString`, `mergeProps` / `mergeRefs`, token generation.
- **No test file for components, slots or their hooks.** They are verified by the demo
  screen and the docs preview, in light and dark.
- Logic in a component that deserves pinning down is extracted to a pure function under
  `utils/`, and that function is tested.
- Mirror source paths under `src/__tests__/...`; suffix `*.test.ts`.

## Branching

- **Always branch before starting an implementation**, before the first line of code.
- Never commit to `main`.
- One branch per coherent unit of work: `feat/`, `fix/`, `refactor/`, `chore/`.

## Pull requests

- Open with `gh pr create`, never as a draft unless asked.
- **Always assign to the authenticated `gh` user**: `--assignee @me`.
- **Always add at least one label**: `--label <name>`, chosen from the repository's
  existing labels (`bug`, `documentation`, `enhancement`, …).
- Body covers What, Why and How.
- Resolve each review thread once its comment is addressed; leave open only what you
  deliberately did not act on, with a reply explaining why.

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
