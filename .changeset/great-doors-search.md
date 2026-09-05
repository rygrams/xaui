---
'@xaui/native': patch
---

`Icon`'s R14 boundary moves from a comment into the type

`IconProps` declared the style props and `style` for all three forms, but only the `source`
form applies them — it is the one where we render the node. So this compiled and silently
did nothing:

```tsx
<Icon as={Trash2} marginEnd={8} />
```

The props are a discriminated union now: `as`, a raw SVG child and `source` are mutually
exclusive, and only `source` carries R14. The call above is a compile error that points at
`size` and `color`, the levers the other two forms actually have.

`Icon` also gains the demo screen it never had — the three forms, the cascade from prop to
slot to theme, and a raw SVG having its baked-in size overridden. Not having one is why the
gap went unnoticed: nobody had tried writing a margin on an icon.
