import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressRow } from '../../system/press-row'
import { useTramHaptic } from '../../theme/tram-haptics'
import { NumberPadCellProvider, useNumberPad } from './number-pad.context'
import type { NumberPadCellTone, NumberPadKeyProps } from './number-pad.type'

type NumberPadCellProps = Omit<NumberPadKeyProps, 'value'> & {
  tone: NumberPadCellTone
  onActivate?: () => void
}

/**
 * One cell of the grid — a digit, the backspace, the free corner. Each owns its press, so
 * pressing one moves no other. The press is a row's: what the cell holds shrinks a little
 * and springs back — a bare cell has no box to lean. No colour moves.
 *
 * Internal: `NumberPad.Key`, `.Backspace` and `.Action` are this with a tone and an edit.
 */
export const NumberPadCell = forwardRef<View, NumberPadCellProps>(
  function NumberPadCell(
    {
      tone,
      onActivate,
      children,
      isDisabled,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const pad = useNumberPad()
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({
      // Felt as the finger lands, as a key is.
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })

    const motion = resolveAnimation(undefined, useAnimationDisabled())
    const Press = motion.scale ? PressRow : PressableFeedback

    const disabled = isDisabled ?? pad.isDisabled

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      onActivate?.()
    }

    const context = useMemo(
      () => ({ tone, isPressed, isDisabled: disabled }),
      [tone, isPressed, disabled]
    )

    return (
      <Press
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled, ...accessibilityState }}
        {...rest}
        style={[
          pad.keyStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <NumberPadCellProvider value={context}>{children}</NumberPadCellProvider>
      </Press>
    )
  }
)

NumberPadCell.displayName = 'XAUI.Tram.NumberPad.Cell'
