import React, { useCallback } from 'react'
import { Animated, FlatList, KeyboardAvoidingView, View } from 'react-native'
import { useXUITheme } from '../../core'
import { useLinearLoader } from '../scaffold/scaffold.hook'
import { styles as scaffoldStyles } from '../scaffold/scaffold.style'
import { ChatScaffoldInput } from './chat-scaffold-input'
import { ChatScaffoldMessage } from './chat-scaffold-message'
import { ChatScaffoldTypingIndicator } from './chat-scaffold-typing-indicator'
import { styles } from './chat-scaffold.style'
import type { ChatMessage, ChatScaffoldProps } from './chat-scaffold.type'

type LinearLoaderProps = {
  themeColor: NonNullable<ChatScaffoldProps['themeColor']>
}

const LinearLoader: React.FC<LinearLoaderProps> = ({ themeColor }) => {
  const { translateX, barWidth, barColor, trackColor } = useLinearLoader(
    true,
    themeColor
  )

  return (
    <View style={[scaffoldStyles.loaderTrack, { backgroundColor: trackColor }]}>
      <Animated.View
        style={[
          scaffoldStyles.loaderBar,
          {
            width: barWidth,
            backgroundColor: barColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  )
}

export const ChatScaffold: React.FC<ChatScaffoldProps> = ({
  messages,
  appBar,
  inputValue,
  inputPlaceholder,
  inputPrefix,
  themeColor = 'primary',
  isLoading = false,
  isTyping = false,
  showTimestamps = true,
  renderMessage,
  renderSendButton,
  backgroundColor,
  listProps,
  style,
  keyboardVerticalOffset = 60,
  onInputChange,
  onSend,
  onAttach,
  onFile,
  onEndReached,
}) => {
  const theme = useXUITheme()
  const bg = backgroundColor ?? theme.colors.background

  const renderItem = useCallback(
    ({ item }: { item: ChatMessage }) => {
      if (renderMessage) return <>{renderMessage(item)}</>

      return (
        <ChatScaffoldMessage
          message={item}
          themeColor={themeColor}
          showTimestamp={showTimestamps}
        />
      )
    },
    [renderMessage, themeColor, showTimestamps]
  )

  const listHeader = isTyping ? (
    <ChatScaffoldTypingIndicator themeColor={themeColor} />
  ) : null

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }, style]}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      {appBar}
      {isLoading && <LinearLoader themeColor={themeColor} />}

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        inverted
        ListHeaderComponent={listHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        {...listProps}
      />

      <ChatScaffoldInput
        value={inputValue}
        placeholder={inputPlaceholder}
        themeColor={themeColor}
        prefix={inputPrefix}
        renderSendButton={renderSendButton}
        onChangeText={onInputChange}
        onSend={onSend}
        onAttach={onAttach}
        onFile={onFile}
      />
    </KeyboardAvoidingView>
  )
}
