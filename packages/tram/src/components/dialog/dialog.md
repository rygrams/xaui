# Dialog

A message that interrupts the screen and asks for an answer, drawn as the Metro
`MessageBox`: a banner of the discreet surface across the top of the screen, edge to edge,
over the page dimmed at the theme's `backdrop`, swivelling in on its top edge.

Its children arrive in cascade as soon as it reads as flat. A swipe upward turns it under
the finger and lightens the ground; past a threshold of distance or of speed, it leaves.

## Import

```tsx
import { Dialog } from '@xaui/tram/dialog'
```

## Anatomy

```tsx
<Dialog>
  <Dialog.Trigger />
  <Dialog.Overlay />
  <Dialog.Content>
    <Dialog.Title />
    <Dialog.Description />
    <Dialog.Close />
  </Dialog.Content>
</Dialog>
```

- **`Dialog`** — the root. It renders no node: `ref` and `style` live on the parts that
  draw. It holds the open state.
- **`Dialog.Trigger`** — what opens the banner. It paints nothing of its own: `asChild`
  makes it a `Button`, and a string is set in `body`.
- **`Dialog.Overlay`** — the dimmed ground. `isDismissable={false}` makes a banner that
  must be answered.
- **`Dialog.Content`** — the banner. Each child is one step of the cascade, in the order
  written: the title, the description, then a row of actions.
- **`Dialog.Title`**, **`Dialog.Description`** — the question and its detail.
- **`Dialog.Close`** — what closes the banner. It draws no cross: a `MessageBox` is closed
  by its buttons. `asChild` makes it one; a string is set in `body`.

## Usage

### Basic

```tsx
<Dialog>
  <Dialog.Trigger asChild>
    <Button variant="outline">delete</Button>
  </Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content paddingTop={insets.top + 24}>
    <Dialog.Title>delete this document?</Dialog.Title>
    <Dialog.Description>it will not go to the bin.</Dialog.Description>
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Dialog.Close asChild>
        <Button flex={1}>delete</Button>
      </Dialog.Close>
      <Dialog.Close asChild>
        <Button flex={1} variant="outline">
          cancel
        </Button>
      </Dialog.Close>
    </View>
  </Dialog.Content>
</Dialog>
```

The banner reads no safe area: it starts at the very top of the screen, under the notch.
Pad `Dialog.Content` with the app's own inset.

### At the bottom

```tsx
<Dialog placement="bottom">
  <Dialog.Trigger asChild>…</Dialog.Trigger>
  <Dialog.Overlay />
  <Dialog.Content paddingBottom={insets.bottom + 24}>…</Dialog.Content>
</Dialog>
```

`placement="bottom"` lays the same banner against the foot of the screen, within reach of
the thumb: it turns on its bottom edge and is swiped back down.

### Must be answered

```tsx
<Dialog.Overlay isDismissable={false} />
```

Neither a touch on the ground, nor a swipe, nor the system's back closes it, and it
resists the finger.

### Controlled

```tsx
<Dialog isOpen={isOpen} onOpenChange={setOpen}>
  …
</Dialog>
```

## Accessibility

- `Dialog.Content` is a `dialog` (`alertdialog` on the web when not dismissable), labelled
  by `Dialog.Title` and described by `Dialog.Description`.
- It takes the focus as it opens and gives it back to the trigger as it closes.
- A screen reader's escape and the system's back close it, unless `isDismissable` is off.
- A disabled dialog's trigger is grey and opens nothing; a `Button` under `asChild` is
  handed `isDisabled`.
- With motion reduced the banner fades in and out instead of swivelling, and does not
  follow the finger.

## Differences from Native

- **`placement`** (`top` / `bottom`) is added.
- **`radius`** is accepted and draws nothing: the banner runs edge to edge.
- **No `accent`**: the banner has none; its buttons carry their own.
- **`Close`** draws no cross — a string or `asChild`.
- **`Trigger`** and **`Close`** set a string in `body`; a disabled trigger is grey.
- **A `Modal`**, not the portal, with `Overlay` drawn inside it.
- **`Content`** is a `dialog` (`alertdialog` on the web when not dismissable); Native's is
  an `alert`.
- **`isDismissable={false}`** also holds the swipe, the system's back and the screen
  reader's escape.
- **Each child of `Content`** is wrapped in a view of its own for the cascade.
- **The banner reads no safe area**: `Content` is padded by the app.
