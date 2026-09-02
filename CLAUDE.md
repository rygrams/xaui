# CLAUDE.md

All instructions for this repository live in [`AGENTS.md`](AGENTS.md) — read it before
working here. It covers the v1 API, the layout, the commands, the conventions, and the
branch → commit → review → PR flow.

Two pointers that save a lookup:

- Task status: `.project-specs/ROADMAP.md`
- The plan the work follows: `.project-specs/XAUI-V1-PLAN.md`

**`@xaui/native` and `@xaui/hybrid` are on the `alpha` line.** The repo sits in changesets
pre mode (`.changeset/pre.json`, tag `alpha`), so every version those two packages get is
named `0.9.x-alpha.x` and every publish lands on the `alpha` dist-tag. `latest` stays where
it is — `@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14`, the last releases that carry
components — until the v1 core is real. Never run `changeset pre exit` unless asked: it
would graduate both packages onto `latest` with a theme layer and no components. AGENTS.md
§Release and plan §Versions have the rest.

Skills live in `.agents/skills/<name>/SKILL.md`, copied into `.claude/skills/`. Start any
non-trivial task with `xaui-flow`; run `xaui-review` on the diff before every PR.
