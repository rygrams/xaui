# `utils/`

Pure, React-free, **private** helpers.

## The boundary that matters

`utils/` is internal and can change at any time. `system/` is published as
`@xaui/native/system` and follows semver.

A helper that becomes useful to someone writing their own XAUI component **moves** to
`system/` — it is not re-exported from here. Nothing in this folder appears in the public
API surface.

## What belongs

- No React: no hooks, no JSX, no context. Those go to `hooks/` or the component folder.
- Deterministic: same input, same output. That is what makes it testable, and
  **every function here has a mirrored test** in `src/__tests__/utils/` — this is the one
  category of code that gets test files.
- Used by at least two components. A helper used by one stays in that component's folder;
  promotion happens at the second use, never by anticipation.

## Current contents

| File             | Role                                                             |
| ---------------- | ---------------------------------------------------------------- |
| `colors.ts`      | OKLab conversions, `mix`, `alpha`, `contrastOn`, `contrastRatio` |
| `stable-hash.ts` | Content hash behind the theme `id` and the style cache key       |
