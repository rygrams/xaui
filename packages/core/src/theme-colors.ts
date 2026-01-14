import { colors } from '@xaui/colors'

export type ThemeColors = {
  primary: string
  onPrimary: string
  primarySurface: string

  secondary: string
  onSecondary: string
  secondarySurface: string

  danger: string
  onDanger: string
  dangerSurface: string

  warning: string
  onWarning: string
  warningSurface: string

  success: string
  onSuccess: string
  successSurface: string

  default: string
  onDefault: string
  defaultSurface: string

  background: string
  onBackground: string
}

export const themeColors: ThemeColors = {
  primary: colors.blue[600],
  onPrimary: colors.white,
  primarySurface: colors.blue[100],

  secondary: colors.purple[600],
  onSecondary: colors.white,
  secondarySurface: colors.purple[100],

  danger: colors.red[600],
  onDanger: colors.white,
  dangerSurface: colors.red[100],

  warning: colors.amber[600],
  onWarning: colors.gray[900],
  warningSurface: colors.amber[100],

  success: colors.green[600],
  onSuccess: colors.white,
  successSurface: colors.green[100],

  default: colors.white,
  onDefault: colors.gray[900],
  defaultSurface: colors.gray[100],

  background: colors.white,
  onBackground: colors.gray[900],
}

export const darkThemeColors: ThemeColors = {
  primary: colors.blue[500],
  onPrimary: colors.gray[900],
  primarySurface: colors.blue[900],

  secondary: colors.purple[500],
  onSecondary: colors.gray[900],
  secondarySurface: colors.purple[900],

  danger: colors.red[500],
  onDanger: colors.gray[900],
  dangerSurface: colors.red[900],

  warning: colors.amber[500],
  onWarning: colors.gray[900],
  warningSurface: colors.amber[900],

  success: colors.green[500],
  onSuccess: colors.gray[900],
  successSurface: colors.green[900],

  default: colors.gray[200],
  onDefault: colors.gray[900],
  defaultSurface: colors.gray[700],

  background: colors.gray[900],
  onBackground: colors.white,
}
