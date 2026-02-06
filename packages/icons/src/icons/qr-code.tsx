import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const QrCodeIcon: React.FC<IconProps> = ({
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
        width={80}
        height={80}
        x={336}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={272}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={416}
        y={416}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={432}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={272}
        y={432}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={336}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={288}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={288}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedRect
        width={80}
        height={80}
        x={336}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={272}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={416}
        y={416}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={432}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={272}
        y={432}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M448 32H304a32 32 0 0 0-32 32v144a32 32 0 0 0 32 32h144a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32m-32 136a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8ZM208 32H64a32 32 0 0 0-32 32v144a32 32 0 0 0 32 32h144a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32m-32 136a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8Zm32 104H64a32 32 0 0 0-32 32v144a32 32 0 0 0 32 32h144a32 32 0 0 0 32-32V304a32 32 0 0 0-32-32m-32 136a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8Z"
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
        width={80}
        height={80}
        x={336}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={272}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={416}
        y={416}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={432}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={272}
        y={432}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={336}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={288}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={288}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
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
        width={80}
        height={80}
        x={336}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={272}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={416}
        y={416}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={432}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={272}
        y={432}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={336}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={288}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={288}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
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
        width={80}
        height={80}
        x={336}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={272}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={64}
        height={64}
        x={416}
        y={416}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={432}
        y={272}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={48}
        x={272}
        y={432}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={336}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={288}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={96}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
      <AnimatedRect
        width={80}
        height={80}
        x={96}
        y={336}
        fill={resolvedColor}
        rx={8}
        ry={8}
        {...animatedProps}
      />
      <AnimatedRect
        width={176}
        height={176}
        x={48}
        y={288}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={16}
        ry={16}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M336 336h80v80h-80zm-64-64h64v64h-64zm144 144h64v64h-64zm16-144h48v48h-48zM272 432h48v48h-48zm64-336h80v80h-80z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M480 240H272V32h208Zm-164-44h120V76H316ZM96 96h80v80H96z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M240 240H32V32h208ZM76 196h120V76H76Zm20 140h80v80H96z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M240 480H32V272h208ZM76 436h120V316H76Z"
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
