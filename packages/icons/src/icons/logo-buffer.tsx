import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoBufferIcon: React.FC<IconProps> = ({
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
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
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
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
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
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
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
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m39.93 149.25l197.4 95.32c5.14 2.45 12 3.73 18.79 3.73s13.65-1.28 18.78-3.73l197.4-95.32c10.38-5 10.38-13.18 0-18.2L274.9 35.73c-5.13-2.45-12-3.73-18.78-3.73s-13.65 1.28-18.79 3.73l-197.4 95.32c-10.38 5.02-10.38 13.18 0 18.2"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 246.9s-36.05-17.38-40.83-19.72s-6.07-2.21-11.09.12s-145.6 70.23-145.6 70.23a45.7 45.7 0 0 1-18.78 3.74c-6.77 0-13.65-1.29-18.78-3.74c0 0-136.85-66-143.27-69.18C87 225 85 225 78.67 228l-39 18.78c-10.38 5-10.38 13.19 0 18.2L237.1 360.3c5.13 2.45 12 3.73 18.78 3.73s13.65-1.28 18.79-3.73l197.4-95.3c10.61-4.92 10.61-13.08.23-18.1"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M472.3 362.75s-36.05-17.38-40.83-19.75s-6.07-2.21-11.09.12S274.9 413.5 274.9 413.5a45.7 45.7 0 0 1-18.78 3.73c-6.77 0-13.65-1.28-18.79-3.73c0 0-136.85-66-143.26-69.18c-7-3.39-9-3.39-15.29-.35l-39 18.78c-10.39 5-10.39 13.18 0 18.2l197.4 95.32c5.13 2.56 12 3.73 18.78 3.73s13.65-1.28 18.78-3.73L472.18 381c10.5-5.07 10.5-13.23.12-18.25"
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
