import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const HeartDislikeCircleIcon: React.FC<IconProps> = ({
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M333.2 297.69c18.28-23.39 27.06-47.43 26.79-73.37c-.31-31.06-25.22-56.33-55.53-56.33c-20.4 0-35 10.64-44.11 20.42a5.93 5.93 0 0 1-8.7 0c-9.11-9.78-23.71-20.42-44.11-20.42L206 168a4 4 0 0 0-2.75 6.84l124 123.21a3.92 3.92 0 0 0 5.95-.36M158.84 221a4 4 0 0 0-6.82 2.72v.64c-.28 27.1 9.31 52.13 29.3 76.5c9.38 11.44 26.4 29.73 65.7 56.41a15.93 15.93 0 0 0 18 0c5.15-3.49 9.9-6.84 14.31-10a4 4 0 0 0 .46-6.07ZM336 368a15.92 15.92 0 0 1-11.31-4.69l-176-176a16 16 0 0 1 22.62-22.62l176 176A16 16 0 0 1 336 368"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m23.3 299.19c-4.41 3.2-9.16 6.55-14.31 10a15.93 15.93 0 0 1-18 0c-39.3-26.68-56.32-45-65.7-56.41c-20-24.37-29.58-49.4-29.3-76.5v-.64a4 4 0 0 1 6.82-2.72l120.95 120.2a4 4 0 0 1-.46 6.07m68 16.12a16 16 0 0 1-22.62 0l-176-176a16 16 0 0 1 22.62-22.62l176 176a16 16 0 0 1 .01 22.62Zm-14.1-65.62a3.92 3.92 0 0 1-6 .37l-124-123.21A4 4 0 0 1 206 168h1.55c20.4 0 35 10.64 44.11 20.42a5.93 5.93 0 0 0 8.7 0c9.11-9.78 23.71-20.42 44.11-20.42c30.31 0 55.22 25.27 55.53 56.33c.26 25.93-8.52 49.97-26.8 73.36"
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M333.2 297.69c18.28-23.39 27.06-47.43 26.79-73.37c-.31-31.06-25.22-56.33-55.53-56.33c-20.4 0-35 10.64-44.11 20.42a5.93 5.93 0 0 1-8.7 0c-9.11-9.78-23.71-20.42-44.11-20.42L206 168a4 4 0 0 0-2.75 6.84l124 123.21a3.92 3.92 0 0 0 5.95-.36M158.84 221a4 4 0 0 0-6.82 2.72v.64c-.28 27.1 9.31 52.13 29.3 76.5c9.38 11.44 26.4 29.73 65.7 56.41a15.93 15.93 0 0 0 18 0c5.15-3.49 9.9-6.84 14.31-10a4 4 0 0 0 .46-6.07ZM336 368a15.92 15.92 0 0 1-11.31-4.69l-176-176a16 16 0 0 1 22.62-22.62l176 176A16 16 0 0 1 336 368"
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M333.2 297.69c18.28-23.39 27.06-47.43 26.79-73.37c-.31-31.06-25.22-56.33-55.53-56.33c-20.4 0-35 10.64-44.11 20.42a5.93 5.93 0 0 1-8.7 0c-9.11-9.78-23.71-20.42-44.11-20.42L206 168a4 4 0 0 0-2.75 6.84l124 123.21a3.92 3.92 0 0 0 5.95-.36M158.84 221a4 4 0 0 0-6.82 2.72v.64c-.28 27.1 9.31 52.13 29.3 76.5c9.38 11.44 26.4 29.73 65.7 56.41a15.93 15.93 0 0 0 18 0c5.15-3.49 9.9-6.84 14.31-10a4 4 0 0 0 .46-6.07ZM336 368a15.92 15.92 0 0 1-11.31-4.69l-176-176a16 16 0 0 1 22.62-22.62l176 176A16 16 0 0 1 336 368"
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M333.2 297.69c18.28-23.39 27.06-47.43 26.79-73.37c-.31-31.06-25.22-56.33-55.53-56.33c-20.4 0-35 10.64-44.11 20.42a5.93 5.93 0 0 1-8.7 0c-9.11-9.78-23.71-20.42-44.11-20.42L206 168a4 4 0 0 0-2.75 6.84l124 123.21a3.92 3.92 0 0 0 5.95-.36M158.84 221a4 4 0 0 0-6.82 2.72v.64c-.28 27.1 9.31 52.13 29.3 76.5c9.38 11.44 26.4 29.73 65.7 56.41a15.93 15.93 0 0 0 18 0c5.15-3.49 9.9-6.84 14.31-10a4 4 0 0 0 .46-6.07ZM336 368a15.92 15.92 0 0 1-11.31-4.69l-176-176a16 16 0 0 1 22.62-22.62l176 176A16 16 0 0 1 336 368"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m63.73 310.36l-183.14-182.3l22.74-22.51l183.19 182.36Zm-63.51 4.86c-35.36-25-66.31-51.92-74.91-62.4c-20-24.37-29.58-49.4-29.3-76.5a58 58 0 0 1 .85-9.31l130.21 129.4c-3.43 2.59-16.21 11.45-26.85 18.81m74.47-62.4l-.31.38L197.33 169a54 54 0 0 1 10.21-1a59.34 59.34 0 0 1 44.1 19.41L256 192l4.36-4.6a59.34 59.34 0 0 1 44.1-19.4c30.31 0 55.22 25.27 55.53 56.33c.28 27.09-9.31 52.12-29.3 76.49"
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
