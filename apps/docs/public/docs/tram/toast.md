# Toast

A short notice drawn as Metro's: a flat band of colour under the notch, the width of the
screen, square, with its text on one line in the ink that reads on the fill.

It slides in from past the edge, the pile makes room, and it leaves by itself, by a swipe,
or through `Toast.Close`. A `Toast` is presentational: the `ToastHost` owns the queue, the
countdowns and the pile.

## Import

```tsx
import { Toast, ToastHost, ToastOutlet, useToast } from '@xaui/tram/toast'
```

## Anatomy

```tsx
<ToastHost>
  <Toast>
    <Toast.Title />
    <Toast.Description />
    <Toast.Actions>
      <Toast.Close />
    </Toast.Actions>
  </Toast>
</ToastHost>
```

The `Toast` is not written inside the host by hand: `useToast().toast()` hands it to the
host, which draws it in its pile.

- **`ToastHost`** — where toasts live, mounted once near the root of the app. It renders
  into the nearest `PortalHost`.
- **`Toast`** — one notice: a flat rectangle laying its slots on one row.
- **`Toast.Title`** — what happened, in the body role, heavier, on one line.
- **`Toast.Description`** — the detail, on what the title left of the line, cut at the
  end rather than wrapped.
- **`Toast.Actions`** — the row of things to do about it, at the end of the line. A Tram
  `Button` inside is drawn as text in the toast's ink unless it says otherwise.
- **`Toast.Close`** — anything that sends this toast away early. It draws nothing of its
  own: compose a visible way out through `asChild`.
- **`ToastOutlet`** — where the pile is drawn while a `Modal` is open (see below).

## Usage

### The host

The host reads no safe area: hand it the notch through `offset`.

```tsx
const insets = useSafeAreaInsets()

<TramProvider>
  <ToastHost offset={insets.top} dismissLabel="close">
    <App />
  </ToastHost>
</TramProvider>
```

`placement` is `top` (the default) or `bottom`. `duration` is 4000 ms by default, `0`
keeps a toast until it is dismissed; `maxVisible` (3) is how many are seen at once, the
others waiting their turn; `isSwipeable` (true) allows the swipe.

### Sending one

```tsx
const { toast, dismiss, dismissAll } = useToast()

toast({
  variant: 'success',
  render: () => (
    <Toast variant="success" onPress={open}>
      <Toast.Title>saved</Toast.Title>
      <Toast.Description>your changes are on the server</Toast.Description>
    </Toast>
  ),
})
```

`toast()` returns an id for `dismiss(id)`. One entry may set its own `duration`.

### With an action

```tsx
<Toast>
  <Toast.Title>message deleted</Toast.Title>
  <Toast.Actions>
    <Toast.Close asChild>
      <Button>close</Button>
    </Toast.Close>
  </Toast.Actions>
</Toast>
```

`render` also receives `{ dismiss }`, for an action that closes the toast.

### Inside a modal

A `Modal` covers the pile. Mount a `ToastOutlet` inside it and the pile is drawn there
while it is open; Tram's own full-screen pages already do.

```tsx
<Modal transparent>
  {content}
  <ToastOutlet />
</Modal>
```

## Variants

| Variant             | Fill                |
| ------------------- | ------------------- |
| `default`, `accent` | the theme's accent  |
| `success`           | the theme's success |
| `warning`           | the theme's warning |
| `danger`            | the theme's danger  |

The colour is the whole rectangle; the text is black on a light fill, white on the rest.

## Colour

`accent` picks one of the twenty named accents and fills as `color` does; `color` takes a
raw fill and wins when both are set. The text takes the ink that reads on it. `radius`
overrides the corner, within 2.

```tsx
<Toast accent="lime">…</Toast>
```

## Accessibility

- A `danger` or `warning` toast has the `alert` role and an assertive live region; the
  others are `status`, polite. A toast is announced once as it arrives.
- A screen reader's close action is on the title, named by the host's `dismissLabel`
  (`close` by default). With `onPress`, "activate" calls it, with an empty `nativeEvent`.
- A countdown stops under a finger, and while a screen reader is on (this cannot be
  detected on the web).
- With motion reduced nothing slides or bounces: toasts fade in and out, and a swipe still
  closes them. Under `disable-all` everything is set.

## Differences from Native

- **A `variant`** fills the whole rectangle; Native colours the title on a neutral card.
- **`accent`**, **`color`** and **`onPress`** are added on the root, which lays its slots
  on one row (Native stacks them), with `Title` and `Description` on one line each.
- **The role** is `alert` for `danger` and `warning`, `status` otherwise; Native's is
  always `alert`.
- **`Toast.Close`** takes `PressableFeedback`'s props and no function `style`.
- **`ToastHost`** defaults to `placement="top"` (Native: `bottom`), reads no safe area and
  takes `offset`, and takes `dismissLabel`.
- **The pile** is a list spaced by 8, newest against the edge, where Native overlaps and
  shrinks; every visible toast can be swiped.
- **`ToastOutlet`** is added.
- **The context** carries no `rootStyle`.
