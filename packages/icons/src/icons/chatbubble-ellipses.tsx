import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ChatbubbleEllipsesIcon: React.FC<IconProps> = ({
  variant = 'baseline',
  size = 24,
  color = 'black',
  isAnimated = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
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
        d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a43 43 0 0 0-2.54-3.8a199.8 199.8 0 0 1-33-110C47.64 139.09 140.72 48 255.82 48C356.2 48 440 117.54 459.57 209.85a199 199 0 0 1 4.43 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.1 31.1 0 0 0-11.13-2.07a30.7 30.7 0 0 0-12.08 2.43L81.5 462.78a16 16 0 0 1-4.66 1.22a9.61 9.61 0 0 1-9.58-9.74a16 16 0 0 1 .6-3.29Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={160}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={352}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M398 81.84A227.4 227.4 0 0 0 255.82 32C194.9 32 138 55.47 95.46 98.09C54.35 139.33 31.82 193.78 32 251.37a215.66 215.66 0 0 0 35.65 118.76l.19.27c.28.41.57.82.86 1.22s.65.92.73 1.05l.22.4c1.13 2 2 4.44 1.23 6.9l-18.42 66.66a29 29 0 0 0-1.2 7.63A25.69 25.69 0 0 0 76.83 480a29.4 29.4 0 0 0 10.45-2.29l67.49-24.36l.85-.33a14.75 14.75 0 0 1 5.8-1.15a15.1 15.1 0 0 1 5.37 1c1.62.63 16.33 6.26 31.85 10.6c12.9 3.6 39.74 9 60.77 9c59.65 0 115.35-23.1 156.83-65.06C457.36 365.77 480 310.42 480 251.49a213.5 213.5 0 0 0-4.78-45c-10.34-48.62-37.76-92.9-77.22-124.65M160 288a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
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
        d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a43 43 0 0 0-2.54-3.8a199.8 199.8 0 0 1-33-110C47.64 139.09 140.72 48 255.82 48C356.2 48 440 117.54 459.57 209.85a199 199 0 0 1 4.43 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.1 31.1 0 0 0-11.13-2.07a30.7 30.7 0 0 0-12.08 2.43L81.5 462.78a16 16 0 0 1-4.66 1.22a9.61 9.61 0 0 1-9.58-9.74a16 16 0 0 1 .6-3.29Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={160}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={352}
        cy={256}
        r={32}
        fill={resolvedColor}
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
        d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a43 43 0 0 0-2.54-3.8a199.8 199.8 0 0 1-33-110C47.64 139.09 140.72 48 255.82 48C356.2 48 440 117.54 459.57 209.85a199 199 0 0 1 4.43 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.1 31.1 0 0 0-11.13-2.07a30.7 30.7 0 0 0-12.08 2.43L81.5 462.78a16 16 0 0 1-4.66 1.22a9.61 9.61 0 0 1-9.58-9.74a16 16 0 0 1 .6-3.29Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={160}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={352}
        cy={256}
        r={32}
        fill={resolvedColor}
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
        d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a43 43 0 0 0-2.54-3.8a199.8 199.8 0 0 1-33-110C47.64 139.09 140.72 48 255.82 48C356.2 48 440 117.54 459.57 209.85a199 199 0 0 1 4.43 41.64c0 112.41-89.49 204.93-204.59 204.93c-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.1 31.1 0 0 0-11.13-2.07a30.7 30.7 0 0 0-12.08 2.43L81.5 462.78a16 16 0 0 1-4.66 1.22a9.61 9.61 0 0 1-9.58-9.74a16 16 0 0 1 .6-3.29Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={160}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={352}
        cy={256}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M475.22 206.52c-10.34-48.65-37.76-92.93-77.22-124.68A227.4 227.4 0 0 0 255.82 32C194.9 32 138 55.47 95.46 98.09C54.35 139.33 31.82 193.78 32 251.37a215.66 215.66 0 0 0 35.65 118.76l4.35 6.05L48 480l114.8-28.56s2.3.77 4 1.42s16.33 6.26 31.85 10.6c12.9 3.6 39.74 9 60.77 9c59.65 0 115.35-23.1 156.83-65.06C457.36 365.77 480 310.42 480 251.49a213.5 213.5 0 0 0-4.78-44.97M160 288a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
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
