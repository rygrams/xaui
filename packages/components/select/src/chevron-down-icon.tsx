import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type ChevronDownIconProps = {
  color: string
  size: number
  isOpen?: boolean
}

export function ChevronDownIcon({ color, size, isOpen = false }: ChevronDownIconProps) {
  const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotation])

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 9L12 15L18 9"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  )
}
