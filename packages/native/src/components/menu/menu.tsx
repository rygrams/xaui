import React from 'react'
import { Animated, Modal, Pressable, ScrollView, View } from 'react-native'
import { useXUITheme } from '../../core'
import type { MenuProps } from './menu.type'
import type { MenuItemProps } from './menu-item.type'
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
  onItemPress,
  children,
  customAppearance,
  maxHeight = 280,
}) => {
  const theme = useXUITheme()
  const { triggerRef, triggerPosition } = useMenuTriggerMeasurements(visible)
  const { contentSize, handleContentLayout, isMeasured } =
    useMenuContentLayout(visible)
  const menuPosition = useMenuPosition(triggerPosition, contentSize, position)
  const { opacity, scale } = useMenuAnimation(visible)

  const handledChildren = React.Children.map(children, child => {
    if (!React.isValidElement<MenuItemProps>(child)) return child

    const { onPress, itemKey } = child.props
    if (!onPress && !itemKey) return child

    return React.cloneElement(child, {
      onPress: e => {
        onPress?.(e)
        if (itemKey) onItemPress?.(itemKey)
      },
    })
  })

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
                top: isMeasured ? menuPosition.top : -9999,
                left: isMeasured ? menuPosition.left : -9999,
                backgroundColor:
                  theme.mode === 'dark'
                    ? theme.colors.default.background
                    : theme.colors.background,
                borderRadius: theme.borderRadius.md,
                opacity: isMeasured ? opacity : 0,
                transform: [{ scale }],
                ...theme.shadows.md,
              },
              customAppearance?.container,
            ]}
          >
            <Pressable onPress={e => e.stopPropagation()}>
              <View style={customAppearance?.content}>
                <ScrollView style={{ maxHeight }}>{handledChildren}</ScrollView>
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  )
}
