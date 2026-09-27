# CLAUDE.md

All instructions for this repository live in [`AGENTS.md`](AGENTS.md) — read it before
working here. It covers the v1 API, the layout, the commands, the conventions, and the
branch → commit → review → PR flow.

Two pointers that save a lookup:

- Task status: `.project-specs/ROADMAP.md`
- The plan the work follows: `.project-specs/XAUI-V1-PLAN.md`

**`@xaui/native` and `@xaui/hybrid` are on the `beta` line.** The repo sits in changesets
pre mode (`.changeset/pre.json`, tag `beta`), so every version those two packages get is
named `0.9.x-beta.x` and every publish lands on the `beta` dist-tag. The `alpha` dist-tag
is frozen on the last `0.9.1-alpha.x` publish and no longer moves. **`@xaui/native`'s
`latest` follows the beta line**: the release workflow moves it onto each published
version, so `pnpm add @xaui/native` installs v1 rather than `0.2.8`, and the version still
says `-beta`. `@xaui/hybrid`'s `latest` stays on `0.0.14`. Never run `changeset pre exit`
unless asked: it would graduate both packages to plain versions before v1 is done.
AGENTS.md §Release and plan §Versions have the rest.

Skills live in `.agents/skills/<name>/SKILL.md`, copied into `.claude/skills/`. Start any
non-trivial task with `xaui-flow`; run `xaui-review` on the diff before every PR.
