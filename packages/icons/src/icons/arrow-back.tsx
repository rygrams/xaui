import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ArrowBackIcon: React.FC<IconProps> = ({
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

  const renderArrow = () => (
    <AnimatedPath
      fill="none"
      stroke={resolvedColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={48}
      d="M244 400L100 256l144-144M120 256h292"
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
      {renderArrow()}
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
      {renderArrow()}
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
      {renderArrow()}
    </>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'duotone':
        return renderDuotone()
      case 'round-outlined':
        return renderRoundOutlined()
      case 'square-outlined':
        return renderSquareOutlined()
      case 'filled':
      case 'round-filled':
      case 'square-filled':
      case 'baseline':
      default:
        return renderArrow()
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderVariant()}
    </Svg>
  )
}
