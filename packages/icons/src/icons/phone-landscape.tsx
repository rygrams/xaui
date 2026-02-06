import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const PhoneLandscapeIcon: React.FC<IconProps> = ({
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
        width={256}
        height={480}
        x={128}
        y={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        ry={48}
        transform="rotate(-90 256 256)"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M16 336v-24a8 8 0 0 1 8-8h0a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h0a8 8 0 0 1-8-8v-24"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        id="SVG5mxdJbfR"
        fill={resolvedColor}
        d="M0 176v160a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V176a64 64 0 0 0-64-64H64a64 64 0 0 0-64 64m448-32a32 32 0 0 1 32 32v160a32 32 0 0 1-32 32H64a32 32 0 0 1-32-32v-11.35a7.94 7.94 0 0 1 4.75-7.3A32 32 0 0 0 56 288v-64a32 32 0 0 0-19.25-29.35a7.94 7.94 0 0 1-4.75-7.3V176a32 32 0 0 1 32-32Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M48 176a11.88 11.88 0 0 0 4.69 9.53A48 48 0 0 1 72 224v64a48 48 0 0 1-19.31 38.47A11.88 11.88 0 0 0 48 336a16 16 0 0 0 16 16h384a16 16 0 0 0 16-16V176a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16"
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
        width={256}
        height={480}
        x={128}
        y={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        ry={48}
        transform="rotate(-90 256 256)"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M16 336v-24a8 8 0 0 1 8-8h0a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h0a8 8 0 0 1-8-8v-24"
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
        width={256}
        height={480}
        x={128}
        y={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        ry={48}
        transform="rotate(-90 256 256)"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M16 336v-24a8 8 0 0 1 8-8h0a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h0a8 8 0 0 1-8-8v-24"
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
        width={256}
        height={480}
        x={128}
        y={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        ry={48}
        transform="rotate(-90 256 256)"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M16 336v-24a8 8 0 0 1 8-8h0a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16h0a8 8 0 0 1-8-8v-24"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M0 130v252a18 18 0 0 0 18 18h476a18 18 0 0 0 18-18V130a18 18 0 0 0-18-18H18a18 18 0 0 0-18 18m448 234H64V148h384Z"
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
