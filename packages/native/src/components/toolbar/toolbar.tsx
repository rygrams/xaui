import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useToolbarColors, useToolbarVariantStyles } from './toolbar.hook'
import { styles } from './toolbar.style'
import { ToolbarContext } from './toolbar-context'
import type { ToolbarProps } from './toolbar.type'

export const Toolbar: React.FC<ToolbarProps> = ({
  variant = 'docked',
  position = 'top',
  isVisible = true,
  themeColor = 'primary',
  showDivider = false,
  isElevated,
  children,
  style,
  customAppearance,
}: ToolbarProps) => {
  const variantStyles = useToolbarVariantStyles(variant, position)
  const colors = useToolbarColors(themeColor)

  const translateValue = useSharedValue(
    isVisible ? 0 : getInitialTranslate(position)
  )
  const opacityValue = useSharedValue(isVisible ? 1 : 0)

  useEffect(() => {
    if (isVisible) {
      translateValue.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      })
      opacityValue.value = withTiming(1, { duration: 200 })
    } else {
      translateValue.value = withSpring(getInitialTranslate(position), {
        damping: 20,
        stiffness: 300,
      })
      opacityValue.value = withTiming(0, { duration: 200 })
    }
  }, [isVisible, position, translateValue, opacityValue])

  const animatedStyle = useAnimatedStyle(() => {
    const transform =
      position === 'left' || position === 'right'
        ? [{ translateX: translateValue.value }]
        : [{ translateY: translateValue.value }]

    return {
      opacity: opacityValue.value,
      transform,
    }
  })

  const isVertical = variantStyles.isVertical
  const shouldElevate = isElevated ?? variantStyles.isElevated

  const positionStyle =
    position === 'top'
      ? styles.top
      : position === 'bottom'
        ? styles.bottom
        : position === 'left'
          ? styles.left
          : styles.right

  const floatingStyle =
    variant === 'floating'
      ? [
          styles.floating,
          position === 'bottom' && styles.floatingBottom,
          position === 'top' && styles.floatingTop,
        ]
      : null

  return (
    <ToolbarContext.Provider
      value={{
        actionColor: colors.action,
        actionPressedColor: colors.pressed,
        iconSize: variantStyles.iconSize,
        actionButtonSize: variantStyles.actionSize,
      }}
    >
      <Animated.View
        style={[
          styles.container,
          positionStyle,
          floatingStyle,
          animatedStyle,
          {
            height: variantStyles.containerHeight,
            width: variantStyles.containerWidth,
          },
          style,
          customAppearance?.container,
        ]}
      >
        <View
          style={[
            isVertical ? styles.contentVertical : styles.content,
            {
              backgroundColor: colors.background,
              borderRadius: variantStyles.borderRadius,
              paddingHorizontal: variantStyles.paddingHorizontal,
              paddingVertical: variantStyles.paddingVertical,
              borderBottomWidth: showDivider ? 1 : 0,
              borderBottomColor: showDivider ? colors.divider : 'transparent',
              height: '100%',
              width: '100%',
            },
            shouldElevate && [styles.elevated, { shadowColor: colors.shadow }],
            customAppearance?.topRow,
          ]}
        >
          <View
            style={[
              isVertical ? styles.actionsVertical : styles.actions,
              { gap: variantStyles.gap },
              customAppearance?.actionsContainer,
            ]}
          >
            {children}
          </View>
        </View>
      </Animated.View>
    </ToolbarContext.Provider>
  )
}

function getInitialTranslate(position: ToolbarProps['position']): number {
  switch (position) {
    case 'top':
      return -100
    case 'bottom':
      return 100
    case 'left':
      return -100
    case 'right':
      return 100
    default:
      return 0
  }
}
