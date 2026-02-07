import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoVueIcon: React.FC<IconProps> = ({
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
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
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
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
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
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
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
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m256 144.03l-55.49-96.11h-79.43L256 281.61L390.92 47.92h-79.43z"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M409.4 47.92L256 313.61L102.6 47.92H15.74L256 464.08L496.26 47.92z"
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
