import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Polyline, Line } from 'react-native-svg'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const AnimatedPolyline = Animated.createAnimatedComponent(Polyline)

type CheckboxIconProps = {
  isChecked: boolean
  isIndeterminate?: boolean
  color: string
  size: number
}

function CheckIcon({ isChecked, color, size }: Omit<CheckboxIconProps, 'isIndeterminate'>) {
  const opacity = useRef(new Animated.Value(0)).current
  const strokeDashoffset = useRef(new Animated.Value(66)).current

  useEffect(() => {
    if (isChecked) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(strokeDashoffset, {
          toValue: 44,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(strokeDashoffset, {
          toValue: 66,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [isChecked, opacity, strokeDashoffset])

  return (
    <AnimatedSvg width={size} height={size} viewBox="0 0 17 18" fill="none" opacity={opacity}>
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

function IndeterminateIcon({
  color,
  size,
}: Omit<CheckboxIconProps, 'isChecked' | 'isIndeterminate'>) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1="21" y1="12" x2="3" y2="12" stroke={color} strokeWidth={3} />
    </Svg>
  )
}

export function CheckboxIcon({ isIndeterminate, ...props }: CheckboxIconProps) {
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon

  return <BaseIcon {...props} />
}
