import { StatusBar } from 'react-native'
import { useScaffold } from './scaffold.context'
import type { ScaffoldStatusBarProps } from './scaffold.type'

/**
 * The status bar, in the ink the mode asks for — light text on a dark app, and the reverse.
 *
 * ```tsx
 * <Scaffold.StatusBar />
 * <Scaffold.StatusBar translucent hidden={isPlaying} />
 * ```
 *
 * React Native's own `StatusBar`, not `expo-status-bar`: the values are the same and the
 * dependency is one the library already has. An app that prefers Expo's reads
 * `barContent` off `useAppearance` and renders it itself — the one-word spelling is there
 * for exactly that.
 *
 * `backgroundColor` is Android-only, and it is the **header's** ground rather than the
 * page's, because that is what the bar sits on.
 */
export function ScaffoldStatusBar({
  barStyle,
  backgroundColor,
  ...rest
}: ScaffoldStatusBarProps) {
  const { statusBar } = useScaffold()

  return (
    <StatusBar
      barStyle={barStyle ?? statusBar.barStyle}
      backgroundColor={backgroundColor ?? statusBar.backgroundColor}
      {...rest}
    />
  )
}

ScaffoldStatusBar.displayName = 'XAUI.Scaffold.StatusBar'
