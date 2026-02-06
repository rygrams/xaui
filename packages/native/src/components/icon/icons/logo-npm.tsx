import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoNpmIcon: React.FC<IconProps> = ({
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
        fill={resolvedColor}
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
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
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
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
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
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
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M227.6 213.1H256v57.1h-28.4z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M0 156v171.4h142.2V356H256v-28.6h256V156Zm142.2 142.9h-28.4v-85.7H85.3v85.7H28.4V184.6h113.8Zm142.2 0h-56.9v28.6h-56.9V184.6h113.8Zm199.2 0h-28.4v-85.7h-28.4v85.7h-28.4v-85.7H370v85.7h-56.9V184.6h170.7v114.3Z"
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
