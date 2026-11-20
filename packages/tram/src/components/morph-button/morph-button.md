# MorphButton

A button that changes shape: closed, it is the Tram `Button` exactly — a flat rectangle in
one accent colour; open, the same box grows to the width it is given and keeps its fill,
with a light title and a description inside it.

One face is mounted at a time and nothing is measured: a layout transition carries the box
between the two sizes on the `navigation` spring, and the new face rises and fades in just
after.

## Import

```tsx
import { MorphButton, useMorphButton } from '@xaui/tram/morph-button'
```

## Anatomy

```tsx
<MorphButton>
  <MorphButton.Collapsed>
    <MorphButton.Icon />
    <MorphButton.Label />
  </MorphButton.Collapsed>
  <MorphButton.Expanded>
    <MorphButton.Title />
    <MorphButton.Description />
  </MorphButton.Expanded>
</MorphButton>
```

- **`MorphButton`** — the root, the pressable box that travels. A press toggles the shape,
  and `onPress` still runs.
- **`MorphButton.Collapsed`** — the closed face, mounted while the button is closed.
- **`MorphButton.Expanded`** — the open face, mounted while it is open.
- **`MorphButton.Label`** — the closed face's text, the `Button`'s label.
- **`MorphButton.Title`** — the open face's title, Light.
- **`MorphButton.Description`** — the sentence under it, a step smaller, in the same ink.
- **`MorphButton.Icon`** — an icon in the variant's colour, at the size's scale.

A bare string is not wrapped for you: it could belong to either face.

## Usage

### Basic

```tsx
<MorphButton alignSelf="flex-start">
  <MorphButton.Collapsed>
    <MorphButton.Label>new theme</MorphButton.Label>
  </MorphButton.Collapsed>
  <MorphButton.Expanded>
    <MorphButton.Title>new theme</MorphButton.Title>
    <MorphButton.Description>
      Start from the current accent, then adjust it page by page.
    </MorphButton.Description>
  </MorphButton.Expanded>
</MorphButton>
```

Without an `alignSelf`, the box fills its column in both shapes.

### Controlled

```tsx
<MorphButton isExpanded={isOpen} onExpandedChange={setOpen}>
  {/* faces */}
</MorphButton>
```

`defaultExpanded` opens it on the card at first mount, with no entrance of its own.

### A control inside a face

```tsx
function Close() {
  const { toggle } = useMorphButton()

  return <Button onPress={toggle}>close</Button>
}
```

`useMorphButton().toggle` changes the shape and costs no state.

### Animation

`animation={false}` puts it in the other shape with no travel: the box jumps, the faces
swap without a fade, and the press does not tilt. An object — `{ stiffness, damping, mass }`
— retunes the spring the box travels on.

## Variants

The `Button`'s four drawings. Open, the box keeps the one it was drawn with.

| Variant     | Drawn as                         |
| ----------- | -------------------------------- |
| `contained` | filled with the true colour      |
| `flat`      | filled with its soft slice       |
| `outline`   | a line and a label in the colour |
| `text`      | the label alone                  |

## Sizes

```tsx
<MorphButton size="sm">…</MorphButton>
<MorphButton size="md">…</MorphButton>
<MorphButton size="lg">…</MorphButton>
```

`size` sets the closed height — 40, 48 or 56 — the insets, the gaps and the type of both
faces. Never the width. `radius` overrides the corner both shapes share, capped at the Tram 2.

## Colour

The colour is the theme's accent. `accent` picks another one of the twenty named Metro
accents; `color` takes a raw tint and wins when both are set. A destructive button is
`color={theme.colors.danger}`.

## Accessibility

- The root is a `button` whose `accessibilityState.expanded` says which shape it is in; your
  own `accessibilityState` is merged over it rather than replacing it.
- The press tilts the box and leaves its colours alone, felt as a `press`.
- With motion reduced the box jumps to its new size and the face takes a 150 ms fade.

## Differences from Native

- **`variant`** is the `Button`'s four drawings — `contained`, `flat`, `outline`, `text` —
  for Native's seven and its inverted surface.
- **Open**, the box keeps its fill; it never turns into a card surface.
- **`accent`** is added.
- **`radius`** stays under the Tram ceiling of 2, `full` included: no pill and no
  half-height corner.
- **`animation={false}`** also stops the tilt.
- **The press** tilts the box; Native darkens it with the variant's pressed colour.
