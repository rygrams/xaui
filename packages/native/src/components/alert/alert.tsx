import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { styles } from './alert.style'
import {
  useAlertContainerStyles,
  useAlertIconWrapperStyles,
  useAlertTextStyles,
} from './alert.hook'
import type { AlertProps } from './alert.type'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from './alert-icons'
import { CloseIcon } from '@xaui/icons'
import type { ThemeColor } from '../../types'

const iconMap: Record<
  ThemeColor,
  React.ComponentType<{ color: string; size: number }>
> = {
  default: InfoIcon,
  primary: InfoIcon,
  secondary: InfoIcon,
  tertiary: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  icon,
  themeColor = 'default',
  variant = 'flat',
  radius = 'md',
  isClosable = false,
  hideIcon = false,
  closeButton,
  isVisible,
  customAppearance,
  children,
  onClose,
  onVisibleChange,
}) => {
  const [internalVisible, setInternalVisible] = useState(isVisible ?? true)
  const [shouldRender, setShouldRender] = useState(isVisible ?? true)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible

  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  const radiusStyles = useBorderRadiusStyles(radius)
  const containerStyles = useAlertContainerStyles(themeColor, variant)
  const iconWrapperStyles = useAlertIconWrapperStyles(themeColor, variant)
  const { titleStyles, descriptionStyles, iconColor, closeButtonColor } =
    useAlertTextStyles(themeColor, variant)

  const finishClosing = useCallback(() => {
    setShouldRender(false)
    if (!isControlled) {
      setInternalVisible(false)
    }
    onVisibleChange?.(false)
    onClose?.()
  }, [isControlled, onClose, onVisibleChange])

  const handleClose = useCallback(() => {
    if (!visible) return

    opacity.value = withTiming(0, { duration: 250 })
    scale.value = withTiming(0.95, { duration: 250 }, finished => {
      if (finished) {
        runOnJS(finishClosing)()
      }
    })
  }, [finishClosing, opacity, scale, visible])

  useEffect(() => {
    if (visible && !shouldRender) {
      setShouldRender(true)
      opacity.value = 0
      scale.value = 0.95
      opacity.value = withTiming(1, { duration: 250 })
      scale.value = withTiming(1, { duration: 250 })
      return
    }

    if (!visible && shouldRender) {
      handleClose()
    }
  }, [visible, shouldRender, opacity, scale, handleClose])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const IconComponent = iconMap[themeColor] ?? InfoIcon

  const shouldShowClose = Boolean(closeButton || isClosable || onClose)

  const renderIcon = () => {
    if (hideIcon) return null
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, { color: iconColor, size: 22 } as never)
    }
    if (icon) {
      return <Text style={[styles.iconText, { color: iconColor }]}>{icon}</Text>
    }
    return <IconComponent color={iconColor} size={22} />
  }

  const renderContentText = (
    content: AlertProps['title'] | AlertProps['description']
  ) => {
    if (content === null || content === undefined) return null
    if (typeof content === 'string' || typeof content === 'number') {
      return (
        <Text
          style={[
            styles.description,
            descriptionStyles,
            customAppearance?.description,
          ]}
        >
          {content}
        </Text>
      )
    }
    return content
  }

  const titleNode = useMemo(() => {
    if (title === null || title === undefined) return null
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <Text style={[styles.title, titleStyles, customAppearance?.title]}>
          {title}
        </Text>
      )
    }
    return title
  }, [title, customAppearance?.title, titleStyles])

  const descriptionNode = renderContentText(description)

  const childrenNode = renderContentText(children)

  const closeButtonNode = useMemo(() => {
    if (!closeButton) return null
    if (!isValidElement(closeButton)) return closeButton

    const existingOnPress = (
      closeButton.props as { onPress?: (event: unknown) => void }
    ).onPress

    return cloneElement(closeButton, {
      onPress: (event: unknown) => {
        existingOnPress?.(event)
        handleClose()
      },
    } as never)
  }, [closeButton, handleClose])

  if (!shouldRender) return null

  return (
    <Animated.View
      accessibilityRole="alert"
      style={[
        styles.container,
        containerStyles,
        radiusStyles,
        customAppearance?.container,
        animatedStyle,
      ]}
    >
      {!hideIcon && (
        <View style={[styles.iconWrapper, iconWrapperStyles]}>{renderIcon()}</View>
      )}
      <View style={styles.mainWrapper}>
        {titleNode}
        {descriptionNode}
        {childrenNode && <View style={styles.extraContent}>{childrenNode}</View>}
      </View>
      {shouldShowClose && (
        <View>
          {closeButtonNode ?? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={handleClose}
              style={styles.closeButton}
            >
              <CloseIcon size={20} color={closeButtonColor} />
            </Pressable>
          )}
        </View>
      )}
    </Animated.View>
  )
}
