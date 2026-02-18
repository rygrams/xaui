import React from 'react'
import { Animated, View } from 'react-native'
import { useChatColors } from './chat-scaffold.hook'
import { useTypingAnimation } from './chat-scaffold.hook'
import { styles } from './chat-scaffold.style'
import type { ThemeColor } from '../../types'

type ChatScaffoldTypingIndicatorProps = {
  themeColor?: ThemeColor
}

export const ChatScaffoldTypingIndicator: React.FC<
  ChatScaffoldTypingIndicatorProps
> = ({ themeColor = 'primary' }) => {
  const colors = useChatColors(themeColor)
  const { dot1, dot2, dot3 } = useTypingAnimation(true)

  return (
    <View style={styles.typingContainer}>
      <View style={styles.avatarPlaceholder} />
      <View
        style={[styles.typingBubble, { backgroundColor: colors.typingBubble }]}
      >
        {[dot1, dot2, dot3].map((anim, i) => (
          <Animated.View
            key={i}
            style={[
              styles.typingDot,
              {
                backgroundColor: colors.typingDot,
                transform: [{ translateY: anim }],
              },
            ]}
          />
        ))}
      </View>
    </View>
  )
}
