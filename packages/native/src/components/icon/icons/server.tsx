import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ServerIcon: React.FC<IconProps> = ({
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
        d="M432 112v288c0 44.183-78.798 80-176 80S80 444.183 80 400V112"
        {...animatedProps}
      />
      <AnimatedPath
        d="M432 256c0 44.183-78.798 80-176 80S80 300.183 80 256"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M125.295 40.728C159.804 25.158 206.27 16 256.5 16s96.466 9.159 130.748 24.748C420.143 55.706 448 80 448 112v.03c-.011 5.533-3.098 13.89-12.295 24.22c-8.995 10.102-22.617 20.658-40.273 30.264C360.162 185.702 310.794 200 256 200s-104.162-14.298-139.432-33.486c-17.656-9.606-31.278-20.162-40.273-30.264C67.081 125.901 64 117.532 64 112c0-32.428 28.246-56.36 61.295-71.272"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M410.724 194.623c9.586-5.214 18.448-11.755 26.406-18.904c4.054-3.642 10.87-.89 10.87 4.56V258c0 5.532-3.081 11.901-12.295 22.25c-8.995 10.102-22.617 20.658-40.273 30.264C360.162 329.702 310.794 344 256 344s-104.162-14.298-139.432-33.486c-17.656-9.606-31.278-20.162-40.273-30.264C67.081 269.901 64 263.532 64 258v-77.721c0-5.45 6.816-8.202 10.87-4.56c7.958 7.148 16.82 13.69 26.406 18.904C141.286 216.39 195.918 232 256 232s114.714-15.61 154.724-37.377"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M74.87 319.719c-4.054-3.642-10.87-.89-10.87 4.56V400c0 32.224 28.004 56.169 60.928 71.134C159.297 486.756 205.653 496 256 496s96.703-9.244 131.072-24.866C419.996 456.169 448 432.224 448 400v-75.721c0-5.45-6.816-8.202-10.87-4.56c-7.958 7.148-16.82 13.69-26.406 18.904C370.714 360.39 316.082 376 256 376s-114.714-15.61-154.724-37.377c-9.586-5.214-18.448-11.756-26.406-18.904"
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
        d="M432 112v288c0 44.183-78.798 80-176 80S80 444.183 80 400V112"
        {...animatedProps}
      />
      <AnimatedPath
        d="M432 256c0 44.183-78.798 80-176 80S80 300.183 80 256"
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
        d="M432 112v288c0 44.183-78.798 80-176 80S80 444.183 80 400V112"
        {...animatedProps}
      />
      <AnimatedPath
        d="M432 256c0 44.183-78.798 80-176 80S80 300.183 80 256"
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
        d="M432 112v288c0 44.183-78.798 80-176 80S80 444.183 80 400V112"
        {...animatedProps}
      />
      <AnimatedPath
        d="M432 256c0 44.183-78.798 80-176 80S80 300.183 80 256"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M125.295 40.728C159.804 25.158 206.27 16 256.5 16s96.466 9.159 130.748 24.748C420.143 55.706 448 80 448 112v.03c-.011 5.533-3.098 13.89-12.295 24.22c-8.995 10.102-22.617 20.658-40.273 30.264C360.162 185.702 310.794 200 256 200s-104.162-14.298-139.432-33.486c-17.656-9.606-31.278-20.162-40.273-30.264C67.081 125.901 64 117.532 64 112c0-32.428 28.246-56.36 61.295-71.272"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M410.724 194.623c14.213-7.731 26.834-18.379 37.276-29.599V258c0 5.532-3.081 11.901-12.295 22.25c-8.995 10.102-22.617 20.658-40.273 30.264C360.162 329.702 310.794 344 256 344s-104.162-14.298-139.432-33.486c-17.656-9.606-31.278-20.162-40.273-30.264C67.081 269.901 64 263.532 64 258v-92.976c10.442 11.22 23.063 21.868 37.276 29.599C141.286 216.39 195.918 232 256 232s114.714-15.61 154.724-37.377"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M64 309.024V400c0 32.224 28.004 56.169 60.928 71.134C159.297 486.756 205.653 496 256 496s96.703-9.244 131.072-24.866C419.996 456.169 448 432.224 448 400v-90.976c-10.442 11.22-23.063 21.868-37.276 29.599C370.714 360.39 316.082 376 256 376s-114.714-15.61-154.724-37.377C87.063 330.892 74.442 320.244 64 309.024"
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
