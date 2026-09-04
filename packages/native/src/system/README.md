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
  engine, slot plumbing, touch feedback, the portal, the icon, the style-prop splitter of
  R14.
- Nothing component-specific. If only `Button` needs it, it lives in `components/button/`
  until a second component asks for it (§2 bis).
- The exported surface is deliberate: an internal that `createRecipe` happens to use is
  not exported just because it exists. `style-cache`, `variant-map` and `resolve-tint`
  are imported directly by their tests, not published.

## Current contents

| Folder                | Role                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| `recipe/`             | The style engine: variants name tokens, styles resolve once, cached     |
| `slot/`               | Compound plumbing: strict context, text auto-wrap, `asChild` merging    |
| `pressable-feedback/` | Touch feedback: the scale, and `Highlight` / `Ripple` as composed parts |
| `portal/`             | Render elsewhere in the tree: `Dialog`, `Sheet`, `Drawer`, `Snackbar`   |
| `icon/`               | A third-party icon that inherits its slot's size and colour             |
| `close-button/`       | The dismiss affordance: own press state, grown target, built-in cross   |
| `style-props/`        | R14: the style keys of a node, exposed as props and split back out      |

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
base → paint → variants → compoundVariants → states → tint → style props → slot style
```

The last three happen at the call site, and they always win. `tint` and the style props of
R14 are both **outside the cache**, for the same reason: they take values a caller invents,
and the table has to grow with the finite combinations of tokens instead.

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
  animation={animation}
  style={[styles.root, tint?.root, style]}
  onPressIn={() => setIsPressed(true)}
  onPressOut={() => setIsPressed(false)}
>
  <PressableFeedback.Ripple>
    <Button.Label />
  </PressableFeedback.Ripple>
</PressableFeedback>
```

**It is controlled.** The root above owns `isPressed`, because its recipe resolves on it
(R5) and it needs the value before it renders. `PressableFeedback` applies that value; it
does not decide it.

**The root scales; overlays are composed.** No prop names what to mount, because a name is
a cross-product — `scale-highlight` and `scale-ripple` could say five of their six
combinations and none of the ones a third overlay would add, and a wash _and_ a wave
together was unreachable.

**An overlay wraps, and it costs nothing.** `<Ripple>{children}</Ripple>` says what the wave
sits under, and it does not box it: the children come back as siblings of the wave's layer
in a fragment, which has no presence in the host tree — so the root's `flexDirection`, `gap`
and `alignItems` still reach them directly. A real wrapping `View` would have made the
root's layout apply to the wrapper instead, and added the depth §8 removed. Written bare,
`<Ripple />` is a sibling and **order does not matter**: the root hoists its bare overlays
under everything else. A component marks its own overlay with `markOverlay`, which is how a
third party's part gets the same treatment.

**What the overlay needs from the surface is resolved, not configured.** The root flattens
its own `style` once and publishes the contrasting ink and its corner radii. Only the root
knows what an overlay sits on or what shape it has to stay inside. The clip is the
overlay's, not the root's — a root that set `overflow: 'hidden'` would also cut a badge
sitting on its corner.

**Pick one pressed treatment, not both.** The `Highlight` is a _neutral_ wash. A component
uses it, **or** a `pressed` state in its recipe swapping `bg` for `bgPressed` — never
both, or a pressed control darkens twice. `Button` takes the second road and mounts no
overlay at all.

**`animation` off means no worklet.** `false` and `'disabled'` render a different component,
not the same one with a branch inside, because hooks cannot be conditional and "mounts no
worklet" is only true if the Reanimated hooks are never reached. `'disable-all'` does the
same and passes it to descendants through context, so a long list kills every row's worklets
with one prop.

`asChild` goes **through** `PressableFeedback`, not around it. A root that did
`asChild ? Slot : PressableFeedback` would render its child with no touch feedback at all
— so the merge happens here, and R12 and the feedback stay in the same branch. The
feedback context is published **above** the root for the same reason: a `Slot` merges into
its single child, so a provider nested inside would swallow the ref, the style and the
handlers. That placement is also what lets an `asChild` caller render an overlay among its
own children, which is the only place one can go when the caller's element _is_ the
pressable.

Each overlay also takes its own `animation` — `false` to switch that one off, or a
`duration` and an `opacity` — which wins over the blanket prop on the root, except when
the root switched everything off. Two knobs, deliberately: past that it is a different
animation, and that is a component's job rather than a prop's.

## `portal/` in one page

`Portal` renders its children into the nearest `PortalHost` instead of where it sits —
what `Dialog`, `Sheet`, `Drawer` and `Snackbar` are built on, since an overlay has to
escape the clipping and stacking of whatever container held the trigger.

```tsx
// once, at the root of the app, above navigation
<XAUIProvider>
  <PortalHost>{app}</PortalHost>
</XAUIProvider>

// anywhere below
<Portal>
  <Backdrop />
</Portal>
```

Publishing happens in a layout effect, so the content lands in the same commit as the
trigger's and an overlay never shows a frame late. Outside a host the context is `null`
and `Portal` renders nothing rather than throwing: an app that forgot `PortalHost` should
lose its overlays, not crash on the first `Dialog`.

## `icon/` in one page

An icon is a third-party component, so a slot context never reaches it and every call site
ends up computing the colour by hand. `Icon` closes that:

```tsx
<Button variant="danger">
  <Button.Icon as={TrashIcon} /> {/* colour and size inherited — nothing to pass */}
  <Button.Label>Supprimer</Button.Label>
</Button>
```

Three forms — a component through `as` (`size` and `color` injected, which covers Lucide,
Ionicons and vector-icons), a raw `react-native-svg` element as children, or an image
through `source`. All three resolve the same way: an explicit prop, else what the
surrounding slot published through `IconContext`, else the theme.

For a raw SVG the resolved values **win over the element's own** `width`, `height` and
`color`. One arriving from a design tool carries a baked-in size, and inheriting the
slot's instead is the entire point of wrapping it.

`IconContext` is a plain defaulted context rather than a `createSlotContext`: that one
throws outside its parent, and an `Icon` has to work standalone as much as inside a
`Button`. `react-native-svg` stays an **optional** peer — nothing here imports it, the
raw-SVG form only clones an element the caller already made.

## `style-props/` in one page

R14 — a component's style is editable in props, so loosening a control or giving it a
width does not mean opening an object:

```tsx
<Button padding={16} marginTop={8} width="100%">Envoyer</Button>
<Button.Label fontSize={18} letterSpacing={1}>Envoyer</Button.Label>
```

**Full React Native names, and therefore full React Native values.** `padding`, not `p`;
`padding={16}` is 16 points, exactly as `style` would be. A prop carrying the RN key's
name while multiplying its value by a scale would be the most expensive trap in the API —
the kind only a ruler on the screen catches. The scale stays one word away:
`padding={t.spacing(4)}`.

**Everything in this folder that renders a node takes them**, and so does everything built
on it: `PressableFeedback` and its two overlays, `PortalHost`, `Icon`. A list of which
primitives have them is the list R14 says not to maintain — if it renders a node, it has
them.

`Icon` carries the one nuance worth stating: its props reach the **`source` form only**,
exactly as far as its `style` already does. The other two forms render a third-party
component or clone the caller's element, so there is no node of ours to style, and `size`
and `color` stay the escape hatch there.

A component author needs two things from here — a type for its props, and the split at
the top of its render:

```tsx
export type CardProps = CardOwnProps & Omit<ViewStyleProps, keyof CardOwnProps>

function Card({ variant, style, ...props }: CardProps) {
  const [styleProps, rest] = useStyleProps(props)
  const styles = cardRecipe.resolve({ theme, selection: { variant }, states })

  return <View style={[styles.root, styleProps, style]} {...rest} />
}
```

`ViewStyleProps` for a root or a view slot, `TextStyleProps` for a text slot,
`ImageStyleProps` for an image one. Three rules hold it together:

- **The component's own props win.** Where a name is already the component's — `size` is a
  control's scale, `color` is R7's tint — the style prop of that name is not exposed, and
  `Omit<…, keyof OwnProps>` is what says so. Destructuring those props before the split is
  the runtime half of the same rule. `pointerEvents` is the one name where a style key and
  an RN component prop collide; it stays the prop it has always been.
- **The directional forms of R13 are not exposed at all.** Not deprecated, not warned
  about — absent from the type, because a props API is exactly where someone writes
  `paddingLeft` without thinking.
- **They resolve outside the style cache**, in the same second pass as the tint, after it
  and before the slot's `style`, which stays the last word for a `transform`, a
  per-platform shadow or a computed object.

The set is not a maintained list, it is `Omit<ViewStyle, DirectionalStyleKey>` — but the
split needs the names at runtime, and that table lives in `utils/style-props.ts`. A
compile-time check in `style-props.type.ts` pins the two together: a React Native upgrade
that adds a style key fails `type-check` naming it, rather than shipping a prop that types
fine and is dropped on the floor.

Plan §2 ter has the full reasoning.
