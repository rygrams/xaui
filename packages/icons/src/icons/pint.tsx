import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const PintIcon: React.FC<IconProps> = ({
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
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M132.43 162c-6.24-34-4.49-45.55-3.07-68.39L132.27 47a16 16 0 0 1 15.94-15h215.57a16 16 0 0 1 15.94 15l2.91 46.61c1.43 22.86 3.19 34.39-3.06 68.45c-5.93 32.29-43.71 133.27-43.71 238.32V472a8 8 0 0 1-8 8H184.12a8 8 0 0 1-8-8v-71.63c.01-92.47-37.46-204.3-43.69-238.37m2.78-66h241.58"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M399 99.29c-.15-2.13-.3-4.35-.44-6.68L395.69 46a32 32 0 0 0-31.91-30H148.21a32 32 0 0 0-31.91 30l-2.91 46.63c-.14 2.31-.29 4.51-.43 6.62c-1.29 19.24-2.23 33.14 3.73 65.66c1.67 9.11 5.22 22.66 9.73 39.82c12.61 48 33.71 128.36 33.71 195.63V472a24 24 0 0 0 24 24h143.74a24 24 0 0 0 24-24v-71.62c0-77.09 21.31-153.29 34-198.81c4.38-15.63 7.83-28 9.41-36.62c5.99-32.51 5.05-46.42 3.72-65.66m-35-47.54l1.5 24a4 4 0 0 1-4 4.25h-211a4 4 0 0 1-4-4.25l1.48-24A4 4 0 0 1 152 48h208a4 4 0 0 1 4 3.75"
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
        d="M132.43 162c-6.24-34-4.49-45.55-3.07-68.39L132.27 47a16 16 0 0 1 15.94-15h215.57a16 16 0 0 1 15.94 15l2.91 46.61c1.43 22.86 3.19 34.39-3.06 68.45c-5.93 32.29-43.71 133.27-43.71 238.32V472a8 8 0 0 1-8 8H184.12a8 8 0 0 1-8-8v-71.63c.01-92.47-37.46-204.3-43.69-238.37m2.78-66h241.58"
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
        d="M132.43 162c-6.24-34-4.49-45.55-3.07-68.39L132.27 47a16 16 0 0 1 15.94-15h215.57a16 16 0 0 1 15.94 15l2.91 46.61c1.43 22.86 3.19 34.39-3.06 68.45c-5.93 32.29-43.71 133.27-43.71 238.32V472a8 8 0 0 1-8 8H184.12a8 8 0 0 1-8-8v-71.63c.01-92.47-37.46-204.3-43.69-238.37m2.78-66h241.58"
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
        d="M132.43 162c-6.24-34-4.49-45.55-3.07-68.39L132.27 47a16 16 0 0 1 15.94-15h215.57a16 16 0 0 1 15.94 15l2.91 46.61c1.43 22.86 3.19 34.39-3.06 68.45c-5.93 32.29-43.71 133.27-43.71 238.32V472a8 8 0 0 1-8 8H184.12a8 8 0 0 1-8-8v-71.63c.01-92.47-37.46-204.3-43.69-238.37m2.78-66h241.58"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M399 99.29L394 16H118.45L113 99.26c-1.29 19.24-2.23 33.14 3.73 65.66c1.67 9.11 5.22 22.66 9.73 39.82c12.61 48 33.71 128.36 33.71 195.63V496h191.68v-95.62c0-77.09 21.31-153.29 34-198.81c4.38-15.63 7.83-28 9.41-36.62c6.01-32.51 5.07-46.42 3.74-65.66M146.23 80l2-32h215.52l2 32Z"
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
