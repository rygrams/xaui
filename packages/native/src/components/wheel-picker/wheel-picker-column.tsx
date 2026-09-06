import { Children, forwardRef, isValidElement, useCallback, useMemo } from 'react'
import { useEffect, useRef } from 'react'
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { useStyleProps } from '../../system/style-props'
import { WheelPickerColumnProvider, useWheelPicker } from './wheel-picker.context'
import { indexFromOffset } from './wheel-picker.geometry'
import { WheelPickerItem } from './wheel-picker-item'
import type { WheelPickerColumnProps } from './wheel-picker.type'

/**
 * One turning column, and the value it has come to rest on.
 *
 * **The scroll is the control.** There is no press to select: the row at the middle *is*
 * the choice, so the column snaps to a row and reports whichever one it stopped at. That is
 * what makes a wheel a wheel rather than a short list — and it is why the rows are `Text`
 * nodes rather than pressables.
 *
 * **It reports at rest, never while turning.** One flick passes nine rows; a column that
 * fired on each would hand the caller eight values nobody chose. `onMomentumScrollEnd`
 * covers a flick and `onScrollEndDrag` covers a slow drag that stops without momentum —
 * both are needed, and neither fires for the other.
 *
 * The offset is a **shared value** as well as rendered state, because a row's fade and turn
 * are read on the UI thread: a scroll position crossing the bridge every frame would animate
 * at the rate React re-renders rather than at the rate the finger moves.
 */
export const WheelPickerColumn = forwardRef<ScrollView, WheelPickerColumnProps>(
  function WheelPickerColumn(
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      isDisabled = false,
      style,
      onMomentumScrollEnd,
      onScrollEndDrag,
      onContentSizeChange,
      ...props
    },
    ref
  ) {
    const { columnStyle, geometry, isDisabled: isWheelDisabled } = useWheelPicker()
    const [styleProps, rest] = useStyleProps(props)
    const { rowHeight, padding } = geometry
    const disabled = isDisabled || isWheelDisabled

    // Read off the elements rather than from mounted rows: the column has to scroll to the
    // right row on its very first layout, before any row has told it where it is.
    const values = useMemo(() => readValues(children), [children])

    const [value, setValue] = useControllableState<string | undefined>({
      value: controlledValue,
      defaultValue: defaultValue ?? values[0],
      onChange: onValueChange as ((next: string | undefined) => void) | undefined,
    })

    const selectedIndex = Math.max(
      values.findIndex(candidate => candidate === value),
      0
    )

    const offset = useSharedValue(selectedIndex * rowHeight)
    const scroller = useRef<ScrollView | null>(null)
    // The caller's ref goes to the node they can actually scroll, not to a wrapper.
    const refs = useMergedRef(scroller, ref)

    const scrollHandler = useAnimatedScrollHandler(event => {
      'worklet'
      offset.value = event.contentOffset.y
    })

    const settle = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = indexFromOffset(
          event.nativeEvent.contentOffset.y,
          rowHeight,
          values.length
        )
        const next = values[index]
        // `useControllableState` drops a set to the value it already holds, so coming back
        // to rest on the row you started from fires nothing at all.
        if (next !== undefined) setValue(next)
      },
      [rowHeight, setValue, values]
    )

    // Composed, never replaced: a caller listening for the wheel coming to rest still
    // hears it, and the column still reports the row it stopped on.
    const handleMomentumEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onMomentumScrollEnd?.(event)
        settle(event)
      },
      [onMomentumScrollEnd, settle]
    )

    const handleDragEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScrollEndDrag?.(event)
        settle(event)
      },
      [onScrollEndDrag, settle]
    )

    // A value changed from outside — a caller's reset, or a day count that shrank under a
    // month — has to move the wheel, and only then: scrolling on every render would fight
    // the finger. Comparing against the live offset is what tells one from the other.
    useEffect(() => {
      const target = selectedIndex * rowHeight
      if (Math.abs(offset.value - target) < 1) return
      scroller.current?.scrollTo({ y: target, animated: true })
    }, [offset, rowHeight, selectedIndex])

    const isPlaced = useRef(false)

    /**
     * The first placement, and it cannot be the effect above.
     *
     * `contentOffset` only takes on iOS; on Android and on web the wheel mounts at zero,
     * and the effect will not move it because the shared value was seeded with the target
     * and therefore already agrees with it. So the wheel would open showing its first row
     * while reporting the fifth — which is the worst kind of wrong, because it is only
     * wrong on two platforms out of three.
     *
     * On the content's first size, without animation: the row was already chosen before
     * anyone looked at the wheel, so there is nothing to animate from.
     */
    const place = useCallback(
      (width: number, height: number) => {
        onContentSizeChange?.(width, height)
        if (isPlaced.current) return
        isPlaced.current = true
        const target = selectedIndex * rowHeight
        offset.value = target
        scroller.current?.scrollTo({ y: target, animated: false })
      },
      [offset, onContentSizeChange, rowHeight, selectedIndex]
    )

    const context = useMemo(
      () => ({
        offset,
        rowHeight,
        selectedIndex,
        indexOf: (candidate: string) => values.indexOf(candidate),
        isDisabled: disabled,
      }),
      [offset, rowHeight, selectedIndex, values, disabled]
    )

    return (
      <WheelPickerColumnProvider value={context}>
        <Animated.ScrollView
          ref={refs}
          // Caller props **first**, and everything below is the wheel rather than a
          // default: a caller's `snapToInterval` or `onScroll` written over these would
          // leave a drum that stops between rows and rows that no longer turn.
          {...rest}
          style={[columnStyle, styleProps, style]}
          contentContainerStyle={{ paddingVertical: padding }}
          contentOffset={{ x: 0, y: selectedIndex * rowHeight }}
          showsVerticalScrollIndicator={false}
          // The two together are the snap: `fast` without an interval overshoots by rows,
          // and an interval without `fast` drifts to a stop between two of them.
          snapToInterval={rowHeight}
          decelerationRate="fast"
          scrollEnabled={!disabled}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onContentSizeChange={place}
          onMomentumScrollEnd={handleMomentumEnd}
          onScrollEndDrag={handleDragEnd}
        >
          {children}
        </Animated.ScrollView>
      </WheelPickerColumnProvider>
    )
  }
)

WheelPickerColumn.displayName = 'XAUI.WheelPicker.Column'

/**
 * Every row's `value`, in the order they were written.
 *
 * Direct children only, and by identity rather than by name: a row nested in a component of
 * the caller's own is a row this column cannot count, and counting it wrong is worse than
 * not counting it — the index it produces is what the wheel scrolls to.
 */
function readValues(children: WheelPickerColumnProps['children']): string[] {
  const values: string[] = []

  Children.forEach(children, child => {
    if (!isValidElement(child) || child.type !== WheelPickerItem) return
    const { value } = child.props as { value?: string }
    if (typeof value === 'string') values.push(value)
  })

  return values
}
