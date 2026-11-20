import { forwardRef } from 'react'
import { I18nManager } from 'react-native'
import type { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useStyleProps } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useSlideButton } from './slide-button.context'
import { DRAG_SLOP, dragOffset, hasReached } from './slide-button.travel'
import type { SlideButtonThumbProps } from './slide-button.type'

/**
 * The block the finger drags: a flat block of the accent, inset from the line, with a
 * chevron that points the way it goes. Held, it is squashed a little in height — the
 * `Switch`'s thumb. Once the slide has counted it inverts: the colour that reads on the
 * accent, a check in the accent.
 *
 * ```tsx
 * <SlideButton.Thumb />
 *
 * <SlideButton.Thumb>
 *   <SlideButton.Icon as={TrashIcon} />
 * </SlideButton.Thumb>
 * ```
 *
 * The pan is `react-native-gesture-handler`'s, the optional peer the `Slider` and the
 * `Switch` reach for, imported here and nowhere else in this component. It writes the
 * offset on the UI thread and comes back to React once, when the finger lifts. A touch
 * that does not move sideways stays the page's scroll.
 *
 * It is moved by `translateX`, which does not mirror under RTL the way `start` does, so
 * the direction — and the chevron — is turned round here by hand.
 */
export const SlideButtonThumb = forwardRef<View, SlideButtonThumbProps>(
  function SlideButtonThumb({ children, style, ...props }, ref) {
    const {
      thumbStyle,
      glyphStyle,
      checkStyle,
      inks,
      offset,
      done,
      travel,
      threshold,
      isDisabled,
      isConfirmed,
      isStill,
      reach,
      grab,
      release,
    } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)
    const animate = useTramMotion()
    // The squash is motion for its own sake, so reduced motion drops it rather than
    // fading it.
    const isReduced = useReducedMotion()
    const hasSquash = !isStill && !isReduced

    const pickedUpAt = useSharedValue(0)
    const squash = useSharedValue(1)

    const towardEnd = I18nManager.isRTL ? -1 : 1
    const { thumb, thumbDone } = inks

    const pan = Gesture.Pan()
      .enabled(!isDisabled && !isConfirmed)
      .activeOffsetX([-DRAG_SLOP, DRAG_SLOP])
      .hitSlop(reach)
      .onBegin(() => {
        'worklet'
        if (hasSquash) squash.value = animate(scale.thumb)
        scheduleOnRN(grab)
      })
      .onStart(() => {
        'worklet'
        // Where it is, not where it was going: a thumb caught mid-spring is picked up there.
        pickedUpAt.value = dragOffset(offset.value, 0, travel)
      })
      .onUpdate(event => {
        'worklet'
        offset.value = dragOffset(
          pickedUpAt.value,
          event.translationX * towardEnd,
          travel
        )
      })
      .onEnd((_event, didSucceed) => {
        'worklet'
        // A drag taken away — a scroll, an alert — confirms nothing.
        const reached = didSucceed && hasReached(offset.value, travel, threshold)
        // Sent on its way here, on the UI thread, before React hears of it: the root
        // then settles it on the state, which a controlled caller may have refused.
        const target = reached ? travel : 0
        offset.value = isStill ? target : animate(target)
        scheduleOnRN(release, reached)
      })
      .onFinalize(() => {
        'worklet'
        if (hasSquash) squash.value = animate(1)
      })

    const moved = useAnimatedStyle(() => {
      'worklet'
      return {
        backgroundColor: interpolateColor(done.value, [0, 1], [thumb, thumbDone]),
        transform: [
          { translateX: offset.value * towardEnd },
          { scaleY: squash.value },
        ],
      }
    }, [offset, done, squash, towardEnd, thumb, thumbDone])

    const chevron = useAnimatedStyle(() => {
      'worklet'
      return { opacity: 1 - done.value }
    }, [done])

    const check = useAnimatedStyle(() => {
      'worklet'
      return { opacity: done.value }
    }, [done])

    // Turned a quarter round: the chevron's lit corner toward the end, the check's L
    // into a tick. Both the other way under RTL, where the end is on the left.
    const chevronTurn = { transform: [{ rotate: `${45 * towardEnd}deg` }] }
    const checkTurn = { transform: [{ rotate: `${-45 * towardEnd}deg` }] }

    return (
      <GestureDetector gesture={pan}>
        <Animated.View
          ref={ref}
          {...rest}
          style={[thumbStyle, styleProps, style, moved]}
        >
          {children ?? (
            <>
              <Animated.View style={[glyphStyle, chevronTurn, chevron]} />
              <Animated.View style={[checkStyle, checkTurn, check]} />
            </>
          )}
        </Animated.View>
      </GestureDetector>
    )
  }
)

SlideButtonThumb.displayName = 'XAUI.Tram.SlideButton.Thumb'
