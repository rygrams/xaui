import { describe, it, expect } from 'vitest'
import type {
  ChatScaffoldProps,
  ChatScaffoldEvents,
  ChatScaffoldAppBarProps,
  ChatScaffoldMessageProps,
  ChatScaffoldInputProps,
  ChatMessage,
  ChatMessageStatus,
} from '../../../components/chat-scaffold'

const makeMessage = (overrides?: Partial<ChatMessage>): ChatMessage => ({
  id: '1',
  text: 'Hello!',
  isSent: true,
  timestamp: new Date('2024-01-01T12:00:00'),
  ...overrides,
})

describe('ChatScaffold Types', () => {
  it('creates props with required messages array', () => {
    const props: ChatScaffoldProps = {
      messages: [],
    }
    expect(props.messages).toHaveLength(0)
  })

  it('accepts all optional props', () => {
    const props: ChatScaffoldProps = {
      messages: [makeMessage()],
      appBar: null,
      inputValue: '',
      inputPlaceholder: 'Type...',
      themeColor: 'primary',
      isLoading: false,
      isTyping: true,
      typingLabel: 'Alice',
      showTimestamps: true,
      onInputChange: () => {},
      onSend: () => {},
      onAttach: () => {},
      onEndReached: () => {},
    }

    expect(props.isTyping).toBe(true)
    expect(props.typingLabel).toBe('Alice')
    expect(props.showTimestamps).toBe(true)
  })

  it('accepts all theme colors', () => {
    const colors: Array<ChatScaffoldProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(themeColor => {
      const props: ChatScaffoldProps = { messages: [], themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('exports ChatScaffoldEvents type', () => {
    const events: ChatScaffoldEvents = {
      onInputChange: () => {},
      onSend: () => {},
      onAttach: () => {},
      onEndReached: () => {},
    }
    expect(events.onSend).toBeDefined()
  })

  it('ChatMessage accepts all fields', () => {
    const msg: ChatMessage = {
      id: 'abc',
      text: 'Hello',
      isSent: false,
      timestamp: new Date(),
      status: 'delivered',
      avatarUri: 'https://example.com/avatar.png',
      avatarInitials: 'JD',
      showAvatar: true,
    }
    expect(msg.status).toBe('delivered')
    expect(msg.showAvatar).toBe(true)
  })

  it('accepts all message statuses', () => {
    const statuses: ChatMessageStatus[] = [
      'sending',
      'sent',
      'delivered',
      'read',
      'error',
    ]

    statuses.forEach(status => {
      const msg = makeMessage({ status })
      expect(msg.status).toBe(status)
    })
  })

  it('exports ChatScaffoldAppBarProps type', () => {
    const props: ChatScaffoldAppBarProps = {
      title: 'Alice',
      subtitle: 'Online',
      isOnline: true,
      themeColor: 'primary',
    }
    expect(props.title).toBe('Alice')
    expect(props.isOnline).toBe(true)
  })

  it('exports ChatScaffoldMessageProps type', () => {
    const props: ChatScaffoldMessageProps = {
      message: makeMessage(),
      themeColor: 'primary',
      showTimestamp: true,
    }
    expect(props.showTimestamp).toBe(true)
  })

  it('exports ChatScaffoldInputProps type', () => {
    const props: ChatScaffoldInputProps = {
      value: '',
      placeholder: 'Write...',
      themeColor: 'primary',
      onChangeText: () => {},
      onSend: () => {},
      onAttach: () => {},
    }
    expect(props.placeholder).toBe('Write...')
  })
})
