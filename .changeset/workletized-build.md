---
'@xaui/native': patch
---

Ship workletized code, or every animation is a hard crash.

The Reanimated Babel plugin turns a function into a worklet — a serialized body plus its
captured closure — and Reanimated **aborts the process** when it is handed a plain function
to run on the UI runtime: `Abort trap: 6` inside `WorkletRuntime::runSync`, with no
JavaScript error to read. In an app that transformation happens in the consumer's Metro
build; over a published `node_modules` it does not. The libraries that get this right ship
their *source*, so Babel sees the original call sites; we ship a compiled `dist`, so the
same pass now runs in our own build (`tooling/workletize/`).

Every animated hook also carries an explicit `'worklet'` directive. It is the load-bearing
half: the CJS output calls the hook as `_reactNativeReanimated.useAnimatedStyle(...)`, and
the plugin recognises the bare identifier rather than the namespace member — so without the
directive the pass finds nothing to transform. The explicit dependency arrays stay for the
web, where the hook throws instead of aborting.
