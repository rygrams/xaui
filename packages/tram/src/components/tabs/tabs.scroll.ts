import { useCallback, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useReducedMotion,
  useScrollOffset,
  useSharedValue,
} from 'react-native-reanimated'
import type Animated from 'react-native-reanimated'
import { useTramMotion } from '../../motion/use-tram-motion'
import { scrollToTab } from '../../system/tab-row'
import type { TabRow } from './tabs.type'

type RowScroll = {
  row: TabRow
  /** The chosen tab — the one to keep in view. */
  tab: string | undefined
  isStill: boolean
}

/**
 * What brings the chosen tab into view: the row scrolls until that tab's start edge is on
 * the page's margin — where the first tab rests — on the `navigation` spring. A tab that
 * is already entirely visible does not move.
 *
 * The scroll is a shared value the row follows on the UI thread, so a second choice sets
 * off from where the row is, and a finger on the row takes it back at once. The first
 * placement, once the row is measured, is set; so is every one with motion reduced or
 * under an ancestor's `disable-all`.
 */
export function useRowScroll({ row, tab, isStill }: RowScroll) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const ref = useAnimatedRef<Animated.ScrollView>()
  const offset = useScrollOffset(ref)
  const target = useSharedValue(0)
  const isLed = useSharedValue(false)
  const width = useRef(0)
  const isPlaced = useRef(false)

  useAnimatedReaction(
    () => {
      'worklet'
      return target.value
    },
    to => {
      'worklet'
      if (isLed.value) scrollTo(ref, to, 0, false)
    },
    [target, isLed, ref]
  )

  const bring = useCallback(
    (isSet: boolean) => {
      const span = tab === undefined ? undefined : row.span(tab)
      if (!span || width.current === 0 || row.content() === 0) return false

      const isReversed = row.isReversed()
      // A browser counts a reversed row's scroll from its far end, down from 0; the
      // spans are counted from the left, so the offset is brought back to that side.
      const shift =
        Platform.OS === 'web' && isReversed ? row.content() - width.current : 0

      const to = scrollToTab(span, {
        offset: offset.value + shift,
        width: width.current,
        content: row.content(),
        margin: row.margin(),
        isReversed,
      })
      if (to === undefined) return true

      // From where the row is, whoever put it there.
      target.value = offset.value
      isLed.value = true
      target.value = isSet ? to - shift : animate(to - shift, 'navigation')

      return true
    },
    [row, tab, offset, target, isLed, animate]
  )

  // A change of tab moves the row; the first placement waits for the measures below.
  useEffect(() => {
    if (isPlaced.current) bring(isStill || isReduced)
  }, [bring, isStill, isReduced])

  // Set once the row and its tabs are measured: a row does not arrange itself on screen.
  const place = useCallback(() => {
    if (!isPlaced.current) isPlaced.current = bring(true)
  }, [bring])

  useEffect(() => row.subscribe(place), [row, place])

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      width.current = event.nativeEvent.layout.width
      place()
    },
    [place]
  )

  /** A finger on the row: it is the finger's from here. */
  const release = useCallback(() => {
    cancelAnimation(target)
    isLed.value = false
  }, [target, isLed])

  return { ref, onLayout, release }
}
