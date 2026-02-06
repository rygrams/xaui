import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoEdgeIcon: React.FC<IconProps> = ({
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
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
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
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
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
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
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
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M255.5 15c-132 0-240 108-240 240s108 240 240 240c85.4 0 160.8-45.2 203.3-112.9a6.87 6.87 0 0 0-9.1-9.7a108.6 108.6 0 0 1-18.4 8.6c-36.8 12.6-57.1 13.1-82.1 12c-27.9-1.2-61.9-10.8-85.8-25s-43.5-34.6-54.1-52.3s-17-39.9-14.1-68.3c2.9-29 29.4-52.6 60.4-52.6c33.5 0 60.8 26.6 60.8 60.1c0 17-8.1 31.7-18.5 43.5c-2.3 2.1-7.6 9.7 5.8 20c15.9 12.2 51.6 18 79.9 16.6s59.1-12.6 80.2-34.8c16.8-17.7 31.8-46.1 31.8-77.4C495.5 97.7 379.5 15 255.5 15"
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
