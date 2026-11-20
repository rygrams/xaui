# List

A virtualised list of content rows, drawn as the Metro content list: a square thumbnail at
the start, a large title in the page's ink, a line in the accent, a detail in Metro's subtle
grey, and no card and no line between the rows.

`List` is a `FlatList`: it takes the vertical `FlatList` props, and its `renderItem`
composes each row from slots. The rows carry the page's 24-point margin, so the list runs
edge to edge, and 12 points of space separate two rows.

## Import

```tsx
import { List } from '@xaui/tram/list'
```

## Anatomy

```tsx
<List>
  <List.Item>
    <List.Leading />
    <List.Content>
      <List.Title />
      <List.Subtitle />
      <List.Description />
    </List.Content>
    <List.Action />
    <List.Swipe>
      <List.SwipeAction />
    </List.Swipe>
  </List.Item>
</List>
```

- **`List`** — the root, a `FlatList`. `ItemSeparatorComponent`, `horizontal`, `inverted`
  and `numColumns` are locked: the list is one column, read from the top.
- **`List.Item`** — one row. With `onPress` or `onLongPress` it becomes a button that leans
  toward the finger; without them it does not move.
- **`List.Leading`** — a square of 52 in the accent, with a glyph in it. With `asChild` its
  one child — an `Image` — fills the square.
- **`List.Content`** — takes the remaining width and stacks the three lines of text.
- **`List.Title`** — the title, in the page's ink on the `title` role.
- **`List.Subtitle`** — a line in the accent, read as ink, on `body`.
- **`List.Description`** — a detail of up to two lines on `caption`, in the subtle grey.
- **`List.Action`** — level with the title at the row's end: the time of a mail, or a
  control. A string is written in the grey.
- **`List.Swipe`** — the actions lying under the row at its end, out of sight until the row
  is swiped.
- **`List.SwipeAction`** — one action: a flat fill at least 72 wide holding a label and an
  `Icon`.

## Usage

### Basic

```tsx
<List
  data={stories}
  keyExtractor={story => story.id}
  renderItem={({ item }) => (
    <List.Item onPress={() => open(item)}>
      <List.Leading>
        <Icon as={SunIcon} />
      </List.Leading>
      <List.Content>
        <List.Title>{item.title}</List.Title>
        <List.Subtitle>{item.category}</List.Subtitle>
        <List.Description>{item.lede}</List.Description>
      </List.Content>
    </List.Item>
  )}
/>
```

### A mail list

No square, and the time level with the title:

```tsx
<List.Item onPress={() => read(mail)}>
  <List.Content>
    <List.Title>{mail.from}</List.Title>
    <List.Subtitle>{mail.subject}</List.Subtitle>
    <List.Description>{mail.body}</List.Description>
  </List.Content>
  <List.Action>{mail.time}</List.Action>
</List.Item>
```

A row without `onPress` does not move: a control such as a `Switch` in `List.Action` keeps
its own role and press.

### Swipe actions

```tsx
<List.Item onPress={() => open(item)}>
  <List.Content>
    <List.Title>{item.title}</List.Title>
  </List.Content>
  <List.Swipe>
    <List.SwipeAction onPress={() => archive(item)}>
      <Icon as={ArchiveIcon} />
      archive
    </List.SwipeAction>
    <List.SwipeAction accent="red" onPress={() => remove(item)}>
      <Icon as={TrashIcon} />
      delete
    </List.SwipeAction>
  </List.Swipe>
</List.Item>
```

The row follows the finger toward its start, a third as fast past its actions, and settles
open past half of them or when flung. One row is open at a time: opening another, touching
the row, pressing an action or scrolling the list closes it.

### Disabled

`isDisabled` on `List.Item` greys the text and the square and stops the press and the
swipe.

## Colour

The square, the subtitle and the swipe actions take the theme's accent. `accent` on the root
picks one of the twenty named Metro accents; `color` takes a raw tint and wins when both
are set. A swipe action's own `accent` or `color` wins over the list's; its label and glyph
are black or white, whichever reads on the fill.

The subtitle's accent ink is moved, by the smallest step, until it stands apart from both
the title's ink and the description's grey. A raw `color` is never moved.

## Accessibility

- The root has the `list` role.
- A row with `onPress` or `onLongPress` has the `button` role; a disabled row announces its
  state.
- The swipe actions are hidden from a screen reader while the row is closed, and offered as
  the row's accessibility actions instead.
- The first rows arrive in a cascade when the list first shows some; rows drawn later by
  scrolling are placed. With motion reduced they fade in together; `hasEntrance={false}`
  places them.
- The swipe is mirrored in right-to-left layouts.

## Differences from Native

- **`List.Subtitle`** is added: Metro's three levels of text.
- **`onPress` / `onLongPress`** on `List.Item` make the row a button that leans toward the
  finger; Native's row has no press of its own.
- **`isDisabled`** is added on `List.Item`.
- **`List.Swipe` and `List.SwipeAction`** are added.
- **`accent`** and **`color`** are added on the root, and **`hasEntrance`**.
- **The `separator` slot** is dropped: rows are separated by space, never a line.
- **`List.Leading`** takes `asChild` for a picture that fills the square.
