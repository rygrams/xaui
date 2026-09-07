# FlipCard

A card with two faces, and a turn between them.

## Import

```tsx
import { FlipCard } from '@xaui/native/flip-card'
```

## Usage

```tsx
<FlipCard>
  <FlipCard.Front>
    <Card>
      <Card.Body>
        <Typography>Recto</Typography>
      </Card.Body>
    </Card>
  </FlipCard.Front>

  <FlipCard.Back>
    <Card variant="secondary">
      <Card.Body>
        <Typography>Verso</Typography>
      </Card.Body>
    </Card>
  </FlipCard.Back>
</FlipCard>
```

## It paints nothing, and it has no recipe

What turns is two faces the caller supplied, and each of those is usually a `Card` with its
own variant, its own radius and its own shadow. A recipe here would be a second table saying
the same things, and the day one of them gained a border the other would not have it.

There is no `variant`, no `color` and no `radius` on a `FlipCard`. There is a `Card` inside
it, and those are its.

## The front decides how big the card is

The back is **out of flow** and fills it. A back in the flow would stack under the front and
double the height.

Two faces of different heights therefore take the front's — which is the only answer that
does not make the card resize halfway through its own turn.

## The two faces are a half turn apart at every moment

That is the whole mechanism. The away-facing side is not drawn
(`backfaceVisibility: 'hidden'`), so exactly one face is on screen at any angle:

| progress | front | back  |
| -------- | ----- | ----- |
| 0        | 0°    | −180° |
| 0.5      | 90°   | −90°  |
| 1        | 180°  | 0°    |

`faceAngle` is that relationship and it is tested, including the case it exists to prevent: a
back on a spring of its own, or a back at `progress × 180` rather than `(progress − 1) × 180`,
shows **both faces at once** through the middle of the turn.

It also follows past its own ends rather than clamping, which is what makes the spring's small
overshoot visible — a card that stops dead at a hundred and eighty degrees reads as a texture
swap rather than as an object with a weight.

`rotation="reverse"` negates **both** faces, so they still follow each other. Negating one
would make them meet.

## Perspective

`{ perspective: 1000 }` comes first in the transform list, and it has to: a rotation applied
before it is an affine squash, and the card reads as a blind closing rather than as a face
turning away.

It is the card's rather than a prop, because two cards on one screen at two depths look like
a mistake.

## Direction

`horizontal` (the default) spins about the vertical axis — the two faces swap left for right,
which is what a playing card does. `vertical` turns it about the horizontal one, which reads
as the card tipping towards you.

## Driving it

`isFlipped` / `defaultFlipped` / `onFlipChange`, controlled or not, as everywhere in the
library.

`isPressable={false}` leaves it a display and the flip to a control of yours — a button on
one face, a gesture, a timer:

```tsx
function TurnBack() {
  const { flip } = useFlipCard()

  return <Button onPress={flip}>Revenir</Button>
}
```

`useFlipCard()` also carries `progress`, which is a **shared value**: an indicator that
follows the turn frame by frame is `useAnimatedStyle` over it, and it costs no re-render.

## Accessibility

Pressable, it is a `button` whose `accessibilityState.expanded` says which face is up. With
`isPressable={false}` it is an `image` — an element a screen reader announces as pressable and
which does nothing when pressed is worse than one it announces as a picture.

It carries **no press feedback of its own**: the turn is the feedback, and a card that also
dimmed under the finger would read as two things happening to it at once.

## See also

- **`Card`** — what usually goes on each face.
