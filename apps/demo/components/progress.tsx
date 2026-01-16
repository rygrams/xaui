import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'

export type ProgressBaseProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  value?: number
  isDisabled?: boolean
  disableAnimation?: boolean
  isIndeterminate?: boolean
}

export type ProgressBarProps = ProgressBaseProps & {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  isStriped?: boolean
}

export type CircularProgressProps = ProgressBaseProps & {
  strokeWidth?: number
  centeredContent?: boolean
}

const MIN_VALUE = 0
const MAX_VALUE = 100
const DURATION = 2400

const SIZE_CONFIG = {
  xs: 18,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
}

const STROKE_WIDTH_CONFIG = {
  xs: 3,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 'md',
  color = 'primary',
  value = 0,
  isDisabled = false,
  disableAnimation = false,
  isIndeterminate = false,
  strokeWidth: customStrokeWidth,
}) => {
  const theme = useXUITheme()

  const colorScheme = theme.colors[color]
  const circleSize = SIZE_CONFIG[size]
  const strokeWidth = customStrokeWidth ?? STROKE_WIDTH_CONFIG[size]

  const { current: timer } = useRef<Animated.Value>(new Animated.Value(0))
  const { current: fade } = useRef<Animated.Value>(
    new Animated.Value(!isIndeterminate || isDisabled ? 0 : 1)
  )
  const { current: progressAnim } = useRef<Animated.Value>(new Animated.Value(0))

  const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined)

  const startRotation = React.useCallback(() => {
    Animated.timing(fade, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start()

    if (rotation.current) {
      timer.setValue(0)
      Animated.loop(rotation.current).start()
    }
  }, [fade, timer])

  const stopRotation = () => {
    if (rotation.current) {
      rotation.current.stop()
    }
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

    if (isIndeterminate && !isDisabled) {
      startRotation()
    } else {
      Animated.timing(fade, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(stopRotation)
    }
  }, [isIndeterminate, isDisabled, fade, startRotation, timer])

  useEffect(() => {
    if (!isIndeterminate && !isDisabled) {
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
    }
  }, [value, isIndeterminate, isDisabled, disableAnimation, progressAnim])

  const mainColor = isDisabled ? 'rgba(0,0,0,0.1)' : colorScheme.main
  const trackColor = isDisabled ? 'rgba(0,0,0,0.05)' : colorScheme.background

  const frames = (60 * DURATION) / 1000
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)
  const containerStyle = {
    width: circleSize,
    height: circleSize / 2,
    overflow: 'hidden' as const,
  }

  if (isIndeterminate) {
    return (
      <View
        style={[styles.container, { width: circleSize, height: circleSize }]}
        accessible
        accessibilityRole="progressbar"
      >
        <Animated.View
          style={[{ width: circleSize, height: circleSize, opacity: fade }]}
          collapsable={false}
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
              width: circleSize,
              height: circleSize,
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
              width: circleSize,
              height: circleSize,
              transform: [
                {
                  translateY: index ? -circleSize / 2 : 0,
                },
                {
                  rotate: timer.interpolate({ inputRange, outputRange }),
                },
              ],
            }

            const offsetStyle = index ? { top: circleSize / 2 } : null

            const lineStyle = {
              width: circleSize,
              height: circleSize,
              borderColor: mainColor,
              borderWidth: strokeWidth,
              borderRadius: circleSize / 2,
            }

            return (
              <Animated.View key={index} style={[styles.layer]}>
                <Animated.View style={layerStyle}>
                  <Animated.View
                    style={[containerStyle, offsetStyle]}
                    collapsable={false}
                  >
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
        </Animated.View>
      </View>
    )
  }

  // Determinate mode - circular progress with rounded caps
  const capSize = strokeWidth
  const halfSize = circleSize / 2

  // Calculate rotations for two halves (0-180deg and 180-360deg)
  const firstHalfRotation = progressAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['0deg', '180deg', '180deg'],
  })

  const secondHalfRotation = progressAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['0deg', '0deg', '180deg'],
  })

  const endCapRotation = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  })

  const halfContainerStyle = {
    width: circleSize,
    height: halfSize,
    overflow: 'hidden' as const,
  }

  return (
    <View
      style={[styles.container, { width: circleSize, height: circleSize }]}
      accessible
      accessibilityRole="progressbar"
    >
      {/* Track background */}
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: strokeWidth,
          borderColor: trackColor,
        }}
      />

      {/* Progress arc - using two halves */}
      {/* First half (0-180deg) */}
      <View style={[halfContainerStyle, { position: 'absolute' }]}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            transform: [{ rotate: '-90deg' }, { rotate: firstHalfRotation }],
          }}
        >
          <View
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              borderWidth: strokeWidth,
              borderColor: 'transparent',
              borderTopColor: mainColor,
              borderRightColor: mainColor,
            }}
          />
        </Animated.View>
      </View>

      {/* Second half (180-360deg) */}
      <View style={[halfContainerStyle, { position: 'absolute', top: halfSize }]}>
        <Animated.View
          style={{
            width: circleSize,
            height: circleSize,
            transform: [
              { translateY: -halfSize },
              { rotate: '-90deg' },
              { rotate: secondHalfRotation },
            ],
          }}
        >
          <View
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              borderWidth: strokeWidth,
              borderColor: 'transparent',
              borderTopColor: mainColor,
              borderRightColor: mainColor,
            }}
          />
        </Animated.View>
      </View>

      {/* Start cap (rounded) - fixed at top */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: circleSize / 2 - capSize / 2,
          width: capSize,
          height: capSize,
          borderRadius: capSize / 2,
          backgroundColor: mainColor,
          zIndex: 10,
        }}
      />

      {/* End cap (rounded) - follows progress */}
      <Animated.View
        style={{
          position: 'absolute',
          width: circleSize,
          height: circleSize,
          transform: [{ rotate: endCapRotation }],
          zIndex: 10,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: circleSize / 2 - capSize / 2,
            width: capSize,
            height: capSize,
            borderRadius: capSize / 2,
            backgroundColor: mainColor,
          }}
        />
      </Animated.View>
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
