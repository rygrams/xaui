import { forwardRef, useCallback } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { FabMenuLabel } from './fab-menu-label'
import { useFabMenu } from './fab-menu.context'
import type { FabMenuItemProps } from './fab-menu.type'

/**
 * One action, as its own pill.
 *
 * ```tsx
 * <FabMenu.Item onPress={compose}>Nouveau message</FabMenu.Item>
 *
 * <FabMenu.Item onPress={label}>
 *   <FabMenu.Icon as={TagIcon} />
 *   <FabMenu.Label>Nouveau libellé</FabMenu.Label>
 * </FabMenu.Item>
 * ```
 *
 * R3 — a bare string is wrapped in a `FabMenu.Label`, so the common case is one line.
 *
 * It closes the menu after the caller's `onPress` has run, and in that order: a handler
 * that reads the menu's state has to run while there is still a menu. `closesOnPress`
 * turns it off for an action the reader will want twice.
 *
 * **The press feedback is the shared one**, unlike a `Menu`'s row, which darkens instead. A
 * row is a full-width strip inside a panel and the scale treatment reads as the panel
 * twitching; a pill is a small floating button — the same object the FAB above it is — and
 * the treatment written once in this library is exactly right on it.
 */
export const FabMenuItem = forwardRef<View, FabMenuItemProps>(function FabMenuItem(
  {
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
  const {
    itemStyle,
    itemDisabledStyle,
    glyph,
    isDisabled: menuDisabled,
    close,
  } = useFabMenu()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  // A menu that is off takes its actions with it, and an action can also be spent on its
  // own — one face for both, applied once, so the two never compound into a quarter.
  const isSpent = isDisabled || menuDisabled

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
      if (closesOnPress) close()
    },
    [close, closesOnPress, onPress]
  )

  const text = childrenToString(children)

  return (
    <IconContext.Provider value={glyph}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isSpent}
        asChild={asChild}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isSpent, ...accessibilityState }}
        {...rest}
        style={[
          itemStyle,
          isSpent && itemDisabledStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {text !== null ? <FabMenuLabel>{text}</FabMenuLabel> : children}
      </PressableFeedback>
    </IconContext.Provider>
  )
})

FabMenuItem.displayName = 'XAUI.FabMenu.Item'
