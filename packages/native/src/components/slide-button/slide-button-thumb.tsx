import { I18nManager, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSlideButton } from './slide-button.context'
import { THUMB_PRESSED_SCALE, THUMB_SPRING } from './slide-button.animation'
import type { SlideButtonThumbProps } from './slide-button.type'

/**
 * The disc the finger drags.
 *
 * The pan runs on `react-native-gesture-handler`, the same **optional** peer the `Slider`
 * reaches for and imported here and nowhere else — an app that never touches
 * `@xaui/native/slide-button` does not pay for it.
 *
 * Everything the finger does stays on the UI thread: the offset is a shared value the pan
 * writes and the fill and the disc both read. The one hop to JS is `runOnJS` on release,
 * once, when the slide has reached the threshold — the confirm is React state and a
 * callback, and neither belongs on the worklet.
 *
 * With no children it draws the built-in chevron, mirrored under RTL so it always points
 * the way the disc travels. Pass an `Icon` — or anything — to replace it.
 */
export function SlideButtonThumb({
  children,
  style,
  ...props
}: SlideButtonThumbProps) {
  const {
    thumbStyle,
    glyphStyle,
    offset,
    travel,
    threshold,
    isDisabled,
    isConfirmed,
    confirm,
  } = useSlideButton()
  const [styleProps, rest] = useStyleProps(props)
  const pressed = useSharedValue(0)
  const start = useSharedValue(0)

  const direction = I18nManager.isRTL ? -1 : 1

  const pan = Gesture.Pan()
    .enabled(!isDisabled && !isConfirmed)
    .onBegin(() => {
      start.set(offset.get())
      pressed.set(withSpring(1, THUMB_SPRING))
    })
    .onUpdate(event => {
      const next = start.get() + direction * event.translationX
      offset.set(Math.min(Math.max(next, 0), travel))
    })
    .onFinalize(() => {
      pressed.set(withSpring(0, THUMB_SPRING))
      const reached = travel > 0 && offset.get() / travel >= threshold
      offset.set(withSpring(reached ? travel : 0, THUMB_SPRING))
      if (reached) runOnJS(confirm)()
    })

  const animated = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        { translateX: direction * offset.get() },
        { scale: 1 + pressed.get() * (THUMB_PRESSED_SCALE - 1) },
      ],
    }
  }, [direction])

  return (
    <GestureDetector gesture={pan}>
      <Animated.View {...rest} style={[thumbStyle, animated, styleProps, style]}>
        {children ?? <View style={glyphStyle} />}
      </Animated.View>
    </GestureDetector>
  )
}

SlideButtonThumb.displayName = 'XAUI.SlideButton.Thumb'
