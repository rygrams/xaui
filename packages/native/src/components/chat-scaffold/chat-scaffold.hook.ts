import { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { ThemeColor } from '../../types'
import {
  createTypingDotAnimation,
  DOT_STAGGER_DELAY,
} from './chat-scaffold.animation'

export const useChatColors = (themeColor: ThemeColor) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  return useMemo(
    () => ({
      sentBubble: colorScheme.main,
      sentText: colorScheme.foreground,
      receivedBubble:
        theme.mode === 'dark'
          ? theme.colors.default.background
          : theme.palette.gray[100],
      receivedText: theme.colors.foreground,
      inputBackground:
        theme.mode === 'dark'
          ? theme.colors.default.background
          : theme.palette.gray[100],
      inputBorder: withOpacity(theme.colors.foreground, 0.08),
      inputText: theme.colors.foreground,
      inputPlaceholder: withOpacity(theme.colors.foreground, 0.4),
      sendButton: colorScheme.main,
      sendIcon: colorScheme.foreground,
      attachIcon: withOpacity(theme.colors.foreground, 0.55),
      appBarBg:
        theme.mode === 'dark' ? theme.colors.default.background : '#ffffff',
      appBarBorder: withOpacity(theme.colors.foreground, 0.08),
      typingBubble:
        theme.mode === 'dark'
          ? theme.colors.default.background
          : theme.palette.gray[100],
      typingDot: withOpacity(theme.colors.foreground, 0.45),
      timestamp: withOpacity(theme.colors.foreground, 0.45),
      foreground: theme.colors.foreground,
      background: theme.colors.background,
      avatarBackground: colorScheme.background,
      avatarText: colorScheme.main,
      onlineDot: theme.colors.success.main,
    }),
    [theme, colorScheme]
  )
}

export const useTypingAnimation = (isTyping: boolean) => {
  const dot1 = useRef(new Animated.Value(0)).current
  const dot2 = useRef(new Animated.Value(0)).current
  const dot3 = useRef(new Animated.Value(0)).current

  const anims = useRef<Animated.CompositeAnimation[]>([])

  useEffect(() => {
    anims.current.forEach(a => a.stop())
    anims.current = []

    if (!isTyping) {
      dot1.setValue(0)
      dot2.setValue(0)
      dot3.setValue(0)
      return
    }

    anims.current = [
      createTypingDotAnimation(dot1, 0),
      createTypingDotAnimation(dot2, DOT_STAGGER_DELAY),
      createTypingDotAnimation(dot3, DOT_STAGGER_DELAY * 2),
    ]
    anims.current.forEach(a => a.start())

    return () => {
      anims.current.forEach(a => a.stop())
    }
  }, [isTyping, dot1, dot2, dot3])

  return { dot1, dot2, dot3 }
}
