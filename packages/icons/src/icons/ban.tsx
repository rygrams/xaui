import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const BanIcon: React.FC<IconProps> = ({
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
    <>
      <Circle
        cx="256"
        cy="256"
        r="200"
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={48}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={48}
        d="m114.58 114.58l282.84 282.84"
        {...animatedProps}
      />
    </>
  )

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderIcon()}
    </Svg>
  )
}
