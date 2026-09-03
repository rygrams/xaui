---
'@xaui/native': patch
---

Style as props (R14) — `useStyleProps` and `splitStyleProps` on `@xaui/native/system`, and
the `Button` on them.

```tsx
<Button padding={16} marginTop={8} width="100%">Envoyer</Button>
<Button.Label fontSize={18} letterSpacing={1}>Envoyer</Button.Label>
```

Full React Native names, and therefore full React Native values: `padding={16}` is 16
points, exactly as `style` would be — a prop carrying the RN key's name while multiplying
its value by a scale would be the trap you only catch by measuring on screen. The scale
stays one word away, `padding={t.spacing(4)}`.

The set is the node's style type minus the directional forms R13 bans, which are not
exposed at all: `ViewStyleProps` on a root, `TextStyleProps` on a text slot. A name the
component already uses stays the component's — `size` is the control's scale, `color` is
R7's tint. They resolve outside the style cache, after the tint and before `style`, which
is still the last word.

`Button.Icon` deliberately takes none: two of `Icon`'s three forms render no view of ours.
