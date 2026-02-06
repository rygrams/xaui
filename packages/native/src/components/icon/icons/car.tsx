import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CarIcon: React.FC<IconProps> = ({
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
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
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
        d="M447.68 220.78a16 16 0 0 0-1-3.08l-37.78-88.16C400.19 109.17 379 96 354.89 96H157.11c-24.09 0-45.3 13.17-54 33.54L65.29 217.7A15.7 15.7 0 0 0 64 224v176a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-16h256v16a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V224a16 16 0 0 0-.32-3.22M144 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32m224 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32M104.26 208l28.23-65.85C136.11 133.69 146 128 157.11 128h197.78c11.1 0 21 5.69 24.62 14.15L407.74 208Z"
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
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
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
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
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m80 224l37.78-88.15C123.93 121.5 139.6 112 157.11 112h197.78c17.51 0 33.18 9.5 39.33 23.85L432 224m-352 0h352v144H80zm32 144v32H80v-32m352 0v32h-32v-32"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={288}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
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
        d="M447.68 220.78a16.4 16.4 0 0 0-1-3.1l-48-112A16 16 0 0 0 384 96H128a16 16 0 0 0-14.71 9.7l-48 112a16.4 16.4 0 0 0-1 3.1A16 16 0 0 0 64 224v184a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8v-24h288v24a8 8 0 0 0 8 8h32a8 8 0 0 0 8-8V224a16 16 0 0 0-.32-3.22M144 320a32 32 0 1 1 32-32a32 32 0 0 1-32 32m224 0a32 32 0 1 1 32-32a32 32 0 0 1-32 32M104.26 208l34.29-80h234.9l34.29 80Z"
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
