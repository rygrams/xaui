import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { useBottomTabBarContext } from './bottom-tab-bar-context'
import { useBottomTabBarSizeStyles, useBottomTabBarColors } from './bottom-tab-bar.hook'
import { styles } from './bottom-tab-bar.style'
import type {
  BottomTabBarIconRenderParams,
  BottomTabBarItemProps,
} from './bottom-tab-bar.type'

const resolveIconNode = (
  icon:
    | React.ReactNode
    | ((params: BottomTabBarIconRenderParams) => React.ReactNode)
    | undefined,
  params: BottomTabBarIconRenderParams
) => {
  if (typeof icon === 'function') {
    return icon(params)
  }
  return icon
}

export const BottomTabBarItem: React.FC<BottomTabBarItemProps> = ({
  itemKey,
  label,
  icon,
  activeIcon,
  badge,
  isDisabled = false,
  isSelected,
  showLabel,
  activeColor,
  inactiveColor,
  indicatorColor,
  style,
  customAppearance,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: BottomTabBarItemProps) => {
  const context = useBottomTabBarContext()

  const selected = isSelected ?? context?.selectedKey === itemKey
  const disabled = isDisabled || !!context?.isDisabled
  const resolvedShowLabel = showLabel ?? context?.showLabel ?? true
  const resolvedSize = context?.size ?? 'md'
  const resolvedThemeColor = context?.themeColor ?? 'primary'

  const sizeStyles = useBottomTabBarSizeStyles(resolvedSize)
  const colors = useBottomTabBarColors(
    resolvedThemeColor,
    activeColor ?? context?.activeColor,
    inactiveColor ?? context?.inactiveColor,
    indicatorColor ?? context?.indicatorColor
  )

  const indicatorScale = useRef(new Animated.Value(selected ? 1 : 0.75)).current
  const indicatorOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(indicatorScale, {
        toValue: selected ? 1 : 0.75,
        friction: 9,
        tension: 95,
        useNativeDriver: true,
      }),
      Animated.timing(indicatorOpacity, {
        toValue: selected ? 1 : 0,
        duration: selected ? 180 : 140,
        useNativeDriver: true,
      }),
    ]).start()
  }, [indicatorOpacity, indicatorScale, selected])

  const iconColor = selected ? colors.activeColor : colors.inactiveColor

  const iconNode = useMemo(() => {
    const params = {
      focused: !!selected,
      color: iconColor,
      size: sizeStyles.iconSize,
    }

    if (selected && activeIcon) {
      return resolveIconNode(activeIcon, params)
    }

    return resolveIconNode(icon, params)
  }, [activeIcon, icon, iconColor, selected, sizeStyles.iconSize])

  return (
    <Pressable
      onPress={event => {
        if (disabled) return
        context?.onSelectionChange?.(itemKey)
        onPress?.(event)
      }}
      onLongPress={onLongPress}
      disabled={disabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!selected, disabled }}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={styles.itemPressable}
    >
      <View
        style={[
          styles.itemContainer,
          {
            paddingTop: sizeStyles.itemPaddingTop,
            paddingBottom: sizeStyles.itemPaddingBottom,
          },
          disabled && styles.disabled,
          style,
          customAppearance?.container,
        ]}
      >
        <Animated.View
          style={[
            styles.indicator,
            {
              width: sizeStyles.indicatorWidth,
              height: sizeStyles.indicatorHeight,
              marginBottom: resolvedShowLabel ? sizeStyles.labelSpacing : 0,
            },
            customAppearance?.indicator,
          ]}
        >
          <Animated.View
            style={[
              styles.indicatorBackground,
              {
                width: sizeStyles.indicatorWidth,
                height: sizeStyles.indicatorHeight,
                borderRadius: sizeStyles.indicatorRadius,
                backgroundColor: colors.indicatorColor,
                transform: [{ scale: indicatorScale }],
                opacity: indicatorOpacity,
              },
            ]}
          />
          <View>
            {iconNode}
            {badge ? <View style={styles.badgeContainer}>{badge}</View> : null}
          </View>
        </Animated.View>

        {resolvedShowLabel && (
          <Text
            numberOfLines={1}
            style={[
              styles.label,
              {
                color: iconColor,
                fontSize: sizeStyles.labelSize,
              },
              customAppearance?.label,
            ]}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  )
}
