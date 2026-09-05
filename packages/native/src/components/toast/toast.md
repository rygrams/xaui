# Toast

A notice that arrives because something happened, and leaves on its own.

## Import

```tsx
import { Toast, ToastHost, useToast } from '@xaui/native/toast'
```

## Anatomy

```tsx
;<ToastHost>{app}</ToastHost>

// anywhere below it
const { toast } = useToast()

toast({
  render: () => (
    <Toast variant="success">
      <Toast.Title>Enregistré</Toast.Title>
      <Toast.Description>Vos modifications sont sur le serveur.</Toast.Description>
      <Toast.Actions>
        <Toast.Close asChild>
          <Button size="sm">Fermer</Button>
        </Toast.Close>
      </Toast.Actions>
    </Toast>
  ),
})
```

- **`ToastHost`** — the queue, the timers and the stack. Mounted once.
- **`useToast`** — how anything asks for one.
- **`Toast`** — the card. Presentational, and replaceable.
- **`Toast.Title`** — what happened. The one node the variant colours.
- **`Toast.Description`** — the detail.
- **`Toast.Actions`** — the row of things you can do about it.
- **`Toast.Close`** — anything that sends this one away early.

## The split, and why it is the whole design

**`Toast` does not know it is in a queue**, when it will leave, or what is stacked under it.
The host owns all three.

That is what lets `render` return anything at all — the queue never looks at it. `Toast` is
the card this library ships, not the card the host requires.

`Toast.Close` still knows which toast it belongs to without being told: the host provides
the dismiss **around** each entry, and the card folds it into the context its slots read. A
close button two levels down needs nothing passed to it.

## Usage

### The host

```tsx
<XAUIProvider>
  <ToastHost placement="bottom" duration={4000} limit={3}>
    {app}
  </ToastHost>
</XAUIProvider>
```

It renders into the nearest `PortalHost`, so the stack sits over navigation rather than
inside whatever screen asked for it.

### One that waits for an answer

```tsx
toast({ duration: 0, render: … })
```

`0` keeps it until something dismisses it — for the toast that asks a question rather than
reporting an answer.

### Dismissing early

```tsx
const id = toast({ render: … })
dismiss(id)
```

`render` is also handed `{ dismiss }`, which is the same thing without holding the id.

## Props

### `ToastHost`

| prop        | type                | default  | description                       |
| ----------- | ------------------- | -------- | --------------------------------- |
| `placement` | `'top' \| 'bottom'` | `bottom` | Which edge the stack sits against |
| `duration`  | `number`            | `4000`   | Milliseconds. `0` keeps them      |
| `limit`     | `number`            | `3`      | How many at once                  |

Past the limit the **oldest** goes. The newest is the one that just happened, and the
reader is looking for it.

### `Toast`

| prop      | type           | default   | description                 |
| --------- | -------------- | --------- | --------------------------- |
| `variant` | `ToastVariant` | `default` | Colours the **title** only  |
| `radius`  | `RadiusKey`    | —         | Overrides the card's corner |

`default` · `accent` · `success` · `warning` · `danger`.

## The variant paints the title, and nothing else

A red card sliding in from the edge of the screen reads as the app breaking; a red line of
text reads as the thing you just did failing. The surface stays the theme's floating one
whatever happened — which is also what lets two toasts of different kinds stack without the
pile looking like a paint chart.

It uses the **soft** foregrounds rather than the full colours: a toast is read at a glance
and from the corner of the eye, and `danger` at full strength on an overlay surface is a
shout where the soft one is a statement.

The description stays muted whatever the variant. The title already said in colour what kind
of thing happened, and saying it twice leaves nothing for the eye to rank.

## Motion

It **slides** from the edge it will sit against, and leaves the same way — 260 ms in,
180 ms out.

That is what separates it from every other overlay here. A dialog and a popover appear where
they are, because they were asked for; a toast arrives, because something happened. Motion
across the screen's edge is the difference between the two.

## Accessibility

The card is an `alert` with `accessibilityLiveRegion="polite"`, so it is announced when it
arrives rather than when the reader reaches it — a toast that waits its turn in the reading
order has usually gone by the time it is read.

`useToast` outside a host **warns and does nothing** rather than throwing. A missing host is
a setup mistake in the app shell, and a screen that crashes on its way to reporting that a
save succeeded has turned a good outcome into a bad one.

## It replaces `Snackbar`

The legacy component is `Snackbar`. It is the same object under two names, and HeroUI calls
it `toast`; the roadmap's P5.18 closes with this.

| Legacy                        | v1                                     |
| ----------------------------- | -------------------------------------- |
| `<Snackbar message="…" />`    | `<Toast.Title>…</Toast.Title>`         |
| `action={{ label, onPress }}` | a `Button` inside `<Toast.Actions>`    |
| `duration`                    | `duration` on the call, or on the host |
| `themeColor="danger"`         | `variant="danger"`                     |
