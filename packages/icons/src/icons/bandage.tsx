import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const BandageIcon: React.FC<IconProps> = ({
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

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M275.8 157a16 16 0 0 0-22.63 0l-93.34 93.34a16 16 0 0 0 0 22.63l79.2 79.2a16 16 0 0 0 22.63 0L355 258.83a16 16 0 0 0 0-22.63Zm-56.49 110.31a16 16 0 1 1 0-22.62a16 16 0 0 1 0 22.62m48 48a16 16 0 1 1 0-22.62a16 16 0 0 1 0 22.62m0-96a16 16 0 1 1 0-22.62a16 16 0 0 1 0 22.62m48 48a16 16 0 1 1 0-22.62a16 16 0 0 1 0 22.62m150.3-220.92a104.38 104.38 0 0 0-147.25 0l-69.76 69.89a4 4 0 0 0 4.2 6.58a35.7 35.7 0 0 1 11.69-2.54a47.7 47.7 0 0 1 33.94 14.06l79.19 79.19a47.7 47.7 0 0 1 14.06 33.94a35.7 35.7 0 0 1-2.54 11.69a4 4 0 0 0 6.58 4.2l69.89-69.76a104.38 104.38 0 0 0 0-147.25"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M254.34 386.83a47.9 47.9 0 0 1-33.94-14l-79.19-79.23a47.8 47.8 0 0 1-9.43-13.38c-4.59-9.7-1.39-25 2.48-36.9a4 4 0 0 0-6.64-4l-77.23 77.04a104.12 104.12 0 0 0 147.25 147.25l72.75-72.88a4 4 0 0 0-4.21-6.58c-4.18 1.58-8.4 2.68-11.84 2.68"
        {...animatedProps}
      />
    </>
  )

  const renderOutlined = () => (
    <>
      <Rect
        width="560.87"
        height="176.25"
        x="-24.43"
        y="167.88"
        rx="88.12"
        ry="88.12"
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        transform="rotate(-45 256 256.002)"
      />
      <Rect
        width="176"
        height="196"
        x="169.41"
        y="156.59"
        rx="32"
        ry="32"
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        transform="rotate(45 257.409 254.582)"
      />
      <Circle cx="256" cy="208" r="16" fill={resolvedColor} />
      <Circle cx="304" cy="256" r="16" fill={resolvedColor} />
      <Circle cx="208" cy="256" r="16" fill={resolvedColor} />
      <Circle cx="256" cy="304" r="16" fill={resolvedColor} />
    </>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'round-outlined':
        return renderOutlined()
      case 'filled':
      case 'duotone':
      case 'square-outlined':
      case 'round-filled':
      case 'square-filled':
      case 'baseline':
      default:
        return renderFilled()
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderVariant()}
    </Svg>
  )
}
