import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const BarcodeIcon: React.FC<IconProps> = ({
  variant = 'baseline',
  size = 24,
  color = 'default',
  isAnimated = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacityAnim = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  const resolvedColor = useMemo(() => {
    if (typeof color === 'string' && isThemeColor(color)) {
      return color
    }
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

  const renderFilled = () => (
    <AnimatedPath
      fill={resolvedColor}
      d="M419.13 96H419l-35.05.33L128 96h-.16l-36.74.33C66.93 96.38 48 116.07 48 141.2v230.27c0 25.15 19 44.86 43.2 44.86h.15l36.71-.33l255.92.33h.17l35.07-.33A44.91 44.91 0 0 0 464 371.13V140.87A44.92 44.92 0 0 0 419.13 96M144 320a16 16 0 0 1-32 0V192a16 16 0 0 1 32 0Zm64 32a16 16 0 0 1-32 0V160a16 16 0 0 1 32 0Zm64-16a16 16 0 0 1-32 0V176a16 16 0 0 1 32 0Zm64 16a16 16 0 0 1-32 0V160a16 16 0 0 1 32 0Zm64-32a16 16 0 0 1-32 0V192a16 16 0 0 1 32 0Z"
      {...animatedProps}
    />
  )

  const renderOutlined = () => (
    <AnimatedPath
      fill="none"
      stroke={resolvedColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="m384 400.33l35.13-.33A29 29 0 0 0 448 371.13V140.87A29 29 0 0 0 419.13 112l-35.13.33M128 112l-36.8.33c-15.88 0-27.2 13-27.2 28.87v230.27c0 15.87 11.32 28.86 27.2 28.86L128 400m256-208v128m-64-160v192m-64-176v160m-64-176v192m-64-160v128"
      {...animatedProps}
    />
  )

  const renderVariant = () => {
    switch (variant) {
      case 'round-outlined':
        return renderOutlined()
      case 'filled':
      case 'duotone':
      case 'square-outlined':
      case 'round-filled':
      case 'square-filled':
      case 'baseline':
      default:
        return renderFilled()
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {renderVariant()}
    </Svg>
  )
}
