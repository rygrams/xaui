# System

Renderer primitives shared by Hybrid components live here: recipes and their cache,
`asChild` slots, Native-shaped style props, DOM-safe host adapters and the point-to-`rem`
conversion boundary. A primitive joins the public `system` subpath only when its Native
contract is fully ported.

`text-host` is the exception that proves the rule: it exists only because the DOM needs an
adapter Native does not, so it stays off the public `system` barrel — exporting it would
put a Hybrid-only name on a subpath whose contents must match Native's.

Component-specific recipes and styles stay with their component.
