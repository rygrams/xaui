# Scaffold

The app's chrome in Tram: the ground under every screen, the status bar over it, and the
options the app's navigator is dressed with — drawn flat, with no shadow, and the title at
the start of its line.

`Scaffold` depends on no navigator. `Scaffold.Navigator` clones the app's own navigator
and merges the theme's options under its `screenOptions`, so a Stack, Tabs or a Drawer —
Expo Router or React Navigation — are dressed by the same component. Routing, the safe
area and the colour-mode toggle stay the app's.

## Import

```tsx
import { Scaffold } from '@xaui/tram/scaffold'
```

## Anatomy

```tsx
<Scaffold>
  <Scaffold.StatusBar />
  <Scaffold.Navigator>{/* the app's navigator */}</Scaffold.Navigator>
</Scaffold>
```

- **`Scaffold`** — the ground: a view in the page's colour under every screen. It resolves
  the chrome once and hands it to its slots.
- **`Scaffold.StatusBar`** — React Native's own `StatusBar`, in the ink that reads on the
  header's ground. Every `StatusBarProps` is accepted, and what you write wins.
- **`Scaffold.Navigator`** — takes exactly one element, the app's navigator, and clones it
  with the theme's screen options. It has no `asChild` and no default element, and throws
  when handed anything else.

## Usage

### Basic

```tsx
export default function RootLayout() {
  return (
    <TramProvider colorMode={colorMode}>
      <Scaffold>
        <Scaffold.StatusBar />
        <Scaffold.Navigator>
          <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }}>
            <Stack.Screen name="index" options={{ title: 'home' }} />
          </Stack>
        </Scaffold.Navigator>
      </Scaffold>
    </TramProvider>
  )
}
```

`Scaffold` sits under `TramProvider`, which resolves the theme it reads.

### The merge gives the app the last word

The theme's options go **under** the navigator's own, through Native's
`mergeScreenOptions`: the style keys blend, every other key is the app's, and a function
`screenOptions` stays a function.

```tsx
<Scaffold.Navigator>
  <Stack screenOptions={{ headerStyle: { height: 96 } }} />
</Scaffold.Navigator>
// → headerStyle: { backgroundColor: <theme>, height: 96 }
```

The options are Native's five — `headerStyle`, `headerTintColor`, `headerTitleStyle`,
`headerShadowVisible` (always `false`) and `contentStyle` — and a sixth,
`headerTitleAlign: 'left'`. iOS's native stack ignores the alignment and keeps its title
centred.

### With Tram pages

A screen that renders a Tram [`Page`](/docs/components/page?package=tram) carries its own transition. Turn
the navigator's animation off on those screens, one by one, with `pageScreenOptions` from
`@xaui/tram/page`.

### `useScaffold`

```tsx
const { screenOptions, statusBar } = useScaffold()
```

The resolved values, for a chrome the slots do not reach — a drawer's `drawerStyle`, a tab
bar, an Android navigation-bar module.

### `asChild`

```tsx
<Scaffold asChild>
  <GestureHandlerRootView />
</Scaffold>
```

Merges the ground into the view the app already has. The ground's `ViewStyle` keys are
props too, so `backgroundColor` lets a page painted from an image show through.

## Variants

How much the header separates from the page:

| Variant     | The header                                          |
| ----------- | --------------------------------------------------- |
| `ghost`     | the page's ground, no edge — the default            |
| `tertiary`  | the page's ground, closed by a line of 2 in `muted` |
| `secondary` | the discreet surface                                |
| `primary`   | a flat fill of the accent, its ink `onAccent`       |

Metro had no bar at all — the app's name and the page's title sat on the ground — which
is why `ghost` stays the default. The title is on the Tram `title` role, SemiLight.

## Colour

`accent` picks one of the twenty named accents; `color` takes a raw tint and wins. Either
fills the bar of a `primary` or a `secondary`, and is the title's ink — read on the page —
on a `tertiary` or a `ghost`.

```tsx
<Scaffold variant="primary" accent="lime">
  …
</Scaffold>
```

## Accessibility

- The status bar's ink is the one that reads on the header's own ground: a lime bar gets
  dark icons in the dark mode too. Under `primary` and `secondary`, its Android background
  is the bar's colour.
- The back arrow and the header's icons follow the title's ink (`headerTintColor`).
- Nothing here moves; transitions belong to the navigator.

## Differences from Native

- **`accent`** is added: it fills the bar of `primary` and `secondary`, and is the title's
  ink on `tertiary` and `ghost`.
- **The edge** of `tertiary` is a line of 2 in `muted`, not the theme's `border` hairline.
- **The title** is left-aligned (`headerTitleAlign: 'left'`), which iOS's native stack
  ignores.
- **The status bar** follows the bar's ground rather than the colour mode alone.
- **`mergeScreenOptions`** and its two types are not re-exported: import them from
  `@xaui/native/scaffold`.
