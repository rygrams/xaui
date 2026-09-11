# Typography

The web renderer of Native's `Typography` and `TextSpan`.

This is the port note, not a second documentation page. The API is documented once, on
Native's `typography.md`, which covers both renderers — anatomy, the ten roles, props,
accessibility and the migration table all live there.

The recipe is the Native one: the same ten roles, the same tokens, the same ink-only tint.
A role is edited in one place and both packages move together.

Two nodes, and neither is a slot of the other. `Typography` renders a `<span>` carrying the
role; `TextSpan` renders a bare `<span>` and takes its font, size, weight and colour from
CSS inheritance, which is what makes it need no context here — exactly as the nested `Text`
does on Native.

What this folder owns is the boundary. The recipe's resolved style reaches the DOM through
the shared text host, which drops the props naming an iOS or Android mechanism, maps
`accessibilityRole` to its ARIA equivalent and turns `numberOfLines` into a line clamp.
None of that translation is a prop of its own: a Hybrid-only prop would break the parity
the `tooling/hybrid-parity` type check enforces.
