import { ThemeColor } from '../../types'

export type ProgressVariant = 'linear' | 'circular'

export type ProgressIndicatorProps = {
  /**
   * The variant of the progress indicator.
   * @default 'linear'
   */
  variant?: ProgressVariant
  /**
   * The size of the progress indicator (height for linear, diameter for circular).
   * @default 4 for linear, 40 for circular
   */
  size?: number
  /**
   * The theme color of the progress indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The custom color of the progress indicator.
   * Overrides themeColor.
   */
  color?: string
  /**
   * The background color of the track.
   */
  backgroundColor?: string
  /**
   * The current value of the progress bar (0 to 1).
   */
  value: number
  /**
   * Whether to disable the animation.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * The border radius of the indicator and track.
   */
  borderRadius?: number
}
