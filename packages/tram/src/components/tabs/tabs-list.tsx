import { forwardRef, useCallback } from 'react'
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { mergeRefs, useStyleProps } from '@xaui/native/system'
import { useTabs } from './tabs.context'
import { useRowScroll } from './tabs.scroll'
import type { TabsListProps } from './tabs.type'

/**
 * The row of titles. It has no ground and no box: text on the page, and when the titles
 * are wider than the page the row scrolls sideways, with no bar to say so.
 *
 * Choosing a tab that is not entirely in view brings it there, its start edge where the
 * first tab rests. `Tabs.Indicator`, when the caller wants a rule, is written in here.
 *
 * A `ScrollView`, where Native's list is a `View`: `style` is the row's frame, and
 * `contentContainerStyle` is where the titles are padded.
 */
export const TabsList = forwardRef<ScrollView, TabsListProps>(function TabsList(
  {
    children,
    role = 'tablist',
    style,
    contentContainerStyle,
    onLayout,
    onContentSizeChange,
    onScrollBeginDrag,
    ...props
  },
  ref
) {
  const { listStyle, value, isStill, isDisabled, row } = useTabs()
  const [styleProps, rest] = useStyleProps(props)
  const scroll = useRowScroll({ row, tab: value, isStill })

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      scroll.onLayout(event)
    },
    [onLayout, scroll]
  )

  const handleContentSize = useCallback(
    (width: number, height: number) => {
      onContentSizeChange?.(width, height)
      row.setContent(width)
    },
    [onContentSizeChange, row]
  )

  const handleDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScrollBeginDrag?.(event)
      scroll.release()
    },
    [onScrollBeginDrag, scroll]
  )

  return (
    <Animated.ScrollView
      // The animated wrapper types its ref as itself; at runtime it is the scroll view.
      ref={mergeRefs(scroll.ref as never, ref)}
      role={role}
      aria-disabled={isDisabled || undefined}
      showsHorizontalScrollIndicator={false}
      // A tap on a title while the row is still moving chooses it.
      keyboardShouldPersistTaps="handled"
      {...rest}
      horizontal
      style={[FRAME, styleProps, style]}
      contentContainerStyle={[listStyle, contentContainerStyle]}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSize}
      onScrollBeginDrag={handleDrag}
    >
      {children}
    </Animated.ScrollView>
  )
})

/** As tall as its titles: a horizontal scroll view otherwise takes all the height left. */
const FRAME = { flexGrow: 0 } as const

TabsList.displayName = 'XAUI.Tram.Tabs.List'
