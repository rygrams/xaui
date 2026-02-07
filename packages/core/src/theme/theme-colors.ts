import { colors } from '../tokens'

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
    main: colors.purple[800],
    foreground: colors.white,
    background: colors.purple[200],
  },
  secondary: {
    main: colors.zinc[500],
    foreground: colors.white,
    background: colors.purple[200],
  },
  tertiary: {
    main: colors.stone[500],
    foreground: colors.white,
    background: colors.red[100],
  },
  danger: {
    main: colors.red[700],
    foreground: colors.white,
    background: colors.rose[200],
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
    main: colors.zinc[900],
    foreground: colors.white,
    background: colors.zinc[200],
  },

  background: colors.white,
  foreground: colors.zinc[900],
}

export const darkThemeColors: ThemeColors = {
  primary: {
    main: colors.purple[300],
    foreground: colors.purple[950],
    background: colors.purple[900],
  },
  secondary: {
    main: colors.zinc[300],
    foreground: colors.zinc[700],
    background: colors.zinc[600],
  },
  tertiary: {
    main: colors.red[200],
    foreground: colors.pink[950],
    background: colors.stone[600],
  },
  danger: {
    main: colors.red[300],
    foreground: colors.rose[950],
    background: colors.red[800],
  },
  warning: {
    main: colors.amber[400],
    foreground: colors.gray[50],
    background: colors.amber[900],
  },
  success: {
    main: colors.green[400],
    foreground: colors.gray[50],
    background: colors.green[900],
  },
  default: {
    main: colors.stone[200],
    foreground: colors.zinc[900],
    background: colors.zinc[700],
  },
  background: colors.zinc[900],
  foreground: colors.stone[200],
}
