import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useNumberPad, useNumberPadCell } from './number-pad.context'
import type { NumberPadLabelProps } from './number-pad.type'

/**
 * The character on a cell — the digit on a key, the arrow on the backspace.
 *
 * Which foreground it takes is the **cell's** answer rather than a prop of its own: a
 * filled key's is the variant's, a bare corner's is the page's. Three lines, because the
 * root already resolved both (R5).
 *
 * Single-line by default. A key has a fixed height, so a label too long for it truncates
 * rather than deforming the row it is in.
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
        style={[tone === 'key' ? labelStyle : ghostLabelStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

NumberPadLabel.displayName = 'XAUI.NumberPad.Label'
