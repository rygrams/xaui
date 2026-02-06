import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CarSportIcon: React.FC<IconProps> = ({
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63s-38.75 52.52-50.27 70s-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8c31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48s-2.04-91.67-9.33-101.4M400 384h56v16h-56zm-344 0h56v16H56z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81s-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84m67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.9 93.9 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455 455 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.4 52.4 0 0 0 .49-16.51m-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.9 93.9 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455 455 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.4 52.4 0 0 1-.49-16.51"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12s178 12 178 12"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M494.26 276.22c-3.6-40.41-9.53-48.28-11.77-51.24c-5.15-6.84-13.39-11.31-22.11-16a3.6 3.6 0 0 1-.91-5.68a15.93 15.93 0 0 0 4.53-12.53A16.27 16.27 0 0 0 447.65 176h-15.6a17 17 0 0 0-2 .13a8.5 8.5 0 0 0-1.41-.47c-9.24-19.53-21.89-46.27-48.11-59.32C341.64 97 270 96 256 96s-85.64 1-124.48 20.31c-26.22 13.05-38.87 39.79-48.11 59.32l-.08.16a6.5 6.5 0 0 0-1.35.34a17 17 0 0 0-2-.13H64.35A16.27 16.27 0 0 0 48 190.77a15.93 15.93 0 0 0 4.59 12.47a3.6 3.6 0 0 1-.91 5.68c-8.72 4.72-17 9.19-22.11 16c-2.24 3-8.16 10.83-11.77 51.24c-2 22.74-2.3 46.28-.73 61.44c3.29 31.5 9.46 50.54 9.72 51.33a16 16 0 0 0 13.2 10.87v.2a16 16 0 0 0 16 16h56a16 16 0 0 0 16-16c8.61 0 14.6-1.54 20.95-3.18a159 159 0 0 1 28-4.91C207.45 389 237.79 388 256 388c17.84 0 49.52 1 80.08 3.91a159 159 0 0 1 28.11 4.93c6.08 1.56 11.85 3 19.84 3.15a16 16 0 0 0 16 16h56a16 16 0 0 0 16-16v-.12A16 16 0 0 0 485.27 389c.26-.79 6.43-19.83 9.72-51.33c1.57-15.17 1.29-38.67-.73-61.45m-381.93-86.91c8-17 17.15-36.24 33.44-44.35c23.54-11.72 72.33-17 110.23-17s86.69 5.24 110.23 17c16.29 8.11 25.4 27.36 33.44 44.35l1 2.17a8 8 0 0 1-7.44 11.42C360 202 290 199.12 256 199.12s-104 2.95-137.28 3.85a8 8 0 0 1-7.44-11.42c.35-.74.72-1.49 1.05-2.24m11.93 79.63A427 427 0 0 1 72.42 272c-10.6 0-21.53-3-23.56-12.44c-1.39-6.35-1.24-9.92-.49-13.51C49 243 50 240.78 55 240c13-2 20.27.51 41.55 6.78c14.11 4.15 24.29 9.68 30.09 14.06c2.91 2.16 1.36 7.8-2.38 8.1m221.38 82c-13.16 1.5-39.48.95-89.34.95s-76.17.55-89.33-.95c-13.58-1.51-30.89-14.35-19.07-25.79c7.87-7.54 26.23-13.18 50.68-16.35s34.8-4.8 57.62-4.8s32.12 1 57.62 4.81s44.77 9.52 50.68 16.35c10.78 12.24-5.29 24.19-18.86 25.84Zm117.5-91.39c-2 9.48-13 12.44-23.56 12.44a456 456 0 0 1-52.84-3.06c-3.06-.29-4.48-5.66-1.38-8.1c5.71-4.49 16-9.91 30.09-14.06c21.28-6.27 33.55-8.78 44.09-6.69c2.57.51 3.93 3.27 4.09 5a40.6 40.6 0 0 1-.49 14.48Z"
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
        d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63s-38.75 52.52-50.27 70s-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8c31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48s-2.04-91.67-9.33-101.4M400 384h56v16h-56zm-344 0h56v16H56z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81s-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84m67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.9 93.9 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455 455 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.4 52.4 0 0 0 .49-16.51m-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.9 93.9 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455 455 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.4 52.4 0 0 1-.49-16.51"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12s178 12 178 12"
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
        d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63s-38.75 52.52-50.27 70s-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8c31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48s-2.04-91.67-9.33-101.4M400 384h56v16h-56zm-344 0h56v16H56z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81s-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84m67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.9 93.9 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455 455 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.4 52.4 0 0 0 .49-16.51m-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.9 93.9 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455 455 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.4 52.4 0 0 1-.49-16.51"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12s178 12 178 12"
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
        d="M469.71 234.6c-7.33-9.73-34.56-16.43-46.08-33.94s-20.95-55.43-50.27-70S288 112 256 112s-88 4-117.36 18.63s-38.75 52.52-50.27 70s-38.75 24.24-46.08 33.97S29.8 305.84 32.94 336s9 48 9 48h86c14.08 0 18.66-5.29 47.46-8c31.6-3 62.6-4 80.6-4s50 1 81.58 4c28.8 2.73 33.53 8 47.46 8h85s5.86-17.84 9-48s-2.04-91.67-9.33-101.4M400 384h56v16h-56zm-344 0h56v16H56z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M364.47 309.16c-5.91-6.83-25.17-12.53-50.67-16.35S279 288 256.2 288s-33.17 1.64-57.61 4.81s-42.79 8.81-50.66 16.35C136.12 320.6 153.42 333.44 167 335c13.16 1.5 39.47.95 89.31.95s76.15.55 89.31-.95c13.56-1.65 29.62-13.6 18.85-25.84m67.1-66.11a3.23 3.23 0 0 0-3.1-3c-11.81-.42-23.8.42-45.07 6.69a93.9 93.9 0 0 0-30.08 15.06c-2.28 1.78-1.47 6.59 1.39 7.1a455 455 0 0 0 52.82 3.1c10.59 0 21.52-3 23.55-12.44a52.4 52.4 0 0 0 .49-16.51m-351.14 0a3.23 3.23 0 0 1 3.1-3c11.81-.42 23.8.42 45.07 6.69a93.9 93.9 0 0 1 30.08 15.06c2.28 1.78 1.47 6.59-1.39 7.1a455 455 0 0 1-52.82 3.1c-10.59 0-21.52-3-23.55-12.44a52.4 52.4 0 0 1-.49-16.51"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M432 192h16m-384 0h16m-2 19s46.35-12 178-12s178 12 178 12"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M488 224c-3-5-32.61-17.79-32.61-17.79c5.15-2.66 8.67-3.21 8.67-14.21c0-12-.06-16-8.06-16h-27.14c-.11-.24-.23-.49-.34-.74c-17.52-38.26-19.87-47.93-46-60.95C347.47 96.88 281.76 96 256 96s-91.47.88-126.49 18.31c-26.16 13-25.51 19.69-46 60.95c0 .11-.21.4-.4.74H55.94c-7.94 0-8 4-8 16c0 11 3.52 11.55 8.67 14.21C56.61 206.21 28 220 24 224s-8 32-8 80s4 96 4 96h11.94c0 14 2.06 16 8.06 16h80c6 0 8-2 8-16h256c0 14 2 16 8 16h82c4 0 6-3 6-16h12s4-49 4-96s-5-75-8-80m-362.74 44.94A517 517 0 0 1 70.42 272c-20.42 0-21.12 1.31-22.56-11.44a72.2 72.2 0 0 1 .51-17.51L49 240h3c12 0 23.27.51 44.55 6.78a98 98 0 0 1 30.09 15.06C131 265 132 268 132 268Zm247.16 72L368 352H144s.39-.61-5-11.18c-4-7.82 1-12.82 8.91-15.66C163.23 319.64 208 304 256 304s93.66 13.48 108.5 21.16C370 328 376.83 330 372.42 341Zm-257-136.53a96 96 0 0 1-9.7.07c2.61-4.64 4.06-9.81 6.61-15.21c8-17 17.15-36.24 33.44-44.35c23.54-11.72 72.33-17 110.23-17s86.69 5.24 110.23 17c16.29 8.11 25.4 27.36 33.44 44.35c2.57 5.45 4 10.66 6.68 15.33c-2 .11-4.3 0-9.79-.19Zm347.72 56.11C461 273 463 272 441.58 272a517 517 0 0 1-54.84-3.06c-2.85-.51-3.66-5.32-1.38-7.1a93.8 93.8 0 0 1 30.09-15.06c21.28-6.27 33.26-7.11 45.09-6.69a3.22 3.22 0 0 1 3.09 3a70.2 70.2 0 0 1-.49 17.47Z"
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
