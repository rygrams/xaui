import { forwardRef } from 'react'
import { Text } from 'react-native'
import type { StyleProp, View, ViewStyle } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  Slot,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { useDialog } from './dialog.context'
import type { DialogTriggerProps } from './dialog.type'

type DialogPressProps = DialogTriggerProps & {
  isDisabled?: boolean
  /** The slot's own box, for when it is not the caller's element. */
  boxStyle: StyleProp<ViewStyle>
}

/** What a disabled dialog hands the caller's element: a Tram `Button` draws itself grey. */
const DISABLED = { isDisabled: true, disabled: true }

/**
 * What `Dialog.Trigger` and `Dialog.Close` have in common: something pressed that paints
 * nothing of its own. Under `asChild` it is the caller's element, which keeps its own
 * press — a `Button` tilts and is felt by itself. Otherwise it leans toward the finger,
 * and a string is set in `body`.
 */
export const DialogPress = forwardRef<View, DialogPressProps>(function DialogPress(
  {
    children,
    asChild = false,
    isDisabled = false,
    boxStyle,
    style,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { labelStyle, isStill } = useDialog()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })
  const drawn = typeof style === 'function' ? style({ pressed: isPressed }) : style

  if (asChild) {
    return (
      <Slot
        ref={ref}
        {...rest}
        {...(isDisabled ? DISABLED : undefined)}
        style={[styleProps, drawn]}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
      </Slot>
    )
  }

  const text = childrenToString(children)
  // Under an ancestor's `disable-all` it does not lean either.
  const Box = isStill ? PressableFeedback : PressTilt

  return (
    <Box
      ref={ref}
      isPressed={isPressed}
      isDisabled={isDisabled}
      // Native's scale, highlight and ripple stay off: the press is the tilt alone.
      animation={isStill ? 'disable-all' : false}
      // A default: the caller's own role, in `rest`, wins — as it does under `asChild`.
      accessibilityRole="button"
      {...rest}
      style={[boxStyle, styleProps, drawn]}
      // After `rest`, and composed: the caller's handlers run inside these.
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {text !== null ? <Text style={labelStyle}>{text}</Text> : children}
    </Box>
  )
})

DialogPress.displayName = 'XAUI.Tram.Dialog.Press'
