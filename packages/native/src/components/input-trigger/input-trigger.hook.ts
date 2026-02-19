import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity, withPaletteNumber } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Radius, ThemeColor } from '../../types'
import type { InputTriggerSize, InputTriggerVariant } from './input-trigger.type'

type InputTriggerSizeStyles = {
  minHeight: number
  fontSize: number
  paddingHorizontal: number
  paddingVertical: number
  slotGap: number
  labelSize: number
  helperSize: number
}

type InputTriggerVariantStyles = {
  container: {
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    borderBottomWidth?: number
  }
  unfocusedBorderColor: string
  textColor: string
  placeholderColor: string
  labelColor: string
  helperColor: string
}

export const useInputTriggerSizeStyles = (size: InputTriggerSize) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizeMap: Record<InputTriggerSize, InputTriggerSizeStyles> = {
      sm: {
        minHeight: theme.componentSizes.sm,
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 8,
        slotGap: 8,
        labelSize: 13,
        helperSize: 12,
      },
      md: {
        minHeight: theme.componentSizes.md,
        fontSize: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        slotGap: 10,
        labelSize: 14,
        helperSize: 13,
      },
      lg: {
        minHeight: theme.componentSizes.lg,
        fontSize: 17,
        paddingHorizontal: 16,
        paddingVertical: 12,
        slotGap: 12,
        labelSize: 15,
        helperSize: 15,
      },
    }
    return sizeMap[size]
  }, [size, theme])
}

export const useInputTriggerRadiusStyles = (radius: Radius) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (radius === 'full') {
      return { borderRadius: theme.borderRadius.full }
    }

    return { borderRadius: theme.borderRadius[radius] }
  }, [radius, theme.borderRadius])
}

type InputTriggerVariantParams = {
  themeColor: ThemeColor
  variant: InputTriggerVariant
  isInvalid: boolean
  isDisabled: boolean
}

export const useInputTriggerVariantStyles = ({
  themeColor,
  variant,
  isInvalid,
  isDisabled,
}: InputTriggerVariantParams): InputTriggerVariantStyles => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    const neutralBorder = withOpacity(theme.colors.foreground, 0.1)
    const textColor = isDisabled
      ? withOpacity(theme.colors.foreground, 0.55)
      : theme.colors.foreground
    const placeholderColor = withOpacity(theme.colors.foreground, 0.45)
    const labelColor = isInvalid
      ? theme.colors.danger.main
      : withOpacity(theme.colors.foreground, 0.8)
    const helperColor = isInvalid
      ? theme.colors.danger.main
      : withOpacity(theme.colors.foreground, 0.72)

    if (variant === 'underlined') {
      return {
        container: {
          backgroundColor: 'transparent',
          borderBottomWidth: isInvalid ? 2 : 1,
          borderColor: isInvalid
            ? theme.colors.danger.main
            : withPaletteNumber(colorScheme.main, 500),
        },
        unfocusedBorderColor: neutralBorder,
        textColor,
        placeholderColor,
        labelColor,
        helperColor,
      }
    }

    if (variant === 'bordered') {
      return {
        container: {
          backgroundColor: theme.colors.background,
          borderColor: isInvalid ? theme.colors.danger.main : neutralBorder,
          borderWidth: theme.borderWidth.md,
        },
        unfocusedBorderColor: neutralBorder,
        textColor,
        placeholderColor,
        labelColor,
        helperColor,
      }
    }

    if (variant === 'faded') {
      return {
        container: {
          backgroundColor: withOpacity(colorScheme.background, 0.68),
          borderColor: isInvalid ? theme.colors.danger.main : 'transparent',
          borderWidth: isInvalid ? theme.borderWidth.md : 0,
        },
        unfocusedBorderColor: 'transparent',
        textColor,
        placeholderColor,
        labelColor,
        helperColor,
      }
    }

    return {
      container: {
        backgroundColor: colorScheme.background,
        borderColor: isInvalid
          ? withPaletteNumber(theme.colors.danger.main, 500)
          : 'transparent',
        borderWidth: isInvalid ? theme.borderWidth.md : 0,
      },
      unfocusedBorderColor: 'transparent',
      textColor,
      placeholderColor,
      labelColor,
      helperColor,
    }
  }, [colorScheme, isDisabled, isInvalid, theme, variant])
}
