import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FilmIcon: React.FC<IconProps> = ({
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
        width={416}
        height={320}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M436 80H76a44.05 44.05 0 0 0-44 44v264a44.05 44.05 0 0 0 44 44h360a44.05 44.05 0 0 0 44-44V124a44.05 44.05 0 0 0-44-44M112 388a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm241.68 124H158.32a16 16 0 0 1 0-32h195.36a16 16 0 1 1 0 32M448 388a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Zm0-80a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12Z"
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
        width={416}
        height={320}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
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
        width={416}
        height={320}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
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
        width={416}
        height={320}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={384}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={336}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={176}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={48}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={96}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
      <AnimatedRect
        width={256}
        height={160}
        x={128}
        y={256}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={28}
        ry={28}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M480 80H32v352h448ZM112 352v48H64v-48Zm0-80v48H64v-48Zm0-80v48H64v-48Zm0-80v48H64v-48Zm256 160H144v-32h224Zm80 80v48h-48v-48Zm0-80v48h-48v-48Zm0-80v48h-48v-48Zm0-80v48h-48v-48Z"
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
