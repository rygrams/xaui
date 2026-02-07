import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoIonicIcon: React.FC<IconProps> = ({
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
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
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
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
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
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
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
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M73.6 256c0-100.737 81.663-182.4 182.4-182.4c40.552 0 77.992 13.212 108.286 35.603c7.946-18.702 23.958-33.15 43.67-38.976C366.589 36.357 313.656 16 256 16C123.451 16 16 123.452 16 256s107.451 240 240 240c132.548 0 239.999-107.452 239.999-240c0-27.741-4.718-54.427-13.407-79.269c-11.824 15.985-30.428 26.649-51.564 27.742c4.795 16.319 7.371 33.605 7.371 51.527c0 100.737-81.663 182.4-182.399 182.4S73.6 356.737 73.6 256"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M491.065 207.374a238 238 0 0 0-8.473-30.643c-11.823 15.984-30.428 26.649-51.564 27.742a181.6 181.6 0 0 1 6.719 35.964c22.259-2.737 41.5-15.226 53.318-33.063M256 361.001c57.853 0 105-47.057 105-105c0-57.854-47.057-105-105-105s-105 47.146-105 105s47.147 105 105 105M413.5 166c28.995 0 52.5-23.505 52.5-52.5S442.495 61 413.5 61S361 84.505 361 113.5s23.505 52.5 52.5 52.5"
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
