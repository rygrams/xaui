import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { useChatColors } from './chat-scaffold.hook'
import { styles } from './chat-scaffold.style'
import type { ChatScaffoldAppBarProps, ChatScaffoldAppBarEvents } from './chat-scaffold.type'

export const ChatScaffoldAppBar: React.FC<
  ChatScaffoldAppBarProps & ChatScaffoldAppBarEvents
> = ({
  title,
  subtitle,
  avatarUri,
  avatarInitials,
  isOnline = false,
  themeColor = 'primary',
  actions,
  style,
  titleStyle,
  onBack,
}) => {
  const theme = useXUITheme()
  const colors = useChatColors(themeColor)

  return (
    <View
      style={[
        styles.appBar,
        {
          backgroundColor: colors.appBarBg,
          borderBottomColor: colors.appBarBorder,
        },
        style,
      ]}
    >
      {onBack && (
        <Pressable onPress={onBack} style={styles.backButton}>
          <ArrowBackIcon
            size={24}
            color={withOpacity(theme.colors.foreground, 0.75)}
          />
        </Pressable>
      )}

      <View style={{ position: 'relative' }}>
        <View
          style={[
            styles.appBarAvatar,
            { backgroundColor: colors.avatarBackground },
          ]}
        >
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.appBarAvatarImage} />
          ) : (
            <Text style={[styles.appBarAvatarInitials, { color: colors.avatarText }]}>
              {avatarInitials ?? title.slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
        {isOnline && (
          <View
            style={[
              styles.appBarOnlineDot,
              {
                backgroundColor: colors.onlineDot,
                borderColor: colors.appBarBg,
              },
            ]}
          />
        )}
      </View>

      <View style={styles.appBarTextBlock}>
        <Text
          numberOfLines={1}
          style={[styles.appBarTitle, { color: colors.foreground }, titleStyle]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[styles.appBarSubtitle, { color: colors.timestamp }]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actions ? (
        <View style={styles.appBarActions}>{actions}</View>
      ) : null}
    </View>
  )
}
