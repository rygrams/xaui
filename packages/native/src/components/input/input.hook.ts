import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity, withPaletteNumber } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { Radius, ThemeColor } from '../../types'
import type { TextInputSize, TextInputVariant } from './input.type'

type InputSizeStyles = {
  minHeight: number
  fontSize: number
  paddingHorizontal: number
  paddingVertical: number
  slotGap: number
  labelSize: number
  helperSize: number
}

type InputVariantStyles = {
  container: {
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
    borderBottomWidth?: number
    borderRadius?: number
  }
  unfocusedBorderColor: string
  focusedBorderColor: string
  textColor: string
  placeholderColor: string
  labelColor: string
  helperColor: string
}

export const useTextInputSizeStyles = (size: TextInputSize) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizeMap: Record<TextInputSize, InputSizeStyles> = {
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

export const useTextInputRadiusStyles = (radius: Radius) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (radius === 'full') {
      return { borderRadius: theme.borderRadius.full }
    }

    return { borderRadius: theme.borderRadius[radius] }
  }, [radius, theme.borderRadius])
}

type InputVariantParams = {
  themeColor: ThemeColor
  variant: TextInputVariant
  isFocused: boolean
  isInvalid: boolean
  isDisabled: boolean
}

export const useTextInputVariantStyles = ({
  themeColor,
  variant,
  isFocused,
  isInvalid,
  isDisabled,
}: InputVariantParams): InputVariantStyles => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(() => {
    const focusColor = isInvalid ? theme.colors.danger.main : colorScheme.main
    const neutralBorder = withOpacity(theme.colors.foreground, 0.1)
    const textColor = isDisabled
      ? withOpacity(theme.colors.foreground, 0.55)
      : theme.colors.foreground
    const placeholderColor = withOpacity(theme.colors.foreground, 0.45)
    const labelColor = isInvalid
      ? theme.colors.danger.main
      : isFocused
        ? colorScheme.main
        : withOpacity(theme.colors.foreground, 0.8)
    const helperColor = isInvalid
      ? theme.colors.danger.main
      : withOpacity(theme.colors.foreground, 0.72)

    if (variant === 'underlined') {
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: focusColor,
          borderBottomWidth: isFocused || isInvalid ? 2 : 1,
        },
        unfocusedBorderColor: neutralBorder,
        focusedBorderColor: focusColor,
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
          borderColor: isFocused || isInvalid ? focusColor : neutralBorder,
          borderWidth: theme.borderWidth.md,
        },
        unfocusedBorderColor: neutralBorder,
        focusedBorderColor: focusColor,
        textColor,
        placeholderColor,
        labelColor,
        helperColor,
      }
    }

    if (variant === 'light') {
      return {
        container: {
          borderColor: isFocused || isInvalid ? focusColor : 'transparent',
          borderWidth: isFocused || isInvalid ? theme.borderWidth.md : 0,
        },
        unfocusedBorderColor: 'transparent',
        focusedBorderColor: focusColor,
        textColor,
        placeholderColor,
        labelColor,
        helperColor,
      }
    }

    return {
      container: {
        backgroundColor: withOpacity(colorScheme.container, 0.5),
        borderColor:
          isFocused || isInvalid
            ? withPaletteNumber(focusColor, 500)
            : 'transparent',
        borderWidth: isFocused || isInvalid ? theme.borderWidth.md : 0,
      },
      unfocusedBorderColor: 'transparent',
      focusedBorderColor: withPaletteNumber(focusColor, 500),
      textColor,
      placeholderColor,
      labelColor,
      helperColor,
    }
  }, [colorScheme, isDisabled, isFocused, isInvalid, theme, variant])
}
