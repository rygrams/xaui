import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAppBar, useAppBarButton } from './app-bar.context'
import type { AppBarLabelProps } from './app-bar.type'

/**
 * The word under a circle: a caption in the bar's ink, centred, on one line — cut past
 * the room the button has. Written as a child of an `AppBar.Button`, which lays it under
 * the circle and shows it while the bar is open, or always with `hasLabels`.
 *
 * It names the button and is not read a second time: the button takes its text as its
 * accessibility label, and the label itself is hidden from a screen reader.
 *
 * The case is the app's.
 */
export const AppBarLabel = forwardRef<Text, AppBarLabelProps>(function AppBarLabel(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { styles } = useAppBar()
  const { labelColor } = useAppBarButton()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      accessible={false}
      aria-hidden
      importantForAccessibility="no"
      accessibilityElementsHidden
      style={[styles.label, { color: labelColor }, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

AppBarLabel.displayName = 'XAUI.Tram.AppBar.Label'
