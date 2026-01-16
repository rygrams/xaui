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
  isAnimate?: boolean
}

export type CircularProgressIndicatorProps = ProgressBaseProps & {
  strokeWidth?: number
}

export type CupertinoActivityIndicatorProps = {
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
  isAnimate?: boolean
}
