import { forwardRef } from 'react'
import { I18nManager, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useStyleProps } from '@xaui/native/system'
import { useSwitch } from './switch.context'
import { DRAG_SLOP, dragProgress, fillWidth, isOnAt } from './switch.travel'
import type { TravelGeometry } from './switch.travel'
import type { SwitchTrackProps } from './switch.type'

/**
 * The rectangle the thumb slides on: a line around it, and the accent inside, drawn from
 * the start up to the middle of the thumb.
 *
 * ```tsx
 * <Switch.Track>
 *   <Switch.Thumb />
 * </Switch.Track>
 * ```
 *
 * It is also where the thumb is dragged from. The pan is `react-native-gesture-handler`'s,
 * an optional peer imported here and nowhere else: it writes the thumb's place on the UI
 * thread and comes back to React once, when the thumb is let go. A touch that does not
 * move sideways stays the row's tap.
 *
 * It never clips: the thumb stands above and below it.
 */
export const SwitchTrack = forwardRef<View, SwitchTrackProps>(function SwitchTrack(
  { children, animation = true, style, ...props },
  ref
) {
  const {
    trackStyle,
    fillStyle,
    geometry,
    progress,
    dragReach,
    onDragStart,
    onDragEnd,
    isSelected,
    isDisabled,
  } = useSwitch()
  const [styleProps, rest] = useStyleProps(props)
  const pickedUpAt = useSharedValue(0)

  // A transform does not mirror under RTL, and neither does a drag: toward the end is
  // toward the start of the screen there.
  const towardEnd = I18nManager.isRTL ? -1 : 1

  const pan = Gesture.Pan()
    .enabled(!isDisabled)
    .activeOffsetX([-DRAG_SLOP, DRAG_SLOP])
    .hitSlop({ vertical: dragReach })
    .onStart(() => {
      'worklet'
      // Where it is, not where it was going: a thumb caught mid-spring is picked up there.
      pickedUpAt.value = dragProgress(progress.value, 0, geometry)
      scheduleOnRN(onDragStart)
    })
    .onUpdate(event => {
      'worklet'
      progress.value = dragProgress(
        pickedUpAt.value,
        event.translationX * towardEnd,
        geometry
      )
    })
    .onEnd((_event, didSucceed) => {
      'worklet'
      // A drag taken away — a scroll, an alert — settles nothing: the state stays.
      scheduleOnRN(onDragEnd, didSucceed ? isOnAt(progress.value) : isSelected)
    })

  return (
    <GestureDetector gesture={pan}>
      <View ref={ref} {...rest} style={[trackStyle, styleProps, style]}>
        {/* Two components rather than a branch in one: "no animation" is only true if
            the Reanimated hooks are never reached. */}
        {animation ? (
          <FollowingFill style={fillStyle} progress={progress} geometry={geometry} />
        ) : (
          <View
            style={[fillStyle, { width: fillWidth(isSelected ? 1 : 0, geometry) }]}
          />
        )}
        {children}
      </View>
    </GestureDetector>
  )
})

SwitchTrack.displayName = 'XAUI.Tram.Switch.Track'

type FollowingFillProps = {
  style: StyleProp<ViewStyle>
  progress: SharedValue<number>
  geometry: TravelGeometry
}

/** The accent, as wide as the thumb is far: it reads the same number the thumb does. */
function FollowingFill({ style, progress, geometry }: FollowingFillProps) {
  const followed = useAnimatedStyle(() => {
    'worklet'
    return { width: fillWidth(progress.value, geometry) }
  }, [progress, geometry])

  return <Animated.View style={[style, followed]} />
}
