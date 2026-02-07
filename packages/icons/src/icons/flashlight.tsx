import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FlashlightIcon: React.FC<IconProps> = ({
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
        d="M456.64 162.86L349.12 55.36c-13.15-13.14-28.68-7.17-41.82 6l-11.95 12c-26.13 26.13-27.62 58.38-29.42 83.31c-.89 12.24-9.78 27.55-18.51 36.28L58.58 381.67c-16.35 16.33-12.69 39.42 3.73 55.84l12.17 12.17c16.36 16.35 39.43 20.16 55.86 3.74l188.83-188.8c8.74-8.74 24-17.55 36.29-18.52c24.87-1.86 58.62-4.85 83.26-29.49l11.94-11.94c13.15-13.14 19.12-28.67 5.98-41.81Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={224.68}
        cy={287.28}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m289 81l142 142"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M462 216c9.35-9.35 15.14-19.09 17.19-28.95c2.7-12.95-1.29-25.55-11.22-35.48L360.43 44.05C346.29 29.92 322 24.07 296 50l-2 2a8 8 0 0 0 0 11.32L448.64 218a8 8 0 0 0 11.36 0Zm-211.86-62.92l-.16 2.34c-.53 7.18-6.88 19.15-13.88 26.14L47.27 370.36c-11.12 11.11-16.46 25.57-15.05 40.7C33.49 424.58 40.16 438 51 448.83L63.17 461c12.61 12.6 27.78 19 42.49 19a50.4 50.4 0 0 0 36-15.24l188.84-188.8c7.07-7.07 18.84-13.3 26.17-13.87c17.48-1.32 43.57-3.28 67.79-15.65a4 4 0 0 0 1-6.37L271.69 86.31a4 4 0 0 0-6.39 1c-12.12 22.99-13.82 46.91-15.16 65.77m-9.95 146.83a20 20 0 1 1 0-25.25a20 20 0 0 1 0 25.25"
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
        d="M456.64 162.86L349.12 55.36c-13.15-13.14-28.68-7.17-41.82 6l-11.95 12c-26.13 26.13-27.62 58.38-29.42 83.31c-.89 12.24-9.78 27.55-18.51 36.28L58.58 381.67c-16.35 16.33-12.69 39.42 3.73 55.84l12.17 12.17c16.36 16.35 39.43 20.16 55.86 3.74l188.83-188.8c8.74-8.74 24-17.55 36.29-18.52c24.87-1.86 58.62-4.85 83.26-29.49l11.94-11.94c13.15-13.14 19.12-28.67 5.98-41.81Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={224.68}
        cy={287.28}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m289 81l142 142"
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
        d="M456.64 162.86L349.12 55.36c-13.15-13.14-28.68-7.17-41.82 6l-11.95 12c-26.13 26.13-27.62 58.38-29.42 83.31c-.89 12.24-9.78 27.55-18.51 36.28L58.58 381.67c-16.35 16.33-12.69 39.42 3.73 55.84l12.17 12.17c16.36 16.35 39.43 20.16 55.86 3.74l188.83-188.8c8.74-8.74 24-17.55 36.29-18.52c24.87-1.86 58.62-4.85 83.26-29.49l11.94-11.94c13.15-13.14 19.12-28.67 5.98-41.81Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={224.68}
        cy={287.28}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m289 81l142 142"
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
        d="M456.64 162.86L349.12 55.36c-13.15-13.14-28.68-7.17-41.82 6l-11.95 12c-26.13 26.13-27.62 58.38-29.42 83.31c-.89 12.24-9.78 27.55-18.51 36.28L58.58 381.67c-16.35 16.33-12.69 39.42 3.73 55.84l12.17 12.17c16.36 16.35 39.43 20.16 55.86 3.74l188.83-188.8c8.74-8.74 24-17.55 36.29-18.52c24.87-1.86 58.62-4.85 83.26-29.49l11.94-11.94c13.15-13.14 19.12-28.67 5.98-41.81Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={224.68}
        cy={287.28}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m289 81l142 142"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m330 16l-42.68 42.7L453.3 224.68L496 182z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M429.21 243.85L268 82.59L249.65 168L16 402l94 94l234.23-233.8Zm-189 56.07a20 20 0 1 1 0-25.25a20 20 0 0 1-.02 25.25Z"
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
