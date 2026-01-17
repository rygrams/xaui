import React, { useEffect, useRef, useMemo } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { ActivityIndicatorProps } from '../progress-types'

const TICK_COUNT = 8
const DURATION = 1000

const getOpacityForDistance = (distance: number): number => {
  if (distance === 0) return 1.0
  if (distance === 1) return 0.8
  return 0.2 + ((TICK_COUNT - distance) / TICK_COUNT) * 0.2
}

export const TickActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  color,
  disableAnimation = false,
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

    if (!disableAnimation) {
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
  }, [disableAnimation, rotationAnim])

  const colorScheme = theme.colors[themeColor]
  const tickColor = color || colorScheme.main

  const tickWidth = size * 0.07
  const tickHeight = size * 0.28

  const ticks = useMemo(() => {
    const tickElements = []

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
        outputRange.push(getOpacityForDistance(distance))
      }

      const tickOpacity = rotationAnim.interpolate({
        inputRange,
        outputRange,
      })

      tickElements.push(
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

    return tickElements
  }, [size, tickWidth, tickHeight, tickColor, rotationAnim])

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      {ticks}
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
