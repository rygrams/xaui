import { forwardRef } from 'react'
import type { View } from 'react-native'
import { childrenToString } from '../../system/slot'
import { NumberPadCell } from './number-pad-cell'
import { NumberPadLabel } from './number-pad-label'
import { useNumberPad } from './number-pad.context'
import type { NumberPadKeyProps } from './number-pad.type'

/**
 * One filled key.
 *
 * The root renders ten of these and names none of them, because the digits are data. This
 * is exported for the eleventh — a decimal separator or a `00` on a currency pad, dropped
 * into the free cell:
 *
 * ```tsx
 * <NumberPad>
 *   <NumberPad.Key value="," />
 * </NumberPad>
 * ```
 *
 * With nothing composed inside it, it shows what it inserts. R3 otherwise: a stringifiable
 * tree becomes the label, anything else is the caller's own content.
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

NumberPadKey.displayName = 'XAUI.NumberPad.Key'
