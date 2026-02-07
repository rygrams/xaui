import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const BinocularsIcon: React.FC<IconProps> = ({
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
      <AnimatedCircle cx={392} cy={344} r={88} {...animatedProps} />
      <AnimatedCircle cx={120} cy={344} r={88} {...animatedProps} />
      <AnimatedPath
        d="M208 344V128c0-26.5-16-48-44-48c-35 0-46.5 21.5-57 48c0 0-48.5 127.833-71 189.5M208 184s16.5-8 48-8s48 8 48 8m-96 88s16.5-8 48-8s48 8 48 8m0 72V128c0-26.5 16-48 44-48c35 0 46.5 21.5 57 48c0 0 48.5 127.833 71 189.5"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M114.917 82.831C126.817 70.758 142.711 64 164 64c18.436 0 33.934 7.239 44.611 19.607C219.057 95.707 224 111.638 224 128v34.809c8.45-1.583 19.147-2.809 32-2.809s23.55 1.226 32 2.809V128c0-16.362 4.943-32.293 15.389-44.393C314.066 71.239 329.564 64 348 64c21.289 0 37.183 6.758 49.083 18.831c11.072 11.233 17.546 26.036 22.792 39.275l.636 1.672l68.207 181.915s2.59 7.307 2.915 8.392A104 104 0 0 1 496 344c0 57.438-46.562 104-104 104s-104-46.562-104-104v-60.461l-.04-.01C281.089 281.825 270.382 280 256 280s-25.089 1.825-31.96 3.529l-.04.01V344c0 57.438-46.562 104-104 104S16 401.438 16 344c0-10.399 1.526-20.441 4.367-29.916q.227-1.04.602-2.068a155 155 0 0 1 2.314-6.324l68.842-183.586c5.246-13.239 11.721-28.042 22.792-39.275M320 343.905c.051-39.721 32.267-71.905 72-71.905c30.372 0 56.352 18.806 66.93 45.408l1.358 3.71A71.9 71.9 0 0 1 464 344c0 39.764-32.236 72-72 72c-39.751 0-71.978-32.214-72-71.96V344m-200-72c-30.371 0-56.35 18.805-66.93 45.406l-1.358 3.714A71.9 71.9 0 0 0 48 344c0 39.764 32.236 72 72 72s72-32.236 72-72s-32.236-72-72-72"
        clipRule="evenodd"
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
      <AnimatedCircle cx={392} cy={344} r={88} {...animatedProps} />
      <AnimatedCircle cx={120} cy={344} r={88} {...animatedProps} />
      <AnimatedPath
        d="M208 344V128c0-26.5-16-48-44-48c-35 0-46.5 21.5-57 48c0 0-48.5 127.833-71 189.5M208 184s16.5-8 48-8s48 8 48 8m-96 88s16.5-8 48-8s48 8 48 8m0 72V128c0-26.5 16-48 44-48c35 0 46.5 21.5 57 48c0 0 48.5 127.833 71 189.5"
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
      <AnimatedCircle cx={392} cy={344} r={88} {...animatedProps} />
      <AnimatedCircle cx={120} cy={344} r={88} {...animatedProps} />
      <AnimatedPath
        d="M208 344V128c0-26.5-16-48-44-48c-35 0-46.5 21.5-57 48c0 0-48.5 127.833-71 189.5M208 184s16.5-8 48-8s48 8 48 8m-96 88s16.5-8 48-8s48 8 48 8m0 72V128c0-26.5 16-48 44-48c35 0 46.5 21.5 57 48c0 0 48.5 127.833 71 189.5"
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
      <AnimatedCircle cx={392} cy={344} r={88} {...animatedProps} />
      <AnimatedCircle cx={120} cy={344} r={88} {...animatedProps} />
      <AnimatedPath
        d="M208 344V128c0-26.5-16-48-44-48c-35 0-46.5 21.5-57 48c0 0-48.5 127.833-71 189.5M208 184s16.5-8 48-8s48 8 48 8m-96 88s16.5-8 48-8s48 8 48 8m0 72V128c0-26.5 16-48 44-48c35 0 46.5 21.5 57 48c0 0 48.5 127.833 71 189.5"
        {...animatedProps}
      />
    </>
  )

  const renderRoundFilled = () => renderFilled()

  const renderSquareFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M164 64c-21.289 0-37.183 6.758-49.083 18.831c-11.071 11.233-17.546 26.036-22.792 39.275L23.283 305.692a155 155 0 0 0-2.314 6.324q-.374 1.029-.602 2.068A104 104 0 0 0 16 344c0 57.438 46.562 104 104 104s104-46.562 104-104v-60.461l.04-.01l63.96.01V344c0 57.438 46.562 104 104 104s104-46.562 104-104c0-10.399-1.526-20.441-4.367-29.915c-.325-1.085-2.915-8.392-2.915-8.392l-68.207-181.915l-.636-1.672c-5.246-13.239-11.72-28.042-22.792-39.275C385.183 70.758 369.289 64 348 64c-18.436 0-33.934 7.239-44.611 19.607C292.943 95.707 288 111.638 288 128v34.809h-64V128c0-16.362-4.943-32.293-15.389-44.393C197.934 71.239 182.436 64 164 64M56 344c0-35.346 28.654-64 64-64s64 28.654 64 64s-28.654 64-64 64s-64-28.654-64-64m272 0c0-35.346 28.654-64 64-64s64 28.654 64 64s-28.654 64-64 64s-64-28.654-64-64"
        clipRule="evenodd"
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
