'use client'

import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  isValidElement,
} from 'react'
import type { CSSProperties } from 'react'
import {
  useAlertContainerStyles,
  useAlertIconWrapperStyles,
  useAlertTextStyles,
} from './alert.hook'
import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from './alert-icons'
import type { AlertProps } from './alert.type'
import { useBorderRadiusStyles } from '../../core'
import type { ThemeColor } from '../../types'

const iconMap: Record<ThemeColor, React.FC<{ color: string; size: number }>> = {
  default: InfoIcon,
  primary: InfoIcon,
  secondary: InfoIcon,
  tertiary: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

const toEm = (px: number) => `${px / 16}em`

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
  testID,
  className,
  style,
}) => {
  const [internalVisible, setInternalVisible] = useState(isVisible ?? true)
  const [shouldRender, setShouldRender] = useState(isVisible ?? true)
  const [animatedOpacity, setAnimatedOpacity] = useState(1)
  const [animatedScale, setAnimatedScale] = useState(1)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible

  const radiusStyles = useBorderRadiusStyles(radius)
  const borderRadiusEm = radiusStyles ? toEm(radiusStyles.borderRadius) : undefined
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
    setAnimatedOpacity(0)
    setAnimatedScale(0.95)
    setTimeout(finishClosing, 250)
  }, [finishClosing, visible])

  useEffect(() => {
    if (visible && !shouldRender) {
      setShouldRender(true)
      setAnimatedOpacity(0)
      setAnimatedScale(0.95)
      requestAnimationFrame(() => {
        setAnimatedOpacity(1)
        setAnimatedScale(1)
      })
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
      return cloneElement(icon, { color: iconColor, size: 18 } as never)
    }
    if (icon) {
      return <span style={{ fontWeight: 600, color: iconColor }}>{icon}</span>
    }
    return <IconComponent color={iconColor} size={18} />
  }

  const renderContentText = (
    content: AlertProps['title'] | AlertProps['description']
  ) => {
    if (content === null || content === undefined) return null
    if (typeof content === 'string' || typeof content === 'number') {
      return (
        <span
          style={{
            ...descriptionStyles,
            ...customAppearance?.description,
          }}
        >
          {content}
        </span>
      )
    }
    return content
  }

  const titleNode = useMemo(() => {
    if (title === null || title === undefined) return null
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <span
          style={{
            ...titleStyles,
            ...customAppearance?.title,
          }}
        >
          {title}
        </span>
      )
    }
    return title
  }, [title, customAppearance?.title, titleStyles])

  const descriptionNode = renderContentText(description)
  const childrenNode = renderContentText(children)

  const closeButtonNode = useMemo(() => {
    if (!closeButton) return null
    if (!isValidElement(closeButton)) return closeButton

    const existingOnClick = (
      closeButton.props as { onClick?: (event: unknown) => void }
    ).onClick

    return cloneElement(closeButton, {
      onClick: (event: unknown) => {
        existingOnClick?.(event)
        handleClose()
      },
    } as never)
  }, [closeButton, handleClose])

  if (!shouldRender) return null

  const mergedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: toEm(12),
    ...containerStyles,
    ...(borderRadiusEm !== undefined ? { borderRadius: borderRadiusEm } : {}),
    ...customAppearance?.container,
    opacity: animatedOpacity,
    transform: `scale(${animatedScale})`,
    transition: 'opacity 250ms ease, transform 250ms ease',
    boxSizing: 'border-box',
    ...style,
  }

  return (
    <div role="alert" data-testid={testID} className={className} style={mergedStyle}>
      {!hideIcon && (
        <div
          style={{
            width: toEm(30),
            height: toEm(30),
            borderRadius: toEm(15),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            ...iconWrapperStyles,
          }}
        >
          {renderIcon()}
        </div>
      )}
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: toEm(2) }}
      >
        {titleNode}
        {descriptionNode}
        {childrenNode && <div style={{ marginTop: toEm(4) }}>{childrenNode}</div>}
      </div>
      {shouldShowClose && (
        <div style={{ alignSelf: 'flex-start' }}>
          {closeButtonNode ?? (
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                padding: toEm(4),
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloseIcon size={16} color={closeButtonColor} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Alert.displayName = 'Alert'
