import { useContext, useCallback, useMemo } from 'react'
import { XUIThemeContext, XUIThemeDispatchContext } from './theme'

import type {
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeFontFamilies,
  ThemeShadows,
} from './theme-config'

interface ColorAccessor {
  color: string
  setColor: (color: string) => void
  toString(): string
}

interface TextColorAccessor {
  primary: ColorAccessor
  secondary: ColorAccessor
  tertiary: ColorAccessor
  disabled: ColorAccessor
  inverse: ColorAccessor
}

interface BackgroundColorAccessor {
  primary: ColorAccessor
  secondary: ColorAccessor
  tertiary: ColorAccessor
  inverse: ColorAccessor
}

interface BorderColorAccessor {
  primary: ColorAccessor
  secondary: ColorAccessor
  focus: ColorAccessor
}

interface UseXUIThemeReturn {
  primary: ColorAccessor
  secondary: ColorAccessor
  success: ColorAccessor
  warning: ColorAccessor
  error: ColorAccessor
  info: ColorAccessor
  text: TextColorAccessor
  background: BackgroundColorAccessor
  border: BorderColorAccessor
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  fontFamilies: ThemeFontFamilies
  shadows: ThemeShadows
}

export function useXUITheme(): UseXUIThemeReturn {
  const theme = useContext(XUIThemeContext)
  const dispatch = useContext(XUIThemeDispatchContext)

  if (!theme || !dispatch) {
    throw new Error('useTheme must be used within XAUIProvider')
  }

  const createAccessor = useCallback(
    (getter: () => string, setter: (value: string) => void): ColorAccessor => ({
      get color() {
        return getter()
      },
      toString: () => getter(),
      setColor: setter,
    }),
    []
  )

  return useMemo(
    () => ({
      primary: createAccessor(
        () => theme.colors.primary,
        color => dispatch({ type: 'SET_PRIMARY', color })
      ),
      secondary: createAccessor(
        () => theme.colors.secondary,
        color => dispatch({ type: 'SET_SECONDARY', color })
      ),
      success: createAccessor(
        () => theme.colors.success,
        color => dispatch({ type: 'SET_SUCCESS', color })
      ),
      warning: createAccessor(
        () => theme.colors.warning,
        color => dispatch({ type: 'SET_WARNING', color })
      ),
      error: createAccessor(
        () => theme.colors.error,
        color => dispatch({ type: 'SET_ERROR', color })
      ),
      info: createAccessor(
        () => theme.colors.info,
        color => dispatch({ type: 'SET_INFO', color })
      ),
      text: {
        primary: createAccessor(
          () => theme.colors.text.primary,
          color => dispatch({ type: 'SET_TEXT_PRIMARY', color })
        ),
        secondary: createAccessor(
          () => theme.colors.text.secondary,
          color => dispatch({ type: 'SET_TEXT_SECONDARY', color })
        ),
        tertiary: createAccessor(
          () => theme.colors.text.tertiary,
          color => dispatch({ type: 'SET_TEXT_TERTIARY', color })
        ),
        disabled: createAccessor(
          () => theme.colors.text.disabled,
          color => dispatch({ type: 'SET_TEXT_DISABLED', color })
        ),
        inverse: createAccessor(
          () => theme.colors.text.inverse,
          color => dispatch({ type: 'SET_TEXT_INVERSE', color })
        ),
      },
      background: {
        primary: createAccessor(
          () => theme.colors.background.primary,
          color => dispatch({ type: 'SET_BACKGROUND_PRIMARY', color })
        ),
        secondary: createAccessor(
          () => theme.colors.background.secondary,
          color => dispatch({ type: 'SET_BACKGROUND_SECONDARY', color })
        ),
        tertiary: createAccessor(
          () => theme.colors.background.tertiary,
          color => dispatch({ type: 'SET_BACKGROUND_TERTIARY', color })
        ),
        inverse: createAccessor(
          () => theme.colors.background.inverse,
          color => dispatch({ type: 'SET_BACKGROUND_INVERSE', color })
        ),
      },
      border: {
        primary: createAccessor(
          () => theme.colors.border.primary,
          color => dispatch({ type: 'SET_BORDER_PRIMARY', color })
        ),
        secondary: createAccessor(
          () => theme.colors.border.secondary,
          color => dispatch({ type: 'SET_BORDER_SECONDARY', color })
        ),
        focus: createAccessor(
          () => theme.colors.border.focus,
          color => dispatch({ type: 'SET_BORDER_FOCUS', color })
        ),
      },
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      fontSizes: theme.fontSizes,
      fontWeights: theme.fontWeights,
      fontFamilies: theme.fontFamilies,
      shadows: theme.shadows,
    }),
    [theme, dispatch, createAccessor]
  )
}
