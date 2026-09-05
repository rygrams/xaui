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
 *
 * It is a **disc of the page's own colour inside a ring of the fill's**, which is the
 * legacy component's shape rather than HeroUI's capsule-with-a-core. A solid accent knob
 * on an accent fill disappears the moment the value reaches the top; a ring never does.
 */
export function SliderThumb({
  index = 0,
  accessibilityValueText,
  style,
  ...props
}: SliderThumbProps) {
  const {
    thumbStyle,
    values,
    min,
    max,
    step,
    isDisabled,
    fractions,
    trackLength,
    thumbSize,
    orientation,
    slideTo,
    commit,
  } = useSlider()

  const [styleProps, rest] = useStyleProps(props)
  const pressed = useSharedValue(0)

  const vertical = orientation === 'vertical'
  const travel = Math.max(trackLength - thumbSize, 0)
  const value = values[index] ?? values[0]!
  const fraction = fractions[index] ?? fractions[0]!
  const start = useSharedValue(0)

  const move = useCallback(
    (along: number) => slideTo(index, travel === 0 ? 0 : along / travel),
    [index, slideTo, travel]
  )

  const pan = Gesture.Pan()
    .enabled(!isDisabled)
    .onBegin(() => {
      start.set(fraction * travel)
      pressed.set(withSpring(1, THUMB_SPRING))
    })
    .onUpdate(event => {
      // Vertical counts from the bottom, so a downward drag is a smaller value.
      runOnJS(move)(
        start.get() + (vertical ? -event.translationY : event.translationX)
      )
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
          slideTo(index, max === min ? 0 : (next - min) / (max - min))
          commit()
        }}
        aria-disabled={isDisabled || undefined}
        {...rest}
        style={[
          thumbStyle,
          vertical ? { bottom: fraction * travel } : { start: fraction * travel },
          scale,
          styleProps,
          style,
        ]}
      />
    </GestureDetector>
  )
}

SliderThumb.displayName = 'XAUI.Slider.Thumb'
