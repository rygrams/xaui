# @xaui/native

## 0.9.1-alpha.23

### Patch Changes

- 4467295: feat(input): the v1 `Input` — P3.7

  A text field with the label, the hint and the error that make it usable. Compound root
  plus four slots: `Input.Label`, `Input.Field`, `Input.Description` and `Input.Error`.

  **The root is the column, not the field.** `Input.Field` is the `TextInput`, which is what
  makes the three lines slots of one component rather than three components a form has to
  keep in step — and why `TextInputProps` are on the field rather than on the root.

  The first real use of the theme's `field*` family, derived in P0 and unread since. Four
  variants, the library's emphasis levels narrowed like the `Card`'s, splitting HeroUI's
  two-name `primary | secondary` by saying what each of their ends already is: `primary` is
  their field fill plus the theme's `field` shadow, `secondary` their neutral fill and the
  default here, `tertiary` the border alone, `ghost` neither.

  Focus darkens the border towards the mode's ink — `fieldBorderFocus`, no ring and no
  accent. `isInvalid` outranks it, so a field that is both reads as wrong rather than as busy.

  `labelPlacement="inside"` lifts the label into the box. It is taken out of flow and placed
  against the box's own padding, so the JSX is identical either way and nothing is
  reparented; the field pays for the room and the box grows by the same amount.

  Visually aligned with `heroui-native`: a 48pt minimum, 12pt of horizontal padding, a 16/24
  label above the field and a 14/20 line below it at `md`. The height is a **minimum** rather
  than fixed — the one place this component departs from the `Button`'s rule, because a
  `multiline` field holds the user's own text and has to grow.

  Adds a `borderFocus` role to `system/recipe`, so a state can read the variant's own focus
  colour the way `bgPressed` lets a pressed `Button` darken its own fill — and so a raw
  `color` follows the field into focus.

## 0.9.1-alpha.22

### Patch Changes

- d5461ae: feat(alert): the v1 `Alert` — P3.6

  A message the interface has to make sure is read. Compound root plus five slots:
  `Alert.Icon`, `Alert.Content`, `Alert.Title`, `Alert.Description` and `Alert.Close`, laid
  out as a row of three columns spaced by the root's `gap` alone.

  Nine variants: the `Card`'s `surface` for the neutral level — HeroUI's alert root, token
  for token, shadow included — and the `Chip`'s status ladder for the rest, each family in
  its full and soft slice.

  Visually aligned with `heroui-native`: 12pt of padding, a 12pt gap, a 24pt radius, a 16/24
  title above a 14/20 description and an 18pt icon at `md`. The icon's optical offset is
  derived from the title's leading rather than hard-coded, so it stays right at all four
  sizes.

  The root is **never a control** — no `isPressable`, no press behaviour on the type. What
  you press is `Alert.Close`, which now comes from a shared `system/close-button`: the
  `Chip`'s close became its second use, so its press state, grown touch target, missing-label
  warning and built-in cross are written once and both components are five-line call sites.

  Also fixes an inference bug in `createRecipe`: a `compoundVariants` entry declared the
  variant union instead of selecting from it, so a recipe whose only compound was
  `{ when: { variant: 'default' } }` rejected every other variant at the call site.

  `Alert.Icon` picks `Icon`'s forms one by one, so the union survives. `IconProps` became a
  discriminated union of its three forms, and a non-distributive `Pick` over it merged them
  back into a single shape where `as` and `source` are both optional — which stopped
  type-checking the moment both changes met on `main`, and would have let
  `<Alert.Icon as={Check} source={png} />` compile with one of the two silently dropped. The
  type now distributes the `Pick`, and the slot renders one `<Icon>` per form in `Icon`'s own
  runtime precedence rather than one call carrying all three.

- 17993f6: feat(chip): the v1 `Chip` — P3.5

  A compact token — a status, a tag, a filter, a person. Compound root plus five slots:
  `Chip.Label`, `Chip.Icon`, `Chip.Dot`, `Chip.Avatar` and `Chip.Close`, spaced by the root
  alone, so JSX order is screen order and there is no `startContent` / `endContent`.

  Eleven flat variants replace HeroUI's `variant × color` matrix: the `Button`'s five-step
  emphasis ladder plus the three status families it deliberately refused — a chip reports an
  outcome, so `success`, `warning` and `danger` each land here with their soft slice.

  Visually aligned with `heroui-native`: 12pt of horizontal padding, a 14/20 label and a 28pt
  `md`, with the height fixed rather than derived from vertical padding so a chip carrying an
  avatar still lines up with the one beside it.

  `Chip.Close` is a control in its own right — its own press state, its own `hitSlop`, and a
  cross it draws itself, so a dismissible chip needs no icon set installed.

  Also extracts the `radius` axis, duplicated in every recipe that has one, into
  `radiusAxis()` in `system/recipe/`.

  `Chip.Avatar` is pulled back into the capsule's rounded end. The root's horizontal padding
  is set for text — 12pt at `md` — while the height leaves only 3pt above and below a 22pt
  avatar, so a face sat visibly pushed into the chip where a label beside it looked right. The
  slot now cancels the difference, which seats it concentrically with the rounded end: the
  capsule's cap is a circle of radius `height / 2` and the avatar is one of radius
  `diameter / 2`, so they share a centre only when the gap is equal on every side. It is the
  one margin on a slot in this component, and R4 is about spacing _between_ slots rather than
  about cancelling the parent's padding — `Chip.Avatar` is a leading slot by contract, which
  is what makes a leading-only correction sound. `marginStart`, so RTL follows (R13), and
  clamped at zero so a theme with tighter padding needs no pull at all.

- 662fdfc: `warning` moves from the `amber` family to `orange`

  The dark `warning` was `amber[400]`, a distinctly yellow 84° in OKLCh, which read as gold
  rather than as a caution — next to a green `success` and a red `danger` it looked like a
  third decorative colour instead of the middle of a status ladder.

  Swapping the family moves both modes the same way and **narrows the gap between them**: the
  two ramps sit 35° apart today at the steps we use, and 18° after. Light barely moves at all
  — `amber[700]` and `orange[700]` are 11° apart and share a lightness, so the change there is
  a slight warming rather than a new colour, and the contrast against `warningForeground` goes
  _up_, 4.81 → 4.96. Dark moves further, because that is where the yellow was.

  Everything derived follows through `deriveColors`: `warningPressed`, `warningSoft`,
  `warningSoftForeground` and `warningSoftPressed`. `pnpm tokens:check` passes on both modes.

  It reaches every component with a `warning` variant — `Chip`, `Alert`, `Badge`, `Spinner`
  and the ones still in review — which is the point of the token layer: one line in
  `tooling/tokens/source.ts`, no component touched.

## 0.9.1-alpha.21

### Patch Changes

- 1555901: `Card` — the v1 surface, and the control it becomes.

  A compound root with five slots — `Header`, `Body`, `Footer`, `Title`, `Description` — on
  the same shape as the `Button`: the recipe resolves once at the root and publishes the
  resolved styles, every node takes its own style props (R14), `asChild` merges into the
  caller's element, and the context hook is exported so a third party can add a slot.

  `variant` narrows the shared vocabulary to its four emphasis levels — `default`,
  `secondary`, `tertiary`, `ghost` — over the theme's `surface*` family, with the surface
  shadow on the one level that stands on the background. `size` drives padding, both gaps,
  the radius and the type of the two text slots, and never a height: a card is as tall as
  what it holds. `isPressable` turns the surface into a `PressableFeedback` with a press
  wash, `accessibilityRole="button"` and the shared scale.

  The rendering is HeroUI's card measured — `md` is 16pt of padding, a 24pt radius, an
  18/28 title in `medium` over a 16/24 description, no border on a filled surface — reached
  through our own vocabulary rather than through their utility classes, and with the gaps the
  component owns instead of leaving to the call site.

  Also fixes a `NoInfer` gap in the recipe engine: a `compoundVariants` entry naming one
  variant used to collapse the whole recipe's variant union to that single value.

  **`Card.Background`** — a photo, a gradient or a video behind the card. The root **hoists**
  it, so JSX order does not decide stacking: a background written after the header would
  otherwise cover it, which is the invisible ordering rule composition should not carry. It
  reuses the marking idiom `PressableFeedback` uses for its overlays, and `markBackground` is
  exported so a third party's layer is not a second-class citizen.

  The clip lives on the layer rather than on the root: `overflow: 'hidden'` cuts the node's
  own shadow on iOS, so clipping the card would cost a `default` one the elevation its variant
  just gave it. `radius` therefore moves both slots together — a corner that moved only the
  root would round the card and leave its photo square. HeroUI reaches the same feature
  through a `background` **prop** and clips on both nodes, losing the shadow.

  **The light `surfaceSecondary` moves up half a step**, `#f4f4f5` → `#ececee`. It sat so
  close to the `background` (`#fafafa`) that a `secondary` card on the page read as no card at
  all, and `zinc[200]` was already `surfaceTertiary` — so the level between them was the only
  one left. It is the OKLab midpoint of the two, written in the source layer rather than added
  to the palette: `PaletteShade` is derived from `zinc`, so a `150` there would have claimed
  every other family has one too.

## 0.9.1-alpha.20

### Patch Changes

- 4a14277: `Stack` and `Grid` join the layout lot

  **`Stack`** overlays. The root is the containing block (`position: relative`) and
  `Stack.Item` is a layer taken out of the flow (`position: absolute`); where a layer sits is
  R14 — `top`, `bottom`, `start`, `end`, `zIndex`. The first child stays in the flow and gives
  the stack its size. Overlaying is composed rather than inferred: a stack that positioned
  every child but the first would have to guess which one sets the size, and would change
  meaning the day a caller reordered them.

  **`Grid`** lays out a fixed number of columns, wrapping, and **measures** its column width
  rather than expressing it as a percentage. `width: '33.33%'` resolves against the content
  box and knows nothing about the gaps, so three cells plus two gaps overflow their row. The
  root reads its own width and publishes the exact column width; `Grid.Item span={n}` covers
  several columns, gaps included. `gap` is the grid's own prop because the root has to read
  it to size the cells.

  `Container` and the remaining legacy `view/` entries are not planned: they are R14 or
  `Stack`.

## 0.9.1-alpha.19

### Patch Changes

- 5f91549: `Row` and `Column` — the two axes of a layout

  Each contributes one declaration, `flexDirection`, and nothing else. `gap`, `alignItems`,
  `justifyContent` and `padding` are `ViewStyle` keys that R14 already exposes as props on
  every node, so these two add no vocabulary of their own — which is the change from the
  legacy components, where `mainAxisAlignment`, `crossAxisAlignment`, `mainAxisSize`,
  `direction` and `reversed` were words to learn for what React Native already says.

  `flexDirection` is the one style prop they do not expose: it is their identity, and a `Row`
  that could be told to lay out as a column would be a `View` with a longer name.

  Three entries of the legacy `view/` lot are deliberately not ported, because R14 removed
  their reason to exist: `Padding` is `padding={16}` on the node itself, `Center` is two
  alignment props on the parent, and `Spacer` is `justifyContent="space-between"`. Each added
  a view node to say what a style prop already says.

## 0.9.1-alpha.18

### Patch Changes

- 345b3e0: `Icon`'s R14 boundary moves from a comment into the type

  `IconProps` declared the style props and `style` for all three forms, but only the `source`
  form applies them — it is the one where we render the node. So this compiled and silently
  did nothing:

  ```tsx
  <Icon as={Trash2} marginEnd={8} />
  ```

  The props are a discriminated union now: `as`, a raw SVG child and `source` are mutually
  exclusive, and only `source` carries R14. The call above is a compile error that points at
  `size` and `color`, the levers the other two forms actually have.

  `Icon` also gains the demo screen it never had — the three forms, the cascade from prop to
  slot to theme, and a raw SVG having its baked-in size overridden. Not having one is why the
  gap went unnoticed: nobody had tried writing a margin on an icon.

## 0.9.1-alpha.17

### Patch Changes

- 863cc86: `Typography` and `TextSpan` — the first entry of the v1 core

  Ten roles, aligned with HeroUI Native's `text`: `h1`–`h6`, `body`, `body-sm`, `body-xs` and
  `code`. Each role fixes size, line height, weight and family **together**, which is why
  there is no `size` prop and no `weight` prop — the combinations they allowed (a heading in
  a light weight, a caption in a display size) become unwritable rather than discouraged.

  `TextSpan` is a bare React Native `Text`. Nesting a `Text` inside a `Text` already inherits
  font, size, weight and colour on both platforms, so a span needs no context to read and no
  role to resolve: the legacy `TextSpanContext` was reimplementing the platform, and it is
  gone. `Typography` therefore publishes no slot and does none of a span's work.

  Neither alignment nor truncation gets a prop. `textAlign` is a `TextStyle` key that R14
  already exposes, and `numberOfLines` is React Native's own — a prop of ours would be a
  second name for the same thing.

## 0.9.1-alpha.16

### Patch Changes

- da4bc8a: The `default` variant reads as grey rather than as near-white

  Light `default` was zinc-100 on a white background — a fill faint enough to be mistaken
  for no fill at all, where dark's zinc-800 sits clearly off its own background. One step to
  zinc-200 balances the two modes instead of shifting one.

  The derived layer follows from the single source: `defaultPressed`, `defaultSoft` and
  `defaultSoftPressed` move with it, so `tertiary` and `ghost` keep a pressed state that
  matches the new grey. Both packages regenerate their `tokens.gen.ts` from that source.

## 0.9.1-alpha.15

### Patch Changes

- 7376ce5: `asChild` reached `Slot` as an array, so every pressable threw

  `PressableFeedback` rendered `{overlays}{content}` — two expression children, which React
  hands to the root as an array. Under `asChild` that root is a `Slot`, which merges into a
  single element and threw instead, whether or not an overlay was composed: with none,
  `partitionOverlays` returns `overlays: null` and `[null, content]` is an array all the
  same. `<Button asChild>` was unusable, and so was every other pressable.

  The root's children are now computed once, as a single node, by `feedbackChildren`.
  `asChild` skips the partition entirely: the caller's element _is_ the pressable, so an
  overlay written inside it belongs to it and hoisting would make it a sibling of the very
  element it was composed into.

## 0.9.1-alpha.14

### Patch Changes

- 2838877: R14 reaches every component that renders a node, not only the `Button`.

  `PressableFeedback` and its `Highlight` / `Ripple` overlays, `PortalHost` and `Icon` now
  take the style keys of the node they render, the same way the `Button` and its slots do.
  The primitive every pressable control in the library is built on cannot be the one place
  where `padding={16}` has to become an object again.

  ```tsx
  <PressableFeedback padding={12} borderRadius={16}>…</PressableFeedback>
  <Icon source={logo} marginEnd={8} />
  ```

  `Icon`'s reach the **`source` form only**, exactly as far as its `style` already does: the
  other two forms render a third-party component or clone the caller's element, so there is
  no node of ours to style. That is the rule applied, not an exception to it — the rule says
  _the node the component renders_, and there is one in three.

  On `PressableFeedback` they merge into `style` before either branch sees it, so the ink and
  the corners an overlay reads off its surface include a `backgroundColor` or a
  `borderRadius` written as a prop.

## 0.9.1-alpha.13

### Patch Changes

- 18b3fd8: A pressed fill now moves one way: towards the ink of the mode.

  `accentPressed`, `successPressed`, `warningPressed` and `dangerPressed` mix towards
  `foreground` instead of the variant's own text colour. That text is picked for contrast, so
  its lightness followed the fill's and took the direction with it: `#9333ea` carries
  near-white text and lightened under the finger in light mode, while `#c084fc` carries dark
  text and darkened in dark mode. Same control, opposite gesture, and nobody had decided it.

  Now `#9333ea → #8533d3` in light and `#c084fc → #c691fd` in dark — darker in light, lighter
  in dark — and the label's contrast rises in both modes instead of falling in one. The
  neutral fills already worked this way, since `defaultForeground` and `surfaceForeground`
  _are_ the mode's ink; only the four saturated intents ever flipped. `deriveTint` follows the
  same rule, so a raw `color` behaves like a token under the finger as much as it does at rest.

  Visible on every filled control, which today means the `Button`.

## 0.9.1-alpha.12

### Patch Changes

- cd06df1: Fix the press scale, which lurched on wide controls, and align the touch feedback with
  HeroUI's values.

  **The scale was a flat `0.975` for every control.** What the eye reads is the displacement,
  not the ratio: that same ratio moves a 360pt row nine points and a 96pt chip two. It is now
  `0.985` adjusted by a width coefficient, so the movement stays roughly constant in points
  whatever the control's width — the reference width is 300pt, and `pressScaleFor` carries the
  arithmetic with a test that asserts a chip and a full-width row travel the same distance.
  The curve is 300ms eased out, in both directions, instead of 100ms in and 150ms out.

  The wash goes to `0.1` over 200ms. The ripple is Material's `InkRipple` rather than an
  approximation of it: full ink in 75ms held while the circle keeps growing, a circle starting
  at 30% of its target instead of at a point, a target radius of half the diagonal, and a
  centre travelling from the finger to the middle of the control. The expansion runs a second
  while the finger is down and finishes in 225ms once it lifts, so the wave catches up rather
  than being cut.

  **The ripple now draws, and the waves belong to the root.** It never drew, and the first fix
  was wrong: the handlers went onto the overlay's own `View`, which only hears touches that
  land on _it_. The overlay is a sibling of the component's children, not their parent, so a
  ripple worked on a button's padding and did nothing on its label — a bug that looks like a
  rendering problem. Touches bubble to the `Pressable`, so that is where the handlers live;
  the root drives the two waves and publishes them, and the overlay only draws them.

  **`feedbackVariant` is gone, and overlays are composed.** The prop named a cross-product in
  a string — `scale`, `highlight`, `ripple`, `scale-highlight`, `scale-ripple`, `none` — which
  could name five of the six combinations it had and none of the ones a third overlay would
  add. A wash and a wave together, which is what Material actually does, was unreachable.

  The root scales, and anything laid over it is a part that wraps what it sits under:

  ```tsx
  <PressableFeedback isPressed={isPressed} style={styles.root}>
    <PressableFeedback.Ripple>
      <Label />
    </PressableFeedback.Ripple>
  </PressableFeedback>
  ```

  **Wrapping costs nothing**, which is the part worth knowing: the children are not boxed.
  They come back as siblings of the wave's layer in a fragment, which has no presence in the
  host tree, so the root's `flexDirection`, `gap` and `alignItems` still reach them directly
  and the rendered tree is identical to writing the overlay as a bare sibling. A real wrapping
  `View` would have been the trap — the root's layout would apply to the wrapper, the
  primitive would need to be handed the row's `gap` to give it back, and it would add the view
  depth §8 removed.

  Written bare, `<PressableFeedback.Ripple />` is that sibling and **order does not matter**:
  the root pulls its bare overlays out and paints them under everything else, so one written
  after the label does not end up on top of it — a 10% wash over text is subtle enough to ship
  by accident. A wrapping overlay is left where it is, since it already contains its content.
  `markOverlay` is exported, so a third party's own overlay part gets the same treatment.

  This is also the only shape that survives `asChild`, and that was a real hole: the caller's
  element _is_ the pressable there, so the primitive has no sibling to inject and mounted no
  overlay at all. An `asChild` control could not have one. Now the caller renders it.

  **`Button` drops `feedbackVariant` rather than renaming it.** It has one treatment and
  always did: the recipe's `pressed` state paints the variant's own pressed colour, so a wash
  on top would darken the control twice. It scales, and mounts nothing.

  **The ink and the corners are resolved, not configured.** The root flattens its own `style`
  once and publishes both: `backgroundColor` decides the contrasting ink, and the radius keys
  decide the shape an overlay clips itself to. A purple fill gets light ink, a pale surface
  gets dark ink, and a translucent `…Soft` token or no background at all falls back to the
  theme's `foreground` — honest, because the control is showing what is behind it. The perf
  harness caught that `contrastOn` throws on the `rgba()` those soft tokens carry, which would
  have crashed every soft variant on first press.

  Carrying the clip on the overlay rather than on the root fixes a second thing: the root no
  longer sets `overflow: 'hidden'`, so a child that legitimately overflows — a badge on a
  button's corner — is no longer cut by a decision about the press.

  `inkFor`, `radiusFrom` and `partitionOverlays` are pure and tested, as are `pressScaleFor`,
  `rippleRadiusFor`, `resolveAnimation` and `resolveSlotAnimation` — thirty-four assertions
  where the docs previously claimed a test that did not exist. Three carry a decision rather
  than an implementation: every control travels the same distance in points whatever its
  width, a translucent background falls back to the foreground instead of throwing, and a bare
  overlay written last comes back first while a wrapping one stays put.

- 51986e5: Style as props (R14) — `useStyleProps` and `splitStyleProps` on `@xaui/native/system`, and
  the `Button` on them.

  ```tsx
  <Button padding={16} marginTop={8} width="100%">Envoyer</Button>
  <Button.Label fontSize={18} letterSpacing={1}>Envoyer</Button.Label>
  ```

  Full React Native names, and therefore full React Native values: `padding={16}` is 16
  points, exactly as `style` would be — a prop carrying the RN key's name while multiplying
  its value by a scale would be the trap you only catch by measuring on screen. The scale
  stays one word away, `padding={t.spacing(4)}`.

  The set is the node's style type minus the directional forms R13 bans, which are not
  exposed at all: `ViewStyleProps` on a root, `TextStyleProps` on a text slot. A name the
  component already uses stays the component's — `size` is the control's scale, `color` is
  R7's tint. They resolve outside the style cache, after the tint and before `style`, which
  is still the last word.

  `Button.Icon` deliberately takes none: two of `Icon`'s three forms render no view of ours.

## 0.9.1-alpha.11

### Patch Changes

- 76441cd: Ship workletized code, or every animation is a hard crash.

  The Reanimated Babel plugin turns a function into a worklet — a serialized body plus its
  captured closure — and Reanimated **aborts the process** when it is handed a plain function
  to run on the UI runtime: `Abort trap: 6` inside `WorkletRuntime::runSync`, with no
  JavaScript error to read. In an app that transformation happens in the consumer's Metro
  build; over a published `node_modules` it does not. The libraries that get this right ship
  their _source_, so Babel sees the original call sites; we ship a compiled `dist`, so the
  same pass now runs in our own build (`tooling/workletize/`).

  Every animated hook also carries an explicit `'worklet'` directive. It is the load-bearing
  half: the CJS output calls the hook as `_reactNativeReanimated.useAnimatedStyle(...)`, and
  the plugin recognises the bare identifier rather than the namespace member — so without the
  directive the pass finds nothing to transform. The explicit dependency arrays stay for the
  web, where the hook throws instead of aborting.

## 0.9.1-alpha.10

### Patch Changes

- c4c4657: Fix what the blocking P2 API review found, before fifteen components copy it.

  **`require()` failed on every subpath.** `exports.require` pointed at the ESM build while
  the CJS build was produced and never referenced, so in a `"type": "module"` package every
  `require('@xaui/native')` threw a `SyntaxError`. Both packages now declare the full dual
  form, with types **per condition** — `.d.ts` under `import`, `.d.cts` under `require` — so
  a CommonJS consumer no longer type-checks against the ESM declarations.

  **Overlays painted outside rounded corners.** `Highlight` and `Ripple` are absolute fills
  with square corners, and every control in the library is rounded. The clip existed only for
  `scale-ripple`, and only on the animated branch; it now applies on both branches whenever a
  default overlay is mounted — and only then, so a root without one can still let a child
  overflow.

  **`accessibilityState` was replaced instead of merged** on `Button`. A caller adding
  `expanded` or `selected` silently erased `disabled` and `busy`, and a screen reader stopped
  announcing a disabled button.

  **`defaultVariants` narrowed a recipe's whole `Variant` type** to the single value named in
  it, making every other variant a type error at the call site. `NoInfer` in the engine
  removes the cast each of the forty-seven components would otherwise have carried.

## 0.9.1-alpha.9

### Patch Changes

- 40b48e0: Add `Button` — the first v1 component, on `@xaui/native/button`.

  ```tsx
  <Button onPress={submit}>Envoyer</Button>

  <Button variant="danger" size="lg">
    <Button.Icon as={TrashIcon} />
    <Button.Label>Supprimer</Button.Label>
  </Button>
  ```

  Ten variants naming tokens and computing nothing, four sizes driving height and never
  width, `color` as one raw tint that lands where the variant put its tokens, `isLoading`
  inserting a spinner when none is composed, and `asChild` handing the press to someone
  else's element. The view depth is one — `PressableFeedback > (Text | Icon)` — and a press
  allocates no style: every combination of tokens is resolved once and cached for the
  lifetime of the app.

  Two fixes the component needed on the way:
  - The build emitted classic `React.createElement` against a binding the sources never
    import, so **every component in the published package would have thrown on first
    render**. esbuild now uses the automatic JSX runtime.
  - Every animated hook carries an explicit dependency array. Reanimated's Babel plugin
    infers one, but it runs in the consumer's build and does not reach a published `dist` on
    web, where the hook throws instead of animating.

  `usePressState` now accepts `null` handlers, which is how `PressableProps` types them.

## 0.9.1-alpha.8

### Patch Changes

- 6cc7b49: Fix `asChild` on `PressableFeedback`, which silently dropped every pressable prop.

  Under `asChild` the root renders a `Slot`, and a `Slot` merges its props into its single
  child. That child was the feedback context provider, so the ref, the style, the press
  handlers and `disabled` all landed on a provider that ignores them: the caller's element
  stopped reacting to touch entirely, with no error to say so. The provider now sits above
  the root, and the caller's element receives the props it was always meant to.

  The default overlay is no longer rendered under `asChild`. The caller's element _is_ the
  pressable there, so there is no sibling to inject it as; the context is still published, so
  `<PressableFeedback.Highlight />` among the caller's own children still works.

## 0.9.1-alpha.7

### Patch Changes

- 824d5b6: Declare `semver` where it is used. `tooling/pack-check` checks, against the **packed**
  manifests, that `@xaui/native` can only ever appear once in a consumer's resolution tree:
  it is a peer and never a dependency, neither package carries a runtime dependency, no
  `workspace:` protocol survives packing, and every peer range admits the version actually
  shipped.

## 0.9.1-alpha.6

### Patch Changes

- d8783d7: Add the shared hooks: `useControllableState`, `usePressState`, `useMergedRef` and
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

## 0.9.1-alpha.5

### Patch Changes

- 60011be: Add `Icon` to `@xaui/native/system`.

  An icon is a third-party component, so a slot context never reaches it and every call site
  ends up computing the colour by hand. `Icon` closes that: three forms — a component through
  `as` (`size` and `color` injected, covering Lucide, Ionicons and vector-icons), a raw
  `react-native-svg` element as children, or an image through `source` — all resolving the
  same way. An explicit prop, else what the surrounding slot published through `IconContext`,
  else the theme.

  For a raw SVG the resolved values win over the element's own `width`, `height` and `color`:
  one arriving from a design tool carries a baked-in size, and inheriting the slot's instead
  is the point of wrapping it. `react-native-svg` stays an optional peer — nothing here
  imports it, the raw-SVG form only clones an element the caller already made.

## 0.9.1-alpha.4

### Patch Changes

- 06d5069: Add `Portal` and `PortalHost` to `@xaui/native/system`.

  `Portal` renders its children into the nearest `PortalHost` instead of where it sits, which
  is what `Dialog`, `Sheet`, `Drawer` and `Snackbar` will be built on — an overlay has to
  escape the clipping and stacking of whatever container held the trigger. Publishing happens
  in a layout effect, so the content lands in the same commit as the trigger's and an overlay
  never shows a frame late.

  Outside a host the context is `null` and `Portal` renders nothing rather than throwing: an
  app that forgot `PortalHost` should lose its overlays, not crash on its first dialog.

## 0.9.1-alpha.3

### Patch Changes

- c4d26ad: Add `PressableFeedback` to `@xaui/native/system`: the touch feedback every pressable
  component shares, instead of an animation file per component.

  It renders the pressable root and is **controlled** — the component above owns `isPressed`,
  because its recipe resolves on that value and needs it before rendering.
  `feedbackVariant` picks what happens under the finger (`scale-highlight`, `scale-ripple`,
  `scale`, `none`) and mounts the matching overlay; `PressableFeedback.Highlight` and
  `.Ripple` are slots a root can render itself when it wants to style one.

  `asChild` goes **through** this component rather than around it: a root swapping it for a
  bare `Slot` would render the child with no touch feedback at all. `isDisabled` replaces
  React Native's `disabled` (R8), and each overlay takes its own `animation` — `false`, or a
  `duration` and `opacity` — over the blanket one on the root.

  `animation` on the root accepts `false`, `'disabled'`, `'disable-all'` or an object
  switching sub-animations off one at a time. Turning animations off renders a different component
  rather than the same one with a branch inside, so no Reanimated hook is reached and no
  worklet is mounted. `'disable-all'` reaches descendants through context, so a long list
  disables every row's worklets with one prop.

  Also types `XAUITheme['fontWeights']` as React Native's own `fontWeight` instead of
  `string`, which does not assign to it — every component reading `t.fontWeights.medium`
  would otherwise have needed a cast.

## 0.9.1-alpha.2

### Patch Changes

- c0a6e44: Add the slot primitives to `@xaui/native/system`: `createSlotContext`,
  `childrenToString`, `Slot`, `mergeProps` and `mergeRefs`.

  `createSlotContext(name)` returns a `[Provider, useSlot]` pair, so each compound names the
  hook it exports and a slot read outside its root throws an error naming both the hook and
  the component instead of failing three frames later on `undefined`.

  `childrenToString` implements the text auto-wrap once for the whole library. It stringifies
  the tree recursively rather than inspecting the first child, which is what makes
  `<Button>{count} items</Button>` — children `[3, ' items']` — resolve to `'3 items'`.

  `Slot` is the `asChild` render branch: `const Root = asChild ? Slot : Pressable`. It merges
  through `mergeProps`, which composes event handlers rather than replacing them, stacks
  styles with the child's on top, keeps a `Pressable` state-function style callable, and
  merges refs. `asChild` has to be uniform from the first component — retrofitting it changes
  the ref signature of every core component at once.

## 0.9.1-alpha.1

### Patch Changes

- 09cda9d: Add the style engine, on the new `@xaui/native/system` subpath.

  `createRecipe` declares a component's style once and resolves it in two passes. The cached
  pass is keyed by finite tokens alone — theme, mode, variant, the axes, the active states —
  so `StyleSheet.create` runs once per combination for the app's lifetime and every slot
  reads a stable reference, which is what lets `React.memo` work and keeps a press from
  allocating. The `color` prop takes arbitrary values, so it stays out of the key and gets a
  second, uncached pass: the cache grows with the number of token combinations, not with the
  palette an app invents.

  A variant names tokens and a single `paint` function says where they land, so the tint pass
  reuses it and `color` lands wherever the variant put its tokens — a background for
  `primary`, a label for `ghost`, a border for `tertiary` — with nothing further to declare.
  `theme/derive-tint.ts` expands one raw tint into the six slices a variant consumes, using
  the same OKLab formulas as the derived colour layer, memoized per tint and mode.

## 0.9.1-alpha.0

### Patch Changes

- 88c692a: Publish to npm again, under the `alpha` dist-tag.

  Both packages were `private` while the v1 rewrite started from an empty `src/`. They are
  publishable again, but the repo is now in changesets **pre mode** with the tag `alpha`, so
  `changeset publish` ships them as `alpha` and leaves `latest` where it is —
  `@xaui/native@0.2.8` and `@xaui/hybrid@0.0.14`, the last releases that actually carry
  components. Installing either package without a tag keeps returning those.

  `pnpm add @xaui/native@alpha` is the opt-in. At this point it exports the theme layer only
  (`createTheme`, `XAUIProvider`, the token and colour utilities) — the components land from
  P2 on, one at a time, which is exactly what the tag announces.

## 0.9.0

### Patch Changes

- 1f09f09: Add an ESLint rule (R13) that forbids directional style properties (`left`, `right`, `paddingLeft`, `marginRight`, `borderLeftWidth`…) in `packages/native/src` — use the Start/End equivalents instead so React Native mirrors layout correctly under RTL.
