import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoPaypalIcon: React.FC<IconProps> = ({
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
        fill={resolvedColor}
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
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
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
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
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
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
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M424.81 148.79c-.43 2.76-.93 5.58-1.49 8.48c-19.17 98-84.76 131.8-168.54 131.8h-42.65a20.67 20.67 0 0 0-20.47 17.46l-21.84 137.84l-6.18 39.07a10.86 10.86 0 0 0 9.07 12.42a11 11 0 0 0 1.7.13h75.65a18.18 18.18 0 0 0 18-15.27l.74-3.83l14.24-90l.91-4.94a18.16 18.16 0 0 1 18-15.3h11.31c73.3 0 130.67-29.62 147.44-115.32c7-35.8 3.38-65.69-15.16-86.72a72.3 72.3 0 0 0-20.73-15.82"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M385.52 51.09C363.84 26.52 324.71 16 274.63 16H129.25a20.75 20.75 0 0 0-20.54 17.48l-60.55 382a12.43 12.43 0 0 0 10.39 14.22a12.6 12.6 0 0 0 1.94.15h89.76l22.54-142.29l-.7 4.46a20.67 20.67 0 0 1 20.47-17.46h42.65c83.77 0 149.36-33.86 168.54-131.8c.57-2.9 1.05-5.72 1.49-8.48c5.7-36.22-.05-60.87-19.72-83.19"
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
