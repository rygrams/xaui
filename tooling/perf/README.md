# `tooling/perf/`

The P2 baseline. Two hundred buttons, and the numbers the forty-six components after the
first one have to hold.

```bash
pnpm perf:button
```

The results are written into `.project-specs/XAUI-V1-PLAN.md` §9 bis. In one sentence:
**200 buttons cost 28 style sheets, and a press costs 0.**

## Why it is not in `src/__tests__/`

Two reasons, and they are the same reason twice:

- It **renders components**, which the repository's test convention deliberately keeps out
  of `src/__tests__` — components are verified by their demo screen, not by a test file.
- It **measures** rather than asserting behaviour. The thresholds are upper bounds on
  allocations and re-renders, not statements about what the Button does.

So it has its own config and its own script, and `pnpm test` does not run it.

## What is mocked, and what that costs

| File                               | Stands in for                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `react-native.mock.tsx`            | `StyleSheet`, `View`, `Text`, `Pressable`, `Image`, `useColorScheme` — DOM-backed, counting |
| `react-native-reanimated.mock.tsx` | The hooks the modules import at the top level                                               |

`StyleSheet.create` is the identity function and counts its calls: the measurement is of
**our** allocations, not of what RN does with the object afterwards. The host components
count their own renders.

The mocks are not a faithful React Native, and they must not need to be. Both questions —
how many style objects were allocated, how many components re-rendered — are decided by
our own code well before a native view is involved. **If a number here starts depending on
the mock rather than on the library, the measurement is wrong**, not the mock.

The baseline runs with `animation={false}`, which routes the tree down the static branch
where no Reanimated hook is reached. The file asserts that rather than assuming it.

## Adding a component

Copy `button.perf.tsx`, keep the same seven measurements, and add the component's number
to §9 bis. A component that cannot hold them has a recipe resolving something it should
not, or a context that is not memoized on resolved values (R5).
