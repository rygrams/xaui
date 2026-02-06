import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CalculatorIcon: React.FC<IconProps> = ({
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
      <AnimatedRect
        width={288}
        height={416}
        x={112}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M160.01 112H352v64H160.01z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={128}
        x={320}
        y={304}
        fill={resolvedColor}
        rx={24}
        ry={24}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M416 80a48.05 48.05 0 0 0-48-48H144a48.05 48.05 0 0 0-48 48v352a48.05 48.05 0 0 0 48 48h224a48.05 48.05 0 0 0 48-48ZM168 432a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24m88 160a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24m0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112 136a24 24 0 0 1-48 0v-80a24 24 0 0 1 48 0Zm-24-136a24 24 0 1 1 24-24a24 24 0 0 1-24 24m19.31-100.69A16 16 0 0 1 352 176H160a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16v64a16 16 0 0 1-4.69 11.31"
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
        width={288}
        height={416}
        x={112}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M160.01 112H352v64H160.01z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={128}
        x={320}
        y={304}
        fill={resolvedColor}
        rx={24}
        ry={24}
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
        width={288}
        height={416}
        x={112}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M160.01 112H352v64H160.01z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={128}
        x={320}
        y={304}
        fill={resolvedColor}
        rx={24}
        ry={24}
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
        width={288}
        height={416}
        x={112}
        y={48}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M160.01 112H352v64H160.01z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={344}
        cy={248}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={328}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={168}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={256}
        cy={408}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedRect
        width={48}
        height={128}
        x={320}
        y={304}
        fill={resolvedColor}
        rx={24}
        ry={24}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M416 48a16 16 0 0 0-16-16H112a16 16 0 0 0-16 16v416a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16ZM192 432h-48v-48h48Zm0-80h-48v-48h48Zm0-80h-48v-48h48Zm88 160h-48v-48h48Zm0-80h-48v-48h48Zm0-80h-48v-48h48Zm88 160h-48V304h48Zm0-160h-48v-48h48Zm0-96H144V80h224Z"
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
