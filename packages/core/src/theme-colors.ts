import { colors } from '@xaui/colors'
import type { ThemeColors } from './theme'

export const themeColors: ThemeColors = {
  primary: colors.blue[600],
  secondary: colors.purple[600],
  success: colors.green[600],
  warning: colors.amber[600],
  error: colors.red[600],
  info: colors.sky[600],

  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
    tertiary: colors.gray[500],
    disabled: colors.gray[400],
    inverse: colors.white,
  },

  background: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    inverse: colors.gray[900],
  },

  border: {
    primary: colors.gray[300],
    secondary: colors.gray[200],
    focus: colors.blue[600],
  },
}

export const darkThemeColors: ThemeColors = {
  primary: colors.blue[500],
  secondary: colors.purple[500],
  success: colors.green[500],
  warning: colors.amber[500],
  error: colors.red[500],
  info: colors.sky[500],

  text: {
    primary: colors.gray[100],
    secondary: colors.gray[300],
    tertiary: colors.gray[400],
    disabled: colors.gray[500],
    inverse: colors.gray[900],
  },

  background: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
    inverse: colors.white,
  },

  border: {
    primary: colors.gray[600],
    secondary: colors.gray[700],
    focus: colors.blue[500],
  },
}
