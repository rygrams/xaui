import { forwardRef } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useList, useListSwipe } from './list.context'
import type { ListSwipeProps } from './list.type'

/**
 * The actions under a row, side by side at its end — `List.SwipeAction`s. The row slides
 * aside by their width together to show them. A child of `List.Item` itself: the row
 * takes it out of its content and lays it underneath.
 */
export const ListSwipe = forwardRef<View, ListSwipeProps>(function ListSwipe(
  { children, style, onLayout, ...props },
  ref
) {
  const { swipeStyle } = useList()
  const { onSpan } = useListSwipe()
  const [styleProps, rest] = useStyleProps(props)

  const handleLayout = (event: LayoutChangeEvent) => {
    onSpan(event.nativeEvent.layout.width)
    onLayout?.(event)
  }

  return (
    <View
      ref={ref}
      {...rest}
      style={[swipeStyle, styleProps, style]}
      onLayout={handleLayout}
    >
      {children}
    </View>
  )
})

ListSwipe.displayName = 'XAUI.Tram.List.Swipe'
