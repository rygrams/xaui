import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const NotificationsOffCircleIcon: React.FC<IconProps> = ({
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M220.24 352a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384s37.5-8.86 39.73-27.58a4 4 0 0 0-4-4.42ZM352 378a15.93 15.93 0 0 1-11.84-5.24l-192-212a16 16 0 0 1 23.68-21.52l192 212A16 16 0 0 1 352 378M174.68 232.21c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23h118.83a4 4 0 0 0 2.95-6.7l-98-106.87a4 4 0 0 0-6.94 2.52c-.1 2.33-.16 4.75-.16 7.25M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-1.28.51-2.57 1.05-3.88 1.63a4 4 0 0 0-1.3 6.36L361 323.21a4 4 0 0 0 6.94-2.95a12 12 0 0 0-2.74-7.26"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48M146.83 313c16.33-19.34 27.86-27.47 27.86-80.8q0-3.75.2-7.26a4 4 0 0 1 7-2.52l98 106.87a4 4 0 0 1-2.94 6.7H158C146.18 336 140.06 321 146.83 313m148.93 43.41C293.53 375.14 276.92 384 256 384s-37.51-8.86-39.75-27.58a4 4 0 0 1 4-4.42h71.53a4 4 0 0 1 3.98 4.42Zm67 17.42a16 16 0 0 1-22.6-1.08l-192-212a16 16 0 0 1 23.68-21.52l192 212a16 16 0 0 1-1.08 22.61ZM361 323.21L216.49 165.53a4 4 0 0 1 1.3-6.36c1.31-.58 2.61-1.12 3.89-1.63a11.33 11.33 0 0 0 6.32-6.68c3.72-12.26 14.15-22.86 28-22.86s24.29 10.6 28 22.86a11.34 11.34 0 0 0 6.34 6.68c21.21 8.44 47 25.81 47 74.67c0 53.33 11.54 61.46 27.87 80.8a12.1 12.1 0 0 1 2.76 7.25a4 4 0 0 1-6.97 2.95"
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
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M220.24 352a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384s37.5-8.86 39.73-27.58a4 4 0 0 0-4-4.42ZM352 378a15.93 15.93 0 0 1-11.84-5.24l-192-212a16 16 0 0 1 23.68-21.52l192 212A16 16 0 0 1 352 378M174.68 232.21c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23h118.83a4 4 0 0 0 2.95-6.7l-98-106.87a4 4 0 0 0-6.94 2.52c-.1 2.33-.16 4.75-.16 7.25M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-1.28.51-2.57 1.05-3.88 1.63a4 4 0 0 0-1.3 6.36L361 323.21a4 4 0 0 0 6.94-2.95a12 12 0 0 0-2.74-7.26"
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
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M220.24 352a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384s37.5-8.86 39.73-27.58a4 4 0 0 0-4-4.42ZM352 378a15.93 15.93 0 0 1-11.84-5.24l-192-212a16 16 0 0 1 23.68-21.52l192 212A16 16 0 0 1 352 378M174.68 232.21c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23h118.83a4 4 0 0 0 2.95-6.7l-98-106.87a4 4 0 0 0-6.94 2.52c-.1 2.33-.16 4.75-.16 7.25M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-1.28.51-2.57 1.05-3.88 1.63a4 4 0 0 0-1.3 6.36L361 323.21a4 4 0 0 0 6.94-2.95a12 12 0 0 0-2.74-7.26"
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
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M220.24 352a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384s37.5-8.86 39.73-27.58a4 4 0 0 0-4-4.42ZM352 378a15.93 15.93 0 0 1-11.84-5.24l-192-212a16 16 0 0 1 23.68-21.52l192 212A16 16 0 0 1 352 378M174.68 232.21c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23h118.83a4 4 0 0 0 2.95-6.7l-98-106.87a4 4 0 0 0-6.94 2.52c-.1 2.33-.16 4.75-.16 7.25M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-1.28.51-2.57 1.05-3.88 1.63a4 4 0 0 0-1.3 6.36L361 323.21a4 4 0 0 0 6.94-2.95a12 12 0 0 0-2.74-7.26"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48M144 308l28-36v-32.3a132 132 0 0 1 2.34-25.42L285.92 336H144Zm112.18 76C233.6 384 216 373.75 216 352h80c-.3 21.37-17.45 32-39.82 32m93.48-3.74l-211-227l23.68-21.52l211 227ZM368 330.85l-.32-.38l-155.5-169.63a73.4 73.4 0 0 1 15.82-5.41l4-27.43h48l4 27.43c40 8.92 56 44 56 84.27V272l28 36Z"
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
