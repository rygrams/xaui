import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { MenuItemProvider, useMenu } from './menu.context'
import type { MenuItemProps } from './menu.type'

/**
 * One action.
 *
 * It closes the menu after the caller's `onPress` has run, and in that order: a handler
 * that reads the menu's state has to run while there is still a menu. `closesOnPress`
 * turns it off for a row that toggles something the reader will want to toggle again.
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
  const { itemStyle, itemPressedStyle, glyph, close } = useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const handlePress = useCallback(
    (event: Parameters<NonNullable<MenuItemProps['onPress']>>[0]) => {
      onPress?.(event)
      if (closesOnPress) close()
    },
    [close, closesOnPress, onPress]
  )

  const context = useMemo(
    () => ({ variant, isPressed, isDisabled }),
    [variant, isPressed, isDisabled]
  )

  return (
    <MenuItemProvider value={context}>
      <IconContext.Provider value={glyph[variant]}>
        <PressableFeedback
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          {...rest}
          style={[
            itemStyle,
            isPressed && itemPressedStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {typeof children === 'function' ? children(context) : children}
        </PressableFeedback>
      </IconContext.Provider>
    </MenuItemProvider>
  )
})

MenuItem.displayName = 'XAUI.Menu.Item'
