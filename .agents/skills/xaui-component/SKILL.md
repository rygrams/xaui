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

## The thirteen rules — non-negotiable

| # | Rule |
|---|---|
| R1 | Composition, not configuration. One `forwardRef` root + dot-notation slots. No prop styles the inside of another component. |
| R2 | No `customAppearance`. Every slot carries its own `style`. |
| R3 | Text children are auto-wrapped through `childrenToString` (recursive stringify, returns `null` if any React element is present). |
| R4 | Layout belongs to the root (`gap`, `alignItems`, `flexDirection`). Slots have **no margin of their own**. No `startContent` / `endContent` — JSX order is screen order. |
| R5 | Context carries **resolved** values (style IDs), never raw props. Slots re-resolve nothing. Memoized. |
| R6 | Tokens in props, arbitrary values in `style`. `size="md"` yes, `size={42}` is a type error. Exception: `color`. |
| R7 | Two appearance props only: `variant` and `color`. No `background`, no `borderColor` — those go through `style`. |
| R8 | Booleans are `isX` / `hasX` (`isDisabled`, `isLoading`, `hasError`). `disabled` is never public; forward it internally to `Pressable`. |
| R9 | Every root forwards `ref`, `style` (including `Pressable`'s function form), `testID` and a11y props. `accessibilityRole` has a default but stays overridable. **Unfixable after 1.0.** |
| R10 | Every compound exports its context hook: `export { useButton }`. |
| R11 | `displayName` is namespaced: `'XAUI.Button.Root'`, `'XAUI.Button.Label'`. |
| R12 | `asChild` on every root, via `mergeProps` + `mergeRefs` from `system/slot/`. |
| R13 | No `left` / `right` in any style. Use `paddingStart` / `paddingEnd`, `marginStart` / `marginEnd`, `start` / `end`. An ESLint rule enforces it in `src/`. |

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
    asChild = false, color, style, ...pressableProps },
  ref
) {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  const styles = buttonRecipe.resolve(theme, {
    variant, size, radius,
    states: { disabled: isDisabled || isLoading, pressed: isPressed },
    tint: color,
  })

  const text = childrenToString(children)

  const context = useMemo(
    () => ({ labelStyle: styles.label, iconStyle: styles.icon, size, isDisabled, isLoading }),
    [styles.label, styles.icon, size, isDisabled, isLoading]
  )

  return (
    <ButtonContext.Provider value={context}>
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        disabled={isDisabled || isLoading}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[styles.root, styles.tint?.root, isIconOnly && sheet.iconOnly, style]}
        {...pressableProps}
      >
        {text !== null ? <ButtonLabel>{text}</ButtonLabel> : children}
      </Pressable>
    </ButtonContext.Provider>
  )
})

export const Button = Object.assign(ButtonRoot, { Label, Icon, Spinner })
```

A slot is three lines — read the resolved style from the context, merge the local `style`:

```tsx
export const ButtonLabel = forwardRef<Text, ButtonLabelProps>(function ButtonLabel(
  { children, style, ...rest }, ref
) {
  const ctx = useButtonContext('Button.Label')   // named throw when used outside
  return <Text ref={ref} style={[ctx.labelStyle, style]} {...rest}>{children}</Text>
})
```

Keep the view depth minimal: `Pressable > (Text | Icon)`, not four nested views. Touch
feedback comes from `system/pressable-feedback/` — never a per-component animation file.

## The loop — same for every component

1. `.recipe.ts` — variants name tokens, **no hardcoded value**
2. `.context.ts` + the exported `useX` hook (R10)
3. root in `forwardRef` with `asChild`, a11y, function-form `style`, namespaced
   `displayName` (R9, R11, R12)
4. one file per slot, no margin of its own (R4)
5. mirror test in `src/__tests__/components/<name>/` — slots, hook outside parent,
   `asChild`, and **style reference stability**
6. a screen in `apps/demo`
7. a doc page per the `xaui-docs` skill
8. a subpath export in `package.json` + `tsup.config.ts` (`@xaui/native/<name>`)

**Done when** `pnpm lint && pnpm type-check && pnpm test` pass, the demo screen renders
correctly in light and dark, and the legacy equivalent carries an `@deprecated` pointing at
the replacement.

Then run the `xaui-review` skill before opening a PR.

## Pitfalls

- Re-resolving the recipe inside a slot — that's HeroUI's model and it only works with a
  class-cache engine. Resolve once at the root (R5).
- Putting a token-dependent value in `.style.ts`. It belongs to the recipe.
- Adding a prop instead of using `style`. R7 closes that door on purpose.
- `minHeight` instead of `height`; a long label must truncate, not deform the control.
- Wrapping the root in a `<View>` "for layout" — that wrapper was deleted with `fullWidth`.
