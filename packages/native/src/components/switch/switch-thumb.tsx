import { forwardRef } from 'react'
import { I18nManager, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import type { ReactNode } from 'react'
import { useStyleProps } from '../../system/style-props'
import { useSwitch } from './switch.context'
import { SWITCH_DURATION } from './switch.style'
import type { SwitchThumbProps } from './switch.type'

/**
 * The knob. It slides from one end of the track to the other, and it is the only thing on
 * this component that moves.
 *
 * ```tsx
 * <Switch.Thumb>
 *   <Icon as={CheckIcon} size={12} color={theme.colors.accent} />
 * </Switch.Thumb>
 * ```
 *
 * The travel is a **number** the root computed — the track's width less the knob and its
 * padding at both ends — because a slide happens in a worklet and a worklet needs a
 * number, not a style to flatten every frame. Its colour is crossed on the same timing, so
 * the knob and the track arrive together.
 *
 * **`translateX`, not `start`.** R13 bans a directional edge in a style, and a transform
 * is not one — but a transform does not mirror under RTL either, so the sign is flipped
 * here by hand. It is the one place in the library that reads `I18nManager`, and it reads
 * it for a movement rather than for a layout.
 */
export const SwitchThumb = forwardRef<View, SwitchThumbProps>(function SwitchThumb(
  { children, animation = true, style, ...props },
  ref
) {
  const { thumbStyle, thumb, travel, isSelected } = useSwitch()
  const [styleProps, rest] = useStyleProps(props)

  const base = [thumbStyle, styleProps, style]
  const distance = I18nManager.isRTL ? -travel : travel

  // Two components rather than a branch inside one: hooks cannot be conditional, and "no
  // animation" is only true if the Reanimated hooks are never reached.
  if (!animation) {
    return (
      <View
        ref={ref}
        {...rest}
        style={[
          base,
          {
            backgroundColor: isSelected ? thumb.on : thumb.off,
            transform: [{ translateX: isSelected ? distance : 0 }],
          },
        ]}
      >
        {children}
      </View>
    )
  }

  return (
    <SlidingThumb
      ref={ref}
      style={base}
      colors={thumb}
      distance={distance}
      isSelected={isSelected}
      {...rest}
    >
      {children}
    </SlidingThumb>
  )
})

SwitchThumb.displayName = 'XAUI.Switch.Thumb'

const SlidingThumb = forwardRef<
  View,
  {
    style: StyleProp<ViewStyle>
    colors: { off: string; on: string }
    distance: number
    isSelected: boolean
    children?: ReactNode
  }
>(function SlidingThumb(
  { style, colors, distance, isSelected, children, ...rest },
  ref
) {
  // `useDerivedValue` rather than an assignment in an effect: the slide starts on the UI
  // thread the frame the prop changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(
    () => withTiming(isSelected ? 1 : 0, { duration: SWITCH_DURATION }),
    [isSelected]
  )

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [{ translateX: progress.value * distance }],
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.off, colors.on]
      ),
    }
  }, [progress, distance, colors.off, colors.on])

  return (
    <Animated.View ref={ref} {...rest} style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  )
})
