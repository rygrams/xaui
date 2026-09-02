# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XAUI is a React Native UI library built as a Turborepo monorepo: composition-first components,
animations on the UI thread with Reanimated, and a semantic token system.

The library is being rebuilt on the **v1 API**. Everything below describes v1 — that is what
every new line of code follows. The plan of record is `.project-specs/XAUI-V1-PLAN.md`, and the
skills in `.agents/skills/` encode it by task type.

Migration work on the frozen previous generation is out of scope here: it lives entirely in the
`xaui-legacy-migration` skill, and nothing from that API is written in new code.

## The v1 API

Two published packages, `@xaui/native` and `@xaui/hybrid`, sharing one API.

- **Composition, not configuration** — a `forwardRef` root plus dot-notation slots
  (`<Button.Icon>`, `<Button.Label>`), `asChild` on every root, an exported context hook per
  compound, namespaced `displayName`. The thirteen rules are in the `xaui-component` skill.
- **Two appearance props, no more** — `variant` (a flat union of ten sanctioned values) and
  `color` (a raw tint). Everything else goes through the slot's own `style`.
- **A recipe engine with a style cache** in `system/` — variants name tokens, styles resolve
  once at the root, slots receive stable `StyleSheet` references.
- **A two-layer theme** — a small hand-written source layer, ~30 tokens derived from it in
  OKLab. `createTheme` at module level, controlled `colorMode`, tokens generated into `.gen.ts`
  files that are never edited by hand.
- **100% Reanimated** — `react-native-reanimated` and `react-native-worklets` are required peer
  dependencies. Touch feedback comes from one shared `PressableFeedback` primitive, never a
  per-component animation file.
- **Zero runtime dependencies**; `gesture-handler`, `svg` and `safe-area-context` are optional
  peers, imported only by the components that use them.
- **RTL-safe styles** — `paddingStart` / `paddingEnd`, `marginStart` / `marginEnd`, `start` /
  `end`. Never `left` / `right`.
- **A fifteen-component core** for 1.0. Everything else waits for `1.x`.

## Roadmap status

One line per task: ref, title, status. No commentary — update the status when a task lands.
Task detail lives in `.project-specs/XAUI-V1-PLAN.md`.

| Ref | Task | Status |
| --- | --- | --- |
| P0.1 | Split into `@xaui/native-legacy` and scaffold v1 | done |
| P0.2 | Single token source and generator | done |
| P0.3 | OKLab colour engine | done |
| P0.4 | Derived colour layer | done |
| P0.5 | Contrast guard in CI | done |
| P0.6 | `createTheme` | todo |
| P0.7 | `XAUIProvider` | todo |
| P0.8 | Legacy `core-shim.ts` | todo |
| P0.9 | Package hygiene and optional peers | done |
| P0.10 | ESLint rule for R13 | todo |
| P0.11 | Publish `@xaui/native-legacy@0.2.8` and the codemod | todo |
| P1 | `system/` — recipe, slots, feedback, portal, icon, hooks | todo |
| P2 | Reference `Button`, perf baseline, API review | todo |
| P3 | The fifteen-component core | todo |
| P4 | Docs, generated tables, `1.0.0` | todo |
| P5 | The remaining 32 components | todo |
| P6 | `@xaui/hybrid` on the v1 API | todo |
| P7 | Delete `native-legacy` | todo |

## Skills

Agent skills live in `.agents/skills/<name>/SKILL.md` — that is the source of truth, shared
by every agent.

`.claude/skills/<name>/` holds a **copy** of each skill, never a symlink: symlinked skills are
not resolved reliably. So when a skill is added or edited in `.agents/skills/`, copy the folder
across in the same commit:

```bash
cp -R .agents/skills/<name> .claude/skills/<name>
```

| Skill | Use it for |
| --- | --- |
| `xaui-flow` | Start here on any non-trivial task — situates it in the v1 phasing and routes it |
| `xaui-component` | Writing a `@xaui/native` v1 component |
| `xaui-system` | `system/` primitives: recipe engine, style cache, slots, `PressableFeedback`, `Portal`, `Icon` |
| `xaui-theme` | Tokens, OKLab colour derivation, `createTheme`, provider, token generation |
| `xaui-hybrid` | Porting to `@xaui/hybrid` and the `em` sizing convention |
| `xaui-docs` | Docs pages, demo screens, generated prop tables, `llms.txt` |
| `xaui-legacy-migration` | The frozen tree, `core-shim`, codemods, `@deprecated` |
| `xaui-review` | Reviewing a diff against the v1 rules — run before every PR |

The plan these skills encode is `.project-specs/XAUI-V1-PLAN.md`, with the runnable token
references alongside it (`source.mjs`, `derive.mjs`, `oklab.mjs`, `tokens.json`).

## Monorepo Architecture

This is a **Turborepo monorepo** using **pnpm workspaces**:

- `apps/*` - Application packages (docs site, Expo demo)
- `packages/*` - Published packages

All workspace packages are managed through the root `package.json` and built/tested via Turborepo's task orchestration.

**Workspaces:**

- `@xaui/native` - React Native component library
- `@xaui/hybrid` - the same API rendered for mobile webviews
- `demo` - Expo React Native demo application
- `docs` - Next.js documentation site

**Package configurations:**

- Library packages (`@xaui/*`) use **tsup** for building with dual CJS/ESM output
- All packages have individual test configurations with Vitest
- Apps without tests should use `passWithNoTests: true` in vitest.config.ts to prevent CI failures

## Development Commands

**Package Manager**: This project uses `pnpm` (version 10.28.0+). Always use `pnpm` instead of npm or yarn.

**Common commands** (run from repository root):

```bash
pnpm dev              # Start development servers for all apps
pnpm build            # Build all packages and apps
pnpm test             # Run tests across all workspaces
pnpm lint             # Lint all workspaces
pnpm format           # Format code with Prettier
```

**Workspace-specific commands**:

```bash
pnpm --filter <workspace-name> <command>   # Run command in specific workspace
pnpm --filter @xaui/native dev              # Example: dev mode for the native package
pnpm --filter docs test                    # Example: test docs app
```

## Component Structure

Components live under `packages/native` and `packages/hybrid`, for React Native and mobile
webview respectively. `packages/<pkg>/src` has six top-level folders:

```
src/
├── theme/        # tokens and their access — generated .gen.ts files are never hand-edited
├── provider/     # what wraps the app once
├── system/       # what third parties need to build THEIR own XAUI component — public
├── hooks/        # React hooks shared by ≥ 2 components
├── utils/        # pure, React-free, internal — private
├── types/        # types used by ≥ 2 components
├── components/   # one folder per component
└── __tests__/    # mirrors the tree above — utility functions only
```

A file used by a single component stays in that component's folder; promotion happens at the
second use, never by anticipation. `system/` is public and follows semver, `utils/` is private
and can change at any time — a helper that becomes useful outside **moves**, it is not
re-exported.

A component folder:

```
components/button/
├── button.recipe.ts     # variants → tokens. Source of truth for style, no hardcoded values
├── button.context.ts    # slot context carrying RESOLVED values + the exported useButton hook
├── button.type.ts       # ButtonProps, ButtonLabelProps…
├── button.hook.ts       # non-visual logic — only if there is any
├── button.style.ts      # static StyleSheet only — often tiny, often absent
├── button.tsx           # the root
├── button-label.tsx     # one file per slot
├── button-icon.tsx
└── index.ts             # Object.assign(ButtonRoot, { Label, Icon })
```

**No empty file "to respect the convention."** A component without slots has no `.context.ts`;
without animation, no `.animation.ts`.

Each component is an independent subpath export — `@xaui/native/button`, `@xaui/hybrid/button` —
declared in `package.json` and in `tsup.config.ts`:

```jsonc
"exports": {
  "./button": {
    "types": "./dist/button/index.d.ts",
    "import": "./dist/button/index.js",
    "require": "./dist/button/index.js"
  }
}
```

Full detail, including the thirteen rules and the per-component loop: the `xaui-component` skill.

## Hybrid (@xaui/hybrid) Sizing Convention

All sizing in `@xaui/hybrid` components must use **`em` units** (not `px`) so that the hybrid version scales identically to the native version. A helper `toEm(px)` function converts theme pixel values:

```ts
const toEm = (px: number) => `${px / 16}em`
```

This applies to:

- **Spacing** (padding, margin, gap)
- **Dimensions** (width, height)
- **Border** (borderWidth, borderRadius)
- **Typography** (fontSize)
- **Any fixed pixel value** from the theme or native StyleSheet

When porting a native component to hybrid:

1. Use `toEm()` for every numeric size from `theme.spacing`, `theme.borderWidth`, `theme.fontSizes`, `theme.borderRadius`
2. Use `toEm()` for every fixed pixel value from the native `StyleSheet` (e.g., `gap: 12` → `gap: toEm(12)`)
3. Use CSS-valid properties only — **never** use React Native shorthand properties like `paddingVertical`, `paddingHorizontal`, `marginVertical`, `marginHorizontal`. Instead, split them into `paddingTop`/`paddingBottom`, `paddingLeft`/`paddingRight`, etc.

See the `xaui-hybrid` skill.

## Testing

**Run tests:**

```bash
pnpm test                          # Run all tests in monorepo
pnpm --filter @xaui/native test    # Run tests for specific package
pnpm --filter @xaui/native test:ui # Run tests with Vitest UI
pnpm --filter @xaui/native test:coverage # Run tests with coverage
```

**What gets a test file — utility functions only.**

Tests cover pure, deterministic code: everything in `utils/`, the colour engine and
`deriveColors`, `createTheme`, recipe resolution and the style cache, `childrenToString`,
`mergeProps` / `mergeRefs`, token generation.

**Components, slots and their hooks get no test file.** They are verified by their demo
screen and their docs preview, in light and dark. When a component holds logic worth
pinning down, extract that logic into a pure function under `utils/` — and test that.

Test files mirror the source path: `src/utils/colors.ts` →
`src/__tests__/utils/colors.test.ts`.

**Test configuration:**

- Vitest is installed at root level and inherited by workspaces
- Packages with tests use standard Vitest config (e.g., `packages/native/vitest.config.ts`)
- Apps without tests must include `passWithNoTests: true` to avoid CI failures (e.g., `apps/docs/vitest.config.ts`)

**Important:** Turborepo runs `test` tasks with `dependsOn: ["build"]`, so builds happen automatically before tests run.

## Code Style

**Prettier** is configured with these key settings:

- No semicolons
- Single quotes
- 85 character line width
- 2 space indentation
- ES5 trailing commas
- function must not have more than 3 parameters

Run `pnpm format` to auto-format code.

## Technology Stack

- **TypeScript**: Fully typed codebase
- **React Native**: Mobile UI framework
- **React Native Reanimated**: Native animations
- **Next.js**: Documentation site
- **Vitest**: Testing framework
- **Turborepo**: Build system and task runner
- **Changesets**: Version management and publishing
- **tsup**: Package bundler for library packages

## Requirements

- Node.js >= 20
- pnpm 10.28.0+

## Code Best Practices

- Dont add any console.log or console.error
- Dont add any debugger statements
- Dont add any comments that are not needed
- Avoid deep code nesting like if (condition) { if (condition) { if (condition) { } } } or for (let i = 0; i < 10; i++) { if (condition) { if (condition) { if (condition) { } } } }
- Use early returns to avoid deep code nesting
- Avoid any type as much as possible
- **test utility functions only, never components** — see *Testing* above
- run test and lint after each code change
- do a code review after each component code change and simplify if needed — use the
  `xaui-review` skill

## Package Guidelines

- Use pnpm for package management
- Use workspace: \* for dependencies
- `react-native-reanimated` and `react-native-worklets` are required peer dependencies; all
  animation goes through them, never RN's built-in `Animated`
- Package name should be in singular form
- dont use css file for styling use tailwind for styling or framer-motion for animations

## Release Process

This project uses **Changesets** for versioning and publishing with an automated CI/CD workflow:

### Creating a Changeset (Required for Every PR)

When you make changes to a package, create a changeset to document the changes:

```bash
pnpm changeset              # Create a new changeset
```

Follow the prompts:

1. Select which packages changed (space to select, enter to confirm)
2. Choose bump type: major, minor, or **patch** (we're in beta, always use patch)
3. Write a summary of the changes

This creates a `.changeset/*.md` file. **Commit this file with your changes.**

```bash
git add .changeset/*.md
git commit -m "chore: add changeset for feature X"
```

### IMPORTANT: Do NOT Run These Commands Locally

❌ **NEVER** run `pnpm changeset version` locally
❌ **NEVER** run `pnpm version-packages` locally
❌ **NEVER** run `pnpm release` locally

These commands are handled automatically by the CI/CD pipeline.

### Automated Release Workflow

1. **Commit changeset files** (`.changeset/*.md`) to your branch
2. **Merge PR to main** - CI runs tests and builds
3. **Changesets Action automatically:**
   - Creates a "Version Packages" PR with updated versions and CHANGELOGs
   - Or adds to existing "Version Packages" PR if one exists
4. **When "Version Packages" PR is merged:**
   - Packages are built with `pnpm run build --filter=@xaui/*`
   - Published to npm with `pnpm changeset publish`

The entire process is automated - you only need to create and commit changeset files.

## CI/CD

The project uses GitHub Actions with the following workflow:

1. **CI Pipeline** (on push/PR to main/dev):
   - Lint → Type check → Test → Build
   - Node.js 22 with pnpm 10

2. **Publish Pipeline** (on push to main):
   - Uses Changesets action to create release PRs or publish to npm
   - Only builds `@xaui/*` scoped packages before publishing

## Branching

**Always create a branch before starting an implementation** — before the first line of
code, not once the work is underway. Never commit to `main`.

One branch per coherent unit of work, named by intent:

```bash
git checkout -b feat/button-v1        # new component or feature
git checkout -b fix/style-cache-key   # bug fix
git checkout -b refactor/alert        # rework of existing code
git checkout -b chore/ai-setup        # tooling, config, docs
```

When a task turns out to cover two unrelated things, it is two branches and two PRs.

## Commit Message Guidelines

- generate a commit message with commitizen specification
- dont add co authored with claude in commit message
- commit progressively: one commit per coherent unit of work, as the work lands, not one
  big commit at the end
- always open the PR once the work is committed (`gh pr create`)

## Pull Request Guidelines

**Before creating a PR:**

1. Create changeset(s) with `pnpm changeset`
   - Select all affected packages
   - Always use **patch** version bump (we're in beta)
   - Write clear, concise summaries
   - If multiple packages updated, create a changeset for each
2. **Commit the `.changeset/*.md` files** with your changes
3. ❌ **DO NOT** run `pnpm changeset version` - the CI handles this
4. Run `pnpm lint`, `pnpm type-check`, and `pnpm test` to verify all checks pass
5. Run the `xaui-review` skill on the diff

**Creating the PR:**

- Use `gh pr create` to create the pull request
- **Always assign the PR to the authenticated `gh` user** — pass `--assignee @me`
- **Always add at least one label** — pass `--label <name>`. Pick from the repository's
  existing labels: `bug`, `documentation`, `enhancement`, `question`, `help wanted`,
  `good first issue`, `duplicate`, `invalid`, `wontfix`
- Include What, Why, How sections with implementation details
- Reference the last commit for global implementation description
- Ensure all CI checks pass before requesting review

**After PR is merged to main:**

- Changesets Action will automatically create/update a "Version Packages" PR
- When that PR is merged, packages are published to npm automatically
