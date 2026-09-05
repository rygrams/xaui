# @xaui/native

## 0.9.1-alpha.48

### Patch Changes

- 8de0808: `BottomSheet` gets a reduced state.

  `collapsedHeight={200}` gives the sheet a second disclosure inside the first: it is either
  up or gone, and while it is up it is either full or reduced. `isExpanded`,
  `defaultExpanded` and `onExpandedChange` control it the way `isOpen` controls the other.

  These are not snap points — two states, not an array of positions.

  Where the sheet cuts comes from `BottomSheet.Summary`, a new slot: it is `<summary>` to the
  sheet's `<details>`, the part that survives rather than a different view for the reduced
  state. It renders in both, and reports where its bottom edge falls so that whatever sits
  above it — a handle, usually — is counted too. The sheet adds its own bottom padding back
  onto that edge: cutting on the summary's last pixel leaves the reduced sheet with air above
  the handle and none under the last line, the text against the screen edge and under the
  gesture bar on a phone that has one. `collapsedHeight` is not extended that way — it is a
  number written against a sheet someone was looking at — and it stays as the fallback for a
  sheet with no natural seam, the summary winning when both are given.

  Either way the sheet is not re-laid out. It is the same box at its full height, moved
  further down, so the tail slides off the bottom of the screen and comes back untouched.

  A drag that was not decisive puts the sheet back. Decisive down goes one state down, unless
  the throw was aimed past the reduced notch, in which case it dismisses: dragging a sheet the
  whole way to the bottom and having it stop half open reads as a refusal. Decisive up
  expands. Without a `collapsedHeight` none of this applies and the sheet behaves exactly as
  before.

  `BottomSheet.Handle` becomes a real control on a collapsible sheet, the way an
  `Accordion.Trigger` is — a drag would otherwise be the only way in and out of the reduced
  state, and a drag is a gesture some people cannot perform. It warns in development without
  an `accessibilityLabel`.

## 0.9.1-alpha.47

### Patch Changes

- 4d1d3dd: `Surface` — a ground for other things to sit on

  **One node and no slots**, which is the point: a surface is a fill, a corner and some
  padding, and every other component in this library that needed those three has been writing
  them out again. It is the smallest thing here and the most reused.

  **It is not a `Card`.** A card has decided things for you — it is always lifted, it has a
  header and a footer, and its levels carry an emphasis. A surface has decided nothing.

  **A ladder, not four emphases.** `primary` sits on the page, `secondary` inside a `primary`,
  `tertiary` inside a `secondary`, and each is a token the theme already names — so a nest is
  legible in both modes without anyone choosing greys. Three is as deep as that reading
  survives; a fourth would be a shade nobody could place. `ghost` at the end is not a level
  but the absence of one.

  **Elevation is asked for rather than tied to the variant**, and defaults to true for
  `primary` alone: a shadow under a ground that barely differs from the page reads as dirt
  rather than as height. Whether a ground is above the one under it is the layout's business —
  the same `secondary` is flat inside a card and lifted floating over a list.

  Its props list is six lines because everything else a surface could be is already a style
  prop. There is nothing here a prop had to be invented for.

  `Card`, `Popover`, `Accordion` and `Dialog` should read it. None of them does yet: that is a
  refactor rather than a component, and it wants its own change so a regression in one of the
  four is not hidden inside a new file.

## 0.9.1-alpha.46

### Patch Changes

- ef7332a: `TagGroup` — List · Item · ItemLabel · ItemRemoveButton

  **It is not a row of `Chip`s**, and that answers a question this roadmap has carried since
  `TagGroup` was first listed beside a `Chip` that already shipped.

  A chip is a piece of metadata that is always the same. A tag is one you can turn on, take
  off, or both. The selection state and the removal are the component; the pill around them
  is the least of it — which is also why the two do not share a recipe. A chip has ten
  variants because it reports an intent; a tag has two grounds because it reports nothing at
  all until it is selected.

  **Two grounds, not two emphases.** `default` is the theme's neutral fill, `surface` the card
  colour, and they swap so a tag never disappears into what is behind it: a group on a card
  wants one, a group on the page wants the other. A selected tag leaves both for the accent's
  soft slice, the only place this component uses colour.

  **The cross renders nothing without an `onRemove`.** Removing a tag is the caller's list
  changing, and a cross that appeared to work while the list stayed put would be worse than
  one that is plainly not there. It is written out rather than drawn by the item, because a
  tag you can turn on and a tag you can take off are different controls and most groups are
  only one of the two.

  It reads `system/close-button`, so the press state, the grown touch target, the
  missing-label warning and the drawn cross are the shared ones — six lines here, and the
  third component to read them after `Chip` and `Alert`.

  The selection rule is a pure function with ten tests, and it returns the list **unchanged**
  whenever a press changes nothing: `useControllableState` drops a set to the value it already
  holds, so `onSelectionChange` never fires for a change that did not happen.

  Both faces of a tag are resolved once on the root, so a group of forty costs what a group of
  two costs and no slot touches the recipe (R5).

## 0.9.1-alpha.45

### Patch Changes

- 541cbe7: The toast stack collapses, like HeroUI's.

  It was a flex column with a gap: every card fully visible, one under the next, so six
  toasts took six card heights down the screen. HeroUI's is a pile — one card in front, the
  rest scaled down and pushed toward the edge behind it, only their shoulders showing.

  Every card is now anchored to the same edge and its depth is entirely in its transform:
  `translateY: 10` toward the edge and `scale: 0.97` per step, their values, read off their
  `toast.animation.ts`. A pile of eight costs the height of one. The ladder does not clamp —
  their interpolation clamps the front side only, so the fourth card is genuinely further
  back than the third rather than sitting on it and reading as one.

  `limit` becomes `maxVisible`, and it no longer discards. A card past it is transparent,
  keeps its timer and its place, and is promoted into view when the one in front leaves — so
  a burst of six shows all six instead of losing three.

- 7557e46: The front toast can be thrown away with a swipe, like HeroUI's.

  Away from its edge — up on a top stack, down on a bottom one — past 50 points or 500 points
  a second, their thresholds, either alone being enough. Dragged the wrong way it resists
  rather than refuses: the whole screen's travel maps onto 40 points. The throw carries on at
  the speed the finger left it and the record goes a moment later, so a hard flick leaves
  faster than a soft one.

  Only the front card. The ones behind show a seven-point shoulder, which is a target under
  any reasonable minimum, and dragging the second card out from under the first reads as a
  glitch rather than as a dismissal. `isSwipeable={false}` on the host turns it off.

  Note that this dismisses **one** card and the pile empties a swipe at a time — HeroUI's
  gesture calls `hide(id)`, not a clear-all, and their provider has no such thing.

  The gesture runs on `react-native-gesture-handler`, already an optional peer, reached only
  through `@xaui/native/toast`.

- f8dfa9d: `Toast` — Title · Description · Actions · Close, plus `ToastHost` and `useToast`

  **The card does not know it is in a queue**, when it will leave, or what is stacked under
  it. The host owns all three, and that split is the whole design: `render` returns anything
  at all and the queue never looks at it, so `Toast` is the card this library ships rather
  than the card the host requires.

  `Toast.Close` still knows which toast it belongs to without being told. The host provides
  the dismiss **around** each entry and the card folds it into the context its slots read, so
  a close button two levels down needs nothing passed to it.

  **The variant paints the title, and nothing else.** A red card sliding in from the edge of
  the screen reads as the app breaking; a red line of text reads as the thing you just did
  failing. The surface stays the theme's floating one whatever happened, which is also what
  lets two toasts of different kinds stack without the pile looking like a paint chart. It
  uses the soft foregrounds rather than the full colours, because a toast is read from the
  corner of the eye and `danger` at full strength is a shout where the soft one is a
  statement.

  **It slides from the edge it will sit against**, where every other overlay here scales in
  place. A dialog and a popover appear where they are, because they were asked for; a toast
  arrives, because something happened. Motion across the screen's edge is the difference.

  Past `limit` the **oldest** goes: the newest is the one that just happened, and the reader
  is looking for it.

  `useToast` outside a `ToastHost` warns and does nothing rather than throwing. A missing host
  is a setup mistake in the app shell, and a screen that crashes on its way to reporting that
  a save succeeded has turned a good outcome into a bad one.

  It closes P5.18 as well as P5.18b: `Snackbar` and `Toast` are the same object under two
  names, and HeroUI calls it `toast`.

## 0.9.1-alpha.44

### Patch Changes

- 750a85a: `Dialog.Close` draws a cross when it is empty, like HeroUI's.

  It was a bare pressable that rendered whatever it was given and nothing when it was given
  nothing, so `<Dialog.Close />` — the first line of HeroUI's own anatomy — put an invisible
  32 points in the corner. It now reads `system/close-button`, which draws the cross from two
  rotated bars, and the dialog's recipe resolves the box and the bar the way `Chip.Close`
  already did.

  The measurements are theirs, read off their CSS rather than guessed: a 32-point disc
  (`height: calc(var(--spacing) * 8)`, `aspect-ratio: 1`), filled with `default` because
  their `CloseButton` is a `tertiary` button, and a `muted` cross inside it.

  `asChild` is unchanged in behaviour and better in two details: the 32-point box is not
  forced onto the element you hand it, and the missing-label warning no longer fires on
  `<Dialog.Close asChild><Button>Compris</Button></Dialog.Close>`, where the label is the
  button's own text. That second fix is in `CloseButton` and reaches every consumer.

  Also exports `SliderValue`, which `SliderProps.value` and `onValueChange` both name and
  which no consumer could import.

- 797ea98: `Dialog` — Trigger · Overlay · Content · Title · Description · Close

  The `Popover` without an anchor. Same portal, same context re-provision, same overlay
  keyframes; none of the measuring pass, the host origin or the collision flip, because a
  centred box has nothing to be measured against.

  Two things it adds.

  **The backdrop dims**, where the `Popover`'s paints nothing until a `backgroundColor` says
  so. A popover is an aside you read the page around; a dialog is a question, and the page
  behind it is not available until it is answered. `isDismissable={false}` is for one that
  must be answered rather than escaped.

  **It grows from its own centre**, 200 ms from `scale: 0.94`. A popover's entrance is offset
  towards the thing that opened it so the motion points back at it; a dialog belongs to the
  screen rather than to a control, so the absence of a direction is the message.

  The content is two layers, and the outer one is not decoration: a centred box cannot also
  be the thing that centres it. The outer layer fills the portal and does the centring, the
  panel is the box, and the outer one takes no touches — so a press that misses the panel
  reaches the overlay under it and closes the dialog.

  No `variant`: the question a dialog asks is in its words, not in its fill.

  It also unblocks the `presentation` prop that `Select.Content` and `Menu.Content` are
  written around but cannot offer — HeroUI has both, and `dialog` was half of what was
  missing.

## 0.9.1-alpha.43

### Patch Changes

- ef43606: `BottomSheet` — Trigger · Overlay · Content · Handle · Title · Description · Close

  **Built on this library's own peers rather than on `@gorhom/bottom-sheet`**, which is what
  HeroUI wraps. A sheet that slides, springs and dismisses is a pan gesture and a shared
  value; taking a dependency for that would put a second animation library in every app that
  installs one component. What it costs is their snap points and their scroll integration —
  both worth having, and both worth their own change rather than a dependency.

  **It measures its own height, then slides that far.** A sheet is as tall as what is in it
  and nothing else on the screen knows that number, so the first layout is what tells the
  animation how far "down" is. Until it has one the sheet waits off-screen at a pessimistic
  distance rather than flashing at its resting place for a frame.

  **Far enough or fast enough.** Past `dismissThreshold` of its own height it closes; so does
  a flick over 900 points a second, whatever the distance. Without the second, a quick flick
  from the top of a tall sheet is refused however clearly it meant to throw the thing away.
  The drag is downward only: a sheet dragged up is already against the top of its own content,
  and letting it stretch there is a rubber-band nobody asked for.

  **Two separate refusals.** `isSwipeable={false}` on the content and `isDismissable={false}`
  on the overlay, because a sheet that can be tapped away but not dragged is a real design and
  so is the reverse.

  **`BottomSheet.Handle` is written by the caller.** It is the only thing telling a reader the
  sheet can be dragged — the gesture has no other affordance — so a sheet with the drag turned
  off should not be advertising it.

  `radius` moves the **top** corners only, which is why this component does not use
  `radiusAxis`: that helper writes `borderRadius`, and a sheet's lower corners are off the
  screen. Rounding them would put two arcs against a straight edge nobody can see.

  It completes what the `Dialog` started: `Select.Content` and `Menu.Content` are written
  around a `presentation` prop that needed both.

## 0.9.1-alpha.42

### Patch Changes

- 747aef8: `Slider` — Output · Track · Fill · Thumb

  **Two callbacks, and the difference matters.** `onValueChange` fires on every step the thumb
  crosses, mid-drag included, and is what a live preview reads. `onValueCommit` fires once,
  when the finger lifts — it is where a network call belongs, because the first can fire
  fifty times in a second. The legacy component had one of each under different names and
  nothing saying which was which.

  **The snap counts steps from the minimum**, not from zero. A range from 5 in steps of 10
  stops at 5, 15, 25; rounding the value itself would give 10, 20, 30 and move every stop.
  The rounding precision reads the **minimum** as well as the step, which is what the tests
  caught: a range from `0.05` in steps of `0.1` has two decimals of precision, and rounding
  to the step's alone turned its first stop into `0.1`.

  **The travel is inset by half a thumb at each end**, and the fill runs to the thumb's centre
  rather than to the raw proportion. Without both, the thumb hangs over the track's ends at
  the extremes and the fill runs out from under it.

  **A press anywhere on the track moves the thumb there** — the half of a slider people
  forget, because dragging a narrow thumb is a fine gesture on a mouse and a poor one on a
  finger.

  The thumb grows 15% under the press rather than moving: the finger is already covering it,
  so the scale is what you see in the gap around it, and it is the only confirmation a slider
  can give that the drag has started.

  `react-native-gesture-handler` is an optional peer of this package and this is the first
  component to need it. It is imported in `slider-thumb.tsx` and nowhere else, so only an app
  that reaches for `@xaui/native/slider` pays for it.

  No `variant` and no `xs`: a slider reports a quantity rather than an intent, and a rail
  four points thick is a line rather than a control.

  ### A rail with a knob on it, not a capsule with a core

  The legacy proportions rather than HeroUI's: 6 to 10 points of rail under a 16 to 24 point
  disc. The knob overhangs the rail by half their difference on each side, and the rail
  reserves that overhang as a margin — without it the knob spills into whatever sits above
  and below, and the layout has no idea the control is thicker than its rail.

  The three pairs are off the spacing grid on purpose. A rail is not a gap between two
  things, and rounding 6 to `spacing(1.5)` would put the sizes on a scale with no bearing on
  how thin a line can be and still be pressable.

  The geometry is a **compound** of `size` and `orientation` rather than two axes. The two
  cannot be written apart — which side of the rail is its thickness, which is its length, how
  far to pull the knob back — and an `orientation` axis setting `height: undefined` to undo a
  `size` axis's height is how this first shipped: declaration order is application order, the
  second axis won, and the rail had no thickness at all.

  ### Three steps of one colour

  The rail is the theme's neutral, the reach is the colour at thirty-five percent, the knob
  is the colour at full. The eye lands on the knob, which is the value, rather than on the
  bar behind it, which is only how far the value has come.

  Material's slider is the same relationship with the steps assigned differently: their
  inactive track is the soft one and their active track is full. Moving the soft step onto
  the _reach_ is where this stops being theirs — a filled bar at full strength competes with
  the handle for the eye, and the handle is the part you can move.

  The thirty-five percent is **derived from the resolved role** in the recipe rather than
  named in the theme. The soft family is a pair, fifteen and twenty, sized for a chip or a
  soft button; a bar three hundred points long needs more than either. Adding a third step
  would move every `*-soft` family in the library for one component's sake. Taking it off the
  role also means a raw `color` flows through untouched, and the reach and the knob can never
  drift apart because they come from the same place.

  Disabled drops the colour entirely rather than dimming it: a pale wash reads as an enabled
  slider seen through fog, a neutral one reads as switched off.

  ### Ranges and vertical rails

  `value={[20, 60]}` is two thumbs and a fill **between** them, and it reports a pair back —
  the shape the caller wrote is the shape they get. One `<Slider.Thumb index>` per end,
  written rather than conjured by the rail.

  **The thumbs cannot cross.** Each is bounded by its neighbour rather than by the range, so
  dragging the lower past the upper stops it dead instead of swapping the two: a swap loses
  the finger's grip mid-drag, and it ends up pushing the thumb it did not pick up. A press on
  the rail moves the **nearest** thumb, because moving the first every time would send half a
  range's presses over the other end.

  `orientation="vertical"` counts **from the bottom**. A rail whose fill grew downwards would
  report a larger value the lower the knob sat, which is the opposite of what a vertical
  control means everywhere it appears — it reaches the gesture, the press and the fill's
  anchor, three places that each had to be inverted.

  Ten more tests on `withThumbAt` and `nearestThumb`, including the non-crossing in both
  directions and the tie that always goes to the lower thumb.

## 0.9.1-alpha.41

### Patch Changes

- 277a713: `Tabs` — List · Trigger · Label · Indicator · Content

  **The indicator is one node sliding**, not a border on each tab appearing and disappearing.
  The triggers publish their rectangles on layout, the root keeps them, and the indicator
  springs between them on the UI thread — so it keeps travelling while whatever the new tab
  shows is mounting.

  Softer than the chevron's spring: damping 20 against stiffness 220 at mass 0.6. That one
  turns 180 degrees and must not overshoot; this one slides a few dozen points, and a touch
  of overshoot is what makes it feel attached to the press. Its **first** placement jumps
  rather than springing — animating it would slide the pill in from the start of the row on
  mount, which reads as the tab bar arranging itself rather than as a control at rest.

  `Tabs.Indicator` is written by the caller, inside the list. Leaving it out is a legitimate
  bar, where the label's colour is the only thing saying which tab is chosen, and that is why
  it is a slot rather than something the list conjures.

  **Three shapes, not three emphases.** `primary` is the segmented control — a pill inside a
  filled track; `secondary` is the underline; `light` is neither, with no track and no rule
  and nothing but the chosen tab's label going to the accent. Different affordances rather
  than the same one louder, which is why the union is three rather than the usual four. All
  three read the same roles, so a tint lands on any of them through the same names — painting
  a pill, a rule or a word.

  `light` names no `bg` and no `bgSelected`, and that is how it has no track and no rule
  rather than an omission: `paint` resolves both to nothing, so the list stays transparent and
  the indicator, with no fill and no compound to give it a size, draws nothing even when a
  caller leaves `<Tabs.Indicator />` in place. Its chosen label goes to the **accent** rather
  than the foreground, because with nothing else moving the colour is the whole signal, and a
  tab merely darker than its neighbours is not chosen — it is just darker.

  **A tab is named, not numbered.** The legacy component took an `activeIndex`, which breaks
  the moment a tab is inserted.

  **A panel is mounted only while its tab is chosen.** A tab bar over four screens of content
  should not have four screens of content mounted; a panel that must keep its state across a
  switch is one the caller holds the state for, which is the same trade every router makes.

  No `xs`: a tab is a target before it is a label, and at that height there is nothing left
  of it.

  A scrollable list and `Tabs.Separator` are not here. Centring the chosen tab when the bar
  overflows means the indicator has to account for a scroll offset the triggers' own layout
  does not report, which is worth its own change.

## 0.9.1-alpha.40

### Patch Changes

- 78813c4: `Menu` — Trigger · Overlay · Content · Label · Group · Item · ItemTitle · ItemDescription ·
  ItemIndicator

  A list of actions anchored to whatever opened it, and the **third** component to read the
  anchored positioning extracted for the `Popover` — `utils/placement.ts`,
  `hooks/use-anchor-ref.ts`, `hooks/use-anchored-position.ts`, `system/anchored/`. Nothing
  about the measuring pass, the host origin or the collision flip is written again here,
  which is the whole return on that extraction.

  **The intent belongs to the row, not to the menu.** A menu is the theme's floating surface
  like a popover, with no emphasis of its own — but one row in it can be the destructive one,
  and a list where "Supprimer" reads like "Renommer" is the list that gets misread. `danger`
  paints the title and any icon in it and nothing else: a red row would read as an alert.
  The description stays muted whatever the intent, because a danger row says what it does in
  red once and a red sentence under it says it twice.

  Both faces of a row are resolved once on the root, so a menu of forty actions costs what a
  menu of two costs and no slot ever touches the recipe (R5).

  **Choosing a row closes the menu after the caller's `onPress` has run**, in that order: a
  handler that reads the menu's state has to run while there is still a menu.
  `closesOnPress={false}` is for the row that toggles something the reader will want to
  toggle again.

  `offset` defaults to 6 where the `Popover`'s is 9 — a menu belongs to the control it drops
  out of, and a popover belongs to nothing.

  **`Menu.Separator`**, and you place it. A menu of four related actions wants none; a menu
  whose last row is "Supprimer" wants exactly one, above it. Drawing them between every pair
  and asking for the exceptions is the wrong way round — a menu is short enough that the one
  place a break belongs is obvious to whoever wrote it and invisible to the component.

  It runs the panel's full inner width rather than lining up with the rows' text, because a
  rule inset to the titles reads as belonging to the row under it and this one belongs to
  neither. Hidden from screen readers: announcing "separator" between every pair of actions
  is noise in the one place a menu has to be brisk. It is the menu's own trim rather than a
  `Divider`, resolved on the root with everything else the panel reads.

  ### `flex: 1` cannot be written inside a panel that measures itself

  `Menu.ItemTitle` had it, and the whole menu rendered as a seventy-point capsule with no
  text in it.

  `flex: 1` is `flexBasis: 0`. The measuring pass asks the panel how wide it wants to be, so
  there is no definite width for a zero basis to grow into: the row's content size is nothing,
  the title collapses, and the panel holds that width. HeroUI writes `flex: 1` on the same
  node and gets away with it because their measuring pass hands the panel a definite width —
  ours asks a question a zero basis cannot answer.

  `flexGrow: 1, flexShrink: 1, flexBasis: 'auto'` fills the row exactly the same once the
  width is known, and starts from the content rather than from zero. `useAnchoredPosition`
  now says so where anyone writing the next anchored panel will read it.

  `Menu.Content` also takes a measure of its own, fifteen ems against the `Popover`'s
  thirteen: a menu row is a title with an indicator beside it and sometimes a sentence under
  it, where a popover is prose alone.

  `SubMenu` is not here. HeroUI ships it as its own component and it needs a second anchored
  panel whose trigger is a row of the first, which is worth its own change.

## 0.9.1-alpha.39

### Patch Changes

- 4eda62d: `Popover` — Trigger · Overlay · Content · Title · Description · Close

  A panel anchored to whatever opened it, and the component the `Select` was written before.

  **Four sides, where the `Select` has two.** A select's list is as wide as the field it
  drops out of, and one hanging off the side of that field reads as a menu; a popover belongs
  to nothing, so `placement` takes `start` and `end` as well. `width` defaults to
  `content-fit` rather than `trigger` for the same reason — matching the width of a word or
  an icon would give the panel no room at all.

  **No `variant`.** A popover is the theme's floating surface: no emphasis to report, no
  intent to carry, so a variant would name a decision nobody makes.

  ### Four things move out of the `Select` and become shared

  §2 bis, at the second use rather than by anticipation:

  | moved                             | to                               |
  | --------------------------------- | -------------------------------- |
  | the placement arithmetic          | `utils/placement.ts`             |
  | the trigger's measurement         | `hooks/use-anchor-ref.ts`        |
  | the measuring pass and the origin | `hooks/use-anchored-position.ts` |
  | the entrance and exit keyframes   | `system/anchored/`               |

  The arithmetic gained the two horizontal sides on the way, which is a real generalisation
  rather than a rename: on a vertical side the room bounds the panel's **height**, on a
  horizontal one it bounds its **width** and the height is bounded by the screen instead. A
  panel beside its trigger can be as tall as the window allows. Seven more tests cover it, on
  top of the twelve the vertical sides already had.

  Two of the four exist because of bugs rather than tidiness, and both would have been
  rewritten wrong in `Menu`, `SubMenu` and `Tooltip`. The trigger measures again on every
  open, because `onLayout` never fires on scroll and a trigger inside a `ScrollView`
  otherwise reports where it used to be. And the position is computed in the **host's**
  coordinates rather than the window's, because the trigger reports itself against the window
  while the panel is laid out inside the `PortalHost`.

  The `Select`'s chevron spring moves to `system/anchored` too, where the `Accordion` already
  reads it.

  ### One bug the `Select` was hiding

  The measuring pass laid the panel out at the **anchor's** width. That is right for
  `width: 'trigger'` — the content then wraps during the measurement exactly as it will
  afterwards, so the measured height is the real one — and it is exactly wrong for
  `content-fit`, which is the question "how wide does this want to be" asked while imposing
  an answer.

  Against a small trigger it measured a paragraph as a column one character wide, and held
  the panel at that width forever. The `Select` never showed it, because its default width is
  the trigger's anyway.

  `content-fit` now measures unconstrained, bounded by two things in this order: the
  component's own **measure**, and the screen.

  The measure is what stops "as wide as its content wants" from meaning the width of the
  screen — a paragraph always wants more, so a panel bounded only by the edges is a
  full-width panel the moment it holds a sentence, and a popover is an aside rather than a
  sheet. Thirteen ems of the body size, about twenty-six characters a line — narrow on
  purpose. A popover is read at a glance, and a glance is two or three short lines rather
  than a paragraph; past that it stops being an aside and starts being a sheet with a tail.
  It is where HeroUI's own panels land too, measured off their placement demos. A multiple of
  the type rather than a number of points, so a theme that scales its type scales the panel
  with it.

  ### Both axes are clamped, not only the cross one

  The side decides where the panel wants to go; the insets decide where it is allowed to be.
  The main axis was in the first half and not the second, so a panel beside a trigger with no
  room for it went off the screen entirely — `start` and `end` were unusable and nothing said
  so until one was opened.

  The panel may now overlap its own trigger. That is the right trade, and the one HeroUI's
  `useRelativePosition` makes too: a panel covering the button that opened it is legible, and
  a panel past the edge of the screen is not.

  `width` gains `'full'` for the case the measure exists to refuse — the screen less its
  insets, said out loud. Nothing else in the union can say it: a number is a guess at the
  screen's width, and `content-fit` declines by design.

## 0.9.1-alpha.38

### Patch Changes

- 7e04096: `Accordion` — Item · Trigger · Indicator · Content

  P5.11, over the legacy `ExpansionPanel`. HeroUI Native calls it `accordion` and so does
  this, which is also what the roadmap row now says.

  **The height is never measured.** The panel is mounted or it is not, and Reanimated's
  layout transition animates the row between the two — `LinearTransition.springify()` on
  HeroUI's numbers, damping 140 against stiffness **1600**. Stiffer than the chevron's 1000
  deliberately: a height is a longer distance than a rotation, and at the chevron's
  stiffness the same damping makes a long panel take almost half a second to settle.

  Measuring it would mean a hidden pass on every open, and a panel whose content grows
  afterwards — an image loading, a list filling — would be stuck at the height it had when
  it was measured. The container carries the same transition, because without it the
  accordion's own height jumps to its new total in one frame while the rows inside it are
  still animating.

  **The variant table is the `Card`'s, token for token.** An accordion in `default` _is_ a
  card with rows in it, and two containers that look alike but are declared apart drift —
  the drift showing up as an accordion sitting on a card with a fill one step off it.
  `ghost` is the default and is HeroUI's own: rows separated by hairlines, on whatever page
  they sit on.

  **The separators are the root's, drawn between its children.** A row that drew its own
  would draw one under the last item too, and every accordion would start by hiding it.
  They come off `Children.toArray`, which drops nulls, so a conditionally rendered row
  cannot leave a hairline hanging where nothing is.

  **The open state moves to the root.** Legacy asked each item whether it was open, which is
  what made "only one at a time" the caller's problem. One value on the container is what
  `selectionMode` needs to mean anything. The whole rule is a pure function with thirteen
  tests, including the two cases where it returns the value unchanged — a press refused
  under `isCollapsible={false}` must not fire `onValueChange` for a change that did not
  happen.

  `ChevronDownIcon` moves from the `Select`'s folder to `system/icon` and is exported from
  `@xaui/native/system`. Two components draw it now, which is §2 bis exactly: promotion at
  the second use, never by anticipation.

- 7abe5b5: The build cleans `dist/` before writing it

  `clean: false` had been set since the legacy era, with nothing saying why, and against
  `splitting: true` it is a bug waiting for the entry list to change.

  Split output names its shared chunks by content hash. A build whose entries changed writes
  new chunk names and leaves the old ones behind, so `dist/` becomes a mix of two builds: an
  entry from the first still importing `chunk-ZF6KIHXH.js`, which the second replaced with a
  different hash and never wrote.

  Metro's report of that is `Unable to resolve "@xaui/native/accordion"` — it names the
  component and says nothing about chunks, which sends you looking at the export map, the
  subpath and the workspace link, all three of which are fine.

  It bites hardest across branches, because turbo restores a cached `dist/**` **over**
  whatever is already there rather than in place of it. Switching from a branch that has a
  component to one that does not, or back, is enough.

## 0.9.1-alpha.37

### Patch Changes

- c378a99: The `overlay` shadow gets lighter

  It was a 24-point blur eight points down, at 16 of Android's elevation. Android draws
  elevation on its own curve and draws it strongly, so a panel that read as lifted on iOS
  read as detached on Android — a dark halo about as wide as the gap between the panel and
  the field it came out of.

  Half the elevation, two thirds of the blur, half the offset: still "above the page",
  without the panel looking cut out of it.

  |           | before       | after         |
  | --------- | ------------ | ------------- |
  | offset    | `0, 8`       | `0, 4`        |
  | blur      | `24`         | `16`          |
  | elevation | `16`         | `8`           |
  | opacity   | `.14` / `.6` | `.10` / `.45` |

  It is the token rather than the component because a recipe names tokens and computes
  nothing — and because `Dialog`, `BottomSheet`, `Popover` and `Menu` are all going to read
  this one. `Select` is its only consumer today, so nothing else moves yet.

- ade75b6: `Select` — Trigger · Value · Indicator · Overlay · Content · Label · Item

  A field that opens a list, and the first component in the library to use the `Portal`.
  Its trigger is the `TextField`'s twin — the same `field*` tokens, the same four levels,
  the same heights — so a select and a text input in one form read as one control rather
  than as two libraries meeting.

  The visual values and the motion are HeroUI Native's, not the legacy component's. The
  chevron turns 0 to −180° on their spring (damping 140, stiffness 1000, mass 4): heavily
  damped against a very high stiffness, so it arrives in a fifth of a second without
  overshooting, because an oscillating chevron reads as a bug rather than as motion. The
  panel grows out of the trigger at 200 ms from `scale: 0.95`, offset eight points towards
  it, and leaves in 150 ms — a dismissal as long as the opening feels like the control is
  arguing.

  **The root renders no node**, which is where this component departs from every other one.
  The trigger is the control, so `ref`, `style`, `testID`, the a11y props and R14's style
  props are all on `Select.Trigger`. A wrapper view would have existed only to receive props
  the field already takes.

  **`XAUIProvider` now mounts a `PortalHost`.** The provider README always said the host
  belonged there "later", and later is the first component that opens an overlay. It is not
  left to the app because forgetting it is silent: `Portal` renders nothing outside a host,
  so a select would open onto an empty screen with no error to read. `hasPortalHost={false}`
  turns it off for an app that needs the host under a gesture root or inside its own
  navigation container.

  The panel measures itself invisibly for one frame before it places itself. That frame is
  what `avoidCollisions` costs: without a measured height there is nothing to compare, and a
  list too tall for the room below would open downwards off the screen. The arithmetic is a
  pure function with a test — placement is the one part of this component that is maths
  rather than rendering.

  `size` is `sm`, `md` or `lg` — no `xs`. A trigger that small has to hold a value, a
  chevron and the gap between them, and at that height the value gets nothing. The
  `TextField` keeps its `xs` because a field only has to hold text.

  The panel's corner is `2xl`, not `3xl`. HeroUI's is their `--radius-3xl` on a base of 8,
  which is 24 points; our base is 12, so the same 24 is `2xl`. Reading their key rather than
  their number put a 36-point corner on it and made it read as a pill.

  Two narrowings against HeroUI, both deliberate. `placement` is `top` or `bottom` only: a
  list as wide as its own field hanging off the side of it reads as a menu, and `start` and
  `end` belong to `Popover`. And there is no `presentation` prop — the bottom-sheet and
  dialog presentations need `BottomSheet` and `Dialog`, which do not exist yet.

  `selectionMode` does not come across from the legacy component. A select that returns
  several values is a different control with a different affordance; calling both by one
  name is what made the legacy props list as long as it is.

## 0.9.1-alpha.36

### Patch Changes

- f38983f: `Input` becomes `TextField`, `InputGroup` becomes `FieldGroup`

  Breaking, and deliberately taken now: the package is on the alpha line, so this costs a
  changeset rather than a major. Seven planned components are described in terms of this
  field — `NumberInput`, `PhoneNumberInput`, `SearchInput`, `DateInput`, `BottomSheetInput` —
  and each one written before the rename would have been written against a name about to
  move.

  `Input` was never the right name here. The root is not the thing you type into: it is the
  column that holds a label, a field, a hint and an error, and keeps them in step. `TextField`
  says that, and it leaves `Field` free to mean the one node that is actually a `TextInput`.

  `TextInput` was the obvious candidate and is the one name to avoid. React Native exports
  `TextInput` and `TextInputProps`, both imported by the field, the group's field and the text
  area. A public `TextFieldProps` sitting beside React Native's `TextInputProps` is a name
  collision in every file that touches both, and a reader's coin flip in the ones that do not.

  `FieldGroup` rather than `TextFieldGroup` for the same reason the root dropped `Input`: the
  group decorates a field, and the field's own type is not its business.

  | before                          | after                                |
  | ------------------------------- | ------------------------------------ |
  | `@xaui/native/input`            | `@xaui/native/text-field`            |
  | `@xaui/native/input-group`      | `@xaui/native/field-group`           |
  | `Input`, `Input.Field`          | `TextField`, `TextField.Field`       |
  | `InputGroup`, `InputGroup.Icon` | `FieldGroup`, `FieldGroup.Icon`      |
  | `useInput`, `useInputGroup`     | `useTextField`, `useFieldGroup`      |
  | `InputProps`, `InputVariant`    | `TextFieldProps`, `TextFieldVariant` |
  | `inputRecipe`                   | `textFieldRecipe`                    |

  The slot names do not move. `TextField.Field` still stutters as `TextFieldField` internally,
  and that was the trade taken: renaming the slot would have changed every call site that the
  rename otherwise leaves alone.

  `InputOTP` keeps its name. It is not a text field with decoration, and nothing in it reads
  the field's context.

## 0.9.1-alpha.35

### Patch Changes

- 806fa8d: `Skeleton` drops its `variant`

  It shipped with two — the neutral fill and that fill at half — sold as the two backgrounds a
  placeholder is drawn on. Measured against every surface, in both modes, the second is
  **less** visible than the first everywhere:

  | surface                      | `default` | the old `secondary` |
  | ---------------------------- | --------- | ------------------- |
  | the page (light)             | **1.216** | 1.100               |
  | a `default` `Card` (light)   | **1.269** | 1.119               |
  | a `secondary` `Card` (light) | **1.075** | 1.036               |
  | the page (dark)              | **1.336** | 1.123               |
  | a `default` `Card` (dark)    | **1.189** | 1.090               |
  | a `secondary` `Card` (dark)  | **1.000** | **1.000**           |

  So it was never the answer to "this block reads as a hole" — the full fill is the _more_
  visible of the two on the very surface that claim named. And on a `secondary` `Card` in dark
  mode both resolve to that surface's own `#27272a` and vanish, which is precisely the case
  the pair existed to cover: `default` and `surfaceSecondary` are the same colour there.

  A skeleton has to contrast with whatever sits under it, and a fixed token cannot know what
  that is — two frozen values were never going to cover three surfaces times two modes. The
  block paints `default`, the neutral fill the rest of the library uses for a `secondary`
  `Button`, and `color` is the way past it: honest about being a raw value rather than a name
  that promises a system.

  The recipe keeps a single-entry `variantTokens` all the same, because `resolveTint` maps the
  roles a variant declares and that mapping is what lets `color` land on the block.

## 0.9.1-alpha.34

### Patch Changes

- 4df7f3a: feat(badge): the v1 `Badge` — a count, a dot, and the corner it hangs off

  The twelfth entry of the core, and **one node with no slots**, per the plan: whatever is
  inside a badge is one line of two or three characters, and a slot would be a name for a
  `Text` the component can just as well insert itself (R3).

  **It is not a small `Chip`.** A chip holds a word and hugs it; a badge holds a count and is
  round unless the count is too wide to be. That is the `minWidth` equal to the height — one
  digit is a circle, two are a capsule — and it is why the label stays at 12pt through three
  of the four sizes: a count that grows with its badge stops being a count. The heights sit
  below the `Chip`'s, 16/18/20/24 against 20/24/28/36.

  **`danger` is the default**, the only component in the library whose default is not the
  first name in its ladder. A badge is overwhelmingly the count of something that wants
  attention — unread, failed, overdue — and a red one is what `<Badge>3</Badge>` means.

  `isDot` is the bare circle, on its own diameter ladder (6, 8, 10, 12) rather than the
  height, because a 20pt circle beside a 16pt icon is not a dot. It reaches the recipe as a
  `dot` axis selected by the resolved size: an axis left unselected contributes nothing, which
  is exactly "this badge has a label" — where a `{ true, false }` axis would have needed a
  branch with nothing to say and a `size × isDot` compound would have been sixteen entries for
  four measurements.

  `placement` makes the parent whatever the badge decorates: absolutely positioned in that
  corner, pulled out by half its own height on each axis so its centre lands on the corner it
  marks. The offset is derived from `size`, which is why it is a prop and not four style keys
  at the call site — and the keys are `start` and `end` (R13), so a trailing-corner badge
  mirrors in RTL. The insets are computed **outside the style cache**, and have to be: in flow
  the node is `position: 'relative'`, where an inset is a nudge rather than a placement, so a
  cached `top: -10` would shift every badge that has no placement at all.

  `placementInsets` is the one pure function here, and it has the one test file.

## 0.9.1-alpha.33

### Patch Changes

- 9f3cde7: feat(avatar): the v1 `Avatar` — Image · Fallback · Initials, the fallback as a layer

  The eleventh entry of the core. **The fallback is not a state, it is the layer underneath.**
  `Avatar.Image` is absolutely positioned over `Avatar.Fallback`, and an `Image` with nothing
  decoded yet draws nothing — so the initials show while the photo loads and **stay if the URL
  is wrong**, with no load-state machine, no `onError` to remember, and nothing to get out of
  sync. HeroUI runs a status enum for this; a stacking order says the same thing and cannot
  disagree with itself. JSX order between the two slots is therefore free.

  `variant` is the `Chip`'s eleven names, meaning here what they mean there — an avatar is a
  token _about_ a person or a thing, which is the category the `Chip` established. The three
  status families are present because an avatar reports as often as it identifies: a red frame
  for the account that failed to sync, a green one for the person who is online. It is
  HeroUI's `variant × color` matrix said once.

  `size` sets both sides, because an avatar is a square before it is a circle — 32, 40, 48, 64,
  HeroUI's three steps plus the one our ladder adds below them. The glyph inside the fallback
  runs ahead of the initials at the top of the scale, because two letters fill a circle that
  one person-icon has to sit inside with air around it.

  `radius` defaults to `full`, where HeroUI fixes one large radius for all three sizes — which
  makes their small avatars round and their large ones squircles.

  **No default glyph.** XAUI publishes no icon set, so the mark is always the caller's. What
  `Avatar.Fallback` does instead is publish the frame's resolved size and colour to
  `IconContext`, so an `Icon` written inside it needs no props at all.

  The photo fades in over 200ms on `onLoad` — HeroUI's timing — driven by a shared value
  rather than a mount animation, because the node has to be mounted from the first render or
  it never fetches. `animation={false}` skips it and mounts no worklet.

## 0.9.1-alpha.32

### Patch Changes

- c66aca9: feat(skeleton): the v1 `Skeleton` — two fills, one pulse, sized by R14 alone

  The fourteenth entry of the core. **One node and no slots**: a placeholder is a rectangle,
  and there is nothing inside it to name. A paragraph of them is three of these in a `Column`
  — composition doing what a `lines={3}` prop would otherwise hard-code, including the last
  line being shorter, which is the only reason the block reads as a paragraph.

  **There is no `size`, and that is the design.** Only the caller knows the shape of the
  thing that is missing, so R14's `width` and `height` are the whole sizing API — full React
  Native names and values, `width="60%"` as readily as `width={140}`. A `size` token here
  would be a scale of rectangles nobody's content happens to be.

  `variant` narrows to the two backgrounds a placeholder is ever drawn on: `default`, the
  neutral fill, for a block on the page, and `secondary`, that fill at half, for a block on a
  surface that already carries one — where the full fill reads as a hole. **No status
  families and no `primary`**, because a skeleton reports nothing and a placeholder in the
  accent announces the brand where there is nothing yet to announce; **no `tertiary` and no
  `ghost`**, because a skeleton with a border and no fill is an empty box.

  HeroUI reaches the same grey from `muted` at 30% opacity. Naming the token instead is what
  lets a theme move the skeleton by moving `default`, rather than by discovering that a
  percentage of a text colour is where the placeholder grey came from.

  **No shimmer**, where HeroUI's default is one: a shimmer is a gradient sweeping across the
  block, a gradient needs `react-native-svg`, and that is an optional peer a component in the
  core cannot require. One animation, so `animation` is a boolean rather than a name to
  choose between — the block breathes between full opacity and a half, a second each way.

  **No `asChild`** (R12), and the reason is `children`: here it means the content the block
  stands in for, and `asChild` would need it to mean the element to merge the block's styles
  into. One `children` with two meanings, disambiguated by a second prop, is the kind of API
  this library exists not to ship.

  `isLoading={false}` renders `children` and nothing around them, which is what makes the
  component a gate rather than a shape you mount and unmount around your own content.

  The demo gains the two shapes a placeholder is actually written as: **a card** — the
  skeleton _inside_ a real `Card`, so the padding, the radius and the gaps are the card's and
  only what fills them changes on load — and **a list** of four rows, where the rhythm is the
  point and the line widths differ so the rows do not read as a loading bar. Both toggle back
  to their loaded content on a press, which is the only way to see that nothing shifts.

  The list sits on a `default` card rather than a `secondary` one, and that is worth knowing:
  in dark mode `default` and `surfaceSecondary` are the same `#27272a`, so a `default`
  skeleton on a `secondary` card is invisible — and the `secondary` skeleton, being that fill
  at half, is worse. The variant ladder has no answer on that surface.

## 0.9.1-alpha.31

### Patch Changes

- 7b0d12b: feat(divider): the v1 `Divider` — no variant, one `alignSelf` for both axes

  The thirteenth entry of the core. **One node and no slots**: a rule is a filled box one
  point thick, and there is nothing inside it. A divider with a word across it is a `Row`
  holding two of these and a `Typography` — the composition the library already has. A
  `Divider.Label` would put a layout inside a line.

  **No `variant`**, and this is the only component in the core without one. A variant is the
  design system's vocabulary (§1 bis) — a name that means the same thing everywhere it
  appears — and on a rule there is nothing for such a name to describe: no fill against a
  foreground, no border against a surface, no intent to report. It briefly had three, naming
  the three separator tokens, which is a shade of grey wearing a word. `size` says how heavy
  the rule is and `color` says what colour it is, in React Native's own values; between them
  there is nothing a third name would add. The theme still sets the default — the rule paints
  `separator`.

  **`alignSelf: 'stretch'` serves both orientations**, and that one line is the whole
  mechanism: in a `Column` the cross axis is horizontal so a stretched child is full width,
  in a `Row` it is vertical so the same word makes a vertical rule full height, and on the
  axis the thickness fixes it is ignored. So there is no `width` or `height` to keep in sync,
  and a horizontal divider written inside a `Row` collapses on purpose rather than guessing.

  That is also why the recipe has no `size × orientation` compounds: the `size` axis writes
  both keys blind and the `orientation` axis, declared second, releases the wrong one. Four
  lines and two, instead of eight.

  `asChild` is there as R12 requires, and it earns its place on this component: an
  `Animated.View` that collapses a section takes the thickness and the ink from the recipe and
  the height from a shared value.

  `size` is the thickness — `xs` is HeroUI's `thin`, one device pixel, and `lg` is their
  `thick`, six points. **It defaults to `xs`**, the one place in the library that does not
  default to `md`: a rule you notice is a rule that is too thick.

## 0.9.1-alpha.30

### Patch Changes

- f8cc8d6: feat(spinner): the v1 `Spinner` — seven inks, two rings, no SVG

  The fifteenth entry of the core, and the one `Button.Spinner` was named after. **Two rings
  and no slots**: the root is the track — the full circle, in the variant's ink at a fraction
  of its opacity — and its one child is the arc that turns over it, the same circle with a
  quarter missing. The two are one figure rather than two parts.

  **A variant here names an ink**, which is the narrowing of §1 bis this component argues for.
  On a `Chip`, `fg` means "the colour that reads _on_ this variant's surface", so `primary`
  resolves to `accentForeground` — white. A spinner has no surface, so `primary` is `accent`,
  `secondary` is the accent as it reads on the page, `default` is `foreground`, `tertiary` is
  `muted`, and the three status families are there for the wait whose outcome is already
  named: deleting is a `danger` wait. **No `ghost`**, because a spinner with no ink is not a
  spinner, and **no `-soft` slices**, because a soft slice is a fill softened.

  HeroUI fades a single arc from opaque to 55%, which needs an SVG `linearGradient` and
  therefore `react-native-svg` — an **optional peer**, which a component in the
  fifteen-component core cannot require. Two circles of one ink at two opacities read as the
  same figure, cost two views, and pull in nothing. The track is what does the work: a
  rotating three-quarter ring on its own reads as broken rather than as busy.

  `size` is the diameter and the only measurement a circle has — 16, 20, 24, 32, HeroUI's
  three steps plus the one our ladder adds between the first two. The stroke thickens once,
  at `lg`.

  The turn moves to `hooks/use-rotation.ts` on its second use, per §2 bis, and
  `Button.Spinner` stops carrying its own copy — with one duration for the library, because
  two spinners on one screen at two speeds is a bug and one number is the only way to be sure
  of it. That slot stays its own component rather than becoming `<Spinner size={…} color={…}
/>`: everything it draws was already resolved by the button's recipe, and handing those two
  numbers to vocabulary props would be R6 in reverse.

  The demo's screen list becomes data in the same change — a dozen adjacent hand-written
  buttons in one JSX block is what made it conflict on every component branch.

## 0.9.1-alpha.29

### Patch Changes

- 8e586e2: feat(switch): the v1 `Switch` — two shapes, one flip

  The tenth entry of the core, and the third of the toggles. The root is the row, so tapping
  the label flips the switch; R3 wraps a text child into the label and supplies the track and
  the knob.

  **`variant` is a geometry axis here**, which no other component does: `primary` rides the
  knob inside the track, `secondary` stands it over a thinner bar. They are the legacy
  component's `inside` and `overlap` — the same two shapes and the same measurements — under
  the library's own two names, so the v1 API keeps one vocabulary instead of a third pair of
  words for this component alone. Both are the accent when they are on, which is why the
  whole table lives in eight compounds and the colours in one `paint`.

  **No `isInvalid`.** A switch applies its change the moment it is flipped, so there is no
  later moment at which it can be wrong — a checkbox states an intention a form submits, and
  that is the one that can be. A setting that cannot be turned on is `isDisabled`.

  The track's colour is crossed rather than swapped and the knob slides on the same 175ms,
  from one constant neither slot owns, so a flip reads as one movement. Both are values on the
  context rather than styles — a worklet needs a number and a string, not a style to flatten
  every frame — and the travel is `width − knob − 2 × inset`, arithmetic the root does.

  `color` is the colour the switch turns on to; the track at rest keeps its neutral, because
  a switch that is off is off in every brand.

  The knob moves with `translateX` and the sign is flipped against `I18nManager.isRTL`: R13
  bans a directional inset, and a transform does not mirror on its own.

  Both animated hooks carry a `'worklet'` directive and a dependency array, which the rest of
  the package already required and these two were missing. Without them the demo's `/switch`
  screen threw outright on web — _"`useAnimatedStyle` was used without a dependency array or
  Babel plugin"_ — while lint, type-check and the test suite all stayed green, because none of
  them renders anything. `pressable-feedback.tsx` states the rule and the reason: the package
  ships as a built `dist`, our CJS output calls the hook as a namespace member that the Babel
  plugin does not recognise, and the directive is what `tooling/workletize/` keys off.

  The dependency arrays are load-bearing beyond the crash. `distance` and `colors` are plain
  values captured in the closure, not shared values, so without them a switch whose `size` or
  `color` changed would have kept animating to the old travel and the old ink.

  **No `xs`**, matching the `Checkbox` and the `Radio`. That track was 40 by 24 with an 18pt
  knob — and unlike those two, a switch has no row to press: the track _is_ the target. Below
  `sm` it stops being comfortably hittable, and shrinking the one control whose whole surface
  is the touch target buys width nobody asked for.

  **`radius` moves the knob with the track.** It reached only the track, so a `radius="sm"`
  switch squared off its bar and kept a circular knob inside it — a control rounded by halves.
  `radiusAxis` becomes variadic to say it, which is the second slot it has been asked for
  since the `Card`.

  The knob takes the same named corner rather than the track's less its padding. The nesting
  rule that would suggest otherwise reaches zero before the outer radius does — at `xs` a 3pt
  track would hold a sharp-cornered knob — and two matched corners read better than one
  correct one.

## 0.9.1-alpha.28

### Patch Changes

- b44037c: feat(radio): the v1 `Radio` — the `Checkbox` in a circle, with one rule changed

  The ninth entry of the core. Same anatomy, same three levels on the same `field*` tokens,
  same four boxes so a radio and a checkbox in one form line up — and **a press selects, it
  never clears**. A set of options has no "none of these" unless one of them says so, so
  `onSelectedChange` fires with `true` only, and pressing the chosen option fires nothing at
  all.

  There is **no group**: `RadioGroup` is a P5 component with a context of its own, not a prop
  this one is missing. A set is a `useState` and a `map` over `isSelected={value === option}`,
  inside a `View` with `accessibilityRole="radiogroup"` — three lines the group component will
  replace rather than undo. The legacy `RadioGroup` and its shared props are named in the
  migration table, so nobody discovers the gap at merge time.

  `SelectionFill` moves into `system/`: the fill that fades and grows in with the mark riding
  on it was the `Checkbox`'s, and this is its second use — §2 bis says extract there. The
  `Checkbox`'s indicator now renders it too, which is thirty lines it no longer owns.

  `Radio.IndicatorThumb` has no counterpart here: the dot is the indicator's default child,
  replaced by writing children, which is the same escape hatch with one component fewer.

  **No `xs`**, matching the `Checkbox`. That circle was 16 points across with a 7pt dot, and a
  target that small is read rather than aimed at — the touch target is the row anyway, so
  shrinking the circle buys nothing a caller can press. The two components pair in the same
  form, so they offer the same three sizes or a caller finds the difference the hard way.

## 0.9.1-alpha.27

### Patch Changes

- e1326cf: feat(checkbox): the v1 `Checkbox` — a box, a mark and the label that toggles it

  The eighth entry of the core. **The root is the row, not the box**: it is the pressable, so
  tapping the label ticks the checkbox — which is the whole reason `Checkbox.Label` is a slot
  here rather than a `Text` you put beside the component and wire up yourself. HeroUI needs a
  second component (`ControlField`) for that; the plan's slots for this one are Indicator ·
  Label, and this is why.

  R3 goes one step further than elsewhere: a stringifiable tree becomes the label **and the
  root supplies the indicator**, because a checkbox without a box is not a checkbox. Written
  with no children at all it is the box alone — the form a table row wants.

  **Selection is not a style axis.** The fill and the mark are two slots the indicator mounts
  only while it is ticked, painted from two new roles — `bgSelected` and `fgSelected`. That
  keeps the cache at one entry per token combination instead of two, and it is what makes
  `color` **the colour the box checks in**: the tint pass re-runs `paint` and the states,
  never the axes, so a fill written as an axis would have snapped back to the accent the
  moment the box was ticked. `Radio` and `Switch` need the same pair, which is why the roles
  are in the engine rather than in this recipe.

  Three of the `Input`'s four levels, on the same `field*` tokens — `ghost` is absent, because
  a box with no border and no fill is nothing at all — plus the four sizes, `radius`,
  `isInvalid` (which drops the resting fill and outranks the tint) and `isDisabled`.

  `isIndeterminate` is ours and not HeroUI's: the legacy checkbox had it, a "select all" is
  what it is for, and `accessibilityState.checked: 'mixed'` is something only the component
  can say. A press resolves it to selected rather than toggling into it.

  The check is **drawn**, not imported — two borders of an empty box, a quarter turn from
  where they look like a tick — so a checkbox works in a project that has installed no icon
  set. It is the `CloseButton`'s bargain. Children of `Checkbox.Indicator` replace it and ride
  the same 120ms fade.

  Two corrections after seeing it on a device.

  **The mark is lifted to where it looks centred.** The check is an "L" — a left border and a
  bottom border — rotated a quarter turn, and an L keeps its ink in one corner rather than in
  the middle of its box. Rotating about that box's centre therefore leaves the tick sitting
  low, and flexbox dutifully centres the box it no longer fills. Rotating by −45° maps a point
  to `(dy − dx)·√2/2`, and across the two strokes that spans `H` at the top and `H − t − W` at
  the bottom — an ink centre `(H − t)·√2/4` below the box centre, 1.06pt on a 24pt box. The
  recipe now lifts by exactly that.

  Both transforms moved into the recipe, and `checkbox.style.ts` is gone with them:
  `transform` is a whole value, so the recipe's shallow merge replaces it rather than
  blending, and a rotation in a sheet plus a translation in the recipe would have dropped one
  of the two. The lift is derived from `side` and `stroke`, so it holds at every size.

  **No `xs`.** That box was 16 points square with a 1.5pt stroke, and a tick drawn in a space
  that small stops reading as a tick. The touch target is the row rather than the box, so
  shrinking the box buys nothing a caller can press. `sm` is the compact size.

## 0.9.1-alpha.26

### Patch Changes

- 2f8a9bd: feat(input-group): `InputGroup` — a field with something beside it

  A glyph, a unit, a reveal toggle. `InputGroup` goes **inside** an `Input` and replaces
  nothing but the field: the column, the label, the hint, the error, the four variants, the
  `size`, the `radius`, the tint, the focus, `isInvalid` and `isDisabled` all stay the
  `Input`'s, and this root owns exactly one thing — how wide its two decorators turned out to
  be.

  **The box is still the `TextInput`.** `InputGroup.Prefix` and `InputGroup.Suffix` are taken
  out of flow and laid over the field, so no wrapper borrows the border, the fill, the radius
  and the shadow: there is one box in the library and this is not a second one to keep in step.
  The field clears them by their **measured** width instead — `paddingStart` and `paddingEnd`,
  logical edges (R13) — which is the same shape `TextArea` uses for `rows`: a raw value the
  slot turns into a style, outside the cache (R6). A width takes as many values as there are
  decorators and could never be a cache key.

  `isDecorative` does the two things that belong together: touches pass through to the field
  underneath, and the content leaves the accessibility tree. It is off by default, because a
  suffix is most often a control and one that swallowed its own taps would be a reveal toggle
  you cannot press. A disabled `Input` takes the touches from both decorators all the same.

  `InputGroup.Icon` is the slot `Button`, `Chip` and `Alert` already have, and the one HeroUI's
  component does not: a glyph one step above the field's type, in the theme's
  `fieldPlaceholder`, so a form does not carry a hard-coded `#888` on every field.

  The `Input`'s recipe gains three slots — `prefix`, `suffix` and `icon` — because the size
  that decides the decorator's inset and the glyph's scale is the field's, and a group with an
  axis of its own would be a second answer to a question the `Input` has already answered.

  Not one of the fifteen the 1.0 core is scoped to; recorded as P5.3.

## 0.9.1-alpha.25

### Patch Changes

- 0c5435f: The `field` radius aligns on HeroUI's — 21 points becomes 12

  `buildRadius` derived it as `base * 1.75`, which on the default base of 12 put a 48-tall
  field at 21 — 87% of its geometric maximum, so it read as a gélule rather than as a rounded
  box. HeroUI reaches 12 for the same control from the other side of the scale: their
  `--radius-field` is an alias of their `--radius-xl`, and their base is 8 where ours is 12.

  It coincides with `lg` at the default base and stays its own key, because that is what lets
  a theme round its fields without rounding its cards.

  Only `Input` reads it — and `TextArea` through it, since that component has no recipe of its
  own and renders an `InputRoot`. `InputOTP` deliberately does not: its box is very nearly
  square, where a wide field's corner is a shape nobody decided for it.

- 0c5435f: The `Input`'s column tightens by a point at every size

  `gap` was 4, 4, 6, 8 and is now 3, 3, 5, 7. A label, a field and a line of help are one
  thing the eye reads top to bottom, not three stacked blocks, and the whole spacing step let
  them drift far enough apart to read as a list.

  Quarter steps rather than a new scale: `spacing` takes a fraction, and the `Chip` already
  measures its dot and its cross that way. It stays a `gap` on the root and not a margin on
  any slot (R4) — which is what keeps the space above and below the field identical, and what
  stops an omitted `Input.Description` from leaving a hole behind it.

  `TextArea` inherits it, having no recipe of its own.

- 110dd81: feat(text-area): `TextArea` — a multiline field, over the `Input`

  Not "like" an `Input` — it **is** one. `TextArea` renders the `Input`'s root: the same
  recipe, the same resolved context, the same four variants, the same `size`, `radius`,
  `color`, `labelPlacement`, `isInvalid` and `isDisabled`. `TextArea.Label`, `.Description`
  and `.Error` are literally the `Input`'s slots, re-exported rather than wrapped.

  Only `TextArea.Field` differs, by three things: `multiline`, the text pinned to the top, and
  a height counted in lines. That is HeroUI's answer too — their `TextArea` is twenty lines
  rendering their `Input` with the same three defaults.

  `rows` (default `3`) and `maxRows` are **raw values** (R6), like `color`: they resolve
  outside the style cache from the line height the size chose, so `rows={7}` costs no cache
  entry. Past `maxRows` the field stops growing and scrolls; unset, it grows with the text and
  has nothing to scroll, which is why `scrollEnabled` follows `maxRows` rather than being a
  prop of its own.

  The `Input`'s recipe gains a `textArea` slot carrying only the delta — the line height, the
  vertical padding and `textAlignVertical` — layered over the field's own style, so the
  colours, the border and the radius are resolved once for both. The four inside-label
  compounds write to it as well, so `labelPlacement="inside"` composes.

  Not one of the fifteen the 1.0 core is scoped to; recorded as P5.

## 0.9.1-alpha.24

### Patch Changes

- 94b4850: feat(input-otp): `InputOTP` — a one-time code, one character to a box

  Not one of the fifteen the 1.0 core is scoped to, so it ships as a P5 component under
  `1.x`. Its API is the `Input`'s: the same four levels over the theme's `field*` family,
  the same `size`, `radius`, `color`, `isInvalid` and `isDisabled`.

  **One hidden `TextInput` holds the whole code**, and the boxes are a rendering of that one
  string. Six focusable boxes is the design every OTP component starts with and abandons —
  the caret has to be moved by hand, a backspace at the start of a box has to jump backwards,
  and a paste arrives in one box out of six. Here a keystroke, a backspace, a paste and an
  autofilled `one-time-code` all take the same path.

  Paste keeps only the code: a run of exactly `maxLength` digits with no digit on either side,
  so "Your code is 482913, it expires in 10 minutes" yields `482913` and not `Your c`.

  `InputOTP.Group` takes a render function — the one slot in the library that does, because
  the number of children here is `maxLength` rather than markup. `ref` is the imperative
  handle (`focus`, `blur`, `clear`) rather than the view, since those are the three things
  only the hidden input can do.

  Fifteen tests on the pure helpers — `buildSlots`, `extractPastedCode`, `isPaste`. The
  component itself is verified by its demo screen, as every other one is.

  Three corrections after seeing it on a device.

  **The box takes the `lg` radius, 12 points, not `field`.** A field is wide, so 21 on a
  48-tall one reads as a rounded rectangle; a code box is very nearly square — 44 by 48 at
  `md`, 36 by 40 at `sm` — where the geometric maximum is 22, so the same 21 is a pill in all
  but name and is clamped to one outright at the small end. Twelve is where HeroUI lands for
  the same box from the other direction: their `field` radius is their `xl`, and their scale's
  base is 8 where ours is 12.

  **No `ghost`.** The `Input` has one and this does not, because the shape of the component
  is different: an input is one wide field whose position the caret and the label already
  give away, so it survives having neither fill nor edge. A code is six boxes, and their only
  job before anything is typed is to say how many characters are expected and where they go —
  with no fill and no border there is nothing to count. It is the reason the `Checkbox` has no
  `ghost` either.

  **No `xs`.** The box's width is the control height less one spacing step, so `xs` was 28 by
  32 — a box that small still has to carry an 18pt character to stay legible, and 18 in 28
  leaves no room for the two-point active ring without the digit touching it. A code is also
  the one field a user reads back to themselves character by character, which is the worst
  place to save eight points. `sm` is the compact size; below it, use fewer boxes rather than
  smaller ones.

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
