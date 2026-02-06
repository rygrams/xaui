import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const ThumbsDownIcon: React.FC<IconProps> = ({
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
        d="M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0 1 64 64v48a64 64 0 0 1-64 64h-30a32.34 32.34 0 0 0-27.37 15.4S350 290.19 324 335.22S248 448 240 464c-29 0-43-22-34-47.71c10.28-29.39 23.71-54.38 27.46-87.09c.54-4.78-3.14-12-8-12L96 307"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m96 241l80 2c20 1.84 32 12.4 32 30s-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0 1 96 241Zm-32-65l112 2c18 .84 32 12.41 32 30c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 0 1-32-32a32.1 32.1 0 0 1 32-32Zm48-128l64 3c21 1.84 32 11.4 32 29s-14.4 30-32 30l-64 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Zm-32 64l96 2c19 .84 32 12.4 32 30s-13 28.84-32 30l-96 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m39.94 178l144.16 6.12c4.61.36 23.9 1.22 23.9 25.88c0 23.8-19.16 25.33-24.14 25.88L39.94 242C27.27 241.87 16 227.56 16 210s11.27-31.87 23.94-32m141.45 131.66L74.65 318C62 318 48 301.31 48 284.12v-.33c0-16.33 11.14-29.63 24.88-29.79l108.45 1.72C208 259 208 275.16 208 282.12c0 22.88-21.8 27.14-26.61 27.54M90.15 32l89.37 8.93C204 41.86 208 58.18 208 68.4c0 18.39-13.41 24.6-26.67 24.6l-91 3C75.78 95.78 64 81.51 64 64s11.68-31.66 26.15-32m-34.36 71.5l126.4 6.22c9.39.63 25.81 3 25.81 26.36c0 12-4.35 25.62-25 27.53L55.79 167.5C42.65 167.35 32 154 32 136.08s10.65-32.43 23.79-32.58"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        d="M378.45 273.93A15.84 15.84 0 0 1 386 272a15.9 15.9 0 0 0-7.51 1.91Zm-40.59 69.29l-.13.22a3 3 0 0 1 .13-.22c20.5-35.51 30.36-55 33.82-62c-3.47 7.06-13.34 26.51-33.82 62"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m372.66 279.16l-1 2a16.3 16.3 0 0 1 6.77-7.26a16.5 16.5 0 0 0-5.77 5.26"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M195.94 459.38C205.37 472.67 221 480 240 480a16 16 0 0 0 14.31-8.85c3-6.06 15.25-24 28.19-42.9c18-26.33 40.35-59.08 55.23-84.81l.13-.22c20.48-35.49 30.35-54.94 33.82-62l1-2a16.5 16.5 0 0 1 5.79-5.23A15.9 15.9 0 0 1 386 272h25.32A84.7 84.7 0 0 0 496 187.3v-38.6A84.7 84.7 0 0 0 411.31 64h-48.79a17.46 17.46 0 0 1-9.58-2.89C330 46.13 286.66 32 240 32c-7.45 0-14.19.14-20.27.38a8 8 0 0 0-6.2 12.68l.1.14C222.2 57.59 224 71 224 80a61.2 61.2 0 0 1-5.19 24.77a17.38 17.38 0 0 0 0 14.06a63.8 63.8 0 0 1 0 50.39a17.32 17.32 0 0 0 0 14a62.13 62.13 0 0 1 0 49.58a18.13 18.13 0 0 0 0 14.68A60.4 60.4 0 0 1 224 273c0 8.2-2 21.3-8 31.18a15.66 15.66 0 0 0-1.14 13.65c.38 1 .76 2.06 1.13 3.17a24.8 24.8 0 0 1 .86 11.57c-3 19.35-9.67 36.3-16.74 54.16c-3.08 7.78-6.27 15.82-9.22 24.27c-6.14 17.56-4.3 35.2 5.05 48.38"
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
        d="M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0 1 64 64v48a64 64 0 0 1-64 64h-30a32.34 32.34 0 0 0-27.37 15.4S350 290.19 324 335.22S248 448 240 464c-29 0-43-22-34-47.71c10.28-29.39 23.71-54.38 27.46-87.09c.54-4.78-3.14-12-8-12L96 307"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m96 241l80 2c20 1.84 32 12.4 32 30s-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0 1 96 241Zm-32-65l112 2c18 .84 32 12.41 32 30c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 0 1-32-32a32.1 32.1 0 0 1 32-32Zm48-128l64 3c21 1.84 32 11.4 32 29s-14.4 30-32 30l-64 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Zm-32 64l96 2c19 .84 32 12.4 32 30s-13 28.84-32 30l-96 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Z"
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
        d="M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0 1 64 64v48a64 64 0 0 1-64 64h-30a32.34 32.34 0 0 0-27.37 15.4S350 290.19 324 335.22S248 448 240 464c-29 0-43-22-34-47.71c10.28-29.39 23.71-54.38 27.46-87.09c.54-4.78-3.14-12-8-12L96 307"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m96 241l80 2c20 1.84 32 12.4 32 30s-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0 1 96 241Zm-32-65l112 2c18 .84 32 12.41 32 30c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 0 1-32-32a32.1 32.1 0 0 1 32-32Zm48-128l64 3c21 1.84 32 11.4 32 29s-14.4 30-32 30l-64 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Zm-32 64l96 2c19 .84 32 12.4 32 30s-13 28.84-32 30l-96 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Z"
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
        d="M192 53.84S208 48 256 48s74 16 96 32h64a64 64 0 0 1 64 64v48a64 64 0 0 1-64 64h-30a32.34 32.34 0 0 0-27.37 15.4S350 290.19 324 335.22S248 448 240 464c-29 0-43-22-34-47.71c10.28-29.39 23.71-54.38 27.46-87.09c.54-4.78-3.14-12-8-12L96 307"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="m96 241l80 2c20 1.84 32 12.4 32 30s-14 28.84-32 30l-80 4c-17.6 0-32-16.4-32-34v-.17A32 32 0 0 1 96 241Zm-32-65l112 2c18 .84 32 12.41 32 30c0 17.61-14 28.86-32 30l-112 2a32.1 32.1 0 0 1-32-32a32.1 32.1 0 0 1 32-32Zm48-128l64 3c21 1.84 32 11.4 32 29s-14.4 30-32 30l-64 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Zm-32 64l96 2c19 .84 32 12.4 32 30s-13 28.84-32 30l-96 2a32.09 32.09 0 0 1-32-32a32.09 32.09 0 0 1 32-32Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m56 320l156.05 12l-23 89.4c-6.08 26.6.7 41.87 22.39 48.62l34.69 9.85a4 4 0 0 0 4.4-1.72l129-202.34a8 8 0 0 1 6.81-3.81H496V64H378.39a48 48 0 0 1-15.18-2.46l-76.3-25.43a80 80 0 0 0-25.3-4.11H83.68c-19 0-31.5 13.52-35.23 32.16L16 206.42V280c0 22.06 18 38 40 40"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        d="M378.45 273.93A15.84 15.84 0 0 1 386 272a15.9 15.9 0 0 0-7.51 1.91Zm-40.59 69.29l-.13.22a3 3 0 0 1 .13-.22c20.5-35.51 30.36-55 33.82-62c-3.47 7.06-13.34 26.51-33.82 62"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="m372.66 279.16l-1 2a16.3 16.3 0 0 1 6.77-7.26a16.5 16.5 0 0 0-5.77 5.26"
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
