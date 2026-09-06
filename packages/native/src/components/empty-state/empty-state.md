# EmptyState

What is on the screen when there is nothing on the screen.

## Import

```tsx
import { EmptyState } from '@xaui/native/empty-state'
```

## Usage

```tsx
<EmptyState>
  <EmptyState.Header>
    <EmptyState.Media variant="icon">
      <Icon as={InboxIcon} />
    </EmptyState.Media>
    <EmptyState.Title>Aucun message</EmptyState.Title>
    <EmptyState.Description>
      Ce qu’on vous envoie arrivera ici.
    </EmptyState.Description>
  </EmptyState.Header>

  <EmptyState.Content>
    <Button>Écrire un message</Button>
  </EmptyState.Content>
</EmptyState>
```

## The header and the content are two roots

The gap between a mark, a title and a sentence is a **different gap** from the one between
that block and the buttons under it, and R4 puts layout on a root — so two gaps need two
roots.

It is also what lets an empty state with nothing to do about it leave `EmptyState.Content`
out entirely, rather than render an empty row with a gap above it.

## Variants

| variant    | what it draws              |
| ---------- | -------------------------- |
| `plain`    | nothing                    |
| `surface`  | the `surface` fill         |
| `outlined` | a **dashed** edge, no fill |

**`plain` is the default**, and it is the right one more often than not: most empty states
fill a screen, and a screen already has a ground.

**`outlined` is the one that is not a fill.** A dashed edge round the space the content would
occupy says "this is a container, and it is empty"; a solid one would say "this is a panel".
It is what a drop target and an empty column want.

There is no `success`, no `warning` and no `danger`: an empty state reports nothing — it is
what is left when there is nothing to report.

## The media

`EmptyState.Media` takes `variant="icon"` to put its child in a circle of muted surface.

**That is not decoration.** A 24-point mark alone in the middle of a screen reads as an image
that failed to load; the circle gives it a size, and the fill says it is a mark rather than a
photograph.

`plain` is the default, because an avatar or an illustration brings its own shape and a
circle behind it would be a second one.

Either way it publishes the glyph's size and colour through `IconContext`, so an `Icon`
inside takes both without being told — and `useEmptyState().icon` is the same two values for
a glyph you draw yourself.

## The tint

`color` is a raw value (R7) and lands on the icon's circle, the mark on it, and the outline.

**Never on the words.** An empty state's text is the page's own ink, and tinting the sentence
would make the quietest thing on the screen the loudest.

The mark takes the tint's **contrast colour**, not the tint — `fgSelected` names a
`*Foreground` token, which is what tells `resolveTint` to answer with the readable colour on
the tint rather than with the tint itself. Without it a grey mark sits on a saturated circle.

## Size

`size` moves the media, the gaps and the type — **never a height**. An empty state is as tall
as what is in it; how tall the space it fills is, is the layout's business.

## Accessibility

`EmptyState.Title` is an `accessibilityRole="header"`, which is what a screen reader jumps
between — so a screen whose only content is an empty state is still navigable.

## See also

- **`Surface`** — the ground, when all you need is a fill.
- **`Skeleton`** — for content that is _coming_, rather than absent.
