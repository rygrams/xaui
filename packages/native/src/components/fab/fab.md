# Fab

The one thing to do on a screen, floating over the thing it does it to.

## Import

```tsx
import { Fab, FabDiscovery, FabMenu } from '@xaui/native/fab'
```

## Usage

```tsx
<Fab accessibilityLabel="Nouveau message" placement="bottom-end" onPress={compose}>
  <Fab.Icon as={PlusIcon} />
</Fab>

<Fab isExtended onPress={compose}>
  <Fab.Icon as={PlusIcon} />
  <Fab.Label>Nouveau</Fab.Label>
</Fab>
```

A bare string is a label (R3), so `<Fab isExtended>Composer</Fab>` works.

## It is not a `Button`, and it shares the `Button`'s table

The seven intents are the same seven — the thing a FAB floats over is as likely to be a
delete as a compose — so the variant table is copied token for token and a compose button
and a compose FAB are the same green.

The **recipe** is not shared, and that is deliberate. A button is a row of text with padding;
this is a fixed square that carries a shadow **at rest**, because floating over content is
what it does. One recipe would have meant a `size` axis meaning a height on one and a side on
the other, and a shadow in `base` that a button never wants.

## `isExtended` is a prop

Not "there is a `Fab.Label` in here". The root's recipe resolves **before** its children do:
the shape has to be known when the box is measured, and the box is measured before the label
inside it exists.

An extended FAB keeps the size's height and gives up its width, so a round one and an
extended one sit on the same line at the same height. It **hugs its content** rather than
filling its parent — that is where it parts company with a `Button`, whose stretching in a
column is RN's own behaviour and the right one. A full-width FAB is a button.

## Size

Three steps on the square's side: **40, 56 and 72** points. `size` is the
side of the square, or an extended one's height — never its width.

| size | side | glyph |
| ---- | ---- | ----- |
| `sm` | 40   | 18    |
| `md` | 56   | 24    |
| `lg` | 72   | 28    |

## `placement`

Unset it sits in the flow, which is what a FAB inside a card or a toolbar wants.

The three others pin it to the bottom of its nearest positioned ancestor — `bottom-start`,
`bottom-center`, `bottom-end`. **`start` and `end`, never left and right** (R13), so a
right-to-left layout moves it with no second branch. `offset` is how far in, in points, and
defaults to 16.

`bottom-center` is `alignSelf`, not `start: '50%'`: the latter would centre the box's _edge_
rather than the box.

## `isLoading`

Swaps the mark for a ring and stops the press. The label stays, so
`<Fab isExtended isLoading><Fab.Label>Envoi…</Fab.Label></Fab>` reads as one control changing
state rather than as a control being replaced.

The ring is the recipe's own — the `Button.Spinner`'s argument — so it follows the FAB's size
and its variant with nothing to pass. Composing `<Fab.Spinner />` yourself is how you put it
after the label instead of before it.

## `FabMenu`

A FAB that opens the two or three things it could have been.

```tsx
<FabMenu>
  <FabMenu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
    <Fab.Icon as={PlusIcon} />
  </FabMenu.Trigger>
  <FabMenu.Overlay />
  <FabMenu.Content>
    <FabMenu.Item onPress={compose}>Nouveau message</FabMenu.Item>
    <FabMenu.Item onPress={label}>Nouveau libellé</FabMenu.Item>
    <FabMenu.Item onPress={folder}>Nouveau dossier</FabMenu.Item>
  </FabMenu.Content>
</FabMenu>
```

It is a compound of its own, exported from the FAB entry point. Its trigger renders a `Fab`,
so the two primitives stay available from one import.

**The root renders no node.** It holds the disclosure, the anchor and the styles the slots
read. `FabMenu.Trigger` is the FAB and keeps its own `ref`; `FabMenu.Overlay` and
`FabMenu.Content` portal out, so they add nothing where they are written. `isOpen`,
`defaultOpen` and `onOpenChange` are the root's, so a menu is controlled or not exactly as a
`Select` is.

`FabMenu.Trigger` takes everything a `Fab` takes **except `size`**, which is the root's
because the pills read it too — a menu whose actions were sized apart from the FAB they come
out of would read as two controls. `color` on the root paints the pills; `color` on the
trigger paints the FAB, and they are deliberately two props: a menu whose actions were the
same colour as the button they came out of would read as one shape that had grown.

A bare string child of `FabMenu.Item` is wrapped in a `FabMenu.Label` (R3). Write the
label by hand when there is a `FabMenu.Icon` beside it.

### The FAB does not move when the menu opens

That is the whole reason this exists rather than the legacy `FabMenu`. That component
re-rendered its FAB **inside the portal**, at the portal's own bottom-end inset, so a FAB
sitting anywhere else jumped across the screen at the moment it was pressed.

Here the trigger is never re-parented. It measures itself with `useAnchorRef` — on layout
and again on every open, so a FAB inside a `ScrollView` reports where it actually is — and
the actions are positioned against that rectangle by `useAnchoredPosition`. That is the
`Select`'s and the `Menu`'s machinery, unchanged.

### It is not a `Menu`

A menu is one surface with rows inside it. These are separate pills with air between them,
and the difference is not decoration: a panel dropping out of a field is that field's list
of answers and belongs to its edge, while a FAB floats over the page — there is no edge for
its actions to belong to, so each one carries its own.

Three consequences:

- **The column has no surface.** No background, no border, no shadow; the pills are the
  surface — `theme.colors.overlay`, which is white in light mode and the theme's raised
  surface in dark. `content-fit` is the only width that makes sense on it, because a
  `trigger` width would crush three words into the FAB's diameter.
- **The pill wears the `surface` shadow, not the `overlay` one** a `Menu` panel wears.
  Three pills twelve points apart, each carrying a sixteen-point blur, pool into one grey
  smudge behind the lot of them.
- **The press feedback is the shared one.** A `Menu` row darkens because the scale treatment
  on a full-width strip reads as the panel twitching; a pill is a small floating button —
  the same object the FAB above it is — and `PressableFeedback`'s treatment is right on it.

**`FabMenu.Overlay` dims**, where a `Menu`'s and a `Select`'s do not. Those drop out of a
field and leave the page alone, because the page is still the context for the answer they
are asking for; a FAB floats over everything and its actions replace the screen's one thing
to do with three. That is a `Dialog`'s situation, and it takes the `Dialog`'s `backdrop`
token — which is also what puts the pills on a dimmed ground, where a white pill reads as
white. `backgroundColor="transparent"` on the slot takes the dimming back off, and omitting
the slot leaves no backdrop and nothing to press outside.

`top` and `end` are the defaults, because that is where a FAB is. `avoidCollisions` still
flips the column below the trigger for a FAB at the top of a screen.

### Accessibility

The trigger carries `accessibilityState.expanded`. The column carries
`accessibilityRole="menu"` — a `Menu`'s panel needs no role because its surface is the
container a screen reader stops at, and these pills have no surface between them, so without
it nothing says a set of actions has appeared. Each action is a `menuitem`.

`isDisabled` on the root stops the trigger and every action with it; on one action it stops
that one. Either way the pill dims once, never twice.

## `FabDiscovery`

The coach mark that says what a FAB is for.

```tsx
<FabDiscovery isOpen={tour} onOpenChange={setTour}>
  <FabDiscovery.Target
    placement="bottom-end"
    accessibilityLabel="Composer"
    onPress={compose}
  >
    <Fab.Icon as={PlusIcon} />
  </FabDiscovery.Target>
  <FabDiscovery.Overlay />
  <FabDiscovery.Content>
    <FabDiscovery.Title>Composez d’où vous voulez</FabDiscovery.Title>
    <FabDiscovery.Description>
      Ce bouton suit chaque écran de la boîte de réception.
    </FabDiscovery.Description>
    <FabDiscovery.Action>Compris</FabDiscovery.Action>
  </FabDiscovery.Content>
</FabDiscovery>
```

**It is opened by the app, not by the FAB.** A discovery is shown because this reader has
not seen the feature — a question only the app can answer — so `isOpen` is controlled far
more often than not, and pressing the target does what it always did. `FabDiscovery.Action`
takes the mark down after the caller's `onPress` has run; so does a press on the overlay.

`color` is a raw tint for the disc and everything on it. Unset it is the theme's `accent`,
which is what a coach mark means: the one thing on this screen worth pointing at. `scale`
sets the disc's diameter as a multiple of the window's width and `padding` how far the ring
stands off the target.

### The FAB does not move, and it stays the FAB

The legacy `FeatureDiscovery` took a `targetRef`, measured it, and drew a **copy** of
whatever the caller passed as `highlightContent` over the disc. A copy is a picture: it does
not press, and it is only correct for as long as somebody keeps it in step with the original.

`FabDiscovery.Target` **is** the `Fab`. While the mark is up it is lifted into the portal at
its own measured rectangle — the coordinates it already occupied — so it draws above the
disc, still presses, and never appears to move. The node left in the flow stays mounted and
invisible, because it is what holds the space the layout gave the FAB and what `onLayout`
measures; it is taken out of the accessibility tree while it is a placeholder, or a screen
reader would find the same button twice.

The layers are **numbered** rather than left to mount order. The target and the disc each
open a portal, and which one landed on top would otherwise depend on the order two slots
were written in — a FAB under its own disc, from moving one line. `zIndex` alone is not
enough on Android, which draws a native Z from `elevation` that a React `zIndex` does not
outrank, so the layer holding the FAB carries more of both.

### The text is laid out to the chord, not to the diameter

`discoveryGeometry` is a pure function — eleven tests — and this is the part worth reading.
The block of text is placed at a `y`, and how wide the disc is at that `y` is the chord of a
circle, `√(r² − dy²)`: a block near the disc's centre is nearly its full width, and one near
the top or bottom is a sliver. Laying the text out at the disc's width instead runs it past
the curve at both ends, which is the shape every first coach mark has.

Where that chord is too narrow to read a paragraph in, the block gives up on the disc and
sets from the screen's own edge — on the side the target is **not** on, so the words run away
from the thing they describe rather than under it.

**The block is pinned by the edge nearest the target**: by its top when it sits below one,
by its **bottom** when it sits above. That is what keeps the gap to the FAB fixed however
long the description runs — the legacy set a `top` at `targetY − 150`, so a coach mark that
gained a line grew down into the button it was pointing at. Only the block's _width_ still
needs a guess at its height, because the chord that bounds it is narrowest at the far end and
the far end is not known until the text has been laid out; that guess is one named constant,
and it errs wide.

## Accessibility

**A round FAB needs an `accessibilityLabel`.** A mark is not text and there is nothing beside
it to fall back on. An extended one has a label and does not.

`accessibilityState` carries `disabled` and `busy`, and `isLoading` sets the second.

## See also

- **`Button`** — the same seven intents, in a row of text.
- **`Menu`** — a list of actions dropping out of a control that is not a FAB.
- **`Dialog`** — for a question that has to be answered, rather than a feature explained.
- **`Portal`** — for a FAB that must escape a scroll container's clipping.
