import { forwardRef, useId } from 'react'
import type { GestureResponderEvent } from 'react-native'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { useCascade } from '../../system/use-cascade'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useAppBar } from './app-bar.context'
import { appBarSheet } from './app-bar.style'
import type { AppBarMenuItemProps } from './app-bar.type'

/**
 * One entry of the menu: a word in the bar's ink, a Metro list row 48 tall. The entries
 * come in one after the other as the bar opens — the content cascade — and leave
 * together.
 *
 * ```tsx
 * <AppBar.Menu>
 *   <AppBar.MenuItem onPress={openSettings}>paramètres</AppBar.MenuItem>
 * </AppBar.Menu>
 * ```
 *
 * A press leans the row toward the finger, runs `onPress` and closes the bar. Disabled,
 * the word is grey. The case is the app's.
 */
export const AppBarMenuItem = forwardRef<View, AppBarMenuItemProps>(
  function AppBarMenuItem(
    {
      children,
      isDisabled = false,
      accessibilityRole = 'menuitem',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const bar = useAppBar()
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })
    const rank = bar.turns.turnOf(useId())
    const arriving = useCascade({ isOpen: bar.isOpen, rank, isStill: bar.isStill })
    const ink = isDisabled ? bar.ground.muted : bar.ground.foreground
    // Text — one string, or several pieces of it — is the entry's word, set by the bar.
    const text = childrenToString(children)

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      bar.close()
    }

    const Root = bar.isTilting ? PressTilt : PressableFeedback

    return (
      <Animated.View style={arriving}>
        <Root
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          animation={bar.isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          {...rest}
          style={[
            bar.styles.menuItem,
            appBarSheet.bare,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {text === null ? (
            children
          ) : (
            <Text
              numberOfLines={1}
              style={[bar.styles.menuItemLabel, { color: ink }]}
            >
              {text}
            </Text>
          )}
        </Root>
      </Animated.View>
    )
  }
)

AppBarMenuItem.displayName = 'XAUI.Tram.AppBar.MenuItem'
