import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const AmericanFootballIcon: React.FC<IconProps> = ({
  variant = 'baseline',
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

  const renderBaseline = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M120.9 120.51c-44.75 44.56-67.29 101.05-78.64 145.9l202.31 201.44c45.05-11.3 101.78-33.74 146.53-78.3s67.29-101.05 78.64-145.91L267.43 42.21C222.38 53.51 165.65 76 120.9 120.51m214 33.63l22.52 22.42l-33.78 33.63l22.52 22.42L323.55 255L301 232.61L278.52 255L301 277.45l-22.51 22.42L256 277.45l-22.52 22.42L256 322.29l-22.52 22.42L211 322.29l-33.78 33.63l-22.55-22.42l33.78-33.63l-22.52-22.42L188.45 255L211 277.45L233.48 255L211 232.61l22.51-22.42L256 232.61l22.52-22.42L256 187.77l22.52-22.42L301 187.77Zm143.58 44.27C485.85 143.65 464 48.05 464 48.05s-96.14-21.88-151.14-14.54c-2.54.33-5.21.72-8 1.14l172.47 171.71c.43-2.76.81-5.42 1.15-7.95M33.52 311.65C26.15 366.41 48.05 464 48.05 464s60 16 99.86 16a392 392 0 0 0 51.23-3.45c2.54-.33 5.21-.72 8-1.15L34.67 303.7c-.43 2.76-.81 5.42-1.15 7.95"
      {...animatedProps}
    />
  )

  const renderFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M122.06 122.06c-44.37 44.37-66.71 100.61-78 145.28l200.6 200.56c44.67-11.25 100.91-33.59 145.28-78s66.71-100.61 78-145.28L267.34 44.1c-44.67 11.25-100.91 33.59-145.28 77.96M300.65 189L323 166.71A15.78 15.78 0 0 1 345.29 189L323 211.35l11.16 11.17a15.78 15.78 0 0 1-22.32 22.32l-11.16-11.16L278.32 256l11.16 11.16a15.78 15.78 0 1 1-22.32 22.32L256 278.32l-22.32 22.33l11.16 11.16a15.78 15.78 0 1 1-22.32 22.32L211.35 323L189 345.29A15.78 15.78 0 0 1 166.71 323L189 300.65l-11.16-11.17a15.78 15.78 0 0 1 22.32-22.32l11.16 11.16L233.68 256l-11.16-11.16a15.78 15.78 0 1 1 22.32-22.32L256 233.68l22.32-22.33l-11.16-11.16a15.78 15.78 0 0 1 22.32-22.32Zm175.92 10.63c7.31-54.53 4-120.26-20-144.21s-89.68-27.3-144.21-20c-2.51.34-5.16.72-7.91 1.15l171 171c.4-2.78.78-5.43 1.12-7.94M35.43 312.37c-7.31 54.53-4 120.26 20 144.21C72.17 473.33 109.34 480 148.84 480a387 387 0 0 0 50.79-3.43c2.51-.34 5.16-.72 7.91-1.15l-171-171c-.39 2.79-.77 5.44-1.11 7.95"
      {...animatedProps}
    />
  )

  const renderVariant = () => {
    switch (variant) {
      case 'filled':
      case 'round-filled':
      case 'square-filled':
        return renderFilled()
      case 'baseline':
      case 'round-outlined':
      case 'square-outlined':
      case 'duotone':
      default:
        return renderBaseline()
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderVariant()}
    </Svg>
  )
}
