import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useXUITheme } from '../../../core'
import { CheckmarkIcon } from '../../select/checkmark-icon'
import { styles } from './autocomplete-dialog.style'
import type { AutocompleteDialogProps } from './autocomplete-dialog.type'

const CloseIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 24, color }}>×</Text>
)

export const AutocompleteDialog: React.FC<AutocompleteDialogProps> = ({
  visible,
  inputValue,
  placeholder = 'Search...',
  title,
  themeColor = 'primary',
  children,
  showCheckmark = true,
  checkmarkIcon,
  inputTextStyle,
  style,
  onInputChange,
  onClose,
  onCheckmark,
  onFocus,
  onBlur,
}) => {
  const theme = useXUITheme()
  const scaleAnim = useRef(new Animated.Value(0)).current

  const checkmarkColor =
    themeColor === 'default'
      ? theme.colors.primary.main
      : theme.colors[themeColor].main

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start()
    } else {
      scaleAnim.setValue(0)
    }
  }, [visible, scaleAnim])

  const inputAnimatedStyle = {
    transform: [
      {
        scaleX: scaleAnim,
      },
    ],
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[styles.overlay, style]}>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            {title ? (
              <Text style={[styles.title, { color: theme.colors.foreground }]}>{title}</Text>
            ) : null}

            <View style={styles.inputContainer}>
              <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
                <TextInput
                  value={inputValue}
                  onChangeText={onInputChange}
                  placeholder={placeholder}
                  placeholderTextColor={theme.colors.content3}
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.default[100],
                      color: theme.colors.foreground,
                    },
                    inputTextStyle,
                  ]}
                  autoFocus
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

              <Pressable
                style={styles.closeButton}
                onPress={onClose}
                accessibilityLabel="Close dialog"
                accessibilityRole="button"
              >
                <CloseIcon color={theme.colors.foreground} />
              </Pressable>
            </View>
          </View>

          <ScrollView style={styles.listContainer} keyboardShouldPersistTaps="always">
            {children}
          </ScrollView>

          {showCheckmark ? (
            <Pressable
              style={styles.checkmarkButton}
              onPress={onCheckmark}
              accessibilityLabel="Confirm"
              accessibilityRole="button"
            >
              {checkmarkIcon ?? <CheckmarkIcon color={checkmarkColor} size={32} />}
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  )
}
