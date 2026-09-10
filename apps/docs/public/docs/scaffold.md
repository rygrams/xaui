# Scaffold

The app's chrome, painted from the theme: the ground under every screen, the status bar
over it, and the options the navigator is dressed with.

## Import

```tsx
import { Scaffold } from '@xaui/native/scaffold'
```

## Usage

```tsx
export default function RootLayout() {
  return (
    <XAUIProvider colorMode={colorMode}>
      <Scaffold>
        <Scaffold.StatusBar />
        <Scaffold.Navigator>
          <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }}>
            <Stack.Screen name="index" options={{ title: 'Accueil' }} />
          </Stack>
        </Scaffold.Navigator>
      </Scaffold>
    </XAUIProvider>
  )
}
```

It has to be **under** `XAUIProvider`, which is what resolves the theme it reads.

## It depends on no navigator

`@xaui/native` has no dependency on `expo-router`, on `@react-navigation/native` or on
`expo-status-bar` — not a real one, not an optional peer, not a type import. This component
does not change that.

`Scaffold.Navigator` takes the app's own navigator **as its child** and clones it with five
style keys merged into its `screenOptions`. Those keys are React Navigation's spelling,
declared structurally here as `ScaffoldScreenOptions`, and the navigator is the thing that
knows what to do with them. So a `Stack`, a `Tabs`, a `Drawer`, Expo Router or React
Navigation on its own are all dressed by the same component, and the library imports none
of them.

**Routing stays entirely the app's.** Nothing here writes a route, wraps a screen or
touches what the navigator was configured with: `initialRouteName`, the `Screen` children,
a nested layout and the navigator's own type all pass through untouched.

## A ladder, not four emphases

| variant     | header fill  | header edge | title ink           |
| ----------- | ------------ | ----------- | ------------------- |
| `primary`   | `accent`     | —           | `accentForeground`  |
| `secondary` | `surface`    | —           | `surfaceForeground` |
| `tertiary`  | `background` | `border`    | `foreground`        |
| `ghost`     | `background` | —           | `foreground`        |

It says **how much the header separates from the page**, from a bar you cannot miss down to
no bar at all. `ghost` is the default: a header painted in the page's own colour, which is
the arrangement almost every app now wants.

The page's ground is the theme's `background` under every variant. A scaffold that
repainted the page per variant would be a theme rather than a chrome — the variant is about
the bar.

There is no `success` / `warning` / `danger`: chrome reports nothing.

### The tint follows the variant

`color` is a raw value (R7), and it lands where the variant put its tokens, as everywhere
else in the library:

- `primary` and `secondary` — the **bar**, with contrasted ink derived in OKLab.
- `tertiary` — the **title and the hairline**, on the page's own ground.
- `ghost` — the **title** alone.

That is why the two flat variants name no fill in the recipe. A ghost button paints its
label in the tint because it declared no background to take it, and this is the same
declaration: `<Scaffold color="#7c3aed">` is a brand title on the page's ground, not a
violet page.

## Slots

| slot                 | renders                     | notes                                    |
| -------------------- | --------------------------- | ---------------------------------------- |
| `Scaffold.StatusBar` | React Native's `StatusBar`  | The ink is the **opposite** of the mode  |
| `Scaffold.Navigator` | the app's navigator, cloned | Exactly one element, and it stays itself |

`Scaffold.StatusBar` takes every `StatusBarProps`, and what you write wins over what was
resolved — `translucent` and `hidden` are the app's call, and nothing about them is in the
theme. An app that prefers `expo-status-bar` reads `barContent` off `useAppearance` and
renders it itself; the one-word spelling is there for exactly that.

`Scaffold.Navigator` has **no `asChild`**. The prop distinguishes "render yourself" from
"dress my element", and this slot has only the second mode — there is no navigator XAUI
could render in place of the app's. Give it anything but a single element and it throws by
name.

### The merge gives the app the last word

The theme's options go **under** the navigator's own, key by key, and the three style keys
blend rather than choose:

```tsx
<Scaffold.Navigator>
  <Stack screenOptions={{ headerStyle: { height: 96 } }} />
</Scaffold.Navigator>
// → headerStyle: { backgroundColor: <theme>, height: 96 }
```

That is what `mergeScreenOptions` exists for: `mergeProps` would hand the app's
`headerStyle` the whole key, and a navigator asked for a taller header would lose its
ground with it. The function form of `screenOptions` is preserved as a function, because
React Navigation calls it per route.

## Props

| prop      | type              | default | description                   |
| --------- | ----------------- | ------- | ----------------------------- |
| `variant` | `ScaffoldVariant` | `ghost` | How much the header separates |
| `color`   | `string`          | —       | The tint (R7) — a raw value   |
| `asChild` | `boolean`         | `false` | Renders the caller's element  |

Everything else is a style prop (R14) — the ground is a view like any other, so
`backgroundColor` is how an app that paints its page from an image or a gradient gets out
of the way of the theme's flat ground.

```tsx
<Scaffold asChild>
  <GestureHandlerRootView />
</Scaffold>
```

`asChild` merges the ground into the view the app already has, which is one node instead of
two.

## `useScaffold`, for a chrome the slots do not reach

```tsx
const { screenOptions, statusBar } = useScaffold()
```

Resolved values, never props to resolve again (R5). It is what an app spreads by hand onto
a navigator with keys of its own — a drawer's `drawerStyle`, a tab bar — or hands to an
Android navigation-bar module.

Outside a `<Scaffold>`, `useAppearance` is the same four values with no wiring: this
component _is_ `useAppearance` with the wiring done.

## What it deliberately does not do

- **No safe-area inset.** The navigator's header already owns the top one, and a scaffold
  adding its own would fight `react-native-safe-area-context` for the bottom.
- **No header of its own.** A header belongs to whichever navigator the app chose, and a
  status bar belongs to the platform. This hands both what they ask for.
- **No colour-mode toggle.** Which control flips the mode, and where it sits, is the app's
  — write it into the navigator's `headerRight` and the merge lets it through.
