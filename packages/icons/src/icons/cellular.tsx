import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CellularIcon: React.FC<IconProps> = ({
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
      <AnimatedRect
        width={64}
        height={320}
        x={416}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={240}
        x={288}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={176}
        x={160}
        y={240}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={112}
        x={32}
        y={304}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M472 432h-48a24 24 0 0 1-24-24V104a24 24 0 0 1 24-24h48a24 24 0 0 1 24 24v304a24 24 0 0 1-24 24m-128 0h-48a24 24 0 0 1-24-24V184a24 24 0 0 1 24-24h48a24 24 0 0 1 24 24v224a24 24 0 0 1-24 24m-128 0h-48a24 24 0 0 1-24-24V248a24 24 0 0 1 24-24h48a24 24 0 0 1 24 24v160a24 24 0 0 1-24 24m-128 0H40a24 24 0 0 1-24-24v-96a24 24 0 0 1 24-24h48a24 24 0 0 1 24 24v96a24 24 0 0 1-24 24"
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
      <AnimatedRect
        width={64}
        height={320}
        x={416}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={240}
        x={288}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={176}
        x={160}
        y={240}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={112}
        x={32}
        y={304}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
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
      <AnimatedRect
        width={64}
        height={320}
        x={416}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={240}
        x={288}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={176}
        x={160}
        y={240}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={112}
        x={32}
        y={304}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
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
      <AnimatedRect
        width={64}
        height={320}
        x={416}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={240}
        x={288}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={176}
        x={160}
        y={240}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={112}
        x={32}
        y={304}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={8}
        ry={8}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M496 432h-96V80h96Zm-128 0h-96V160h96Zm-128 0h-96V224h96Zm-128 0H16V288h96Z"
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
