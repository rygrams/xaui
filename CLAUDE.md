# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Jest + React Native Testing Library**: Testing framework
- **Turborepo**: Build system and task runner
- **Changesets**: Version management and publishing

## Architecture Guidelines

**Flutter-inspired API**: Components should follow Flutter's compositional patterns with props like `padding`, `margin`, `borderRadius`, etc., rather than traditional React Native style objects where appropriate.

**Design System**: The library includes a comprehensive color system inspired by Tailwind (20+ colors with 11 shades each). Use these design tokens consistently across components.

**Animation-first**: Leverage React Native Reanimated for all animations to ensure native performance.

## Requirements

- Node.js >= 20
- pnpm 10.28.0+
