# CLAUDE.md

All instructions for this repository live in [`AGENTS.md`](AGENTS.md) — read it before
working here. It covers the v1 API, the layout, the commands, the conventions, and the
branch → commit → review → PR flow.

Two pointers that save a lookup:

- Task status: `.project-specs/ROADMAP.md`
- The plan the work follows: `.project-specs/XAUI-V1-PLAN.md`

**`@xaui/native` and `@xaui/hybrid` have left the `beta` line.** `.changeset/pre.json` is
in `exit` mode: the next release publishes both as `0.9.1` on `latest`, and versions stay
plain from there (`0.9.2`, `0.9.3`…). The API is still pre-`1.0.0` and changesets stay
**patch**. The `alpha` and `beta` dist-tags are frozen. Never re-enter pre mode unless
asked. AGENTS.md §Release and plan §Versions have the rest.

Skills live in `.agents/skills/<name>/SKILL.md`, copied into `.claude/skills/`. Start any
non-trivial task with `xaui-flow`; run `xaui-review` on the diff before every PR.
