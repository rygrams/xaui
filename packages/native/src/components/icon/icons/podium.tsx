import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const PodiumIcon: React.FC<IconProps> = ({
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
        d="M32 160v296a8 8 0 0 0 8 8h136V160a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16M320 48H192a16 16 0 0 0-16 16v400h160V64a16 16 0 0 0-16-16m144 160H352a16 16 0 0 0-16 16v240h136a8 8 0 0 0 8-8V224a16 16 0 0 0-16-16"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M320 32H192a32 32 0 0 0-32 32v412a4 4 0 0 0 4 4h184a4 4 0 0 0 4-4V64a32 32 0 0 0-32-32m144 160h-72a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8h80a24 24 0 0 0 24-24V224a32 32 0 0 0-32-32M48 128a32 32 0 0 0-32 32v296a24 24 0 0 0 24 24h80a8 8 0 0 0 8-8V136a8 8 0 0 0-8-8Z"
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
        d="M32 160v296a8 8 0 0 0 8 8h136V160a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16M320 48H192a16 16 0 0 0-16 16v400h160V64a16 16 0 0 0-16-16m144 160H352a16 16 0 0 0-16 16v240h136a8 8 0 0 0 8-8V224a16 16 0 0 0-16-16"
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
        d="M32 160v296a8 8 0 0 0 8 8h136V160a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16M320 48H192a16 16 0 0 0-16 16v400h160V64a16 16 0 0 0-16-16m144 160H352a16 16 0 0 0-16 16v240h136a8 8 0 0 0 8-8V224a16 16 0 0 0-16-16"
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
        d="M32 160v296a8 8 0 0 0 8 8h136V160a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16M320 48H192a16 16 0 0 0-16 16v400h160V64a16 16 0 0 0-16-16m144 160H352a16 16 0 0 0-16 16v240h136a8 8 0 0 0 8-8V224a16 16 0 0 0-16-16"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M160 32h192v448H160zm224 160h112v288H384zM16 128h112v352H16z"
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
