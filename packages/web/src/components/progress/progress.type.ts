export type ProgressVariant = 'linear' | 'circular'

export interface ProgressProps {
  /**
   * The current value of the progress bar (0 to 1).
   */
  value: number
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
   * The color of the progress indicator.
   * Supports tailwind colors or hex.
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
   * Custom class names for the component.
   */
  className?: string
}
