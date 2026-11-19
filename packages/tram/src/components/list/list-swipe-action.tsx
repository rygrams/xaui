import { Children, forwardRef } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent, View } from 'react-native'
import { usePressState } from '@xaui/native'
import { IconContext, useStyleProps } from '@xaui/native/system'
import { flatPaint, inkOn } from '../../system/flat-paint'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useList, useListSwipe } from './list.context'
import { LIST_GEOMETRY, listRecipe } from './list.recipe'
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
    const { theme, actionFill } = useList()
    const swipe = useListSwipe()
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn: () => haptic('press') })

    const styles = listRecipe.resolve({ theme })
    const fill = flatPaint({ accent, color }) ?? actionFill
    // Uncached: a raw tint must stay out of the cache key.
    const tint = fill ? listRecipe.tint({ theme, color: fill }) : undefined
    const ink = fill ? inkOn(fill, theme.colors.accentForeground) : undefined
    const label = ink
      ? [styles.swipeActionLabel, { color: ink }]
      : styles.swipeActionLabel
    const glyph = {
      size: LIST_GEOMETRY.swipeGlyph,
      color: ink ?? theme.colors.accentForeground,
    }

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      swipe.close()
    }

    return (
      <IconContext.Provider value={glyph}>
        <PressTilt
          ref={ref}
          isPressed={isPressed}
          isDisabled={swipe.isDisabled}
          animation={false}
          accessibilityRole="button"
          {...rest}
          style={[styles.swipeAction, tint?.swipeAction, styleProps, style]}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          onPress={handlePress}
        >
          {Children.map(children, child =>
            typeof child === 'string' || typeof child === 'number' ? (
              <Text style={label}>{child}</Text>
            ) : (
              child
            )
          )}
        </PressTilt>
      </IconContext.Provider>
    )
  }
)

ListSwipeAction.displayName = 'XAUI.Tram.List.SwipeAction'
