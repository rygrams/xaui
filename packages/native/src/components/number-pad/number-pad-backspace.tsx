import { forwardRef } from 'react'
import { I18nManager } from 'react-native'
import type { View } from 'react-native'
import { NumberPadCell } from './number-pad-cell'
import { NumberPadLabel } from './number-pad-label'
import { useNumberPad } from './number-pad.context'
import type { NumberPadBackspaceProps } from './number-pad.type'

/**
 * The delete key, on the end of the bottom row. Bare rather than filled: it is not a digit,
 * and eleven identical fills is a pad where the one key that removes looks like the ten that
 * add.
 *
 * **A long press clears the whole value.** It is the gesture every platform's own keypad
 * carries, and without it a mistyped sixteen-digit card is sixteen presses to undo.
 *
 * The arrow is a **character**, not an icon, so the pad needs no SVG peer for the one glyph
 * it draws itself. It flips under RTL, because a backspace points at what it removes and
 * that is the other way round in a right-to-left layout. `NumberPad.Icon` replaces it.
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

NumberPadBackspace.displayName = 'XAUI.NumberPad.Backspace'
