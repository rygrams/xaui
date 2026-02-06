import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { Svg, Path, Circle, Rect } from 'react-native-svg'
import type { IconProps } from '../icon.type'
import { isThemeColor } from '../icon.utils'
import { useXUITheme } from '../../../core'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedRect = Animated.createAnimatedComponent(Rect)

export const WifiIcon: React.FC<IconProps> = ({
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
        d="M318.586 363.5L256 424l-62.586-60.5S212 336 256 336s62.586 27.5 62.586 27.5M407.31 278L372 312s-41-46-116-46s-116 46-116 46l-35.31-34S142.5 214 256 214s151.31 64 151.31 64"
        {...animatedProps}
      />
      <AnimatedPath
        d="m496 192l-36.69 35.5S386.5 141 256 141S52.69 227.5 52.69 227.5L16 192S88 88 256 88s240 104 240 104"
        {...animatedProps}
      />
    </>
  )

  const renderFilled = () => (
    <>
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M331.295 353.764c.131.181-.091-.13 0 0a46 46 0 0 0-1.039-1.365a64 64 0 0 0-3.618-4.17c-3.112-3.302-7.69-7.537-13.87-11.725C300.287 328.047 281.56 320 256 320s-44.287 8.047-56.768 16.504c-6.18 4.188-10.758 8.423-13.87 11.725a64 64 0 0 0-3.618 4.17c.264-.361-.43.544 0 0l-1.586 2.142a16 16 0 0 0 2.135 20.463l62.586 60.5c6.202 5.995 16.039 5.995 22.241 0l62.587-60.5a16 16 0 0 0 2.136-20.463z"
        clipRule="evenodd"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M421.086 269.862c-.135-.218-.596-.966-.812-1.3a72 72 0 0 0-1.81-2.639c-1.552-2.163-3.813-5.096-6.861-8.536c-6.099-6.88-15.362-15.802-28.417-24.637C356.915 214.969 315.967 198 256 198s-100.915 16.969-127.186 34.75c-13.055 8.835-22.318 17.757-28.417 24.637c-3.049 3.44-5.31 6.373-6.861 8.536a71 71 0 0 0-1.81 2.639q-.324.502-.527.829l-.285.471a16 16 0 0 0 2.678 19.664l35.31 34a16 16 0 0 0 23.007-.84l.195-.209c.207-.219.565-.591 1.074-1.096a93 93 0 0 1 4.831-4.436c4.402-3.785 11.093-8.947 19.955-14.141C195.658 292.436 221.893 282 256 282s60.342 10.436 78.036 20.804c8.862 5.194 15.553 10.356 19.955 14.141a93 93 0 0 1 4.831 4.436a49 49 0 0 1 1.269 1.305l-.005-.006l-.013-.015m0 0l.026.029a16 16 0 0 0 22.999.832l35.31-34a16 16 0 0 0 2.678-19.664"
        clipRule="evenodd"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        d="M507.974 181.264c.343.459 1.181 1.629 1.181 1.629a16 16 0 0 1-2.029 20.606l-36.69 35.5a16 16 0 0 1-23.345-1.17l-.003-.003l-.085-.099q-.138-.16-.482-.548a108 108 0 0 0-2.197-2.379c-2.009-2.116-5.095-5.229-9.229-9.01c-8.275-7.569-20.69-17.764-36.997-27.981C365.499 177.384 317.58 157 256 157s-109.499 20.384-142.098 40.809c-16.307 10.217-28.722 20.412-36.997 27.981c-4.133 3.781-7.22 6.894-9.229 9.01a109 109 0 0 0-2.197 2.379q-.345.388-.482.548l-.047.054l-.03.034l-.004.006l-.004.005l-.004.004a16 16 0 0 1-23.344 1.169l-36.69-35.5a16 16 0 0 1-2.03-20.606l.011-.016l.013-.017l.03-.043l.079-.113l.24-.337q.295-.413.809-1.103c.686-.92 1.667-2.199 2.949-3.786c2.563-3.174 6.335-7.585 11.367-12.818c10.057-10.46 25.185-24.241 45.783-37.973C105.437 99.146 168.48 72 256 72s150.563 27.146 191.875 54.687c20.598 13.732 35.726 27.513 45.783 37.973c5.032 5.233 8.804 9.644 11.367 12.818a125 125 0 0 1 2.949 3.786"
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
        d="M318.586 363.5L256 424l-62.586-60.5S212 336 256 336s62.586 27.5 62.586 27.5M407.31 278L372 312s-41-46-116-46s-116 46-116 46l-35.31-34S142.5 214 256 214s151.31 64 151.31 64"
        {...animatedProps}
      />
      <AnimatedPath
        d="m496 192l-36.69 35.5S386.5 141 256 141S52.69 227.5 52.69 227.5L16 192S88 88 256 88s240 104 240 104"
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
        d="M318.586 363.5L256 424l-62.586-60.5S212 336 256 336s62.586 27.5 62.586 27.5M407.31 278L372 312s-41-46-116-46s-116 46-116 46l-35.31-34S142.5 214 256 214s151.31 64 151.31 64"
        {...animatedProps}
      />
      <AnimatedPath
        d="m496 192l-36.69 35.5S386.5 141 256 141S52.69 227.5 52.69 227.5L16 192S88 88 256 88s240 104 240 104"
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
        d="M318.586 363.5L256 424l-62.586-60.5S212 336 256 336s62.586 27.5 62.586 27.5M407.31 278L372 312s-41-46-116-46s-116 46-116 46l-35.31-34S142.5 214 256 214s151.31 64 151.31 64"
        {...animatedProps}
      />
      <AnimatedPath
        d="m496 192l-36.69 35.5S386.5 141 256 141S52.69 227.5 52.69 227.5L16 192S88 88 256 88s240 104 240 104"
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
        d="M337.78 362.819c-4.246-8.453-11.074-15.687-12.601-17.31c-3.05-3.241-7.535-7.397-13.589-11.505c-12.228-8.299-30.57-16.191-55.59-16.191s-43.362 7.892-55.59 16.191c-6.054 4.108-10.539 8.264-13.589 11.505a63 63 0 0 0-3.548 4.097c-.422.535-4.307 4.76-9.053 13.213L256 442z"
        clipRule="evenodd"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M425.25 279.287s-7.995-10.229-15.703-18.928c-5.983-6.753-18.1-17.71-30.901-26.377c-25.762-17.444-63.897-35.077-122.646-35.077s-96.884 17.633-122.646 35.077c-12.801 8.667-20.835 15.473-28.869 24.172S86.75 279.287 86.75 279.287l56.634 54.591l11.037-12.388l.187-.201c.2-.211.549-.573 1.044-1.065a91 91 0 0 1 4.709-4.326c4.294-3.693 10.823-8.733 19.473-13.804C197.103 291.97 222.709 281.78 256 281.78s58.897 10.19 76.166 20.314c8.65 5.071 15.179 10.111 19.473 13.804a91 91 0 0 1 4.709 4.326c.495.492.844.854 1.044 1.065l.187.201l.009.01l11.028 12.378z"
        clipRule="evenodd"
        {...animatedProps}
      />
      <AnimatedPath
        fill={resolvedColor}
        fillRule="evenodd"
        d="M512 195.36s-4.5-8.36-11.85-16.485c-4.391-4.855-6.219-7.406-11.155-12.511c-9.868-10.207-24.703-23.648-44.901-37.04C403.583 102.463 341.778 76 256 76s-147.583 26.463-188.094 53.324c-20.198 13.392-35.033 26.833-44.9 37.04c-4.937 5.105-8.639 9.411-11.156 12.511c-1.259 1.55-1.784 2.241-2.898 3.7C5.254 187.42 0 195.36 0 195.36l58.06 55.873l11.004-13.001l.002-.004l.002-.002l.08-.092q.133-.154.469-.529a100 100 0 0 1 2.144-2.309c1.962-2.056 4.979-5.083 9.02-8.76c8.092-7.361 20.236-17.28 36.189-27.221c31.891-19.872 78.774-39.709 139.03-39.709s107.139 19.837 139.03 39.709c15.953 9.941 28.097 19.86 36.189 27.221c4.041 3.677 7.058 6.704 9.02 8.76a100 100 0 0 1 2.144 2.309q.336.375.469.529l.036.042l.044.051l.002.001l.002.004l11.004 13.001z"
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
