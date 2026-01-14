import { colors } from '@xaui/colors'

export type ColorRole = {
  main: string
  foreground: string
  surface: string
}

export type ThemeColors = {
  primary: ColorRole
  secondary: ColorRole
  danger: ColorRole
  warning: ColorRole
  success: ColorRole
  default: ColorRole
  background: string
}

export const themeColors: ThemeColors = {
  primary: {
    main: colors.blue[600],
    foreground: colors.white,
    surface: colors.blue[100],
  },
  secondary: {
    main: colors.purple[600],
    foreground: colors.white,
    surface: colors.purple[100],
  },
  danger: {
    main: colors.red[600],
    foreground: colors.white,
    surface: colors.red[100],
  },
  warning: {
    main: colors.amber[600],
    foreground: colors.gray[900],
    surface: colors.amber[100],
  },
  success: {
    main: colors.green[600],
    foreground: colors.white,
    surface: colors.green[100],
  },
  default: {
    main: colors.white,
    foreground: colors.gray[900],
    surface: colors.gray[100],
  },
  background: colors.white,
}

export const darkThemeColors: ThemeColors = {
  primary: {
    main: colors.blue[500],
    foreground: colors.gray[900],
    surface: colors.blue[900],
  },
  secondary: {
    main: colors.purple[500],
    foreground: colors.gray[900],
    surface: colors.purple[900],
  },
  danger: {
    main: colors.red[500],
    foreground: colors.gray[900],
    surface: colors.red[900],
  },
  warning: {
    main: colors.amber[500],
    foreground: colors.gray[900],
    surface: colors.amber[900],
  },
  success: {
    main: colors.green[500],
    foreground: colors.gray[900],
    surface: colors.green[900],
  },
  default: {
    main: colors.gray[200],
    foreground: colors.gray[900],
    surface: colors.gray[700],
  },
  background: colors.gray[900],
}
