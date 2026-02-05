import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { AutocompleteItemProps } from './autocomplete.type'
import { styles } from './autocomplete-item.style'
import {
  useAutocompleteItemSizeStyles,
  useAutocompleteItemStyles,
} from './autocomplete-item.hook'
import { AutocompleteContext } from './autocomplete-context'
import type { Size } from '../../types'

const defaultSize: Size = 'md'

export const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
  label,
  description,
  startContent,
  endContent,
  selectedIcon: _selectedIcon,
  isDisabled = false,
  isSelected = false,
  isReadOnly = false,
  style,
  textStyle,
  onSelected,
}) => {
  const context = useContext(AutocompleteContext)
  const size = context?.size ?? defaultSize
  const isItemDisabled = context?.isDisabled ? true : isDisabled

  const sizeStyles = useAutocompleteItemSizeStyles(size)
  const { backgroundColor, labelColor, descriptionColor } =
    useAutocompleteItemStyles(isSelected, isItemDisabled)

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
            { fontSize: sizeStyles.titleSize, color: labelColor },
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
      {endContent}
    </Pressable>
  )
}
