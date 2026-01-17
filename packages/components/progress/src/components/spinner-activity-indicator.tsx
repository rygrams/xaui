import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { ActivityIndicatorProps } from '../progress-types'

const DURATION = 1800

export const SpinnerActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  color,
  backgroundColor,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
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

  const colorScheme = theme.colors[themeColor]
  const mainColor = color || colorScheme.main
  const trackColor = backgroundColor || 'transparent'

  const strokeWidth = size * 0.1
  const frames = (60 * DURATION) / 1000
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0)

  const containerStyle = {
    width: size,
    height: size / 2,
    overflow: 'hidden' as const,
  }

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: trackColor,
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
            const rotationValue = index ? +(360 - 15) : -(180 - 15)

            if (progress > 1.0) {
              progress = 2.0 - progress
            }

            const direction = index ? -1 : +1

            return `${direction * (180 - 30) * easing(progress) + rotationValue}deg`
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
            borderColor: mainColor,
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
