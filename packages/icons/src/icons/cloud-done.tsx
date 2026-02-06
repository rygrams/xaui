import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CloudDoneIcon: React.FC<IconProps> = ({
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
    <>
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M400 240c-8.89-89.54-71-144-144-144c-69 0-113.44 48.2-128 96c-60 6-112 43.59-112 112c0 66 54 112 120 112h260c55 0 100-27.44 100-88c0-59.82-53-85.76-96-88Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M317 208L209.2 336L163 284.8"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M424.44 227.25a16 16 0 0 1-12.12-12.39c-7.68-36.68-24.45-68.15-49.18-92A153.57 153.57 0 0 0 256 80c-35.5 0-68.24 11.69-94.68 33.8a156.24 156.24 0 0 0-42 56a16 16 0 0 1-11.37 9.15c-27 5.62-51.07 17.34-69.18 33.87C13.39 235.88 0 267.42 0 304c0 36 14.38 68.88 40.49 92.59C65.64 419.43 99.56 432 136 432h260c32.37 0 60.23-8.57 80.59-24.77C499.76 388.78 512 361.39 512 328c0-57.57-42-90.58-87.56-100.75m-95.2-8.94l-107.8 128a16 16 0 0 1-12 5.69h-.27a16 16 0 0 1-11.88-5.28l-45.9-50.87c-5.77-6.39-5.82-16.33.3-22.4a16 16 0 0 1 23.16.63l33.9 37.58l96-114a16 16 0 1 1 24.48 20.62Z"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M400 240c-8.89-89.54-71-144-144-144c-69 0-113.44 48.2-128 96c-60 6-112 43.59-112 112c0 66 54 112 120 112h260c55 0 100-27.44 100-88c0-59.82-53-85.76-96-88Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M317 208L209.2 336L163 284.8"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M400 240c-8.89-89.54-71-144-144-144c-69 0-113.44 48.2-128 96c-60 6-112 43.59-112 112c0 66 54 112 120 112h260c55 0 100-27.44 100-88c0-59.82-53-85.76-96-88Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M317 208L209.2 336L163 284.8"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M400 240c-8.89-89.54-71-144-144-144c-69 0-113.44 48.2-128 96c-60 6-112 43.59-112 112c0 66 54 112 120 112h260c55 0 100-27.44 100-88c0-59.82-53-85.76-96-88Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M317 208L209.2 336L163 284.8"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.25 225.36c-6.52-41.18-24.05-76.4-51.11-102.46A153.57 153.57 0 0 0 256 80c-35.5 0-68.24 11.69-94.68 33.8a156.4 156.4 0 0 0-45.22 63.61c-30.26 4.81-57.45 17.18-77.38 35.37C13.39 235.88 0 267.42 0 304c0 36 14.38 68.88 40.49 92.59C65.64 419.43 99.56 432 136 432h260c32.37 0 60.23-8.57 80.59-24.77C499.76 388.78 512 361.39 512 328c0-61.85-48.44-95.34-97.75-102.64m-204.63 135l-69.22-76.7l23.76-21.44l44.62 49.46l106.29-126.2l24.47 20.61Z"
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
