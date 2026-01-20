import { ThemeColor } from '../../types'

export type ProgressVariant = 'linear' | 'circular'

export type ProgressIndicatorProps = {
  variant?: ProgressVariant
  size?: number
  themeColor?: ThemeColor
  color?: string
  backgroundColor?: string
  value: number
  disableAnimation?: boolean
  borderRadius?: number
}
