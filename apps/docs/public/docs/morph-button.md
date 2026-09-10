# MorphButton

A button that changes shape: a pill at rest, a card once it is open.

## Import

```tsx
import { MorphButton } from '@xaui/native/morph-button'
```

## Usage

```tsx
<MorphButton alignSelf="flex-start">
  <MorphButton.Collapsed>
    <MorphButton.Label>Primary</MorphButton.Label>
  </MorphButton.Collapsed>

  <MorphButton.Expanded>
    <MorphButton.Title>Primary</MorphButton.Title>
    <MorphButton.Description>
      High-contrast inverted surface for floating buttons over app content.
    </MorphButton.Description>
  </MorphButton.Expanded>
</MorphButton>
```

## One box, two contents

The pressable **is** the shape that travels, and exactly one face is mounted at a time — so
the box takes its size from whichever that is, and Reanimated's layout transition animates
it between the two.

**Nothing is measured.** No hidden pass, no `maxHeight`, no `onLayout`: a card whose
sentence arrives from the network grows the box with it, instead of being stuck at the size
it had when it was measured. It is the `Accordion`'s panel, applied to the control's own box
rather than to a row under it.

That is also why the transition sits on the pressable rather than on a wrapper around it. A
transition on a wrapper animates the wrapper's frame while the pressable inside it is
already at its final size, so the content is drawn outside the shape for the length of the
spring. `PressableFeedback` carries a `layout` prop for exactly this.

The box clips (`overflow: 'hidden'`), which turns those same frames into the shape revealing
its content.

## One corner for both shapes

Half the collapsed height. At that height it is exactly a pill; on the taller card it is a
corner in proportion to the control's scale.

Two radius keys would have needed a compound of `size` and `radius` — a pill at `sm` is 20
points and a card rounded that much is a gélule — so the pair would have said what one
derived value says once. `radius` still overrides it.

## The measurements are on the faces, not on the box

`size` writes the collapsed height and side inset on `Collapsed`, and the card's four-sided
frame on `Expanded`. Since exactly one of them is mounted, the root takes its shape from
whichever that is — which is what removes the `size` × `isExpanded` compound this component
would otherwise need.

| `size` | collapsed height | pill inset | card frame | title | description |
| ------ | ---------------- | ---------- | ---------- | ----- | ----------- |
| `sm`   | 40               | 14         | 16         | 16    | 12          |
| `md`   | 48               | 16         | 20         | 18    | 14          |
| `lg`   | 56               | 20         | 24         | 20    | 16          |

`xs` is absent rather than forgotten: a card that opens out of a 32-point control has less
room than the padding it would need, and the shape it morphs into is a pill with two lines
crammed into it.

There is no `fullWidth` and no width anywhere in the recipe. Without an `alignSelf` the box
fills its column in **both** shapes, which is RN's own behaviour and the `Button`'s.

## No `childrenToString`

R3 auto-wraps a text child everywhere else in the library. This is the one component that
legitimately skips it: a bare string could belong to either face, and wrapping it into the
collapsed one would build a button that morphs into an empty card. The two faces are the
API, and a missing one warns in development.

## Driving it

`isExpanded` / `defaultExpanded` / `onExpandedChange`, controlled or not, as everywhere in
the library. Pressing it toggles the shape, and `onPress` still runs.

`useMorphButton().toggle` is what a control **inside** a face is written against, and it
costs no state:

```tsx
function Close() {
  const { toggle } = useMorphButton()

  return <Button onPress={toggle}>Replier</Button>
}
```

A caller who does not want the press to close the card holds the state itself and ignores
the change when it is open — which is why there is no `isPressable` prop.

## The spring

`animation={false}` puts it in the other shape with no travel at all: the box jumps and the
faces swap without a fade. An object retunes it — `{ stiffness, damping, mass }`, merged
over `MORPH_SPRING`.

The default is slightly under-damped (ζ ≈ 0.85), so the shape settles with a hint of
overshoot rather than stopping dead: a box that arrives exactly at its target reads as a
layout swap, and the small overrun is what makes it read as one object changing shape.

The faces fade over 140ms — shorter than the travel, because they are never both on screen
and this is the arriving one catching up rather than a crossfade.

They fade from the **second** shape onwards. Reanimated runs an `entering` animation on the
first mount as well, so without that every button on a screen would fade its collapsed face
in as the screen arrived — and on the web would render `visibility: hidden` until the worklet
started. `defaultExpanded` therefore opens onto the card with no entrance of its own.

## Appearance

The `Button`'s seven variants, unchanged, and the card's two text slots read the same
foreground as the pill's label — the description turned down by opacity rather than
recoloured, because the ground is a raw `color` as often as it is a token and there is no
contrast colour in the theme for a colour the caller invented.

The pressed colour is the variant's own `…Pressed` token rather than a
`PressableFeedback.Highlight`, exactly as on the `Button`: both would darken the control
twice.

## Accessibility

A `button` whose `accessibilityState.expanded` says which shape it is in. A caller's own
`accessibilityState` is merged over that rather than replacing it, so adding `selected`
cannot silently drop the `expanded` a screen reader depends on.

## See also

- **`Button`** — the same table, on a box that does not change shape.
- **`Accordion`** — the same mounted-or-not height animation, on a panel rather than a control.
- **`FlipCard`** — two faces and a turn between them, where this is two shapes and a travel.
