import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import { IconContext, PressableFeedback, useStyleProps } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { MenuItemProvider, useMenu } from './menu.context'
import type { MenuItemProps } from './menu.type'

/**
 * One action: a row the width of the panel. The press is the Metro one — the row leans
 * toward the finger and shrinks a little, its colours unchanged — felt as a `press`.
 *
 * It closes the menu after the caller's `onPress` has run, and in that order: a handler
 * that reads the menu's state has to run while there is still a menu. `closesOnPress`
 * turns it off for a row that toggles something the reader will want to toggle again.
 *
 * Disabled, its title is grey and it does not move. With motion reduced, or under
 * `disable-all`, it does not lean.
 */
export const MenuItem = forwardRef<View, MenuItemProps>(function MenuItem(
  {
    variant = 'default',
    children,
    isDisabled = false,
    closesOnPress = true,
    asChild = false,
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
  const { itemStyle, glyph, isStill, close } = useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()
  const isReduced = useReducedMotion()
  const [isPressed, press] = usePressState({
    onPressIn: event => {
      haptic('press')
      onPressIn?.(event)
    },
    onPressOut,
  })

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event)
    if (closesOnPress) close()
  }

  const context = useMemo(
    () => ({ variant, isPressed, isDisabled }),
    [variant, isPressed, isDisabled]
  )

  const isFlat = isStill || isReduced
  const Row = isFlat ? PressableFeedback : PressTilt
  const lean = isFlat ? undefined : { depth: scale.row }

  return (
    <MenuItemProvider value={context}>
      <IconContext.Provider value={glyph[isDisabled ? 'grey' : variant]}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          // Merged, not spread over: a caller naming another state keeps this one.
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          {...lean}
          {...rest}
          style={[
            itemStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {typeof children === 'function' ? children(context) : children}
        </Row>
      </IconContext.Provider>
    </MenuItemProvider>
  )
})

MenuItem.displayName = 'XAUI.Tram.Menu.Item'
