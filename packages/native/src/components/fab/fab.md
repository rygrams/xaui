# Fab

The one thing to do on a screen, floating over the thing it does it to.

## Import

```tsx
import { Fab } from '@xaui/native/fab'
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

## `Fab.Menu`

A FAB that opens the two or three things it could have been.

```tsx
<Fab.Menu>
  <Fab.Menu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
    <Fab.Icon as={PlusIcon} />
  </Fab.Menu.Trigger>
  <Fab.Menu.Overlay />
  <Fab.Menu.Content>
    <Fab.Menu.Item onPress={compose}>Nouveau message</Fab.Menu.Item>
    <Fab.Menu.Item onPress={label}>Nouveau libellé</Fab.Menu.Item>
    <Fab.Menu.Item onPress={folder}>Nouveau dossier</Fab.Menu.Item>
  </Fab.Menu.Content>
</Fab.Menu>
```

It is a compound of its own, attached to `Fab` rather than shipped as a second subpath —
the `Calendar.YearPicker`'s arrangement: its trigger renders a `Fab`, and a caller who has
the FAB has the menu.

**The root renders no node.** It holds the disclosure, the anchor and the styles the slots
read. `Fab.Menu.Trigger` is the FAB and keeps its own `ref`; `Fab.Menu.Overlay` and
`Fab.Menu.Content` portal out, so they add nothing where they are written. `isOpen`,
`defaultOpen` and `onOpenChange` are the root's, so a menu is controlled or not exactly as a
`Select` is.

`Fab.Menu.Trigger` takes everything a `Fab` takes **except `size`**, which is the root's
because the pills read it too — a menu whose actions were sized apart from the FAB they come
out of would read as two controls. `color` on the root paints the pills; `color` on the
trigger paints the FAB, and they are deliberately two props: a menu whose actions were the
same colour as the button they came out of would read as one shape that had grown.

A bare string child of `Fab.Menu.Item` is wrapped in a `Fab.Menu.Label` (R3). Write the
label by hand when there is a `Fab.Menu.Icon` beside it.

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

**`Fab.Menu.Overlay` dims**, where a `Menu`'s and a `Select`'s do not. Those drop out of a
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

## Accessibility

**A round FAB needs an `accessibilityLabel`.** A mark is not text and there is nothing beside
it to fall back on. An extended one has a label and does not.

`accessibilityState` carries `disabled` and `busy`, and `isLoading` sets the second.

## See also

- **`Button`** — the same seven intents, in a row of text.
- **`Menu`** — a list of actions dropping out of a control that is not a FAB.
- **`Portal`** — for a FAB that must escape a scroll container's clipping.
