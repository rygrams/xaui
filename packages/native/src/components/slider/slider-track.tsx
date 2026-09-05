import { forwardRef, useCallback } from 'react'
import { Pressable } from 'react-native'
import type { GestureResponderEvent, LayoutChangeEvent, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import type { SliderTrackProps } from './slider.type'

/**
 * The line the thumb runs along, and the only node that knows how long it is.
 *
 * It takes a press anywhere along itself and moves the thumb there, which is the half of a
 * slider people forget: dragging a four-point-wide thumb is a fine gesture on a mouse and
 * a poor one on a finger.
 *
 * The travel is inset by half the thumb at each end — otherwise the thumb hangs over the
 * track's ends at 0 and at the maximum, and the fill runs out from under it.
 */
export const SliderTrack = forwardRef<View, SliderTrackProps>(function SliderTrack(
  { children, style, onLayout, ...props },
  ref
) {
  const {
    trackStyle,
    trackWidth,
    thumbWidth,
    isDisabled,
    setTrackWidth,
    slideTo,
    commit,
  } = useSlider()
  const [styleProps, rest] = useStyleProps(props)

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      // The parent's coordinates are the right ones here: the thumb is laid out inside
      // this node, so there is nothing to convert between.
      setTrackWidth(event.nativeEvent.layout.width)
    },
    [onLayout, setTrackWidth]
  )

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const travel = Math.max(trackWidth - thumbWidth, 1)
      slideTo((event.nativeEvent.locationX - thumbWidth / 2) / travel)
      commit()
    },
    [commit, slideTo, thumbWidth, trackWidth]
  )

  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      onPress={handlePress}
      {...rest}
      onLayout={measure}
      style={[trackStyle, styleProps, style]}
    >
      {children}
    </Pressable>
  )
})

SliderTrack.displayName = 'XAUI.Slider.Track'
