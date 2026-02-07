import React from 'react'
import {
  Animated,
  Pressable,
  Text,
  TextInput,
  View,
  StyleProp,
  TextStyle,
} from 'react-native'
import { useXUITheme } from '../../../core'
import { ArrowBackIcon, CloseIcon } from '@xaui/icons'
import { styles } from './autocomplete-dialog.style'
import { withOpacity } from '@xaui/core'

type AutocompleteDialogHeaderProps = {
  title?: string
  inputValue?: string
  placeholder?: string
  inputRef: React.RefObject<TextInput | null>
  inputAnimatedStyle: {
    transform: { scaleX: Animated.Value }[]
  }
  inputTextStyle?: StyleProp<TextStyle>
  onInputChange?: (value: string) => void
  onClose?: () => void
  onCheckmarkPress?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export const AutocompleteDialogHeader: React.FC<AutocompleteDialogHeaderProps> = ({
  title,
  inputValue,
  placeholder = 'Search...',
  inputRef,
  inputAnimatedStyle,
  inputTextStyle,
  onInputChange,
  onClose,
  onCheckmarkPress,
  onFocus,
  onBlur,
}) => {
  const theme = useXUITheme()

  return (
    <View style={styles.header}>
      {title ? (
        <View style={styles.titleRow}>
          <Pressable
            style={styles.backButton}
            onPress={onClose}
            accessibilityLabel="Back"
            accessibilityRole="button"
          >
            <ArrowBackIcon size={20} color={theme.colors.foreground} />
          </Pressable>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            {title}
          </Text>
        </View>
      ) : null}

      <View style={styles.inputContainer}>
        <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
          <TextInput
            ref={inputRef}
            value={inputValue}
            onChangeText={onInputChange}
            placeholder={placeholder}
            placeholderTextColor={withOpacity(theme.colors.foreground, 0.5)}
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.default.background,
                color: theme.colors.foreground,
              },
              inputTextStyle,
            ]}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={onCheckmarkPress}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {inputValue ? (
            <Pressable
              style={styles.clearInputButton}
              onPress={() => onInputChange?.('')}
              accessibilityLabel="Clear input"
              accessibilityRole="button"
            >
              <CloseIcon color={theme.colors.foreground} />
            </Pressable>
          ) : null}
        </Animated.View>
      </View>
    </View>
  )
}
