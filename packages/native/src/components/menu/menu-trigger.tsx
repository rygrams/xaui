import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { useAnchorRef } from '../../hooks/use-anchor-ref'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuTriggerProps } from './menu.type'

/**
 * What opens the panel, and the rectangle it is anchored to.
 *
 * It paints nothing of its own: a menu's trigger is usually a `Button`, an `Icon` or a
 * word in a sentence, and giving it a surface would put a second box around one of those.
 * `asChild` is the normal way to write it.
 */
export const MenuTrigger = forwardRef<View, MenuTriggerProps>(function MenuTrigger(
  {
    children,
    asChild = false,
    accessibilityRole = 'button',
    accessibilityState,
    style,
    onLayout,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { triggerStyle, isOpen, isDisabled, toggle, setAnchor } = useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const anchor = useAnchorRef({ isOpen, onAnchor: setAnchor, onLayout })
  const refs = useMergedRef(anchor.node, ref)

  const handlePress = useCallback(
    (event: Parameters<NonNullable<MenuTriggerProps['onPress']>>[0]) => {
      onPress?.(event)
      // Before the toggle, so the panel's first pass already has the right rectangle
      // rather than positioning against a stale one and jumping.
      anchor.measure()
      toggle()
    },
    [anchor, onPress, toggle]
  )

  return (
    <PressableFeedback
      ref={refs}
      isPressed={isPressed}
      isDisabled={isDisabled}
      asChild={asChild}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: isDisabled,
        expanded: isOpen,
        ...accessibilityState,
      }}
      {...rest}
      onLayout={anchor.onLayout}
      style={[
        triggerStyle,
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children}
    </PressableFeedback>
  )
})

MenuTrigger.displayName = 'XAUI.Menu.Trigger'
