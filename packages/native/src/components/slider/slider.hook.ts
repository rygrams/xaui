import { useMemo } from 'react'
import { getSafeThemeColor, withPaletteNumber } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Size, ThemeColor } from '../../types'

type SliderSizeStyles = {
  trackThickness: number
  thumbSize: number
  stepDotSize: number
  markOffset: number
  fontSize: number
}

type SliderColorStyles = {
  trackColor: string
  fillColor: string
  thumbColor: string
  valueColor: string
  labelColor: string
  stepColor: string
  activeStepColor: string
  markColor: string
}

export function useSliderSizeStyles(size: Size): SliderSizeStyles {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes: Record<Size, SliderSizeStyles> = {
      xs: {
        trackThickness: 4,
        thumbSize: 14,
        stepDotSize: 4,
        markOffset: 12,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        trackThickness: 6,
        thumbSize: 16,
        stepDotSize: 5,
        markOffset: 14,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        trackThickness: 8,
        thumbSize: 20,
        stepDotSize: 6,
        markOffset: 16,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        trackThickness: 10,
        thumbSize: 24,
        stepDotSize: 7,
        markOffset: 18,
        fontSize: theme.fontSizes.lg,
      },
    }

    return sizes[size]
  }, [size, theme])
}

export function useSliderColorStyles(
  color: ThemeColor,
  isDisabled: boolean
): SliderColorStyles {
  const theme = useXUITheme()
  const safeColor = getSafeThemeColor(color)
  const palette = theme.colors[safeColor]
  const fillColor = withPaletteNumber(palette.main, 400)

  return useMemo(() => {
    if (isDisabled) {
      return {
        trackColor: `${theme.colors.default.main}30`,
        fillColor: `${theme.colors.default.main}55`,
        thumbColor: `${theme.colors.default.main}85`,
        valueColor: `${theme.colors.foreground}85`,
        labelColor: `${theme.colors.foreground}85`,
        stepColor: `${theme.colors.default.main}50`,
        activeStepColor: `${theme.colors.default.main}75`,
        markColor: `${theme.colors.foreground}80`,
      }
    }

    return {
      trackColor: `${palette.main}28`,
      fillColor,
      thumbColor: fillColor,
      valueColor: theme.colors.foreground,
      labelColor: theme.colors.foreground,
      stepColor: `${palette.main}40`,
      activeStepColor: fillColor,
      markColor: `${theme.colors.foreground}90`,
    }
  }, [fillColor, isDisabled, palette.main, theme.colors])
}
