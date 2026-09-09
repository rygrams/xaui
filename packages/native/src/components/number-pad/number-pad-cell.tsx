import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { NumberPadCellProvider, useNumberPad } from './number-pad.context'
import type { NumberPadCellTone, NumberPadKeyProps } from './number-pad.type'

/**
 * The pressable a key, a backspace and an action all are.
 *
 * **Internal** — it is not in `index.ts`, because `tone` is a fill decision the three
 * public cells have already made and a caller choosing it would be choosing which cell
 * they meant. What it removes is the twenty lines of press plumbing that would otherwise
 * be written three times, and with it the chance of the three drifting apart.
 *
 * **The cell owns its press state**, which is why the root publishes both faces of the
 * style: the root cannot see which of eleven keys is down. R5 stays intact — nothing here
 * touches the recipe.
 */
type NumberPadCellProps = Omit<NumberPadKeyProps, 'value'> & {
  tone: NumberPadCellTone
  /** What the press does to the value. Composed after the caller's own `onPress`. */
  onActivate?: () => void
}

export const NumberPadCell = forwardRef<View, NumberPadCellProps>(
  function NumberPadCell(
    {
      tone,
      onActivate,
      children,
      isDisabled,
      accessibilityRole = 'keyboardkey',
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
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const disabled = isDisabled ?? pad.isDisabled
    const cellStyle = tone === 'key' ? pad.keyStyle : pad.ghostStyle
    const pressedStyle = tone === 'key' ? pad.keyPressedStyle : pad.ghostPressedStyle

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      onActivate?.()
    }

    const context = useMemo(
      () => ({ tone, isPressed, isDisabled: disabled }),
      [tone, isPressed, disabled]
    )

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={disabled}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled, ...accessibilityState }}
        {...rest}
        style={[
          cellStyle,
          isPressed && pressedStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <NumberPadCellProvider value={context}>{children}</NumberPadCellProvider>
      </PressableFeedback>
    )
  }
)

NumberPadCell.displayName = 'XAUI.NumberPad.Cell'
