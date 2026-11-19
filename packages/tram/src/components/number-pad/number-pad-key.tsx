import { forwardRef } from 'react'
import type { View } from 'react-native'
import { childrenToString } from '@xaui/native/system'
import { NumberPadCell } from './number-pad-cell'
import { NumberPadLabel } from './number-pad-label'
import { useNumberPad } from './number-pad.context'
import type { NumberPadKeyProps } from './number-pad.type'

/**
 * A key that inserts `value`, and shows it unless something is composed inside it. The
 * root draws the ten digits with it; a caller writes one in the free corner — a `00`, a
 * decimal separator.
 */
export const NumberPadKey = forwardRef<View, NumberPadKeyProps>(
  function NumberPadKey({ value, children, ...props }, ref) {
    const { insert } = useNumberPad()
    const text = childrenToString(children)

    return (
      <NumberPadCell
        ref={ref}
        tone="key"
        onActivate={() => insert(value)}
        accessibilityLabel={value}
        {...props}
      >
        {children === undefined || text !== null ? (
          <NumberPadLabel>{text ?? value}</NumberPadLabel>
        ) : (
          children
        )}
      </NumberPadCell>
    )
  }
)

NumberPadKey.displayName = 'XAUI.Tram.NumberPad.Key'
