import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CalendarIcon: React.FC<IconProps> = ({
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
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24"
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
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
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
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
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
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64"
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
