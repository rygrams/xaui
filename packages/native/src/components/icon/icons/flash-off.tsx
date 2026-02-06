import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const FlashOffIcon: React.FC<IconProps> = ({
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
        d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448M294.34 84.28l-22.08 120.84a16 16 0 0 0 6.17 15.71a16.5 16.5 0 0 0 9.93 3.17h94.12l-38.37 47.42a4 4 0 0 0 .28 5.34l17.07 17.07a4 4 0 0 0 5.94-.31l60.8-75.16a16.37 16.37 0 0 0 3.3-14.36a16 16 0 0 0-15.5-12H307.19L335.4 37.63c.05-.3.1-.59.13-.89A18.45 18.45 0 0 0 302.73 23l-92.58 114.46a4 4 0 0 0 .28 5.35l17.07 17.06a4 4 0 0 0 5.94-.31Zm-76.56 343.29l22-120.71a16 16 0 0 0-6.19-15.7a16.54 16.54 0 0 0-9.92-3.16h-94.1l38.36-47.42a4 4 0 0 0-.28-5.34l-17.07-17.07a4 4 0 0 0-5.93.31L83.8 293.64A16.37 16.37 0 0 0 80.5 308A16 16 0 0 0 96 320h108.83l-28.09 154.36v.11a18.37 18.37 0 0 0 32.5 14.53l92.61-114.46a4 4 0 0 0-.28-5.35l-17.07-17.06a4 4 0 0 0-5.94.31Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448m-.5-244a16 16 0 0 0-15.5-12H307.19L335.4 37.63c.05-.3.1-.59.13-.89A18.45 18.45 0 0 0 302.73 23l-92.58 114.46a4 4 0 0 0 .29 5.35l151 151a4 4 0 0 0 5.94-.31l60.8-75.16A16.37 16.37 0 0 0 431.5 204M301.57 369.19l-151-151a4 4 0 0 0-5.93.31L83.8 293.64A16.37 16.37 0 0 0 80.5 308A16 16 0 0 0 96 320h108.83l-28.09 154.36v.11a18.37 18.37 0 0 0 32.5 14.53l92.61-114.46a4 4 0 0 0-.28-5.35"
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
        d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448M294.34 84.28l-22.08 120.84a16 16 0 0 0 6.17 15.71a16.5 16.5 0 0 0 9.93 3.17h94.12l-38.37 47.42a4 4 0 0 0 .28 5.34l17.07 17.07a4 4 0 0 0 5.94-.31l60.8-75.16a16.37 16.37 0 0 0 3.3-14.36a16 16 0 0 0-15.5-12H307.19L335.4 37.63c.05-.3.1-.59.13-.89A18.45 18.45 0 0 0 302.73 23l-92.58 114.46a4 4 0 0 0 .28 5.35l17.07 17.06a4 4 0 0 0 5.94-.31Zm-76.56 343.29l22-120.71a16 16 0 0 0-6.19-15.7a16.54 16.54 0 0 0-9.92-3.16h-94.1l38.36-47.42a4 4 0 0 0-.28-5.34l-17.07-17.07a4 4 0 0 0-5.93.31L83.8 293.64A16.37 16.37 0 0 0 80.5 308A16 16 0 0 0 96 320h108.83l-28.09 154.36v.11a18.37 18.37 0 0 0 32.5 14.53l92.61-114.46a4 4 0 0 0-.28-5.35l-17.07-17.06a4 4 0 0 0-5.94.31Z"
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
        d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448M294.34 84.28l-22.08 120.84a16 16 0 0 0 6.17 15.71a16.5 16.5 0 0 0 9.93 3.17h94.12l-38.37 47.42a4 4 0 0 0 .28 5.34l17.07 17.07a4 4 0 0 0 5.94-.31l60.8-75.16a16.37 16.37 0 0 0 3.3-14.36a16 16 0 0 0-15.5-12H307.19L335.4 37.63c.05-.3.1-.59.13-.89A18.45 18.45 0 0 0 302.73 23l-92.58 114.46a4 4 0 0 0 .28 5.35l17.07 17.06a4 4 0 0 0 5.94-.31Zm-76.56 343.29l22-120.71a16 16 0 0 0-6.19-15.7a16.54 16.54 0 0 0-9.92-3.16h-94.1l38.36-47.42a4 4 0 0 0-.28-5.34l-17.07-17.07a4 4 0 0 0-5.93.31L83.8 293.64A16.37 16.37 0 0 0 80.5 308A16 16 0 0 0 96 320h108.83l-28.09 154.36v.11a18.37 18.37 0 0 0 32.5 14.53l92.61-114.46a4 4 0 0 0-.28-5.35l-17.07-17.06a4 4 0 0 0-5.94.31Z"
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
        d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448M294.34 84.28l-22.08 120.84a16 16 0 0 0 6.17 15.71a16.5 16.5 0 0 0 9.93 3.17h94.12l-38.37 47.42a4 4 0 0 0 .28 5.34l17.07 17.07a4 4 0 0 0 5.94-.31l60.8-75.16a16.37 16.37 0 0 0 3.3-14.36a16 16 0 0 0-15.5-12H307.19L335.4 37.63c.05-.3.1-.59.13-.89A18.45 18.45 0 0 0 302.73 23l-92.58 114.46a4 4 0 0 0 .28 5.35l17.07 17.06a4 4 0 0 0 5.94-.31Zm-76.56 343.29l22-120.71a16 16 0 0 0-6.19-15.7a16.54 16.54 0 0 0-9.92-3.16h-94.1l38.36-47.42a4 4 0 0 0-.28-5.34l-17.07-17.07a4 4 0 0 0-5.93.31L83.8 293.64A16.37 16.37 0 0 0 80.5 308A16 16 0 0 0 96 320h108.83l-28.09 154.36v.11a18.37 18.37 0 0 0 32.5 14.53l92.61-114.46a4 4 0 0 0-.28-5.35l-17.07-17.06a4 4 0 0 0-5.94.31Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m63.998 86.005l21.998-21.998L447.999 426.01l-21.998 21.998zM80 304h144l-32 192l108.18-129.82l-148.36-148.36zm352-96H288l32-192l-108.18 129.82l148.36 148.36z"
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
