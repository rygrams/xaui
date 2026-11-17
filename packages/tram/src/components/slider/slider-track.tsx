import { forwardRef, useCallback } from 'react'
import { I18nManager, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useReducedMotion, useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useStyleProps } from '@xaui/native/system'
import { scale as pressScale } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import {
  nearestStop,
  placeAlong,
  placeOf,
  stopFor,
  travelOn,
  valueAt,
} from '../../system/value-scale'
import { useSlider } from './slider.context'
import { DRAG_SLOP, FOLLOW_WITHIN } from './slider.recipe'
import type { SliderTrackProps } from './slider.type'

/** No thumb is under the finger, and no place has been aimed at. */
const NONE = -1

/**
 * The line the thumbs run along, in a box as broad as they are — and where the slider is
 * touched.
 *
 * ```tsx
 * <Slider.Track>
 *   <Slider.Fill />
 *   <Slider.Thumb />
 * </Slider.Track>
 * ```
 *
 * A touch brings the nearest thumb under the finger; a drag carries it, from anywhere on
 * the line. The two gestures are `react-native-gesture-handler`'s, an optional peer
 * imported here and nowhere else. The thumb is placed on the UI thread, and React hears
 * of it once per step crossed. A touch that moves across the track stays the scroll's.
 *
 * `style` and the style props reach the box; the line is drawn in it, in the page's ink.
 */
export const SliderTrack = forwardRef<View, SliderTrackProps>(function SliderTrack(
  { children, style, onLayout, ...props },
  ref
) {
  const {
    trackStyle,
    railStyle,
    thumbs,
    held,
    values,
    scale,
    orientation,
    isDisabled,
    isStill,
    trackLength,
    setTrackLength,
    thumbLength,
    reach,
    moveThumb,
    commit,
    settle,
  } = useSlider()
  const [styleProps, rest] = useStyleProps(props)
  const animate = useTramMotion()
  // The squash is motion for its own sake, so reduced motion drops it rather than fading it.
  const isReduced = useReducedMotion()

  const [lower, upper] = thumbs
  // The last value React was told, and the last place the thumb was sent to.
  const told = useSharedValue(0)
  const aim = useSharedValue(NONE)
  // Whether the touch came down on two thumbs at once, and has not yet said which.
  const isUnsettled = useSharedValue(false)

  const isVertical = orientation === 'vertical'
  // Neither a touch nor a transform mirrors under RTL: the start is the far side there.
  const fromEnd = isVertical || I18nManager.isRTL
  const hasSquash = !isStill && !isReduced

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      setTrackLength(isVertical ? height : width)
    },
    [onLayout, setTrackLength, isVertical]
  )

  /** The value under a touch — vertical counts from the bottom. */
  const valueUnder = (x: number, y: number) => {
    'worklet'
    const across = isVertical ? y : x
    const along = fromEnd ? trackLength - across : across

    return valueAt(placeAlong(along, trackLength, thumbLength), scale)
  }

  const pickUp = (index: number) => {
    'worklet'
    held.value = index
    told.value = values[index]!
    aim.value = NONE
    if (hasSquash)
      (index === 0 ? lower : upper).squash.value = animate(pressScale.thumb)
  }

  const putDown = () => {
    'worklet'
    if (held.value === NONE) return
    if (hasSquash) (held.value === 0 ? lower : upper).squash.value = animate(1)
    held.value = NONE
  }

  /** Puts a thumb on the stop nearest to `value`, and tells React when that is a new one. */
  const carry = (index: number, value: number) => {
    'worklet'
    const stop = stopFor(values, index, value, scale)
    const target = placeOf(stop, scale)
    const { place } = index === 0 ? lower : upper

    if (target !== aim.value) {
      aim.value = target
      const away =
        Math.abs(target - place.value) * travelOn(trackLength, thumbLength)
      place.value =
        isStill || away <= FOLLOW_WITHIN ? target : animate(target, 'thumb')
    }

    if (stop !== told.value) {
      told.value = stop
      scheduleOnRN(moveThumb, index, stop)
    }
  }

  /**
   * Two thumbs picked up on one value: which one was meant is only known once the finger
   * has moved — the upper toward the end, the lower toward the start. Settled once: a
   * thumb pushed against the other later in the drag stops there, and stays the one held.
   */
  const meantThumb = (value: number) => {
    'worklet'
    const index = held.value
    if (!isUnsettled.value || value === values[index]) return index

    isUnsettled.value = false
    const meant = value > values[index]! ? 1 : 0
    if (meant !== index) {
      putDown()
      pickUp(meant)
    }

    return meant
  }

  const slop = isVertical ? { horizontal: reach } : { vertical: reach }
  const dragFrom: [number, number] = [-DRAG_SLOP, DRAG_SLOP]

  const pan = Gesture.Pan()
    .enabled(!isDisabled)
    .hitSlop(slop)
    .onBegin(event => {
      'worklet'
      pickUp(nearestStop(values, valueUnder(event.x, event.y)))
      isUnsettled.value = values.length > 1 && values[0] === values[1]
    })
    .onUpdate(event => {
      'worklet'
      if (held.value === NONE) return
      const value = valueUnder(event.x, event.y)
      carry(meantThumb(value), value)
    })
    .onEnd(() => {
      'worklet'
      // Taken away or let go, the steps crossed were announced: the value stands.
      scheduleOnRN(commit)
    })
    .onFinalize(() => {
      'worklet'
      putDown()
      // After the thumb is put down: it rejoins the state, whatever became of the touch.
      scheduleOnRN(settle)
    })

  // Along the track only: a touch that moves across it stays the scroll's.
  const drag = isVertical ? pan.activeOffsetY(dragFrom) : pan.activeOffsetX(dragFrom)

  const tap = Gesture.Tap()
    .enabled(!isDisabled)
    .hitSlop(slop)
    .onEnd((event, didSucceed) => {
      'worklet'
      if (!didSucceed) return
      const value = valueUnder(event.x, event.y)
      const index = nearestStop(values, value)

      // The drag gave up the thumb when it failed; the tap sends it, and it settles on
      // the spring with the state.
      told.value = values[index]!
      aim.value = NONE
      carry(index, value)
      scheduleOnRN(commit)
      scheduleOnRN(settle)
    })

  return (
    <GestureDetector gesture={Gesture.Exclusive(drag, tap)}>
      <View
        ref={ref}
        {...rest}
        onLayout={measure}
        style={[trackStyle, styleProps, style]}
      >
        <View style={railStyle} />
        {children}
      </View>
    </GestureDetector>
  )
})

SliderTrack.displayName = 'XAUI.Tram.Slider.Track'
