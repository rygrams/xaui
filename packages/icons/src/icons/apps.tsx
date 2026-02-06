import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const AppsIcon: React.FC<IconProps> = ({
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
    <AnimatedPath
      fill={resolvedColor}
      d="M104 160a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56M104 312a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56M104 464a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56m152 0a56 56 0 1 1 56-56a56.06 56.06 0 0 1-56 56"
      {...animatedProps}
    />
  )

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderIcon()}
    </Svg>
  )
}
