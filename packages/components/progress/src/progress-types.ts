export type StrokeCap = 'round' | 'butt' | 'square'

export type ProgressIndicatorProps = {
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
  value: number
  disableAnimation?: boolean
}

export type CircularProgressIndicatorProps = ProgressIndicatorProps & {
  strokeCap?: StrokeCap
}

export type LinearProgressIndicatorProps = ProgressIndicatorProps & {
  borderRadius?: number
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
  backgroundColor?: string
}

export type CircularActivityIndicatorProps = ActivityIndicatorProps & {
  variant?: 'ticks' | 'bullets' | 'spinner'
}

export type LinearActivityIndicatorProps = ActivityIndicatorProps & {
  borderRadius?: number
}
