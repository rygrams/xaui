import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type SliderOrientation = 'horizontal' | 'vertical'

export type SliderMark = {
  /**
   * Value where the mark should be displayed.
   */
  value: number
  /**
   * Optional label for the mark.
   */
  label?: ReactNode
}

type SliderCustomAppearance = {
  /**
   * Custom style for the root container.
   */
  container?: ViewStyle
  /**
   * Custom style for the label row.
   */
  header?: ViewStyle
  /**
   * Custom style for the label text.
   */
  label?: TextStyle
  /**
   * Custom style for the value text.
   */
  value?: TextStyle
  /**
   * Custom style for track container.
   */
  trackContainer?: ViewStyle
  /**
   * Custom style for track background.
   */
  track?: ViewStyle
  /**
   * Custom style for filled track.
   */
  fill?: ViewStyle
  /**
   * Custom style for thumb.
   */
  thumb?: ViewStyle
  /**
   * Custom style for step dots.
   */
  step?: ViewStyle
  /**
   * Custom style for active step dots.
   */
  activeStep?: ViewStyle
  /**
   * Custom style for mark container.
   */
  mark?: ViewStyle
  /**
   * Custom style for mark label.
   */
  markLabel?: TextStyle
}

export type SliderProps = {
  /**
   * Controlled slider value.
   */
  value?: number
  /**
   * Default value in uncontrolled mode.
   */
  defaultValue?: number
  /**
   * Minimum allowed value.
   * @default 0
   */
  minValue?: number
  /**
   * Maximum allowed value.
   * @default 100
   */
  maxValue?: number
  /**
   * Value step increment.
   * @default 1
   */
  step?: number
  /**
   * Slider label.
   */
  label?: ReactNode
  /**
   * Whether to show the numeric value text.
   * @default false
   */
  showValueLabel?: boolean
  /**
   * Number formatting options for value label.
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * Optional static marks.
   */
  marks?: SliderMark[]
  /**
   * Show one step dot per step.
   * @default false
   */
  showSteps?: boolean
  /**
   * Slider orientation.
   * @default 'horizontal'
   */
  orientation?: SliderOrientation
  /**
   * Size of track and thumb.
   * @default 'md'
   */
  size?: Size
  /**
   * Theme color for fill/thumb.
   * @default 'primary'
   */
  color?: ThemeColor
  /**
   * Border radius for track.
   * @default 'full'
   */
  radius?: Radius
  /**
   * Optional content before track.
   */
  startContent?: ReactNode
  /**
   * Optional content after track.
   */
  endContent?: ReactNode
  /**
   * Whether interactions are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether value is read-only.
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Optional track length in pixels.
   * When omitted, the slider uses available layout size.
   */
  trackLength?: number
  /**
   * Callback fired on value changes.
   */
  onChange?: (value: number) => void
  /**
   * Callback fired when interaction ends.
   */
  onChangeEnd?: (value: number) => void
  /**
   * Custom style overrides.
   */
  customAppearance?: SliderCustomAppearance
}
