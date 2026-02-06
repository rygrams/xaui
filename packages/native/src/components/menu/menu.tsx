import React from 'react'
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import { useXUITheme } from '../../core'
import type { MenuProps } from './menu.type'
import { styles } from './menu.style'
import {
  useMenuTriggerMeasurements,
  useMenuContentLayout,
  useMenuPosition,
  useMenuAnimation,
} from './menu.hook'

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
  const { triggerRef, triggerPosition } = useMenuTriggerMeasurements(visible)
  const { contentSize, handleContentLayout } = useMenuContentLayout()
  const menuPosition = useMenuPosition(triggerPosition, contentSize, position)
  const { opacity, scale } = useMenuAnimation(visible)

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        {trigger}
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <Pressable
          style={[styles.overlay, customAppearance?.overlay]}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        >
          <Animated.View
            onLayout={handleContentLayout}
            style={[
              styles.menuContainer,
              {
                top: menuPosition.top,
                left: menuPosition.left,
                backgroundColor: theme.colors.background,
                borderRadius: theme.borderRadius.md,
                opacity,
                transform: [{ scale }],
                ...theme.shadows.md,
              },
              customAppearance?.container,
            ]}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={customAppearance?.content}>
                <ScrollView style={{ maxHeight }}>
                  {children}
                </ScrollView>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
}
