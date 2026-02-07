import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const CaretForwardCircleIcon: React.FC<IconProps> = ({
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
        fill={resolvedColor}
        d="m238.23 342.43l89.09-74.13a16 16 0 0 0 0-24.6l-89.09-74.13A16 16 0 0 0 212 181.86v148.28a16 16 0 0 0 26.23 12.29"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208m-252 74.14V181.86a16 16 0 0 1 26.23-12.29l89.09 74.13a16 16 0 0 1 0 24.6l-89.09 74.13A16 16 0 0 1 212 330.14"
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
        fill={resolvedColor}
        d="m238.23 342.43l89.09-74.13a16 16 0 0 0 0-24.6l-89.09-74.13A16 16 0 0 0 212 181.86v148.28a16 16 0 0 0 26.23 12.29"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
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
        fill={resolvedColor}
        d="m238.23 342.43l89.09-74.13a16 16 0 0 0 0-24.6l-89.09-74.13A16 16 0 0 0 212 181.86v148.28a16 16 0 0 0 26.23 12.29"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
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
        fill={resolvedColor}
        d="m238.23 342.43l89.09-74.13a16 16 0 0 0 0-24.6l-89.09-74.13A16 16 0 0 0 212 181.86v148.28a16 16 0 0 0 26.23 12.29"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208M212 147.73L342.09 256L212 364.27Z"
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
