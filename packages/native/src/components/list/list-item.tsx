import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ListContext } from './list-context'
import type { ListItemProps } from './list.type'
import { styles } from './list.style'
import { useListItemSizeStyles } from './list.hook'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'

export const ListItem: React.FC<ListItemProps> = ({
  itemKey,
  title,
  description,
  startContent,
  endContent,
  isDisabled = false,
  isSelected: propIsSelected,
  customAppearance,
  onPress,
}) => {
  const context = useContext(ListContext)
  const theme = useXUITheme()

  const selectionMode = context?.selectionMode ?? 'none'
  const isPressable = context?.isPressable ?? true
  const isSelectable = context?.isSelectable ?? false
  const themeColor = context?.themeColor ?? 'primary'
  const size = context?.size ?? 'md'

  const isSelected =
    propIsSelected ?? (context ? context.isSelected(itemKey) : false)

  const sizeStyles = useListItemSizeStyles(size)
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const backgroundColor = isSelected ? colorScheme.background : 'transparent'
  const titleColor = isDisabled
    ? theme.colors.foreground + '50'
    : theme.colors.foreground
  const descriptionColor = isDisabled
    ? theme.colors.foreground + '50'
    : theme.colors.foreground + '99'

  const handlePress = () => {
    if (isDisabled) {
      return
    }

    if (isSelectable && selectionMode !== 'none') {
      context?.toggleSelection(itemKey)
    }

    onPress?.({} as import('react-native').GestureResponderEvent)
  }

  const renderTitle = () => {
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <Text
          style={[
            styles.title,
            { fontSize: sizeStyles.titleSize, color: titleColor },
            customAppearance?.title,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )
    }
    return title
  }

  const renderDescription = () => {
    if (!description) return null

    if (typeof description === 'string' || typeof description === 'number') {
      return (
        <Text
          style={[
            styles.description,
            { fontSize: sizeStyles.descriptionSize, color: descriptionColor },
            customAppearance?.description,
          ]}
          numberOfLines={2}
        >
          {description}
        </Text>
      )
    }
    return description
  }

  const content = (
    <View
      style={[
        styles.item,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor,
        },
        isDisabled && styles.disabled,
        customAppearance?.container,
      ]}
    >
      {startContent && <View style={customAppearance?.content}>{startContent}</View>}
      <View style={[styles.content, customAppearance?.content]}>
        {renderTitle()}
        {renderDescription()}
      </View>
      {endContent && <View style={customAppearance?.content}>{endContent}</View>}
    </View>
  )

  if (!isPressable) {
    return content
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        pressed &&
          !isDisabled && {
            backgroundColor: theme.colors.foreground + '10',
          },
      ]}
    >
      {content}
    </Pressable>
  )
}
