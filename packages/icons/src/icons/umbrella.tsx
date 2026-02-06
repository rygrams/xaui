import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const UmbrellaIcon: React.FC<IconProps> = ({
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
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 272v160a32 32 0 0 1-32 32h0a32 32 0 0 1-32-32m272-160c0-114.88-93.12-208-208-208S48 157.12 48 272h0a67.88 67.88 0 0 1 96 0h0a78.28 78.28 0 0 1 102.31-7.27L256 272l9.69-7.27A78.28 78.28 0 0 1 368 272h0a67.88 67.88 0 0 1 96 0M256 64V48"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.39 113.61a222.26 222.26 0 0 0-136.33-64.54a8.09 8.09 0 0 1-6.88-5.62a15.79 15.79 0 0 0-30.36 0a8.09 8.09 0 0 1-6.88 5.62A224 224 0 0 0 32 271.52a16.41 16.41 0 0 0 7.24 13.87a16 16 0 0 0 20.07-2.08a51.89 51.89 0 0 1 73.31-.06a15.94 15.94 0 0 0 22.6.15a62.59 62.59 0 0 1 81.49-5.87a8.24 8.24 0 0 1 3.29 6.59v147.42c0 8.6-6.6 16-15.19 16.44A16 16 0 0 1 208 432a16 16 0 0 0-16.29-16c-9 .16-15.9 8.11-15.7 17.1a48.06 48.06 0 0 0 47.37 46.9c26.88.34 48.62-21.93 48.62-48.81V284.12a8.24 8.24 0 0 1 3.29-6.59a62.59 62.59 0 0 1 81.4 5.78a16 16 0 0 0 22.62 0a51.91 51.91 0 0 1 73.38 0a16 16 0 0 0 19.54 2.41a16.4 16.4 0 0 0 7.77-14.21a222.54 222.54 0 0 0-65.61-157.9"
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
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 272v160a32 32 0 0 1-32 32h0a32 32 0 0 1-32-32m272-160c0-114.88-93.12-208-208-208S48 157.12 48 272h0a67.88 67.88 0 0 1 96 0h0a78.28 78.28 0 0 1 102.31-7.27L256 272l9.69-7.27A78.28 78.28 0 0 1 368 272h0a67.88 67.88 0 0 1 96 0M256 64V48"
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
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 272v160a32 32 0 0 1-32 32h0a32 32 0 0 1-32-32m272-160c0-114.88-93.12-208-208-208S48 157.12 48 272h0a67.88 67.88 0 0 1 96 0h0a78.28 78.28 0 0 1 102.31-7.27L256 272l9.69-7.27A78.28 78.28 0 0 1 368 272h0a67.88 67.88 0 0 1 96 0M256 64V48"
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
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 272v160a32 32 0 0 1-32 32h0a32 32 0 0 1-32-32m272-160c0-114.88-93.12-208-208-208S48 157.12 48 272h0a67.88 67.88 0 0 1 96 0h0a78.28 78.28 0 0 1 102.31-7.27L256 272l9.69-7.27A78.28 78.28 0 0 1 368 272h0a67.88 67.88 0 0 1 96 0M256 64V48"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m128.93 280l-.26-.3c-.9-.74-1.83-1.43-2.77-2.1Zm254.15 0l2.62-2.12c-.79.58-1.57 1.17-2.34 1.79Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M463.14 186.44A224.55 224.55 0 0 0 272 48.57V32h-32v16.57A223.58 223.58 0 0 0 32 272v22.52l12.25-11.21a62.63 62.63 0 0 1 81.43-5.88l.22.17c.94.67 1.87 1.36 2.77 2.1q2.09 1.69 4 3.61L144 294.63l11.31-11.32a62.59 62.59 0 0 1 81.4-5.78L240 280v152a16 16 0 0 1-32 0v-16h-32v16a48 48 0 0 0 96 0V280l3.29-2.47a62.59 62.59 0 0 1 81.4 5.78L368 294.63l11.31-11.32q1.95-1.94 4.05-3.64c.77-.62 1.55-1.21 2.34-1.79l.26-.21c24.63-18.47 60-16.13 81.81 5.64l12.23 11.2V272a223.6 223.6 0 0 0-16.86-85.56"
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
