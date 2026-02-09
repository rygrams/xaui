import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { useBottomTabBarContext } from './bottom-tab-bar-context'
import {
  useBottomTabBarSizeStyles,
  useBottomTabBarColors,
} from './bottom-tab-bar.hook'
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
  const INLINE_INDICATOR_HORIZONTAL_PADDING = 10
  const INLINE_INDICATOR_VERTICAL_PADDING = 14
  const ICON_ONLY_INDICATOR_HORIZONTAL_PADDING = 10
  const ICON_ONLY_INDICATOR_VERTICAL_PADDING = 10

  const context = useBottomTabBarContext()

  const selected = isSelected ?? context?.selectedKey === itemKey
  const disabled = isDisabled || !!context?.isDisabled
  const resolvedVariant = context?.variant ?? 'stacked'
  const isIconOnly = resolvedVariant === 'icon-only'
  const resolvedShowLabel = isIconOnly
    ? false
    : (showLabel ?? context?.showLabel ?? true)
  const isInline = resolvedVariant === 'inline'
  const resolvedSize = context?.size ?? 'md'
  const resolvedThemeColor = context?.themeColor ?? 'primary'
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 })

  const sizeStyles = useBottomTabBarSizeStyles(resolvedSize)
  const resolvedIndicatorWidth = isInline
    ? Math.max(
        sizeStyles.indicatorHeight,
        contentSize.width + INLINE_INDICATOR_HORIZONTAL_PADDING * 2
      )
    : isIconOnly
      ? Math.max(
          sizeStyles.indicatorWidth,
          contentSize.width + ICON_ONLY_INDICATOR_HORIZONTAL_PADDING * 2
        )
      : sizeStyles.indicatorWidth
  const resolvedIndicatorHeight = isInline
    ? Math.max(
        sizeStyles.indicatorHeight,
        contentSize.height + INLINE_INDICATOR_VERTICAL_PADDING * 1.35
      )
    : isIconOnly
      ? Math.max(
          sizeStyles.indicatorHeight,
          contentSize.height + ICON_ONLY_INDICATOR_VERTICAL_PADDING * 2
        )
      : sizeStyles.indicatorHeight
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

  const labelNode = resolvedShowLabel ? (
    <Text
      numberOfLines={1}
      style={[
        styles.label,
        isInline && styles.inlineLabel,
        {
          color: iconColor,
          fontSize: sizeStyles.labelSize,
        },
        customAppearance?.label,
      ]}
    >
      {label}
    </Text>
  ) : null

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
          isInline && styles.itemContainerInline,
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
              width: resolvedIndicatorWidth,
              height: resolvedIndicatorHeight,
              marginBottom:
                !isInline && resolvedShowLabel ? sizeStyles.labelSpacing : 0,
            },
            customAppearance?.indicator,
          ]}
        >
          <Animated.View
            style={[
              styles.indicatorBackground,
              {
                width: resolvedIndicatorWidth,
                height: resolvedIndicatorHeight,
                borderRadius: resolvedIndicatorHeight / 2,
                backgroundColor: colors.indicatorColor,
                transform: [{ scale: indicatorScale }],
                opacity: indicatorOpacity,
              },
            ]}
          />
          <View
            style={styles.indicatorContent}
            onLayout={event => {
              if (!isInline && !isIconOnly) return
              const nextWidth = Math.ceil(event.nativeEvent.layout.width)
              const nextHeight = Math.ceil(event.nativeEvent.layout.height)
              setContentSize(prev =>
                prev.width === nextWidth && prev.height === nextHeight
                  ? prev
                  : { width: nextWidth, height: nextHeight }
              )
            }}
          >
            {iconNode}
            {badge ? <View style={styles.badgeContainer}>{badge}</View> : null}
            {isInline ? labelNode : null}
          </View>
        </Animated.View>

        {!isInline ? labelNode : null}
      </View>
    </Pressable>
  )
}
