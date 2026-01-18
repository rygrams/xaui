import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  LayoutChangeEvent,
} from 'react-native'
import { useXUITheme } from '@xaui/core'
import { useAccordionContext } from './accordion-context'
import type { AccordionItemProps } from './accordion-item-types'
import { ChevronRightIcon } from './chevron-right-icon'

export const AccordionItem: React.FC<AccordionItemProps> = ({
  itemKey,
  children,
  title,
  subtitle,
  startContent,
  indicator,
  baseStyle,
  headingStyle,
  triggerStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  startContentStyle,
  indicatorStyle,
  onSelected,
}) => {
  const theme = useXUITheme()
  const context = useAccordionContext()
  const {
    variant,
    hideIndicator,
    disableAnimation,
    isCompact,
    expandedKeys,
    disabledKeys,
    toggleItem,
  } = context

  const isExpanded = expandedKeys.includes(itemKey)
  const isDisabled = disabledKeys.includes(itemKey)

  const [contentHeight, setContentHeight] = useState(0)
  const animatedHeight = useRef(new Animated.Value(isExpanded ? 1 : 0)).current
  const animatedRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current

  useEffect(() => {
    if (disableAnimation) {
      animatedHeight.setValue(isExpanded ? 1 : 0)
      animatedRotation.setValue(isExpanded ? 1 : 0)
      return
    }

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(animatedRotation, {
        toValue: isExpanded ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }, [isExpanded, disableAnimation, animatedHeight, animatedRotation])

  const handlePress = useCallback(() => {
    if (isDisabled) return
    toggleItem(itemKey)
    onSelected?.(!isExpanded)
  }, [isDisabled, toggleItem, itemKey, onSelected, isExpanded])

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height)
  }, [])

  const heightInterpolation = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  })

  const rotationInterpolation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  })

  const baseStyles = useMemo(() => {
    const base: any = {
      overflow: 'hidden',
    }

    if (variant === 'splitted') {
      base.paddingHorizontal = theme.spacing.lg
      base.backgroundColor = theme.colors.default.background
      base.borderRadius = theme.borderRadius.md
      base.marginBottom = theme.spacing.sm
      base.shadowColor = '#000'
      base.shadowOffset = { width: 0, height: 2 }
      base.shadowOpacity = 0.1
      base.shadowRadius = 4
      base.elevation = 2
    }

    if (isDisabled) {
      base.opacity = 0.4
    }

    return base
  }, [variant, isDisabled, theme])

  const triggerStyles = useMemo(() => {
    const trigger: any = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: isCompact ? theme.spacing.sm : theme.spacing.lg,
      gap: theme.spacing.md,
    }

    if (variant !== 'splitted') {
      trigger.paddingHorizontal = theme.spacing.sm
    }

    return trigger
  }, [variant, isCompact, theme])

  const titleTextStyle = useMemo(() => {
    return {
      fontSize: isCompact ? theme.fontSizes.md : theme.fontSizes.lg,
      fontWeight: theme.fontWeights.medium as any,
      color: theme.colors.foreground,
    }
  }, [isCompact, theme])

  const subtitleTextStyle = useMemo(() => {
    return {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.default.foreground,
      marginTop: theme.spacing.xs,
    }
  }, [theme])

  const contentContainerStyle = useMemo(() => {
    return {
      paddingBottom: isCompact ? theme.spacing.sm : theme.spacing.md,
      paddingHorizontal: variant === 'splitted' ? 0 : theme.spacing.sm,
    }
  }, [isCompact, variant, theme])

  return (
    <View style={[baseStyles, baseStyle]}>
      <View style={headingStyle}>
        <Pressable
          style={[triggerStyles, triggerStyle]}
          onPress={handlePress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        >
          {startContent && (
            <View style={[styles.startContent, startContentStyle]}>{startContent}</View>
          )}

          <View style={styles.titleWrapper}>
            {typeof title === 'string' ? (
              <Text style={[titleTextStyle, titleStyle]}>{title}</Text>
            ) : (
              title
            )}
            {subtitle && (
              <>
                {typeof subtitle === 'string' ? (
                  <Text style={[subtitleTextStyle, subtitleStyle]}>{subtitle}</Text>
                ) : (
                  subtitle
                )}
              </>
            )}
          </View>

          {!hideIndicator && (
            <Animated.View
              style={[
                styles.indicator,
                indicatorStyle,
                {
                  transform: [{ rotate: rotationInterpolation }],
                },
              ]}
            >
              {indicator || <ChevronRightIcon color={theme.colors.default.foreground} />}
            </Animated.View>
          )}
        </Pressable>
      </View>

      <Animated.View
        style={{
          height: disableAnimation ? (isExpanded ? 'auto' : 0) : heightInterpolation,
          overflow: 'hidden',
        }}
      >
        <View onLayout={onContentLayout}>
          <View style={[contentContainerStyle, contentStyle]}>{children}</View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  startContent: {
    flexShrink: 0,
  },
  titleWrapper: {
    flex: 1,
  },
  indicator: {
    flexShrink: 0,
  },
})
