import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedPath = Animated.createAnimatedComponent(Path)

export const EllipsisVerticalIcon: React.FC<IconProps> = ({
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
        cx="256"
        cy="256"
        r="48"
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx="256"
        cy="416"
        r="48"
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx="256"
        cy="96"
        r="48"
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => renderBaseline()

  const renderDuotone = () => renderBaseline()

  const renderRoundOutlined = () => (
    <>
      <AnimatedCircle
        cx="256"
        cy="256"
        r="26"
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx="256"
        cy="346"
        r="26"
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx="256"
        cy="166"
        r="26"
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
    </>
  )

  const renderSquareOutlined = () => renderRoundOutlined()

  const renderRoundFilled = () => renderBaseline()

  const renderSquareFilled = () => renderBaseline()

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
