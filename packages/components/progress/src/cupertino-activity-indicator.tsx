import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { CupertinoActivityIndicatorProps } from './progress-types'

const TICK_COUNT = 8
const DURATION = 1000

export const CupertinoActivityIndicator: React.FC<CupertinoActivityIndicatorProps> = ({
  size = 20,
  themeColor = 'primary',
  color,
  isAnimate = true,
}) => {
  const theme = useXUITheme()
  const { current: rotationAnim } = useRef<Animated.Value>(new Animated.Value(0))
  const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined)

  useEffect(() => {
    if (rotation.current === undefined) {
      rotation.current = Animated.timing(rotationAnim, {
        duration: DURATION,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
        toValue: 1,
      })
    }

    if (isAnimate) {
      rotationAnim.setValue(0)
      Animated.loop(rotation.current).start()
    } else {
      if (rotation.current) {
        rotation.current.stop()
      }
    }

    return () => {
      if (rotation.current) {
        rotation.current.stop()
      }
    }
  }, [isAnimate, rotationAnim])

  const colorScheme = theme.colors[themeColor]
  const tickColor = color || colorScheme.main

  const tickWidth = size * 0.07
  const tickHeight = size * 0.28

  const renderTicks = () => {
    const ticks = []

    for (let i = 0; i < TICK_COUNT; i++) {
      const angle = (i * 360) / TICK_COUNT
      const step = 1 / TICK_COUNT

      const inputRange = []
      const outputRange = []

      for (let j = 0; j <= TICK_COUNT; j++) {
        inputRange.push(j * step)
        const distance = Math.min(
          Math.abs(j - i),
          Math.abs(j - i + TICK_COUNT),
          Math.abs(j - i - TICK_COUNT)
        )

        let opacity
        if (distance === 0) {
          opacity = 1.0
        } else if (distance === 1) {
          opacity = 0.8
        } else {
          opacity = 0.2 + ((TICK_COUNT - distance) / TICK_COUNT) * 0.2
        }

        outputRange.push(opacity)
      }

      const tickOpacity = rotationAnim.interpolate({
        inputRange,
        outputRange,
      })

      ticks.push(
        <View
          key={i}
          style={[
            styles.tickContainer,
            {
              width: size,
              height: size,
              transform: [{ rotate: `${angle}deg` }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.tick,
              {
                width: tickWidth,
                height: tickHeight,
                backgroundColor: tickColor,
                opacity: tickOpacity,
                borderRadius: tickWidth / 2,
              },
            ]}
          />
        </View>
      )
    }

    return ticks
  }

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      {renderTicks()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tick: {
    position: 'absolute',
    top: 0,
  },
})
