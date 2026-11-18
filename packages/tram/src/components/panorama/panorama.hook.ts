import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { I18nManager } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useAnimationDisabled } from '@xaui/native/system'
import { panorama } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramHaptic } from '../../theme/tram-haptics'
import { PANORAMA_PEEK } from './panorama.recipe'
import {
  dragOffset,
  layerShift,
  releaseTarget,
  sectionStops,
  titleTravel,
  trackTravel,
} from './panorama.track'

/** A drag has to be this much more across than along before it is the track's. */
const SLOP = 10

type TrackOptions = {
  /** The sections' values, in the order they are written. */
  values: readonly string[]
  /** Where the current value sits among them. */
  currentIndex: number
  /** A release, or a screen reader's adjust, settled on another section. */
  select: (value: string) => void
}

type Laid = { x: number; width: number }

/**
 * The Panorama's track: what the root measures, the swipe that moves it, and the three
 * layers that move with it at their own pace.
 *
 * The sections follow the finger — past either end only a third of the way, and back once
 * let go. A release moves on a section when it was flung, or dragged a quarter of a
 * section's width, and the track settles on the `navigation` spring, felt as a
 * `selection`. The title and the backdrop travel the same share of their own, shorter way:
 * the parallax. A `value` set from outside is reached the same way.
 *
 * With motion reduced the title and the backdrop stay where they are and the track fades
 * to its section rather than springing there; under `disable-all` it is placed.
 */
export function usePanoramaTrack({ values, currentIndex, select }: TrackOptions) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()
  const haptic = useTramHaptic()
  // A row laid right to left starts at the screen's right edge, and moves the other way.
  const way = I18nManager.isRTL ? -1 : 1

  const [viewport, setViewport] = useState(0)
  const [backdropWidth, setBackdropWidth] = useState(0)
  const [laidOut, setLaidOut] = useState(0)
  const laid = useRef(new Map<string, Laid>())
  const titleWidth = useRef(0)
  const isPlaced = useRef(false)

  const offset = useSharedValue(0)
  const from = useSharedValue(0)
  const isDragging = useSharedValue(false)
  const travel = useSharedValue(0)
  const stops = useSharedValue<number[]>([])
  const index = useSharedValue(currentIndex)
  const titleWay = useSharedValue(0)
  const backdropWay = useSharedValue(0)

  const sectionWidth = Math.max(0, viewport - PANORAMA_PEEK)

  const placeSection = useCallback((value: string, x: number, width: number) => {
    const known = laid.current.get(value)
    if (known && known.x === x && known.width === width) return
    laid.current.set(value, { x, width })
    setLaidOut(count => count + 1)
  }, [])

  const measureTitle = useCallback((width: number) => {
    if (titleWidth.current === width) return
    titleWidth.current = width
    setLaidOut(count => count + 1)
  }, [])

  const key = values.join('\u0000')

  // Once every section is laid out, where the track rests for each, and how far each
  // slower layer travels. The first time, the track is placed on the current section.
  useEffect(() => {
    if (viewport === 0) return
    const sections = values.map(value => laid.current.get(value))
    if (sections.some(section => section === undefined)) return

    const starts = (sections as Laid[]).map(({ x, width }) =>
      I18nManager.isRTL ? viewport - (x + width) : x
    )
    const end = Math.max(
      ...(sections as Laid[]).map((section, at) => starts[at] + section.width)
    )
    const reach = trackTravel(end, viewport)
    const resting = sectionStops(starts, reach)

    travel.value = reach
    stops.value = resting
    titleWay.value = titleTravel(titleWidth.current, viewport, reach, panorama.title)
    backdropWay.value = reach * panorama.backdrop
    setBackdropWidth(viewport + reach * panorama.backdrop)

    if (!isPlaced.current) {
      isPlaced.current = true
      index.value = currentIndex
    }
    // Placed on its section — the first time, and again whenever the layout moves under
    // it: the sections are first laid at their content's width, then at the screen's less
    // the peek, and a rotation changes both. A finger on the track keeps it.
    if (!isDragging.value) offset.value = resting[index.value] ?? 0
    // `key` stands for `values`; `currentIndex` is placed by the effect below once placed.
  }, [
    key,
    viewport,
    laidOut,
    travel,
    stops,
    titleWay,
    backdropWay,
    index,
    offset,
    isDragging,
  ])

  // A value set from outside — or a screen reader's adjust — is reached on the spring. A
  // release has already set off toward its section, and is left to arrive.
  useEffect(() => {
    if (!isPlaced.current || index.value === currentIndex) return
    index.value = currentIndex
    const target = stops.value[currentIndex]
    if (target === undefined) return
    offset.value = isStill ? target : animate(target, 'navigation')
  }, [currentIndex, isStill, animate, index, stops, offset])

  const settle = useCallback(
    (target: number) => {
      haptic('selection')
      const value = values[target]
      if (value !== undefined) select(value)
    },
    [haptic, select, values]
  )

  const gesture = useMemo(() => {
    const goTo = (target: number) => {
      'worklet'
      const rest = stops.value[target] ?? 0
      offset.value = isStill ? rest : animate(rest, 'navigation')
    }

    return Gesture.Pan()
      .activeOffsetX([-SLOP, SLOP])
      .failOffsetY([-SLOP, SLOP])
      .onStart(() => {
        'worklet'
        isDragging.value = true
        from.value = offset.value
      })
      .onUpdate(event => {
        'worklet'
        offset.value = dragOffset(
          from.value - event.translationX * way,
          travel.value,
          panorama.rubber
        )
      })
      .onEnd(event => {
        'worklet'
        const count = stops.value.length
        if (count === 0) return
        const target = releaseTarget(
          index.value,
          count,
          { distance: -event.translationX * way, velocity: -event.velocityX * way },
          { distance: sectionWidth * panorama.distance, velocity: panorama.velocity }
        )
        goTo(target)
        if (target !== index.value) {
          index.value = target
          scheduleOnRN(settle, target)
        }
      })
      .onFinalize((_event, didEnd) => {
        'worklet'
        isDragging.value = false
        if (!didEnd) goTo(index.value)
      })
  }, [
    animate,
    isStill,
    way,
    sectionWidth,
    settle,
    offset,
    from,
    travel,
    stops,
    index,
  ])

  const trackStyle = useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ translateX: -offset.value * way }] }
  }, [offset, way])

  // With motion reduced the slower layers stay put: their drift is motion for its own sake.
  const titleStyle = useAnimatedStyle(() => {
    'worklet'
    const shift = isReduced
      ? 0
      : layerShift(offset.value, travel.value, titleWay.value)
    return { transform: [{ translateX: -shift * way }] }
  }, [offset, travel, titleWay, isReduced, way])

  const backdropStyle = useAnimatedStyle(() => {
    'worklet'
    const shift = isReduced
      ? 0
      : layerShift(offset.value, travel.value, backdropWay.value)
    return { transform: [{ translateX: -shift * way }] }
  }, [offset, travel, backdropWay, isReduced, way])

  return {
    gesture,
    viewport,
    sectionWidth,
    backdropWidth,
    measureViewport: setViewport,
    placeSection,
    measureTitle,
    trackStyle,
    titleStyle,
    backdropStyle,
  }
}
