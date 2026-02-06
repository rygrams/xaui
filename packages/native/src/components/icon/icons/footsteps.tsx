import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FootstepsIcon: React.FC<IconProps> = ({
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
        d="M200 246.84c8.81 58.62-7.33 90.67-52.91 97.41c-50.65 7.49-71.52-26.44-80.33-85.06c-11.85-78.88 16-127.94 55.71-131.1c36.14-2.87 68.71 60.14 77.53 118.75Zm23.65 162.69c3.13 33.28-14.86 64.34-42 69.66c-27.4 5.36-58.71-16.37-65.09-49.19s17.75-34.56 47.32-40.21s55.99-20.4 59.77 19.74ZM312 150.83c-8.81 58.62 7.33 90.67 52.9 97.41c50.66 7.49 71.52-26.44 80.33-85.06c11.86-78.89-16-128.22-55.7-131.1c-36.4-2.64-68.71 60.13-77.53 118.75Zm-23.65 162.7c-3.13 33.27 14.86 64.34 42 69.66c27.4 5.36 58.71-16.37 65.09-49.19s-17.75-34.56-47.32-40.22s-55.99-20.4-59.77 19.75Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M133.83 361.27c-22.61 0-41-8.17-54.79-24.39s-22.84-40.29-28.11-75.31c-7.76-51.61-.06-95.11 21.68-122.48c12.8-16.12 29.6-25.44 48.58-26.94c16.25-1.3 40.54 5.29 64 44c14.69 24.24 25.86 56.44 30.65 88.34c5.79 38.51 1.48 66.86-13.18 86.65c-11.64 15.72-29.54 25.46-53.21 29a106.5 106.5 0 0 1-15.62 1.13M173 496c-13.21 0-26.6-4.23-38.66-12.36a79.8 79.8 0 0 1-33.52-50.6c-2.85-14.66-1.14-26.31 5.22-35.64c10.33-15.15 28.87-18.56 48.49-22.18c2.07-.38 4.17-.76 6.3-1.17c4.52-.86 9.14-2 13.62-3.11c16.78-4.14 34.14-8.43 48.47 1.75c9.59 6.8 15 18.36 16.62 35.32c1.84 19.57-2.36 39.1-11.83 55c-10.19 17.11-25.47 28.42-43 31.86A61 61 0 0 1 173 496m205.17-230.73a107 107 0 0 1-15.6-1.2c-23.66-3.5-41.56-13.25-53.2-29c-14.66-19.79-19-48.13-13.18-86.65c4.79-31.93 15.93-64.1 30.55-88.25c23.34-38.57 47.66-45.26 64-44.08c18.92 1.38 35.69 10.57 48.51 26.6c21.89 27.37 29.65 71 21.86 122.84c-5.27 35-14.2 58.95-28.11 75.31s-32.22 24.43-54.83 24.43M339 400a61 61 0 0 1-11.68-1.13c-17.56-3.44-32.84-14.75-43-31.86c-9.47-15.9-13.67-35.43-11.83-55c1.6-17 7-28.52 16.62-35.33c14.33-10.17 31.69-5.89 48.47-1.74c4.48 1.1 9.1 2.24 13.62 3.11l6.29 1.17c19.63 3.61 38.17 7 48.5 22.17c6.36 9.33 8.07 21 5.22 35.64a79.78 79.78 0 0 1-33.52 50.61C365.56 395.78 352.17 400 339 400"
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
        d="M200 246.84c8.81 58.62-7.33 90.67-52.91 97.41c-50.65 7.49-71.52-26.44-80.33-85.06c-11.85-78.88 16-127.94 55.71-131.1c36.14-2.87 68.71 60.14 77.53 118.75Zm23.65 162.69c3.13 33.28-14.86 64.34-42 69.66c-27.4 5.36-58.71-16.37-65.09-49.19s17.75-34.56 47.32-40.21s55.99-20.4 59.77 19.74ZM312 150.83c-8.81 58.62 7.33 90.67 52.9 97.41c50.66 7.49 71.52-26.44 80.33-85.06c11.86-78.89-16-128.22-55.7-131.1c-36.4-2.64-68.71 60.13-77.53 118.75Zm-23.65 162.7c-3.13 33.27 14.86 64.34 42 69.66c27.4 5.36 58.71-16.37 65.09-49.19s-17.75-34.56-47.32-40.22s-55.99-20.4-59.77 19.75Z"
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
        d="M200 246.84c8.81 58.62-7.33 90.67-52.91 97.41c-50.65 7.49-71.52-26.44-80.33-85.06c-11.85-78.88 16-127.94 55.71-131.1c36.14-2.87 68.71 60.14 77.53 118.75Zm23.65 162.69c3.13 33.28-14.86 64.34-42 69.66c-27.4 5.36-58.71-16.37-65.09-49.19s17.75-34.56 47.32-40.21s55.99-20.4 59.77 19.74ZM312 150.83c-8.81 58.62 7.33 90.67 52.9 97.41c50.66 7.49 71.52-26.44 80.33-85.06c11.86-78.89-16-128.22-55.7-131.1c-36.4-2.64-68.71 60.13-77.53 118.75Zm-23.65 162.7c-3.13 33.27 14.86 64.34 42 69.66c27.4 5.36 58.71-16.37 65.09-49.19s-17.75-34.56-47.32-40.22s-55.99-20.4-59.77 19.75Z"
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
        d="M200 246.84c8.81 58.62-7.33 90.67-52.91 97.41c-50.65 7.49-71.52-26.44-80.33-85.06c-11.85-78.88 16-127.94 55.71-131.1c36.14-2.87 68.71 60.14 77.53 118.75Zm23.65 162.69c3.13 33.28-14.86 64.34-42 69.66c-27.4 5.36-58.71-16.37-65.09-49.19s17.75-34.56 47.32-40.21s55.99-20.4 59.77 19.74ZM312 150.83c-8.81 58.62 7.33 90.67 52.9 97.41c50.66 7.49 71.52-26.44 80.33-85.06c11.86-78.89-16-128.22-55.7-131.1c-36.4-2.64-68.71 60.13-77.53 118.75Zm-23.65 162.7c-3.13 33.27 14.86 64.34 42 69.66c27.4 5.36 58.71-16.37 65.09-49.19s-17.75-34.56-47.32-40.22s-55.99-20.4-59.77 19.75Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M130.54 358.31c-12.83 1.88-33.95 5.38-48-10.56S56.34 293.32 51 258.92c-7.88-50.7-.06-93.43 22-120.31c13-15.83 30.06-25 49.34-26.46c16.51-1.27 41.18 5.19 65 43.19c14.92 23.81 26.27 55.44 31.14 86.77c5.88 37.82 11.61 78.18-8.44 92.65c-11.31 8.17-19.43 11-38.62 15.57c-15.78 3.75-28.04 6.09-40.88 7.98m-22.82 32.53l108.89-22.46c9.2-1.9 16.58 3.16 20 18.32c11.22 49.76-4.86 109.3-55.22 109.3c-47.69 0-79.47-54.36-84.66-83.58c-2.37-13.25 1.01-19.53 10.99-21.58m232.87-136.5c-19.19-4.55-27.31-7.4-38.62-15.57c-20.05-14.47-14.32-54.83-8.44-92.65c4.87-31.33 16.22-63 31.14-86.77c23.8-38 48.47-44.46 65-43.19C408.93 17.63 426 26.78 439 42.61c22.08 26.88 29.9 69.61 22 120.31c-5.35 34.4-17.46 72.76-31.59 88.83s-35.13 12.44-48 10.56s-25.05-4.23-40.82-7.97m63.69 40.5l-108.89-22.46c-9.2-1.9-16.58 3.16-20 18.32c-11.21 49.76 4.87 109.3 55.23 109.3c47.69 0 79.47-54.36 84.66-83.58c2.36-13.25-1.02-19.53-11-21.58"
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
