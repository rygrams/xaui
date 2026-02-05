import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useXUITheme } from '../../../core'
import { CheckmarkIcon } from '../../select/checkmark-icon'
import { ArrowBackIcon } from '../../icon'
import { styles } from './autocomplete-dialog.style'
import type { AutocompleteDialogProps } from './autocomplete-dialog.type'

const CloseIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 24, color }}>×</Text>
)

const addOpacityToColor = (color: string, opacity: number): string => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

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
  const inputRef = useRef<TextInput>(null)

  const checkmarkColor = theme.colors[themeColor].main

  const checkmarkBackgroundColor = theme.colors[themeColor].background

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
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

  const focusInput = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    })
  }, [])

  const handleModalShow = () => {
    focusInput()
  }

  const handleCheckmarkPress = () => {
    onCheckmark?.()
    Keyboard.dismiss()
  }

  useEffect(() => {
    if (!visible) {
      return
    }

    focusInput()
  }, [focusInput, visible])

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onShow={handleModalShow}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.overlay, style]}>
          <View
            style={[styles.container, { backgroundColor: theme.colors.background }]}
          >
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
                    placeholderTextColor={addOpacityToColor(
                      theme.colors.foreground,
                      0.5
                    )}
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
                    onSubmitEditing={handleCheckmarkPress}
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

            <ScrollView
              style={styles.listContainer}
              contentContainerStyle={styles.listContentContainer}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>

            {showCheckmark ? (
              <View style={styles.checkmarkButtonContainer}>
                <Pressable
                  style={[
                    styles.checkmarkButton,
                    { backgroundColor: checkmarkBackgroundColor },
                  ]}
                  onPress={handleCheckmarkPress}
                  accessibilityLabel="Confirm"
                  accessibilityRole="button"
                >
                  {checkmarkIcon ?? (
                    <CheckmarkIcon color={checkmarkColor} size={20} />
                  )}
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
