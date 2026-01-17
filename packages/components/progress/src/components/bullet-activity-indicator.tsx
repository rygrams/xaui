import React, { useEffect, useRef, useMemo } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { ActivityIndicatorProps } from '../progress-types'

const BULLET_COUNT = 6
const DURATION = 2000

export const BulletActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  color,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
  const rotationAnims = useRef(
    Array.from({ length: BULLET_COUNT }, () => new Animated.Value(0))
  ).current

  useEffect(() => {
    if (disableAnimation) {
      rotationAnims.forEach(anim => anim.stopAnimation())
      return
    }

    rotationAnims.forEach(anim => {
      anim.setValue(0)
      Animated.loop(
        Animated.timing(anim, {
          toValue: 1,
          duration: DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        })
      ).start()
    })

    return () => {
      rotationAnims.forEach(anim => anim.stopAnimation())
    }
  }, [disableAnimation, rotationAnims])

  const colorScheme = theme.colors[themeColor]
  const bulletColor = color || colorScheme.main

  const bulletSize = size * 0.15
  const orbitRadius = (size - bulletSize) / 2

  const bullets = useMemo(() => {
    return rotationAnims.map((rotationAnim, index) => {
      const startRotation = (index * 360) / BULLET_COUNT
      const endRotation = startRotation + 360

      const rotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [`${startRotation}deg`, `${endRotation}deg`],
      })

      return (
        <Animated.View
          key={index}
          style={[
            styles.bulletContainer,
            {
              width: size,
              height: size,
              transform: [{ rotate: rotation }],
            },
          ]}
        >
          <View
            style={[
              styles.bullet,
              {
                width: bulletSize,
                height: bulletSize,
                borderRadius: bulletSize / 2,
                backgroundColor: bulletColor,
                top: size / 2 - orbitRadius - bulletSize / 2,
              },
            ]}
          />
        </Animated.View>
      )
    })
  }, [size, bulletSize, bulletColor, orbitRadius, rotationAnims])

  return (
    <View
      style={[styles.container, { width: size, height: size }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      {bullets}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bulletContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    position: 'absolute',
  },
})
