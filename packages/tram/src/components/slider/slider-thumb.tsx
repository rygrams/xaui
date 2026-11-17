import { forwardRef } from 'react'
import { I18nManager, View } from 'react-native'
import type { AccessibilityActionEvent } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { nudgeOf, travelOn } from '../../system/value-scale'
import { useSlider } from './slider.context'
import type { SliderThumbProps } from './slider.type'

const ACTIONS = [{ name: 'increment' }, { name: 'decrement' }]

/**
 * The block the finger holds — the `Switch`'s thumb, standing across the line and cut
 * out of it by a margin of the ground's colour. Held, it is squashed a little; it reaches
 * a value on the spring.
 *
 * ```tsx
 * <Slider.Thumb />
 * <Slider.Thumb index={1} accessibilityLabel="maximum" />
 * ```
 *
 * It is what a screen reader lands on: an `adjustable` that reads its value and moves by
 * one step — a tenth of the range on a continuous slider. The touch itself is the
 * track's.
 *
 * It is moved by a transform, which does not mirror under RTL the way `start` does, so
 * the direction is flipped here by hand.
 */
export const SliderThumb = forwardRef<View, SliderThumbProps>(function SliderThumb(
  { index = 0, accessibilityValueText, style, ...props },
  ref
) {
  const {
    thumbStyle,
    blockStyle,
    thumbs,
    values,
    scale,
    isDisabled,
    trackLength,
    thumbLength,
    orientation,
    moveThumb,
    commit,
  } = useSlider()
  const [styleProps, rest] = useStyleProps(props)

  // A plain slider has one thumb, whatever `index` says.
  const which = index > 0 && values.length > 1 ? 1 : 0
  const { place, squash } = thumbs[which]
  const value = values[which]!

  const isVertical = orientation === 'vertical'
  const travel = travelOn(trackLength, thumbLength)
  const towardEnd = I18nManager.isRTL ? -1 : 1

  const moved = useAnimatedStyle(() => {
    'worklet'
    const offset = place.value * travel

    // Vertical counts from the bottom, and the thumb lies down: squashed along its length.
    return {
      transform: isVertical
        ? [{ translateY: -offset }, { scaleX: squash.value }]
        : [{ translateX: offset * towardEnd }, { scaleY: squash.value }],
    }
  }, [place, squash, travel, isVertical, towardEnd])

  const handleAction = (event: AccessibilityActionEvent) => {
    if (isDisabled) return
    const toward = event.nativeEvent.actionName === 'increment' ? 1 : -1

    moveThumb(which, value + toward * nudgeOf(scale))
    commit()
  }

  const text = accessibilityValueText?.(value)

  return (
    <Animated.View
      ref={ref}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{ min: scale.min, max: scale.max, now: value, text }}
      accessibilityState={{ disabled: isDisabled }}
      accessibilityActions={ACTIONS}
      onAccessibilityAction={handleAction}
      // The web reads the ARIA attributes and not the value object above.
      aria-valuemin={scale.min}
      aria-valuemax={scale.max}
      aria-valuenow={value}
      aria-valuetext={text}
      aria-orientation={orientation}
      aria-disabled={isDisabled || undefined}
      {...rest}
      style={[thumbStyle, styleProps, style, moved]}
    >
      <View style={blockStyle} />
    </Animated.View>
  )
})

SliderThumb.displayName = 'XAUI.Tram.Slider.Thumb'
