import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { AlertProps } from './alert.type'
import {
  CloseIcon,
  DangerIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from './alert-icons'
import type { ThemeColor } from '../../types'
import { alertStyles } from './alert.style'

type AlertAnimState = 'open' | 'closed'
type AlertSlots = ReturnType<typeof alertStyles>

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

export const useAlertVisibility = ({
  isVisible,
  onClose,
  onVisibleChange,
}: Pick<AlertProps, 'isVisible' | 'onClose' | 'onVisibleChange'>) => {
  const [internalVisible, setInternalVisible] = useState(isVisible ?? true)
  const [shouldRender, setShouldRender] = useState(isVisible ?? true)
  const [animState, setAnimState] = useState<AlertAnimState>('open')
  const isInitialMount = useRef(true)
  const isControlled = typeof isVisible === 'boolean'
  const visible = isControlled ? isVisible : internalVisible

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

  return {
    shouldRender,
    animState,
    handleClose,
    handleAnimationEnd,
  }
}

export const useAlertIconNode = ({
  hideIcon,
  icon,
  themeColor,
  slots,
}: Pick<AlertProps, 'hideIcon' | 'icon' | 'themeColor'> & {
  slots: AlertSlots
}) => {
  return useMemo(() => {
    if (hideIcon) return null
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, { color: 'currentColor', size: 18 } as never)
    }
    if (icon) {
      return <span className={slots.iconText()}>{icon}</span>
    }
    const IconComponent = iconMap[themeColor ?? 'default'] ?? InfoIcon
    return <IconComponent color="currentColor" size={18} />
  }, [hideIcon, icon, slots, themeColor])
}

export const useAlertContentNodes = ({
  title,
  description,
  children,
  customAppearance,
  slots,
}: Pick<AlertProps, 'title' | 'description' | 'children' | 'customAppearance'> & {
  slots: AlertSlots
}) => {
  const renderContentText = useCallback(
    (content: AlertProps['title'] | AlertProps['description']) => {
      if (content === null || content === undefined) return null
      if (typeof content === 'string' || typeof content === 'number') {
        return (
          <p className={slots.description()} style={customAppearance?.description}>
            {content}
          </p>
        )
      }
      return content
    },
    [customAppearance?.description, slots]
  )

  const titleNode = useMemo(() => {
    if (title === null || title === undefined) return null
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <p className={slots.title()} style={customAppearance?.title}>
          {title}
        </p>
      )
    }
    return title
  }, [title, customAppearance?.title, slots])

  const descriptionNode = renderContentText(description)
  const childrenNode = renderContentText(children)

  return { titleNode, descriptionNode, childrenNode }
}

export const useAlertCloseButtonNode = ({
  closeButton,
  handleClose,
}: Pick<AlertProps, 'closeButton'> & {
  handleClose: () => void
}) => {
  return useMemo(() => {
    if (!closeButton) return null
    if (!isValidElement(closeButton)) return closeButton

    const existingOnClick = (closeButton.props as { onClick?: (e: unknown) => void })
      .onClick

    return cloneElement(closeButton, {
      onClick: (e: unknown) => {
        existingOnClick?.(e)
        handleClose()
      },
    } as never)
  }, [closeButton, handleClose])
}

export const DefaultAlertCloseButton = ({
  onClick,
  className,
}: {
  onClick: () => void
  className: string
}) => (
  <button type="button" aria-label="Close" onClick={onClick} className={className}>
    <CloseIcon size={20} color="currentColor" />
  </button>
)
