# AGENTS.md

Instructions for every agent working in this monorepo. `CLAUDE.md` only points here.

XAUI is a React Native UI library: composition-first components, animations on the UI thread
with Reanimated, and a semantic token system. TypeScript, Turborepo + pnpm, Vitest, tsup,
Changesets, Next.js docs, Expo demo.

## Before writing code

- The library follows the **v1 API** of `.project-specs/XAUI-V1-PLAN.md`. The skills encode
  it by task type — **load the one that owns the task first.**
- Task status: `.project-specs/ROADMAP.md`. One line per task: ref, title, status. Update it
  when a task lands, in the same commit. It is the only place progress is recorded.

## Skills

Source of truth in `.agents/skills/<name>/SKILL.md`, copied — never symlinked — into
`.claude/skills/`. Edit both in the same commit.

| Skill | Owns |
| --- | --- |
| `xaui-flow` | Start here on any non-trivial task; routes to the others |
| `xaui-component` | Writing a component — the fourteen rules, folder shape, per-component loop |
| `xaui-system` | Recipe engine, style cache, slots, `PressableFeedback`, `Portal`, `Icon` |
| `xaui-theme` | Tokens, OKLab derivation, `createTheme`, provider, generation |
| `xaui-hybrid` | The web renderer and the `em` sizing convention |
| `xaui-docs` | Docs pages, demo screens, generated tables |
| `xaui-legacy-migration` | The frozen tree, `core-shim`, codemods |
| `xaui-review` | Run on the diff before every PR — v1 rules and clean code |

## The v1 API

- **Composition, not configuration** — a `forwardRef` root plus dot-notation slots,
  `asChild` on every root, an exported context hook per compound, namespaced `displayName`.
- **Two appearance props** — `variant` (ten sanctioned values) and `color` (a raw tint) —
  as the design-system **vocabulary**, plus **style props** for raw overrides:
  `padding={16}`, `width="100%"`, `backgroundColor="#111"`. Full RN names and RN values, no
  abbreviations and no hidden scale; the set is the node's style type minus the directional
  keys R13 bans. Scoped to the node the prop is written on. `style` is still the last word,
  for `transform` and anything typed loosely.
- **A recipe engine with a style cache** — variants name tokens, styles resolve once at the
  root, slots receive stable `StyleSheet` references.
- **A two-layer theme** — a hand-written source layer, ~32 tokens derived from it in OKLab.
  `.gen.ts` files are never hand-edited.
- **100% Reanimated**, touch feedback through one shared `PressableFeedback`.
- **RTL-safe styles** — `paddingStart` / `paddingEnd`, `start` / `end`. Never `left` / `right`.
- **A fifteen-component core** for 1.0. Everything else waits for `1.x`.

The rules behind each line live in `xaui-component`, `xaui-system` and `xaui-theme`.

## Layout

- Turborepo + pnpm workspaces: `apps/*`, `packages/*`.
- `@xaui/native` (React Native) and `@xaui/hybrid` (mobile webview) are the published
  libraries; `*-legacy` are the frozen trees. Apps: `docs` (Next.js), `demo` (Expo).
- `packages/<pkg>/src` has six top-level folders — `theme/`, `provider/`, `system/`,
  `hooks/`, `utils/`, `types/` — plus `components/` and a mirrored `__tests__/`.
  **`system/` is public and follows semver; `utils/` is private.** A file used by one
  component stays with it; promotion happens at the second use. See `xaui-component`.
- **Each top-level `src/` folder carries a `README.md`** saying what belongs in it, what does
  not, and how it is used. Add it with the folder, update it when the boundary moves.
- Each component is an independent subpath export (`@xaui/native/button`), declared in
  `package.json` **and** `tsup.config.ts`.

## Environment and commands

`pnpm` only, Node 20+, pinned to `pnpm@10.28.0`.

```bash
pnpm dev | build | test | lint | type-check | format
pnpm tokens:generate    # rewrite tokens.gen.ts from tooling/tokens/source.ts
pnpm tokens:check       # regenerate, diff, key parity, contrast — CI runs this

pnpm --filter @xaui/native <script>
pnpm --filter @xaui/native exec vitest run src/__tests__/utils/colors.test.ts
pnpm --filter @xaui/native exec vitest run <file> -t "mix in oklab"
pnpm --filter @xaui/native exec eslint src/theme/derive-colors.ts
```

`pnpm format` rewrites every `.ts`/`.tsx`/`.md` in the repo — run it on your files, not on
the tree, or you bury the change in unrelated churn. Turbo runs `test` after `build`.

## Testing

**Utility functions only.** Pure, deterministic code gets a test file: `utils/`, the colour
engine, `deriveColors`, `createTheme`, recipe resolution, the style cache, slot helpers,
token generation.

**Components, slots and their hooks get none.** They are verified by their demo screen and
docs preview, in light and dark. Logic worth pinning down is extracted into a pure function
and tested there.

- Mirror the source path: `src/utils/colors.ts` → `src/__tests__/utils/colors.test.ts`.
- A workspace without tests needs `passWithNoTests: true`, or CI fails.

## Style and conventions

Prettier: no semicolons, single quotes, print width 85, 2 spaces, ES5 trailing commas,
`arrowParens: avoid`, `endOfLine: lf`.

- TS strict. `@typescript-eslint/no-unused-vars` errors (`_` prefix allowed);
  `no-explicit-any` warns — avoid `any` outright.
- Components PascalCase; files and folders kebab-case.
- `*.type.ts`, `*.hook.ts`, `*.style.ts`, `*.recipe.ts`, `*.context.ts`, and
  `<component>-<slot>.tsx` for slot files.
- Imports grouped external-then-internal, `import type` for types, none left unused.
- Prefer package entrypoints over deep import paths.
- Early returns over nesting. Validate external input, clamp it, give safe defaults.
- Errors are explicit and named — never `undefined is not a function`, never a silent
  fallback that hides the cause.

## Never

- `console.log`, `console.error`, `debugger` in committed code.
- A comment restating the code. Comment the non-obvious decision instead.
- `any`; a function with more than 3 parameters; deep nesting.
- An unrelated refactor inside a focused change.
- A CSS file — Tailwind for styling, framer-motion for web animation.
- A hand-edited `.gen.ts`.
- An empty file created to satisfy a convention.

## Packages

- `workspace:*` for internal dependencies; package names singular; tsup builds dual CJS/ESM.
- `react-native-reanimated` and `react-native-worklets` are required peers — all animation
  goes through them, never RN's built-in `Animated`.
- `gesture-handler`, `svg` and `safe-area-context` are optional peers, imported only by the
  components that use them.

## Branch, commit, PR

**Always branch before the first line of code.** Never commit to `main`. One branch per
coherent unit of work: `feat/`, `fix/`, `refactor/`, `chore/`.

Commits follow commitizen. **No Claude co-author line.** Commit progressively — one commit
per coherent unit as the work lands, not one at the end.

Before the PR: create a changeset per touched package (`pnpm changeset`, always **patch**,
we are on the `alpha` line — see §Release), commit the `.changeset/*.md`, run `pnpm lint &&
pnpm type-check && pnpm test`, and run the `xaui-review` skill on the diff.

```bash
gh pr create --assignee @me --label documentation
```

- Always assign to the authenticated `gh` user; always add at least one existing label
  (`bug`, `documentation`, `enhancement`, …).
- Body covers What, Why and How.
- Resolve each review thread once its comment is addressed. One you deliberately did not act
  on stays open, with a reply saying why.

## Release

Changesets, fully automated. **Never run `pnpm changeset version`, `pnpm version-packages`
or `pnpm release` locally** — merging to `main` opens or updates a "Version Packages" PR,
and merging that one publishes.

### The `alpha` line

The repo is in changesets **pre mode** with the tag `alpha` (`.changeset/pre.json`), so
`@xaui/native` and `@xaui/hybrid` are versioned `0.9.x-alpha.x` and published on the
`alpha` dist-tag. `latest` keeps pointing at `@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14`
— the last releases that carry components — because v1's `src/` is still the theme layer
alone. `pnpm add @xaui/native@alpha` is how you get it.

Three consequences, all of them load-bearing:

- **Never `changeset pre exit`** unless the task says to. It graduates both packages onto
  `latest`, which today means handing every `npm i @xaui/native` a package with no
  components. It is required exactly once, right before `1.0.0`.
- **Pre mode is repo-wide and reaches dependents.** No changeset on a package is needed for
  it to catch an alpha number: `@xaui/native-legacy` peer-depends on `@xaui/native`, so
  `0.9.1-alpha.0` bumped it to `0.2.12-alpha.0` on its own. That is why
  `@xaui/native-legacy` sits in `ignore` (`.changeset/config.json`) — it is frozen at
  `0.2.11` and must stay there. `demo` and `docs` are in that list too, because changesets
  requires every dependent of an ignored package to be ignored as well. A genuine `0.2.x`
  fix on legacy means taking it out of `ignore` for that release.
- **The tag on a first publish cannot be chosen in pre mode.** `getReleaseTag` gives the
  pre tag to any package whose `publishedState` is not `"only-pre"`, and `"never"` is not
  `"only-pre"` — so a never-published package goes out tagged `alpha` with no `latest` tag
  at all. There is no clean way out: `changeset publish --tag` is refused in pre mode, and
  `changeset pre exit` does not help (publish reads `preState` whatever its mode; only the
  next `changeset version` deletes `pre.json`, and it graduates `native` and `hybrid` onto
  `latest` while doing so). Fix it downstream instead —
  `npm dist-tag add <pkg>@<version> latest`.

CI on PRs to `main`/`dev`: tokens check → lint → type check → test → build, plus CodeQL.
The release workflow runs on push to `main`.
