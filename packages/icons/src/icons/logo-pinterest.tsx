import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoPinterestIcon: React.FC<IconProps> = ({
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
        fill={resolvedColor}
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
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
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
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
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
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
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 32c-123.7 0-224 100.3-224 224c0 91.7 55.2 170.5 134.1 205.2c-.6-15.6-.1-34.4 3.9-51.4c4.3-18.2 28.8-122.1 28.8-122.1s-7.2-14.3-7.2-35.4c0-33.2 19.2-58 43.2-58c20.4 0 30.2 15.3 30.2 33.6c0 20.5-13.1 51.1-19.8 79.5c-5.6 23.8 11.9 43.1 35.4 43.1c42.4 0 71-54.5 71-119.1c0-49.1-33.1-85.8-93.2-85.8c-67.9 0-110.3 50.7-110.3 107.3c0 19.5 5.8 33.3 14.8 43.9c4.1 4.9 4.7 6.9 3.2 12.5c-1.1 4.1-3.5 14-4.6 18c-1.5 5.7-6.1 7.7-11.2 5.6c-31.3-12.8-45.9-47-45.9-85.6c0-63.6 53.7-139.9 160.1-139.9c85.5 0 141.8 61.9 141.8 128.3c0 87.9-48.9 153.5-120.9 153.5c-24.2 0-46.9-13.1-54.7-27.9c0 0-13 51.6-15.8 61.6c-4.7 17.3-14 34.5-22.5 48a225.1 225.1 0 0 0 63.5 9.2c123.7 0 224-100.3 224-224S379.75 32 256.05 32"
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
