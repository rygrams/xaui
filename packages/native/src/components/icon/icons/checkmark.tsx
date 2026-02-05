import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const CheckmarkIcon: React.FC<IconProps> = ({
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
    <AnimatedPath
      fill="none"
      stroke={resolvedColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M416 128L192 384l-96-96"
      {...animatedProps}
    />
  )

  const renderFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192zm-257.9 78.9l-64-64a16 16 0 0 1 22.6-22.6l52.7 52.7 116.7-116.7a16 16 0 0 1 22.6 22.6l-128 128a16 16 0 0 1-22.6 0z"
      {...animatedProps}
    />
  )

  const renderDuotone = () => (
    <>
      <Path
        fill={resolvedColor}
        opacity={0.3}
        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48z"
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 128L192 384l-96-96"
        {...animatedProps}
      />
    </>
  )

  const renderRoundOutlined = () => (
    <>
      <Circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 128L192 384l-96-96"
        {...animatedProps}
      />
    </>
  )

  const renderSquareOutlined = () => (
    <>
      <Rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M416 128L192 384l-96-96"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192zm-257.9 78.9l-64-64a16 16 0 0 1 22.6-22.6l52.7 52.7 116.7-116.7a16 16 0 0 1 22.6 22.6l-128 128a16 16 0 0 1-22.6 0z"
      {...animatedProps}
    />
  )

  const renderSquareFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M400 64H112a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48zm-141.45 241.25l-116.36-103a16 16 0 0 1 21.62-23.58l104.18 92.23 145.69-145.69a16 16 0 0 1 22.62 22.62l-156 156a16 16 0 0 1-21.75.42z"
      {...animatedProps}
    />
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
