import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const BoatIcon: React.FC<IconProps> = ({
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
        d="M461.93 261.05c-2-4.76-6.71-7.83-11.67-9.49l-187.18-74.48a23.8 23.8 0 0 0-14.17 0l-187 74.52c-5 1.56-9.83 4.77-11.81 9.53s-2.94 9.37-1 15.08l46.53 119.15a7.46 7.46 0 0 0 7.47 4.64c26.69-1.68 50.31-15.23 68.38-32.5a7.66 7.66 0 0 1 10.49 0C201.29 386 227 400 256 400s54.56-14 73.88-32.54a7.67 7.67 0 0 1 10.5 0c18.07 17.28 41.69 30.86 68.38 32.54a7.45 7.45 0 0 0 7.46-4.61l46.7-119.16c1.98-4.78.99-10.41-.99-15.18Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M416 473.14a6.84 6.84 0 0 0-3.56-6c-27.08-14.55-51.77-36.82-62.63-48a10.05 10.05 0 0 0-12.72-1.51c-50.33 32.42-111.61 32.44-161.95.05a10.09 10.09 0 0 0-12.82 1.56c-10.77 11.28-35.19 33.3-62.43 47.75a7.15 7.15 0 0 0-3.89 5.73a6.73 6.73 0 0 0 7.92 7.15c20.85-4.18 41-13.68 60.2-23.83a8.71 8.71 0 0 1 8-.06A185.14 185.14 0 0 0 340 456a8.82 8.82 0 0 1 8.09.06c19.1 10 39.22 19.59 60 23.8a6.72 6.72 0 0 0 7.95-6.71Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M320 96V72a24.07 24.07 0 0 0-24-24h-80a24.07 24.07 0 0 0-24 24v24m224 137v-89a48.14 48.14 0 0 0-48-48H144a48.14 48.14 0 0 0-48 48v92m160-52.4v212.85"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M416 473.14a6.83 6.83 0 0 0-3.57-6c-27.07-14.55-51.76-36.82-62.62-48a10.05 10.05 0 0 0-12.72-1.51c-50.33 32.42-111.61 32.44-161.95.05a10.09 10.09 0 0 0-12.82 1.56c-10.77 11.28-35.19 33.3-62.43 47.75a7.11 7.11 0 0 0-3.89 5.73a6.73 6.73 0 0 0 7.92 7.15c20.85-4.18 41-13.68 60.2-23.83a8.71 8.71 0 0 1 8-.06a185.14 185.14 0 0 0 167.81 0a8.82 8.82 0 0 1 8.09.06c19.1 10 39.22 19.59 60 23.8a6.73 6.73 0 0 0 8-6.71Zm60.71-226.23c-3.49-8.39-10.9-14.89-20.9-18.35L432 219.08V136a64 64 0 0 0-64-64h-32v-8a40 40 0 0 0-40-40h-80a40 40 0 0 0-40 40v8h-32a64 64 0 0 0-64 64v83.15l-23.58 9.39c-9.94 3.3-17.63 10-21.15 18.44c-2.45 5.89-5.25 15-1.3 26.46l.1.3l46.66 119.44A23.33 23.33 0 0 0 102.58 408c.5 0 1 0 1.53-.05c31.32-2 56-17.27 72.6-31.61C200.42 396.81 228.31 408 256 408s55.43-11.2 79.14-31.7c16.59 14.36 41.3 29.67 72.61 31.65a23.36 23.36 0 0 0 23.37-14.74l46.65-119c3.28-8.09 2.9-17.76-1.06-27.3M269 154.21l-1.14-.4a39.53 39.53 0 0 0-23.73 0l-.58.18l-126.07 50.23a4 4 0 0 1-5.48-3.72V136a32 32 0 0 1 32-32h224a32 32 0 0 1 32 32v64.44a4 4 0 0 1-5.48 3.72Z"
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
        d="M461.93 261.05c-2-4.76-6.71-7.83-11.67-9.49l-187.18-74.48a23.8 23.8 0 0 0-14.17 0l-187 74.52c-5 1.56-9.83 4.77-11.81 9.53s-2.94 9.37-1 15.08l46.53 119.15a7.46 7.46 0 0 0 7.47 4.64c26.69-1.68 50.31-15.23 68.38-32.5a7.66 7.66 0 0 1 10.49 0C201.29 386 227 400 256 400s54.56-14 73.88-32.54a7.67 7.67 0 0 1 10.5 0c18.07 17.28 41.69 30.86 68.38 32.54a7.45 7.45 0 0 0 7.46-4.61l46.7-119.16c1.98-4.78.99-10.41-.99-15.18Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M416 473.14a6.84 6.84 0 0 0-3.56-6c-27.08-14.55-51.77-36.82-62.63-48a10.05 10.05 0 0 0-12.72-1.51c-50.33 32.42-111.61 32.44-161.95.05a10.09 10.09 0 0 0-12.82 1.56c-10.77 11.28-35.19 33.3-62.43 47.75a7.15 7.15 0 0 0-3.89 5.73a6.73 6.73 0 0 0 7.92 7.15c20.85-4.18 41-13.68 60.2-23.83a8.71 8.71 0 0 1 8-.06A185.14 185.14 0 0 0 340 456a8.82 8.82 0 0 1 8.09.06c19.1 10 39.22 19.59 60 23.8a6.72 6.72 0 0 0 7.95-6.71Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M320 96V72a24.07 24.07 0 0 0-24-24h-80a24.07 24.07 0 0 0-24 24v24m224 137v-89a48.14 48.14 0 0 0-48-48H144a48.14 48.14 0 0 0-48 48v92m160-52.4v212.85"
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
        d="M461.93 261.05c-2-4.76-6.71-7.83-11.67-9.49l-187.18-74.48a23.8 23.8 0 0 0-14.17 0l-187 74.52c-5 1.56-9.83 4.77-11.81 9.53s-2.94 9.37-1 15.08l46.53 119.15a7.46 7.46 0 0 0 7.47 4.64c26.69-1.68 50.31-15.23 68.38-32.5a7.66 7.66 0 0 1 10.49 0C201.29 386 227 400 256 400s54.56-14 73.88-32.54a7.67 7.67 0 0 1 10.5 0c18.07 17.28 41.69 30.86 68.38 32.54a7.45 7.45 0 0 0 7.46-4.61l46.7-119.16c1.98-4.78.99-10.41-.99-15.18Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M416 473.14a6.84 6.84 0 0 0-3.56-6c-27.08-14.55-51.77-36.82-62.63-48a10.05 10.05 0 0 0-12.72-1.51c-50.33 32.42-111.61 32.44-161.95.05a10.09 10.09 0 0 0-12.82 1.56c-10.77 11.28-35.19 33.3-62.43 47.75a7.15 7.15 0 0 0-3.89 5.73a6.73 6.73 0 0 0 7.92 7.15c20.85-4.18 41-13.68 60.2-23.83a8.71 8.71 0 0 1 8-.06A185.14 185.14 0 0 0 340 456a8.82 8.82 0 0 1 8.09.06c19.1 10 39.22 19.59 60 23.8a6.72 6.72 0 0 0 7.95-6.71Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M320 96V72a24.07 24.07 0 0 0-24-24h-80a24.07 24.07 0 0 0-24 24v24m224 137v-89a48.14 48.14 0 0 0-48-48H144a48.14 48.14 0 0 0-48 48v92m160-52.4v212.85"
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
        d="M461.93 261.05c-2-4.76-6.71-7.83-11.67-9.49l-187.18-74.48a23.8 23.8 0 0 0-14.17 0l-187 74.52c-5 1.56-9.83 4.77-11.81 9.53s-2.94 9.37-1 15.08l46.53 119.15a7.46 7.46 0 0 0 7.47 4.64c26.69-1.68 50.31-15.23 68.38-32.5a7.66 7.66 0 0 1 10.49 0C201.29 386 227 400 256 400s54.56-14 73.88-32.54a7.67 7.67 0 0 1 10.5 0c18.07 17.28 41.69 30.86 68.38 32.54a7.45 7.45 0 0 0 7.46-4.61l46.7-119.16c1.98-4.78.99-10.41-.99-15.18Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M416 473.14a6.84 6.84 0 0 0-3.56-6c-27.08-14.55-51.77-36.82-62.63-48a10.05 10.05 0 0 0-12.72-1.51c-50.33 32.42-111.61 32.44-161.95.05a10.09 10.09 0 0 0-12.82 1.56c-10.77 11.28-35.19 33.3-62.43 47.75a7.15 7.15 0 0 0-3.89 5.73a6.73 6.73 0 0 0 7.92 7.15c20.85-4.18 41-13.68 60.2-23.83a8.71 8.71 0 0 1 8-.06A185.14 185.14 0 0 0 340 456a8.82 8.82 0 0 1 8.09.06c19.1 10 39.22 19.59 60 23.8a6.72 6.72 0 0 0 7.95-6.71Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M320 96V72a24.07 24.07 0 0 0-24-24h-80a24.07 24.07 0 0 0-24 24v24m224 137v-89a48.14 48.14 0 0 0-48-48H144a48.14 48.14 0 0 0-48 48v92m160-52.4v212.85"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M477.77 246.42c-2.13-6-7.23-9.55-12.56-11.95L432 221.38V92a20 20 0 0 0-20-20h-76V40a16 16 0 0 0-16-16H192a16 16 0 0 0-16 16v32h-76a20 20 0 0 0-20 20v129.46l-33.08 13.06c-5.33 2.4-10.58 6-12.72 12s-3.16 11.81-1 19L84.25 415.7h1.06c34.12 0 64-17.41 85.31-43.82c21.32 26.41 51.18 42.12 85.3 42.12s64-15.76 85.31-42.17c21.32 26.41 51.18 43.87 85.3 43.87h1.06l51.25-150.17c2.16-6 1.07-13.1-1.07-19.11M256 152l-144 56.83V108a4 4 0 0 1 4-4h280a4 4 0 0 1 4 4v100.76Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M345.22 407c-52.25 36.26-126.35 36.25-178.6 0c0 0-45.64 63-94.64 63l13.33 1c29.86 0 58.65-11.73 85.31-25.59a185.33 185.33 0 0 0 170.6 0c26.66 13.87 55.45 25.6 85.31 25.6l13.33-1C392.21 470 345.22 407 345.22 407"
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
