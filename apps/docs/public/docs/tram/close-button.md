# CloseButton

The way out of a page or a panel of the app, drawn as the round button of the Metro App
Bar with a cross in it — a thin circle in the page's ink, the cross built from two bars so
no icon set is needed.

It is drawn in the page's ink, not the accent: closing is not the action a screen puts
forward. `accent` or `color` paints it on demand.

## Import

```tsx
import { CloseButton } from '@xaui/tram/close-button'
```

## Anatomy

```tsx
<CloseButton />
```

- **`CloseButton`** — one node, no slots: the circle and the cross. `children` replace the
  cross — an `Icon` takes its size and ink without being told.

## Usage

### Basic

```tsx
<CloseButton accessibilityLabel="Close draft" onPress={close} />
```

### Another glyph

```tsx
<CloseButton accessibilityLabel="Back" onPress={back}>
  <Icon as={BackIcon} />
</CloseButton>
```

### In a panel's corner

```tsx
<CloseButton variant="text" size="sm" accessibilityLabel="Hide" onPress={hide} />
```

`Dialog.Close` and `Toast.Close` draw nothing: a message box and a toast are closed by
their buttons. This one is for what the app owns.

## Variants

| Variant     | Drawn as                                                  |
| ----------- | --------------------------------------------------------- |
| `outline`   | the App Bar's button: a thin circle and a cross (default) |
| `contained` | a flat disc, the cross cut out in the ground              |
| `text`      | the cross alone, for the corner of a panel                |

```tsx
<CloseButton variant="outline" accessibilityLabel="Close" />
<CloseButton variant="contained" accessibilityLabel="Close" />
<CloseButton variant="text" accessibilityLabel="Close" />
```

All three take the same room: `text` keeps the line, clear, so its cross sits where the
others' does.

## Sizes

```tsx
<CloseButton size="sm" accessibilityLabel="Close" />
<CloseButton size="md" accessibilityLabel="Close" />
<CloseButton size="lg" accessibilityLabel="Close" />
```

The circle is 32, 40 or 48 across — the `Fab`'s — around a glyph of 16, 20 or 24. Every
size is pressed as 48: `hitSlop` makes up the rest.

## Colour

Unset, the button is the page's ink. `accent` takes one of the twenty named accents: a
`contained` disc is filled with its true colour, an `outline` or `text` cross is drawn in
its ink, moved until it reads on the ground. `color` takes a raw tint, is never
corrected, and wins when both are set.

```tsx
<CloseButton variant="contained" accent="red" accessibilityLabel="Discard" />
```

## Accessibility

- The root has the `button` role and announces `disabled`. Disabled is a grey line and
  cross, or a grey disc, not an opacity.
- A cross is not text: the button needs an `accessibilityLabel`, and warns in development
  without one.
- A press leans the circle toward the finger and is felt as `press` through
  `TramProvider`'s `onHaptic`. With motion reduced, or animations off, it does not lean.
- On the web the browser's focus ring is kept, for keyboard focus only.

## Differences from Native

- **`radius`** is dropped: a Tram close button is a circle.
- **`variant`** is `outline`, `contained` or `text` — Tram's three drawings, not Native's
  four emphasis levels.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **`accent`** is added; `color` wins and is never corrected.
- **Disabled** is drawn in grey rather than dimmed.
- **The press** tilts the circle; Native scales or highlights it.
