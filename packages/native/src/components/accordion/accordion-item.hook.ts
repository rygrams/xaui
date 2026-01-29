import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import {
  Animated,
  Easing,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { useXUITheme } from '../../core'
import { colors as palette } from '@xaui/core/palette'
import { useAccordionContext } from './accordion-context'

export const useAccordionItemState = (itemKey?: string) => {
  const context = useAccordionContext()
  const resolvedItemKey = itemKey ?? ''
  const isExpanded = resolvedItemKey
    ? context.expandedKeys.includes(resolvedItemKey)
    : false
  const isDisabled = resolvedItemKey
    ? context.disabledKeys.includes(resolvedItemKey)
    : false

  const handlePress = useCallback(() => {
    if (isDisabled || !resolvedItemKey) return
    context.toggleItem(resolvedItemKey)
  }, [isDisabled, resolvedItemKey, context])

  return { ...context, resolvedItemKey, isExpanded, isDisabled, handlePress }
}

export const useAccordionItemAnimation = (
  isExpanded: boolean,
  disableAnimation: boolean
) => {
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
    if (contentHeight <= 0 || contentHeight === prevContentHeight.current || !isExpanded)
      return
    prevContentHeight.current = contentHeight
    if (!disableAnimation && isMeasured) {
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start()
    }
  }, [contentHeight, isExpanded, disableAnimation, isMeasured, animatedHeight])

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

  return {
    onContentLayout,
    heightInterpolation,
    rotationInterpolation,
    contentHeight,
  }
}

export const useBaseStyles = (variant: string, isDisabled: boolean) => {
  const theme = useXUITheme()

  const baseStyles = useMemo<ViewStyle>(() => {
    const base: ViewStyle = { overflow: 'hidden' }

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

  return baseStyles
}

export const useTriggerStyles = (variant: string, isCompact: boolean) => {
  const theme = useXUITheme()

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

  return triggerStyles
}

export const useTitleTextStyle = (isCompact: boolean) => {
  const theme = useXUITheme()

  const titleTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: isCompact ? theme.fontSizes.md : theme.fontSizes.lg,
      fontWeight: theme.fontWeights.medium as TextStyle['fontWeight'],
      color: theme.colors.foreground,
    }),
    [isCompact, theme]
  )

  return titleTextStyle
}

export const useSubtitleTextStyle = () => {
  const theme = useXUITheme()

  const subtitleTextStyle = useMemo<TextStyle>(
    () => ({
      fontSize: theme.fontSizes.sm,
      color: palette.gray[500],
      marginTop: theme.spacing.xs,
    }),
    [theme]
  )

  return subtitleTextStyle
}

export const useContentContainerStyle = (isCompact: boolean, variant: string) => {
  const theme = useXUITheme()

  const contentContainerStyle = useMemo<ViewStyle>(
    () => ({
      paddingBottom: isCompact ? theme.spacing.sm : theme.spacing.md,
      paddingHorizontal: variant === 'light' ? theme.spacing.sm : 0,
    }),
    [isCompact, variant, theme]
  )

  return contentContainerStyle
}

export const useForegroundColor = () => {
  const theme = useXUITheme()
  return theme.colors.foreground
}
