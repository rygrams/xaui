import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Polyline, Line, Path } from 'react-native-svg'
import { runCheckAnimation, runUncheckAnimation } from './checkbox.animation'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline)

type CheckboxIconProps = {
  isChecked: boolean
  isIndeterminate?: boolean
  color: string
  size: number
  placeholderColor?: string
  variant?: 'filled' | 'light'
}

function CheckIcon({
  isChecked,
  color,
  size,
}: Omit<CheckboxIconProps, 'isIndeterminate'>) {
  const opacity = useRef(new Animated.Value(0)).current
  const strokeDashoffset = useRef(new Animated.Value(66)).current

  useEffect(() => {
    if (isChecked) {
      runCheckAnimation(opacity, strokeDashoffset)
    } else {
      runUncheckAnimation(opacity, strokeDashoffset)
    }
  }, [isChecked, opacity, strokeDashoffset])

  return (
    <AnimatedSvg
      width={size}
      height={size}
      viewBox="0 0 17 18"
      fill="none"
      opacity={opacity}
    >
      <AnimatedPolyline
        points="1 9 7 14 15 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="22"
        strokeDashoffset={strokeDashoffset}
      />
    </AnimatedSvg>
  )
}

function PlaceholderCheckIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 18">
      <Path
        d="M 1 9 L 7 14 L 15 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}

function IndeterminateCheckIcon({
  color,
  size,
}: Omit<CheckboxIconProps, 'isChecked' | 'isIndeterminate'>) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1="21" y1="12" x2="3" y2="12" stroke={color} strokeWidth={3} />
    </Svg>
  )
}

export function CheckboxIcon({ isIndeterminate, variant, ...props }: CheckboxIconProps) {
  const BaseIcon = isIndeterminate ? IndeterminateCheckIcon : CheckIcon

  if (variant === 'light' && !props.isChecked && !isIndeterminate) {
    return <PlaceholderCheckIcon size={props.size} color={props.placeholderColor ?? ''} />
  }

  return <BaseIcon {...props} />
}
