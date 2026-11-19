import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { ScrollView } from 'react-native'
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
 *
 * A list that keeps its row (`keepsRow`, the `Combobox`) is drawn under that row, not
 * over it, and is not lifted. It may hold any number of rows, so it scrolls past
 * `listMost` — as many as a `Select` unfolds.
 */
export const SelectInlineList = forwardRef<View, ViewProps>(
  function SelectInlineList({ children, style, onLayout, ...props }, ref) {
    const {
      contentStyle,
      isOpen,
      motion,
      rowHeight,
      setListHeight,
      keepsRow,
      listMost,
      query,
      labelId,
      listId,
    } = useSelect()
    const { unfold, shown, current } = motion
    const scroller = useRef<ScrollView>(null)

    // Each search starts the list again from its first row.
    useEffect(() => {
      scroller.current?.scrollTo({ y: 0, animated: false })
    }, [query])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        setListHeight(event.nativeEvent.layout.height)
      },
      [onLayout, setListHeight]
    )

    const placed = useAnimatedStyle(() => {
      'worklet'
      const lift = keepsRow
        ? 0
        : foldedOffset(current.value, rowHeight) * (1 - unfold.value)

      return { opacity: shown.value, transform: [{ translateY: -lift }] }
    }, [current, unfold, shown, rowHeight, keepsRow])

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
        style={[
          contentStyle,
          keepsRow && { top: rowHeight, maxHeight: listMost },
          style,
          isOpen ? undefined : UNTOUCHED,
          placed,
        ]}
      >
        {keepsRow ? (
          <ScrollView
            ref={scroller}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </Animated.View>
    )
  }
)

const UNTOUCHED = { pointerEvents: 'none' } as const

SelectInlineList.displayName = 'XAUI.Tram.Select.InlineList'
