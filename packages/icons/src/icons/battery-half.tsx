import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const BatteryHalfIcon: React.FC<IconProps> = ({
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
      <AnimatedRect
        width={400}
        height={224}
        x={32}
        y={144}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={45.7}
        ry={45.7}
        {...animatedProps}
      />
      <AnimatedRect
        width={154.31}
        height={114.13}
        x={85.69}
        y={198.93}
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={4}
        ry={4}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M480 218.67v74.66"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedRect
        width={400}
        height={224}
        x={32}
        y={144}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={45.7}
        ry={45.7}
        {...animatedProps}
      />
      <AnimatedRect
        width={154.31}
        height={114.13}
        x={85.69}
        y={198.93}
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={4}
        ry={4}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M480 218.67v74.66"
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
        width={400}
        height={224}
        x={32}
        y={144}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={45.7}
        ry={45.7}
        {...animatedProps}
      />
      <AnimatedRect
        width={154.31}
        height={114.13}
        x={85.69}
        y={198.93}
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={4}
        ry={4}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M480 218.67v74.66"
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
        width={400}
        height={224}
        x={32}
        y={144}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={45.7}
        ry={45.7}
        {...animatedProps}
      />
      <AnimatedRect
        width={154.31}
        height={114.13}
        x={85.69}
        y={198.93}
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={4}
        ry={4}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M480 218.67v74.66"
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
        width={400}
        height={224}
        x={32}
        y={144}
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={45.7}
        ry={45.7}
        {...animatedProps}
      />
      <AnimatedRect
        width={154.31}
        height={114.13}
        x={85.69}
        y={198.93}
        fill={resolvedColor}
        stroke={resolvedColor}
        strokeLinecap="square"
        strokeMiterlimit={10}
        strokeWidth={32}
        rx={4}
        ry={4}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M480 218.67v74.66"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M17 384h432V128H17Zm32-224h368v192H49Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M70.69 182.92H256v146.16H70.69zM465 202.67h32v106.67h-32z"
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
