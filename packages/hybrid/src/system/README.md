# System

Renderer primitives shared by Hybrid components live here: recipes and their cache,
`asChild` slots, Native-shaped style props, DOM-safe host adapters and the point-to-`rem`
conversion boundary. A primitive joins the public `system` subpath only when its Native
contract is fully ported.

Component-specific recipes and styles stay with their component.
