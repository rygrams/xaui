# @xaui/native

Composable React Native UI components for Expo and React Native apps. Every component is a
root with dot-notation slots — `<Button>`, `<Button.Icon>`, `<Button.Label>` — so the JSX
you write is the layout you get. Motion runs on the UI thread through Reanimated, and one
theme, derived in OKLab, gives every component its light and dark palette.

**[Documentation → ui.xtartapp.com](https://ui.xtartapp.com/docs/introduction)**

- **Explicit composition** — roots and slots, in JSX order. No hidden configuration props.
- **Motion on the UI thread** — interactions and transitions run on Reanimated 4.
- **Semantic theme** — a few source colours; soft, pressed and contrasting shades are
  derived for light and dark mode.
- **Plain React Native styles** — `style` and style props on the node they belong to, with
  no implicit spacing scale.
- **One typed entry point per component** — `@xaui/native/button` pulls in the button, not
  the library.

Buttons, text fields, selects, date and time pickers, calendars, dialogs, bottom sheets,
menus, tabs, toasts, tables, charts and more — browse the
[component catalogue](https://ui.xtartapp.com/docs/components).

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
[installation guide](https://ui.xtartapp.com/docs/installation) lists which peer each
component needs.

## Usage

Mount the provider once, at the app root:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { XAUIProvider } from '@xaui/native/theme'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <XAUIProvider>
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

Your brand colours go through `createTheme` — see the
[quick start](https://ui.xtartapp.com/docs/getting-started) and the
[theme guide](https://ui.xtartapp.com/docs/theme).

## On the web

[`@xaui/hybrid`](https://www.npmjs.com/package/@xaui/hybrid) re-exports this package over
`react-native-web`: the same components, props and theme, in the browser.

## Links

- [Documentation](https://ui.xtartapp.com/docs/introduction)
- [Components](https://ui.xtartapp.com/docs/components)
- [Releases](https://ui.xtartapp.com/docs/releases)
- [Issues](https://github.com/rygrams/xaui/issues)

## License

MIT
