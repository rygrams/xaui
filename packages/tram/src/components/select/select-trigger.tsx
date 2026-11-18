import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import { IconContext, PressableFeedback, useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectTriggerProps } from './select.type'

/**
 * The field: the value and the chevron in the `TextField`'s box, and the control a
 * screen reader stops on — a combobox that says whether its list is open.
 *
 * It draws the box as well as the row, because an unfolded list belongs inside the same
 * line: the box's height goes from the row's to the list's and back, and its border from
 * the page's ink to the accent's. `ref`, `style` and every pressable prop are the row's.
 * A press changes no colour.
 */
export const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'combobox',
      accessibilityState,
      hitSlop,
      style,
      onLayout,
      onPressIn,
      onPressOut,
      onPress,
      ...props
    },
    ref
  ) {
    const {
      boxStyle,
      triggerStyle,
      glyph,
      border,
      lineWidth,
      reach,
      isOpen,
      isDisabled,
      isInvalid,
      isStill,
      mode,
      toggle,
      inlineList,
      motion,
      rowHeight,
      setRowHeight,
      listHeight,
      setBoxTop,
      labelId,
      descriptionId,
      errorId,
      listId,
    } = useSelect()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const list = useSyncExternalStore(
      inlineList.subscribe,
      inlineList.get,
      inlineList.get
    )
    const box = useRef<View>(null)

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        setRowHeight(event.nativeEvent.layout.height)
      },
      [onLayout, setRowHeight]
    )

    // Where the box stands in the window, as the list opens: what `Select.Overlay` leaves
    // uncovered. On every opening — the box may have scrolled since the last one.
    useEffect(() => {
      if (!isOpen) return
      box.current?.measureInWindow((_x, y) => setBoxTop(y))
    }, [isOpen, setBoxTop])

    const handlePress = useCallback(
      (event: Parameters<NonNullable<SelectTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        toggle()
      },
      [onPress, toggle]
    )

    const { unfold, line, shown } = motion
    const { rest: atRest, open: opened } = border
    const closed = rowHeight > 0 ? rowHeight + lineWidth * 2 : 0
    const unfolded = listHeight > 0 ? listHeight + lineWidth * 2 : closed

    const framed = useAnimatedStyle(() => {
      'worklet'
      const borderColor = interpolateColor(line.value, [0, 1], [atRest, opened])
      // Not measured yet: the box is as tall as its row, by layout.
      if (closed === 0) return { borderColor }

      return { borderColor, height: closed + (unfolded - closed) * unfold.value }
    }, [line, unfold, atRest, opened, closed, unfolded])

    // The row gives way to the list: what was the value is now the list's current choice.
    const yielded = useAnimatedStyle(() => {
      'worklet'
      return { opacity: 1 - shown.value }
    }, [shown])

    const isUnfolded = isOpen && mode === 'inline'

    return (
      <Animated.View ref={box} style={[boxStyle, framed]}>
        <Animated.View style={[isUnfolded ? UNTOUCHED : undefined, yielded]}>
          <IconContext.Provider value={glyph}>
            <PressableFeedback
              ref={ref}
              isPressed={isPressed}
              isDisabled={isDisabled}
              asChild={asChild}
              // Native's scale, highlight and ripple stay off: a field does not move.
              animation={isStill ? 'disable-all' : false}
              accessibilityRole={accessibilityRole}
              // Merged, not spread over: a caller naming another state must not drop these.
              accessibilityState={{
                disabled: isDisabled,
                expanded: isOpen,
                ...accessibilityState,
              }}
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-invalid={isInvalid || undefined}
              // The label names the field; the description and the error explain it.
              aria-labelledby={labelId}
              aria-describedby={`${descriptionId} ${errorId}`}
              // `sm` is drawn under the 48 touch target; the slop makes it up.
              hitSlop={hitSlop ?? reach}
              {...rest}
              onLayout={handleLayout}
              style={[
                triggerStyle,
                styleProps,
                typeof style === 'function' ? style({ pressed: isPressed }) : style,
              ]}
              // After `rest`, and composed: the caller's handlers run inside these.
              onPress={handlePress}
              onPressIn={press.onPressIn}
              onPressOut={press.onPressOut}
            >
              {children}
            </PressableFeedback>
          </IconContext.Provider>
        </Animated.View>
        {list}
      </Animated.View>
    )
  }
)

/** Under an unfolded list the row is not there to be pressed: the list is. */
const UNTOUCHED = { pointerEvents: 'none' } as const

SelectTrigger.displayName = 'XAUI.Tram.Select.Trigger'
