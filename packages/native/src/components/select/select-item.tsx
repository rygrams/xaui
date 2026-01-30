import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SelectContext } from './select-context'
import type { SelectItemProps } from './select.type'
import { CheckmarkIcon } from './checkmark-icon'
import {
  useSelectItemBackgroundColor,
  useSelectItemCheckmarkColor,
  useSelectItemSizeStyles,
  useSelectItemTextColors,
} from './select-item.hook'
import { styles } from './select-item.style'
import type { Size } from '../../types'

const defaultSize: Size = 'md'

export const SelectItem: React.FC<SelectItemProps> = ({
  label,
  description,
  startContent,
  endContent,
  selectedIcon,
  isDisabled = false,
  isSelected = false,
  isReadOnly = false,
  style,
  textStyle,
  onSelected,
}) => {
  const context = useContext(SelectContext)
  const size = context?.size ?? defaultSize
  const themeColor = context?.themeColor ?? 'default'
  const isItemDisabled = context?.isDisabled ? true : isDisabled

  const sizeStyles = useSelectItemSizeStyles(size)
  const backgroundColor = useSelectItemBackgroundColor(themeColor, isSelected)
  const { textColor, descriptionColor } = useSelectItemTextColors()
  const checkmarkColor = useSelectItemCheckmarkColor(themeColor)

  const handlePress = () => {
    if (isItemDisabled || isReadOnly) {
      return
    }

    onSelected?.()
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isItemDisabled}
      style={[
        styles.item,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor,
        },
        isItemDisabled && styles.disabled,
        style,
      ]}
    >
      {startContent}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { fontSize: sizeStyles.titleSize, color: textColor },
            textStyle,
          ]}
        >
          {label}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              { fontSize: sizeStyles.descriptionSize, color: descriptionColor },
            ]}
          >
            {description}
          </Text>
        )}
      </View>
      {isSelected && (selectedIcon || <CheckmarkIcon color={checkmarkColor} size={16} />)}
      {endContent}
    </Pressable>
  )
}
