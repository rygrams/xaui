import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const HappyIcon: React.FC<IconProps> = ({
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
      <AnimatedCircle
        cx={184}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={328}
        cy={232}
        r={24}
        fill={resolvedColor}
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
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M184 208a24 24 0 1 1-24 24a23.94 23.94 0 0 1 24-24m167.67 106.17c-12 40.3-50.2 69.83-95.62 69.83s-83.62-29.53-95.72-69.83a8 8 0 0 1 7.83-10.17h175.69a8 8 0 0 1 7.82 10.17M328 256a24 24 0 1 1 24-24a23.94 23.94 0 0 1-24 24"
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
        cx={184}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={328}
        cy={232}
        r={24}
        fill={resolvedColor}
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
        cx={184}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={328}
        cy={232}
        r={24}
        fill={resolvedColor}
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
        cx={184}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={328}
        cy={232}
        r={24}
        fill={resolvedColor}
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
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M414.39 97.61A224 224 0 1 0 97.61 414.39A224 224 0 1 0 414.39 97.61M328 208a24 24 0 1 1-24 24a23.94 23.94 0 0 1 24-24m-144 0a24 24 0 1 1-24 24a23.94 23.94 0 0 1 24-24m72.05 176c-45.42 0-83.75-29.49-95.72-69.83C159.29 310.65 158 304 158 304h196s-1.31 6.69-2.33 10.17c-11.78 40.36-50.2 69.83-95.62 69.83"
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
