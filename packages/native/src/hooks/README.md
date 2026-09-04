# `hooks/`

React hooks shared by **two or more components**. A hook only one component uses stays in
that component's folder; promotion happens at the second use, never by anticipation
(§2 bis).

## The boundary

`hooks/` sits between `system/` and `utils/`, and the difference is who it is for:

- `system/` is what a **third party** builds their own XAUI component with. Published,
  semver.
- `hooks/` is what **our** components share. Reachable from `@xaui/native`, but it is not
  the surface someone writing a component is pointed at.
- `utils/` is pure, React-free and private.

Anything here is a React hook by definition, which is exactly what keeps it out of
`utils/`.

## Current contents

| File                        | Role                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `use-controllable-state.ts` | One state that works controlled or not, with a dev warning when a component switches between the two |
| `use-press-state.ts`        | The press state a root owns, plus handlers that compose the caller's and keep their identity         |
| `use-merged-ref.ts`         | `mergeRefs` memoized for a component that renders                                                    |
| `use-previous.ts`           | The value from the render before this one                                                            |
| `use-rotation.ts`           | One full turn, repeating, on the UI thread — every spinner in the library                            |

## Testing

**None.** These are React hooks, and hooks are not unit-tested here — a hook is verified by
the component that uses it, on its demo screen. Only pure functions that compute a value
get a test file.
