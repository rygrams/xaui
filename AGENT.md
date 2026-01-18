# AGENT.md

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

This project uses **Changesets** for versioning and publishing:

```bash
pnpm changeset              # Create a new changeset
pnpm version-packages       # Update versions based on changesets
pnpm release                # Build and publish packages to npm
```

The release process builds only scoped `@xaui/*` packages before publishing.

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

## Package Guidelines

- Use pnpm for package management
- Use workspace: \* for dependencies
- Dont use react-native-reanimated, use built-in Reanimated from react-native
- Package name should be in singular form

## Commit Message Guidelines

- generate a commit message with commitizen specification
- dont add co authored with claude in commit message

## Pull Request Guidelines

- Use `pnpm changeset` to create a new changeset
- Before generate changeset message, run `pnpm changeset version` to update versions based on changesets
- For pull request add What, Why, How with details for better review
- Use gh to create the pull request
- We are in alpha mode so keep all change to patch
- if multiple package updated apply changesets for each
- verify last commit on branch for pull request global implementation description
- Add test for each component you code or update
