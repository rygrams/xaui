import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const MegaphoneIcon: React.FC<IconProps> = ({
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

  const renderBaseline = () => (
    <>
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M407.94 52.22S321.3 160 240 160H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160c81.3 0 167.94 108.23 167.94 108.23c6.06 8 24.06 2.52 24.06-9.83V62c0-12.31-17-18.82-24.06-9.78M64 256s-16-6-16-32s16-32 16-32m384 54s16-4.33 16-22s-16-22-16-22m-192-42v128M112 160v128"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M144 288v168a8 8 0 0 0 8 8h53a16 16 0 0 0 15.29-20.73C211.91 416.39 192 386.08 192 336h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M48 176v.66a17.38 17.38 0 0 1-4.2 11.23v.05C38.4 194.32 32 205.74 32 224c0 16.55 5.3 28.23 11.68 35.91A19 19 0 0 1 48 272a32 32 0 0 0 32 32h8a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-8a32 32 0 0 0-32 32m404.18 10.55l-.93-.17a4 4 0 0 1-3.25-3.93V62c0-12.64-8.39-24-20.89-28.32c-11.92-4.11-24.34-.76-31.68 8.53a431 431 0 0 1-51.31 51.69c-23.63 20-46.24 34.25-67 42.31a8 8 0 0 0-5.15 7.47V299a16 16 0 0 0 9.69 14.69c19.34 8.29 40.24 21.83 62 40.28a434 434 0 0 1 51.68 52.16a26.22 26.22 0 0 0 21.1 9.87a33 33 0 0 0 10.44-1.74C439.71 410 448 399.05 448 386.4V265.53a4 4 0 0 1 3.33-3.94l.85-.14C461.8 258.84 480 247.67 480 224s-18.2-34.84-27.82-37.45M240 320V152a8 8 0 0 0-8-8h-96a8 8 0 0 0-8 8v304a24 24 0 0 0 24 24h52.45a32.66 32.66 0 0 0 25.93-12.45a31.65 31.65 0 0 0 5.21-29.05c-1.62-5.18-3.63-11-5.77-17.19c-7.91-22.9-18.34-37.07-21.12-69.32A32 32 0 0 0 240 320"
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
        d="M407.94 52.22S321.3 160 240 160H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160c81.3 0 167.94 108.23 167.94 108.23c6.06 8 24.06 2.52 24.06-9.83V62c0-12.31-17-18.82-24.06-9.78M64 256s-16-6-16-32s16-32 16-32m384 54s16-4.33 16-22s-16-22-16-22m-192-42v128M112 160v128"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M144 288v168a8 8 0 0 0 8 8h53a16 16 0 0 0 15.29-20.73C211.91 416.39 192 386.08 192 336h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16"
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
        d="M407.94 52.22S321.3 160 240 160H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160c81.3 0 167.94 108.23 167.94 108.23c6.06 8 24.06 2.52 24.06-9.83V62c0-12.31-17-18.82-24.06-9.78M64 256s-16-6-16-32s16-32 16-32m384 54s16-4.33 16-22s-16-22-16-22m-192-42v128M112 160v128"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M144 288v168a8 8 0 0 0 8 8h53a16 16 0 0 0 15.29-20.73C211.91 416.39 192 386.08 192 336h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16"
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
        d="M407.94 52.22S321.3 160 240 160H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h160c81.3 0 167.94 108.23 167.94 108.23c6.06 8 24.06 2.52 24.06-9.83V62c0-12.31-17-18.82-24.06-9.78M64 256s-16-6-16-32s16-32 16-32m384 54s16-4.33 16-22s-16-22-16-22m-192-42v128M112 160v128"
        {...animatedProps}
      />
      <AnimatedPath
        fill="none"
        stroke={resolvedColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M144 288v168a8 8 0 0 0 8 8h53a16 16 0 0 0 15.29-20.73C211.91 416.39 192 386.08 192 336h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        d="M128 144v332a4 4 0 0 0 4 4h100.07a8 8 0 0 0 7.82-9.7L208.71 352H232a8 8 0 0 0 8-8V144Zm324.18 42.55L448 185.5V36a4 4 0 0 0-4-4h-42.5a4 4 0 0 0-2.63 1L272 144v160l126.87 111a4 4 0 0 0 2.63 1H444a4 4 0 0 0 4-4V262.5l4.18-1.05C461.8 258.84 480 247.67 480 224s-18.2-34.84-27.82-37.45M96 144H52a4 4 0 0 0-4 4v35.59a43 43 0 0 0-4.24 4.35C38.4 194.32 32 205.74 32 224c0 20.19 7.89 33.13 16 40.42V300a4 4 0 0 0 4 4h44Z"
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
