import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import type { SkeletonProps } from './skeleton.type'
import { styles } from './skeleton.style'
import { useXUITheme } from '../../core'

/**
 * @deprecated Use `Skeleton` from `@xaui/native/skeleton`. This tree is frozen and
 * receives fixes only.
 *
 * **`isLoaded` becomes `isLoading`, which is its opposite** — the one rename in this
 * component that will silently invert a screen if it is missed, since both are booleans and
 * both type-check.
 *
 * `width` and `height` are no longer props of ours: they are React Native's own keys, taken
 * as style props (R14), so `width="60%"` works exactly as it does in a stylesheet. There is
 * no `size` token either — only the caller knows the shape of the thing that is missing.
 *
 * `disableAnimation` becomes `animation={false}`, and `skeletonColor` becomes `color`,
 * which must be a hex value: its slices are derived in OKLab.
 *
 * ```tsx
 * // legacy
 * <Skeleton isLoaded={!!user} width={140} height={20} disableAnimation>
 *   <Text>{user?.name}</Text>
 * </Skeleton>
 *
 * // v1
 * <Skeleton isLoading={!user} width={140} height={20} animation={false}>
 *   <Typography>{user?.name}</Typography>
 * </Skeleton>
 * ```
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
