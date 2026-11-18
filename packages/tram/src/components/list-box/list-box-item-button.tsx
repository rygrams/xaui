import { forwardRef } from 'react'
import type { View } from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { ListBoxRowProvider, useListBox } from './list-box.context'
import type { ListBoxItemButtonProps } from './list-box.type'

/**
 * A row you can press, used **in place of** `ListBox.Item`. It is the same row — same
 * height, same slots — and the press is the Metro one: the row leans toward the finger
 * and shrinks a little, its colours unchanged. A row is wide, so it leans by the wide
 * angle. Felt as the finger lands, through `TramProvider`'s `onHaptic`, as a `press`.
 *
 * The touch lands on the row, never on what is inside it: a `Switch` in its suffix is
 * moved by the row's `onPress`, and springs once, for its new value. A control that must
 * keep its own press and its own role goes in a `ListBox.Item`.
 *
 * Disabled — by its own prop or by the list's — it is grey, its square too, and it does
 * not move. With motion reduced, or under `disable-all`, it does not lean.
 */
export const ListBoxItemButton = forwardRef<View, ListBoxItemButtonProps>(
  function ListBoxItemButton(
    {
      children,
      isDisabled = false,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const { live, grey, isDisabled: isListDisabled } = useListBox()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const isStill = useAnimationDisabled()
    const isReduced = useReducedMotion()
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })

    const disabled = isListDisabled || isDisabled
    const row = disabled ? grey : live

    const isFlat = isStill || isReduced
    const Row = isFlat ? PressableFeedback : PressTilt
    const lean = isFlat ? undefined : { depth: scale.row }

    return (
      <ListBoxRowProvider value={row}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={disabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          // Merged, not spread over: a caller naming another state keeps this one.
          accessibilityState={{ disabled, ...accessibilityState }}
          {...lean}
          {...rest}
          style={[
            row.itemStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children}
        </Row>
      </ListBoxRowProvider>
    )
  }
)

ListBoxItemButton.displayName = 'XAUI.Tram.ListBox.ItemButton'
