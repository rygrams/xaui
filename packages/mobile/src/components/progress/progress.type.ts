export type ProgressVariant = 'linear' | 'circular'

export type ProgressThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'default'

type ProgressBaseProps = {
  size?: number
  themeColor?: ProgressThemeColor
  color?: string
  backgroundColor?: string
  value: number
  disableAnimation?: boolean
  borderRadius?: number
}

export type LinearProgressProps = ProgressBaseProps & {
  variant?: 'linear'
}

export type CircularProgressProps = ProgressBaseProps & {
  variant: 'circular'
}

export type ProgressProps = LinearProgressProps | CircularProgressProps
