import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const HeartDislikeIcon: React.FC<IconProps> = ({
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
        d="M417.84 448a15.94 15.94 0 0 1-11.35-4.72L40.65 75.26a16 16 0 0 1 22.7-22.56l365.83 368a16 16 0 0 1-11.34 27.3M364.92 80c-48.09 0-80 29.55-96.92 51c-16.88-21.48-48.83-51-96.92-51a107.4 107.4 0 0 0-31 4.55L168 112c22.26 0 45.81 9 63.94 26.67a123 123 0 0 1 21.75 28.47a16 16 0 0 0 28.6 0a123 123 0 0 1 21.77-28.51C322.19 121 342.66 112 364.92 112c43.15 0 78.62 36.33 79.07 81c.54 53.69-22.75 99.55-57.38 139.52l22.63 22.77c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.8 58.61-153C475.37 130.52 425.54 80 364.92 80M268 432C180.38 372.51 91 297.6 92 193a83.7 83.7 0 0 1 2.24-18.39L69 149.14a115.1 115.1 0 0 0-9 43.49c-.54 54.22 18.63 104.27 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.84 31.84 0 0 0 36 0c20.35-13.81 37.7-26.5 52.58-38.11l-22.66-22.81C300.25 409.6 284.09 421.05 268 432"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M417.84 448a16 16 0 0 1-11.35-4.72l-365.84-368a16 16 0 1 1 22.7-22.56l365.83 368A16 16 0 0 1 417.84 448M364.92 80c-44.09 0-74.61 24.82-92.39 45.5a6 6 0 0 1-9.06 0C245.69 104.82 215.16 80 171.08 80a107.7 107.7 0 0 0-31 4.54l269.13 270.7c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.79 58.61-153C475.37 130.53 425.54 80 364.92 80M69 149.15a115.1 115.1 0 0 0-9 43.49c-.54 54.21 18.63 104.25 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.88 31.88 0 0 0 36 0c20.35-13.82 37.7-26.5 52.58-38.12Z"
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
        d="M417.84 448a15.94 15.94 0 0 1-11.35-4.72L40.65 75.26a16 16 0 0 1 22.7-22.56l365.83 368a16 16 0 0 1-11.34 27.3M364.92 80c-48.09 0-80 29.55-96.92 51c-16.88-21.48-48.83-51-96.92-51a107.4 107.4 0 0 0-31 4.55L168 112c22.26 0 45.81 9 63.94 26.67a123 123 0 0 1 21.75 28.47a16 16 0 0 0 28.6 0a123 123 0 0 1 21.77-28.51C322.19 121 342.66 112 364.92 112c43.15 0 78.62 36.33 79.07 81c.54 53.69-22.75 99.55-57.38 139.52l22.63 22.77c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.8 58.61-153C475.37 130.52 425.54 80 364.92 80M268 432C180.38 372.51 91 297.6 92 193a83.7 83.7 0 0 1 2.24-18.39L69 149.14a115.1 115.1 0 0 0-9 43.49c-.54 54.22 18.63 104.27 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.84 31.84 0 0 0 36 0c20.35-13.81 37.7-26.5 52.58-38.11l-22.66-22.81C300.25 409.6 284.09 421.05 268 432"
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
        d="M417.84 448a15.94 15.94 0 0 1-11.35-4.72L40.65 75.26a16 16 0 0 1 22.7-22.56l365.83 368a16 16 0 0 1-11.34 27.3M364.92 80c-48.09 0-80 29.55-96.92 51c-16.88-21.48-48.83-51-96.92-51a107.4 107.4 0 0 0-31 4.55L168 112c22.26 0 45.81 9 63.94 26.67a123 123 0 0 1 21.75 28.47a16 16 0 0 0 28.6 0a123 123 0 0 1 21.77-28.51C322.19 121 342.66 112 364.92 112c43.15 0 78.62 36.33 79.07 81c.54 53.69-22.75 99.55-57.38 139.52l22.63 22.77c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.8 58.61-153C475.37 130.52 425.54 80 364.92 80M268 432C180.38 372.51 91 297.6 92 193a83.7 83.7 0 0 1 2.24-18.39L69 149.14a115.1 115.1 0 0 0-9 43.49c-.54 54.22 18.63 104.27 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.84 31.84 0 0 0 36 0c20.35-13.81 37.7-26.5 52.58-38.11l-22.66-22.81C300.25 409.6 284.09 421.05 268 432"
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
        d="M417.84 448a15.94 15.94 0 0 1-11.35-4.72L40.65 75.26a16 16 0 0 1 22.7-22.56l365.83 368a16 16 0 0 1-11.34 27.3M364.92 80c-48.09 0-80 29.55-96.92 51c-16.88-21.48-48.83-51-96.92-51a107.4 107.4 0 0 0-31 4.55L168 112c22.26 0 45.81 9 63.94 26.67a123 123 0 0 1 21.75 28.47a16 16 0 0 0 28.6 0a123 123 0 0 1 21.77-28.51C322.19 121 342.66 112 364.92 112c43.15 0 78.62 36.33 79.07 81c.54 53.69-22.75 99.55-57.38 139.52l22.63 22.77c3-3.44 5.7-6.64 8.14-9.6c40-48.75 59.15-98.8 58.61-153C475.37 130.52 425.54 80 364.92 80M268 432C180.38 372.51 91 297.6 92 193a83.7 83.7 0 0 1 2.24-18.39L69 149.14a115.1 115.1 0 0 0-9 43.49c-.54 54.22 18.63 104.27 58.61 153c18.77 22.87 52.8 59.45 131.39 112.8a31.84 31.84 0 0 0 36 0c20.35-13.81 37.7-26.5 52.58-38.11l-22.66-22.81C300.25 409.6 284.09 421.05 268 432"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m32 64.45l389.47 389.94l22.84-22.47L54.85 42zm30.67 128.46c-.56 55.63 19.77 106.94 62.16 156.88c40.25 47.42 94.56 79.67 137.47 108.21l9 6l9-6c18.49-12.3 39.1-25.3 59.79-39.89L71.74 149.28a114.6 114.6 0 0 0-9.07 43.63m355.16 156.88c42.39-49.94 62.72-101.25 62.16-156.88c-.63-62-50.61-112.54-111.43-112.54c-48.26 0-80.35 28-97.23 48.17c-16.88-20.2-49-48.17-97.23-48.17A108.2 108.2 0 0 0 142.84 85l270 270.48c1.71-1.89 3.37-3.78 4.99-5.69"
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
