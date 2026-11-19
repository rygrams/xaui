import { useCallback, useEffect, useMemo, useState } from 'react'
import { I18nManager } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useAnimationDisabled } from '@xaui/native/system'
import { rowSwipe } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useList } from './list.context'
import { swipeOffset, swipeRest } from './list.swipe'
import type { SwipeSide } from './list.swipe'

/**
 * A row that slides aside to show the actions under it. Across, the row follows the
 * finger toward its start — up the screen is the list's scroll — and, let go, settles open
 * or closed on the `navigation` spring; opening is felt as a `selection`. Opening it
 * closes the row that was open.
 *
 * Under `disable-all` it is placed, open or closed, without a spring.
 */
export function useRowSwipe(isEnabled: boolean) {
  const { openRow } = useList()
  const haptic = useTramHaptic()
  const animate = useTramMotion()
  const isStill = useAnimationDisabled()
  const side: SwipeSide = I18nManager.isRTL ? 1 : -1
  const offset = useSharedValue(0)
  const start = useSharedValue(0)
  const span = useSharedValue(0)
  const [isOpen, setIsOpen] = useState(false)

  // What the list calls to close this row when another opens or the list scrolls.
  const shut = useCallback(() => {
    offset.value = isStill ? 0 : animate(0, 'navigation')
    setIsOpen(false)
  }, [animate, isStill, offset])

  const close = useCallback(() => {
    openRow.release(shut)
    shut()
  }, [openRow, shut])

  const opened = useCallback(() => {
    haptic('selection')
    setIsOpen(true)
    openRow.claim(shut)
  }, [haptic, openRow, shut])

  const closed = useCallback(() => {
    setIsOpen(false)
    openRow.release(shut)
  }, [openRow, shut])

  // A row scrolled out of the list, or disabled while open, lets go of its place.
  useEffect(() => () => openRow.release(shut), [openRow, shut])
  useEffect(() => {
    if (!isEnabled && isOpen) close()
  }, [isEnabled, isOpen, close])

  const onSpan = useCallback(
    (width: number) => {
      span.value = width
    },
    [span]
  )

  const gesture = Gesture.Pan()
    .enabled(isEnabled)
    .activeOffsetX([-rowSwipe.slop, rowSwipe.slop])
    .failOffsetY([-rowSwipe.slop, rowSwipe.slop])
    .onStart(() => {
      'worklet'
      // Caught on its way: it goes on from where it is.
      cancelAnimation(offset)
      start.value = offset.value
    })
    .onUpdate(event => {
      'worklet'
      offset.value = swipeOffset(start.value, event.translationX, span.value, side)
    })
    .onEnd(event => {
      'worklet'
      const rest = swipeRest(offset.value, event.velocityX, span.value, side)
      const wasOpen = start.value !== 0

      offset.value = isStill ? rest : animate(rest, 'navigation')
      if (rest !== 0 && !wasOpen) scheduleOnRN(opened)
      if (rest === 0 && wasOpen) scheduleOnRN(closed)
    })

  const rowStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: offset.value }] }
  }, [offset])

  // The actions are hidden while the row covers them, so a press that tilts the row —
  // and shrinks it a little — does not show them round its edges.
  const actionsStyle = useAnimatedStyle(() => {
    'worklet'
    return { opacity: offset.value === 0 ? 0 : 1 }
  }, [offset])

  const context = useMemo(
    () => ({ close, onSpan, isDisabled: !isEnabled }),
    [close, onSpan, isEnabled]
  )

  return { gesture, rowStyle, actionsStyle, isOpen, close, context }
}
