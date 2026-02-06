import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoAlipayIcon: React.FC<IconProps> = ({
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
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
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
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
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
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
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
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M102.41 32C62.38 32 32 64.12 32 103.78v304.45C32 447.86 64.38 480 104.41 480h303.2c40 0 72.39-32.14 72.39-71.77v-3.11c-1.35-.56-115.47-48.57-174.5-76.7c-39.82 48.57-91.18 78-144.5 78c-90.18 0-120.8-78.22-78.1-129.72c9.31-11.22 25.15-21.94 49.73-28c38.45-9.36 99.64 5.85 157 24.61a309.4 309.4 0 0 0 25.46-61.67H138.34V194h91.13v-31.83H119.09v-17.75h110.38V99s0-7.65 7.82-7.65h44.55v53H391v17.75H281.84V194h89.08a359.4 359.4 0 0 1-37.72 94.43c27 9.69 49.31 18.88 67.39 24.89c60.32 20 77.23 22.45 79.41 22.7V103.78C480 64.12 447.6 32 407.61 32zM152 274.73q-5.81.06-11.67.63c-11.3 1.13-32.5 6.07-44.09 16.23c-34.74 30-13.94 84.93 56.37 84.93c40.87 0 81.71-25.9 113.79-67.37c-41.36-20-77-34.85-114.4-34.42"
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
