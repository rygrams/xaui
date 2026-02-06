import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ColorFilterIcon: React.FC<IconProps> = ({
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
      <AnimatedCircle
        cx={256}
        cy={184}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M253.72 202.53a4 4 0 0 0 4.56 0a151.88 151.88 0 0 1 128.44-20.41a4 4 0 0 0 5.15-4C388.8 105.86 329 48 256 48s-132.8 57.86-135.87 130.15a4 4 0 0 0 5.15 4a151.88 151.88 0 0 1 128.44 20.41Zm151.59 10.03a152.53 152.53 0 0 1-83.08 108.23a4 4 0 0 0-2.28 3.69c0 1.17.05 2.34.05 3.52a151.58 151.58 0 0 1-47.15 109.94a4 4 0 0 0 .64 6.31A135.24 135.24 0 0 0 344 464c72.07 0 134.1-60.28 136-132.34a136.07 136.07 0 0 0-68.76-121.87a4 4 0 0 0-5.93 2.77"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M390.57 203.67a4 4 0 0 0-2.69-4.4a135.84 135.84 0 0 0-114.4 12.49a4 4 0 0 0-.64 6.29a151.92 151.92 0 0 1 44.47 81.4a4 4 0 0 0 5.94 2.72a136.29 136.29 0 0 0 67.32-98.5M192 328c0-1.18 0-2.35.05-3.52a4 4 0 0 0-2.28-3.69a152.53 152.53 0 0 1-83.08-108.23a4 4 0 0 0-5.88-2.77a136.07 136.07 0 0 0-68.76 121.87C34 403.72 96 464 168.05 464a135.24 135.24 0 0 0 70.46-19.75a4 4 0 0 0 .64-6.31A151.58 151.58 0 0 1 192 328"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M168 192a135.3 135.3 0 0 0-43.88 7.27a4 4 0 0 0-2.69 4.4a136.29 136.29 0 0 0 67.32 98.5a4 4 0 0 0 5.94-2.72a151.92 151.92 0 0 1 44.47-81.4a4 4 0 0 0-.64-6.29A135.2 135.2 0 0 0 168 192m88 144a151.4 151.4 0 0 1-42.72-6.12a4 4 0 0 0-5.15 4a135.7 135.7 0 0 0 45.18 95.4a4 4 0 0 0 5.38 0a135.7 135.7 0 0 0 45.18-95.4a4 4 0 0 0-5.15-4A151.4 151.4 0 0 1 256 336m46.57-27.67a135.94 135.94 0 0 0-43.87-81.58a4.06 4.06 0 0 0-5.4 0a135.94 135.94 0 0 0-43.87 81.58a4 4 0 0 0 2.69 4.4a136.06 136.06 0 0 0 87.76 0a4 4 0 0 0 2.69-4.4"
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
      <AnimatedCircle
        cx={256}
        cy={184}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
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
      <AnimatedCircle
        cx={256}
        cy={184}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
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
      <AnimatedCircle
        cx={256}
        cy={184}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={120}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 185a167.85 167.85 0 0 1 134.9-18.28C382.36 99.83 325.12 48 256 48S129.64 99.83 121.1 166.67A167.85 167.85 0 0 1 256 185m80 146.73a167.5 167.5 0 0 1-52.37 118.08A135 135 0 0 0 344 464c75 0 136-61 136-136a136 136 0 0 0-59.06-112.08A168.53 168.53 0 0 1 336 331.73m-52.42-125.54a167.87 167.87 0 0 1 49.36 89.89a136.14 136.14 0 0 0 58.06-95.7a135.87 135.87 0 0 0-107.43 5.81ZM176.05 331.73a168.53 168.53 0 0 1-85-115.81A136 136 0 0 0 32 328c0 75 61 136 136 136a135 135 0 0 0 60.42-14.19a167.5 167.5 0 0 1-52.37-118.08m3.01-35.65a167.87 167.87 0 0 1 49.36-89.89A135.87 135.87 0 0 0 121 200.38a136.14 136.14 0 0 0 58.06 95.7m123.84 49.25a168.2 168.2 0 0 1-93.8 0A135.9 135.9 0 0 0 256 431.6a135.9 135.9 0 0 0 46.9-86.27M209 311.62a136 136 0 0 0 94 0a135.93 135.93 0 0 0-47-87.22a135.93 135.93 0 0 0-47 87.22"
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
