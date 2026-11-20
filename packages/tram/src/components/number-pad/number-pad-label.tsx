import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useNumberPad, useNumberPadCell } from './number-pad.context'
import type { NumberPadLabelProps } from './number-pad.type'

/**
 * The text of a cell: a digit, light and large, in a key; a word or a sign, smaller, in
 * the backspace and the free corner. Which one comes from the cell, not from a prop.
 */
export const NumberPadLabel = forwardRef<Text, NumberPadLabelProps>(
  function NumberPadLabel({ children, style, numberOfLines = 1, ...props }, ref) {
    const { labelStyle, ghostLabelStyle } = useNumberPad()
    const { tone } = useNumberPadCell()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[tone === 'key' ? labelStyle : ghostLabelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

NumberPadLabel.displayName = 'XAUI.Tram.NumberPad.Label'
