import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const PizzaIcon: React.FC<IconProps> = ({
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
        d="M404.76 123.08C358.37 104.18 309.69 96 256 96s-106.1 9-148.9 26.68c-8.08 3.3-15.26 9-10.07 19.5C101.24 150.71 203 375 241.66 455a15.94 15.94 0 0 0 28.72 0l144.05-312.22c3.19-6.9.9-15.4-9.67-19.7Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M436.38 82.68C384.31 62.08 320.17 48 256 48S128.65 60.78 75.48 82.08C70.79 84 62 88.43 64.41 95.88L74.09 120c4 8.2 8.67 8.2 15.06 8.2c1.79 0 4.29-1 7.28-2.18A442.5 442.5 0 0 1 256 96c56.76 0 114.91 12 159.6 30c3.59 1.4 5.59 2.18 7.28 2.18c6.58 0 10.38 2.19 15-8.1L447.65 96c2.01-6-4.99-10.82-11.27-13.32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={192}
        cy={192}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={320}
        cy={208}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M441.82 67.83C383.44 44.73 317.3 32 255.56 32C192 32 125.76 44.53 69 67.26C48.7 75.49 45.21 90 48.71 100.82L52.78 111a16 16 0 0 0 21.31 8.69c10.8-4.76 23.93-10.54 27-11.78C145.1 89.64 198.71 80 256 80c57.47 0 108.09 9.24 154.76 28.25c4.42 1.8 14.88 6.42 26.17 11.46a16 16 0 0 0 21.35-8.59L462 102l.34-.9c3.45-10.21.14-25.05-20.52-33.27"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.18 140.86C363.67 122.53 307.68 112 255.56 112a425 425 0 0 0-153.74 28.89c-.53.21-2.06.88-4.29 1.88a16 16 0 0 0-8 21.27c4 8.71 9.42 20.58 15.5 33.89C137.94 270 199.21 404 227.26 462A31.74 31.74 0 0 0 256 480a31.73 31.73 0 0 0 28.76-18.06l.06-.13l137.3-297.57a15.94 15.94 0 0 0-8.31-21.45c-2.26-.95-3.85-1.61-4.5-1.87Zm-215.1 83.07a32 32 0 1 1 29.85-29.85a32 32 0 0 1-29.85 29.85m64 128a32 32 0 1 1 29.85-29.85a32 32 0 0 1-29.85 29.85m64-112a32 32 0 1 1 29.85-29.85a32 32 0 0 1-29.85 29.85"
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
        d="M404.76 123.08C358.37 104.18 309.69 96 256 96s-106.1 9-148.9 26.68c-8.08 3.3-15.26 9-10.07 19.5C101.24 150.71 203 375 241.66 455a15.94 15.94 0 0 0 28.72 0l144.05-312.22c3.19-6.9.9-15.4-9.67-19.7Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M436.38 82.68C384.31 62.08 320.17 48 256 48S128.65 60.78 75.48 82.08C70.79 84 62 88.43 64.41 95.88L74.09 120c4 8.2 8.67 8.2 15.06 8.2c1.79 0 4.29-1 7.28-2.18A442.5 442.5 0 0 1 256 96c56.76 0 114.91 12 159.6 30c3.59 1.4 5.59 2.18 7.28 2.18c6.58 0 10.38 2.19 15-8.1L447.65 96c2.01-6-4.99-10.82-11.27-13.32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={192}
        cy={192}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={320}
        cy={208}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill={resolvedColor}
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
        d="M404.76 123.08C358.37 104.18 309.69 96 256 96s-106.1 9-148.9 26.68c-8.08 3.3-15.26 9-10.07 19.5C101.24 150.71 203 375 241.66 455a15.94 15.94 0 0 0 28.72 0l144.05-312.22c3.19-6.9.9-15.4-9.67-19.7Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M436.38 82.68C384.31 62.08 320.17 48 256 48S128.65 60.78 75.48 82.08C70.79 84 62 88.43 64.41 95.88L74.09 120c4 8.2 8.67 8.2 15.06 8.2c1.79 0 4.29-1 7.28-2.18A442.5 442.5 0 0 1 256 96c56.76 0 114.91 12 159.6 30c3.59 1.4 5.59 2.18 7.28 2.18c6.58 0 10.38 2.19 15-8.1L447.65 96c2.01-6-4.99-10.82-11.27-13.32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={192}
        cy={192}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={320}
        cy={208}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill={resolvedColor}
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
        d="M404.76 123.08C358.37 104.18 309.69 96 256 96s-106.1 9-148.9 26.68c-8.08 3.3-15.26 9-10.07 19.5C101.24 150.71 203 375 241.66 455a15.94 15.94 0 0 0 28.72 0l144.05-312.22c3.19-6.9.9-15.4-9.67-19.7Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M436.38 82.68C384.31 62.08 320.17 48 256 48S128.65 60.78 75.48 82.08C70.79 84 62 88.43 64.41 95.88L74.09 120c4 8.2 8.67 8.2 15.06 8.2c1.79 0 4.29-1 7.28-2.18A442.5 442.5 0 0 1 256 96c56.76 0 114.91 12 159.6 30c3.59 1.4 5.59 2.18 7.28 2.18c6.58 0 10.38 2.19 15-8.1L447.65 96c2.01-6-4.99-10.82-11.27-13.32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={192}
        cy={192}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={320}
        cy={208}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M442.3 67.82C383.92 44.72 317.78 32 256 32c-63.57 0-129.8 12.51-186.56 35.25C49.18 75.48 42 80 42 80l22 44l37.53-16.14C147.58 89.53 199.19 80 256.51 80c57.49 0 108.09 9.23 154.75 28.25L448 124l22-44s-7-4-27.7-12.18"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.66 140.85C364.15 122.52 308.16 112 256 112a425 425 0 0 0-153.7 28.9c-.25.1-9.24 4.23-19 8.71c7.46 16.22 18 39.16 22.2 48.33L256 480l173.74-330.84l-19.92-8.24Zm-185.25 53.22a32 32 0 1 1-34-34a32.12 32.12 0 0 1 34 34m64 128a32 32 0 1 1-34-34a32.12 32.12 0 0 1 34 34m64-112a32 32 0 1 1-34-34a32.12 32.12 0 0 1 34 34"
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
