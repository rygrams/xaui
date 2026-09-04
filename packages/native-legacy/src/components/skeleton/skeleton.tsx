import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import type { SkeletonProps } from './skeleton.type'
import { styles } from './skeleton.style'
import { useXUITheme } from '../../core'

/**
 * @deprecated Use `Skeleton` from `@xaui/native/skeleton`. This tree is frozen and
 * receives fixes only.
 *
 * The v1 replacement has no `size` and no `lines`: the block is sized by React Native's own
 * `width` and `height` as props, and a paragraph is three of them in a `Column` — which is
 * also where the shorter last line comes from. `isLoading={false}` renders the content the
 * block stood in for, so it is a gate rather than a shape you mount around your own.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  children,
  isLoaded,
  disableAnimation = false,
  skeletonColor,
  width,
  height,
  radius = 'md',
  style,
}) => {
  const theme = useXUITheme()
  const opacity = useRef(new Animated.Value(0.6)).current

  const resolvedColor = useMemo(
    () => skeletonColor ?? theme.colors.default.container,
    [skeletonColor, theme.colors.default.container]
  )
  const resolvedRadius = useMemo(
    () => theme.borderRadius[radius],
    [radius, theme.borderRadius]
  )

  useEffect(() => {
    if (isLoaded || disableAnimation) {
      opacity.setValue(1)
      return
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    )

    loop.start()

    return () => {
      loop.stop()
    }
  }, [disableAnimation, isLoaded, opacity])

  if (isLoaded) {
    return <>{children}</>
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          backgroundColor: resolvedColor,
          width,
          height,
          borderRadius: resolvedRadius,
          opacity,
        },
        style,
      ]}
    />
  )
}

Skeleton.displayName = 'Skeleton'
