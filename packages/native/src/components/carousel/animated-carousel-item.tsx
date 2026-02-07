import React from 'react'
import type { ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import type { CarouselLayout } from './carousel.type'
import { styles } from './carousel.style'

type AnimatedCarouselItemProps = {
  children: React.ReactNode
  index: number
  scrollX: SharedValue<number>
  width: number
  height: number
  radius: number
  spacing: number
  isLast: boolean
  customStyle?: ViewStyle
  layout: CarouselLayout
  snapInterval: number
  containerWidth: number
  contentPadding: number
}

export const AnimatedCarouselItem: React.FC<AnimatedCarouselItemProps> = ({
  children,
  index,
  scrollX,
  width,
  height,
  radius,
  spacing,
  isLast,
  customStyle,
  layout,
  snapInterval,
  containerWidth,
  contentPadding,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * snapInterval,
      index * snapInterval,
      (index + 1) * snapInterval,
    ]

    if (layout === 'multi-browse') {
      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.85, 1, 0.85],
        Extrapolation.CLAMP
      )

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.6, 1, 0.6],
        Extrapolation.CLAMP
      )

      return {
        transform: [{ scale }],
        opacity,
      }
    }

    if (layout === 'hero') {
      const centerOffset = containerWidth / 2 - contentPadding - width / 2
      const itemPosition = index * snapInterval + contentPadding

      const inputRangeHero = [
        itemPosition - centerOffset - snapInterval,
        itemPosition - centerOffset,
        itemPosition - centerOffset + snapInterval,
      ]

      const scale = interpolate(
        scrollX.value,
        inputRangeHero,
        [0.9, 1, 0.9],
        Extrapolation.CLAMP
      )

      const opacity = interpolate(
        scrollX.value,
        inputRangeHero,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      )

      const translateX = interpolate(
        scrollX.value,
        inputRangeHero,
        [-10, 0, 10],
        Extrapolation.CLAMP
      )

      return {
        transform: [{ scale }, { translateX }],
        opacity,
      }
    }

    return {}
  }, [index, snapInterval, layout, containerWidth, contentPadding, width])

  return (
    <Animated.View
      style={[
        styles.item,
        {
          width,
          height,
          borderRadius: radius,
          marginRight: isLast ? 0 : spacing,
        },
        customStyle,
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  )
}
