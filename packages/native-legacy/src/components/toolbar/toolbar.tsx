import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
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
    const nextTranslate = isVisible ? 0 : getInitialTranslate(position)

    if (isVisible) {
      translateValue.value = withTiming(nextTranslate, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      })
      opacityValue.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.quad),
      })
    } else {
      translateValue.value = withTiming(nextTranslate, {
        duration: 180,
        easing: Easing.in(Easing.cubic),
      })
      opacityValue.value = withTiming(0, {
        duration: 150,
        easing: Easing.in(Easing.quad),
      })
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
      return -24
    case 'bottom':
      return 24
    case 'left':
      return -24
    case 'right':
      return 24
    default:
      return 0
  }
}
