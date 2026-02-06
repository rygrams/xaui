import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const MusicalNotesIcon: React.FC<IconProps> = ({
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 0 1 416 154v22"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0 1 23-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 0 0-12.6-9.61L204 102a16.48 16.48 0 0 0-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M421.84 37.37a25.86 25.86 0 0 0-22.6-4.46L199.92 86.49A32.3 32.3 0 0 0 176 118v226c0 6.74-4.36 12.56-11.11 14.83l-.12.05l-52 18C92.88 383.53 80 402 80 423.91a55.54 55.54 0 0 0 23.23 45.63A54.78 54.78 0 0 0 135.34 480a55.8 55.8 0 0 0 17.75-2.93l.38-.13l21.84-7.94A47.84 47.84 0 0 0 208 423.91v-212c0-7.29 4.77-13.21 12.16-15.07l.21-.06L395 150.14a4 4 0 0 1 5 3.86v141.93c0 6.75-4.25 12.38-11.11 14.68l-.25.09l-50.89 18.11A49.09 49.09 0 0 0 304 375.92a55.67 55.67 0 0 0 23.23 45.8a54.63 54.63 0 0 0 49.88 7.35l.36-.12l21.84-7.95A47.83 47.83 0 0 0 432 375.92V58a25.74 25.74 0 0 0-10.16-20.63"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 0 1 416 154v22"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0 1 23-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 0 0-12.6-9.61L204 102a16.48 16.48 0 0 0-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 0 1 416 154v22"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0 1 23-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 0 0-12.6-9.61L204 102a16.48 16.48 0 0 0-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M192 218v-6c0-14.84 10-27 24.24-30.59l174.59-46.68A20 20 0 0 1 416 154v22"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 295.94v80c0 13.91-8.93 25.59-22 30l-22 8c-25.9 8.72-52-10.42-52-38h0a33.37 33.37 0 0 1 23-32l51-18.15c13.07-4.4 22-15.94 22-29.85V58a10 10 0 0 0-12.6-9.61L204 102a16.48 16.48 0 0 0-12 16v226c0 13.91-8.93 25.6-22 30l-52 18c-13.88 4.68-22 17.22-22 32h0c0 27.58 26.52 46.55 52 38l22-8c13.07-4.4 22-16.08 22-30v-80"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M429.46 32.07c-23.6 6.53-205.55 58.81-250.54 71.43a4 4 0 0 0-2.92 3.83v247a2 2 0 0 1-1.33 1.89l-27.85 9.55c-19 7.44-66.82 16.68-66.82 59.19c0 35.54 24.63 51.54 45.86 54.28a52 52 0 0 0 7.81.8c7.37 0 36.38-7.08 53.3-18.08C208 448.25 208 448 208 412V202c0-.9.62-.84 1.48-1.07l188-51.92a2 2 0 0 1 2.53 2v155.54a2 2 0 0 1-1.36 1.89c-8.9 3-19.23 6.5-26.48 9.12C341.39 328.68 304 335.65 304 376c0 38.51 28.26 54.58 46.3 55.83a87.4 87.4 0 0 0 21.33-1c9-1.38 24.09-5.9 38.14-14.86C432 401.79 432 401.51 432 360V34a2 2 0 0 0-2.54-1.93"
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
