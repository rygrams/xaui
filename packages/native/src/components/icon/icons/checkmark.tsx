import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '@xaui/native/src/core'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const CheckmarkIcon: React.FC<IconProps> = ({
  variant = 'outline',
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

  const renderOutline = () => (
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

  const renderVariant = () => {
    switch (variant) {
      case 'filled':
        return renderFilled()
      case 'duotone':
        return renderDuotone()
      case 'outline':
      default:
        return renderOutline()
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderVariant()}
    </Svg>
  )
}
