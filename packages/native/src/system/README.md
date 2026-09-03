# `system/`

What you **build XAUI components with**. Ships as `@xaui/native/system` and follows
semver — the components in this package use it through exactly the same surface a third
party does.

## The boundary that matters

`system/` is public and stable. `utils/` is private and can change at any time. A helper
that becomes useful to someone writing their own component **moves** here; it is never
re-exported from `utils/`.

## What belongs

- A primitive a component author needs and cannot reasonably write themselves: the style
  engine, slot plumbing, touch feedback, the portal, the icon.
- Nothing component-specific. If only `Button` needs it, it lives in `components/button/`
  until a second component asks for it (§2 bis).
- The exported surface is deliberate: an internal that `createRecipe` happens to use is
  not exported just because it exists. `style-cache`, `variant-map` and `resolve-tint`
  are imported directly by their tests, not published.

## Current contents

| Folder    | Role                                                                 |
| --------- | -------------------------------------------------------------------- |
| `recipe/` | The style engine: variants name tokens, styles resolve once, cached  |
| `slot/`   | Compound plumbing: strict context, text auto-wrap, `asChild` merging |

## `recipe/` in one page

A recipe declares a component's style once. `resolve` is the cached pass and `tint` the
uncached one:

```ts
const styles = buttonRecipe.resolve({ theme, selection: { variant, size }, states })
const tint = color ? buttonRecipe.tint({ theme, color, selection, states }) : undefined

<Pressable style={[styles.root, tint?.root, style]} />
```

**Resolution order, frozen:**

```
base → paint → variants → compoundVariants → states → slot props → slot style
```

The last two happen at the call site, and they always win.

**The cache** is one `Map` per recipe, keyed by
`${theme.id}|${theme.mode}|<axes, sorted>|<active states>`. `StyleSheet.create` runs once
per combination for the app's lifetime, so slots read a stable reference and a press
allocates nothing.

`theme.mode` is in the key because `createTheme` gives light and dark the same `id`.
`color` is **not** in the key: it takes arbitrary values (R7), so it would grow the table
with the colours users invent instead of with the finite combinations of tokens. That is
the whole reason it gets a second pass.

**A variant names tokens, `paint` places them.** `variantTokens` is data — ten lines of
token names. `paint` is written once per component and says which slot takes the
background and which takes the foreground. The tint pass reuses it, which is how `color`
lands where the variant put its tokens with nothing further to declare: a background for
`primary`, a label for `ghost`, a border for `tertiary`.

## `slot/` in one page

Four primitives, and every compound uses all four.

**`createSlotContext(name)`** returns `[Provider, useSlot]`. The tuple lets each compound
name its own hook, which R10 requires it to export:

```ts
export const [ButtonProvider, useButton] = createSlotContext<ButtonContext>('Button')
```

Reading it outside its root throws a named error pointing at the misplaced component, not
`undefined is not an object` three frames later. The context carries values the root
already **resolved** — style references, not tokens for the slot to resolve again (R5).

**`childrenToString(children)`** implements R3 once for the whole library: the string a
root should wrap in its default text slot, or `null` when it should render children as
they are. It stringifies the tree recursively instead of inspecting the first child,
which is the only way `<Button>{count} items</Button>` works — children there are the
array `[3, ' items']`.

**`Slot`** is the `asChild` render branch (R12), one line per root:

```tsx
const Root = asChild ? Slot : Pressable
return (
  <Root ref={ref} {...rootProps}>
    {children}
  </Root>
)
```

**`mergeProps` / `mergeRefs`** are what `Slot` merges with, and are public because a root
doing something unusual may need them directly. Event handlers compose rather than
replace, styles stack with the child's on top, `ref`s merge, and the child wins on
everything else.

`asChild` has to be uniform from the very first component: retrofitting it changes the
ref signature of all fifteen core components at once.

## `pressable-feedback/` in one page

What a control does under the finger, written once instead of forty-seven times. Every
pressable component renders it — `Button`, `Chip`, a clickable `Card`, `ListItem`,
`MenuItem`, `SegmentButton`.

```tsx
const [isPressed, setIsPressed] = useState(false)
const styles = recipe.resolve({ theme, selection, states: { pressed: isPressed } })

<PressableFeedback
  ref={ref}
  isPressed={isPressed}
  feedbackVariant="scale-highlight"
  animation={animation}
  style={[styles.root, tint?.root, style]}
  onPressIn={() => setIsPressed(true)}
  onPressOut={() => setIsPressed(false)}
>
  <Button.Label />
</PressableFeedback>
```

**It is controlled.** The root above owns `isPressed`, because its recipe resolves on it
(R5) and it needs the value before it renders. `PressableFeedback` applies that value; it
does not decide it.

**`feedbackVariant` mounts the overlay.** `scale-highlight` and `scale-ripple` add theirs;
`scale` adds none, which is what a root picks when it renders
`<PressableFeedback.Highlight style={…}>` itself — no prop here reaches into another
component's insides (R1).

**Pick one pressed treatment, not both.** The `Highlight` is a _neutral_ wash. A component
uses it, **or** a `pressed` state in its recipe swapping `bg` for `bgPressed` — never
both, or a pressed control darkens twice.

**`animation` off means no worklet.** `false`, `'disabled'` and `feedbackVariant="none"`
render a different component, not the same one with a branch inside, because hooks cannot
be conditional and "mounts no worklet" is only true if the Reanimated hooks are never
reached. `'disable-all'` does the same and passes it to descendants through context, so a
long list kills every row's worklets with one prop.

`asChild` goes **through** `PressableFeedback`, not around it. A root that did
`asChild ? Slot : PressableFeedback` would render its child with no touch feedback at all
— so the merge happens here, and R12 and the feedback stay in the same branch.

Each overlay also takes its own `animation` — `false` to switch that one off, or a
`duration` and an `opacity` — which wins over the blanket prop on the root, except when
the root switched everything off. Two knobs, deliberately: past that it is a different
animation, and that is a component's job rather than a prop's.
