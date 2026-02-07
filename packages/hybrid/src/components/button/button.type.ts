import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { ThemeColor } from '../../types'

export type ButtonVariant = 'solid' | 'outlined' | 'flat' | 'light' | 'faded'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type SpinnerPlacement = 'start' | 'end'
export type ElevationLevel = 0 | 1 | 2 | 3 | 4

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'disabled'
  | 'children'
  | 'onAnimationStart'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDrag'
> & {
  /**
   * The content to display in the button.
   */
  children: ReactNode
  /**
   * The theme color of the button.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the button.
   * @default 'solid'
   */
  variant?: ButtonVariant
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize
  /**
   * The border radius of the button.
   * @default 'md'
   */
  radius?: ButtonRadius
  /**
   * Content to display at the start of the button.
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the button.
   */
  endContent?: ReactNode
  /**
   * The placement of the spinner when isLoading is true.
   * @default 'start'
   */
  spinnerPlacement?: SpinnerPlacement
  /**
   * Whether the button should take the full width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether the button is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean
  /**
   * Elevation level from 0 to 4.
   * Does not apply to `outlined` and `light` variants.
   * @default 0
   */
  elevation?: ElevationLevel
}
