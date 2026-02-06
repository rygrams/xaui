import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FileTrayStackedIcon: React.FC<IconProps> = ({
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
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96L432 72c-5-27-23-40-48-40Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 192h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M464 352H320a16 16 0 0 0-16 16a48 48 0 0 1-96 0a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v64a64.07 64.07 0 0 0 64 64h320a64.07 64.07 0 0 0 64-64v-64a16 16 0 0 0-16-16m15.46-164.12L447.61 68.45C441.27 35.59 417.54 16 384 16H128c-16.8 0-31 4.69-42.1 13.94S67.66 52 64.4 68.4L32.54 187.88A16 16 0 0 0 32 192v48c0 35.29 28.71 80 64 80h320c35.29 0 64-44.71 64-80v-48a16 16 0 0 0-.54-4.12M440.57 176H320a15.92 15.92 0 0 0-16 15.82a48 48 0 1 1-96 0A15.92 15.92 0 0 0 192 176H71.43a2 2 0 0 1-1.93-2.52L95.71 75c3.55-18.41 13.81-27 32.29-27h256c18.59 0 28.84 8.53 32.25 26.85l26.25 98.63a2 2 0 0 1-1.93 2.52"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96L432 72c-5-27-23-40-48-40Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 192h144m128 0h144m-272 0a64 64 0 0 0 128 0"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96L432 72c-5-27-23-40-48-40Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 192h144m128 0h144m-272 0a64 64 0 0 0 128 0"
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
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 336h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48v-96L432 72c-5-27-23-40-48-40Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M48 192h144m128 0h144m-272 0a64 64 0 0 0 128 0"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M448 16H64L32 176v144h448V176Zm-12 160H320a64 64 0 0 1-128 0H76L98 58h316ZM320 352a64 64 0 0 1-128 0H32v144h448V352Z"
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
