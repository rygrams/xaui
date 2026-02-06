import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const HelpCircleIcon: React.FC<IconProps> = ({
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={28}
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45c10 4.76 29.47 16.38 29.47 41.09c0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={250}
        cy={348}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64m-6 304a20 20 0 1 1 20-20a20 20 0 0 1-20 20m33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 0 1-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46c-3.41-1.62-11-3.2-20.34-3.09c-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 1 1-28-1.35c.11-2.43 1.8-24.32 24.77-42.8c11.91-9.58 27.06-14.56 45-14.78c12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43"
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={28}
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45c10 4.76 29.47 16.38 29.47 41.09c0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={250}
        cy={348}
        r={20}
        fill={resolvedColor}
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={28}
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45c10 4.76 29.47 16.38 29.47 41.09c0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={250}
        cy={348}
        r={20}
        fill={resolvedColor}
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
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={28}
        d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45c10 4.76 29.47 16.38 29.47 41.09c0 26-17 37.81-36.37 50.8S251 281.43 251 296"
        {...animatedProps}
      />
      <AnimatedCircle
        cx={250}
        cy={348}
        r={20}
        fill={resolvedColor}
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill="none"
        d="M288.55 150.84c-8.09-3.86-20-6-32.72-5.82c-18 .22-33.13 5.2-45 14.78c-23 18.48-24.55 40.37-24.77 42.8a61.7 61.7 0 0 0-.09 12a3 3 0 0 0 3 2.69h21.23a3 3 0 0 0 3-3A66 66 0 0 1 214 204c0-.11 1.14-11.7 14.36-22.34c7-5.64 16.11-8.44 27.83-8.59c9.32-.11 16.93 1.47 20.34 3.09C291 183 298 192.31 298 204.57c0 18-10.9 26.23-30.18 39.18C247.08 257.68 237 275.1 237 297v11a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-11c0-9.16 2.23-19.13 18.44-30c19.95-13.41 42.56-28.6 42.56-62.43c0-23.14-13.3-42.23-37.45-53.73"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64m10.44 302h-30.21a2.57 2.57 0 0 1-2.56-2.57v-30.2a2.57 2.57 0 0 1 2.56-2.57h30.21a2.57 2.57 0 0 1 2.56 2.57v30.2a2.57 2.57 0 0 1-2.56 2.57m17-99C267.23 277.88 265 287.85 265 297v11a3 3 0 0 1-3 3h-22a3 3 0 0 1-3-3v-11c0-21.91 10.08-39.33 30.82-53.26C287.1 230.8 298 222.6 298 204.57c0-12.26-7-21.57-21.49-28.46c-3.41-1.62-11-3.2-20.34-3.09c-11.72.15-20.82 2.95-27.83 8.59C215.12 192.25 214 203.84 214 204a66 66 0 0 0-.84 10.28a3 3 0 0 1-3 3h-21.25a3 3 0 0 1-3-2.69a61.7 61.7 0 0 1 .09-12c.22-2.43 1.8-24.32 24.77-42.8c11.91-9.58 27.06-14.56 45-14.78c12.7-.15 24.63 2 32.72 5.82c24.21 11.51 37.51 30.6 37.51 53.74c0 33.83-22.61 49.02-42.56 62.43"
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
