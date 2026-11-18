import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useArrival } from './list-box.entrance'
import type { ListBoxEntrance } from './list-box.entrance'

type ListBoxRowProps = {
  rowKey: string
  entrance: ListBoxEntrance
  isLeaving: boolean
  /** The line above the row, drawn with it: it arrives, opens and closes with the row. */
  separatorStyle: StyleProp<ViewStyle> | null
  onGone: (key: string) => void
  children: ReactNode
}

/**
 * Where one child of a list is drawn — not a slot, the root's own wrapper. It does the
 * three things a row cannot do for itself:
 *
 * - **arrives** in the list's cascade, a few points up as it fades in;
 * - **opens** when it is added after the list mounted — its height from nothing, on the
 *   `navigation` spring, with a fade — so the rows under it are pushed down, not jumped;
 * - **closes** the same way when it is removed, and only then tells the list to let it go.
 *
 * With motion reduced or under `disable-all`, a row is there or it is not.
 */
export function ListBoxRow({
  rowKey,
  entrance,
  isLeaving,
  separatorStyle,
  onGone,
  children,
}: ListBoxRowProps) {
  const animate = useTramMotion()
  const { style: arriving, isLate } = useArrival(entrance)
  const { isSizing } = entrance

  // 1 when the row is all there; its height is then its own, and follows what it holds.
  const open = useSharedValue(isLate && isSizing ? 0 : 1)
  const natural = useSharedValue(0)
  const hasOpened = useRef(!(isLate && isSizing))

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      natural.value = event.nativeEvent.layout.height
      // A new row opens once its height is known — before that there is nothing to
      // open to.
      if (hasOpened.current) return
      hasOpened.current = true
      open.value = animate(1, 'navigation')
    },
    [animate, natural, open]
  )

  useEffect(() => {
    if (isLeaving) open.value = animate(0, 'navigation')
    else if (hasOpened.current) open.value = animate(1, 'navigation')
  }, [isLeaving, animate, open])

  // Once closed — the spring dips past nothing on its way — the list lets the row go.
  useAnimatedReaction(
    () => isLeaving && open.value <= 0,
    (isClosed, wasClosed) => {
      'worklet'
      if (isClosed && !wasClosed) scheduleOnRN(onGone, rowKey)
    },
    [isLeaving, onGone, rowKey]
  )

  const presence = useAnimatedStyle(() => {
    'worklet'
    if (open.value >= 1 && !isLeaving) {
      return { height: 'auto', opacity: 1, overflow: 'visible' }
    }

    const shown = Math.min(1, Math.max(0, open.value))

    return { height: natural.value * shown, opacity: shown, overflow: 'hidden' }
  }, [isLeaving, open, natural])

  return (
    <Animated.View style={presence}>
      <Animated.View style={arriving} onLayout={handleLayout}>
        {separatorStyle ? <View style={separatorStyle} /> : null}
        {children}
      </Animated.View>
    </Animated.View>
  )
}
