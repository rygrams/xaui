import { forwardRef } from 'react'
import { I18nManager, View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useSwitch } from './switch.context'
import { thumbOffset } from './switch.travel'
import type { TravelGeometry } from './switch.travel'
import type { SwitchThumbProps } from './switch.type'

/**
 * The block that slides, standing above and below the track and cut out of it by a margin
 * of the ground's colour. Held, it shrinks a little; let go, it springs to its end.
 *
 * ```tsx
 * <Switch.Thumb />
 * ```
 *
 * It is moved by `translateX`, which does not mirror under RTL the way `start` does, so
 * the direction is flipped here by hand.
 */
export const SwitchThumb = forwardRef<View, SwitchThumbProps>(function SwitchThumb(
  { children, animation = true, style, ...props },
  ref
) {
  const { thumbStyle, blockStyle, geometry, progress, squash, isSelected } =
    useSwitch()
  const [styleProps, rest] = useStyleProps(props)

  const base = [thumbStyle, styleProps, style]
  const block = <View style={blockStyle}>{children}</View>
  const towardEnd = I18nManager.isRTL ? -1 : 1

  // Two components rather than a branch in one: "no animation" is only true if the
  // Reanimated hooks are never reached.
  if (!animation) {
    const translateX = thumbOffset(isSelected ? 1 : 0, geometry) * towardEnd

    return (
      <View ref={ref} {...rest} style={[base, { transform: [{ translateX }] }]}>
        {block}
      </View>
    )
  }

  return (
    <SlidingThumb
      ref={ref}
      style={base}
      geometry={geometry}
      progress={progress}
      squash={squash}
      towardEnd={towardEnd}
      {...rest}
    >
      {block}
    </SlidingThumb>
  )
})

SwitchThumb.displayName = 'XAUI.Tram.Switch.Thumb'

type SlidingThumbProps = {
  style: StyleProp<ViewStyle>
  geometry: TravelGeometry
  progress: SharedValue<number>
  squash: SharedValue<number>
  towardEnd: number
  children?: ReactNode
}

const SlidingThumb = forwardRef<View, SlidingThumbProps>(function SlidingThumb(
  { style, geometry, progress, squash, towardEnd, children, ...rest },
  ref
) {
  const moved = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        { translateX: thumbOffset(progress.value, geometry) * towardEnd },
        { scale: squash.value },
      ],
    }
  }, [progress, squash, geometry, towardEnd])

  return (
    <Animated.View ref={ref} {...rest} style={[style, moved]}>
      {children}
    </Animated.View>
  )
})
