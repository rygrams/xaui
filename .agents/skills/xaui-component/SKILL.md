---
name: xaui-component
description: Author or refactor a component in @xaui/native v1 (compound root + dot-notation slots, recipe, resolved context, asChild). Use when adding a new component, adding a slot, converting a legacy component to the v1 API, or when a task mentions variant/size/slots/recipe on an XAUI component.
---

# XAUI v1 — Writing a component

The reference implementation is `packages/native/src/components/button/`. Every other
component is a copy of that shape. Read it before writing a new one; if it disagrees with
this skill, the Button is wrong and gets fixed — not duplicated.

Source of truth: `.project-specs/XAUI-V1-PLAN.md` §1 (rules), §1 bis (API vocabulary),
§8 (Button anatomy), §9 (per-component loop).

## The fourteen rules — non-negotiable

| # | Rule |
|---|---|
| R1 | Composition, not configuration. One `forwardRef` root + dot-notation slots. No prop styles the inside of another component. |
| R2 | No `customAppearance`. Every slot carries its own `style`. |
| R3 | Text children are auto-wrapped through `childrenToString` (recursive stringify, returns `null` if any React element is present). |
| R4 | Layout belongs to the root (`gap`, `alignItems`, `flexDirection`). Slots have **no margin of their own**. No `startContent` / `endContent` — JSX order is screen order. |
| R5 | Context carries **resolved** values (style IDs), never raw props. Slots re-resolve nothing. Memoized. |
| R6 | Tokens in the **vocabulary** props: `size="md"` yes, `size={42}` is a type error. Raw values have their own path, outside the cache: `color` and the style props of R14. |
| R7 | Two appearance props in the **vocabulary**: `variant` and `color`. R14's `backgroundColor` / `borderColor` are not vocabulary — they are raw overrides, the same category as `style`. Seeing one where a `variant` would do still means the design system is being bypassed. |
| R8 | Booleans are `isX` / `hasX` (`isDisabled`, `isLoading`, `hasError`). `disabled` is never public; forward it internally to `Pressable`. |
| R9 | Every root forwards `ref`, `style` (including `Pressable`'s function form), `testID` and a11y props. `accessibilityRole` has a default but stays overridable. **Unfixable after 1.0.** |
| R10 | Every compound exports its context hook: `export { useButton }`. |
| R11 | `displayName` is namespaced: `'XAUI.Button.Root'`, `'XAUI.Button.Label'`. |
| R12 | `asChild` on every root, via `mergeProps` + `mergeRefs` from `system/slot/`. |
| R13 | No `left` / `right` in any style. Use `paddingStart` / `paddingEnd`, `marginStart` / `marginEnd`, `start` / `end`. An ESLint rule enforces it in `src/`. |
| R14 | A component's style is editable **in props**: `padding={16}`, `width="100%"`, `backgroundColor="#111"`. **Full RN names and RN values** — no abbreviations, no hidden scale (`padding={t.spacing(4)}` when you want the scale). The set is the node's style type (`ViewStyle`, `TextStyle` on a text slot) **minus the directional keys R13 bans**, which are not exposed at all. Scoped to the node the prop is written on, never a descendant. Outside the cache, after the tint, **before** `style`, which still wins. |

## API vocabulary

`variant` is a flat union — emphasis and intent fused, `themeColor` is gone:

```ts
type Variant =
  | 'primary' | 'secondary' | 'tertiary' | 'ghost'
  | 'success' | 'success-soft'
  | 'warning' | 'warning-soft'
  | 'danger'  | 'danger-soft'
```

A variant **names tokens, it computes nothing**:

| `variant` | bg | border | fg |
|---|---|---|---|
| `primary` | `accent` | — | `accentForeground` |
| `secondary` | `default` | — | `defaultForeground` |
| `tertiary` | transparent | `border` | `foreground` |
| `ghost` | transparent | — | `foreground` |
| `success` / `warning` / `danger` | same name | — | `<name>Foreground` |
| `*-soft` | `<name>Soft` | — | `<name>` |

Components with no legitimate intent (`Card`, `Surface`, `Divider`, `Skeleton`) narrow the
union to the four emphasis levels. That's a subtype, not a different prop.

- **`size` drives height, never width.** Height, horizontal padding, `gap`, radius. Fixed
  `height`, not `minHeight`. No `fullWidth` prop — RN's default behaviour is the answer
  (`<Row><Button/></Row>` or `style={{ alignSelf: 'flex-start' }}`). `isIconOnly` is
  `padding: 0` + `aspectRatio: 1`.
- **`color` is the tint, in a raw value** (`'#7c3aed'`), never a token. Where it lands
  follows the variant: background for `primary`, label for `ghost`, border + label for
  `tertiary`. Resolved by `theme/derive-tint.ts`, outside the style cache.
- **A component's style is editable in props (R14).** Full RN names, full RN values:

  ```tsx
  <Button padding={16} width="100%" backgroundColor="#111">Envoyer</Button>
  <Button.Label fontSize={18} letterSpacing={1}>Envoyer</Button.Label>
  ```

  No abbreviations — `padding`, not `p`. And therefore no hidden scale: `padding={16}` is
  16 points, exactly as `style` would be. A prop carrying the RN key's name and silently
  multiplying its value is the most expensive trap the API could set. Reach for the scale
  explicitly: `padding={t.spacing(4)}`.

  The set is not a list but a type — the node's style type minus the directional keys R13
  bans, which are **not exposed at all**, because a prop API is exactly where someone
  writes `paddingLeft` without thinking.

  They are scoped to the node the prop is written on, never a descendant (R1) — that is
  what separates them from `customAppearance`. They resolve **outside the cache** (after
  the tint, before `style`), and `style` still wins, for `transform` and anything typed
  loosely. `color` keeps its R7 meaning on a root and is `TextStyle.color` on a text slot;
  those coincide rather than conflict. *Specified, not built: P2.6.*
- **Anything else goes through `style`.** Tinted shadow, border in a different colour than
  the background, gradient — `style`.

## Folder shape

```
components/button/
├── button.recipe.ts     # variants → tokens. Source of truth for style. No hardcoded values.
├── button.context.ts    # createSlotContext, RESOLVED values, exports useButton (R10)
├── button.type.ts       # ButtonProps, ButtonLabelProps…
├── button.hook.ts       # non-visual logic — only if there is any
├── button.style.ts      # static StyleSheet only — often tiny, often absent
├── button.tsx           # the root
├── button-label.tsx     # one file per slot
├── button-icon.tsx
└── index.ts             # Object.assign(ButtonRoot, { Label, Icon, Spinner })
```

Each top-level folder of `src/` carries a `README.md` stating what belongs in it, what does
not, and how it is used — added with the folder, updated when the boundary moves.

**No empty file "to respect the convention."** A component without slots has no
`.context.ts`; without animation, no `.animation.ts`. Everything that depends on a token or
a variant lives in the recipe, not in `.style.ts`.

Where a new *shared* file goes is decided by §2 bis of the plan — `theme/`, `provider/`,
`system/` (public), `hooks/` (React, ≥2 components), `utils/` (pure, private), `types/`
(≥2 components), otherwise it stays in the component folder. Promotion happens at the
second use, never by anticipation.

## Root skeleton

```tsx
export const ButtonRoot = forwardRef<View, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', radius = 'md',
    isDisabled = false, isLoading = false, isIconOnly = false,
    asChild = false, color, style, onPressIn, onPressOut, ...pressableProps },
  ref
) {
  const theme = useXAUITheme()
  // composes the caller's handlers — never replaces them
  const press = usePressState({ onPressIn, onPressOut })

  const styles = buttonRecipe.resolve(theme, {
    variant, size, radius,
    states: { disabled: isDisabled || isLoading, pressed: press.isPressed },
    tint: color,
  })

  const text = childrenToString(children)

  const context = useMemo(
    () => ({ labelStyle: styles.label, iconStyle: styles.icon, size, isDisabled, isLoading }),
    [styles.label, styles.icon, size, isDisabled, isLoading]
  )

  const rootProps = {
    accessibilityRole: 'button',
    accessibilityState: { disabled: isDisabled, busy: isLoading },
    disabled: isDisabled || isLoading,
    ...pressableProps,                 // caller props first…
    onPressIn: press.onPressIn,        // …then the composed handlers, which call them
    onPressOut: press.onPressOut,
  }

  // R9 — `style` may be Pressable's function form, so resolve it per state
  const rootStyle = (state: PressableStateCallbackType) => [
    styles.root, styles.tint?.root, isIconOnly && sheet.iconOnly,
    typeof style === 'function' ? style(state) : style,
  ]

  return (
    <ButtonContext.Provider value={context}>
      {asChild ? (
        // R12 — mergeProps + mergeRefs into the caller's element
        <Slot ref={ref} {...rootProps} style={rootStyle({ pressed: press.isPressed })}>
          {children}
        </Slot>
      ) : (
        <PressableFeedback ref={ref} {...rootProps} style={rootStyle}>
          {text !== null ? <ButtonLabel>{text}</ButtonLabel> : children}
        </PressableFeedback>
      )}
    </ButtonContext.Provider>
  )
})

ButtonRoot.displayName = 'XAUI.Button.Root'          // R11 — on the root AND every slot

export const Button = Object.assign(ButtonRoot, { Label, Icon, Spinner })
```

Eight things to note:

- **`childrenToString`** (in `system/slot/`) implements R3 once for the whole library.
- **The context carries `styles.label`**, a stable `StyleSheet` id — not tokens to re-resolve.
- **The root element is `PressableFeedback`**, not a raw `Pressable`. Touch feedback is shared
  (`system/pressable-feedback/`), never re-implemented per component.
- **`asChild` renders `Slot`**, which merges props and refs into the caller's element. It is a
  real branch, not a prop that is destructured and forgotten — R12 is unfixable after 1.0.
- **Prop order in `rootProps` matters.** Caller props are spread *before* the press handlers,
  and `usePressState` composes rather than replaces them. Spreading `...pressableProps` last
  would let a caller's `onPressIn` silently kill the pressed state.
- **`style` is resolved through a function**, because R9 requires accepting `Pressable`'s
  `(state) => style` form. Dropping a caller's function into a style array silently breaks it.
- **`displayName` is assigned**, on the root and on every slot file. Without it the DevTools
  tree shows twenty anonymous `Label`s.
- **View depth is one**, not four: `PressableFeedback > (Text | Icon)`.

A slot is three lines — read the resolved style from the context, merge the local `style`:

```tsx
export const ButtonLabel = forwardRef<Text, ButtonLabelProps>(function ButtonLabel(
  { children, style, ...rest }, ref
) {
  const ctx = useButtonContext('Button.Label')   // named throw when used outside
  return <Text ref={ref} style={[ctx.labelStyle, style]} {...rest}>{children}</Text>
})

ButtonLabel.displayName = 'XAUI.Button.Label'
```

Keep the view depth minimal: `Pressable > (Text | Icon)`, not four nested views. Touch
feedback comes from `system/pressable-feedback/` — never a per-component animation file.

## The loop — same for every component

1. `.recipe.ts` — variants name tokens, **no hardcoded value**
2. `.context.ts` + the exported `useX` hook (R10)
3. root in `forwardRef` with `asChild`, a11y, function-form `style`, namespaced
   `displayName` (R9, R11, R12)
4. one file per slot, no margin of its own (R4)
5. **no test file** — not for the component, not for its slots, not for its hooks, not for
   its animation constants. It is verified by its demo screen. Only a pure function that
   computes a value gets a test, and it lives in `utils/`
6. a screen in `apps/demo` — this is how the component is verified
7. a doc page per the `xaui-docs` skill
8. a subpath export in `package.json` + `tsup.config.ts` (`@xaui/native/<name>`)

**Done when** `pnpm lint && pnpm type-check && pnpm test` pass, the demo screen renders
correctly in light and dark, and the legacy equivalent carries an `@deprecated` pointing at
the replacement.

Then run the `xaui-review` skill before opening a PR.

## Where this supersedes the plan

`.project-specs/XAUI-V1-PLAN.md` is the plan of record, but two of its code samples predate
decisions taken elsewhere in the same document or in CLAUDE.md. This skill wins:

- **Fixed `height`, never `minHeight`.** The `createRecipe` sample in the plan's §3 uses
  `minHeight`, contradicting the sizing decision in its own §1 bis.
- **No mirrored component tests.** The per-component loop in the plan's §9 asks for tests
  covering slots, the out-of-parent hook and `asChild`. The repository's convention is
  utility functions only — components are verified by their demo screen and docs preview.

## Pitfalls

- Re-resolving the recipe inside a slot — that's HeroUI's model and it only works with a
  class-cache engine. Resolve once at the root (R5).
- Putting a token-dependent value in `.style.ts`. It belongs to the recipe.
- Adding a prop instead of using `style`. R7 closes that door on purpose.
- `minHeight` instead of `height`; a long label must truncate, not deform the control.
- Wrapping the root in a `<View>` "for layout" — that wrapper was deleted with `fullWidth`.
