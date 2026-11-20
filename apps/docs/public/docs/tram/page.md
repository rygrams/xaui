# Page

A screen that arrives and leaves the Metro way: by default the whole page turns around the
screen's start edge like a door — out on the exit curve, in on the `navigation` spring —
and comes back the same way when it is focused again.

`Page` is Tram's own, with no Native equivalent. It depends on no navigation library: the
app hands its navigator's focus hook to `TramProvider`, and `usePageLeave` plays the way out
before the app navigates. While it is focused, a `Page` is also what a context menu makes
recede.

## Import

```tsx
import { Page, pageScreenOptions, usePageLeave } from '@xaui/tram/page'
```

## Anatomy

```tsx
<Page>{/* the screen */}</Page>
```

- **`Page`** — the root, an animated view that fills the screen with the theme's background,
  edge to edge. It takes `View`'s props and the style props. It has no `asChild`: the root
  is the view that moves.

## Setup

Two things, once, in the layout that holds the navigator.

**The focus hook.** Hand `TramProvider` your navigator's `useIsFocused` — Expo Router's or
React Navigation's. That is how a page learns it was covered or uncovered:

```tsx
import { Stack, useIsFocused } from 'expo-router' // or '@react-navigation/native'
import { pageScreenOptions } from '@xaui/tram/page'
import { TramProvider } from '@xaui/tram/theme'

const PAGES = { useIsFocused }

export default function Layout() {
  return (
    <TramProvider pages={PAGES}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="mail" options={{ ...pageScreenOptions }} />
      </Stack>
    </TramProvider>
  )
}
```

Pass the hook itself, always the same one. Without it a page still arrives, but has no way
out and no way back to play.

**The navigator's animation, per screen.** `pageScreenOptions` (`{ animation: 'none' }`)
turns the navigator's own push and pop off, so the `Page` is the only thing that moves.
Spread it on the screens that render a `Page`, not on the whole `Stack`: a screen that is
not a `Page` would then appear with no animation at all.

## Usage

### A page

```tsx
// app/mail.tsx
export default function Mail() {
  return <Page>{/* … */}</Page>
}
```

Arriving needs nothing else.

### Leaving

```tsx
const leave = usePageLeave()
const router = useRouter()

<Button onPress={() => leave(() => router.push('/mail'))}>mail</Button>
<Button onPress={() => leave(() => router.back(), 'backward')}>back</Button>
```

The focused page turns away, then the function runs. The direction is `forward` by default,
or `backward`. With no `Page` on screen, or no focus hook on the provider, the function runs
at once. A page left without `usePageLeave` — by the system's back or a header button —
still comes back on its own when it is focused again.

### Transitions

```tsx
<TramProvider pages={{ useIsFocused, transition: 'slide' }}>…</TramProvider>

<Page transition="fade">…</Page>
```

| Transition  | Drawn as                                       |
| ----------- | ---------------------------------------------- |
| `turnstile` | the page turns around the screen's start edge  |
| `slide`     | the page comes in from the end side, and fades |
| `fade`      | the page fades                                 |
| `none`      | the page is there or it is not                 |

`turnstile` is the default. The provider's `transition` applies to every page; a page's own
`transition` wins.

### The context menu recede

While a `Page` is focused, a `Menu` with a `Menu.Overlay` opened anywhere on it makes it
recede to 95 % around its centre, and the menu's trigger stays in front, in place and at its
size. Nothing needs wiring beyond the setup above.

## Accessibility

- With motion reduced, every transition but `none` becomes a fade, and the page does not
  recede behind a context menu.
- Under an ancestor's `disable-all`, a page is there or it is not, and `leave` navigates at
  once.
- The turnstile's hinge is mirrored in right-to-left layouts.
