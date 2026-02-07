import React from 'react'
import { Animated, Pressable, View } from 'react-native'
import { Portal } from '../../core/portal/portal'
import { useBottomSheetAnimation, useBottomSheetStyles } from './bottom-sheet.hook'
import { styles } from './bottom-sheet.style'
import type { BottomSheetProps } from './bottom-sheet.type'

export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  snapPoints = [0.4, 0.9],
  initialSnapIndex = 0,
  themeColor = 'default',
  radius = 'lg',
  showBackdrop = true,
  closeOnBackdropPress = true,
  enableSwipeToDismiss = true,
  showHandle = true,
  disableAnimation = false,
  style,
  handleContent,
  onClose,
  onSnapChange,
}) => {
  const {
    shouldRender,
    translateY,
    backdropOpacity,
    panResponder,
    close,
    screenHeight,
  } = useBottomSheetAnimation({
    isOpen,
    snapPoints,
    initialSnapIndex,
    enableSwipeToDismiss,
    disableAnimation,
    onClose,
    onSnapChange,
  })

  const { sheetStyles, handleIndicatorColor } = useBottomSheetStyles(
    themeColor,
    radius
  )

  if (!shouldRender) {
    return null
  }

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      close()
    }
  }

  return (
    <Portal>
      {showBackdrop && (
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        >
          <Pressable
            style={styles.backdrop}
            onPress={handleBackdropPress}
          />
        </Animated.View>
      )}

      <Animated.View
        style={[
          styles.container,
          {
            height: screenHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        <View
          style={[
            styles.sheet,
            { height: screenHeight },
            sheetStyles,
            style,
          ]}
          {...panResponder.panHandlers}
        >
          {showHandle && (
            <View style={styles.handle}>
              {handleContent ?? (
                <View
                  style={[
                    styles.handleIndicator,
                    { backgroundColor: handleIndicatorColor },
                  ]}
                />
              )}
            </View>
          )}

          <View style={styles.content}>{children}</View>
        </View>
      </Animated.View>
    </Portal>
  )
}
