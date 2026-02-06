import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoVkIcon: React.FC<IconProps> = ({
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
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
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
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
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
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
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
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86c0 0-26.94 65.6-64.56 108.13c-12.2 12.3-17.79 16.4-24.4 16.4c-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3c0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20c-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77c43.21 63 104.72 96.86 160.13 96.86c33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93c7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55c-4.57-14.86-21.86-36.38-44.23-62c-12.2-14.34-30.5-30.23-36.09-37.92c-7.62-10.25-5.59-14.35 0-23.57c-.51 0 63.55-91.22 70.15-122"
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
