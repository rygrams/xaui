import { forwardRef, useCallback } from 'react'
import type { LayoutChangeEvent, View, ViewProps } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { foldedOffset } from '../../system/list-picker'
import { useSelect } from './select.context'
import { LIST_ROLE } from './select.role'

/**
 * The list unfolded in place: `Select.Content`'s node when the choices are few. It is
 * drawn by the box, over the field's row, and stays mounted while closed — it is what
 * the box measures to know how far to unfold.
 *
 * Folded, it is drawn lifted so that its current choice lies over the field's value; it
 * comes down as the box grows, and goes back up as it folds on a new choice.
 */
export const SelectInlineList = forwardRef<View, ViewProps>(
  function SelectInlineList({ children, style, onLayout, ...props }, ref) {
    const {
      contentStyle,
      isOpen,
      motion,
      rowHeight,
      setListHeight,
      labelId,
      listId,
    } = useSelect()
    const { unfold, shown, current } = motion

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        setListHeight(event.nativeEvent.layout.height)
      },
      [onLayout, setListHeight]
    )

    const placed = useAnimatedStyle(() => {
      'worklet'
      const lift = foldedOffset(current.value, rowHeight) * (1 - unfold.value)

      return { opacity: shown.value, transform: [{ translateY: -lift }] }
    }, [current, unfold, shown, rowHeight])

    return (
      <Animated.View
        ref={ref}
        role={LIST_ROLE}
        nativeID={listId}
        aria-labelledby={labelId}
        // Closed, the list is still there to be measured, and nobody's to read or touch.
        aria-hidden={!isOpen}
        accessibilityElementsHidden={!isOpen}
        importantForAccessibility={isOpen ? 'auto' : 'no-hide-descendants'}
        {...props}
        onLayout={handleLayout}
        // The placement comes last: it is the one transform the unfolding owns.
        style={[contentStyle, style, isOpen ? undefined : UNTOUCHED, placed]}
      >
        {children}
      </Animated.View>
    )
  }
)

const UNTOUCHED = { pointerEvents: 'none' } as const

SelectInlineList.displayName = 'XAUI.Tram.Select.InlineList'
