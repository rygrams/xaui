---
'@xaui/native': patch
---

`Toast` — Title · Description · Actions · Close, plus `ToastHost` and `useToast`

**The card does not know it is in a queue**, when it will leave, or what is stacked under
it. The host owns all three, and that split is the whole design: `render` returns anything
at all and the queue never looks at it, so `Toast` is the card this library ships rather
than the card the host requires.

`Toast.Close` still knows which toast it belongs to without being told. The host provides
the dismiss **around** each entry and the card folds it into the context its slots read, so
a close button two levels down needs nothing passed to it.

**The variant paints the title, and nothing else.** A red card sliding in from the edge of
the screen reads as the app breaking; a red line of text reads as the thing you just did
failing. The surface stays the theme's floating one whatever happened, which is also what
lets two toasts of different kinds stack without the pile looking like a paint chart. It
uses the soft foregrounds rather than the full colours, because a toast is read from the
corner of the eye and `danger` at full strength is a shout where the soft one is a
statement.

**It slides from the edge it will sit against**, where every other overlay here scales in
place. A dialog and a popover appear where they are, because they were asked for; a toast
arrives, because something happened. Motion across the screen's edge is the difference.

Past `limit` the **oldest** goes: the newest is the one that just happened, and the reader
is looking for it.

`useToast` outside a `ToastHost` warns and does nothing rather than throwing. A missing host
is a setup mistake in the app shell, and a screen that crashes on its way to reporting that
a save succeeded has turned a good outcome into a bad one.

It closes P5.18 as well as P5.18b: `Snackbar` and `Toast` are the same object under two
names, and HeroUI calls it `toast`.
