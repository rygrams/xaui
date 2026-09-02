# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XAUI is a modern React Native UI library inspired by Flutter, built as a Turborepo monorepo. The library focuses on Flutter-like APIs, smooth animations using React Native Reanimated, and a complete design system with a Tailwind-inspired color palette.

## Project Direction — legacy vs v1

The library is being rebuilt. **Two API generations coexist**, and every task must say which
one it belongs to before any code is written. The plan of record is
`.project-specs/XAUI-V1-PLAN.md`; the `xaui-flow` skill situates a task in its phasing.

### Legacy — frozen, migration artefact only

| What | Becomes |
| --- | --- |
| `@xaui/native` as published today (v0.2.8, 47 components) | republished as-is under `@xaui/native-legacy@0.2.8` |
| `@xaui/core` | dissolved — tokens become `theme/` in each package, shared types are copied over |
| `@xaui/icons` | deleted — replaced by a single `Icon` primitive in `system/` that adapts any third-party icon library |
| `@xaui/mcp` | deleted — its hand-written docs are regenerated from the single docs source and served as `llms.txt` |
| `@xaui/hybrid` | frozen from P0 to P4, then resumes on the v1 API |

Rules for anything under `packages/native-legacy`:

- **Bug fixes only.** No new component, no new prop, no refactor.
- Its tests stay as they are — they protect the migration.
- Its RN legacy `Animated` code stays; do not modernise it.
- It contains **no theme code** and declares `@xaui/native` as a peer dependency — exactly
  one `XAUIProvider` may be loaded at runtime.
- Each component whose v1 equivalent exists gets an `@deprecated` pointing at it.
- Deprecated on npm at parity, folder deleted in v2.

Legacy API vocabulary — **never write this in new code**: `customAppearance`, `themeColor`,
`variant="solid|flat|bordered|light|faded"`, `startContent` / `endContent`, `fullWidth`,
the Material typography scale (`displayLarge` … `bodySmall`), deep view nesting.

### v1 — the new vision, what every new line of code follows

Two published packages, `@xaui/native` (rebuilt from scratch, `0.9.0-beta.x` → `1.0.0`) and
`@xaui/hybrid`, sharing one API.

- **Composition, not configuration** — a `forwardRef` root plus dot-notation slots
  (`<Button.Icon>`, `<Button.Label>`), `asChild` on every root, an exported context hook per
  compound, namespaced `displayName`. The thirteen rules are in the `xaui-component` skill.
- **Two appearance props, no more** — `variant` (flat union of ten sanctioned values) and
  `color` (a raw tint). Everything else goes through the slot's own `style`.
- **A recipe engine with a style cache** in `system/` — variants name tokens, styles resolve
  once at the root, slots receive stable `StyleSheet` references.
- **A two-layer theme** — a small hand-written source layer, ~30 tokens derived from it in
  OKLab. `createTheme` at module level, controlled `colorMode`, tokens generated into
  `.gen.ts` files that are never edited by hand.
- **100% Reanimated**, with one shared `PressableFeedback` primitive instead of a per-component
  animation file. `react-native-reanimated` and `react-native-worklets` are **required** peer
  dependencies in v1 — this supersedes the older "use the built-in Animated" guidance below,
  which now applies to legacy only.
- **Zero runtime dependencies**; `gesture-handler`, `svg` and `safe-area-context` are optional
  peers imported only by the components that use them.
- **A fifteen-component core** for 1.0. Everything else waits for `1.x`.

## Monorepo Architecture

This is a **Turborepo monorepo** using **pnpm workspaces**:

- `apps/*` - Application packages (e.g., documentation site built with Next.js)
- `packages/*` - Shared packages (e.g., UI component library, design tokens, utilities)

All workspace packages are managed through the root `package.json` and built/tested via Turborepo's task orchestration.

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
pnpm --filter @xaui/core dev                # Example: dev mode for core package
pnpm --filter docs test                    # Example: test docs app
```

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

## Code Style

**Prettier** is configured with these key settings:

- No semicolons
- Single quotes
- 90 character line width
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

## Architecture Guidelines

**v1 — composition API**: a `forwardRef` root plus dot-notation slots, following the thirteen
rules of `.project-specs/XAUI-V1-PLAN.md` §1. Layout belongs to the root; each slot carries its
own `style`. See the `xaui-component` skill.

**Legacy — Flutter-inspired props**: the frozen tree follows Flutter's compositional patterns
with props like `padding`, `margin`, `borderRadius`. Do not extend it; do not carry that style
into v1 code.

**Design System**: v1 uses flat semantic tokens — a hand-written source layer plus an
OKLab-derived layer (`accent`, `dangerSoft`, `surfacePressed`…), not a raw Tailwind palette. The
palette exists but sits outside the theme. See the `xaui-theme` skill.

**Animation-first**: all v1 animation is Reanimated on the UI thread, through the shared
`PressableFeedback` primitive for touch feedback.

## Requirements

- Node.js >= 20
- pnpm 10.28.0+

## Workspace Structure

**Current workspaces:**

- `@xaui/native` - React Native component library — being rebuilt on the v1 API
- `@xaui/hybrid` - the same API rendered for mobile webviews (frozen until 1.0)
- `@xaui/core`, `@xaui/icons`, `@xaui/mcp` - legacy, slated for removal (see
  *Project Direction*)
- `demo` - Expo React Native demo application
- `docs` - Next.js documentation site

**Package configurations:**

- Library packages (`@xaui/*`) use **tsup** for building with dual CJS/ESM output
- All packages have individual test configurations with Vitest
- Apps without tests should use `passWithNoTests: true` in vitest.config.ts to prevent CI failures

## Testing

**Run tests:**

```bash
pnpm test                          # Run all tests in monorepo
pnpm --filter @xaui/colors test    # Run tests for specific package
pnpm --filter @xaui/colors test:ui # Run tests with Vitest UI
pnpm --filter @xaui/colors test:coverage # Run tests with coverage
```

**Test configuration:**

- Vitest is installed at root level and inherited by workspaces
- Packages with tests use standard Vitest config (e.g., `packages/colors/vitest.config.ts`)
- Apps without tests must include `passWithNoTests: true` to avoid CI failures (e.g., `apps/docs/vitest.config.ts`)

**Important:** Turborepo runs `test` tasks with `dependsOn: ["build"]`, so builds happen automatically before tests run.

## CI/CD

The project uses GitHub Actions with the following workflow:

1. **CI Pipeline** (on push/PR to main/dev):
   - Lint → Type check → Test → Build
   - Node.js 22 with pnpm 10

2. **Publish Pipeline** (on push to main):
   - Uses Changesets action to create release PRs or publish to npm
   - Only builds `@xaui/*` scoped packages before publishing

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
| `xaui-component` | Writing or converting a `@xaui/native` v1 component |
| `xaui-system` | `system/` primitives: recipe engine, style cache, slots, `PressableFeedback`, `Portal`, `Icon` |
| `xaui-theme` | Tokens, OKLab colour derivation, `createTheme`, provider, token generation |
| `xaui-hybrid` | Porting to `@xaui/hybrid` and the `em` sizing convention |
| `xaui-docs` | Docs pages, demo screens, generated prop tables, `llms.txt` |
| `xaui-legacy-migration` | `@xaui/native-legacy`, `core-shim`, codemods, `@deprecated` |
| `xaui-review` | Reviewing a diff against the v1 rules — run before every PR |

The v1 plan these skills encode is `.project-specs/XAUI-V1-PLAN.md`, with the runnable
token references alongside it (`source.mjs`, `derive.mjs`, `oklab.mjs`, `tokens.json`).

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

**Creating the PR:**

- Use `gh pr create` to create the pull request
- Include What, Why, How sections with implementation details
- Reference the last commit for global implementation description
- Ensure all CI checks pass before requesting review

**After PR is merged to main:**

- Changesets Action will automatically create/update a "Version Packages" PR
- When that PR is merged, packages are published to npm automatically

## Code Best Practices

- Dont add any console.log or console.error
- Dont add any debugger statements
- Dont add any comments that are not needed
- Avoid deep code nesting like if (condition) { if (condition) { if (condition) { } } } or for (let i = 0; i < 10; i++) { if (condition) { if (condition) { if (condition) { } } } }
- Use early returns to avoid deep code nesting
- Use early returns to avoid deep code nesting
- Avoid any type as much as possible
- create a test file for each component in `/__tests__` with same path as component
  example: `packages/core/src/components/button/index.tsx` -> `packages/core/src/__tests__/components/button/index.test.tsx`
- **Exception:** Icon components do NOT require test files. Skip test creation for any icon in `packages/native/src/components/icon/icons/`
- run test and lint after each component code change
- do a code review after each component code change and simplify if needed

## Package Guidelines

- Use pnpm for package management
- Use workspace: \* for dependencies
- Dont use react-native-reanimated, use built-in Reanimated from react-native
- Add test for each component you code or update (except icon components - icons do not need tests)
- Package name should be in singular form
- dont use css file for styling use tailwind for styling or framer-motion for animations

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

## Component Structure

- components packages is under packages/native et packages/hybrid respectively for react native and mobile webview

Example of component structure:

- packages/
  - native|hy\
  - hooks\ -- all shared hooks
  - types\ -- all shared types
  - utils\ -- components utils
  - components\
    - button\
    - \_\_tests\_\_\
      - button.test.tsx --button tests
      - button.hook.test.ts --button tests
    - button.type.ts --button types
    - button.hook.ts --button hooks
    - button.style.ts --button styles
    - button.tsx --button component
    - index.ts --button exports

- run test and lint after each component code change
- export component as @xaui/native/button , @xaui/hybrid/button so improve tsup.config.ts based on component development
- each component should be exports in package.json as independent export

example :

exports : {
"./button" : {
"types" : "./button/index.tsx"
"import" : "./button/index.tsx",
"require" : "./button/index.tsx",
}
}
