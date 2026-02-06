import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ArrowDownLeftBoxIcon: React.FC<IconProps> = ({
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
      fillRule="evenodd"
      d="M180.364 480H48a16 16 0 0 1-16-16V331.636c0-8.836 7.163-16 16-16s16 7.164 16 16v93.737l51.128-51.128a58.5 58.5 0 0 0 22.591 22.663L86.627 448h93.737c8.836 0 16 7.163 16 16s-7.164 16-16 16m-42.645-83.092a58.54 58.54 0 0 0 28.59 7.456h255.146A58.545 58.545 0 0 0 480 345.818V90.545A58.543 58.543 0 0 0 421.455 32H166.182a58.545 58.545 0 0 0-58.546 58.545v255.273q.001 1.213.176 2.378a58.54 58.54 0 0 0 7.316 26.049l169.558-169.559c6.249-6.248 16.379-6.248 22.628 0s6.248 16.379 0 22.628z"
      clipRule="evenodd"
      {...animatedProps}
    />
  )

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderIcon()}
    </Svg>
  )
}
