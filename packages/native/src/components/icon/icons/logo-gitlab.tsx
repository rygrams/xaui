import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoGitlabIcon: React.FC<IconProps> = ({
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
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
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
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
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
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
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
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m488.028 207.68l-.674-1.731l-65.335-171.154a17.07 17.07 0 0 0-6.723-8.129a17.445 17.445 0 0 0-19.995 1.08a17.57 17.57 0 0 0-5.799 8.83l-44.114 135.478H166.756L122.641 36.576a17.2 17.2 0 0 0-5.798-8.856a17.44 17.44 0 0 0-19.996-1.079a17.22 17.22 0 0 0-6.723 8.129l-65.46 171.078l-.649 1.731a122.2 122.2 0 0 0-3.308 77.122c7.259 25.388 22.543 47.718 43.548 63.625l.225.175l.6.427l99.526 74.814l49.238 37.407l29.993 22.73A20.1 20.1 0 0 0 256.034 488c4.405 0 8.689-1.447 12.197-4.121l29.993-22.73l49.238-37.407l100.126-75.266l.25-.2c20.958-15.91 36.207-38.217 43.454-63.57a122.26 122.26 0 0 0-3.264-77.026"
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
