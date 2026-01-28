import { colors } from '../tokens'

export type ColorScheme = {
  main: string
  accent: string
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
    accent: colors.purple[950],
    foreground: colors.white,
    background: colors.purple[200],
  },
  secondary: {
    main: colors.zinc[500],
    accent: colors.neutral[800],
    foreground: colors.white,
    background: colors.purple[200],
  },
  tertiary: {
    main: colors.stone[500],
    accent: colors.orange[950],
    foreground: colors.white,
    background: colors.red[100],
  },
  danger: {
    main: colors.red[700],
    accent: colors.red[950],
    foreground: colors.white,
    background: colors.rose[200],
  },
  warning: {
    main: colors.amber[600],
    accent: colors.amber[900],
    foreground: colors.gray[900],
    background: colors.amber[100],
  },
  success: {
    main: colors.green[600],
    accent: colors.green[900],
    foreground: colors.white,
    background: colors.green[100],
  },
  default: {
    main: colors.white,
    accent: colors.zinc[700],
    foreground: colors.zinc[900],
    background: colors.zinc[200],
  },

  background: colors.white,
  foreground: colors.zinc[900],
}

export const darkThemeColors: ThemeColors = {
  primary: {
    main: colors.purple[300],
    accent: colors.purple[200],
    foreground: colors.purple[950],
    background: colors.purple[900],
  },
  secondary: {
    main: colors.zinc[300],
    accent: colors.purple[200],
    foreground: colors.zinc[700],
    background: colors.zinc[600],
  },
  tertiary: {
    main: colors.red[200],
    accent: colors.red[100],
    foreground: colors.pink[950],
    background: colors.stone[600],
  },
  danger: {
    main: colors.red[300],
    accent: colors.red[300],
    foreground: colors.rose[950],
    background: colors.red[800],
  },
  warning: {
    main: colors.amber[400],
    accent: colors.amber[100],
    foreground: colors.gray[50],
    background: colors.amber[900],
  },
  success: {
    main: colors.green[400],
    accent: colors.green[200],
    foreground: colors.gray[50],
    background: colors.green[900],
  },
  default: {
    main: colors.zinc[900],
    accent: colors.stone[300],
    foreground: colors.stone[200],
    background: colors.zinc[700],
  },
  background: colors.zinc[900],
  foreground: colors.stone[200],
}
