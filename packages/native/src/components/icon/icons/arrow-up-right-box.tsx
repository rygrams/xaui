import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ArrowUpRightBoxIcon: React.FC<IconProps> = ({
  variant: _variant = 'baseline',
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

  const renderIcon = () => (
    <AnimatedPath
      fill={resolvedColor}
      fillRule="evenodd"
      d="M331.636 32H464a16 16 0 0 1 16 16v132.364c0 8.836-7.163 16-16 16s-16-7.164-16-16V86.627l-51.128 51.128a58.5 58.5 0 0 0-22.591-22.663L425.373 64h-93.737c-8.836 0-16-7.163-16-16s7.164-16 16-16m42.645 83.092a58.54 58.54 0 0 0-28.59-7.456H90.545A58.545 58.545 0 0 0 32 166.182v255.273A58.543 58.543 0 0 0 90.545 480h255.273a58.545 58.545 0 0 0 58.546-58.545V166.182q-.001-1.213-.176-2.378a58.54 58.54 0 0 0-7.316-26.049L227.314 307.314c-6.249 6.248-16.379 6.248-22.628 0s-6.248-16.379 0-22.628z"
      clipRule="evenodd"
      {...animatedProps}
    />
  )

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderIcon()}
    </Svg>
  )
}
