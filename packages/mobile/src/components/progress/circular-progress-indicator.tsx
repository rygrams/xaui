import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedProps } from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { useProgressAnimation } from './progress.hook'
import { styles } from './progress.style'

type CircularProgressIndicatorProps = {
  size?: number
  color: string
  backgroundColor: string
  value: number
  borderRadius?: number
  disableAnimation?: boolean
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  size = 40,
  color,
  backgroundColor,
  value,
  borderRadius,
  disableAnimation,
}) => {
  const progressAnim = useProgressAnimation(value, disableAnimation)
  const strokeWidth = size * 0.1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2
  const strokeCap = borderRadius && borderRadius > 0 ? 'round' : 'butt'

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progressAnim.value),
  }))

  return (
    <View style={[styles.circleContainer, { width: size, height: size }]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeCap}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
        />
      </Svg>
    </View>
  )
}
