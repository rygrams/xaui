import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ArrowUndoCircleIcon: React.FC<IconProps> = ({
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
      <AnimatedPath
        fill={resolvedColor}
        d="M245.09 327.74v-37.32c57.07 0 84.51 13.47 108.58 38.68c5.4 5.65 15 1.32 14.29-6.43c-5.45-61.45-34.14-117.09-122.87-117.09v-37.32a8.32 8.32 0 0 0-14.05-6L146.58 242a8.2 8.2 0 0 0 0 11.94L231 333.71a8.32 8.32 0 0 0 14.09-5.97"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48m97.67 281.1c-24.07-25.21-51.51-38.68-108.58-38.68v37.32a8.32 8.32 0 0 1-14.05 6L146.58 254a8.2 8.2 0 0 1 0-11.94L231 162.29a8.32 8.32 0 0 1 14.05 6v37.32c88.73 0 117.42 55.64 122.87 117.09c.73 7.72-8.85 12.05-14.25 6.4"
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
        d="M245.09 327.74v-37.32c57.07 0 84.51 13.47 108.58 38.68c5.4 5.65 15 1.32 14.29-6.43c-5.45-61.45-34.14-117.09-122.87-117.09v-37.32a8.32 8.32 0 0 0-14.05-6L146.58 242a8.2 8.2 0 0 0 0 11.94L231 333.71a8.32 8.32 0 0 0 14.09-5.97"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
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
        d="M245.09 327.74v-37.32c57.07 0 84.51 13.47 108.58 38.68c5.4 5.65 15 1.32 14.29-6.43c-5.45-61.45-34.14-117.09-122.87-117.09v-37.32a8.32 8.32 0 0 0-14.05-6L146.58 242a8.2 8.2 0 0 0 0 11.94L231 333.71a8.32 8.32 0 0 0 14.09-5.97"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
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
        d="M245.09 327.74v-37.32c57.07 0 84.51 13.47 108.58 38.68c5.4 5.65 15 1.32 14.29-6.43c-5.45-61.45-34.14-117.09-122.87-117.09v-37.32a8.32 8.32 0 0 0-14.05-6L146.58 242a8.2 8.2 0 0 0 0 11.94L231 333.71a8.32 8.32 0 0 0 14.09-5.97"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48m-9.17 241.14V344L146 248l100.83-96v54.86c96.5 0 119.17 69 119.17 137.14c-27.85-35.57-52.48-54.86-119.17-54.86"
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
