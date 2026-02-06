import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ColorWandIcon: React.FC<IconProps> = ({
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
      <AnimatedRect
        width={63.03}
        height={378.2}
        x={280.48}
        y={122.9}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={31.52}
        transform="rotate(-45 312.002 311.994)"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M178.38 178.38a31.64 31.64 0 0 0 0 44.75L223.25 268L268 223.25l-44.87-44.87a31.64 31.64 0 0 0-44.75 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M48 192h48M90.18 90.18l33.94 33.94M192 48v48m101.82-5.82l-33.94 33.94M124.12 259.88l-33.94 33.94"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M96 208H48c-8.8 0-16-7.2-16-16s7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16m28.1-67.9c-4.2 0-8.3-1.7-11.3-4.7l-33.9-33.9c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l33.9 33.9c6.3 6.2 6.3 16.4 0 22.6c-3 3-7 4.7-11.3 4.7M192 112c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16s16 7.2 16 16v48c0 8.8-7.2 16-16 16m67.9 28.1c-8.8 0-16-7.2-16-16c0-4.2 1.7-8.3 4.7-11.3l33.9-33.9c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-33.9 33.9c-3 3-7.1 4.7-11.3 4.7M90.2 309.8c-8.8 0-16-7.2-16-16c0-4.2 1.7-8.3 4.7-11.3l33.9-33.9c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-33.9 33.9c-3 3-7.1 4.7-11.3 4.7m144-142.8c-18.4-18.7-48.5-19-67.2-.7s-19 48.5-.7 67.2l.7.7l39.5 39.5c3.1 3.1 8.2 3.1 11.3 0l55.9-55.9c3.1-3.1 3.1-8.2 0-11.3zM457 389.8L307.6 240.4c-3.1-3.1-8.2-3.1-11.3 0l-55.9 55.9c-3.1 3.1-3.1 8.2 0 11.3L389.8 457c18.4 18.7 48.5 19 67.2.7c18.7-18.4 19-48.5.7-67.2c-.2-.2-.4-.5-.7-.7"
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
        width={63.03}
        height={378.2}
        x={280.48}
        y={122.9}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={31.52}
        transform="rotate(-45 312.002 311.994)"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M178.38 178.38a31.64 31.64 0 0 0 0 44.75L223.25 268L268 223.25l-44.87-44.87a31.64 31.64 0 0 0-44.75 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M48 192h48M90.18 90.18l33.94 33.94M192 48v48m101.82-5.82l-33.94 33.94M124.12 259.88l-33.94 33.94"
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
        width={63.03}
        height={378.2}
        x={280.48}
        y={122.9}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={31.52}
        transform="rotate(-45 312.002 311.994)"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M178.38 178.38a31.64 31.64 0 0 0 0 44.75L223.25 268L268 223.25l-44.87-44.87a31.64 31.64 0 0 0-44.75 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M48 192h48M90.18 90.18l33.94 33.94M192 48v48m101.82-5.82l-33.94 33.94M124.12 259.88l-33.94 33.94"
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
        width={63.03}
        height={378.2}
        x={280.48}
        y={122.9}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={31.52}
        transform="rotate(-45 312.002 311.994)"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M178.38 178.38a31.64 31.64 0 0 0 0 44.75L223.25 268L268 223.25l-44.87-44.87a31.64 31.64 0 0 0-44.75 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M48 192h48M90.18 90.18l33.94 33.94M192 48v48m101.82-5.82l-33.94 33.94M124.12 259.88l-33.94 33.94"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m133.441 200.647l67.197-67.196l78.142 78.142l-67.196 67.197zM301.41 234.21l-67.19 67.2L412 480l68-68zM32 176h80v32H32zm35.624-85.75L90.25 67.622l56.569 56.569l-22.628 22.627zM176 32h32v80h-32zm61.32 92.195l56.569-56.569l22.627 22.627l-56.568 56.569zM67.62 293.886l56.569-56.568l22.627 22.627l-56.568 56.569z"
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
