'use client'

import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  useAlertContainerStyles,
  useAlertIconWrapperStyles,
  useAlertTextStyles,
} from './alert.hook'
import type { AlertProps } from './alert.type'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { CloseIcon, DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from './alert-icons'
import type { ThemeColor } from '../../types'
import { alertStyles } from './alert.style'
import { cn } from '../../utils/cn'

const iconMap: Record<ThemeColor, React.ComponentType<{ color: string; size: number }>> = {
  default: InfoIcon,
  primary: InfoIcon,
  secondary: InfoIcon,
  tertiary: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

type AlertAnimState = 'open' | 'closed'

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
  const [animState, setAnimState] = useState<AlertAnimState>('open')
  const isInitialMount = useRef(true)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible

  const radiusStyles = useBorderRadiusStyles(radius)
  const containerDynamicStyles = useAlertContainerStyles(themeColor, variant)
  const iconWrapperStyles = useAlertIconWrapperStyles(themeColor, variant)
  const { titleStyles, descriptionStyles, iconColor, closeButtonColor } = useAlertTextStyles(
    themeColor,
    variant
  )

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
    setAnimState('closed')
  }, [visible])

  const handleAnimationEnd = useCallback(() => {
    if (animState === 'closed') {
      finishClosing()
    }
  }, [animState, finishClosing])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (visible && !shouldRender) {
      setShouldRender(true)
      setAnimState('open')
      return
    }

    if (!visible && shouldRender) {
      handleClose()
    }
  }, [visible, shouldRender, handleClose])

  const IconComponent = iconMap[themeColor] ?? InfoIcon
  const shouldShowClose = Boolean(closeButton || isClosable || onClose)

  const renderIcon = () => {
    if (hideIcon) return null
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, { color: iconColor, size: 22 } as never)
    }
    if (icon) {
      return (
        <span className={alertStyles.iconText} style={{ color: iconColor }}>
          {icon}
        </span>
      )
    }
    return <IconComponent color={iconColor} size={22} />
  }

  const renderContentText = (content: AlertProps['title'] | AlertProps['description']) => {
    if (content === null || content === undefined) return null
    if (typeof content === 'string' || typeof content === 'number') {
      return (
        <p
          className={alertStyles.description}
          style={{ ...descriptionStyles, ...customAppearance?.description }}
        >
          {content}
        </p>
      )
    }
    return content
  }

  const titleNode = useMemo(() => {
    if (title === null || title === undefined) return null
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <p
          className={alertStyles.title}
          style={{ ...titleStyles, ...customAppearance?.title }}
        >
          {title}
        </p>
      )
    }
    return title
  }, [title, customAppearance?.title, titleStyles])

  const descriptionNode = renderContentText(description)
  const childrenNode = renderContentText(children)

  const closeButtonNode = useMemo(() => {
    if (!closeButton) return null
    if (!isValidElement(closeButton)) return closeButton

    const existingOnClick = (closeButton.props as { onClick?: (e: unknown) => void }).onClick

    return cloneElement(closeButton, {
      onClick: (e: unknown) => {
        existingOnClick?.(e)
        handleClose()
      },
    } as never)
  }, [closeButton, handleClose])

  if (!shouldRender) return null

  return (
    <div
      role="alert"
      data-xui-state={animState}
      className={cn(alertStyles.container)}
      style={{ ...containerDynamicStyles, ...radiusStyles, ...customAppearance?.container }}
      onAnimationEnd={handleAnimationEnd}
    >
      {!hideIcon && (
        <div className={alertStyles.iconWrapper} style={iconWrapperStyles}>
          {renderIcon()}
        </div>
      )}
      <div className={alertStyles.mainWrapper}>
        {titleNode}
        {descriptionNode}
        {childrenNode && <div className={alertStyles.extraContent}>{childrenNode}</div>}
      </div>
      {shouldShowClose && (
        <div>
          {closeButtonNode ?? (
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className={alertStyles.closeButton}
              style={{ color: closeButtonColor }}
            >
              <CloseIcon size={20} color={closeButtonColor} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
