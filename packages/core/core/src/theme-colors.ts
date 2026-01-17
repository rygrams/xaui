import { colors } from '@xaui/colors'

export type ColorScheme = {
  main: string
  foreground: string
  background: string
}

export type ThemeColors = {
  primary: ColorScheme
  secondary: ColorScheme
  tertiary: ColorScheme
  danger: ColorScheme
  warning: ColorScheme
  success: ColorScheme
  default: ColorScheme
  background: string
  foreground: string
}

export const themeColors: ThemeColors = {
  primary: {
    main: colors.blue[600],
    foreground: colors.white,
    background: colors.blue[100],
  },
  secondary: {
    main: colors.purple[600],
    foreground: colors.white,
    background: colors.purple[100],
  },
  tertiary: {
    main: colors.orange[600],
    foreground: colors.white,
    background: colors.orange[100],
  },
  danger: {
    main: colors.red[600],
    foreground: colors.white,
    background: colors.red[100],
  },
  warning: {
    main: colors.amber[600],
    foreground: colors.gray[900],
    background: colors.amber[100],
  },
  success: {
    main: colors.green[600],
    foreground: colors.white,
    background: colors.green[100],
  },
  default: {
    main: colors.white,
    foreground: colors.gray[900],
    background: colors.gray[100],
  },
  background: colors.white,
  foreground: colors.gray[900],
}

export const darkThemeColors: ThemeColors = {
  primary: {
    main: colors.blue[500],
    foreground: colors.gray[900],
    background: colors.blue[900],
  },
  secondary: {
    main: colors.purple[500],
    foreground: colors.gray[900],
    background: colors.purple[900],
  },
  tertiary: {
    main: colors.orange[500],
    foreground: colors.gray[900],
    background: colors.orange[900],
  },
  danger: {
    main: colors.red[500],
    foreground: colors.gray[900],
    background: colors.red[900],
  },
  warning: {
    main: colors.amber[500],
    foreground: colors.gray[900],
    background: colors.amber[900],
  },
  success: {
    main: colors.green[500],
    foreground: colors.gray[900],
    background: colors.green[900],
  },
  default: {
    main: colors.gray[200],
    foreground: colors.gray[900],
    background: colors.gray[700],
  },
  background: colors.gray[900],
  foreground: colors.white,
}
