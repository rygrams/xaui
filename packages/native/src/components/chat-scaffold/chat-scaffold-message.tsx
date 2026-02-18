import React from 'react'
import { Image, Text, View } from 'react-native'
import { useChatColors } from './chat-scaffold.hook'
import { styles } from './chat-scaffold.style'
import type { ChatScaffoldMessageProps } from './chat-scaffold.type'

const formatTime = (date: Date): string => {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

const STATUS_LABELS: Record<string, string> = {
  sending: '◌',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  error: '!',
}

export const ChatScaffoldMessage: React.FC<ChatScaffoldMessageProps> = ({
  message,
  themeColor = 'primary',
  showTimestamp = true,
}) => {
  const colors = useChatColors(themeColor)
  const { isSent, text, timestamp, status, avatarUri, avatarInitials, showAvatar } =
    message

  const bubbleColor = isSent ? colors.sentBubble : colors.receivedBubble
  const textColor = isSent ? colors.sentText : colors.receivedText

  const avatarNode = isSent ? null : (
    <View style={{ width: 32, height: 32 }}>
      {showAvatar !== false && (
        <View
          style={[styles.avatar, { backgroundColor: colors.avatarBackground }]}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={[styles.avatarInitials, { color: colors.avatarText }]}>
              {(avatarInitials ?? '?').slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
      )}
    </View>
  )

  return (
    <View
      style={[
        styles.messageRow,
        isSent ? styles.messageRowSent : styles.messageRowReceived,
      ]}
    >
      {avatarNode}
      <View
        style={[
          styles.bubble,
          isSent ? styles.bubbleSent : styles.bubbleReceived,
          { backgroundColor: bubbleColor },
        ]}
      >
        <Text style={[styles.bubbleText, { color: textColor }]}>{text}</Text>

        {(showTimestamp || (isSent && status)) && (
          <View style={styles.bubbleStatusRow}>
            {showTimestamp && (
              <Text style={[styles.bubbleTimestamp, { color: textColor }]}>
                {formatTime(timestamp)}
              </Text>
            )}
            {isSent && status && STATUS_LABELS[status] && (
              <Text
                style={[
                  styles.bubbleStatusText,
                  {
                    color:
                      status === 'read'
                        ? colors.sentBubble
                        : textColor,
                  },
                ]}
              >
                {STATUS_LABELS[status]}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  )
}
