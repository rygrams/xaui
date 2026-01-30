import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { BadgePlacement, BadgeShape, BadgeSize, BadgeVariant } from './badge.type'

const sizeMap: Record<BadgeSize, { height: number; minWidth: number; dot: number }> = {
  sm: { height: 16, minWidth: 16, dot: 8 },
  md: { height: 20, minWidth: 20, dot: 10 },
  lg: { height: 24, minWidth: 24, dot: 12 },
}

export function useBadgeSizeStyles(size: BadgeSize, isDot: boolean, isOneChar: boolean) {
  const theme = useXUITheme()

  return useMemo(() => {
    const { height, minWidth, dot } = sizeMap[size]
    if (isDot) {
      return {
        height: dot,
        minWidth: dot,
        paddingHorizontal: 0,
        fontSize: Math.max(10, Math.round(dot * 0.6)),
      }
    }

    if (isOneChar) {
      return {
        height,
        minWidth: height,
        paddingHorizontal: 0,
        fontSize: theme.fontSizes[size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'],
      }
    }

    const paddingHorizontal = size === 'sm' ? theme.spacing.xs : theme.spacing.sm
    const fontSize = theme.fontSizes[size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md']

    return {
      height,
      minWidth,
      paddingHorizontal,
      fontSize,
    }
  }, [isDot, isOneChar, size, theme])
}

export function useBadgeVariantStyles(themeColor: ThemeColor, variant: BadgeVariant) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    if (variant === 'flat') {
      return {
        backgroundColor: colorScheme.background,
        color: colorScheme.main,
      }
    }

    if (variant === 'faded') {
      return {
        backgroundColor: withOpacity(colorScheme.background, 0.7),
        color: colorScheme.main,
      }
    }

    if (variant === 'shadow') {
      return {
        backgroundColor: colorScheme.main,
        color: colorScheme.foreground,
        shadow: theme.shadows.sm,
      }
    }

    return {
      backgroundColor: colorScheme.main,
      color: colorScheme.foreground,
    }
  }, [colorScheme, theme, variant])
}

export function useBadgeShapeStyles(shape: BadgeShape, height: number) {
  const theme = useXUITheme()

  return useMemo(() => {
    if (shape === 'circle') {
      return { borderRadius: height / 2 }
    }
    return { borderRadius: theme.borderRadius.sm }
  }, [height, shape, theme.borderRadius.sm])
}

export function useBadgePlacementStyles(placement: BadgePlacement, height: number) {
  return useMemo(() => {
    const offset = Math.round(height * 0.3)

    switch (placement) {
      case 'top-left':
        return { top: -offset, left: -offset }
      case 'bottom-right':
        return { bottom: -offset, right: -offset }
      case 'bottom-left':
        return { bottom: -offset, left: -offset }
      case 'top-right':
      default:
        return { top: -offset, right: -offset }
    }
  }, [height, placement])
}
