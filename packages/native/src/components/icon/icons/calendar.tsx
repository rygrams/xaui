import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const CalendarIcon: React.FC<IconProps> = ({
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
  )

  const renderDuotone = () => (
    <>
      <Path
        fill={resolvedColor}
        opacity={0.3}
        d="M48 192h416v240a48 48 0 01-48 48H96a48 48 0 01-48-48z"
      />
      {renderBaseline()}
    </>
  )

  const renderRoundOutlined = () => (
    <>
      <Circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={28}
        d="M152 176a24 24 0 0124-24h160a24 24 0 0124 24v176a24 24 0 01-24 24H176a24 24 0 01-24-24zm0 48h208M208 152v32M304 152v32"
        {...animatedProps}
      />
    </>
  )

  const renderSquareOutlined = () => (
    <>
      <Rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        fill="none"
        stroke={resolvedColor}
        strokeWidth={32}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={28}
        d="M152 176a24 24 0 0124-24h160a24 24 0 0124 24v176a24 24 0 01-24 24H176a24 24 0 01-24-24zm0 48h208M208 152v32M304 152v32"
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
      case 'square-filled':
        return renderFilled()
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
