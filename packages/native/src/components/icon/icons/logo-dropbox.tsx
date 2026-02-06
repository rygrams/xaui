import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const LogoDropboxIcon: React.FC<IconProps> = ({
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
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
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
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
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
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
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
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="m256.32 126.24l-120.16 78.25l120.16 78.24L136.16 361L16 282.08l120.16-78.24L16 126.24L136.16 48Zm-120.8 259.52l120.16-78.25l120.16 78.25L255.68 464Zm120.8-103.68l120.16-78.24l-120.16-77.6L375.84 48L496 126.24l-120.16 78.25L496 282.73L375.84 361Z"
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
