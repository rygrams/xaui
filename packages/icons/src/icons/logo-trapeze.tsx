import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoTrapezeIcon: React.FC<IconProps> = ({
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
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
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
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
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
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
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
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m311.05 189.26l.055-.093l64.98-110.618L257.923 8l-64.98 110.617l-.096.164L8 433.451L126.162 504l85.948-146.312c14.612 17.618 32.393 33.074 53.108 45.442l168.804 100.785L504 384.789L335.197 284.004c-32.599-19.463-43.396-61.862-24.147-94.744"
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
