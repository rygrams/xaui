import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { AttachIcon } from '@xaui/icons/attach'
import { DocumentAttachIcon } from '@xaui/icons/document-attach'
import { SendIcon } from '@xaui/icons/send'
import { useChatColors } from './chat-scaffold.hook'
import { styles } from './chat-scaffold.style'
import type { ChatScaffoldInputProps } from './chat-scaffold.type'

export const ChatScaffoldInput: React.FC<ChatScaffoldInputProps> = ({
  value,
  placeholder = 'Type a message...',
  themeColor = 'primary',
  prefix,
  renderSendButton,
  style,
  onChangeText,
  onSend,
  onAttach,
  onFile,
}) => {
  const [internalValue, setInternalValue] = useState('')
  const colors = useChatColors(themeColor)

  const isControlled = value !== undefined
  const text = isControlled ? value : internalValue
  const canSend = text.trim().length > 0

  const handleChange = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChangeText?.(next)
  }

  const handleSend = () => {
    if (!canSend) return
    onSend?.(text.trim())
    if (!isControlled) setInternalValue('')
  }

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: colors.appBarBg,
          borderTopColor: colors.inputBorder,
        },
        style,
      ]}
    >
      {onFile && (
        <Pressable onPress={onFile} style={styles.iconButton}>
          <DocumentAttachIcon size={22} color={colors.attachIcon} />
        </Pressable>
      )}

      <View
        style={[styles.inputWrapper, { backgroundColor: colors.inputBackground }]}
      >
        {prefix && <View style={styles.inputPrefixWrapper}>{prefix}</View>}
        <TextInput
          value={text}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          multiline
          style={[styles.textInput, { color: colors.inputText }]}
        />
      </View>

      {onAttach && (
        <Pressable onPress={onAttach} style={styles.iconButton}>
          <AttachIcon size={22} color={colors.attachIcon} />
        </Pressable>
      )}

      {renderSendButton ? (
        renderSendButton(handleSend, !canSend)
      ) : (
        <Pressable
          onPress={handleSend}
          disabled={!canSend}
          style={[
            styles.iconButton,
            {
              backgroundColor: canSend ? colors.sendButton : 'transparent',
              opacity: canSend ? 1 : 0.4,
            },
          ]}
        >
          <SendIcon size={20} color={canSend ? colors.sendIcon : colors.attachIcon} />
        </Pressable>
      )}
    </View>
  )
}
