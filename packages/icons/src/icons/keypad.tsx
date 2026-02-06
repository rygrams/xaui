import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const KeypadIcon: React.FC<IconProps> = ({
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
        cy={448}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M288 192a32 32 0 1 1-32-32a32 32 0 0 1 32 32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 400a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48m128 256a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48M128 272a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48m0-128a48 48 0 1 0 48 48a48 48 0 0 0-48-48"
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
        cy={448}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M288 192a32 32 0 1 1-32-32a32 32 0 0 1 32 32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
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
        cy={448}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M288 192a32 32 0 1 1-32-32a32 32 0 0 1 32 32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
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
        cy={448}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M288 192a32 32 0 1 1-32-32a32 32 0 0 1 32 32Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={384}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={320}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={192}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={128}
        cy={64}
        r={32}
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedRect
        width={96}
        height={96}
        x={80}
        y={16}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={208}
        y={16}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={336}
        y={16}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={80}
        y={144}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={208}
        y={144}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={336}
        y={144}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={80}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={208}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={208}
        y={400}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={96}
        height={96}
        x={336}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
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
