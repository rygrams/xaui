import { ThemeColor } from '../../types'

export type ActivityIndicatorVariant = 'linear' | 'circular'

export type ActivityIndicatorProps = {
  /**
   * The variant of activity indicator.
   * @default 'circular'
   */
  variant?: ActivityIndicatorVariant
  /**
   * The size of the activity indicator (height for linear, diameter for circular).
   * @default 4 for linear, 40 for circular
   */
  size?: number
  /**
   * The theme color of the activity indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The custom color of the activity indicator.
   * Overrides themeColor.
   */
  color?: string
  /**
   * The background color of the track.
   */
  backgroundColor?: string
  /**
   * Whether to disable the animation.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * The border radius of the indicator and track.
   */
  borderRadius?: number
  /**
   * Show track for the activity indicator.
   */
  showTrack?: boolean
  /**
   * Custom class name to be applied to the activity indicator.
   */
  className?: string
}
