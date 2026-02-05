import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)
=======
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx

export const CalendarIcon: React.FC<IconProps> = ({
  variant = 'baseline',
  size = 24,
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
  color = 'black',
  isAnimated = false,
}) => {
=======
  color = 'default',
  isAnimated = false,
}) => {
  const theme = useXUITheme()
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
    return color
  }, [color])
=======
    if (typeof color === 'string' && isThemeColor(color)) {
      return theme.colors[color].main
    }
    return color
  }, [color, theme])
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx

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
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
    <>
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M480 128a64 64 0 0 0-64-64h-16V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 368 48v16H144V48.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 112 48v16H96a64 64 0 0 0-64 64v12a4 4 0 0 0 4 4h440a4 4 0 0 0 4-4ZM32 416a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V179a3 3 0 0 0-3-3H35a3 3 0 0 0-3 3Zm344-208a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m-80-80a24 24 0 1 1-24 24a24 24 0 0 1 24-24m0 80a24 24 0 1 1-24 24a24 24 0 0 1 24-24"
        {...animatedProps}
      />
    </>
=======
    <AnimatedPath
      fill="none"
      stroke={resolvedColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M48 112a48 48 0 0148-48h320a48 48 0 0148 48v320a48 48 0 01-48 48H96a48 48 0 01-48-48zm0 80h416M176 64v48M336 64v48"
      {...animatedProps}
    />
  )

  const renderFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M416 64h-56V40a24 24 0 00-48 0v24H200V40a24 24 0 00-48 0v24H96a48 48 0 00-48 48v320a48 48 0 0048 48h320a48 48 0 0048-48V112a48 48 0 00-48-48zm0 368H96V208h320z"
      {...animatedProps}
    />
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
  )

  const renderDuotone = () => (
    <>
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
      <AnimatedCircle
        cx={256}
        cy={256}
        r={192}
        fill={resolvedColor}
        opacity={0.3}
        {...animatedProps}
      />
      <AnimatedRect
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
        {...animatedProps}
      />
=======
      <Path
        fill={resolvedColor}
        opacity={0.3}
        d="M48 192h416v240a48 48 0 01-48 48H96a48 48 0 01-48-48z"
      />
      {renderBaseline()}
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
    </>
  )

  const renderRoundOutlined = () => (
    <>
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
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
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
=======
      <Circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
=======
        strokeWidth={28}
        d="M152 176a24 24 0 0124-24h160a24 24 0 0124 24v176a24 24 0 01-24 24H176a24 24 0 01-24-24zm0 48h208M208 152v32M304 152v32"
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
        {...animatedProps}
      />
    </>
  )

  const renderSquareOutlined = () => (
    <>
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
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
        width={416}
        height={384}
        x={48}
        y={80}
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        rx={48}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={232}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={376}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={312}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={136}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={216}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
      />
      <AnimatedCircle
        cx={296}
        cy={392}
        r={24}
        fill={resolvedColor}
        {...animatedProps}
=======
      <Rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
        strokeWidth={32}
        d="M128 48v32m256-32v32"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64"
=======
        strokeWidth={28}
        d="M152 176a24 24 0 0124-24h160a24 24 0 0124 24v176a24 24 0 01-24 24H176a24 24 0 01-24-24zm0 48h208M208 152v32M304 152v32"
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
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
<<<<<<< HEAD:packages/icons/src/icons/calendar.tsx
        return renderRoundFilled()
      case 'square-filled':
        return renderSquareFilled()
=======
      case 'square-filled':
        return renderFilled()
>>>>>>> 5116ef7 (feat: implement react native date picker components):packages/native/src/components/icon/icons/calendar.tsx
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
