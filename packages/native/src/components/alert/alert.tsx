import React, { cloneElement, isValidElement, useCallback, useMemo, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './alert.style'
import {
  useAlertContainerStyles,
  useAlertIconWrapperStyles,
  useAlertTextStyles,
} from './alert.hook'
import type { AlertProps } from './alert.type'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from './alert-icons'
import type { ThemeColor } from '../../types'

const iconMap: Record<ThemeColor, React.ComponentType<{ color: string; size: number }>> = {
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
  style,
  titleStyle,
  descriptionStyle,
  children,
  onClose,
  onVisibleChange,
}) => {
  const [internalVisible, setInternalVisible] = useState(isVisible ?? true)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible

  const radiusStyles = useBorderRadiusStyles(radius)
  const containerStyles = useAlertContainerStyles(themeColor, variant)
  const iconWrapperStyles = useAlertIconWrapperStyles(themeColor, variant)
  const { titleStyles, descriptionStyles, iconColor, closeButtonColor } = useAlertTextStyles(
    themeColor,
    variant
  )

  const handleClose = useCallback(() => {
    if (!visible) return
    if (!isControlled) {
      setInternalVisible(false)
    }
    onVisibleChange?.(false)
    onClose?.()
  }, [isControlled, onClose, onVisibleChange, visible])

  const IconComponent = iconMap[themeColor] ?? InfoIcon

  const shouldShowClose = Boolean(closeButton || isClosable || onClose)

  const renderIcon = () => {
    if (hideIcon) return null
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, { color: iconColor, size: 22 })
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
      return <Text style={[styles.description, descriptionStyles, descriptionStyle]}>{content}</Text>
    }
    return content
  }

  const titleNode = useMemo(() => {
    if (title === null || title === undefined) return null
    if (typeof title === 'string' || typeof title === 'number') {
      return <Text style={[styles.title, titleStyles, titleStyle]}>{title}</Text>
    }
    return title
  }, [title, titleStyle, titleStyles])

  const descriptionNode = renderContentText(description)

  const childrenNode = renderContentText(children)

  const closeButtonNode = useMemo(() => {
    if (!closeButton) return null
    if (!isValidElement(closeButton)) return closeButton

    const existingOnPress = closeButton.props.onPress as
      | ((event: unknown) => void)
      | undefined

    return cloneElement(closeButton, {
      onPress: (event: unknown) => {
        existingOnPress?.(event)
        handleClose()
      },
    })
  }, [closeButton, handleClose])

  if (!visible) return null

  return (
    <View
      accessibilityRole="alert"
      style={[styles.container, containerStyles, radiusStyles, style]}
    >
      {!hideIcon && <View style={[styles.iconWrapper, iconWrapperStyles]}>{renderIcon()}</View>}
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
              <Text style={[styles.closeText, { color: closeButtonColor }]}>x</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  )
}
