# Button

A control that runs an action when it is pressed, drawn the Metro way: a flat rectangle in
one accent colour, square corners, and a press that tilts the button toward the finger
instead of changing its colour.

## Import

```tsx
import { Button } from '@xaui/tram/button'
```

## Anatomy

```tsx
<Button>
  <Button.Spinner />
  <Button.Icon />
  <Button.Label />
</Button>
```

- **`Button`** — the root. It resolves the recipe once and hands the resolved styles to its
  slots. String children are wrapped in a `Button.Label` for you.
- **`Button.Label`** — the text, on one line. A Tram label keeps the case you write: the
  lower-case Metro look is the app's choice, not the component's.
- **`Button.Icon`** — an icon in the variant's colour, at the size's scale. It takes
  `Icon`'s three forms: `as`, a raw SVG child, or `source`.
- **`Button.Spinner`** — the busy indicator. `isLoading` inserts one when none is composed.

## Usage

### Basic

```tsx
<Button onPress={save}>save</Button>
```

### Composed

JSX order is screen order. No slot carries a margin: the gap belongs to the root.

```tsx
<Button variant="outline">
  <Button.Icon as={TrashIcon} />
  <Button.Label>delete</Button.Label>
</Button>
```

### Icon only

```tsx
<Button isIconOnly accessibilityLabel="Delete">
  <Button.Icon as={TrashIcon} />
</Button>
```

`isIconOnly` drops the horizontal padding and squares the button on its fixed height.

### Loading

```tsx
<Button isLoading>sending…</Button>
```

A loading button is not pressable, and announces as busy rather than as disabled.

## Variants

Four ways to draw one rectangle, all in the accent:

| Variant     | Drawn as                         |
| ----------- | -------------------------------- |
| `contained` | filled with the true colour      |
| `flat`      | filled with its soft slice       |
| `outline`   | a line and a label in the colour |
| `text`      | the label alone                  |

```tsx
<Button variant="contained">contained</Button>
<Button variant="flat">flat</Button>
<Button variant="outline">outline</Button>
<Button variant="text">text</Button>
```

None changes colour under the finger: the press is the tilt.

## Sizes

```tsx
<Button size="sm">sm</Button>
<Button size="md">md</Button>
<Button size="lg">lg</Button>
```

`size` drives height, padding, gap and type — never width. Every size keeps a 48-point
touch target.

## Colour

The colour is the theme's accent. `accent` picks another one of the twenty named Metro
accents; `color` takes a raw `#RRGGBB` and wins when both are set. The label on a filled
button is black or white, whichever reads (`onAccent`); a colour drawn as a line or as text
is darkened or lightened until it reads on the page (`accentInk`).

```tsx
<Button accent="magenta">magenta</Button>
<Button variant="outline" color={theme.colors.danger}>delete</Button>
```

## Accessibility

- The root has the `button` role; a disabled or loading button announces its state.
- An icon-only button needs an `accessibilityLabel` — there is no text to read.
- The press tilt follows reduced motion: with motion reduced it is a short 150 ms timing
  instead of the `press` spring.

## Differences from Native

- **`variant`** is `contained`, `flat`, `outline` or `text` — how the box is drawn. Native's
  ladder (`primary`, `default`, `danger`…) mixes emphasis and intention; Tram has one colour
  to spend, so a destructive button is `color={theme.colors.danger}`.
- **`accent`** is added: one of the twenty named accents.
- **`size`** is `sm`, `md` or `lg`; Native also has `xs`.
- **The press** tilts the button toward the finger and leaves its colours alone; Native
  dims or scales it.
- **The corner** stays within 2, the Tram radius scale.
