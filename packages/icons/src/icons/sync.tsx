import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const SyncIcon: React.FC<IconProps> = ({
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
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
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
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
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
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
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
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 0 0-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 0 0 140-66.92"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m32 256l44-44l46 44m358 0l-44 44l-46-44"
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
