import { colors } from '../tokens'

export type ColorScheme = {
  main: string
  onMain: string
  container: string
  onContainer: string
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
    main: colors.purple[500],
    onMain: colors.purple[50],
    container: colors.purple[200],
    onContainer: colors.purple[800],
  },
  secondary: {
    main: colors.pink[500],
    onMain: colors.pink[50],
    container: colors.pink[200],
    onContainer: colors.pink[700],
  },
  tertiary: {
    main: colors.stone[500],
    onMain: colors.white,
    container: colors.stone[100],
    onContainer: colors.stone[700],
  },
  danger: {
    main: colors.red[700],
    onMain: colors.white,
    container: colors.rose[200],
    onContainer: colors.red[700],
  },
  warning: {
    main: colors.amber[600],
    onMain: colors.gray[900],
    container: colors.amber[100],
    onContainer: colors.amber[600],
  },
  success: {
    main: colors.green[600],
    onMain: colors.white,
    container: colors.green[100],
    onContainer: colors.green[600],
  },
  default: {
    main: colors.gray[700],
    onMain: colors.gray[50],
    container: colors.gray[200],
    onContainer: colors.gray[800],
  },
  background: colors.white,
  foreground: colors.zinc[900],
}

export const darkThemeColors: ThemeColors = {
  primary: {
    main: colors.purple[300],
    onMain: colors.purple[950],
    container: colors.purple[900],
    onContainer: colors.purple[300],
  },
  secondary: {
    main: colors.pink[300],
    onMain: colors.pink[950],
    container: colors.pink[900],
    onContainer: colors.pink[300],
  },
  tertiary: {
    main: colors.stone[300],
    onMain: colors.stone[950],
    container: colors.stone[900],
    onContainer: colors.stone[300],
  },
  danger: {
    main: colors.red[300],
    onMain: colors.red[950],
    container: colors.red[800],
    onContainer: colors.red[300],
  },
  warning: {
    main: colors.amber[400],
    onMain: colors.gray[950],
    container: colors.amber[900],
    onContainer: colors.amber[400],
  },
  success: {
    main: colors.green[400],
    onMain: colors.gray[950],
    container: colors.green[900],
    onContainer: colors.green[400],
  },
  default: {
    main: colors.gray[300],
    onMain: colors.gray[900],
    container: colors.gray[800],
    onContainer: colors.gray[300],
  },
  background: colors.zinc[900],
  foreground: colors.stone[200],
}
