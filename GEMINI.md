# GEMINI.md

This file provides guidance to Agent when working with code in this repository.

## Project Overview

XAUI is a modern React Native UI library inspired by Flutter, built as a Turborepo monorepo. The library focuses on Flutter-like APIs, smooth animations using React Native Reanimated, and a complete design system with a Tailwind-inspired color palette.

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
2. Choose bump type: major, minor, or **patch** (we're in alpha, always use patch)
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

**Flutter-inspired API**: Components should follow Flutter's compositional patterns with props like `padding`, `margin`, `borderRadius`, etc., rather than traditional React Native style objects where appropriate.

**Design System**: The library includes a comprehensive color system inspired by Tailwind (20+ colors with 11 shades each). Use these design tokens consistently across components.

**Animation-first**: Leverage React Native Reanimated for all animations to ensure native performance.

## Requirements

- Node.js >= 20
- pnpm 10.28.0+

## Workspace Structure

**Current workspaces:**

- `@xaui/colors` - Tailwind-inspired color palette package with 20+ colors × 11 shades
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

## Code Best Practices

- Dont add any console.log or console.error
- Dont add any debugger statements
- Dont add any comments that are not needed
- Avoid deep code nesting like if (condition) { if (condition) { if (condition) { } } } or for (let i = 0; i < 10; i++) { if (condition) { if (condition) { if (condition) { } } } }
- Use early returns to avoid deep code nesting
- Use early returns to avoid deep code nesting
- Avoid any type as much as possible
- For each component create a test file and run test after each component update
- create a test file for each component in `/__tests__` with same path as component
  example: `packages/core/src/components/button/index.tsx` -> `packages/core/src/__tests__/components/button/index.test.tsx`
- run test and lint after each component code change

## Package Guidelines

- Use pnpm for package management
- Use workspace: \* for dependencies
- Dont use react-native-reanimated, use built-in Reanimated from react-native
- Package name should be in singular form
- dont use css file for styling use tailwind for styling or framer-motion for animations

## Commit Message Guidelines

- generate a commit message with commitizen specification
- dont add co authored with claude in commit message

## Pull Request Guidelines

**Before creating a PR:**
1. Create changeset(s) with `pnpm changeset`
   - Select all affected packages
   - Always use **patch** version bump (we're in alpha)
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

## Component Structure

- components packages is under packages/native et packages/hybrid respectively for react native and mobile webview

Example of component structure:

- packages/
  - native|hybrid\
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
- for react-native use as possible stylesheets and always apply theme in component

example :

exports : {
"./button" : {
"types" : "./button/index.tsx"
"import" : "./button/index.tsx",
"require" : "./button/index.tsx",
}
}
