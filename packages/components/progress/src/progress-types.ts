export type StrokeCap = 'round' | 'butt' | 'square'

export type ProgressBaseProps = {
  size?: number
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  color?: string
  backgroundColor?: string
  strokeCap?: StrokeCap
  value?: number
  disableAnimation?: boolean
}

export type CircularProgressIndicatorProps = ProgressBaseProps & {
  strokeWidth?: number
}

export type ActivityIndicatorProps = {
  size?: number
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  color?: string
  disableAnimation?: boolean
}

export type CircularActivityIndicatorProps = ActivityIndicatorProps & {
  variant?: 'ticks' | 'bullets' | 'spinner'
}
