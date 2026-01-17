import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Modal,
  Pressable,
  View,
  StyleSheet,
} from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { SidebarProps } from './sidebar-types'

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  trigger,
  position = 'left',
  width = 280,
  overlayOpacity = 0.5,
  themeColor = 'default',
  isOpen,
  enableSwipeToClose: _enableSwipeToClose = false,
  style,
  overlayStyle,
  onClose,
  onOpenChange,
}) => {
  const theme = useXUITheme()
  const [internalOpen, setInternalOpen] = useState(false)
  const slideAnimation = useRef(new Animated.Value(0)).current
  const overlayAnimation = useRef(new Animated.Value(0)).current

  const colorScheme = theme.colors[themeColor]
  const isControlled = isOpen !== undefined
  const currentOpen = isControlled ? isOpen : internalOpen

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)

      if (!nextOpen) {
        onClose?.()
      }
    },
    [isControlled, onOpenChange, onClose]
  )

  const handleOpen = useCallback(() => {
    setOpenState(true)
  }, [setOpenState])

  const handleClose = useCallback(() => {
    setOpenState(false)
  }, [setOpenState])

  const handleOverlayPress = useCallback(() => {
    handleClose()
  }, [handleClose])

  useEffect(() => {
    if (currentOpen) {
      Animated.parallel([
        Animated.spring(slideAnimation, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(slideAnimation, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
        Animated.timing(overlayAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [currentOpen, slideAnimation, overlayAnimation])

  const sidebarStyles = useMemo(() => {
    const translateX = slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: position === 'left' ? [-width, 0] : [width, 0],
    })

    return {
      width,
      transform: [{ translateX }],
      backgroundColor: colorScheme.background || theme.colors.default.background,
      [position]: 0,
    }
  }, [slideAnimation, position, width, colorScheme, theme])

  const overlayStyles = useMemo(() => {
    return {
      opacity: overlayAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, overlayOpacity],
      }),
    }
  }, [overlayAnimation, overlayOpacity])

  const triggerElement = trigger ? (
    <Pressable onPress={handleOpen}>{trigger}</Pressable>
  ) : null

  return (
    <>
      {triggerElement}

      <Modal
        visible={currentOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.container}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleOverlayPress}
          >
            <Animated.View
              style={[styles.overlay, overlayStyles, overlayStyle]}
            />
          </Pressable>

          <Animated.View style={[styles.sidebar, sidebarStyles, style]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000000',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
})
