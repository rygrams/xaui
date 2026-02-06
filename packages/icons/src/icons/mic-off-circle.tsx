import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const MicOffCircleIcon: React.FC<IconProps> = ({
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
        d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208m0-384c-97 0-176 79-176 176s79 176 176 176s176-78.95 176-176S353.05 80 256 80"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M352 369a15.93 15.93 0 0 1-11.84-5.24l-192-210a16 16 0 0 1 23.68-21.52l192 210A16 16 0 0 1 352 369m0-120.78v-23.8a16.3 16.3 0 0 0-13.64-16.24c-9.88-1.48-18.36 6.51-18.36 16.12v23.92a43.4 43.4 0 0 1-3.07 15.91a4 4 0 0 0 .76 4.16l19.19 21.1a2 2 0 0 0 3.19-.3A77.1 77.1 0 0 0 352 248.22M304 240v-64a48.14 48.14 0 0 0-48-48a48.08 48.08 0 0 0-41 23.1a4 4 0 0 0 .47 4.77l84.42 92.86a2 2 0 0 0 3.46-1A48 48 0 0 0 304 240m-57.43 45.2l-36.46-40.11a1 1 0 0 0-1.74.8a48.26 48.26 0 0 0 37.25 41a1 1 0 0 0 .95-1.69"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M287.55 352H272v-17.74a100 100 0 0 0 12.53-3.06a2 2 0 0 0 .89-3.26l-21.07-23.19a3.94 3.94 0 0 0-3.29-1.29c-1.69.15-3.39.24-5.06.24c-36 0-64-29.82-64-55.48V224.4a16.26 16.26 0 0 0-15.61-16.4A15.91 15.91 0 0 0 160 224v24.22c0 23.36 10.94 45.61 30.79 62.66A103.7 103.7 0 0 0 240 334.26V352h-15.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 0 0 224 384h64a16 16 0 0 0 16-16.77c-.42-8.61-7.84-15.23-16.45-15.23"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 80a48.14 48.14 0 0 1 48 48v64a48 48 0 0 1-.63 7.71a2 2 0 0 1-3.46 1l-84.42-92.86a4 4 0 0 1-.47-4.77A48.08 48.08 0 0 1 256 128m32 256h-63.55c-8.61 0-16-6.62-16.43-15.23A16 16 0 0 1 224 352h16v-17.74a103.7 103.7 0 0 1-49.21-23.38c-19.85-17.05-30.79-39.3-30.79-62.66V224a15.91 15.91 0 0 1 16.39-16A16.26 16.26 0 0 1 192 224.4v23.82c0 25.66 28 55.48 64 55.48c1.67 0 3.37-.09 5.06-.24a3.94 3.94 0 0 1 3.29 1.29l21.07 23.19a2 2 0 0 1-.89 3.26a100 100 0 0 1-12.53 3.06V352h15.55c8.61 0 16 6.62 16.43 15.23A16 16 0 0 1 288 384m-77.89-138.91l36.46 40.11a1 1 0 0 1-.95 1.66a48.26 48.26 0 0 1-37.25-41a1 1 0 0 1 1.74-.77m152.65 119.75a16 16 0 0 1-22.6-1.08l-192-210a16 16 0 0 1 23.68-21.52l192 210a16 16 0 0 1-1.08 22.6M352 248.22a77.1 77.1 0 0 1-11.93 40.87a2 2 0 0 1-3.19.3l-19.19-21.1a4 4 0 0 1-.76-4.16a43.4 43.4 0 0 0 3.07-15.91v-23.8a16.3 16.3 0 0 1 13.64-16.24c9.88-1.48 18.36 6.51 18.36 16.12Z"
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
        d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208m0-384c-97 0-176 79-176 176s79 176 176 176s176-78.95 176-176S353.05 80 256 80"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M352 369a15.93 15.93 0 0 1-11.84-5.24l-192-210a16 16 0 0 1 23.68-21.52l192 210A16 16 0 0 1 352 369m0-120.78v-23.8a16.3 16.3 0 0 0-13.64-16.24c-9.88-1.48-18.36 6.51-18.36 16.12v23.92a43.4 43.4 0 0 1-3.07 15.91a4 4 0 0 0 .76 4.16l19.19 21.1a2 2 0 0 0 3.19-.3A77.1 77.1 0 0 0 352 248.22M304 240v-64a48.14 48.14 0 0 0-48-48a48.08 48.08 0 0 0-41 23.1a4 4 0 0 0 .47 4.77l84.42 92.86a2 2 0 0 0 3.46-1A48 48 0 0 0 304 240m-57.43 45.2l-36.46-40.11a1 1 0 0 0-1.74.8a48.26 48.26 0 0 0 37.25 41a1 1 0 0 0 .95-1.69"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M287.55 352H272v-17.74a100 100 0 0 0 12.53-3.06a2 2 0 0 0 .89-3.26l-21.07-23.19a3.94 3.94 0 0 0-3.29-1.29c-1.69.15-3.39.24-5.06.24c-36 0-64-29.82-64-55.48V224.4a16.26 16.26 0 0 0-15.61-16.4A15.91 15.91 0 0 0 160 224v24.22c0 23.36 10.94 45.61 30.79 62.66A103.7 103.7 0 0 0 240 334.26V352h-15.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 0 0 224 384h64a16 16 0 0 0 16-16.77c-.42-8.61-7.84-15.23-16.45-15.23"
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
        d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208m0-384c-97 0-176 79-176 176s79 176 176 176s176-78.95 176-176S353.05 80 256 80"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M352 369a15.93 15.93 0 0 1-11.84-5.24l-192-210a16 16 0 0 1 23.68-21.52l192 210A16 16 0 0 1 352 369m0-120.78v-23.8a16.3 16.3 0 0 0-13.64-16.24c-9.88-1.48-18.36 6.51-18.36 16.12v23.92a43.4 43.4 0 0 1-3.07 15.91a4 4 0 0 0 .76 4.16l19.19 21.1a2 2 0 0 0 3.19-.3A77.1 77.1 0 0 0 352 248.22M304 240v-64a48.14 48.14 0 0 0-48-48a48.08 48.08 0 0 0-41 23.1a4 4 0 0 0 .47 4.77l84.42 92.86a2 2 0 0 0 3.46-1A48 48 0 0 0 304 240m-57.43 45.2l-36.46-40.11a1 1 0 0 0-1.74.8a48.26 48.26 0 0 0 37.25 41a1 1 0 0 0 .95-1.69"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M287.55 352H272v-17.74a100 100 0 0 0 12.53-3.06a2 2 0 0 0 .89-3.26l-21.07-23.19a3.94 3.94 0 0 0-3.29-1.29c-1.69.15-3.39.24-5.06.24c-36 0-64-29.82-64-55.48V224.4a16.26 16.26 0 0 0-15.61-16.4A15.91 15.91 0 0 0 160 224v24.22c0 23.36 10.94 45.61 30.79 62.66A103.7 103.7 0 0 0 240 334.26V352h-15.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 0 0 224 384h64a16 16 0 0 0 16-16.77c-.42-8.61-7.84-15.23-16.45-15.23"
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
        d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208m0-384c-97 0-176 79-176 176s79 176 176 176s176-78.95 176-176S353.05 80 256 80"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M352 369a15.93 15.93 0 0 1-11.84-5.24l-192-210a16 16 0 0 1 23.68-21.52l192 210A16 16 0 0 1 352 369m0-120.78v-23.8a16.3 16.3 0 0 0-13.64-16.24c-9.88-1.48-18.36 6.51-18.36 16.12v23.92a43.4 43.4 0 0 1-3.07 15.91a4 4 0 0 0 .76 4.16l19.19 21.1a2 2 0 0 0 3.19-.3A77.1 77.1 0 0 0 352 248.22M304 240v-64a48.14 48.14 0 0 0-48-48a48.08 48.08 0 0 0-41 23.1a4 4 0 0 0 .47 4.77l84.42 92.86a2 2 0 0 0 3.46-1A48 48 0 0 0 304 240m-57.43 45.2l-36.46-40.11a1 1 0 0 0-1.74.8a48.26 48.26 0 0 0 37.25 41a1 1 0 0 0 .95-1.69"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M287.55 352H272v-17.74a100 100 0 0 0 12.53-3.06a2 2 0 0 0 .89-3.26l-21.07-23.19a3.94 3.94 0 0 0-3.29-1.29c-1.69.15-3.39.24-5.06.24c-36 0-64-29.82-64-55.48V224.4a16.26 16.26 0 0 0-15.61-16.4A15.91 15.91 0 0 0 160 224v24.22c0 23.36 10.94 45.61 30.79 62.66A103.7 103.7 0 0 0 240 334.26V352h-15.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 0 0 224 384h64a16 16 0 0 0 16-16.77c-.42-8.61-7.84-15.23-16.45-15.23"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m64 200.22V208h32v40.22a77.53 77.53 0 0 1-13.37 43.11L316 266.4a44.1 44.1 0 0 0 4-18.18M256 128a48.14 48.14 0 0 1 48 48v64a48 48 0 0 1-1.44 11.64l-89-97.92A48.13 48.13 0 0 1 256 128m48 256h-96v-32h32v-17.74a103.7 103.7 0 0 1-49.21-23.38c-19.85-17.05-30.79-39.3-30.79-62.66V208h32v40.22c0 25.66 28 55.48 64 55.48a57 57 0 0 0 7-.45l24.52 27a99.6 99.6 0 0 1-15.5 4V352h32Zm-95.91-141.13l40.5 44.55a48.2 48.2 0 0 1-40.5-44.55m136.07 124.89l-200.5-218.5l23.68-21.52l200.5 218.5Z"
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
