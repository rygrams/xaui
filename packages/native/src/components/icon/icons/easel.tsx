import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const EaselIcon: React.FC<IconProps> = ({
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
        width={416}
        height={272}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
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
        d="M256 416v-64m0-272V48m144 416l-32-112M112 464l32-112"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedRect
        width={352}
        height={208}
        x={80}
        y={112}
        fill={resolvedColor}
        rx={12}
        ry={12}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M432 64H272V48a16 16 0 0 0-32 0v16H80a48.05 48.05 0 0 0-48 48v208a48.05 48.05 0 0 0 48 48h42.79l-26.17 91.6a16 16 0 1 0 30.76 8.8L156.07 368H240v48a16 16 0 0 0 32 0v-48h83.93l28.69 100.4a16 16 0 1 0 30.76-8.8L389.21 368H432a48.05 48.05 0 0 0 48-48V112a48.05 48.05 0 0 0-48-48m16 256a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V112a16 16 0 0 1 16-16h352a16 16 0 0 1 16 16Z"
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
        height={272}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
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
        d="M256 416v-64m0-272V48m144 416l-32-112M112 464l32-112"
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
        height={272}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
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
        d="M256 416v-64m0-272V48m144 416l-32-112M112 464l32-112"
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
        height={272}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
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
        d="M256 416v-64m0-272V48m144 416l-32-112M112 464l32-112"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M468 64H278V32h-44v32H44a12 12 0 0 0-12 12v280a12 12 0 0 0 12 12h78.19L89.93 470.46l36.53 9.61L161.74 368H234v64h44v-64h71.84l31 111.7l36.83-8.57L389.05 368H468a12 12 0 0 0 12-12V76a12 12 0 0 0-12-12m-26 266H70V102h372Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M88 120h336v192H88z"
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
