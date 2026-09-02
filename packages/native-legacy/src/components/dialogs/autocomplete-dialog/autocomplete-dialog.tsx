import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  BackHandler,
  FlatList,
  InteractionManager,
  Keyboard,
  Platform,
  Pressable,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import { Portal, useXUITheme } from '../../../core'
import { CheckmarkIcon } from '../../select/checkmark-icon'
import { AutocompleteDialogHeader } from './autocomplete-dialog-header'
import { useAutocompleteDialogAnimation } from './autocomplete-dialog.animation'
import { styles } from './autocomplete-dialog.style'
import type { AutocompleteDialogProps } from './autocomplete-dialog.type'

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
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const inputRef = useRef<TextInput>(null)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showSub = Keyboard.addListener(showEvent, e => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0)
    })

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

  const items = useMemo(
    () =>
      React.Children.toArray(children).filter(
        React.isValidElement
      ) as React.ReactElement[],
    [children]
  )

  const checkmarkColor = theme.colors[themeColor].main
  const checkmarkBackgroundColor = theme.colors[themeColor].container

  useAutocompleteDialogAnimation({ visible, fadeAnim, slideAnim, scaleAnim })

  useEffect(() => {
    if (!visible) return

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose?.()
      return true
    })

    return () => sub.remove()
  }, [visible, onClose])

  const focusInput = useCallback(() => {
    const delay = Platform.OS === 'android' ? 300 : 100
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        inputRef.current?.focus()
      }, delay)
    })
  }, [])

  const handleCheckmarkPress = () => {
    onCheckmark?.()
    Keyboard.dismiss()
  }

  useEffect(() => {
    if (!visible) {
      Keyboard.dismiss()
      return
    }

    focusInput()
  }, [focusInput, visible])

  const listBottomPadding = useMemo(() => {
    const basePadding = showCheckmark ? 96 : 64
    return (keyboardHeight > 0 ? keyboardHeight : 0) + basePadding
  }, [keyboardHeight, showCheckmark])

  if (!visible) return null

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  }

  const containerAnimatedStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [screenHeight, 0],
        }),
      },
    ],
  }

  const inputAnimatedStyle = {
    transform: [{ scaleX: scaleAnim }],
  }

  const listHeader = (
    <AutocompleteDialogHeader
      title={title}
      inputValue={inputValue}
      placeholder={placeholder}
      inputRef={inputRef}
      inputAnimatedStyle={inputAnimatedStyle}
      inputTextStyle={inputTextStyle}
      onInputChange={onInputChange}
      onClose={onClose}
      onCheckmarkPress={handleCheckmarkPress}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )

  return (
    <Portal>
      <View style={[overlayStyle, style]}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.dialogContainer, containerAnimatedStyle]}>
          <View
            style={[styles.container, { backgroundColor: theme.colors.background }]}
          >
            {listHeader}
            <FlatList
              data={items}
              renderItem={({ item }) => item}
              keyExtractor={(_, index) => String(index)}
              style={styles.listContainer}
              contentContainerStyle={{
                paddingBottom: listBottomPadding,
              }}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              showsVerticalScrollIndicator={false}
            />

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
        </Animated.View>
      </View>
    </Portal>
  )
}
