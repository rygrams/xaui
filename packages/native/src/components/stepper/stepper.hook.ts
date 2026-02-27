import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import type { StepperSize } from './stepper.type'

type StepperSizeStyles = {
  indicatorSize: number
  indicatorBorderWidth: number
  titleFontSize: number
  descriptionFontSize: number
  horizontalSpacing: number
  verticalSpacing: number
  verticalGap: number
  lineThickness: number
}

const sizeMap: Record<StepperSize, StepperSizeStyles> = {
  sm: {
    indicatorSize: 22,
    indicatorBorderWidth: 1.5,
    titleFontSize: 13,
    descriptionFontSize: 11,
    horizontalSpacing: 8,
    verticalSpacing: 6,
    verticalGap: 16,
    lineThickness: 2,
  },
  md: {
    indicatorSize: 26,
    indicatorBorderWidth: 2,
    titleFontSize: 14,
    descriptionFontSize: 12,
    horizontalSpacing: 10,
    verticalSpacing: 8,
    verticalGap: 18,
    lineThickness: 2,
  },
  lg: {
    indicatorSize: 30,
    indicatorBorderWidth: 2,
    titleFontSize: 15,
    descriptionFontSize: 13,
    horizontalSpacing: 12,
    verticalSpacing: 10,
    verticalGap: 20,
    lineThickness: 3,
  },
}

export const useStepperSizeStyles = (size: StepperSize) => {
  return useMemo(() => sizeMap[size], [size])
}

export const useStepperColors = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const scheme = theme.colors[getSafeThemeColor(themeColor)]

  return useMemo(
    () => ({
      activeIndicatorBackground: scheme.main,
      activeIndicatorBorder: scheme.main,
      activeIndicatorText: scheme.onMain,
      completedIndicatorBackground: withOpacity(scheme.main, 0.2),
      completedIndicatorBorder: scheme.main,
      completedIndicatorText: scheme.main,
      lockedIndicatorBackground: withOpacity(theme.colors.foreground, 0.08),
      lockedIndicatorBorder: withOpacity(theme.colors.foreground, 0.22),
      lockedIndicatorText: withOpacity(theme.colors.foreground, 0.42),
      inactiveIndicatorBackground: theme.colors.background,
      inactiveIndicatorBorder: withOpacity(theme.colors.foreground, 0.22),
      inactiveIndicatorText: withOpacity(theme.colors.foreground, 0.72),
      title: theme.colors.foreground,
      description: withOpacity(theme.colors.foreground, 0.72),
      line: withOpacity(theme.colors.foreground, 0.16),
      activeLine: scheme.main,
    }),
    [scheme, theme.colors.background, theme.colors.foreground]
  )
}
