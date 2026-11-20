# Typography

Text by the role it plays on a Metro page — a caption, a page title, a pivot header — on
the Tram scale, where each role fixes size, weight and face together.

One node and no slots. A fragment of a paragraph is a `Typography` too: Tram has no
`TextSpan`.

## Import

```tsx
import { Typography } from '@xaui/tram/typography'
```

## Anatomy

```tsx
<Typography />
```

- **`Typography`** — the root and its only node, a `Text`. Left without a `variant` it is
  `body`, or, inside another `Typography`, a fragment of its parent's text.

## Usage

### Basic

```tsx
<Typography variant="page">settings</Typography>
<Typography variant="title">theme</Typography>
<Typography>Dark, with the cyan accent.</Typography>
```

### Fragments

Written inside another `Typography` with no `variant`, a `Typography` keeps its parent's
role and changes only what it names. One that names a `variant` sets that role over its
parent's.

```tsx
<Typography>
  delete <Typography fontWeight="600">three projects</Typography> for good
</Typography>
```

### Headings

A role is a look, not a level. Announcing a heading stays explicit:

```tsx
<Typography variant="section" accessibilityRole="header">
  storage
</Typography>
```

The case is the app's: Metro wrote its titles in lower case, Tram draws what it is given.

## Variants

| Variant    | Size | Weight    |
| ---------- | ---- | --------- |
| `caption`  | 13   | Regular   |
| `body`     | 16   | Regular   |
| `subtitle` | 19   | Regular   |
| `title`    | 25   | SemiLight |
| `section`  | 32   | Light     |
| `pivot`    | 42   | Light     |
| `page`     | 64   | Light     |
| `hero`     | 120  | Light     |

There is no `size` and no `weight` prop: a `hero` in Regular is not on the scale.
`fontSize` and `textAlign` stay available as style props for the one-off.

A weight is a face: `title` is set in `<family>-Semilight`, `section` in `<family>-Light`,
after the theme's family. The app registers the font files; Tram ships none.

## Colour

Text is the page's ink. `accent` picks one of the twenty named accents, drawn as the mode's
ink — the same hue, moved until it reads at 4.5:1 on the theme's ground. `color` takes a
raw `#RRGGBB`, lands on the text as given, and wins when both are set.

```tsx
<Typography variant="caption" accent="magenta">
  modified
</Typography>
```

## Accessibility

- No role by default; give a heading `accessibilityRole="header"`.
- Sizes follow the system's text-size setting. `hero` caps the multiplier at 1.25, since a
  giant role has only so much screen to grow into; `maxFontSizeMultiplier` overrides it.
- An `accent` is moved until it reads at 4.5:1; a raw `color` is never corrected.

## Differences from Native

- **`variant`** names the role on the page — `caption` to `hero` — where Native counts
  heading levels, `h1` to `h6`.
- **No `code`** role: the Tram scale has no monospace step.
- **No `TextSpan`**: a `Typography` with no `variant` inside another one is the fragment.
- **Faces by weight name**: Light, SemiLight and Regular are faces of the theme's family.
- **`accent`** is added.
