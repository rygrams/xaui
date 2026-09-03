---
'@xaui/native': patch
---

Add the shared hooks: `useControllableState`, `usePressState`, `useMergedRef` and
`usePrevious`.

`useControllableState` gives a component one state that works whether the caller drives it
or not, so there are never two code paths for the same value. Its setter keeps its identity
across renders and reads the current value from a ref, which is what lets a handler built
on it be passed to a memoized child. Switching between the two modes mid-life warns in
development — it is always a bug, and invisible without it.

`usePressState` is the press state a root owns, with handlers that **compose** the caller's
rather than replacing them and keep their identity across renders. Every pressable
component needs those three properties and gets one of them wrong on its own.

`useMergedRef` memoizes `mergeRefs` on the refs it was given, so React does not detach and
reattach every one of them — and pay for a node measurement — on each render.
