# CLAUDE.md

All instructions for this repository live in [`AGENTS.md`](AGENTS.md) — read it before
working here. It covers the v1 API, the layout, the commands, the conventions, and the
branch → commit → review → PR flow.

Two pointers that save a lookup:

- Task status: `.project-specs/ROADMAP.md`
- The plan the work follows: `.project-specs/XAUI-V1-PLAN.md`

Skills live in `.agents/skills/<name>/SKILL.md`, copied into `.claude/skills/`. Start any
non-trivial task with `xaui-flow`; run `xaui-review` on the diff before every PR.
