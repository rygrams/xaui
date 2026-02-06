import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ArrowUpIcon: React.FC<IconProps> = ({
  variant: _variant = 'baseline',
  size = 24,
  color = 'default',
  isAnimated = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
    if (typeof color === 'string' && isThemeColor(color)) {
      return color
    }
    return color
  }, [color])

  useEffect(() => {
    if (isAnimated) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isAnimated, scaleAnim, opacityAnim])

  const animatedProps = isAnimated
    ? {
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }
    : undefined

  const renderIcon = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M256 48c-114.87 0-208 93.13-208 208s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48m91.36 212.65a16 16 0 0 1-22.63.09L272 208.42V342a16 16 0 0 1-32 0V208.42l-52.73 52.32A16 16 0 1 1 164.73 238l80-79.39a16 16 0 0 1 22.54 0l80 79.39a16 16 0 0 1 .09 22.65"
      {...animatedProps}
    />
  )

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderIcon()}
    </Svg>
  )
}
