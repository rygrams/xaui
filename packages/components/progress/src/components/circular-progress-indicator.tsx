import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { useXUITheme } from '@xaui/core'
import type { CircularProgressIndicatorProps } from '../progress-types'

const MIN_VALUE = 0
const MAX_VALUE = 1
const DURATION = 1800

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type IndeterminateProgressProps = {
  size: number
  strokeWidth: number
  color: string
  backgroundColor: string
  disableAnimation: boolean
}

type DeterminateProgressProps = {
  size: number
  strokeWidth: number
  color: string
  backgroundColor: string
  value: number
  strokeCap: 'round' | 'butt' | 'square'
  disableAnimation: boolean
}

const IndeterminateProgress: React.FC<IndeterminateProgressProps> = ({
  size,
  strokeWidth,
  color,
  backgroundColor,
  disableAnimation,
}) => {
  const { current: timer } = useRef<Animated.Value>(new Animated.Value(0))
  const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined)

  const startRotation = React.useCallback(() => {
    if (rotation.current) {
      timer.setValue(0)
      Animated.loop(rotation.current).start()
    }
  }, [timer])

  const stopRotation = () => {
    if (rotation.current) rotation.current.stop()
  }

  useEffect(() => {
    if (rotation.current === undefined) {
      rotation.current = Animated.timing(timer, {
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
        toValue: 1,
      })
    }

    if (!disableAnimation) startRotation()
    else stopRotation()
  }, [disableAnimation, startRotation, timer])

  const frames = (60 * DURATION) / 1000
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)

  const containerStyle = {
    width: size,
    height: size / 2,
    overflow: 'hidden' as const,
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: backgroundColor,
        }}
      />

      <View
        style={{
          width: size,
          height: size,
          position: 'absolute',
        }}
      >
        {[0, 1].map(index => {
          const inputRange = Array.from(
            new Array(frames),
            (_, frameIndex) => frameIndex / (frames - 1)
          )
          const outputRange = Array.from(new Array(frames), (_, frameIndex) => {
            let progress = (2 * frameIndex) / (frames - 1)
            const rotation = index ? +(360 - 15) : -(180 - 15)

            if (progress > 1.0) {
              progress = 2.0 - progress
            }

            const direction = index ? -1 : +1

            return `${direction * (180 - 30) * easing(progress) + rotation}deg`
          })

          const layerStyle = {
            width: size,
            height: size,
            transform: [
              {
                rotate: timer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
                }),
              },
            ],
          }

          const viewportStyle = {
            width: size,
            height: size,
            transform: [
              { translateY: index ? -size / 2 : 0 },
              {
                rotate: timer.interpolate({ inputRange, outputRange }),
              },
            ],
          }

          const offsetStyle = index ? { top: size / 2 } : null

          const lineStyle = {
            width: size,
            height: size,
            borderColor: color,
            borderWidth: strokeWidth,
            borderRadius: size / 2,
          }

          return (
            <Animated.View key={index} style={[styles.layer]}>
              <Animated.View style={layerStyle}>
                <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
                  <Animated.View style={viewportStyle}>
                    <Animated.View style={containerStyle} collapsable={false}>
                      <Animated.View style={lineStyle} />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          )
        })}
      </View>
    </View>
  )
}

const DeterminateProgress: React.FC<DeterminateProgressProps> = ({
  size,
  strokeWidth,
  color,
  backgroundColor,
  value,
  strokeCap,
  disableAnimation,
}) => {
  const { current: progressAnim } = useRef<Animated.Value>(new Animated.Value(0))

  useEffect(() => {
    const clampedValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value))

    if (disableAnimation) {
      progressAnim.setValue(clampedValue)
    } else {
      Animated.timing(progressAnim, {
        toValue: clampedValue,
        duration: 500,
        easing: Easing.bezier(0, 0, 0.2, 1),
        useNativeDriver: Platform.OS !== 'web',
      }).start()
    }
  }, [value, disableAnimation, progressAnim])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  })

  return (
    <View style={[styles.container, { width: size, height: size }]}>
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
          strokeDashoffset={strokeDashoffset}
          fill="none"
        />
      </Svg>
    </View>
  )
}

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  value,
  color,
  backgroundColor,
  strokeCap,
  strokeWidth: customStrokeWidth,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
  const isIndeterminate = value === undefined || value === null
  const colorScheme = theme.colors[themeColor]

  const circleSize = size || 40
  const strokeWidth = customStrokeWidth || 4

  const mainColor = color || colorScheme.main
  const trackColor = isIndeterminate
    ? backgroundColor || 'transparent'
    : backgroundColor || colorScheme.background

  const effectiveStrokeCap = strokeCap || (isIndeterminate ? 'square' : 'butt')

  if (isIndeterminate) {
    return (
      <View
        style={[styles.container, { width: circleSize, height: circleSize }]}
        accessible
        accessibilityRole="progressbar"
      >
        <IndeterminateProgress
          size={circleSize}
          strokeWidth={strokeWidth}
          color={mainColor}
          backgroundColor={trackColor}
          disableAnimation={disableAnimation}
        />
      </View>
    )
  }

  return (
    <View
      style={[styles.container, { width: circleSize, height: circleSize }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: (value ?? 0) * 100 }}
    >
      <DeterminateProgress
        size={circleSize}
        strokeWidth={strokeWidth}
        color={mainColor}
        backgroundColor={trackColor}
        value={value ?? 0}
        strokeCap={effectiveStrokeCap}
        disableAnimation={disableAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
