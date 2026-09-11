# Typography

The web renderer of Native's `Typography` and `TextSpan`. The recipe is the Native one —
the same ten roles, the same tokens, the same ink-only tint — so a role is edited in one
place and both packages move together.

Two nodes, and neither is a slot of the other. `Typography` renders a `<span>` carrying
the role; `TextSpan` renders a bare `<span>` and takes its font, size, weight and colour
from CSS inheritance, which is what makes it need no context here, exactly as the nested
`Text` does on Native.

What this folder owns is the boundary: the recipe's resolved style reaches the DOM through
the shared text host, which drops the props that name an iOS or Android mechanism, maps
`accessibilityRole` to its ARIA equivalent and turns `numberOfLines` into a line clamp.
Nothing in that translation is a prop of its own — a Hybrid-only prop would break the
parity the `tooling/hybrid-parity` type check enforces.

The component's documentation is the Native page, `typography.md`. It documents both
renderers, and this folder does not carry a second copy.
