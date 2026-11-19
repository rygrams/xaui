import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { unfoldedInner } from '../../system/list-picker'
import { useSelect } from './select.context'

/**
 * The `TextField`'s box around a field's row — the `Select`'s pressable row, or the
 * `Combobox`'s row holding the field being typed into — and the list unfolded inside the
 * same line. Its height goes from the row's to the list's and back, and its border from
 * the page's ink to the accent's.
 *
 * A `Select`'s list is laid over the row and the row gives way to it: what was the value
 * is now the list's current choice. A list that keeps its row (`keepsRow`) hangs under it
 * instead, and the row stays where it is, to be typed into.
 *
 * Internal: `Select.Trigger` and `Combobox.Trigger` draw it around their own row.
 */
export function SelectBox({ children }: { children: ReactNode }) {
  const {
    boxStyle,
    border,
    lineWidth,
    isOpen,
    mode,
    keepsRow,
    inlineList,
    motion,
    rowHeight,
    setRowHeight,
    listHeight,
    setBoxTop,
  } = useSelect()
  const list = useSyncExternalStore(
    inlineList.subscribe,
    inlineList.get,
    inlineList.get
  )
  const box = useRef<View>(null)

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => setRowHeight(event.nativeEvent.layout.height),
    [setRowHeight]
  )

  // Where the box stands in the window, as the list opens: what `Select.Overlay` leaves
  // uncovered. On every opening — the box may have scrolled since the last one.
  useEffect(() => {
    if (!isOpen) return
    box.current?.measureInWindow((_x, y) => setBoxTop(y))
  }, [isOpen, setBoxTop])

  const { unfold, line, shown } = motion
  const { rest: atRest, open: opened } = border
  const closed = rowHeight > 0 ? rowHeight + lineWidth * 2 : 0
  const unfolded =
    listHeight > 0
      ? unfoldedInner(rowHeight, listHeight, keepsRow) + lineWidth * 2
      : closed

  const framed = useAnimatedStyle(() => {
    'worklet'
    const borderColor = interpolateColor(line.value, [0, 1], [atRest, opened])
    // Not measured yet: the box is as tall as its row, by layout.
    if (closed === 0) return { borderColor }

    return { borderColor, height: closed + (unfolded - closed) * unfold.value }
  }, [line, unfold, atRest, opened, closed, unfolded])

  // The row gives way to a list laid over it. A row the list hangs under stays.
  const yielded = useAnimatedStyle(() => {
    'worklet'
    return { opacity: keepsRow ? 1 : 1 - shown.value }
  }, [shown, keepsRow])

  const isCovered = isOpen && mode === 'inline' && !keepsRow

  return (
    <Animated.View ref={box} style={[boxStyle, framed]}>
      <Animated.View
        onLayout={handleLayout}
        style={[isCovered ? UNTOUCHED : undefined, yielded]}
      >
        {children}
      </Animated.View>
      {list}
    </Animated.View>
  )
}

/** Under an unfolded list the row is not there to be pressed: the list is. */
const UNTOUCHED = { pointerEvents: 'none' } as const
