import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ThumbsUpIcon: React.FC<IconProps> = ({
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
        d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 0 1-64-64v-48a64 64 0 0 1 64-64h30a32.34 32.34 0 0 0 27.37-15.4S162 221.81 188 176.78S264 64 272 48c29 0 43 22 34 47.71c-10.28 29.39-23.71 54.38-27.46 87.09c-.54 4.78 3.14 12 7.95 12L416 205"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m416 271l-80-2c-20-1.84-32-12.4-32-30s14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 0 1 416 271Zm32 65l-112-2c-18-.84-32-12.41-32-30c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0 1 32 32a32.1 32.1 0 0 1-32 32Zm-48 128l-64-3c-21-1.84-32-11.4-32-29s14.4-30 32-30l64-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Zm32-64l-96-2c-19-.84-32-12.4-32-30s13-28.84 32-30l96-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m472.06 334l-144.16-6.13c-4.61-.36-23.9-1.21-23.9-25.87c0-23.81 19.16-25.33 24.14-25.88L472.06 270c12.67.13 23.94 14.43 23.94 32s-11.27 31.87-23.94 32M330.61 202.33L437.35 194C450 194 464 210.68 464 227.88v.33c0 16.32-11.14 29.62-24.88 29.79l-108.45-1.73C304 253 304 236.83 304 229.88c0-22.88 21.8-27.15 26.61-27.55M421.85 480l-89.37-8.93C308 470.14 304 453.82 304 443.59c0-18.38 13.41-24.6 26.67-24.6l91-3c14.54.23 26.32 14.5 26.32 32s-11.67 31.67-26.14 32.01m34.36-71.5l-126.4-6.21c-9.39-.63-25.81-3-25.81-26.37c0-12 4.35-25.61 25-27.53l127.19-3.88c13.16.14 23.81 13.49 23.81 31.4s-10.65 32.43-23.79 32.58Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        d="M133.55 238.06A15.85 15.85 0 0 1 126 240a15.8 15.8 0 0 0 7.51-1.92Zm40.59-69.28l.13-.23zc-20.5 35.51-30.36 54.95-33.82 62c3.47-7.07 13.34-26.51 33.82-62"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m139.34 232.84l1-2a16.27 16.27 0 0 1-6.77 7.25a16.35 16.35 0 0 0 5.77-5.25"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M316.06 52.62C306.63 39.32 291 32 272 32a16 16 0 0 0-14.31 8.84c-3 6.07-15.25 24-28.19 42.91c-18 26.33-40.35 59.07-55.23 84.8l-.13.23c-20.48 35.49-30.35 54.93-33.82 62l-1 2a16.35 16.35 0 0 1-5.79 5.22a15.8 15.8 0 0 1-7.53 2h-25.31A84.69 84.69 0 0 0 16 324.69v38.61a84.69 84.69 0 0 0 84.69 84.7h48.79a17.55 17.55 0 0 1 9.58 2.89C182 465.87 225.34 480 272 480c7.45 0 14.19-.14 20.27-.38a8 8 0 0 0 6.2-12.68l-.1-.14C289.8 454.41 288 441 288 432a61.2 61.2 0 0 1 5.19-24.77a17.36 17.36 0 0 0 0-14.05a63.8 63.8 0 0 1 0-50.39a17.32 17.32 0 0 0 0-14a62.15 62.15 0 0 1 0-49.59a18.13 18.13 0 0 0 0-14.68A60.3 60.3 0 0 1 288 239c0-8.2 2-21.3 8-31.19a15.63 15.63 0 0 0 1.14-13.64c-.38-1-.76-2.07-1.13-3.17a24.84 24.84 0 0 1-.86-11.58c3-19.34 9.67-36.29 16.74-54.16c3.08-7.78 6.27-15.82 9.22-24.26c6.14-17.57 4.3-35.2-5.05-48.38"
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
        d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 0 1-64-64v-48a64 64 0 0 1 64-64h30a32.34 32.34 0 0 0 27.37-15.4S162 221.81 188 176.78S264 64 272 48c29 0 43 22 34 47.71c-10.28 29.39-23.71 54.38-27.46 87.09c-.54 4.78 3.14 12 7.95 12L416 205"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m416 271l-80-2c-20-1.84-32-12.4-32-30s14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 0 1 416 271Zm32 65l-112-2c-18-.84-32-12.41-32-30c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0 1 32 32a32.1 32.1 0 0 1-32 32Zm-48 128l-64-3c-21-1.84-32-11.4-32-29s14.4-30 32-30l64-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Zm32-64l-96-2c-19-.84-32-12.4-32-30s13-28.84 32-30l96-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Z"
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
        d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 0 1-64-64v-48a64 64 0 0 1 64-64h30a32.34 32.34 0 0 0 27.37-15.4S162 221.81 188 176.78S264 64 272 48c29 0 43 22 34 47.71c-10.28 29.39-23.71 54.38-27.46 87.09c-.54 4.78 3.14 12 7.95 12L416 205"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m416 271l-80-2c-20-1.84-32-12.4-32-30s14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 0 1 416 271Zm32 65l-112-2c-18-.84-32-12.41-32-30c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0 1 32 32a32.1 32.1 0 0 1-32 32Zm-48 128l-64-3c-21-1.84-32-11.4-32-29s14.4-30 32-30l64-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Zm32-64l-96-2c-19-.84-32-12.4-32-30s13-28.84 32-30l96-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Z"
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
        d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 0 1-64-64v-48a64 64 0 0 1 64-64h30a32.34 32.34 0 0 0 27.37-15.4S162 221.81 188 176.78S264 64 272 48c29 0 43 22 34 47.71c-10.28 29.39-23.71 54.38-27.46 87.09c-.54 4.78 3.14 12 7.95 12L416 205"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m416 271l-80-2c-20-1.84-32-12.4-32-30s14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 0 1 416 271Zm32 65l-112-2c-18-.84-32-12.41-32-30c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0 1 32 32a32.1 32.1 0 0 1-32 32Zm-48 128l-64-3c-21-1.84-32-11.4-32-29s14.4-30 32-30l64-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Zm32-64l-96-2c-19-.84-32-12.4-32-30s13-28.84 32-30l96-2a32.09 32.09 0 0 1 32 32a32.09 32.09 0 0 1-32 32Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m456 192l-156-12l23-89.4c6-26.6-.78-41.87-22.47-48.6l-34.69-9.85a4 4 0 0 0-4.4 1.72l-129 202.34a8 8 0 0 1-6.81 3.81H16V448h117.61a48 48 0 0 1 15.18 2.46l76.3 25.43a80 80 0 0 0 25.3 4.11h177.93c19 0 31.5-13.52 35.23-32.16L496 305.58V232c0-22.06-18-38-40-40"
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
