import React, {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Animated, Easing, Pressable, Text, View } from 'react-native'
import { Portal } from '../../core'
import type { SnackbarItem, SnackbarProps, SnackbarStackProps } from './snackbar.type'
import {
  SNACKBAR_DEFAULT_DURATION,
  SNACKBAR_DEFAULT_HORIZONTAL_INSET,
  SNACKBAR_DEFAULT_MAX_WIDTH,
  SNACKBAR_DEFAULT_SPACING,
  SNACKBAR_DEFAULT_VERTICAL_INSET,
  styles,
} from './snackbar.style'
import { useSnackbarColors, useSnackbarStackPositionStyles } from './snackbar.hook'
import { CloseIcon } from '@xaui/icons/close'

const ENTER_ANIMATION_DURATION = 220
const EXIT_ANIMATION_DURATION = 180
const ENTER_INITIAL_SCALE = 0.92

const SnackbarSurface: React.FC<{
  item: SnackbarItem
  duration: number
  onDismiss?: (id: string) => void
}> = ({ item, duration, onDismiss }) => {
  const {
    id,
    message,
    actionLabel,
    onActionPress,
    closeOnActionPress = true,
    showCloseAffordance = false,
    themeColor = 'default',
    numberOfLines = 2,
    customAppearance,
  } = item

  const { containerColor, textColor, actionColor, pressedOverlayColor } =
    useSnackbarColors(themeColor)

  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(ENTER_INITIAL_SCALE)).current
  const exitAnimationStartedRef = useRef(false)
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearDismissTimer = useCallback(() => {
    if (!dismissTimeoutRef.current) return
    clearTimeout(dismissTimeoutRef.current)
    dismissTimeoutRef.current = null
  }, [])

  const runExitAnimation = useCallback(() => {
    if (exitAnimationStartedRef.current) return
    exitAnimationStartedRef.current = true
    clearDismissTimer()

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: EXIT_ANIMATION_DURATION,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: ENTER_INITIAL_SCALE,
        duration: EXIT_ANIMATION_DURATION,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return
      onDismiss?.(id)
    })
  }, [clearDismissTimer, id, onDismiss, opacity, scale])

  useEffect(() => {
    opacity.setValue(0)
    scale.setValue(ENTER_INITIAL_SCALE)
    exitAnimationStartedRef.current = false

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ENTER_ANIMATION_DURATION,
        easing: Easing.bezier(0.2, 0, 0, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: ENTER_ANIMATION_DURATION,
        easing: Easing.bezier(0.2, 0, 0, 1),
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, scale])

  useEffect(() => {
    clearDismissTimer()

    if (duration <= 0) return

    dismissTimeoutRef.current = globalThis.setTimeout(() => {
      runExitAnimation()
    }, duration)

    return clearDismissTimer
  }, [clearDismissTimer, duration, runExitAnimation])

  useEffect(() => {
    return () => {
      clearDismissTimer()
      opacity.stopAnimation()
      scale.stopAnimation()
    }
  }, [clearDismissTimer, opacity, scale])

  const handleDismiss = useCallback(() => {
    runExitAnimation()
  }, [runExitAnimation])

  const handleActionPress = useCallback(() => {
    onActionPress?.()
    if (closeOnActionPress) {
      handleDismiss()
    }
  }, [onActionPress, closeOnActionPress, handleDismiss])

  const messageNode = useMemo(() => {
    if (typeof message === 'string' || typeof message === 'number') {
      return (
        <Text
          style={[styles.messageText, { color: textColor }, customAppearance?.message]}
          numberOfLines={numberOfLines}
        >
          {message}
        </Text>
      )
    }

    return message
  }, [customAppearance?.message, message, numberOfLines, textColor])

  const actionNode = useMemo(() => {
    if (actionLabel === null || actionLabel === undefined) return null

    if (typeof actionLabel === 'string' || typeof actionLabel === 'number') {
      return (
        <Text style={[styles.actionText, { color: actionColor }, customAppearance?.action]}>
          {actionLabel}
        </Text>
      )
    }

    if (isValidElement(actionLabel)) {
      return actionLabel
    }

    return null
  }, [actionColor, actionLabel, customAppearance?.action])

  const hasActions = Boolean(actionNode || showCloseAffordance)
  const isMultiline = numberOfLines > 1

  return (
    <Animated.View
      accessibilityRole="alert"
      style={[
        styles.surface,
        { backgroundColor: containerColor },
        !hasActions && styles.surfaceWithoutActions,
        customAppearance?.container,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <View
        style={[
          styles.messageWrapper,
          isMultiline && styles.messageWrapperMultiline,
        ]}
      >
        {messageNode}
      </View>

      {hasActions && (
        <View style={styles.trailingActions}>
          {actionNode && (
            <Pressable
              accessibilityRole="button"
              onPress={handleActionPress}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && { backgroundColor: pressedOverlayColor },
              ]}
            >
              {actionNode}
            </Pressable>
          )}

          {showCloseAffordance && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close snackbar"
              onPress={handleDismiss}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && { backgroundColor: pressedOverlayColor },
                customAppearance?.closeButton,
              ]}
            >
              <CloseIcon size={20} color={textColor} />
            </Pressable>
          )}
        </View>
      )}
    </Animated.View>
  )
}

export const SnackbarStack: React.FC<SnackbarStackProps> = ({
  items,
  onDismiss,
  position = 'bottom',
  spacing = SNACKBAR_DEFAULT_SPACING,
  insetHorizontal = SNACKBAR_DEFAULT_HORIZONTAL_INSET,
  insetVertical = SNACKBAR_DEFAULT_VERTICAL_INSET,
  maxWidth = SNACKBAR_DEFAULT_MAX_WIDTH,
  defaultDuration = SNACKBAR_DEFAULT_DURATION,
  usePortal = true,
  customAppearance,
}) => {
  const stackPositionStyles = useSnackbarStackPositionStyles(
    position,
    insetHorizontal,
    insetVertical,
    maxWidth
  )

  if (!items.length) return null
  const itemsToRender = position === 'top' ? [...items].reverse() : items

  const stackNode = (
    <View
      pointerEvents="box-none"
      style={[
        styles.stackContainer,
        stackPositionStyles.container,
        customAppearance?.container,
      ]}
    >
      <View
        pointerEvents="box-none"
        style={[
          styles.stackContent,
          stackPositionStyles.content,
          { gap: spacing },
          customAppearance?.content,
        ]}
      >
        {itemsToRender.map(item => (
          <SnackbarSurface
            key={item.id}
            item={item}
            duration={item.duration ?? defaultDuration}
            onDismiss={onDismiss}
          />
        ))}
      </View>
    </View>
  )

  return usePortal ? <Portal>{stackNode}</Portal> : stackNode
}

export const Snackbar: React.FC<SnackbarProps> = ({
  isVisible,
  duration = SNACKBAR_DEFAULT_DURATION,
  onClose,
  onVisibleChange,
  position = 'bottom',
  insetHorizontal = SNACKBAR_DEFAULT_HORIZONTAL_INSET,
  insetVertical = SNACKBAR_DEFAULT_VERTICAL_INSET,
  maxWidth = SNACKBAR_DEFAULT_MAX_WIDTH,
  usePortal = true,
  ...itemProps
}) => {
  const [internalVisible, setInternalVisible] = useState(isVisible ?? true)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible
  const idRef = useRef(`snackbar-${Date.now()}-${Math.random().toString(16).slice(2)}`)

  const dismiss = useCallback(() => {
    if (!isControlled) {
      setInternalVisible(false)
    }
    onVisibleChange?.(false)
    onClose?.()
  }, [isControlled, onClose, onVisibleChange])

  const items = useMemo<SnackbarItem[]>(
    () =>
      visible
        ? [
            {
              id: idRef.current,
              duration,
              ...itemProps,
            },
          ]
        : [],
    [duration, itemProps, visible]
  )

  return (
    <SnackbarStack
      items={items}
      onDismiss={dismiss}
      position={position}
      insetHorizontal={insetHorizontal}
      insetVertical={insetVertical}
      maxWidth={maxWidth}
      defaultDuration={duration}
      usePortal={usePortal}
    />
  )
}
