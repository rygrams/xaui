# JumpList

The Metro grouped list — a contact list, a song list — where every group opens on a square
of the accent: press one and a grid of keys comes up over the page; press a key and the
grid turns away, and the list lands on that group.

It is Tram's own, with no Native equivalent. It is a `SectionList` and takes its props, so
it is virtualised: a list of two thousand names jumps as fast as one of twenty.

## Import

```tsx
import { JumpList, groupByInitial } from '@xaui/tram/jump-list'
```

## Anatomy

```tsx
<JumpList sections={sections} renderItem={renderRow}>
  <JumpList.Header />
  <JumpList.Overlay>
    <JumpList.Key />
  </JumpList.Overlay>
</JumpList>
```

- **`JumpList`** — the root, a `SectionList`. Its `ref` is that list. Every group with rows
  opens on a header; a group with none has no header, and its key is grey.
- **`JumpList.Header`** — written once, the drawing of every header: a flat square of the
  accent with its letter in the bottom-start corner, or a bar as wide as its word for a
  group that is not a letter. Pressed, it puts the grid up.
- **`JumpList.Overlay`** — the grid, over the whole screen: the page's own ground, opaque,
  with the keys on it. A `Modal`, so it covers the navigation and hears the system's back.
- **`JumpList.Key`** — written once inside the overlay, the drawing of every key. Pressed,
  the grid leaves and the list lands on its group.

All three are optional: left out, they are drawn as they are. Their text is the section's
`title`, or its key; a function child is handed the group (`key`, `title`, `isEmpty`).

## Usage

### A list of names

```tsx
const sections = groupByInitial(contacts, contact => contact.name, { locale: 'fr' })

<JumpList
  sections={sections}
  keyExtractor={contact => contact.id}
  renderItem={({ item }) => <ContactRow contact={item} />}
  onJump={key => track('jump', key)}
/>
```

`groupByInitial` files every row under the key of its initial — accents folded, sorted by
locale within a group — and gives every key its section, empty ones included. A row whose
initial is no key goes under `#`. The keys default to `JUMP_LIST_ALPHABET`: `#`, then a–z.

### Groups that are not letters

```tsx
const sections = [
  { key: 'today', title: 'today', data: today },
  { key: 'yesterday', title: 'yesterday', data: yesterday },
]

<JumpList sections={sections} renderItem={renderMessage} />
```

Keys of one character are a grid of squares four across; any longer key makes a column of
bars. `layout` (`grid` or `list`) forces one. `keys` lists the grid's keys in order when
they are not the sections' own.

### Hints

```tsx
<JumpList sections={sections} renderItem={renderContact}>
  <JumpList.Header accessibilityHint="Opens the alphabet" />
  <JumpList.Overlay>
    <JumpList.Key accessibilityHint="Goes to this letter" />
  </JumpList.Overlay>
</JumpList>
```

### Controlled

```tsx
<JumpList
  sections={sections}
  renderItem={renderContact}
  isOpen={isOpen}
  onOpenChange={setOpen}
/>
```

## Sizes

```tsx
<JumpList size="sm" sections={sections} renderItem={renderContact} />
<JumpList size="md" sections={sections} renderItem={renderContact} />
<JumpList size="lg" sections={sections} renderItem={renderContact} />
```

A header is a square of 40, 48 or 56, its letter scaled with it; `md` is the default. A
40-point square is pressed as 48.

## Colour

`accent` takes one of the twenty named accents for the headers and the keys. `color` takes
a raw `#RRGGBB` fill, is never corrected, and wins when both are set. A key with no row is
the soft grey `default`, its letter muted, and does not respond.

## Accessibility

- Headers and keys are `button`s named by their text; an empty key announces `disabled`.
  Add an `accessibilityHint` to say what they do.
- The grid is modal. The system's back closes it.
- The header the list lands on takes the focus — the keyboard's on the web, the screen
  reader's on a phone — so the reader goes on from the group chosen.
- A header is felt as `press`, a key as `selection`, through `TramProvider`'s `onHaptic`.
- The grid arrives a row at a time and leaves in a turnstile on the screen's start edge.
  With motion reduced it fades; under an ancestor's `disable-all` it is there or not.
- `isDisabled` dims the headers, which then open nothing.

Headers do not stick to the top: a Metro list has none. There is no `asChild`, since the
root is a virtualised list.
