import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FlowerIcon: React.FC<IconProps> = ({
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
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M215.08 156.92c-4.89-24-10.77-56.27-10.77-73.23A51.36 51.36 0 0 1 256 32h0c28.55 0 51.69 23.69 51.69 51.69c0 16.5-5.85 48.95-10.77 73.23m-81.84 198.16c-4.91 24.06-10.77 56.16-10.77 73.23A51.36 51.36 0 0 0 256 480h0c28.55 0 51.69-23.69 51.69-51.69c0-16.54-5.85-48.93-10.77-73.23m58.16-140c24.06-4.91 56.16-10.77 73.23-10.77A51.36 51.36 0 0 1 480 256h0c0 28.55-23.69 51.69-51.69 51.69c-16.5 0-48.95-5.85-73.23-10.77m-198.16-81.85c-24-4.89-56.25-10.76-73.23-10.76A51.36 51.36 0 0 0 32 256h0c0 28.55 23.69 51.69 51.69 51.69c16.5 0 48.95-5.85 73.23-10.77"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M296.92 156.92c13.55-20.48 32.3-47.25 44.37-59.31a51.35 51.35 0 0 1 73.1 0h0c20.19 20.19 19.8 53.3 0 73.1c-11.66 11.67-38.67 30.67-59.31 44.37m-198.16 81.84c-20.48 13.55-47.25 32.3-59.31 44.37a51.35 51.35 0 0 0 0 73.1h0c20.19 20.19 53.3 19.8 73.1 0c11.67-11.66 30.67-38.67 44.37-59.31m140-58.16c20.48 13.55 47.25 32.3 59.31 44.37a51.35 51.35 0 0 1 0 73.1h0c-20.19 20.19-53.3 19.8-73.1 0c-11.69-11.69-30.66-38.65-44.37-59.31m-81.84-198.16c-13.53-20.43-32.38-47.32-44.37-59.31a51.35 51.35 0 0 0-73.1 0h0c-20.19 20.19-19.8 53.3 0 73.1c11.61 11.61 38.7 30.68 59.31 44.37"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={64}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedCircle
        cx={256}
        cy={256}
        r={48}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M475.93 303.91a67.49 67.49 0 0 0-44.34-115.53a5.2 5.2 0 0 1-4.58-3.21a5.21 5.21 0 0 1 1-5.51A67.83 67.83 0 0 0 378 66.33h-.25A67.13 67.13 0 0 0 332.35 84a5.21 5.21 0 0 1-5.52 1a5.23 5.23 0 0 1-3.22-4.58a67.68 67.68 0 0 0-135.23 0a5.2 5.2 0 0 1-3.21 4.58a5.21 5.21 0 0 1-5.52-1a67.1 67.1 0 0 0-45.44-17.69H134a67.91 67.91 0 0 0-50 113.34a5.21 5.21 0 0 1 1 5.51a5.2 5.2 0 0 1-4.58 3.21a67.71 67.71 0 0 0 0 135.23a5.23 5.23 0 0 1 4.58 3.23a5.22 5.22 0 0 1-1 5.52a67.54 67.54 0 0 0 50.08 113h.25A67.38 67.38 0 0 0 179.65 428a5.21 5.21 0 0 1 5.51-1a5.2 5.2 0 0 1 3.21 4.58a67.71 67.71 0 0 0 135.23 0a5.23 5.23 0 0 1 3.22-4.58a5.21 5.21 0 0 1 5.51 1a67.38 67.38 0 0 0 45.29 17.42h.25a67.48 67.48 0 0 0 50.08-113a5.22 5.22 0 0 1-1-5.52a5.23 5.23 0 0 1 4.58-3.22a67.3 67.3 0 0 0 44.4-19.77M256 336a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80"
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M215.08 156.92c-4.89-24-10.77-56.27-10.77-73.23A51.36 51.36 0 0 1 256 32h0c28.55 0 51.69 23.69 51.69 51.69c0 16.5-5.85 48.95-10.77 73.23m-81.84 198.16c-4.91 24.06-10.77 56.16-10.77 73.23A51.36 51.36 0 0 0 256 480h0c28.55 0 51.69-23.69 51.69-51.69c0-16.54-5.85-48.93-10.77-73.23m58.16-140c24.06-4.91 56.16-10.77 73.23-10.77A51.36 51.36 0 0 1 480 256h0c0 28.55-23.69 51.69-51.69 51.69c-16.5 0-48.95-5.85-73.23-10.77m-198.16-81.85c-24-4.89-56.25-10.76-73.23-10.76A51.36 51.36 0 0 0 32 256h0c0 28.55 23.69 51.69 51.69 51.69c16.5 0 48.95-5.85 73.23-10.77"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M296.92 156.92c13.55-20.48 32.3-47.25 44.37-59.31a51.35 51.35 0 0 1 73.1 0h0c20.19 20.19 19.8 53.3 0 73.1c-11.66 11.67-38.67 30.67-59.31 44.37m-198.16 81.84c-20.48 13.55-47.25 32.3-59.31 44.37a51.35 51.35 0 0 0 0 73.1h0c20.19 20.19 53.3 19.8 73.1 0c11.67-11.66 30.67-38.67 44.37-59.31m140-58.16c20.48 13.55 47.25 32.3 59.31 44.37a51.35 51.35 0 0 1 0 73.1h0c-20.19 20.19-53.3 19.8-73.1 0c-11.69-11.69-30.66-38.65-44.37-59.31m-81.84-198.16c-13.53-20.43-32.38-47.32-44.37-59.31a51.35 51.35 0 0 0-73.1 0h0c-20.19 20.19-19.8 53.3 0 73.1c11.61 11.61 38.7 30.68 59.31 44.37"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={64}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M215.08 156.92c-4.89-24-10.77-56.27-10.77-73.23A51.36 51.36 0 0 1 256 32h0c28.55 0 51.69 23.69 51.69 51.69c0 16.5-5.85 48.95-10.77 73.23m-81.84 198.16c-4.91 24.06-10.77 56.16-10.77 73.23A51.36 51.36 0 0 0 256 480h0c28.55 0 51.69-23.69 51.69-51.69c0-16.54-5.85-48.93-10.77-73.23m58.16-140c24.06-4.91 56.16-10.77 73.23-10.77A51.36 51.36 0 0 1 480 256h0c0 28.55-23.69 51.69-51.69 51.69c-16.5 0-48.95-5.85-73.23-10.77m-198.16-81.85c-24-4.89-56.25-10.76-73.23-10.76A51.36 51.36 0 0 0 32 256h0c0 28.55 23.69 51.69 51.69 51.69c16.5 0 48.95-5.85 73.23-10.77"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M296.92 156.92c13.55-20.48 32.3-47.25 44.37-59.31a51.35 51.35 0 0 1 73.1 0h0c20.19 20.19 19.8 53.3 0 73.1c-11.66 11.67-38.67 30.67-59.31 44.37m-198.16 81.84c-20.48 13.55-47.25 32.3-59.31 44.37a51.35 51.35 0 0 0 0 73.1h0c20.19 20.19 53.3 19.8 73.1 0c11.67-11.66 30.67-38.67 44.37-59.31m140-58.16c20.48 13.55 47.25 32.3 59.31 44.37a51.35 51.35 0 0 1 0 73.1h0c-20.19 20.19-53.3 19.8-73.1 0c-11.69-11.69-30.66-38.65-44.37-59.31m-81.84-198.16c-13.53-20.43-32.38-47.32-44.37-59.31a51.35 51.35 0 0 0-73.1 0h0c-20.19 20.19-19.8 53.3 0 73.1c11.61 11.61 38.7 30.68 59.31 44.37"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={64}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M215.08 156.92c-4.89-24-10.77-56.27-10.77-73.23A51.36 51.36 0 0 1 256 32h0c28.55 0 51.69 23.69 51.69 51.69c0 16.5-5.85 48.95-10.77 73.23m-81.84 198.16c-4.91 24.06-10.77 56.16-10.77 73.23A51.36 51.36 0 0 0 256 480h0c28.55 0 51.69-23.69 51.69-51.69c0-16.54-5.85-48.93-10.77-73.23m58.16-140c24.06-4.91 56.16-10.77 73.23-10.77A51.36 51.36 0 0 1 480 256h0c0 28.55-23.69 51.69-51.69 51.69c-16.5 0-48.95-5.85-73.23-10.77m-198.16-81.85c-24-4.89-56.25-10.76-73.23-10.76A51.36 51.36 0 0 0 32 256h0c0 28.55 23.69 51.69 51.69 51.69c16.5 0 48.95-5.85 73.23-10.77"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M296.92 156.92c13.55-20.48 32.3-47.25 44.37-59.31a51.35 51.35 0 0 1 73.1 0h0c20.19 20.19 19.8 53.3 0 73.1c-11.66 11.67-38.67 30.67-59.31 44.37m-198.16 81.84c-20.48 13.55-47.25 32.3-59.31 44.37a51.35 51.35 0 0 0 0 73.1h0c20.19 20.19 53.3 19.8 73.1 0c11.67-11.66 30.67-38.67 44.37-59.31m140-58.16c20.48 13.55 47.25 32.3 59.31 44.37a51.35 51.35 0 0 1 0 73.1h0c-20.19 20.19-53.3 19.8-73.1 0c-11.69-11.69-30.66-38.65-44.37-59.31m-81.84-198.16c-13.53-20.43-32.38-47.32-44.37-59.31a51.35 51.35 0 0 0-73.1 0h0c-20.19 20.19-19.8 53.3 0 73.1c11.61 11.61 38.7 30.68 59.31 44.37"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={64}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedCircle
        cx={256}
        cy={256}
        r={43}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M475.93 303.91a67.49 67.49 0 0 0-47.62-115.6c-2.88 0-6.2.14-9.93.43c2.75-2.36 5.23-4.62 7.33-6.71A67.83 67.83 0 0 0 378 66.33h-.25a67.27 67.27 0 0 0-47.82 20c-2.11 2.11-4.37 4.59-6.72 7.33c.29-3.75.44-7.07.44-9.93a67.69 67.69 0 1 0-135.38 0c0 2.87.15 6.19.44 9.93c-2.36-2.74-4.62-5.22-6.72-7.33a67.27 67.27 0 0 0-47.82-20H134A67.9 67.9 0 0 0 86.29 182c2.1 2.09 4.58 4.35 7.34 6.72c-3.74-.29-7.06-.44-9.94-.44a67.69 67.69 0 0 0 0 135.38c2.86 0 6.18-.15 9.93-.44c-2.74 2.35-5.22 4.61-7.33 6.72a67.55 67.55 0 0 0 47.82 115.42h.25A67.32 67.32 0 0 0 182 425.71c2.09-2.1 4.35-4.58 6.71-7.33c-.28 3.73-.43 7.05-.43 9.93a67.69 67.69 0 0 0 135.38 0c0-2.87-.15-6.19-.44-9.94c2.36 2.75 4.62 5.24 6.72 7.34a67.32 67.32 0 0 0 47.67 19.68h.25A67.5 67.5 0 0 0 425.71 330c-2.11-2.11-4.59-4.37-7.33-6.72c3.75.29 7.07.44 9.93.44a67.27 67.27 0 0 0 47.62-19.81M256 341a85 85 0 1 1 85-85a85.1 85.1 0 0 1-85 85"
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
