import { useCallback } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import { THUMB_PRESSED_SCALE, THUMB_SPRING } from './slider.animation'
import type { SliderThumbProps } from './slider.type'

/**
 * What the finger holds.
 *
 * The pan runs on `react-native-gesture-handler`, which this library declares as an
 * **optional** peer — a slider is the first component to need it, and an app without one
 * should not be made to install a gesture library. It is imported here and nowhere else,
 * so only an app that reaches for `@xaui/native/slider` pays for it.
 *
 * The gesture computes the new position on the UI thread and hands the value back over
 * `runOnJS`, which is the one hop that has to happen: the value is React state, and only
 * the scale can stay on the other thread.
 */
export function SliderThumb({
  accessibilityValueText,
  style,
  ...props
}: SliderThumbProps) {
  const {
    thumbStyle,
    knobStyle,
    value,
    min,
    max,
    step,
    isDisabled,
    fraction,
    trackWidth,
    thumbWidth,
    slideTo,
    commit,
  } = useSlider()

  const [styleProps, rest] = useStyleProps(props)
  const pressed = useSharedValue(0)

  const travel = Math.max(trackWidth - thumbWidth, 0)
  const start = useSharedValue(0)

  const move = useCallback(
    (x: number) => slideTo(travel === 0 ? 0 : x / travel),
    [slideTo, travel]
  )

  const pan = Gesture.Pan()
    .enabled(!isDisabled)
    .onBegin(() => {
      start.set(fraction * travel)
      pressed.set(withSpring(1, THUMB_SPRING))
    })
    .onUpdate(event => {
      runOnJS(move)(start.get() + event.translationX)
    })
    .onFinalize(() => {
      pressed.set(withSpring(0, THUMB_SPRING))
      runOnJS(commit)()
    })

  const scale = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pressed.get() * (THUMB_PRESSED_SCALE - 1) }],
  }))

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        accessibilityRole="adjustable"
        accessibilityValue={{
          min,
          max,
          now: value,
          text: accessibilityValueText?.(value),
        }}
        // What a screen reader's swipe up and down move by, and the reason `step` reaches
        // accessibility at all: without it the platform guesses one percent of the range.
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={event => {
          const delta = event.nativeEvent.actionName === 'increment' ? step : -step
          const next = value + (step === 0 ? (max - min) / 10 : delta)
          slideTo(max === min ? 0 : (next - min) / (max - min))
          commit()
        }}
        aria-disabled={isDisabled || undefined}
        {...rest}
        style={[thumbStyle, { start: fraction * travel }, scale, styleProps, style]}
      >
        <Animated.View style={knobStyle} />
      </Animated.View>
    </GestureDetector>
  )
}

SliderThumb.displayName = 'XAUI.Slider.Thumb'
