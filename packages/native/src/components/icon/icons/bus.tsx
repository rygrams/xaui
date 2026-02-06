import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const BusIcon: React.FC<IconProps> = ({
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
        width={352}
        height={192}
        x={80}
        y={112}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedRect
        width={352}
        height={128}
        x={80}
        y={304}
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
        d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Zm272 0v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v192M80 80v288M432 80v288"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M400 32H112a48 48 0 0 0-48 48v320a47.9 47.9 0 0 0 16 35.74V454a26 26 0 0 0 26 26h28a26 26 0 0 0 26-26v-6h192v6a26 26 0 0 0 26 26h28a26 26 0 0 0 26-26v-18.26A47.9 47.9 0 0 0 448 400V80a48 48 0 0 0-48-48M147.47 399.82a32 32 0 1 1 28.35-28.35a32 32 0 0 1-28.35 28.35M236 288H112a16 16 0 0 1-16-16V144a16 16 0 0 1 16-16h124a4 4 0 0 1 4 4v152a4 4 0 0 1-4 4m20-192H112.46c-8.6 0-16-6.6-16.44-15.19A16 16 0 0 1 112 64h287.54c8.6 0 16 6.6 16.44 15.19A16 16 0 0 1 400 96zm20 32h124a16 16 0 0 1 16 16v128a16 16 0 0 1-16 16H276a4 4 0 0 1-4-4V132a4 4 0 0 1 4-4m60.18 243.47a32 32 0 1 1 28.35 28.35a32 32 0 0 1-28.35-28.35"
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
        width={352}
        height={192}
        x={80}
        y={112}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedRect
        width={352}
        height={128}
        x={80}
        y={304}
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
        d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Zm272 0v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v192M80 80v288M432 80v288"
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
        width={352}
        height={192}
        x={80}
        y={112}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedRect
        width={352}
        height={128}
        x={80}
        y={304}
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
        d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Zm272 0v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v192M80 80v288M432 80v288"
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
        width={352}
        height={192}
        x={80}
        y={112}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        rx={32}
        ry={32}
        {...animatedProps}
      />
      <AnimatedRect
        width={352}
        height={128}
        x={80}
        y={304}
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
        d="M400 112H112a32.09 32.09 0 0 1-32-32h0a32.09 32.09 0 0 1 32-32h288a32.09 32.09 0 0 1 32 32h0a32.09 32.09 0 0 1-32 32M144 432v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Zm272 0v22a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10v-22Z"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={368}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={144}
        cy={368}
        r={16}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v192M80 80v288M432 80v288"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill="none"
        d="M400 64H112a16 16 0 0 0 0 32h288a16 16 0 0 0 0-32"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M424 32H88a24 24 0 0 0-24 24v360a32 32 0 0 0 16 27.71V480h72v-32h208v32h72v-36.29A32 32 0 0 0 448 416V56a24 24 0 0 0-24-24M175.82 371.47a32 32 0 1 1-35.3-35.29a32.09 32.09 0 0 1 35.3 35.29M240 288H96V128h144Zm16-192H96.46L96 64h320l-.46 32zm16 32h144v160H272Zm64.18 236.53a32 32 0 1 1 35.3 35.29a32.09 32.09 0 0 1-35.3-35.29"
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
