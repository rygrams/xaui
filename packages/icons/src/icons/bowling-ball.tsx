import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const BowlingBallIcon: React.FC<IconProps> = ({
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
      <AnimatedCircle
        cx={256}
        cy={256}
        r={208}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={288}
        cy={200}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={128}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={360}
        cy={168}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M288 224a24 24 0 1 1 24-24a24 24 0 0 1-24 24m8-72a24 24 0 1 1 24-24a24 24 0 0 1-24 24m64 40a24 24 0 1 1 24-24a24 24 0 0 1-24 24"
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
        cy={256}
        r={208}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={288}
        cy={200}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={128}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={360}
        cy={168}
        r={24}
        fill={resolvedColor}
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
        cy={256}
        r={208}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={288}
        cy={200}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={128}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={360}
        cy={168}
        r={24}
        fill={resolvedColor}
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
        cy={256}
        r={208}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={288}
        cy={200}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={128}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={360}
        cy={168}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M286 230a28 28 0 1 1 28-28a28 28 0 0 1-28 28m8-76a28 28 0 1 1 28-28a28 28 0 0 1-28 28m68 44a28 28 0 1 1 28-28a28 28 0 0 1-28 28"
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
