import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ConstructIcon: React.FC<IconProps> = ({
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M436.67 184.11a27.17 27.17 0 0 1-38.3 0l-22.48-22.49a27.15 27.15 0 0 1 0-38.29l50.89-50.89a.85.85 0 0 0-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 0 1-7.67 27.14l-173 160.76a40.76 40.76 0 1 0 57.57 57.54l162.15-173.3a27 27 0 0 1 26.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94c27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 0 0-1.36-.22Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 0 1-3.33-21.35a20.8 20.8 0 0 1 3.5-4.62l15.68-15.29a18.7 18.7 0 0 1 5.63-3.87a18.11 18.11 0 0 1 20 3.62c5.45 5.29 15.43 15 33.41 32.52m49.18 46.58c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 0 1 .94 19.92L394.63 444a14 14 0 0 1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m17.34 193.5l29.41-28.74a4.7 4.7 0 0 1 3.41-1.35a4.85 4.85 0 0 1 3.41 1.35h0a9.86 9.86 0 0 0 8.19 2.77c3.83-.42 7.92-1.6 10.57-4.12c6-5.8-.94-17.23 4.34-24.54a207 207 0 0 1 19.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.3 107.3 0 0 1 206.67 64c22.59 0 40 10 46.26 15.67a89.5 89.5 0 0 1 10.28 11.64a79 79 0 0 0-9.21-2.77a68.8 68.8 0 0 0-20-1.26c-13.33 1.09-29.41 7.26-38 14c-13.9 11-19.87 25.72-20.81 44.71c-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 0 1-.34 9.16l-18.22 18a6.88 6.88 0 0 1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 0 0-18.27 3.87a11.4 11.4 0 0 0-2.64 2a14.14 14.14 0 0 0 .42 20.08l1.71 1.6a4.63 4.63 0 0 1 0 6.64L71.73 246.6a4.7 4.7 0 0 1-3.41 1.4a4.86 4.86 0 0 1-3.41-1.35l-47.57-46.43a4.88 4.88 0 0 1 0-6.72"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M503.58 126.2a16.85 16.85 0 0 0-27.07-4.55l-51.15 51.15a11.15 11.15 0 0 1-15.66 0l-22.48-22.48a11.17 11.17 0 0 1 0-15.67l50.88-50.89a16.85 16.85 0 0 0-5.27-27.4c-39.71-17-89.08-7.45-120 23.29c-26.81 26.61-34.83 68-22 113.7a11 11 0 0 1-3.16 11.1L114.77 365.1a56.76 56.76 0 1 0 80.14 80.18L357 272.08a11 11 0 0 1 10.9-3.17c45 12 86 4 112.43-22c15.2-15 25.81-36.17 29.89-59.71c3.83-22.2 1.41-44.44-6.64-61"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M437.33 378.41c-13.94-11.59-43.72-38.4-74.07-66.22l-66.07 70.61c28.24 30 53.8 57.85 65 70.88l.07.08A30 30 0 0 0 383.72 464h1.1a30.1 30.1 0 0 0 21-8.62l.07-.07l33.43-33.37a29.46 29.46 0 0 0-2-43.53ZM118.54 214.55a20.5 20.5 0 0 0-3-10.76a2.76 2.76 0 0 1 2.62-4.22h.06c.84.09 5.33.74 11.7 4.61c4.73 2.87 18.23 12.08 41.73 35.54a34.23 34.23 0 0 0 7.22 22.12l66.23-61.55a33.73 33.73 0 0 0-21.6-9.2a3 3 0 0 1-.21-.26l-.65-.69l-24.54-33.84a28.45 28.45 0 0 1-4-26.11a35.23 35.23 0 0 1 11.78-16.35c5.69-4.41 18.53-9.72 29.44-10.62a53 53 0 0 1 15.19.94a66 66 0 0 1 7.06 2.13a15.5 15.5 0 0 0 2.15.63a16 16 0 0 0 16.38-25.06c-.26-.35-1.32-1.79-2.89-3.73a92 92 0 0 0-9.6-10.36c-8.15-7.36-29.27-19.77-57-19.77a123.1 123.1 0 0 0-46.3 9c-38.37 15.45-63.47 36.58-75.01 47.79l-.09.09A222 222 0 0 0 63.7 129.5a27 27 0 0 0-4.7 11.77a7.33 7.33 0 0 1-7.71 6.17H50.2a20.65 20.65 0 0 0-14.59 5.9L6.16 182.05l-.32.32a20.89 20.89 0 0 0-.24 28.72c.19.2.37.39.57.58L53.67 258a21 21 0 0 0 14.65 6a20.65 20.65 0 0 0 14.59-5.9l29.46-28.79a20.5 20.5 0 0 0 6.17-14.76"
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
        d="M436.67 184.11a27.17 27.17 0 0 1-38.3 0l-22.48-22.49a27.15 27.15 0 0 1 0-38.29l50.89-50.89a.85.85 0 0 0-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 0 1-7.67 27.14l-173 160.76a40.76 40.76 0 1 0 57.57 57.54l162.15-173.3a27 27 0 0 1 26.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94c27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 0 0-1.36-.22Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 0 1-3.33-21.35a20.8 20.8 0 0 1 3.5-4.62l15.68-15.29a18.7 18.7 0 0 1 5.63-3.87a18.11 18.11 0 0 1 20 3.62c5.45 5.29 15.43 15 33.41 32.52m49.18 46.58c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 0 1 .94 19.92L394.63 444a14 14 0 0 1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m17.34 193.5l29.41-28.74a4.7 4.7 0 0 1 3.41-1.35a4.85 4.85 0 0 1 3.41 1.35h0a9.86 9.86 0 0 0 8.19 2.77c3.83-.42 7.92-1.6 10.57-4.12c6-5.8-.94-17.23 4.34-24.54a207 207 0 0 1 19.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.3 107.3 0 0 1 206.67 64c22.59 0 40 10 46.26 15.67a89.5 89.5 0 0 1 10.28 11.64a79 79 0 0 0-9.21-2.77a68.8 68.8 0 0 0-20-1.26c-13.33 1.09-29.41 7.26-38 14c-13.9 11-19.87 25.72-20.81 44.71c-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 0 1-.34 9.16l-18.22 18a6.88 6.88 0 0 1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 0 0-18.27 3.87a11.4 11.4 0 0 0-2.64 2a14.14 14.14 0 0 0 .42 20.08l1.71 1.6a4.63 4.63 0 0 1 0 6.64L71.73 246.6a4.7 4.7 0 0 1-3.41 1.4a4.86 4.86 0 0 1-3.41-1.35l-47.57-46.43a4.88 4.88 0 0 1 0-6.72"
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
        d="M436.67 184.11a27.17 27.17 0 0 1-38.3 0l-22.48-22.49a27.15 27.15 0 0 1 0-38.29l50.89-50.89a.85.85 0 0 0-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 0 1-7.67 27.14l-173 160.76a40.76 40.76 0 1 0 57.57 57.54l162.15-173.3a27 27 0 0 1 26.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94c27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 0 0-1.36-.22Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 0 1-3.33-21.35a20.8 20.8 0 0 1 3.5-4.62l15.68-15.29a18.7 18.7 0 0 1 5.63-3.87a18.11 18.11 0 0 1 20 3.62c5.45 5.29 15.43 15 33.41 32.52m49.18 46.58c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 0 1 .94 19.92L394.63 444a14 14 0 0 1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m17.34 193.5l29.41-28.74a4.7 4.7 0 0 1 3.41-1.35a4.85 4.85 0 0 1 3.41 1.35h0a9.86 9.86 0 0 0 8.19 2.77c3.83-.42 7.92-1.6 10.57-4.12c6-5.8-.94-17.23 4.34-24.54a207 207 0 0 1 19.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.3 107.3 0 0 1 206.67 64c22.59 0 40 10 46.26 15.67a89.5 89.5 0 0 1 10.28 11.64a79 79 0 0 0-9.21-2.77a68.8 68.8 0 0 0-20-1.26c-13.33 1.09-29.41 7.26-38 14c-13.9 11-19.87 25.72-20.81 44.71c-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 0 1-.34 9.16l-18.22 18a6.88 6.88 0 0 1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 0 0-18.27 3.87a11.4 11.4 0 0 0-2.64 2a14.14 14.14 0 0 0 .42 20.08l1.71 1.6a4.63 4.63 0 0 1 0 6.64L71.73 246.6a4.7 4.7 0 0 1-3.41 1.4a4.86 4.86 0 0 1-3.41-1.35l-47.57-46.43a4.88 4.88 0 0 1 0-6.72"
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
        d="M436.67 184.11a27.17 27.17 0 0 1-38.3 0l-22.48-22.49a27.15 27.15 0 0 1 0-38.29l50.89-50.89a.85.85 0 0 0-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 0 1-7.67 27.14l-173 160.76a40.76 40.76 0 1 0 57.57 57.54l162.15-173.3a27 27 0 0 1 26.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94c27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 0 0-1.36-.22Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 0 1-3.33-21.35a20.8 20.8 0 0 1 3.5-4.62l15.68-15.29a18.7 18.7 0 0 1 5.63-3.87a18.11 18.11 0 0 1 20 3.62c5.45 5.29 15.43 15 33.41 32.52m49.18 46.58c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 0 1 .94 19.92L394.63 444a14 14 0 0 1-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m17.34 193.5l29.41-28.74a4.7 4.7 0 0 1 3.41-1.35a4.85 4.85 0 0 1 3.41 1.35h0a9.86 9.86 0 0 0 8.19 2.77c3.83-.42 7.92-1.6 10.57-4.12c6-5.8-.94-17.23 4.34-24.54a207 207 0 0 1 19.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.3 107.3 0 0 1 206.67 64c22.59 0 40 10 46.26 15.67a89.5 89.5 0 0 1 10.28 11.64a79 79 0 0 0-9.21-2.77a68.8 68.8 0 0 0-20-1.26c-13.33 1.09-29.41 7.26-38 14c-13.9 11-19.87 25.72-20.81 44.71c-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 0 1-.34 9.16l-18.22 18a6.88 6.88 0 0 1-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 0 0-18.27 3.87a11.4 11.4 0 0 0-2.64 2a14.14 14.14 0 0 0 .42 20.08l1.71 1.6a4.63 4.63 0 0 1 0 6.64L71.73 246.6a4.7 4.7 0 0 1-3.41 1.4a4.86 4.86 0 0 1-3.41-1.35l-47.57-46.43a4.88 4.88 0 0 1 0-6.72"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m497.14 111.38l-81.09 80.84l-48.58-48.41L448.56 63c-45.22-22-108.65-22.09-146.2 15.35c-35.32 35.2-39.73 90.61-22.54 134.2L99.57 391.37a12 12 0 0 0 0 17l52.27 52.11a12 12 0 0 0 17 0l180-180.5c43.16 16.21 98 11.64 132.74-23c37.5-37.45 37.42-100.34 15.56-145.6"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m365.45 308.62l-71.83 72l75.53 79.92a10.88 10.88 0 0 0 15.65.21l60-60.46a11 11 0 0 0-.24-15.69ZM119 212c0-4.87-4-9.33-7.45-12.78l-.25-.24l-1.54-1.47a1.06 1.06 0 0 1-.26-.8a16.16 16.16 0 0 1 9.52-2c1.27.13 5.91.9 12.4 4.91c3.38 2.09 32.63 30.23 43.93 40.7a11 11 0 0 0 .14 15.35l7.43 7.86l65.66-65.17l-8.25-7.84a10.87 10.87 0 0 0-15.31-.06c-23-24.68-29-35.45-31-42.45c-4.42-15.47 4.14-28 14-36c5.84-4.62 17.88-8.08 29-9a52.7 52.7 0 0 1 11.61.6c3.47.5 6.3 1.14 7.39 1.4a68.5 68.5 0 0 1 11 4l12-19a88.4 88.4 0 0 0-13.4-17.7a115 115 0 0 0-5.19-5.1c-7.78-7.15-28-19.2-54.59-19.2a117.4 117.4 0 0 0-44.77 8.82c-37.44 15.34-61.88 36.25-73.11 47.35l-.07.07A219.6 219.6 0 0 0 67 128.56c-5.35 7.53-4.77 15.84-4.38 21.34c0 .32 0 .67.07 1a18.4 18.4 0 0 0-10.78-3.5A18 18 0 0 0 39 152.73L2 189.62a6.79 6.79 0 0 0 0 9.6L65 262a6.72 6.72 0 0 0 9.5 0l37.06-37c3.44-3.44 7.44-8.14 7.44-13"
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
