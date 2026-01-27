import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { useXUITheme } from '../../core'
import { useAccordionContext } from './accordion-context'
import type { AccordionItemProps } from './accordion-item.type'
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
  const {
    variant,
    hideIndicator,
    disableAnimation,
    isCompact,
    expandedKeys,
    disabledKeys,
    toggleItem,
  } = useAccordionContext()

  const resolvedItemKey = itemKey ?? ''
  const isExpanded = resolvedItemKey ? expandedKeys.includes(resolvedItemKey) : false
  const isDisabled = resolvedItemKey ? disabledKeys.includes(resolvedItemKey) : false

  const [contentHeight, setContentHeight] = useState(0)
  const [isMeasured, setIsMeasured] = useState(false)
  const animatedHeight = useRef(new Animated.Value(isExpanded ? 1 : 0)).current
  const animatedRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current
  const prevContentHeight = useRef(contentHeight)

  useEffect(() => {
    if (disableAnimation) {
      animatedHeight.setValue(isExpanded ? 1 : 0)
      animatedRotation.setValue(isExpanded ? 1 : 0)
      return
    }

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.timing(animatedRotation, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true,
      }),
    ]).start()
  }, [isExpanded, disableAnimation, animatedHeight, animatedRotation])

  useEffect(() => {
    if (contentHeight > 0 && contentHeight !== prevContentHeight.current && isExpanded) {
      prevContentHeight.current = contentHeight
      if (!disableAnimation && isMeasured) {
        Animated.timing(animatedHeight, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }).start()
      }
    }
  }, [contentHeight, isExpanded, disableAnimation, isMeasured, animatedHeight])

  const handlePress = useCallback(() => {
    if (isDisabled || !resolvedItemKey) return
    toggleItem(resolvedItemKey)
    onSelected?.(!isExpanded)
  }, [isDisabled, toggleItem, resolvedItemKey, onSelected, isExpanded])

  const onContentLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height
    if (height > 0) {
      setContentHeight(height)
      setIsMeasured(true)
    }
  }, [])

  const heightInterpolation = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  })

  const rotationInterpolation = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  })

  const baseStyles = useMemo<ViewStyle>(() => {
    const base: ViewStyle = {
      overflow: 'hidden',
    }

    if (variant === 'splitted') {
      base.paddingHorizontal = theme.spacing.md
      base.backgroundColor = theme.colors.default.background
      base.borderRadius = theme.borderRadius.md
      base.marginBottom = theme.spacing.sm
    } else if (variant === 'bordered') {
      base.paddingHorizontal = theme.spacing.md
    }

    if (isDisabled) {
      base.opacity = 0.4
    }

    return base
  }, [variant, isDisabled, theme])

  const triggerStyles = useMemo<ViewStyle>(() => {
    const trigger: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: isCompact ? theme.spacing.xs : theme.spacing.md,
      gap: theme.spacing.md,
    }

    if (variant === 'light') {
      trigger.paddingHorizontal = theme.spacing.sm
    }

    return trigger
  }, [variant, isCompact, theme])

  const titleTextStyle = useMemo<TextStyle>(() => {
    return {
      fontSize: isCompact ? theme.fontSizes.md : theme.fontSizes.lg,
      fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      color: theme.colors.foreground,
    }
  }, [isCompact, theme])

  const subtitleTextStyle = useMemo<TextStyle>(() => {
    return {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.default.main,
      marginTop: theme.spacing.xs,
    }
  }, [theme])

  const contentContainerStyle = useMemo<ViewStyle>(() => {
    return {
      paddingBottom: isCompact ? theme.spacing.sm : theme.spacing.md,
      paddingHorizontal: variant === 'light' ? theme.spacing.sm : 0,
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
              {indicator || <ChevronRightIcon color={theme.colors.foreground} />}
            </Animated.View>
          )}
        </Pressable>
      </View>

      <>
        <View
          style={{
            position: 'absolute',
            opacity: 0,
            left: 0,
            right: 0,
            zIndex: -999,
          }}
          pointerEvents="none"
        >
          <View onLayout={onContentLayout} style={[contentContainerStyle, contentStyle]}>
            {children}
          </View>
        </View>
        <Animated.View
          style={[
            {
              overflow: 'hidden',
            },
            disableAnimation
              ? { height: isExpanded ? undefined : 0 }
              : { height: heightInterpolation },
          ]}
        >
          <View style={[contentContainerStyle, contentStyle]}>{children}</View>
        </Animated.View>
      </>
    </View>
  )
}

AccordionItem.displayName = 'AccordionItem'

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
