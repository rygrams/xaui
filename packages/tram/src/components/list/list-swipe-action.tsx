import { forwardRef } from 'react'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '@xaui/native'
import { IconContext, useStyleProps } from '@xaui/native/system'
import { flatPaint } from '../../system/flat-paint'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useList, useListSwipe } from './list.context'
import { wrapText } from './list.text'
import type { ListSwipeActionProps } from './list.type'

/**
 * One action under a row: a flat fill the row's height, its label and glyph in the ink
 * that reads on it. The list's accent by default; its own `accent` or `color` — a red
 * for a deletion — wins. Pressed, it tilts as a button does, runs `onPress`, and the row
 * closes over it.
 */
export const ListSwipeAction = forwardRef<View, ListSwipeActionProps>(
  function ListSwipeAction(
    { children, onPress, accent, color, style, ...props },
    ref
  ) {
    const { paintAction } = useList()
    const swipe = useListSwipe()
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn: () => haptic('press') })
    const paint = paintAction(flatPaint({ accent, color }))

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      swipe.close()
    }

    return (
      <IconContext.Provider value={paint.glyph}>
        <PressTilt
          ref={ref}
          isPressed={isPressed}
          isDisabled={swipe.isDisabled}
          animation={false}
          accessibilityRole="button"
          {...rest}
          style={[paint.style, styleProps, style]}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          onPress={handlePress}
        >
          {wrapText(children, paint.labelStyle)}
        </PressTilt>
      </IconContext.Provider>
    )
  }
)

ListSwipeAction.displayName = 'XAUI.Tram.List.SwipeAction'
