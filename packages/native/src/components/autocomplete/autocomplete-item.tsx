import React from 'react'
import { Pressable, Text, View } from 'react-native'
import type { AutocompleteItemProps } from './autocomplete.type'
import { styles } from './autocomplete-item.style'
import { useAutocompleteItemStyles } from './autocomplete-item.hook'

export const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
  label,
  description,
  startContent,
  endContent,
  isDisabled = false,
  isSelected = false,
  isReadOnly = false,
  style,
  textStyle,
  onSelected,
}) => {
  const { backgroundColor, labelColor, descriptionColor } = useAutocompleteItemStyles(
    isSelected,
    isDisabled
  )

  const handlePress = () => {
    if (isDisabled || isReadOnly) {
      return
    }

    onSelected?.()
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled || isReadOnly}
      style={[styles.item, { backgroundColor }, isDisabled && styles.disabled, style]}
    >
      {startContent}
      <View style={styles.itemContent}>
        {typeof label === 'string' || typeof label === 'number' ? (
          <Text style={[styles.label, { color: labelColor }, textStyle]}>{label}</Text>
        ) : (
          <View>{label}</View>
        )}
        {description ? (
          typeof description === 'string' || typeof description === 'number' ? (
            <Text style={[styles.description, { color: descriptionColor }]}>
              {description}
            </Text>
          ) : (
            <View>{description}</View>
          )
        ) : null}
      </View>
      {endContent}
    </Pressable>
  )
}
