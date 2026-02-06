import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CutIcon: React.FC<IconProps> = ({
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
      <AnimatedCircle
        cx={104}
        cy={152}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={104}
        cy={360}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m157 175l-11 15l37 15s3.46-6.42 7-10Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M154.17 334.43L460 162c-2.5-6.7-28-12-64-4c-29.12 6.47-121.16 29.05-159.16 56.05C205.85 236.06 227 272 192 298c-25.61 19-44.43 22.82-44.43 22.82Zm190.3-56.19L295 306.67c14.23 6.74 65.54 33.27 117 36.33c14.92.89 30 .39 39-6Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={240}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M103.48 224a71.64 71.64 0 0 0 44.76-15.66l41.5 16.89l6.82-12.63a39 39 0 0 1 4.32-6.37l14.22-14.42l-41.17-24.94A72 72 0 1 0 103.48 224m0-112a40 40 0 1 1-40 40a40 40 0 0 1 40-40"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m480 169l-5.52-12.58c-4.48-10.42-14.74-16-32.78-17.85c-10.12-1-26.95-1.24-49.69 3.81c-20 4.45-122.14 28.2-164.95 58.62c-20.25 14.39-24.06 33.67-27.06 49.16c-2.78 14.14-5 25.31-18 35c-15 11.14-27.27 16.38-33.58 18.6a71.74 71.74 0 1 0 24.79 38Zm-224.52 87a16 16 0 1 1 16-16a16 16 0 0 1-16 16m-152 144a40 40 0 1 1 40-40a40 40 0 0 1-40 40"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m343.79 259.87l-83.74 48.18l27.63 13.08l3.62 1.74C310 331.92 359.74 356 410.53 359c3.89.23 7.47.34 10.78.34C442 359.31 453 354 459.75 350L480 336Z"
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
      <AnimatedCircle
        cx={104}
        cy={152}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={104}
        cy={360}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m157 175l-11 15l37 15s3.46-6.42 7-10Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M154.17 334.43L460 162c-2.5-6.7-28-12-64-4c-29.12 6.47-121.16 29.05-159.16 56.05C205.85 236.06 227 272 192 298c-25.61 19-44.43 22.82-44.43 22.82Zm190.3-56.19L295 306.67c14.23 6.74 65.54 33.27 117 36.33c14.92.89 30 .39 39-6Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={240}
        r={32}
        fill="none"
        stroke={resolvedColor}
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
      <AnimatedCircle
        cx={104}
        cy={152}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={104}
        cy={360}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m157 175l-11 15l37 15s3.46-6.42 7-10Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M154.17 334.43L460 162c-2.5-6.7-28-12-64-4c-29.12 6.47-121.16 29.05-159.16 56.05C205.85 236.06 227 272 192 298c-25.61 19-44.43 22.82-44.43 22.82Zm190.3-56.19L295 306.67c14.23 6.74 65.54 33.27 117 36.33c14.92.89 30 .39 39-6Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={240}
        r={32}
        fill="none"
        stroke={resolvedColor}
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
      <AnimatedCircle
        cx={104}
        cy={152}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={104}
        cy={360}
        r={56}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m157 175l-11 15l37 15s3.46-6.42 7-10Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M154.17 334.43L460 162c-2.5-6.7-28-12-64-4c-29.12 6.47-121.16 29.05-159.16 56.05C205.85 236.06 227 272 192 298c-25.61 19-44.43 22.82-44.43 22.82Zm190.3-56.19L295 306.67c14.23 6.74 65.54 33.27 117 36.33c14.92.89 30 .39 39-6Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={240}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M480 128h-48l-198.94 70.46l-59.13-31.59a72.16 72.16 0 1 0-25.69 41.47l52.2 31.72L192 277l-43.64 26.76a71.74 71.74 0 1 0 24.79 38L480 160Zm-376.52 64a40 40 0 1 1 40-40a40 40 0 0 1-40 40m0 208a40 40 0 1 1 40-40a40 40 0 0 1-40 40m152-144a16 16 0 1 1 16-16a16 16 0 0 1-16 16"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m343.79 259.87l-83.74 48.18L432 368h47.99l.01-32z"
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
