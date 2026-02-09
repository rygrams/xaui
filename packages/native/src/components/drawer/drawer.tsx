import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, Modal, Pressable, View } from 'react-native'
import { getTranslateValue, useDrawerStyles } from './drawer.hook'
import { styles } from './drawer.style'
import type { DrawerProps } from './drawer.type'

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  position = 'left',
  themeColor = 'default',
  width = 280,
  height = 280,
  showOverlay = true,
  onClose,
  customStyle,
  disableAnimation = false,
}) => {
  const DRAWER_ANIMATION_DURATION = 250
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const isModalMountedRef = useRef(false)
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const size = position === 'left' || position === 'right' ? width : height
  const initialTranslateValues = useMemo(
    () => getTranslateValue(position, size),
    [position, size]
  )

  const translateX = useRef(new Animated.Value(initialTranslateValues.x)).current
  const translateY = useRef(new Animated.Value(initialTranslateValues.y)).current
  const overlayOpacity = useRef(new Animated.Value(0)).current

  const containerStyle = useDrawerStyles(themeColor, position, width, height)

  const positionStyle =
    position === 'left'
      ? styles.drawerLeft
      : position === 'right'
        ? styles.drawerRight
        : position === 'top'
          ? styles.drawerTop
          : styles.drawerBottom

  useEffect(() => {
    const translateValues = getTranslateValue(position, size)

    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }

    if (isOpen) {
      if (!isModalMountedRef.current) {
        translateX.setValue(translateValues.x)
        translateY.setValue(translateValues.y)
        overlayOpacity.setValue(0)
        isModalMountedRef.current = true
        setIsModalMounted(true)
        setIsModalVisible(true)
      }

      if (disableAnimation) {
        translateX.setValue(0)
        translateY.setValue(0)
        overlayOpacity.setValue(1)
        return
      }

      const animation = Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: DRAWER_ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: DRAWER_ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: DRAWER_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ])

      animationRef.current = animation
      animation.start(() => {
        if (animationRef.current === animation) {
          animationRef.current = null
        }
      })

      return
    }

    if (!isModalMountedRef.current) {
      return
    }

    if (disableAnimation) {
      translateX.setValue(translateValues.x)
      translateY.setValue(translateValues.y)
      overlayOpacity.setValue(0)
      isModalMountedRef.current = false
      setIsModalVisible(false)
      setIsModalMounted(false)
      return
    }

    const animation = Animated.parallel([
      Animated.timing(translateX, {
        toValue: translateValues.x,
        duration: DRAWER_ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: translateValues.y,
        duration: DRAWER_ANIMATION_DURATION,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: DRAWER_ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ])

    animationRef.current = animation
    animation.start(({ finished }) => {
      if (animationRef.current === animation) {
        animationRef.current = null
      }
      if (finished) {
        isModalMountedRef.current = false
        setIsModalVisible(false)
        setIsModalMounted(false)
      }
    })
  }, [isOpen, position, size, disableAnimation, translateX, translateY, overlayOpacity])

  if (!isModalMounted) {
    return null
  }

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        {showOverlay && (
          <Pressable onPress={onClose} style={{ flex: 1 }}>
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
          </Pressable>
        )}

        <Animated.View
          style={[
            styles.drawerContainer,
            positionStyle,
            containerStyle,
            {
              transform: [{ translateX }, { translateY }],
            },
            customStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}
