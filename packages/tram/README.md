# @xaui/tram

Metro UI components for React Native and Expo — the Metro design language of Windows
Phone, modernised: flat fills, square corners, giant light type and one accent colour. Every component has the same name, slots
and props as its [`@xaui/native`](https://www.npmjs.com/package/@xaui/native) counterpart,
redrawn, on the same engine and theme. Tram adds the Metro signature pieces: Tile, Pivot,
Panorama, AppBar, JumpList and the turnstile page transition.

[![npm](https://img.shields.io/npm/v/@xaui/tram)](https://www.npmjs.com/package/@xaui/tram)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/rygrams/xaui/blob/main/LICENSE)

[Docs][docs] · [Getting started][getting-started] · [Components][components]

> **Pre-1.0.** A `0.x` release can still rename or remove a prop. Read the
> [release notes](https://github.com/rygrams/xaui/blob/main/packages/tram/CHANGELOG.md)
> before you update.

- **The Native API, drawn Metro** — `<Button>`, `<Button.Icon>`, `<Button.Label>`, as in
  `@xaui/native`. Moving a screen from one to the other is mostly an import path.
- **One colour to spend** — `variant` says how a box is drawn (`contained`, `flat`,
  `outline`, `text`); `accent` picks one of the twenty Metro accents.
- **Motion that moves** — a press tilts the control toward the finger, pages turn on a
  turnstile, lists arrive in cascade. All on Reanimated, all honouring reduced motion.
- **Black and white grounds** — pure black in dark mode, pure white in light.

## Installation

```bash
npm i @xaui/tram
```

`@xaui/tram` brings `@xaui/native` with it and has the same peers: React 18 or 19, React
Native 0.70+ and Reanimated 4 on the New Architecture. On Expo:

```bash
npx expo install react-native-reanimated react-native-worklets \
  react-native-gesture-handler react-native-svg react-native-safe-area-context
```

Add `react-native-worklets/plugin` last in your Babel plugins. The theme's type is
Selawik; load it under that name with `expo-font`, or give `createTramTheme` your own
`fontFamilies`.

## Usage

Mount `TramProvider` and the scaffold once, at the app root:

```tsx
import { Stack, useIsFocused } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Scaffold } from '@xaui/tram/scaffold'
import { TramProvider } from '@xaui/tram/theme'

const PAGES = { useIsFocused }
const SAFE_AREA = { useSafeAreaInsets }

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TramProvider colorMode="system" pages={PAGES} safeArea={SAFE_AREA}>
        <Scaffold>
          <Scaffold.StatusBar />
          <Scaffold.Navigator>
            <Stack />
          </Scaffold.Navigator>
        </Scaffold>
      </TramProvider>
    </GestureHandlerRootView>
  )
}
```

`TramProvider` is `XAUIProvider` with the Tram theme: a Native component rendered under it
is themed too. Tram ships no navigation, safe-area or haptics library — the app hands its
own hooks over once (`pages`, `safeArea`, `onHaptic`).

Then compose components from their subpaths:

```tsx
import { Button } from '@xaui/tram/button'

export function SaveButton() {
  return (
    <Button variant="contained" accent="cobalt" onPress={save}>
      <Button.Icon as={SaveIcon} />
      <Button.Label>save</Button.Label>
    </Button>
  )
}
```

## Components

70+ components, each documented with a live preview, its props and what it does unlike
Native, in the Tram section of the docs:

- **Metro** — Tile, Pivot, Panorama, AppBar, JumpList, Page
- **Actions** — Button, Fab, MorphButton, SlideButton, ToggleButton, CloseButton
- **Forms** — TextField, Select, Combobox, DatePicker, TimePicker, PhoneNumberField,
  InputOTP, Slider, Switch, and more
- **Data display** — Avatar, Badge, Chip, List, Table, Timeline, Carousel
- **Feedback** — Alert, Toast, Skeleton, ProgressBar, Spinner
- **Overlays** — Dialog, BottomSheet, Menu
- **Charts** — Area, Bar, Line, Pie, Radar and Radial charts
- **Layout** — Card, Surface, Scaffold, Divider, Row, Column, Stack, Grid

[Browse all components →][components]

## Coding with an AI agent

The docs publish an [llms.txt][llms] with a Markdown version of every Tram component page.

## Links

- [Documentation][docs]
- [GitHub](https://github.com/rygrams/xaui)
- [Issues](https://github.com/rygrams/xaui/issues)

## License

[MIT](https://github.com/rygrams/xaui/blob/main/LICENSE)

[docs]: https://ui.xtartapp.com/?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-tram
[getting-started]: https://ui.xtartapp.com/docs/tram/getting-started?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-tram
[components]: https://ui.xtartapp.com/docs/tram/components?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-tram
[llms]: https://ui.xtartapp.com/docs/llms-txt?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-tram
