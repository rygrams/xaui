import { forwardRef, useCallback } from 'react'
import { Pressable } from 'react-native'
import type { GestureResponderEvent, LayoutChangeEvent, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import type { SliderTrackProps } from './slider.type'

/**
 * The rail the knob runs along, and the only node that knows how long it is.
 *
 * It takes a press anywhere along itself and moves the knob there, which is the half of a
 * slider people forget: dragging a sixteen-point disc is a fine gesture on a mouse and a
 * poor one on a finger.
 *
 * The travel is inset by half a knob at each end — otherwise the knob hangs over the rail's
 * ends at the minimum and the maximum, and the fill runs out from under it.
 */
export const SliderTrack = forwardRef<View, SliderTrackProps>(function SliderTrack(
  { children, style, onLayout, ...props },
  ref
) {
  const {
    trackStyle,
    trackLength,
    thumbSize,
    orientation,
    isDisabled,
    setTrackLength,
    slideTo,
    thumbFor,
    commit,
  } = useSlider()
  const [styleProps, rest] = useStyleProps(props)

  const vertical = orientation === 'vertical'

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      // The rail's own axis, not its thickness. The knob is laid out inside this node, so
      // the parent's coordinates are the ones that matter and there is nothing to convert.
      setTrackLength(vertical ? height : width)
    },
    [onLayout, setTrackLength, vertical]
  )

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const travel = Math.max(trackLength - thumbSize, 1)
      const along = vertical
        ? // Counted from the bottom: a press near the floor of a vertical rail is a small
          // value, not a large one.
          trackLength - event.nativeEvent.locationY
        : event.nativeEvent.locationX

      // The nearest thumb, which on a plain slider is the only one and on a range is the
      // one the finger meant. Moving the first every time would make half of a range's
      // presses jump the wrong end across the other.
      const fraction = (along - thumbSize / 2) / travel
      slideTo(thumbFor(fraction), fraction)
      commit()
    },
    [commit, slideTo, thumbFor, thumbSize, trackLength, vertical]
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
