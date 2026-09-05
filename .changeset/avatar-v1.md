---
'@xaui/native': patch
---

feat(avatar): the v1 `Avatar` — Image · Fallback · Initials, the fallback as a layer

The eleventh entry of the core. **The fallback is not a state, it is the layer underneath.**
`Avatar.Image` is absolutely positioned over `Avatar.Fallback`, and an `Image` with nothing
decoded yet draws nothing — so the initials show while the photo loads and **stay if the URL
is wrong**, with no load-state machine, no `onError` to remember, and nothing to get out of
sync. HeroUI runs a status enum for this; a stacking order says the same thing and cannot
disagree with itself. JSX order between the two slots is therefore free.

`variant` is the `Chip`'s eleven names, meaning here what they mean there — an avatar is a
token *about* a person or a thing, which is the category the `Chip` established. The three
status families are present because an avatar reports as often as it identifies: a red frame
for the account that failed to sync, a green one for the person who is online. It is
HeroUI's `variant × color` matrix said once.

`size` sets both sides, because an avatar is a square before it is a circle — 32, 40, 48, 64,
HeroUI's three steps plus the one our ladder adds below them. The glyph inside the fallback
runs ahead of the initials at the top of the scale, because two letters fill a circle that
one person-icon has to sit inside with air around it.

`radius` defaults to `full`, where HeroUI fixes one large radius for all three sizes — which
makes their small avatars round and their large ones squircles.

**No default glyph.** XAUI publishes no icon set, so the mark is always the caller's. What
`Avatar.Fallback` does instead is publish the frame's resolved size and colour to
`IconContext`, so an `Icon` written inside it needs no props at all.

The photo fades in over 200ms on `onLoad` — HeroUI's timing — driven by a shared value
rather than a mount animation, because the node has to be mounted from the first render or
it never fetches. `animation={false}` skips it and mounts no worklet.
