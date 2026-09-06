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

Material's three, measured, and the legacy's: **40, 56 and 96** points square. `size` is the
side of the square, or an extended one's height — never its width.

| size | side | glyph |
| ---- | ---- | ----- |
| `sm` | 40   | 18    |
| `md` | 56   | 24    |
| `lg` | 96   | 36    |

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

## Accessibility

**A round FAB needs an `accessibilityLabel`.** A mark is not text and there is nothing beside
it to fall back on. An extended one has a label and does not.

`accessibilityState` carries `disabled` and `busy`, and `isLoading` sets the second.

## See also

- **`Button`** — the same seven intents, in a row of text.
- **`Portal`** — for a FAB that must escape a scroll container's clipping.
