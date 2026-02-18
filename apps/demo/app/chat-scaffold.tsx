import { useState } from 'react'
import { ChatScaffold, ChatScaffoldAppBar } from '@xaui/native/chat-scaffold'
import type { ChatMessage } from '@xaui/native/chat-scaffold'

const seed: ChatMessage[] = [
  {
    id: '1',
    text: 'Hey! How are you doing today?',
    isSent: false,
    timestamp: new Date(Date.now() - 5 * 60000),
    showAvatar: true,
    avatarInitials: 'AL',
  },
  {
    id: '2',
    text: 'Pretty good, working on some new UI components 🛠️',
    isSent: true,
    timestamp: new Date(Date.now() - 4 * 60000),
    status: 'read',
  },
  {
    id: '3',
    text: 'Oh nice! What are you building?',
    isSent: false,
    timestamp: new Date(Date.now() - 3 * 60000),
    showAvatar: true,
    avatarInitials: 'AL',
  },
  {
    id: '4',
    text: 'A Scaffold and ChatScaffold for XAUI 🚀',
    isSent: true,
    timestamp: new Date(Date.now() - 2 * 60000),
    status: 'delivered',
  },
  {
    id: '5',
    text: "That sounds really cool! Can't wait to try it.",
    isSent: false,
    timestamp: new Date(Date.now() - 60000),
    showAvatar: false,
    avatarInitials: 'AL',
  },
]

export default function ChatScaffoldScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([...seed].reverse())
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (text: string) => {
    const sent: ChatMessage = {
      id: Date.now().toString(),
      text,
      isSent: true,
      timestamp: new Date(),
      status: 'sending',
    }

    setMessages(prev => [sent, ...prev])
    setInput('')

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Got it: "${text}" 👍`,
        isSent: false,
        timestamp: new Date(),
        showAvatar: true,
        avatarInitials: 'AL',
      }
      setMessages(prev => [reply, ...prev])
    }, 2000)
  }

  return (
    <ChatScaffold
      messages={messages}
      inputValue={input}
      onInputChange={setInput}
      onSend={handleSend}
      onFile={() => {}}
      isTyping={isTyping}
      keyboardVerticalOffset={90}
      showTimestamps
      themeColor="primary"
      appBar={
        <ChatScaffoldAppBar
          title="Alice"
          subtitle={isTyping ? 'typing…' : 'Online'}
          isOnline
          avatarInitials="AL"
          themeColor="primary"
          onBack={() => {}}
        />
      }
    />
  )
}
