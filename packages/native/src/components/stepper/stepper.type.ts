import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { Size, ThemeColor } from '../../types'

export type StepperDirection = 'horizontal' | 'vertical'
export type StepperLineDisplayMode = 'progress' | 'all'

export type StepperSize = Exclude<Size, 'xs'>

export type StepperItemIndicatorState = {
  index: number
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
  isDisabled: boolean
}

export type StepperCustomAppearance = {
  container?: StyleProp<ViewStyle>
  itemContainer?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
  activeLine?: StyleProp<ViewStyle>
}

export type StepperItemCustomAppearance = {
  container?: StyleProp<ViewStyle>
  indicator?: StyleProp<ViewStyle>
  activeIndicator?: StyleProp<ViewStyle>
  completedIndicator?: StyleProp<ViewStyle>
  lockedIndicator?: StyleProp<ViewStyle>
  title?: StyleProp<TextStyle>
  description?: StyleProp<TextStyle>
}

export type StepperProps = {
  /**
   * StepperItem children.
   */
  children: ReactNode
  /**
   * Direction of the stepper layout.
   * @default 'horizontal'
   */
  direction?: StepperDirection
  /**
   * Whether connector lines between steps are shown.
   * @default true
   */
  showLines?: boolean
  /**
   * Controls connector line visibility.
   * - `progress`: only progress to current step is shown.
   * - `all`: all connectors are shown with progress highlight.
   * @default 'progress'
   */
  lineDisplayMode?: StepperLineDisplayMode
  /**
   * Controlled active step key.
   */
  activeKey?: string
  /**
   * Uncontrolled default active step key.
   */
  defaultActiveKey?: string
  /**
   * Callback fired when active step changes.
   */
  onStepChange?: (key: string) => void
  /**
   * Shared theme color.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Shared stepper size.
   * @default 'md'
   */
  size?: StepperSize
  /**
   * Whether all steps are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Stepper container style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom appearance styles.
   */
  customAppearance?: StepperCustomAppearance
}

export type StepperItemProps = {
  /**
   * Unique key for this step.
   */
  itemKey: string
  /**
   * Main title/label.
   */
  title?: ReactNode
  /**
   * Optional secondary description.
   */
  description?: ReactNode
  /**
   * Custom indicator content or indicator render function.
   */
  indicator?:
    | ReactNode
    | ((state: StepperItemIndicatorState) => ReactNode)
  /**
   * Locks this step from interaction.
   * @default false
   */
  isLocked?: boolean
  /**
   * Disables this step from interaction.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Additional content rendered below title/description.
   */
  children?: ReactNode
  /**
   * Callback fired when this item is pressed.
   */
  onPress?: (itemKey: string) => void
  /**
   * Custom style for this item.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom appearance styles.
   */
  customAppearance?: StepperItemCustomAppearance
}
