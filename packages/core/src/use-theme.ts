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

interface UseXUIThemeReturn {
  primary: ColorAccessor
  onPrimary: ColorAccessor
  primarySurface: ColorAccessor
  secondary: ColorAccessor
  onSecondary: ColorAccessor
  secondarySurface: ColorAccessor
  neutral: ColorAccessor
  onNeutral: ColorAccessor
  neutralSurface: ColorAccessor
  danger: ColorAccessor
  onDanger: ColorAccessor
  dangerSurface: ColorAccessor
  warning: ColorAccessor
  onWarning: ColorAccessor
  warningSurface: ColorAccessor
  success: ColorAccessor
  onSuccess: ColorAccessor
  successSurface: ColorAccessor
  inverse: ColorAccessor
  onInverse: ColorAccessor
  inverseSurface: ColorAccessor
  default: ColorAccessor
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
      onPrimary: createAccessor(
        () => theme.colors.onPrimary,
        color => dispatch({ type: 'SET_ON_PRIMARY', color })
      ),
      primarySurface: createAccessor(
        () => theme.colors.primarySurface,
        color => dispatch({ type: 'SET_PRIMARY_SURFACE', color })
      ),
      secondary: createAccessor(
        () => theme.colors.secondary,
        color => dispatch({ type: 'SET_SECONDARY', color })
      ),
      onSecondary: createAccessor(
        () => theme.colors.onSecondary,
        color => dispatch({ type: 'SET_ON_SECONDARY', color })
      ),
      secondarySurface: createAccessor(
        () => theme.colors.secondarySurface,
        color => dispatch({ type: 'SET_SECONDARY_SURFACE', color })
      ),
      neutral: createAccessor(
        () => theme.colors.neutral,
        color => dispatch({ type: 'SET_NEUTRAL', color })
      ),
      onNeutral: createAccessor(
        () => theme.colors.onNeutral,
        color => dispatch({ type: 'SET_ON_NEUTRAL', color })
      ),
      neutralSurface: createAccessor(
        () => theme.colors.neutralSurface,
        color => dispatch({ type: 'SET_NEUTRAL_SURFACE', color })
      ),
      danger: createAccessor(
        () => theme.colors.danger,
        color => dispatch({ type: 'SET_DANGER', color })
      ),
      onDanger: createAccessor(
        () => theme.colors.onDanger,
        color => dispatch({ type: 'SET_ON_DANGER', color })
      ),
      dangerSurface: createAccessor(
        () => theme.colors.dangerSurface,
        color => dispatch({ type: 'SET_DANGER_SURFACE', color })
      ),
      warning: createAccessor(
        () => theme.colors.warning,
        color => dispatch({ type: 'SET_WARNING', color })
      ),
      onWarning: createAccessor(
        () => theme.colors.onWarning,
        color => dispatch({ type: 'SET_ON_WARNING', color })
      ),
      warningSurface: createAccessor(
        () => theme.colors.warningSurface,
        color => dispatch({ type: 'SET_WARNING_SURFACE', color })
      ),
      success: createAccessor(
        () => theme.colors.success,
        color => dispatch({ type: 'SET_SUCCESS', color })
      ),
      onSuccess: createAccessor(
        () => theme.colors.onSuccess,
        color => dispatch({ type: 'SET_ON_SUCCESS', color })
      ),
      successSurface: createAccessor(
        () => theme.colors.successSurface,
        color => dispatch({ type: 'SET_SUCCESS_SURFACE', color })
      ),
      inverse: createAccessor(
        () => theme.colors.inverse,
        color => dispatch({ type: 'SET_INVERSE', color })
      ),
      onInverse: createAccessor(
        () => theme.colors.onInverse,
        color => dispatch({ type: 'SET_ON_INVERSE', color })
      ),
      inverseSurface: createAccessor(
        () => theme.colors.inverseSurface,
        color => dispatch({ type: 'SET_INVERSE_SURFACE', color })
      ),
      default: createAccessor(
        () => theme.colors.default,
        color => dispatch({ type: 'SET_DEFAULT', color })
      ),
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
