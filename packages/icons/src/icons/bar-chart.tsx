import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const BarChartIcon: React.FC<IconProps> = ({
  variant: _variant = 'baseline',
  size = 24,
  color = 'black',
  isAnimated = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
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
      <AnimatedPath
        fill={resolvedColor}
        d="M480 496H48a32 32 0 0 1-32-32V32a16 16 0 0 1 32 0v432h432a16 16 0 0 1 0 32"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M156 432h-40a36 36 0 0 1-36-36V244a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v152a36 36 0 0 1-36 36m144 0h-40a36 36 0 0 1-36-36V196a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v200a36 36 0 0 1-36 36m143.64 0h-40a36 36 0 0 1-36-36V132a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v264a36 36 0 0 1-36 36"
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
