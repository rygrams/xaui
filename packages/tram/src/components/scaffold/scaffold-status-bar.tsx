import { StatusBar } from 'react-native'
import { useScaffold } from './scaffold.context'
import type { ScaffoldStatusBarProps } from './scaffold.type'

/**
 * The status bar, on the header's ground and in the ink that reads there.
 *
 * ```tsx
 * <Scaffold.StatusBar />
 * <Scaffold.StatusBar translucent hidden={isPlaying} />
 * ```
 *
 * React Native's own `StatusBar`. Under a `primary` or a `secondary` it takes the bar's
 * fill on Android, as the Windows Phone system tray took the app's colour; what the
 * caller writes wins.
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

ScaffoldStatusBar.displayName = 'XAUI.Tram.Scaffold.StatusBar'
