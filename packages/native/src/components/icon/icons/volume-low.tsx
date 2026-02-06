import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const VolumeLowIcon: React.FC<IconProps> = ({
  variant = 'baseline',
  size = 24,
  color = 'default',
  isAnimated = false,
}) => {
  const theme = useXUITheme()
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
    if (typeof color === 'string' && isThemeColor(color)) {
      return theme.colors[color].main
    }
    return color
  }, [color, theme])

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
    <>
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M189.65 192H120a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h69.65a16 16 0 0 1 10.14 3.63l91.47 75a8 8 0 0 0 12.74-6.46V119.83a8 8 0 0 0-12.74-6.44l-91.47 75a16 16 0 0 1-10.14 3.61M384 320c9.74-19.41 16-40.81 16-64c0-23.51-6-44.4-16-64"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M296 416.19a23.92 23.92 0 0 1-14.21-4.69l-.66-.51l-91.46-75H120a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.65l91.46-75l.66-.51A24 24 0 0 1 320 119.83v272.34a24 24 0 0 1-24 24ZM384 336a16 16 0 0 1-14.29-23.18c9.49-18.9 14.3-38 14.3-56.82c0-19.36-4.66-37.92-14.25-56.73a16 16 0 0 1 28.5-14.54C410.2 208.16 416 231.47 416 256c0 23.83-6 47.78-17.7 71.18A16 16 0 0 1 384 336"
        {...animatedProps}
      />
    </>
  )

  const renderDuotone = () => (
    <>
      <AnimatedCircle
        cx={256}
        cy={256}
        r={192}
        fill={resolvedColor}
        opacity={0.3}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M189.65 192H120a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h69.65a16 16 0 0 1 10.14 3.63l91.47 75a8 8 0 0 0 12.74-6.46V119.83a8 8 0 0 0-12.74-6.44l-91.47 75a16 16 0 0 1-10.14 3.61M384 320c9.74-19.41 16-40.81 16-64c0-23.51-6-44.4-16-64"
        {...animatedProps}
      />
    </>
  )

  const renderRoundOutlined = () => (
    <>
      <AnimatedCircle
        cx={256}
        cy={256}
        r={192}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M189.65 192H120a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h69.65a16 16 0 0 1 10.14 3.63l91.47 75a8 8 0 0 0 12.74-6.46V119.83a8 8 0 0 0-12.74-6.44l-91.47 75a16 16 0 0 1-10.14 3.61M384 320c9.74-19.41 16-40.81 16-64c0-23.51-6-44.4-16-64"
        {...animatedProps}
      />
    </>
  )

  const renderSquareOutlined = () => (
    <>
      <AnimatedRect
        x={64}
        y={64}
        width={384}
        height={384}
        rx={48}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M189.65 192H120a8 8 0 0 0-8 8v112a8 8 0 0 0 8 8h69.65a16 16 0 0 1 10.14 3.63l91.47 75a8 8 0 0 0 12.74-6.46V119.83a8 8 0 0 0-12.74-6.44l-91.47 75a16 16 0 0 1-10.14 3.61M384 320c9.74-19.41 16-40.81 16-64c0-23.51-6-44.4-16-64"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m391.12 341.48l-28.6-14.36l7.18-14.3c9.49-18.9 14.3-38 14.3-56.82c0-19.36-4.66-37.92-14.25-56.73L362.48 185L391 170.48l7.26 14.25C410.2 208.16 416 231.47 416 256c0 23.83-6 47.78-17.7 71.18ZM189.65 176.1H96v159.8h93.65L320 440V72z"
        {...animatedProps}
      />
    </>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'filled':
        return renderFilled()
      case 'duotone':
        return renderDuotone()
      case 'round-outlined':
        return renderRoundOutlined()
      case 'square-outlined':
        return renderSquareOutlined()
      case 'round-filled':
        return renderRoundFilled()
      case 'square-filled':
        return renderSquareFilled()
      case 'baseline':
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
