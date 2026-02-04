import React, { useEffect, useRef } from 'react'
import {
  Animated,
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
  _triggerLayout,
  onInputChange,
  onClose,
  onCheckmark,
  onFocus,
  onBlur,
}) => {
  const theme = useXUITheme()
  const scaleAnim = useRef(new Animated.Value(0)).current
  const inputRef = useRef<TextInput>(null)

  const checkmarkColor =
    themeColor === 'default' ? theme.colors.primary.main : theme.colors[themeColor].main

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start(() => {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 50)
      })
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

  const handleModalShow = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 300)
  }

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
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
              {title ? (
                <Text style={[styles.title, { color: theme.colors.foreground }]}>
                  {title}
                </Text>
              ) : null}

              <View style={styles.inputContainer}>
                <Animated.View style={[styles.inputWrapper, inputAnimatedStyle]}>
                  <TextInput
                    ref={inputRef}
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
                  style={styles.checkmarkButton}
                  onPress={onCheckmark}
                  accessibilityLabel="Confirm"
                  accessibilityRole="button"
                >
                  {checkmarkIcon ?? <CheckmarkIcon color={checkmarkColor} size={20} />}
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
