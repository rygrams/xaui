import React from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../core'
import { CircularActivityIndicator } from './circular-activity-indicator'
import { LinearActivityIndicator } from './linear-activity-indicator'
import { styles } from './indicator.style'
import type { ActivityIndicatorProps } from './indicator.type'

/**
 * @deprecated Use `Spinner` from `@xaui/native/spinner`. This tree is frozen and receives
 * fixes only.
 *
 * **The `linear` variant has no replacement.** `Spinner` is the circular one only; a bar
 * that fills is a progress indicator, which reports a *quantity* rather than a wait, and it
 * is not in the fifteen-component core.
 *
 * `variant` therefore changes meaning entirely: it names an **ink**, one of seven. Not a
 * fill — a spinner has no surface — so `primary` is `accent` there where it would be
 * `accentForeground` on a `Chip`. `themeColor` and `color` fold into it, `color` staying as
 * the raw hex escape.
 *
 * `size` takes the four tokens instead of a number. `disableAnimation` becomes
 * `animation={false}`, which mounts no worklet at all rather than freezing one.
 * `showTrack` is gone because the track is no longer optional: it is what makes a rotating
 * three-quarter ring read as busy rather than as broken. `backgroundColor` and
 * `borderRadius` go with it.
 *
 * ```tsx
 * // legacy
 * <ActivityIndicator variant="circular" size={32} themeColor="danger" showTrack />
 *
 * // v1
 * <Spinner size="lg" variant="danger" />
 * ```
 */
export const ActivityIndicator: React.FC<ActivityIndicatorProps> = props => {
  const {
    variant = 'circular',
    themeColor = 'primary',
    color,
    backgroundColor,
    size,
    disableAnimation = false,
    borderRadius,
    showTrack,
  } = props

  const theme = useXUITheme()

  const colorScheme = theme.colors[themeColor]
  const mainColor = color ?? colorScheme.main
  const trackColor =
    backgroundColor ?? (showTrack ? colorScheme.container : 'transparent')

  if (variant === 'circular') {
    const circleSize = size ?? 40

    return (
      <View
        style={[styles.container, { width: circleSize, height: circleSize }]}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Loading"
      >
        <CircularActivityIndicator
          size={circleSize}
          themeColor={themeColor}
          color={mainColor}
          backgroundColor={trackColor}
          disableAnimation={disableAnimation}
        />
      </View>
    )
  }

  const linearSize = size ?? 4

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <LinearActivityIndicator
        size={linearSize}
        themeColor={themeColor}
        color={mainColor}
        backgroundColor={trackColor}
        disableAnimation={disableAnimation}
        borderRadius={borderRadius}
        showTrack={showTrack}
      />
    </View>
  )
}
