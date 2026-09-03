# `components/`

The library's components. Each one is a folder, an independent subpath export
(`@xaui/native/button`), and the same seven files in the same order.

## The reference

`button/` is the pattern the other forty-six follow. It is written to be copied: if a
component disagrees with it, the disagreement is a decision to take, not a local variation
to invent. Read it before writing a new one — and if the Button itself turns out to be
wrong, it is the Button that gets fixed.

## What belongs

```
button/
├── button.recipe.ts     # variants name tokens. The source of truth for style.
├── button.context.ts    # createSlotContext, RESOLVED values, exports useButton (R10)
├── button.type.ts       # the props of the root and of every slot
├── button.utils.ts      # pure logic, only if there is any — tested in __tests__/
├── button.md            # the component's own page: anatomy, usage, props, migration
├── button.tsx           # the root
├── button-label.tsx     # one file per slot
├── button-icon.tsx
├── button-spinner.tsx
└── index.ts             # Object.assign(ButtonRoot, { Label, Icon, Spinner })
```

- **No empty file to satisfy the convention.** A component with no slots has no
  `.context.ts`; one with no pure logic has no `.utils.ts`.
- **A file used by one component stays here.** Promotion to `hooks/`, `utils/` or
  `system/` happens at the second use, never by anticipation (§2 bis of the plan).
- **Everything that depends on a token or a variant is in the recipe**, not in a
  `.style.ts`. A hardcoded colour or measurement anywhere else is a defect.

## What does not

- A test file. Not for the component, not for its slots, not for its hook, not for its
  animation constants. It is verified by its demo screen in `apps/demo`, in light and
  dark. A timing that is right is right on screen, not in an assertion. Only a pure
  function that computes a value gets a test, and those live in `utils/`.
- A primitive a second component would want. That belongs in `system/`, which is the
  surface a third party builds their own component with.

## Adding one

1. The recipe — variants name tokens, no hardcoded value
2. The context and its exported `useX` hook (R10)
3. The root: `forwardRef`, `asChild`, a11y, function-form `style`, namespaced
   `displayName` (R9, R11, R12)
4. One file per slot, with no margin of its own (R4)
5. Pure logic into `.utils.ts` — no test file; the demo screen is the verification
6. A screen in `apps/demo` — this is how the component is verified
7. A `.md` beside the component — the eight sections of the plan's §6, from anatomy to
   the legacy migration table
8. A subpath export in `package.json` **and** `tsup.config.ts`

Then run the `xaui-review` skill on the diff.
