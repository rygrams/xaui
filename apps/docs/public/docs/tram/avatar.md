# Avatar

A person or a thing, drawn as the Metro thumbnail: a sharp square in the accent, with the
initials cut into it or the photo laid over them.

The case of the initials is the app's — Metro wrote its own in lower case; Tram rewrites
nothing.

## Import

```tsx
import { Avatar } from '@xaui/tram/avatar'
```

## Anatomy

```tsx
<Avatar>
  <Avatar.Image />
  <Avatar.Fallback>
    <Avatar.Initials />
  </Avatar.Fallback>
</Avatar>
```

- **`Avatar`** — the square. It resolves the recipe once and hands the styles to its
  slots. A stringifiable child becomes the initials: `<Avatar>am</Avatar>` is most avatars.
- **`Avatar.Image`** — the photo, laid over the whole frame whatever the order it is
  written in. It arrives on the Metro curve once decoded.
- **`Avatar.Fallback`** — the layer underneath the photo: initials, an `Icon`, anything.
  An `Icon` inside it is handed the frame's size and ink. A stringifiable child becomes
  `Avatar.Initials`.
- **`Avatar.Initials`** — the letters, on the Tram scale the size chose, on one line.

## Usage

### Initials

```tsx
<Avatar>am</Avatar>
```

### Photo

```tsx
<Avatar>
  <Avatar.Image source={{ uri: user.photo }} />
  <Avatar.Fallback>am</Avatar.Fallback>
</Avatar>
```

The fallback is a layer, not a state: an `Image` with nothing decoded draws nothing, so
the initials show while the photo loads and stay if it never does. `animation={false}` on
`Avatar.Image` shows the photo the moment it decodes, with no fade.

### Icon

```tsx
<Avatar variant="flat">
  <Avatar.Fallback>
    <Icon as={PersonIcon} />
  </Avatar.Fallback>
</Avatar>
```

### Circle

```tsx
<Avatar radius="full" size="lg">
  <Avatar.Image source={photo} />
  <Avatar.Fallback>am</Avatar.Fallback>
</Avatar>
```

`radius` caps at the Tram corner of 2, or lets `full` through for a face in a round frame.

## Variants

Three of the `Button`'s drawings, in the accent:

| Variant     | Drawn as                                     |
| ----------- | -------------------------------------------- |
| `contained` | filled with the true colour (default)        |
| `flat`      | filled with its soft slice                   |
| `outline`   | the `Button`'s line and the initials, as ink |

```tsx
<Avatar variant="contained">am</Avatar>
<Avatar variant="flat">am</Avatar>
<Avatar variant="outline">am</Avatar>
```

There is no `text`: initials with no box are not a thumbnail.

## Sizes

```tsx
<Avatar size="sm">am</Avatar>
<Avatar size="md">am</Avatar>
<Avatar size="lg">am</Avatar>
```

A square 40, 56 or 72 a side, and the type inside it.

## Colour

`accent` picks one of the twenty named accents; `color` takes a raw tint and wins over it.
The initials on `contained` are in the ink that reads on the accent.

```tsx
<Avatar accent="magenta">kc</Avatar>
<Avatar variant="outline" color="#7c3aed">kc</Avatar>
```

## Accessibility

- The avatar has no default role: a face is an image, and what a screen reader should
  read is the name beside it. Give it an `accessibilityLabel` when it is the only label
  there is.
- `Avatar.Initials` is hidden from screen readers.
- With motion reduced, the photo arrives in the short fade.

## Differences from Native

- **`variant`** is `contained`, `flat` or `outline` — the `Button`'s drawings. Native's
  eleven names (`default`, `success-soft`…) become a drawing plus an `accent`.
- **`accent`** is added: one of the twenty named accents.
- **`size`** is `sm`, `md` or `lg` — squares of 40, 56, 72; Native also has `xs`, and
  runs from 32 to 64.
- **The shape** is a sharp square; `radius` caps at 2 or lets `full` through. Native is a
  circle at every size.
- **The photo** arrives on the Metro curve; Native fades it in over 200 ms.
