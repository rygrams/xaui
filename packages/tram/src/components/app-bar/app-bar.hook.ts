import { useEffect } from 'react'
import { BackHandler, Platform } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'

/**
 * The bar opening and closing, as two levels from 0 to 1. `open` sizes the room for the
 * labels and the menu, on the `navigation` spring, so a second press interrupts the first
 * from where the bar is; `arrival` fades the labels and the page's dimming, on the Metro
 * curve in and the exit curve out.
 *
 * With motion reduced the room is set at once and what is in it fades; under
 * `disable-all` both are set.
 */
export function useOpening(isOpen: boolean, isStill: boolean) {
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isFixed = isStill || isReduced
  const open = useSharedValue(isOpen ? 1 : 0)
  const arrival = useSharedValue(isOpen ? 1 : 0)

  useEffect(() => {
    const to = isOpen ? 1 : 0

    open.value = isFixed ? to : animate(to, 'navigation')
    if (isStill) arrival.value = to
    else arrival.value = isOpen ? glide(1) : glide(0, 'exit')
  }, [isOpen, isStill, isFixed, animate, glide, open, arrival])

  return { open, arrival }
}

/**
 * Room that opens with `level`: as tall as what it holds — measured — times the level.
 * What it holds keeps its own height and is clipped while the room is short of it: it is
 * laid out of the flow (`appBarSheet.held`), or the closed room — 0 tall — would squeeze
 * it to nothing and the measure would never find its height.
 */
export function useFold(level: SharedValue<number>) {
  const height = useSharedValue(0)

  const fold = useAnimatedStyle(() => {
    'worklet'
    return { height: level.value * height.value }
  }, [level, height])

  const measure = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
  }

  return { fold, measure }
}

/**
 * The system's back closes an open bar, as it closed the Metro App Bar, before it leaves
 * the page. Nothing is listened to while the bar is closed, nor on the web, which has no
 * back of the system's to take.
 */
export function useBackCloses(isOpen: boolean, close: () => void) {
  useEffect(() => {
    if (!isOpen || Platform.OS === 'web') return

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      close()
      return true
    })

    return () => subscription.remove()
  }, [isOpen, close])
}
