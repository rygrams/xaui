---
'@xaui/native': patch
---

`Scaffold` — Root · StatusBar · Navigator

P5.47, over `useAppearance` (P0.7b). The hook answered what an app's chrome needs from the
theme; this is that answer wired — the ground under every screen, the status bar over it,
and the five options the app's navigator is dressed with.

**It depends on no navigator, and on Expo least of all.** `Scaffold.Navigator` takes the
app's own navigator **as its child** and clones it with the theme's `screenOptions` merged
in. Those keys are React Navigation's spelling, declared structurally here as
`ScaffoldScreenOptions`, so Expo Router, a native stack, a drawer or a set of tabs are all
dressed by the same component and `@xaui/native` imports none of them — not a dependency,
not an optional peer, not a type import. Routing stays entirely the app's: nothing writes a
route, wraps a screen or touches what the navigator was configured with.

That is also why there is **no `asChild` on the slot**. The prop distinguishes "render
yourself" from "dress my element", and this slot has only the second mode: there is no
navigator XAUI could render in place of the app's.

**`mergeScreenOptions` is the one merge `mergeProps` cannot do.** That helper gives the
child the whole value of a key it declares — right for a `style` or a handler, wrong here:
an app writing `screenOptions={{ headerRight }}` means "add a button", not "drop the
theme's header". So the theme's options go under the navigator's own key by key, the three
style keys are flattened rather than replaced (a `headerStyle={{ height: 96 }}` keeps its
ground), and the function form stays a function, because React Navigation calls it per
route. It is the component's only pure function, and the only thing in it with a test.

**The variant is a ladder, not four emphases** — how much the header separates from the
page. `primary` is the accent bar, `secondary` the one `surface` draws, `tertiary` the
page's own ground closed by a hairline, and `ghost` that ground with no edge at all, which
is the default and what almost every app now wants.

The page's ground is `background` under every variant: a scaffold that repainted the page
per variant would be a theme rather than a chrome. And the two flat variants name no fill in
the recipe, which is what makes the tint follow the variant as it does everywhere else —
`<Scaffold color="#7c3aed">` is a brand title on the page's ground, exactly as a tinted
`ghost` button paints its label, while a tinted `secondary` is a brand bar with contrasted
ink.

`headerShadowVisible` is always `false`: the variant owns the header's edge, so the
navigator's own line never doubles the hairline `tertiary` draws.

The demo's `_layout.tsx` is now a `Scaffold` — its local `Shell` is deleted, and this app's
status bar and header are what the component resolved. `useAppearance` stays the answer for
a chrome the two slots do not reach.
