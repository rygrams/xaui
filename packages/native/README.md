# @xaui/native

Composable React Native UI components for Expo and React Native apps. Every component is a
root with dot-notation slots — `<Button>`, `<Button.Icon>`, `<Button.Label>` — so the JSX
you write is the layout you get. Motion runs on the UI thread through Reanimated, and one
theme, derived in OKLab, gives every component its light and dark palette.

[![npm](https://img.shields.io/npm/v/@xaui/native)](https://www.npmjs.com/package/@xaui/native)
[![downloads](https://img.shields.io/npm/dm/@xaui/native)](https://www.npmjs.com/package/@xaui/native)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/rygrams/xaui/blob/main/LICENSE)

![XAUI — ui.xtartapp.com: a Button, a Switch and a Slider](https://raw.githubusercontent.com/rygrams/xaui/main/assets/readme/cover.png)

[Docs][docs] · [Getting started][getting-started] · [Components][components]

> **Pre-1.0.** `0.9.x` releases are patch versions, and a patch can still rename or remove
> a prop until `1.0.0`. Read the [release notes][releases] before you update.

- **Explicit composition** — roots and slots, in JSX order. No hidden configuration props.
- **Motion on the UI thread** — interactions and transitions run on Reanimated 4.
- **Semantic theme** — a few source colours; soft, pressed and contrasting shades are
  derived for light and dark mode.
- **Plain React Native styles** — `style` and style props on the node they belong to, with
  no implicit spacing scale.
- **One typed entry point per component** — `@xaui/native/button` pulls in the button, not
  the library.

## Installation

```bash
npm i @xaui/native
```

XAUI needs React 18 or 19, React Native 0.70+ and Reanimated 4. On Expo, let Expo pick the
native versions:

```bash
npx expo install react-native-reanimated react-native-worklets \
  react-native-gesture-handler react-native-svg react-native-safe-area-context
```

On the React Native Community CLI, install the same packages with `npm i`, run
`pod install`, and add `react-native-worklets/plugin` last in your Babel plugins. The
[installation guide][installation] lists which peer each component needs.

## Usage

Mount the provider once, at the app root:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { XAUIProvider } from '@xaui/native/theme'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <XAUIProvider colorMode="system">
        <YourApp />
      </XAUIProvider>
    </GestureHandlerRootView>
  )
}
```

Then compose components from their subpaths:

```tsx
import { Button } from '@xaui/native/button'

export function SaveButton() {
  return (
    <Button variant="primary" onPress={save}>
      <Button.Icon as={SaveIcon} />
      <Button.Label>Save</Button.Label>
    </Button>
  )
}
```

Your brand colours go through `createTheme` — see the [theme guide][theme].

## Components

70+ components, each documented with a live preview and its props:

- **Actions** — Button, Fab, MorphButton, SlideButton, ToggleButton
- **Forms** — TextField, Select, Combobox, DatePicker, TimePicker, PhoneNumberField,
  InputOTP, Slider, Switch, and 17 more
- **Data display** — Avatar, Badge, Chip, List, Table, Timeline, Carousel, Widget
- **Feedback** — Alert, Toast, Snackbar, Skeleton, ProgressBar, Spinner
- **Overlays** — Dialog, BottomSheet, Menu, Popover
- **Navigation** — Tabs, Accordion, Stepper, Pager, Calendar
- **Charts** — Area, Bar, Line, Pie, Radar and Radial charts
- **Layout** — Card, Surface, Scaffold, Divider, Row, Column, Stack, Grid

[Browse all components →][components]

## Coding with an AI agent

Install the XAUI skill so your agent reads the real API instead of guessing it:

```bash
npx skills add https://ui.xtartapp.com/skills/xaui/SKILL.md
```

The docs also publish an [llms.txt][llms] and a Markdown version of every component page.

## Upgrading from 0.2.x

Version 0.9 is a new API. The previous components are still available, frozen, as
[`@xaui/native-legacy`](https://www.npmjs.com/package/@xaui/native-legacy), and both
packages run side by side while you move screen by screen. The [migration guide][migration]
maps the old props to the new ones.

## On the web

[`@xaui/hybrid`](https://www.npmjs.com/package/@xaui/hybrid) re-exports this package over
`react-native-web`: the same components, props and theme, in the browser.

## Links

- [Documentation][docs]
- [Release notes][releases]
- [GitHub](https://github.com/rygrams/xaui)
- [Issues](https://github.com/rygrams/xaui/issues)

## License

[MIT](https://github.com/rygrams/xaui/blob/main/LICENSE)

[docs]: https://ui.xtartapp.com/?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[getting-started]: https://ui.xtartapp.com/docs/getting-started?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[installation]: https://ui.xtartapp.com/docs/installation?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[components]: https://ui.xtartapp.com/docs/components?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[theme]: https://ui.xtartapp.com/docs/theme?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[llms]: https://ui.xtartapp.com/docs/llms-txt?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[migration]: https://ui.xtartapp.com/docs/migration?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
[releases]: https://ui.xtartapp.com/docs/releases?utm_source=npm&utm_medium=referral&utm_campaign=evergreen&utm_content=readme-native
