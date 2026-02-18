import type { ReactNode } from 'react'
import type { FlatListProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type ChatMessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error'

export type ChatMessage = {
  /**
   * Unique identifier for the message.
   */
  id: string
  /**
   * Text content of the message.
   */
  text: string
  /**
   * Whether the message was sent by the current user.
   */
  isSent: boolean
  /**
   * Date/time the message was sent.
   */
  timestamp: Date
  /**
   * Delivery status (only shown for sent messages).
   */
  status?: ChatMessageStatus
  /**
   * Avatar URI for received messages.
   */
  avatarUri?: string
  /**
   * Initials shown when no avatarUri is provided.
   */
  avatarInitials?: string
  /**
   * Whether to show the avatar next to this message.
   */
  showAvatar?: boolean
}

export type ChatScaffoldProps = {
  /**
   * List of messages to display.
   */
  messages: ChatMessage[]
  /**
   * App bar slot. Use ChatScaffoldAppBar or any ReactNode.
   */
  appBar?: ReactNode
  /**
   * Content rendered before the input area (e.g. action chips).
   */
  inputPrefix?: ReactNode
  /**
   * Controlled value of the text input.
   */
  inputValue?: string
  /**
   * Placeholder for the message input.
   * @default 'Type a message...'
   */
  inputPlaceholder?: string
  /**
   * Theme color for sent bubbles, input and action buttons.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Whether to show a loading indicator (e.g. loading older messages).
   * @default false
   */
  isLoading?: boolean
  /**
   * Whether to show the typing indicator.
   * @default false
   */
  isTyping?: boolean
  /**
   * Display name shown in the typing indicator label.
   */
  typingLabel?: string
  /**
   * Whether to show timestamps on messages.
   * @default true
   */
  showTimestamps?: boolean
  /**
   * Custom render function for each message bubble.
   */
  renderMessage?: (message: ChatMessage) => ReactNode
  /**
   * Custom render function for the send button.
   */
  renderSendButton?: (onPress: () => void, disabled: boolean) => ReactNode
  /**
   * Background color of the chat area.
   */
  backgroundColor?: string
  /**
   * Additional FlatList props for the messages list.
   */
  listProps?: Partial<FlatListProps<ChatMessage>>
  /**
   * Custom style for the root container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Offset from the top of the screen for KeyboardAvoidingView.
   * Set this to the height of any navigation header above the chat.
   * @default 90
   */
  keyboardVerticalOffset?: number
} & ChatScaffoldEvents

export type ChatScaffoldEvents = {
  /**
   * Called when the text input value changes.
   */
  onInputChange?: (value: string) => void
  /**
   * Called when the user presses send.
   */
  onSend?: (text: string) => void
  /**
   * Called when the attach button is pressed.
   */
  onAttach?: () => void
  /**
   * Called when the file button is pressed.
   * When provided, a file icon button is shown on the left of the input.
   */
  onFile?: () => void
  /**
   * Called when the list is scrolled to the top (load older messages).
   */
  onEndReached?: () => void
}

export type ChatScaffoldAppBarProps = {
  /**
   * Display name of the chat contact/group.
   */
  title: string
  /**
   * Subtitle (status, last seen, group members count…).
   */
  subtitle?: string
  /**
   * Avatar URI for the contact.
   */
  avatarUri?: string
  /**
   * Initials shown when no avatarUri is provided.
   */
  avatarInitials?: string
  /**
   * Whether to show an online indicator on the avatar.
   * @default false
   */
  isOnline?: boolean
  /**
   * Theme color used for the avatar and online indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Action buttons placed in the end slot.
   */
  actions?: ReactNode
  /**
   * Custom style for the app bar.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom style for the title text.
   */
  titleStyle?: StyleProp<TextStyle>
}

export type ChatScaffoldAppBarEvents = {
  /**
   * Called when the back button is pressed.
   */
  onBack?: () => void
}

export type ChatScaffoldMessageProps = {
  /**
   * The message data to render.
   */
  message: ChatMessage
  /**
   * Theme color for sent message bubbles.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Whether to show the timestamp.
   * @default true
   */
  showTimestamp?: boolean
}

export type ChatScaffoldInputProps = {
  /**
   * Controlled input value.
   */
  value?: string
  /**
   * Placeholder text.
   * @default 'Type a message...'
   */
  placeholder?: string
  /**
   * Theme color for the send button.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Content prepended before the text input (e.g. action chips).
   */
  prefix?: ReactNode
  /**
   * Custom send button renderer.
   */
  renderSendButton?: (onPress: () => void, disabled: boolean) => ReactNode
  /**
   * Custom style for the input container.
   */
  style?: StyleProp<ViewStyle>
} & ChatScaffoldInputEvents

export type ChatScaffoldInputEvents = {
  /**
   * Called when the text changes.
   */
  onChangeText?: (value: string) => void
  /**
   * Called when send is pressed.
   */
  onSend?: (text: string) => void
  /**
   * Called when the attach button is pressed.
   */
  onAttach?: () => void
  /**
   * Called when the file button is pressed.
   * When provided, a file icon button is shown on the left of the input.
   */
  onFile?: () => void
}
