import { colors } from '@xaui/colors'

export const themeColors: ThemeColors = {
  primary: colors.blue[600],
  onPrimary: colors.white,
  primarySurface: colors.blue[100],

  secondary: colors.purple[600],
  onSecondary: colors.white,
  secondarySurface: colors.purple[100],

  neutral: colors.gray[600],
  onNeutral: colors.white,
  neutralSurface: colors.gray[100],

  danger: colors.red[600],
  onDanger: colors.white,
  dangerSurface: colors.red[100],

  warning: colors.amber[600],
  onWarning: colors.gray[900],
  warningSurface: colors.amber[100],

  success: colors.green[600],
  onSuccess: colors.white,
  successSurface: colors.green[100],

  inverse: colors.gray[900],
  onInverse: colors.white,
  inverseSurface: colors.gray[800],

  default: colors.gray[700],
}

export const darkThemeColors: ThemeColors = {
  primary: colors.blue[500],
  onPrimary: colors.gray[900],
  primarySurface: colors.blue[900],

  secondary: colors.purple[500],
  onSecondary: colors.gray[900],
  secondarySurface: colors.purple[900],

  neutral: colors.gray[500],
  onNeutral: colors.gray[900],
  neutralSurface: colors.gray[800],

  danger: colors.red[500],
  onDanger: colors.gray[900],
  dangerSurface: colors.red[900],

  warning: colors.amber[500],
  onWarning: colors.gray[900],
  warningSurface: colors.amber[900],

  success: colors.green[500],
  onSuccess: colors.gray[900],
  successSurface: colors.green[900],

  inverse: colors.white,
  onInverse: colors.gray[900],
  inverseSurface: colors.gray[100],

  default: colors.gray[200],
}

export type ThemeColors = {
  primary: string
  onPrimary: string
  primarySurface: string

  secondary: string
  onSecondary: string
  secondarySurface: string

  neutral: string
  onNeutral: string
  neutralSurface: string

  danger: string
  onDanger: string
  dangerSurface: string

  warning: string
  onWarning: string
  warningSurface: string

  success: string
  onSuccess: string
  successSurface: string

  inverse: string
  onInverse: string
  inverseSurface: string

  default: string
}
