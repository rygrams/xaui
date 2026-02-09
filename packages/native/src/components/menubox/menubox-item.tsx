import React, { useContext } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { MenuBoxContext } from './menubox-context'
import type { MenuBoxItemProps } from './menubox.type'
import { styles } from './menubox.style'
import { useMenuBoxItemSizeStyles, useMenuBoxRadiusStyles } from './menubox.hook'
import { useXUITheme } from '../../core'
import {
  runMenuBoxPressInAnimation,
  runMenuBoxPressOutAnimation,
} from './menubox.animation'

export const MenuBoxItem: React.FC<MenuBoxItemProps> = props => {
  const context = useContext(MenuBoxContext)
  const theme = useXUITheme()
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const {
    itemKey,
    title,
    description,
    startContent,
    endContent,
    isDisabled = false,
    customAppearance,
    onPress,
  } = props

  const size = context?.size ?? 'md'
  const radius = context?.radius ?? 'lg'
  const itemBackgroundColor =
    context?.backgroundColor ??
    (theme.mode === 'dark'
      ? theme.colors.default.background
      : theme.colors.background)
  const spacing = context?.spacing ?? 0
  const itemCount = context?.itemCount ?? 1

  const index = context?.getItemIndex(itemKey) ?? 0
  const isFirst = index === 0
  const isLast = index === itemCount - 1

  const sizeStyles = useMenuBoxItemSizeStyles(size)
  const radiusStyles = useMenuBoxRadiusStyles(radius, isFirst, isLast)

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
    onPress?.({} as import('react-native').GestureResponderEvent)
  }

  const handlePressIn = () => {
    if (!isDisabled) {
      runMenuBoxPressInAnimation(animatedScale, animatedOpacity)
    }
  }

  const handlePressOut = () => {
    if (!isDisabled) {
      runMenuBoxPressOutAnimation(animatedScale, animatedOpacity)
    }
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
          numberOfLines={1}
        >
          {description}
        </Text>
      )
    }
    return description
  }

  const content = (
    <Animated.View
      style={[
        styles.item,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: itemBackgroundColor,
          transform: [{ scale: animatedScale }],
          opacity: animatedOpacity,
        },
        radiusStyles,
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
    </Animated.View>
  )

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        radiusStyles,
        { overflow: 'hidden' },
        !isLast && { marginBottom: spacing },
      ]}
    >
      {content}
    </Pressable>
  )
}
