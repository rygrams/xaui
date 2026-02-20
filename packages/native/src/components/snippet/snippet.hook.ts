import { useMemo } from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type {
  CopyButtonPosition,
  SnippetVariant,
} from './snippet.type'
import type { ThemeColor } from '../../types'

type SnippetColors = {
  containerBackground: string
  containerBorder: string
  text: string
  copyButtonBackground: string
  copyButtonBorder: string
  copyButtonText: string
}

export const useSnippetColors = (
  themeColor: ThemeColor,
  variant: SnippetVariant,
  isDisabled: boolean
): SnippetColors => {
  const theme = useXUITheme()

  return useMemo(() => {
    const safeThemeColor = getSafeThemeColor(themeColor)
    const colorScheme = theme.colors[safeThemeColor]
    const isDark = theme.mode === 'dark'

    const textColor = isDisabled
      ? withOpacity(theme.colors.foreground, 0.56)
      : theme.colors.foreground

    if (variant === 'flat') {
      return {
        containerBackground: colorScheme.background,
        containerBorder: 'transparent',
        text: textColor,
        copyButtonBackground: withOpacity(colorScheme.main, isDark ? 0.2 : 0.14),
        copyButtonBorder: 'transparent',
        copyButtonText: colorScheme.main,
      }
    }

    if (variant === 'light') {
      return {
        containerBackground: withOpacity(colorScheme.main, isDark ? 0.12 : 0.08),
        containerBorder: 'transparent',
        text: textColor,
        copyButtonBackground: 'transparent',
        copyButtonBorder: 'transparent',
        copyButtonText: colorScheme.main,
      }
    }

    return {
      containerBackground: theme.colors.background,
      containerBorder: withOpacity(colorScheme.main, isDark ? 0.7 : 0.55),
      text: textColor,
      copyButtonBackground: withOpacity(colorScheme.main, isDark ? 0.16 : 0.08),
      copyButtonBorder: withOpacity(colorScheme.main, isDark ? 0.48 : 0.32),
      copyButtonText: colorScheme.main,
    }
  }, [isDisabled, theme, themeColor, variant])
}

export const useCopyButtonPositionStyles = (position: CopyButtonPosition) => {
  return useMemo(
    () => ({
      isTop: position.startsWith('top'),
      isLeft: position.endsWith('left'),
      isInline: position.startsWith('inline'),
    }),
    [position]
  )
}
