import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { ChipRadius, ChipSize, ChipVariant } from './chip.type'

const sizeMap: Record<ChipSize, { height: number; paddingH: number; fontSize: number }> = {
  sm: { height: 32, paddingH: 12, fontSize: 13 },
  md: { height: 40, paddingH: 16, fontSize: 15 },
  lg: { height: 44, paddingH: 18, fontSize: 17 },
}

const dotSizeMap: Record<ChipSize, number> = {
  sm: 8,
  md: 10,
  lg: 11,
}

const closeSizeMap: Record<ChipSize, number> = {
  sm: 14,
  md: 16,
  lg: 17,
}

export function useChipSizeStyles(size: ChipSize) {
  return useMemo(() => {
    const { height, paddingH, fontSize } = sizeMap[size]
    return { height, paddingHorizontal: paddingH, fontSize }
  }, [size])
}

export function useChipDotSize(size: ChipSize) {
  return useMemo(() => dotSizeMap[size], [size])
}

export function useChipCloseSize(size: ChipSize) {
  return useMemo(() => closeSizeMap[size], [size])
}

export function useChipRadiusStyles(radius: ChipRadius, height: number) {
  const theme = useXUITheme()

  return useMemo(() => {
    if (radius === 'full') {
      return { borderRadius: height / 2 }
    }
    return { borderRadius: theme.borderRadius[radius] }
  }, [height, radius, theme.borderRadius])
}

export function useChipVariantStyles(themeColor: ThemeColor, variant: ChipVariant) {
  const theme = useXUITheme()
  const safeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeColor]

  return useMemo(() => {
    switch (variant) {
      case 'bordered':
        return {
          backgroundColor: 'transparent',
          color: colorScheme.main,
          borderWidth: 2,
          borderColor: colorScheme.main,
        }
      case 'light':
        return {
          backgroundColor: 'transparent',
          color: colorScheme.main,
        }
      case 'flat':
        return {
          backgroundColor: colorScheme.background,
          color: colorScheme.main,
        }
      case 'faded':
        return {
          backgroundColor: withOpacity(colorScheme.background, 0.7),
          color: colorScheme.main,
          borderWidth: 1,
          borderColor: withOpacity(colorScheme.main, 0.3),
        }
      case 'shadow':
        return {
          backgroundColor: colorScheme.main,
          color: colorScheme.foreground,
          shadow: theme.shadows.sm,
        }
      case 'dot':
        return {
          backgroundColor: colorScheme.background,
          color: colorScheme.main,
          dotColor: colorScheme.main,
        }
      case 'solid':
      default:
        return {
          backgroundColor: colorScheme.main,
          color: colorScheme.foreground,
        }
    }
  }, [colorScheme, theme, variant])
}
