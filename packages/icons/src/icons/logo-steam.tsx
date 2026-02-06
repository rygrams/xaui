import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoSteamIcon: React.FC<IconProps> = ({
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
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
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
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
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
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
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
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M478.8 208.2a36 36 0 1 1-36-36a36 36 0 0 1 36 36M442.6 139a69.42 69.42 0 0 0-69.4 68.7l-43.2 62a49 49 0 0 0-5.4-.3a51.27 51.27 0 0 0-26.4 7.3L102.4 198a51.8 51.8 0 1 0-50.6 62.9a51.27 51.27 0 0 0 26.4-7.3L274 332.2a51.76 51.76 0 0 0 102.1-5.9l66.5-48.6a69.35 69.35 0 1 0 0-138.7m0 22.9a46.45 46.45 0 1 1-46.5 46.5a46.54 46.54 0 0 1 46.5-46.5m-390.8 9a38.18 38.18 0 0 1 33.7 20.2l-18.9-7.6v.1a30.21 30.21 0 0 0-22.6 56v.1l16.1 6.4a36.8 36.8 0 0 1-8.2.9a38.05 38.05 0 0 1-.1-76.1m272.8 112.2a38.1 38.1 0 1 1-33.7 55.9c6.3 2.5 12.5 5 18.8 7.6a30.27 30.27 0 1 0 22.5-56.2l-15.9-6.4a47 47 0 0 1 8.3-.9"
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
