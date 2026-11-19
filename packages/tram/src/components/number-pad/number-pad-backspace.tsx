import { forwardRef } from 'react'
import { I18nManager } from 'react-native'
import type { View } from 'react-native'
import { NumberPadCell } from './number-pad-cell'
import { NumberPadLabel } from './number-pad-label'
import { useNumberPad } from './number-pad.context'
import type { NumberPadBackspaceProps } from './number-pad.type'

/**
 * The last cell of the grid: a press drops the last character, a long press empties the
 * value. Its arrow points back the way the value is read — toward the start.
 */
export const NumberPadBackspace = forwardRef<View, NumberPadBackspaceProps>(
  function NumberPadBackspace({ children, onLongPress, ...props }, ref) {
    const { backspace, clear } = useNumberPad()

    return (
      <NumberPadCell
        ref={ref}
        tone="ghost"
        onActivate={backspace}
        accessibilityLabel="Backspace"
        onLongPress={event => {
          onLongPress?.(event)
          clear()
        }}
        {...props}
      >
        {children ?? (
          <NumberPadLabel>{I18nManager.isRTL ? '→' : '←'}</NumberPadLabel>
        )}
      </NumberPadCell>
    )
  }
)

NumberPadBackspace.displayName = 'XAUI.Tram.NumberPad.Backspace'
