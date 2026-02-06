import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoFoursquareIcon: React.FC<IconProps> = ({
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
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
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
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
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
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
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
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M376.76 32H138.54C105.67 32 96 56.8 96 72.41v379.64c0 17.59 9.42 24.12 14.72 26.27s19.91 4 28.67-6.17c0 0 112.47-130.89 114.4-132.83c2.92-2.93 2.92-2.93 5.84-2.93h72.77c30.58 0 35.49-21.87 38.69-34.75c2.65-10.79 32.48-164 42.45-212.56C421.14 52 411.74 32 376.76 32m-5.67 269.64c2.65-10.79 32.48-164 42.45-212.56m-50.85 7.59l-10 51.73c-1.19 5.65-8.28 11.6-14.86 11.6h-95.92c-10.44 0-17.91 6.14-17.91 16.6v13.45c0 10.47 7.52 17.89 18 17.89h81.85c7.38 0 14.61 8.11 13 16s-9.09 46.57-10 50.89s-5.84 11.72-14.61 11.72H248c-11.7 0-15.24 1.54-23.07 11.3s-78.26 94.59-78.26 94.59c-.71.82-1.41.58-1.41-.31V95.9c0-6.69 5.8-14.53 14.48-14.53h191.14a12.42 12.42 0 0 1 11.81 15.3"
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
