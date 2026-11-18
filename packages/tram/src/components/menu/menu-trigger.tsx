import { forwardRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import type {
  AccessibilityActionEvent,
  AccessibilityActionInfo,
  GestureResponderEvent,
  LayoutChangeEvent,
  View,
} from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useMergedRef, usePressState } from '@xaui/native'
import {
  PressableFeedback,
  Slot,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useMenu } from './menu.context'
import { liftFor } from './menu.place'
import type { MenuTriggerProps } from './menu.type'

/** What a disabled menu opened on a press hands the caller's element: it draws itself grey. */
const DISABLED = { isDisabled: true, disabled: true }

/** The hold, offered to a screen reader — which cannot hold. */
const LONG_PRESS = 'longpress'

/**
 * What opens the menu. It paints nothing of its own — a menu's trigger is the caller's
 * element far more often than not: `asChild`. Otherwise it leans toward the finger, and
 * a string is set in `body`.
 *
 * `opensOn="longPress"` is the Metro context menu: the element keeps its press — a row
 * still opens its message — and a hold opens the menu, felt as a `longPress`. A screen
 * reader is offered the hold as an action. While the menu is disabled the hold opens
 * nothing and the element is left as it is; a menu opened on a press greys it instead.
 *
 * It is wrapped in one view, which stays in front while the page recedes: grown back by
 * as much as the page shrinks, and moved back out by as much as it comes in.
 */
export const MenuTrigger = forwardRef<View, MenuTriggerProps>(function MenuTrigger(
  {
    children,
    asChild = false,
    opensOn = 'press',
    accessibilityState,
    accessibilityActions,
    style,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    onAccessibilityAction,
    onLayout,
    ...props
  },
  ref
) {
  const {
    triggerStyle,
    triggerLabelStyle,
    isOpen,
    isDisabled,
    isStill,
    open,
    toggle,
    motion,
    holder,
    bounds,
    trigger,
  } = useMenu()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })
  const haptic = useTramHaptic()
  const refs = useMergedRef(trigger, ref)
  const { depth, offset } = motion

  const lifted = useAnimatedStyle(() => {
    'worklet'
    const lift = liftFor(depth.value, offset.value)

    return {
      transform: [
        { translateX: lift.translateX },
        { translateY: lift.translateY },
        { scale: lift.scale },
      ],
    }
  }, [depth, offset])

  const isHeld = opensOn === 'longPress'

  const hold = () => {
    if (isDisabled) return
    haptic('longPress')
    open()
  }

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event)
    if (!isHeld && !isDisabled) toggle()
  }

  const handleLongPress = (event: GestureResponderEvent) => {
    onLongPress?.(event)
    if (isHeld) hold()
  }

  // Its box inside the view around it: what the ground is not dimmed over.
  const handleLayout = (event: LayoutChangeEvent) => {
    bounds.current = event.nativeEvent.layout
    onLayout?.(event)
  }

  const handleAction = (event: AccessibilityActionEvent) => {
    onAccessibilityAction?.(event)
    if (isHeld && event.nativeEvent.actionName === LONG_PRESS) hold()
  }

  const actions: readonly AccessibilityActionInfo[] | undefined = isHeld
    ? [...(accessibilityActions ?? []), { name: LONG_PRESS }]
    : accessibilityActions

  const drawn = typeof style === 'function' ? style({ pressed: isPressed }) : style
  const owned = {
    // Merged, not spread over: a caller naming another state must not drop these.
    accessibilityState: {
      ...(isHeld ? null : { disabled: isDisabled }),
      expanded: isOpen,
      ...accessibilityState,
    },
    accessibilityActions: actions,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu' as const,
  }

  let pressable

  if (asChild) {
    pressable = (
      <Slot
        ref={refs}
        {...owned}
        {...rest}
        {...(isDisabled && !isHeld ? DISABLED : undefined)}
        style={[styleProps, drawn]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onAccessibilityAction={handleAction}
        onLayout={handleLayout}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
      </Slot>
    )
  } else {
    const text = childrenToString(children)
    // Under an ancestor's `disable-all` it does not lean either.
    const Box = isStill ? PressableFeedback : PressTilt

    pressable = (
      <Box
        ref={refs}
        isPressed={isPressed}
        isDisabled={isDisabled && !isHeld}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        // A default: the caller's own role, in `rest`, wins — as it does under `asChild`.
        accessibilityRole="button"
        {...owned}
        {...rest}
        style={[triggerStyle, styleProps, drawn]}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPress={handlePress}
        onLongPress={handleLongPress}
        onAccessibilityAction={handleAction}
        onLayout={handleLayout}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {text !== null ? <Text style={triggerLabelStyle}>{text}</Text> : children}
      </Box>
    )
  }

  return (
    <Animated.View
      ref={holder}
      // Kept as a node: it is what is measured, and what stays in front.
      collapsable={false}
      style={[held.box, lifted]}
    >
      {pressable}
    </Animated.View>
  )
})

MenuTrigger.displayName = 'XAUI.Tram.Menu.Trigger'

const held = StyleSheet.create({
  // As wide as its parent gives it, like the element it holds would have been.
  box: { alignSelf: 'stretch' },
})
