import { useMemo } from 'react'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Radius, Size, ThemeColor } from '../../types'
import type { AvatarSize } from './avatar.type'

const sizeMap: Record<Size, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
}

export function resolveAvatarSize(size: AvatarSize): number {
  if (typeof size === 'number') {
    return size
  }
  return sizeMap[size]
}

export function useAvatarSizeStyles(size: AvatarSize) {
  const theme = useXUITheme()

  const resolvedSize = useMemo(() => resolveAvatarSize(size), [size])

  const fontSize = useMemo(() => {
    if (typeof size === 'number') {
      return Math.max(10, Math.round(size * 0.4))
    }
    return theme.fontSizes[size]
  }, [size, theme])

  return {
    size: resolvedSize,
    fontSize,
  }
}

export function useAvatarRadiusStyles(radius: Radius, size: number) {
  const theme = useXUITheme()

  return useMemo(() => {
    if (radius === 'full') {
      return { borderRadius: size / 2 }
    }

    const radii: Record<Radius, number> = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }

    return { borderRadius: radii[radius] }
  }, [radius, size, theme])
}

export function useAvatarColors(themeColor: ThemeColor, isDisabled: boolean) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const backgroundColor = useMemo(() => {
    if (isDisabled) {
      return theme.colors.background
    }
    return colorScheme.container
  }, [colorScheme.container, isDisabled, theme.colors.background])

  const textColor = useMemo(() => {
    if (safeThemeColor === 'default') {
      return theme.colors.foreground
    }
    return colorScheme.onContainer
  }, [safeThemeColor, colorScheme.onContainer, theme.colors.foreground])

  return {
    backgroundColor,
    textColor,
    borderColor: colorScheme.main,
  }
}

export function getDefaultInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) {
    return ''
  }

  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}
