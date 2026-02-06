import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import { Portal } from '../../core/portal'
import { useXUITheme } from '../../core'
import type { MenuProps } from './menu.type'
import { styles, ANIMATION_DURATION } from './menu.style'
import { useMenuMeasurements } from './menu.hook'

const EASING = Easing.bezier(0.4, 0, 0.2, 1)

export const Menu: React.FC<MenuProps> = ({
  visible,
  trigger,
  position = 'bottom',
  onDismiss,
  children,
  customAppearance,
  maxHeight = 280,
}) => {
  const theme = useXUITheme()
  const [rendered, setRendered] = useState(visible)
  const opacityAnimation = useRef(new Animated.Value(0)).current
  const scaleAnimation = useRef(new Animated.Value(0)).current

  const { triggerRef, menuRef, menuLayout, menuPosition } = useMenuMeasurements(
    rendered,
    position
  )

  useEffect(() => {
    if (visible && !rendered) {
      setRendered(true)
    }
  }, [visible, rendered])

  useEffect(() => {
    if (rendered && visible) {
      Animated.parallel([
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
      ]).start()
    } else if (rendered && !visible) {
      Animated.parallel([
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: EASING,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRendered(false)
      })
    }
  }, [visible, rendered, opacityAnimation, scaleAnimation])

  const handleDismiss = () => {
    onDismiss?.()
  }

  const renderMenuContent = () => {
    if (menuLayout.height > maxHeight) {
      return <ScrollView style={{ maxHeight }}>{children}</ScrollView>
    }
    return <View>{children}</View>
  }

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        {trigger}
      </View>
      {rendered && (
        <Portal>
          <Pressable
            style={[styles.overlay, customAppearance?.overlay]}
            onPress={handleDismiss}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
          >
            <Animated.View
              ref={menuRef}
              collapsable={false}
              style={[
                styles.menuContainer,
                {
                  top: menuPosition.top,
                  left: menuPosition.left,
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.md,
                  opacity: opacityAnimation,
                  transform: [{ scale: scaleAnimation }],
                  ...theme.shadows.md,
                },
                customAppearance?.container,
              ]}
            >
              <Pressable onPress={(e) => e.stopPropagation()}>
                <View style={customAppearance?.content}>
                  {renderMenuContent()}
                </View>
              </Pressable>
            </Animated.View>
          </Pressable>
        </Portal>
      )}
    </>
  )
}
