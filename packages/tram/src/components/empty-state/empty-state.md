# EmptyState

What is on the screen when there is nothing on it, said as a Metro page says it: aligned
to the start, a title on the Tram scale, the detail faded under it, then what to do about
it.

The header and the content are two parts, as in Native: the gap inside the words is not
the gap between them and the buttons. The words are never tinted — `accent` and `color`
land on the media's square only.

## Import

```tsx
import { EmptyState } from '@xaui/tram/empty-state'
```

## Anatomy

```tsx
<EmptyState>
  <EmptyState.Header>
    <EmptyState.Media />
    <EmptyState.Title />
    <EmptyState.Description />
  </EmptyState.Header>
  <EmptyState.Content />
</EmptyState>
```

- **`EmptyState`** — the root, the ground the whole state sits on.
- **`EmptyState.Header`** — the media and the words.
- **`EmptyState.Media`** — an illustration, a photo, or a glyph on a square of the accent
  (`variant="icon"`).
- **`EmptyState.Title`** — what is missing, on `subtitle`, `title` or `section` as the
  size chooses.
- **`EmptyState.Description`** — the detail, faded as the `Card`'s.
- **`EmptyState.Content`** — what to do about it: a button, a row of them.

## Usage

### Basic

```tsx
<EmptyState>
  <EmptyState.Header>
    <EmptyState.Media variant="icon">
      <Icon as={FolderIcon} />
    </EmptyState.Media>
    <EmptyState.Title>no files</EmptyState.Title>
    <EmptyState.Description>
      Files you import or receive by mail show up here.
    </EmptyState.Description>
  </EmptyState.Header>
  <EmptyState.Content>
    <Button variant="outline">import</Button>
  </EmptyState.Content>
</EmptyState>
```

### Media

`EmptyState.Media` has two drawings:

| Variant | Drawn as                                                           |
| ------- | ------------------------------------------------------------------ |
| `plain` | the media as it is; a glyph stays on the page in `muted` (default) |
| `icon`  | a square of the accent, the glyph in the ink that reads on it      |

## Variants

Three grounds, kept from Native by name:

| Variant    | Ground                                                 |
| ---------- | ------------------------------------------------------ |
| `plain`    | the page (default)                                     |
| `surface`  | the discreet surface, the `Card`'s                     |
| `outlined` | the page inside a solid line of 2 in `muted` — no dash |

```tsx
<EmptyState variant="surface">…</EmptyState>
```

## Sizes

```tsx
<EmptyState size="sm">…</EmptyState>
<EmptyState size="md">…</EmptyState>
<EmptyState size="lg">…</EmptyState>
```

`size` drives the media's square — 40, 56 or 72, the `Avatar`'s — the gaps and the type.
Never a height.

## Colour

`accent` takes one of the twenty named accents and repaints the media's square only.
`color` takes a raw tint, wins over `accent`, and also lands on the square alone.
`radius` overrides the Tram corner of 2 and stays within 2.

```tsx
<EmptyState accent="teal">…</EmptyState>
```

## Accessibility

- `EmptyState.Title` has the `header` role, which is what a screen reader jumps between —
  so a screen whose only content is an empty state is still navigable.

## Differences from Native

- **Aligned to the start**, as a Metro page, not centred.
- **`outlined`** is a solid line of 2 in `muted`, not Native's dashes.
- **`Media variant="icon"`** is a square of the accent 40 / 56 / 72, the glyph in the ink
  that reads on it, where Native draws a muted circle; `plain` leaves a glyph in `muted`.
- **`accent`** is added, repainting the square only.
- **`color`** tints the square alone, unlike Native.
- **`radius`** caps at 2.
