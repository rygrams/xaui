import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'

export type SnippetVariant = 'outlined' | 'flat' | 'light'
export type CopyButtonPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type SnippetCustomAppearance = {
  container?: StyleProp<ViewStyle>
  content?: StyleProp<ViewStyle>
  text?: StyleProp<TextStyle>
  copyButton?: StyleProp<ViewStyle>
  copyButtonText?: StyleProp<TextStyle>
}

export type SnippetProps = {
  /**
   * Text content displayed in the snippet.
   */
  value: string
  /**
   * Theme color used for variant styling.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Visual style variant.
   * @default 'outlined'
   */
  variant?: SnippetVariant
  /**
   * Snippet border radius.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Position of the copy button in the snippet container.
   * @default 'top-right'
   */
  copyButtonPosition?: CopyButtonPosition
  /**
   * Copy button label.
   * @default 'Copy'
   */
  copyLabel?: string
  /**
   * Label shown after a successful copy action.
   * @default 'Copied'
   */
  copiedLabel?: string
  /**
   * Delay in milliseconds before reverting copied state.
   * @default 1500
   */
  copyResetDelay?: number
  /**
   * Whether the snippet should occupy all available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Whether the snippet is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Number of lines to clamp the snippet text.
   */
  numberOfLines?: number
  /**
   * Font size for snippet text.
   * @default 14
   */
  fontSize?: number
  /**
   * Font weight for snippet text.
   * @default '400'
   */
  fontWeight?: TextStyle['fontWeight']
  /**
   * Callback fired after copy action.
   */
  onCopy?: (value: string, isSuccess: boolean) => void
  /**
   * Optional custom styles for snippet parts.
   */
  customAppearance?: SnippetCustomAppearance
}
