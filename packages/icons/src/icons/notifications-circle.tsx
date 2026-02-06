import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const NotificationsCircleIcon: React.FC<IconProps> = ({
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
        d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-21.24 8.46-47 25.8-47 74.67c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313m-144.96 39a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 0 0-4-4.48Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 0 1 4-4.42h71.45a4 4 0 0 1 4 4.48C293.15 374.85 276.68 384 256 384m98-48H158c-11.84 0-18-15-11.19-23c16.33-19.34 27.87-27.47 27.87-80.8c0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 0 0 6.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.4 11.4 0 0 0 6.34 6.68c21.21 8.44 47 25.81 47 74.67c0 53.33 11.53 61.46 27.86 80.8c6.74 7.99.57 22.99-11.2 22.99"
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
        d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-21.24 8.46-47 25.8-47 74.67c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313m-144.96 39a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 0 0-4-4.48Z"
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
        d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-21.24 8.46-47 25.8-47 74.67c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313m-144.96 39a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 0 0-4-4.48Z"
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
        d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8c0-48.86-25.78-66.23-47-74.67a11.4 11.4 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-21.24 8.46-47 25.8-47 74.67c0 53.33-11.54 61.46-27.87 80.8c-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313m-144.96 39a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 0 0-4-4.48Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M295.68 351.43v.57h.32Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        d="M256 384c22.28 0 39.36-10.63 39.66-32H216c0 21.75 17.53 32 40 32m39.67-32h.33l-.32-.57c0 .19-.01.38-.01.57"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 336c-22.48 0-40-10.25-40-32h80c-.3 21.37-17.71 32-40 32m112-48H144v-28l28-36v-32.3c0-40.41 15.82-75.35 56-84.27l4-27.43h48l4 27.43c40 8.92 56 44 56 84.27V272l28 36Z"
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
