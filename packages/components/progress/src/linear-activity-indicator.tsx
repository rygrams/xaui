import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { LinearActivityIndicatorProps } from './progress-types'

const IndeterminateProgress: React.FC<LinearActivityIndicatorProps> = ({
  size = 4,
  color,
  backgroundColor,
  borderRadius,
  disableAnimation,
}) => {
  const { current: primaryTranslateX } = useRef<Animated.Value>(
    new Animated.Value(0)
  )
  const { current: primaryScale } = useRef<Animated.Value>(new Animated.Value(0))
  const { current: secondaryTranslateX } = useRef<Animated.Value>(
    new Animated.Value(0)
  )
  const { current: secondaryScale } = useRef<Animated.Value>(
    new Animated.Value(0)
  )
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }

    if (disableAnimation || width === 0) {
      return
    }

    const totalDuration = 2000
    const toDuration = (percent: number) => (totalDuration * percent) / 100
    const primaryTranslateValues = [
      -1.45167 * width,
      -1.45167 * width,
      -0.614956 * width,
      0.55444 * width,
    ]
    const secondaryTranslateValues = [
      -0.548889 * width,
      -0.17237 * width,
      0.294973 * width,
      1.053891 * width,
    ]

    primaryTranslateX.setValue(primaryTranslateValues[0])
    primaryScale.setValue(0.08)
    secondaryTranslateX.setValue(secondaryTranslateValues[0])
    secondaryScale.setValue(0.08)

    const timing = (
      value: Animated.Value,
      toValue: number,
      duration: number,
      easing: (value: number) => number
    ) =>
      Animated.timing(value, {
        toValue,
        duration,
        easing,
        useNativeDriver: false,
      })

    const primaryTranslate = Animated.sequence([
      timing(primaryTranslateX, primaryTranslateValues[1], toDuration(20), Easing.linear),
      timing(
        primaryTranslateX,
        primaryTranslateValues[2],
        toDuration(39.15),
        Easing.bezier(0.5, 0, 0.701732, 0.495819)
      ),
      timing(
        primaryTranslateX,
        primaryTranslateValues[3],
        toDuration(40.85),
        Easing.bezier(0.302435, 0.381352, 0.55, 0.956352)
      ),
    ])

    const primaryScaleAnimation = Animated.sequence([
      timing(primaryScale, 0.08, toDuration(36.65), Easing.linear),
      timing(
        primaryScale,
        0.661479,
        toDuration(32.5),
        Easing.bezier(0.334731, 0.12482, 0.785844, 1)
      ),
      timing(
        primaryScale,
        0.08,
        toDuration(30.85),
        Easing.bezier(0.06, 0.11, 0.6, 1)
      ),
    ])

    const secondaryTranslate = Animated.sequence([
      timing(
        secondaryTranslateX,
        secondaryTranslateValues[1],
        toDuration(25),
        Easing.bezier(0.15, 0, 0.515058, 0.409685)
      ),
      timing(
        secondaryTranslateX,
        secondaryTranslateValues[2],
        toDuration(23.35),
        Easing.bezier(0.31033, 0.284058, 0.8, 0.733712)
      ),
      timing(
        secondaryTranslateX,
        secondaryTranslateValues[3],
        toDuration(51.65),
        Easing.bezier(0.4, 0.627035, 0.6, 0.902026)
      ),
    ])

    const secondaryScaleAnimation = Animated.sequence([
      timing(
        secondaryScale,
        0.457104,
        toDuration(19.15),
        Easing.bezier(0.205028, 0.057051, 0.57661, 0.453971)
      ),
      timing(
        secondaryScale,
        0.72796,
        toDuration(25),
        Easing.bezier(0.152313, 0.196432, 0.648374, 1.00432)
      ),
      timing(
        secondaryScale,
        0.08,
        toDuration(55.85),
        Easing.bezier(0.257759, -0.003163, 0.211762, 1.38179)
      ),
    ])

    animationRef.current = Animated.loop(
      Animated.parallel([
        primaryTranslate,
        primaryScaleAnimation,
        secondaryTranslate,
        secondaryScaleAnimation,
      ]),
      { resetBeforeIteration: true }
    )

    animationRef.current.start()

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
    }
  }, [
    disableAnimation,
    width,
    primaryTranslateX,
    primaryScale,
    secondaryTranslateX,
    secondaryScale,
  ])

  const primaryWidth = Animated.multiply(primaryScale, width)
  const secondaryWidth = Animated.multiply(secondaryScale, width)
  const staticWidth = width * 0.4
  const staticLeft = width * 0.3

  return (
    <View
      style={[
        styles.track,
        {
          height: size,
          backgroundColor,
          borderRadius: borderRadius ?? size / 2,
        },
      ]}
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 && disableAnimation && (
        <View
          style={[
            styles.bar,
            {
              width: staticWidth,
              left: staticLeft,
              backgroundColor: color,
              borderRadius: borderRadius ?? size / 2,
            },
          ]}
        />
      )}
      {width > 0 && !disableAnimation && (
        <>
          <Animated.View
            style={[
              styles.bar,
              {
                width: primaryWidth,
                left: primaryTranslateX,
                backgroundColor: color,
                borderRadius: borderRadius ?? size / 2,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.bar,
              {
                width: secondaryWidth,
                left: secondaryTranslateX,
                backgroundColor: color,
                borderRadius: borderRadius ?? size / 2,
              },
            ]}
          />
        </>
      )}
      {width === 0 && (
        <View
          style={[
            styles.bar,
            {
              backgroundColor: color,
              borderRadius: borderRadius ?? size / 2,
              width: '40%',
              left: '30%',
            },
          ]}
        />
      )}
    </View>
  )
}

export const LinearActivityIndicator: React.FC<LinearActivityIndicatorProps> = ({
  size = 4,
  themeColor = 'primary',
  color,
  backgroundColor,
  borderRadius,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]

  const indicatorHeight = size || 4

  const mainColor = color || colorScheme.main
  const trackColor = backgroundColor ?? theme.colors.background

  return (
    <View style={styles.container} accessible accessibilityRole="progressbar">
      <IndeterminateProgress
        size={indicatorHeight}
        color={mainColor}
        backgroundColor={trackColor}
        borderRadius={borderRadius}
        disableAnimation={disableAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    position: 'absolute',
  },
})
