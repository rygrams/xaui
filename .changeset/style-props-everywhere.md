---
'@xaui/native': patch
---

R14 reaches every component that renders a node, not only the `Button`.

`PressableFeedback` and its `Highlight` / `Ripple` overlays, `PortalHost` and `Icon` now
take the style keys of the node they render, the same way the `Button` and its slots do.
The primitive every pressable control in the library is built on cannot be the one place
where `padding={16}` has to become an object again.

```tsx
<PressableFeedback padding={12} borderRadius={16}>…</PressableFeedback>
<Icon source={logo} marginEnd={8} />
```

`Icon`'s reach the **`source` form only**, exactly as far as its `style` already does: the
other two forms render a third-party component or clone the caller's element, so there is
no node of ours to style. That is the rule applied, not an exception to it — the rule says
_the node the component renders_, and there is one in three.

On `PressableFeedback` they merge into `style` before either branch sees it, so the ink and
the corners an overlay reads off its surface include a `backgroundColor` or a
`borderRadius` written as a prop.
